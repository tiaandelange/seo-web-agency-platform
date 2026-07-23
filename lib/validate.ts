import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { packages } from '@/data/packages';
import { projects, projectCategories, isProjectIndexable } from '@/data/projects';
import { articles, resourceCategories } from '@/data/articles';
import { comparisons } from '@/data/comparisons';
import { locations, isLocationIndexable } from '@/data/locations';
import { getApprovedAuthor } from '@/data/authors';
import { legalDocs } from '@/data/legal';
import { headerNav, headerCta, footerColumns, footerLegal } from '@/data/navigation';
import { getAllRoutes } from '@/lib/routes';
import { brand, isProductionSite, siteOrigin } from '@/config/brand';

/**
 * SEO validation engine — shared by scripts/seo-validate.ts (CLI) and
 * tests/validation.test.ts. Checklist: docs/seo/ON-PAGE-SEO-CHECKLIST.md.
 */

export interface ValidationReport {
  errors: string[];
  warnings: string[];
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

interface SeoEntry {
  type: string;
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription: string;
}

function allSeoEntries(): SeoEntry[] {
  return [
    ...services.map((e) => ({ type: 'service', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...solutions.map((e) => ({ type: 'solution', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...packages.map((e) => ({ type: 'package', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...projects.map((e) => ({ type: 'project', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...articles.map((e) => ({ type: 'article', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...comparisons.map((e) => ({ type: 'comparison', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...locations.map((e) => ({ type: 'location', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...legalDocs.map((e) => ({ type: 'legal', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
    ...resourceCategories
      .filter((c) => c.status === 'live')
      .map((e) => ({ type: 'resource-category', slug: e.slug, title: e.title, seoTitle: e.seoTitle, metaDescription: e.metaDescription })),
  ];
}

export function validateSlugs(report: ValidationReport): void {
  for (const e of allSeoEntries()) {
    if (!SLUG_PATTERN.test(e.slug)) {
      report.errors.push(`[slug] ${e.type} "${e.slug}" is not lowercase-hyphenated`);
    }
  }
  // Collision rules: shared URL namespaces (docs/architecture/TAXONOMY.md).
  const categorySlugs = new Set(projectCategories.map((c) => c.slug as string));
  for (const p of projects) {
    if (categorySlugs.has(p.slug)) {
      report.errors.push(`[slug] project "${p.slug}" collides with a project category`);
    }
  }
  const resourceCategorySlugs = new Set(resourceCategories.map((c) => c.slug));
  for (const a of articles) {
    if (resourceCategorySlugs.has(a.slug)) {
      report.errors.push(`[slug] article "${a.slug}" collides with a resource category`);
    }
  }
}

export function validateUniqueness(report: ValidationReport): void {
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  for (const e of allSeoEntries()) {
    const title = (e.seoTitle ?? e.title).toLowerCase();
    const where = `${e.type}:${e.slug}`;
    if (titles.has(title)) {
      report.errors.push(`[title] duplicate "${title}" on ${where} and ${titles.get(title)}`);
    } else {
      titles.set(title, where);
    }
    const desc = e.metaDescription.toLowerCase();
    if (descriptions.has(desc)) {
      report.errors.push(`[description] duplicate on ${where} and ${descriptions.get(desc)}`);
    } else {
      descriptions.set(desc, where);
    }
  }
}

export function validateDescriptionLengths(report: ValidationReport): void {
  for (const e of allSeoEntries()) {
    const len = e.metaDescription.length;
    if (len < 50 || len > 200) {
      report.errors.push(`[description] ${e.type}:${e.slug} length ${len} outside 50–200`);
    } else if (len < 70 || len > 160) {
      report.warnings.push(`[description] ${e.type}:${e.slug} length ${len} outside ideal 70–160`);
    }
  }
}

export function validateReferences(report: ValidationReport): void {
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const packageSlugs = new Set(packages.map((p) => p.slug));
  const solutionSlugs = new Set(solutions.map((s) => s.slug));
  const projectSlugs = new Set(projects.map((p) => p.slug));
  const articleSlugs = new Set(articles.map((a) => a.slug));

  const check = (refs: string[], target: Set<string>, from: string, kind: string) => {
    for (const ref of refs) {
      if (!target.has(ref)) report.errors.push(`[ref] ${from} → unknown ${kind} "${ref}"`);
    }
  };

  for (const s of services) {
    const from = `service:${s.slug}`;
    check(s.relatedServiceSlugs, serviceSlugs, from, 'service');
    check(s.relatedPackageSlugs, packageSlugs, from, 'package');
    check(s.relatedSolutionSlugs, solutionSlugs, from, 'solution');
    check(s.relatedProjectSlugs, projectSlugs, from, 'project');
    check(s.relatedArticleSlugs, articleSlugs, from, 'article');
  }
  for (const s of solutions) {
    const from = `solution:${s.slug}`;
    check(s.recommendedServiceSlugs, serviceSlugs, from, 'service');
    check(s.relatedProjectSlugs, projectSlugs, from, 'project');
    if (s.recommendedServiceSlugs.length === 0) {
      report.errors.push(`[ref] ${from} has no recommended services`);
    }
  }
  for (const p of packages) {
    if (!serviceSlugs.has(p.serviceSlug)) {
      report.errors.push(`[ref] package:${p.slug} → unknown parent service "${p.serviceSlug}"`);
    }
  }
  for (const p of projects) {
    const from = `project:${p.slug}`;
    check(p.serviceSlugs, serviceSlugs, from, 'service');
    check(p.relatedProjectSlugs, projectSlugs, from, 'project');
    check(p.relatedArticleSlugs, articleSlugs, from, 'article');
    if (p.solutionSlug && !solutionSlugs.has(p.solutionSlug)) {
      report.errors.push(`[ref] ${from} → unknown solution "${p.solutionSlug}"`);
    }
  }
  for (const a of articles) {
    const from = `article:${a.slug}`;
    check(a.supportsServiceSlugs, serviceSlugs, from, 'service');
    check(a.relatedArticleSlugs, articleSlugs, from, 'article');
    if (a.supportsServiceSlugs.length === 0) {
      report.errors.push(`[ref] ${from} must support at least one service`);
    }
  }
  for (const c of comparisons) {
    check(c.supportsServiceSlugs, serviceSlugs, `comparison:${c.slug}`, 'service');
  }
  for (const l of locations) {
    const from = `location:${l.slug}`;
    check(l.serviceSlugs, serviceSlugs, from, 'service');
    check(l.projectSlugs, projectSlugs, from, 'project');
  }
}

export function validateRoutes(report: ValidationReport): void {
  const routes = getAllRoutes();
  const seen = new Set<string>();
  for (const r of routes) {
    if (seen.has(r.path)) report.errors.push(`[route] duplicate path ${r.path}`);
    seen.add(r.path);
    if (r.path !== r.path.toLowerCase()) report.errors.push(`[route] ${r.path} not lowercase`);
    if (!r.path.endsWith('/')) report.errors.push(`[route] ${r.path} missing trailing slash`);
    if (r.index !== r.inSitemap) {
      report.errors.push(`[route] ${r.path} index/inSitemap mismatch (indexable pages must be in the sitemap and noindex pages must not be)`);
    }
    if (r.parent && !routes.some((p) => p.path === r.parent)) {
      report.errors.push(`[route] ${r.path} has unknown parent ${r.parent}`);
    }
  }
}

/**
 * Orphan check — BFS from "/" over the real link graph:
 * navigation + hub→child cards + curated related links (docs/architecture/INTERNAL-LINKING-MAP.md).
 */
export function validateReachability(report: ValidationReport): void {
  const routes = getAllRoutes();
  const paths = new Set(routes.map((r) => r.path));
  const edges = new Map<string, Set<string>>();
  const addEdge = (from: string, to: string) => {
    if (!edges.has(from)) edges.set(from, new Set());
    edges.get(from)!.add(to);
  };

  // Global navigation (rendered on every page → edges from every route).
  const navTargets = [
    ...headerNav.map((l) => l.href),
    headerCta.href,
    ...footerColumns.flatMap((c) => c.links.map((l) => l.href)),
    ...footerLegal.map((l) => l.href),
  ];
  for (const r of routes) {
    for (const t of navTargets) addEdge(r.path, t);
  }
  // Hubs render child cards.
  for (const r of routes) {
    if (r.parent) addEdge(r.parent, r.path);
  }
  // Curated related links as rendered by templates.
  for (const s of services) {
    const from = `/services/${s.slug}/`;
    s.relatedServiceSlugs.forEach((x) => addEdge(from, `/services/${x}/`));
    s.relatedPackageSlugs.forEach((x) => addEdge(from, `/website-packages/${x}/`));
    s.relatedSolutionSlugs.forEach((x) => addEdge(from, `/solutions/${x}/`));
    s.relatedProjectSlugs.forEach((x) => addEdge(from, `/projects/${x}/`));
    s.relatedArticleSlugs.forEach((x) => addEdge(from, `/resources/${x}/`));
  }
  for (const s of solutions) {
    const from = `/solutions/${s.slug}/`;
    s.recommendedServiceSlugs.forEach((x) => addEdge(from, `/services/${x}/`));
    s.relatedProjectSlugs.forEach((x) => addEdge(from, `/projects/${x}/`));
  }
  for (const p of packages) {
    addEdge(`/website-packages/${p.slug}/`, `/services/${p.serviceSlug}/`);
  }
  for (const a of articles.filter((x) => x.status === 'live')) {
    const from = `/resources/${a.slug}/`;
    a.supportsServiceSlugs.forEach((x) => addEdge(from, `/services/${x}/`));
    a.relatedArticleSlugs.forEach((x) => addEdge(from, `/resources/${x}/`));
  }
  for (const c of comparisons) {
    c.supportsServiceSlugs.forEach((x) => addEdge(`/compare/${c.slug}/`, `/services/${x}/`));
  }

  const visited = new Set<string>(['/']);
  const queue = ['/'];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const next of edges.get(current) ?? []) {
      if (paths.has(next) && !visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  for (const r of routes) {
    if (r.index && !visited.has(r.path)) {
      report.errors.push(`[orphan] indexable route ${r.path} unreachable from home`);
    }
  }
}

export function validateProjects(report: ValidationReport): void {
  for (const p of projects) {
    if (!p.publishPermission && isProjectIndexable(p)) {
      report.errors.push(`[project] ${p.slug} indexable without publish permission (D-07)`);
    }
    if (p.status === 'template' && !p.placeholder) {
      report.errors.push(`[project] template ${p.slug} must carry placeholder: true`);
    }
    if (p.classification === 'template') {
      if (p.status !== 'template' || p.projectStatus !== 'template') {
        report.errors.push(`[project] ${p.slug} classification=template requires status/projectStatus template`);
      }
      if (!/template/i.test(p.publicLabel)) {
        report.errors.push(`[project] ${p.slug} template must use a template publicLabel (got "${p.publicLabel}")`);
      }
      if (isProjectIndexable(p)) {
        report.errors.push(`[project] ${p.slug} template must not be indexable`);
      }
    }
    if (p.classification === 'client-project' && /template|illustrative|example/i.test(p.publicLabel)) {
      report.errors.push(`[project] ${p.slug} client-project cannot use illustrative/template publicLabel`);
    }
    if (!p.classification || !p.publicLabel || !p.evidenceLevel) {
      report.errors.push(`[project] ${p.slug} missing classification/publicLabel/evidenceLevel`);
    }
    if (
      (p.slug === 'damtech-website' || p.slug === 'proplytic-property-software') &&
      !p.caseStudyNarrativeComplete
    ) {
      report.warnings.push(`[project] ${p.slug} narrative incomplete for case-study publication review`);
    }
    if (p.caseStudyNarrativeComplete && p.ownerCaseStudyIndexApproval && p.noindex) {
      report.warnings.push(
        `[project] ${p.slug} is narrative-complete with index approval but still noindex — flip noindex when ready to publish to search`,
      );
    }
    for (const r of p.results) {
      if (!r.verified) {
        report.warnings.push(`[project] ${p.slug} has an unverified result "${r.metric}" — it will never render; remove or verify`);
      }
    }
    const images = [...(p.featuredImage ? [p.featuredImage] : []), ...p.gallery];
    for (const img of images) {
      if (!img.alt || img.alt.trim().length === 0) {
        report.errors.push(`[image] project ${p.slug} image "${img.src}" missing alt text`);
      }
    }
  }
}

export function validateAuthorship(report: ValidationReport): void {
  for (const a of articles) {
    if (a.status !== 'live') continue;
    if (!a.authorSlug) {
      report.errors.push(`[article] ${a.slug} missing authorSlug`);
      continue;
    }
    const author = getApprovedAuthor(a.authorSlug);
    if (!author) {
      report.errors.push(
        `[article] ${a.slug} author "${a.authorSlug}" is missing or unapproved — live articles require an approved author`,
      );
    }
  }
}

export function validateLocations(report: ValidationReport): void {
  for (const location of locations) {
    if (location.status !== 'live') continue;
    const routeIndexable = isLocationIndexable(location);
    if (location.slug === 'johannesburg' && routeIndexable) {
      report.errors.push('[location] johannesburg must not be indexable without a configured Johannesburg office');
    }
    if (location.placeholder && routeIndexable) {
      report.errors.push(`[location] ${location.slug} placeholder pages cannot be indexable`);
    }
  }
}

/**
 * Prevent the verified production failure mode: custom domain live while
 * NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_SITE_ENV still point at localhost/preview.
 * Vercel injects VERCEL_ENV=production on Production deployments.
 */
export function validateDeploymentOrigin(report: ValidationReport): void {
  const origin = siteOrigin();
  const vercelEnv = (process.env.VERCEL_ENV || '').trim().toLowerCase();
  const siteEnv = (process.env.NEXT_PUBLIC_SITE_ENV || '').trim().toLowerCase();
  const expected = brand.productionOrigin;

  if (isProductionSite() || siteEnv === 'production') {
    if (origin !== expected) {
      report.errors.push(
        `[origin] NEXT_PUBLIC_SITE_ENV=production requires NEXT_PUBLIC_SITE_URL=${expected} (got ${origin})`,
      );
    }
    if (/localhost|127\.0\.0\.1|vercel\.app/i.test(origin)) {
      report.errors.push(
        `[origin] production builds must not use localhost or preview hosts in NEXT_PUBLIC_SITE_URL (got ${origin})`,
      );
    }
  }

  if (vercelEnv === 'production') {
    if (siteEnv !== 'production') {
      report.errors.push(
        `[origin] Vercel Production deployment requires NEXT_PUBLIC_SITE_ENV=production (got "${siteEnv || '(unset)'}")`,
      );
    }
    if (origin !== expected) {
      report.errors.push(
        `[origin] Vercel Production deployment requires NEXT_PUBLIC_SITE_URL=${expected} (got ${origin})`,
      );
    }
  }
}

export function runAllValidations(): ValidationReport {
  const report: ValidationReport = { errors: [], warnings: [] };
  validateSlugs(report);
  validateUniqueness(report);
  validateDescriptionLengths(report);
  validateReferences(report);
  validateRoutes(report);
  validateReachability(report);
  validateProjects(report);
  validateAuthorship(report);
  validateLocations(report);
  validateDeploymentOrigin(report);
  return report;
}
