import { writeFileSync, mkdirSync } from 'fs';
import { getAllRoutes } from '../lib/routes';
import { services } from '../data/services';
import { solutions } from '../data/solutions';
import { packages } from '../data/packages';
import { projects, isProjectIndexable } from '../data/projects';
import { articles, getLiveResourceCategories } from '../data/articles';
import { comparisons } from '../data/comparisons';
import { getLiveLocations, locations } from '../data/locations';
import { legalDocs } from '../data/legal';
import { showcaseProjects } from '../data/projects-showcase';

mkdirSync('docs/strategy', { recursive: true });

function words(...parts: Array<string | string[] | undefined | null>): number {
  const text = parts
    .flat()
    .filter(Boolean)
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return 0;
  return text.split(' ').filter(Boolean).length;
}

function jaccard(a: string, b: string): number {
  const ta = new Set(a.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 3));
  const tb = new Set(b.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 3));
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / (ta.size + tb.size - inter);
}

type Row = {
  url: string;
  pageType: string;
  primaryIntent: string;
  targetAudience: string;
  h1: string;
  wordCount: number;
  primaryCta: string;
  relatedProject: string;
  relatedService: string;
  authorByline: string;
  indexingStatus: string;
  similarityRisk: string;
  recommendedAction: string;
  notes: string;
};

const rows: Row[] = [];

function intentFor(type: string, title: string): string {
  switch (type) {
    case 'homepage': return 'Brand + service orientation + enquiry';
    case 'hub': return 'Category navigation / orientation';
    case 'service': return 'Service evaluation / buy';
    case 'solution': return 'Industry fit / buy';
    case 'package': return 'Package self-qualification / buy';
    case 'project': return 'Proof / case study';
    case 'project-category': return 'Project browsing';
    case 'article': return 'Educate / nurture + soft convert';
    case 'resource-category': return 'Resource browsing';
    case 'comparison': return 'Decision support / compare options';
    case 'location': return 'Local relevance / contact';
    case 'utility': return 'Convert / contact / process / pricing';
    case 'legal': return 'Compliance / trust';
    default: return title;
  }
}

// Homepage
rows.push({
  url: '/',
  pageType: 'homepage',
  primaryIntent: intentFor('homepage', 'Home'),
  targetAudience: 'Technical, industrial and service businesses (SA + selected international)',
  h1: 'Built to be found. Designed to work. (brand hero)',
  wordCount: 0,
  primaryCta: 'Request a proposal / Contact',
  relatedProject: showcaseProjects.map((p) => p.slug).join('; ') || '—',
  relatedService: 'websites; systems',
  authorByline: '—',
  indexingStatus: 'indexable (intended; live env currently broken)',
  similarityRisk: 'Low',
  recommendedAction: 'Expand',
  notes: 'Needs earlier proof strip + systems distinction + geography in support copy',
});

for (const s of services) {
  const wc = words(s.heading, s.intro, s.summary, s.problems, s.deliverables, s.exclusions, s.faqs.flatMap((f) => [f.question, f.answer]));
  const hasProject = (s.relatedProjectSlugs || []).length > 0;
  rows.push({
    url: `/services/${s.slug}/`,
    pageType: 'service',
    primaryIntent: intentFor('service', s.title),
    targetAudience: s.primaryKeywordCluster || 'Business buyers evaluating this service',
    h1: s.heading,
    wordCount: wc,
    primaryCta: s.ctaType === 'consultation' ? 'Book consultation / proposal' : 'Request a quote',
    relatedProject: (s.relatedProjectSlugs || []).join('; ') || '—',
    relatedService: (s.relatedServiceSlugs || []).join('; ') || '—',
    authorByline: '—',
    indexingStatus: s.noindex ? 'noindex' : 'indexable',
    similarityRisk: 'TBD',
    recommendedAction: hasProject ? 'Expand' : 'Expand',
    notes: `deliverables=${s.deliverables.length}; faqs=${s.faqs.length}; projectsLinked=${hasProject}`,
  });
}

