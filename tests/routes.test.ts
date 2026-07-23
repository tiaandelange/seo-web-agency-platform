import { describe, expect, it } from 'vitest';
import { getAllRoutes, getBreadcrumbs } from '../lib/routes';

describe('route registry', () => {
  const routes = getAllRoutes();

  it('has unique, lowercase, trailing-slash paths', () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path).toBe(path.toLowerCase());
      expect(path.endsWith('/')).toBe(true);
      expect(path.startsWith('/')).toBe(true);
    }
  });

  it('keeps indexation and sitemap flags in lockstep', () => {
    for (const route of routes) {
      expect(route.inSitemap).toBe(route.index);
    }
  });

  it('contains the expected launch architecture (51 indexable URLs after Trust P0)', () => {
    const indexable = routes.filter((r) => r.index);
    expect(indexable.length).toBe(51);
    // Noindex: quote thank-you + 4 seo-audit utilities + 3 project categories + 2 drafts + 2 templates + Johannesburg.
    const noindex = routes.filter((r) => !r.index).map((r) => r.path);
    expect(noindex).toContain('/request-a-quote/thank-you/');
    expect(noindex).toContain('/seo-audit/intake/');
    expect(noindex).toContain('/seo-audit/thank-you/');
    expect(noindex).toContain('/seo-audit/advanced/intake/');
    expect(noindex).toContain('/seo-audit/advanced/thank-you/');
    expect(noindex).toContain('/projects/websites/');
    expect(noindex).toContain('/areas-we-serve/johannesburg/');
    expect(routes.some((r) => r.path === '/seo-audit/' && r.index)).toBe(true);
    expect(routes.some((r) => r.path === '/seo-audit/advanced/' && r.index)).toBe(true);
    expect(noindex.length).toBe(13);
  });

  it('resolves parent chains for every route', () => {
    const paths = new Set(routes.map((r) => r.path));
    for (const route of routes) {
      if (route.parent) expect(paths.has(route.parent)).toBe(true);
    }
  });

  it('builds correct breadcrumb trails', () => {
    expect(getBreadcrumbs('/')).toEqual([{ name: 'Home', path: '/' }]);

    const serviceTrail = getBreadcrumbs('/services/business-websites/');
    expect(serviceTrail.map((c) => c.path)).toEqual(['/', '/services/', '/services/business-websites/']);

    const articleTrail = getBreadcrumbs('/resources/website-cost-south-africa/');
    expect(articleTrail.map((c) => c.path)).toEqual([
      '/',
      '/resources/',
      '/resources/website-cost-guides/',
      '/resources/website-cost-south-africa/',
    ]);

    // Legal pages crumb directly under Home (no /legal/ index — D-20).
    const legalTrail = getBreadcrumbs('/legal/privacy-policy/');
    expect(legalTrail.map((c) => c.path)).toEqual(['/', '/legal/privacy-policy/']);
  });
});
