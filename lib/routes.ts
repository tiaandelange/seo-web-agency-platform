import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { packages } from '@/data/packages';
import {
  projects,
  projectCategories,
  isProjectIndexable,
  isProjectCategoryIndexable,
} from '@/data/projects';
import { articles, getLiveResourceCategories } from '@/data/articles';
import { comparisons } from '@/data/comparisons';
import { getLiveLocations } from '@/data/locations';
import { legalDocs } from '@/data/legal';

/**
 * Central route registry — the single source of truth for URLs, indexation flags,
 * sitemap membership, parents (breadcrumbs) and the SEO validator
 * (docs/architecture/INDEXATION-RULES.md, D-15).
 */
export interface RouteEntry {
  /** Path with trailing slash, e.g. "/services/business-websites/". */
  path: string;
  /** Breadcrumb/sitemap label — matches the page's H1 sense. */
  title: string;
  parent: string | null;
  index: boolean;
  inSitemap: boolean;
  pageType: string;
  /** ISO date for sitemap lastModified. */
  lastModified?: string;
}

const TODAY = '2026-07-21';

function entry(
  path: string,
  title: string,
  parent: string | null,
  pageType: string,
  options: { index?: boolean; lastModified?: string } = {}
): RouteEntry {
  const index = options.index !== false;
  return {
    path,
    title,
    parent,
    index,
    inSitemap: index,
    pageType,
    lastModified: options.lastModified ?? TODAY,
  };
}

export function getAllRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    entry('/', 'Home', null, 'homepage'),

    entry('/services/', 'Services', '/', 'hub'),
    ...services.map((s) =>
      entry(`/services/${s.slug}/`, s.title, '/services/', 'service', {
        index: !s.noindex,
        lastModified: s.dateUpdated,
      })
    ),

    entry('/solutions/', 'Solutions', '/', 'hub'),
    ...solutions.map((s) =>
      entry(`/solutions/${s.slug}/`, s.title, '/solutions/', 'solution', {
        index: !s.noindex,
        lastModified: s.dateUpdated,
      })
    ),

    entry('/website-packages/', 'Website Packages', '/', 'hub'),
    ...packages.map((p) =>
      entry(`/website-packages/${p.slug}/`, p.title, '/website-packages/', 'package', {
        index: !p.noindex,
        lastModified: p.dateUpdated,
      })
    ),

    entry('/projects/', 'Projects', '/', 'hub'),
    ...projectCategories.map((c) =>
      entry(`/projects/${c.slug}/`, c.title, '/projects/', 'project-category', {
        index: isProjectCategoryIndexable(c.slug),
      })
    ),
    ...projects.map((p) =>
      entry(`/projects/${p.slug}/`, p.title, '/projects/', 'project', {
        index: isProjectIndexable(p),
        lastModified: p.dateUpdated,
      })
    ),

    entry('/resources/', 'Resources', '/', 'hub'),
    ...getLiveResourceCategories().map((c) =>
      entry(`/resources/${c.slug}/`, c.title, '/resources/', 'resource-category', {
        lastModified: c.dateUpdated,
      })
    ),
    ...articles
      .filter((a) => a.status === 'live')
      .map((a) =>
        entry(`/resources/${a.slug}/`, a.title, `/resources/${a.category}/`, 'article', {
          index: !a.noindex,
          lastModified: a.dateUpdated,
        })
      ),

    entry('/compare/', 'Comparisons', '/', 'hub'),
    ...comparisons.map((c) =>
      entry(`/compare/${c.slug}/`, c.title, '/compare/', 'comparison', {
        index: !c.noindex,
        lastModified: c.dateUpdated,
      })
    ),

    entry('/areas-we-serve/', 'Areas We Serve', '/', 'hub'),
    ...getLiveLocations().map((l) =>
      entry(`/areas-we-serve/${l.slug}/`, l.title, '/areas-we-serve/', 'location', {
        index: !l.noindex,
        lastModified: l.dateUpdated,
      })
    ),

    entry('/about/', 'About', '/', 'about'),
    entry('/process/', 'Our Process', '/', 'process'),
    entry('/pricing/', 'Pricing', '/', 'pricing'),
    entry('/faq/', 'FAQ', '/', 'faq'),
    entry('/contact/', 'Contact', '/', 'contact'),
    entry('/request-a-quote/', 'Request a Quote', '/', 'quote'),
    entry('/request-a-quote/thank-you/', 'Thank You', '/request-a-quote/', 'utility', {
      index: false,
    }),

    // Legal docs breadcrumb directly under Home (no /legal/ index — D-20).
    ...legalDocs.map((d) =>
      entry(`/legal/${d.slug}/`, d.title, '/', 'legal', { lastModified: d.dateUpdated })
    ),
  ];

  return routes;
}

export function getRoute(path: string): RouteEntry | undefined {
  return getAllRoutes().find((r) => r.path === path);
}

export interface Crumb {
  name: string;
  path: string;
}

/** Breadcrumb trail from Home to the given path (inclusive). */
export function getBreadcrumbs(path: string): Crumb[] {
  const routes = getAllRoutes();
  const byPath = new Map(routes.map((r) => [r.path, r]));
  const trail: Crumb[] = [];
  let current = byPath.get(path);
  while (current) {
    trail.unshift({ name: current.title, path: current.path });
    current = current.parent ? byPath.get(current.parent) : undefined;
  }
  return trail;
}