for (const s of solutions) {
  const wc = words(s.heading, s.intro, s.painPoints, s.approach, s.faqs.flatMap((f) => [f.question, f.answer]));
  rows.push({
    url: `/solutions/${s.slug}/`,
    pageType: 'solution',
    primaryIntent: intentFor('solution', s.title),
    targetAudience: s.industry,
    h1: s.heading,
    wordCount: wc,
    primaryCta: 'Request a quote',
    relatedProject: (s.relatedProjectSlugs || []).join('; ') || '—',
    relatedService: (s.recommendedServiceSlugs || []).join('; ') || '—',
    authorByline: '—',
    indexingStatus: s.noindex ? 'noindex' : 'indexable',
    similarityRisk: 'TBD',
    recommendedAction: 'Expand',
    notes: `placeholder=${!!s.placeholder}; pains=${s.painPoints.length}`,
  });
}

for (const p of packages) {
  const wc = words(p.heading, p.intro, p.idealFor, p.inclusions, p.exclusions, p.timeline, p.faqs.flatMap((f) => [f.question, f.answer]));
  rows.push({
    url: `/website-packages/${p.slug}/`,
    pageType: 'package',
    primaryIntent: intentFor('package', p.title),
    targetAudience: p.idealFor.join('; '),
    h1: p.heading,
    wordCount: wc,
    primaryCta: 'Request a quote',
    relatedProject: '—',
    relatedService: p.serviceSlug,
    authorByline: '—',
    indexingStatus: p.noindex ? 'noindex' : 'indexable',
    similarityRisk: 'TBD',
    recommendedAction: 'Expand',
    notes: `price=${p.priceRange ? `R${p.priceRange.min}-${p.priceRange.max} indicative` : 'POA'}; timeline=${p.timeline}`,
  });
}

for (const p of projects) {
  const wc = words(
    p.heading, p.intro, p.businessProblem, p.objectives, p.scope, p.solutionSummary, p.process,
    p.keyFunctionality, p.seoWork, p.results.map((r) => `${r.metric} ${r.value}`),
  );
  rows.push({
    url: `/projects/${p.slug}/`,
    pageType: 'project',
    primaryIntent: intentFor('project', p.title),
    targetAudience: p.industry,
    h1: p.heading,
    wordCount: wc,
    primaryCta: 'Request a quote',
    relatedProject: (p.relatedProjectSlugs || []).join('; ') || '—',
    relatedService: (p.serviceSlugs || []).join('; ') || '—',
    authorByline: '—',
    indexingStatus: isProjectIndexable(p) ? 'indexable' : (p.noindex || p.placeholder || !p.publishPermission || p.status === 'template' ? 'noindex/draft' : 'noindex'),
    similarityRisk: p.status === 'template' ? 'Template' : 'Low',
    recommendedAction: p.status === 'template' ? 'Keep' : 'Expand',
    notes: `status=${p.status}; screenshots=${!!p.featuredImage}; resultsVerified=${p.results.filter((r) => r.verified).length}; publishPermission=${p.publishPermission}`,
  });
}

for (const a of articles.filter((x) => x.status === 'live')) {
  const wc = words(a.heading, a.intro, ...a.body.flatMap((s) => [s.heading || '', ...s.paragraphs]));
  rows.push({
    url: `/resources/${a.slug}/`,
    pageType: 'article',
    primaryIntent: intentFor('article', a.title),
    targetAudience: 'Buyers researching websites/SEO/cost in SA',
    h1: a.heading,
    wordCount: wc,
    primaryCta: 'Related services / proposal',
    relatedProject: '—',
    relatedService: (a.supportsServiceSlugs || []).join('; ') || '—',
    authorByline: a.author || 'MISSING',
    indexingStatus: a.noindex ? 'noindex' : 'indexable',
    similarityRisk: 'TBD',
    recommendedAction: a.author ? 'Expand' : 'Expand',
    notes: `category=${a.category}; updated=${a.dateUpdated}; sources=${a.sources?.length || 0}; sections=${a.body.length}`,
  });
}

