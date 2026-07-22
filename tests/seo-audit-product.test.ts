import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  SEO_AUDIT_COMPARISON_ROWS,
  SEO_AUDIT_HUB_PATH,
  getSeoAuditProduct,
  isSeoAuditTierActive,
  isSeoAuditTierCheckoutConfigured,
  listSeoAuditProducts,
  seoAuditTierPriceLabel,
  seoAuditTierPriceZar,
  seoAuditTierPrimaryCtaHref,
  seoAuditTierPrimaryCtaLabel,
} from '../config/seo-audit-product';
import { seoAuditServiceSchema } from '../lib/schema';
import { buildMetadata } from '../lib/seo';
import { getAllRoutes } from '../lib/routes';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('SEO Audit two-tier config', () => {
  it('exposes both products with distinct prices and routes', () => {
    const products = listSeoAuditProducts();
    expect(products).toHaveLength(2);
    expect(getSeoAuditProduct('priority-fix').route).toBe('/seo-audit/');
    expect(getSeoAuditProduct('advanced').route).toBe('/seo-audit/advanced/');
    expect(seoAuditTierPriceZar('priority-fix')).toBe(1999);
    expect(seoAuditTierPriceZar('advanced')).toBe(5999);
    expect(seoAuditTierPriceLabel('priority-fix')).toBe('R1,999 once-off');
    expect(seoAuditTierPriceLabel('advanced')).toBe('R5,999 once-off');
  });

  it('keeps comparison rows aligned for both tiers', () => {
    expect(SEO_AUDIT_COMPARISON_ROWS.length).toBeGreaterThanOrEqual(10);
    expect(SEO_AUDIT_COMPARISON_ROWS[0]?.basic).toContain('1,999');
    expect(SEO_AUDIT_COMPARISON_ROWS[0]?.advanced).toContain('5,999');
  });

  it('uses Request CTAs when checkout URLs are unset', () => {
    vi.stubEnv('NEXT_PUBLIC_SEO_AUDIT_BASIC_CHECKOUT_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SEO_AUDIT_ADVANCED_CHECKOUT_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SEO_AUDIT_CHECKOUT_URL', '');
    expect(isSeoAuditTierCheckoutConfigured('priority-fix')).toBe(false);
    expect(isSeoAuditTierCheckoutConfigured('advanced')).toBe(false);
    expect(seoAuditTierPrimaryCtaLabel('priority-fix')).toMatch(/Request/i);
    expect(seoAuditTierPrimaryCtaHref('priority-fix')).toBe('/seo-audit/intake/');
    expect(seoAuditTierPrimaryCtaHref('advanced')).toBe('/seo-audit/advanced/intake/');
  });

  it('uses Buy CTAs only when tier checkout URLs are set', () => {
    vi.stubEnv('SEO_AUDIT_BASIC_ACTIVE', 'true');
    vi.stubEnv('SEO_AUDIT_ADVANCED_ACTIVE', 'true');
    vi.stubEnv('NEXT_PUBLIC_SEO_AUDIT_BASIC_CHECKOUT_URL', 'https://pay.example/basic');
    vi.stubEnv('NEXT_PUBLIC_SEO_AUDIT_ADVANCED_CHECKOUT_URL', 'https://pay.example/advanced');
    expect(seoAuditTierPrimaryCtaLabel('priority-fix')).toMatch(/^Buy/);
    expect(seoAuditTierPrimaryCtaHref('advanced')).toBe('https://pay.example/advanced');
  });

  it('honours inactive flags per tier', () => {
    vi.stubEnv('SEO_AUDIT_BASIC_ACTIVE', 'false');
    vi.stubEnv('SEO_AUDIT_ADVANCED_ACTIVE', 'true');
    expect(isSeoAuditTierActive('priority-fix')).toBe(false);
    expect(isSeoAuditTierActive('advanced')).toBe(true);
  });
});

describe('SEO Audit routes and metadata', () => {
  it('registers hub + advanced as indexable and all intake/thank-you as noindex', () => {
    const routes = getAllRoutes();
    expect(routes.find((r) => r.path === SEO_AUDIT_HUB_PATH)?.index).toBe(true);
    expect(routes.find((r) => r.path === '/seo-audit/advanced/')?.index).toBe(true);
    for (const path of [
      '/seo-audit/intake/',
      '/seo-audit/thank-you/',
      '/seo-audit/advanced/intake/',
      '/seo-audit/advanced/thank-you/',
    ]) {
      expect(routes.find((r) => r.path === path)?.index).toBe(false);
    }
  });

  it('uses distinct titles and H1 sources for hub vs advanced', () => {
    const basic = getSeoAuditProduct('priority-fix');
    const advanced = getSeoAuditProduct('advanced');
    expect(basic.seoTitle).not.toBe(advanced.seoTitle);
    expect(basic.heading).not.toBe(advanced.heading);
    expect(basic.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(basic.metaDescription.length).toBeLessThanOrEqual(160);
    expect(advanced.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(advanced.metaDescription.length).toBeLessThanOrEqual(160);
  });

  it('builds canonical metadata for both product pages', () => {
    const hub = buildMetadata({
      title: getSeoAuditProduct('priority-fix').seoTitle,
      description: getSeoAuditProduct('priority-fix').metaDescription,
      path: '/seo-audit/',
    });
    const adv = buildMetadata({
      title: getSeoAuditProduct('advanced').seoTitle,
      description: getSeoAuditProduct('advanced').metaDescription,
      path: '/seo-audit/advanced/',
    });
    expect(String(hub.alternates?.canonical)).toMatch(/\/seo-audit\/$/);
    expect(String(adv.alternates?.canonical)).toMatch(/\/seo-audit\/advanced\/$/);
  });

  it('keeps Offer prices aligned with config for both tiers', () => {
    for (const id of ['priority-fix', 'advanced'] as const) {
      const p = getSeoAuditProduct(id);
      const schema = seoAuditServiceSchema({
        path: p.route,
        name: p.name,
        description: p.metaDescription,
        priceZar: seoAuditTierPriceZar(id),
        currency: 'ZAR',
        available: true,
      });
      const offers = schema.offers as Record<string, unknown>;
      expect(offers.price).toBe(String(seoAuditTierPriceZar(id)));
    }
  });
});