for (const c of comparisons) {
  const wc = words(c.heading, c.intro, c.verdict, c.whenA, c.whenB, ...c.criteria.flatMap((x) => [x.name, x.aNote, x.bNote]));
  rows.push({
    url: `/compare/${c.slug}/`,
    pageType: 'comparison',
    primaryIntent: intentFor('comparison', c.title),
    targetAudience: 'Buyers choosing build approach',
    h1: c.heading,
    wordCount: wc,
    primaryCta: 'Request a quote',
    relatedProject: '—',
    relatedService: (c.supportsServiceSlugs || []).join('; ') || '—',
    authorByline: '—',
    indexingStatus: c.noindex ? 'noindex' : 'indexable',
    similarityRisk: 'TBD',
    recommendedAction: 'Keep',
    notes: `criteria=${c.criteria.length}; A=${c.optionA}; B=${c.optionB}`,
  });
}

for (const l of locations) {
  rows.push({
    url: `/areas-we-serve/${l.slug}/`,
    pageType: 'location',
    primaryIntent: intentFor('location', l.title),
    targetAudience: `${l.city}, ${l.province}`,
    h1: l.heading,
    wordCount: words(
      l.heading,
      l.intro,
      ...l.consolidatedAreas,
      ...l.localFaqs.flatMap((f) => [f.question, f.answer]),
    ),
    primaryCta: 'Contact / quote',
    relatedProject: l.projectSlugs.join('; ') || '—',
    relatedService: l.serviceSlugs.join('; ') || '—',
    authorByline: '—',
    indexingStatus: l.noindex ? 'noindex' : l.status === 'live' ? 'indexable' : l.status,
    similarityRisk: 'TBD',
    recommendedAction: 'Expand',
    notes: `placeholder=${!!l.placeholder}; status=${l.status}`,
  });
}

// Similarity within families
function markSimilarity(filterType: string, getText: (url: string) => string) {
  const subset = rows.filter((r) => r.pageType === filterType && !r.indexingStatus.includes('noindex') && r.indexingStatus !== 'draft');
  for (let i = 0; i < subset.length; i++) {
    let max = 0;
    let peer = '';
    for (let j = 0; j < subset.length; j++) {
      if (i === j) continue;
      const score = jaccard(getText(subset[i].url), getText(subset[j].url));
      if (score > max) { max = score; peer = subset[j].url; }
    }
    const risk = max >= 0.45 ? 'High' : max >= 0.32 ? 'Medium' : 'Low';
    subset[i].similarityRisk = `${risk}${peer ? ` (~${Math.round(max * 100)}% vs ${peer})` : ''}`;
    if (risk === 'High') subset[i].recommendedAction = 'Consolidate';
    else if (risk === 'Medium' && subset[i].recommendedAction === 'Keep') subset[i].recommendedAction = 'Expand';
  }
}

const serviceText = new Map(services.map((s) => [`/services/${s.slug}/`, [s.intro, s.summary, ...s.problems, ...s.deliverables].join(' ')]));
const solutionText = new Map(solutions.map((s) => [`/solutions/${s.slug}/`, [s.intro, ...s.painPoints, ...s.approach].join(' ')]));
const packageText = new Map(packages.map((p) => [`/website-packages/${p.slug}/`, [p.intro, ...p.inclusions, ...p.exclusions].join(' ')]));
const locationText = new Map(locations.map((l) => [`/areas-we-serve/${l.slug}/`, [l.intro, l.heading].join(' ')]));
const articleText = new Map(articles.filter(a=>a.status==='live').map((a) => [`/resources/${a.slug}/`, [a.intro, ...a.body.flatMap(s=>s.paragraphs)].join(' ')]));

markSimilarity('service', (u) => serviceText.get(u) || '');
markSimilarity('solution', (u) => solutionText.get(u) || '');
markSimilarity('package', (u) => packageText.get(u) || '');
markSimilarity('location', (u) => locationText.get(u) || '');
markSimilarity('article', (u) => articleText.get(u) || '');

// Proof gaps for services
const proofGaps = services.map((s) => ({
  slug: s.slug,
  title: s.title,
  missing: {
    relatedProject: !(s.relatedProjectSlugs || []).length,
    screenshotLink: !(s.relatedProjectSlugs || []).some((slug) => {
      const p = projects.find((x) => x.slug === slug);
      return !!p?.featuredImage;
    }),
    workflow: !/rfq|portal|admin|ecommerce|catalogue|quotation/i.test(s.slug) ? 'N/A or weak on page' : 'Should show workflow',
    deliverables: s.deliverables.length < 6,
    process: true, // generally not on service pages as dedicated process
    technicalStack: true,
    scopeBoundaries: s.exclusions.length < 3,
    pricingGuidance: !(s.relatedPackageSlugs || []).length,
    timelineGuidance: true,
    maintenancePosition: s.slug !== 'website-maintenance-and-support',
    faq: s.faqs.length < 3,
    authorReviewer: true,
  },
  relatedProjects: s.relatedProjectSlugs || [],
  relatedPackages: s.relatedPackageSlugs || [],
  deliverableCount: s.deliverables.length,
  faqCount: s.faqs.length,
  exclusionCount: s.exclusions.length,
}));

const overlapPairs: Array<{ a: string; b: string; score: number; family: string }> = [];
function pairScan(family: string, map: Map<string, string>) {
  const entries = [...map.entries()];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const score = jaccard(entries[i][1], entries[j][1]);
      if (score >= 0.28) overlapPairs.push({ family, a: entries[i][0], b: entries[j][0], score: Math.round(score * 1000) / 1000 });
    }
  }
}
pairScan('service', serviceText);
pairScan('solution', solutionText);
pairScan('package', packageText);
pairScan('location', locationText);
pairScan('article', articleText);
overlapPairs.sort((a, b) => b.score - a.score);

writeFileSync('docs/strategy/_content-audit-raw.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  routeTotals: {
    registry: getAllRoutes().length,
    registryIndexable: getAllRoutes().filter((r) => r.index).length,
    inventoryRows: rows.length,
  },
  rows,
  proofGaps,
  overlapPairs,
  showcase: showcaseProjects.map((p) => ({ slug: p.slug, statusLabel: p.statusLabel, href: p.href })),
  articles: articles.filter(a=>a.status==='live').map(a => ({
    slug: a.slug,
    author: a.author || null,
    datePublished: a.dateCreated,
    dateUpdated: a.dateUpdated,
    sources: a.sources?.length || 0,
    wordCountApprox: words(a.intro, ...a.body.flatMap(s=>s.paragraphs)),
    supports: a.supportsServiceSlugs,
  })),
  projects: projects.map(p => ({
    slug: p.slug,
    status: p.status,
    noindex: p.noindex,
    placeholder: p.placeholder,
    publishPermission: p.publishPermission,
    indexable: isProjectIndexable(p),
    hasScreenshots: !!p.featuredImage,
    verifiedResults: p.results.filter(r=>r.verified).length,
    hasTestimonial: !!(p.testimonial && p.testimonial.permissionConfirmed),
  })),
  locations: locations.map(l => ({ slug: l.slug, city: l.city, status: l.status, placeholder: l.placeholder, noindex: l.noindex })),
  solutions: solutions.map(s => ({ slug: s.slug, industry: s.industry, placeholder: s.placeholder, projects: s.relatedProjectSlugs })),
}, null, 2));

console.log('Wrote docs/strategy/_content-audit-raw.json');
console.log('rows', rows.length, 'overlaps', overlapPairs.length);
