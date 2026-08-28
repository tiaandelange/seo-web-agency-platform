import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  SEO_AUDIT_HUB,
  getSeoAuditProduct,
  seoAuditTierPriceZar,
} from '../config/seo-audit-product';
import {
  seoAuditAtAGlance,
  seoAuditFaqs,
  seoAuditHubOpening,
  seoAuditOwnSiteSampleFindings,
} from '../data/seo-audit';
import { buildMetadata } from '../lib/seo';
import { seoAuditServiceSchema } from '../lib/schema';

describe('SEO audit hub content', () => {
  const pageSource = readFileSync(join(process.cwd(), 'app/seo-audit/page.tsx'), 'utf8');

  it('renders hub opening, at-a-glance and sample-findings data on the page', () => {
    expect(pageSource).toContain('seoAuditHubOpening');
    expect(pageSource).toContain('seoAuditAtAGlance');
    expect(pageSource).toContain('seoAuditOwnSiteSampleFindings');
    expect(seoAuditHubOpening.lead).toMatch(/SEO audit services/i);
    expect(seoAuditHubOpening.lead).toMatch(/South African/i);
    expect(seoAuditAtAGlance.examined).toMatch(/Technical crawl/i);
    expect(seoAuditOwnSiteSampleFindings.length).toBeGreaterThanOrEqual(5);
  });

  it('includes SA services FAQ without keyword stuffing the title', () => {
    const saFaq = seoAuditFaqs.find((f) => /across South Africa/i.test(f.question));
    expect(saFaq).toBeDefined();
    expect(getSeoAuditProduct('priority-fix').heading).toBe(
      'SEO Audits with Priority Fixes — Clear Scope, Once-Off Price',
    );
    expect(SEO_AUDIT_HUB.seoTitle).toBe('SEO Audit South Africa');
  });

  it('links to pricing, SEO cost guide, SEO service and intake paths', () => {
    expect(pageSource).toContain('/pricing/');
    expect(pageSource).toContain('/resources/seo-cost-south-africa/');
    expect(pageSource).toContain('/services/seo-website-development/');
    expect(pageSource).toContain('basic.intakePath');
    expect(pageSource).toContain('#eligibility');
  });

  it('keeps metadata within SEO length bounds after hub refresh', () => {
    const meta = buildMetadata({
      title: SEO_AUDIT_HUB.seoTitle,
      description: SEO_AUDIT_HUB.metaDescription,
      path: '/seo-audit/',
    });
    expect(SEO_AUDIT_HUB.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(SEO_AUDIT_HUB.metaDescription.length).toBeLessThanOrEqual(160);
    expect(SEO_AUDIT_HUB.metaDescription).toMatch(/website SEO audit services/i);
    expect(String(meta.alternates?.canonical)).toMatch(/\/seo-audit\/$/);
  });

  it('keeps honest Offer schema for both tiers', () => {
    for (const id of ['priority-fix', 'advanced'] as const) {
      const p = getSeoAuditProduct(id);
      const schema = seoAuditServiceSchema({
        path: id === 'priority-fix' ? '/seo-audit/' : p.route,
        name: p.name,
        description: p.shortDescription,
        priceZar: seoAuditTierPriceZar(id),
        currency: 'ZAR',
        available: true,
      });
      expect(schema['@type']).toBe('Service');
      const offers = schema.offers as Record<string, unknown>;
      expect(offers.price).toBe(String(seoAuditTierPriceZar(id)));
      expect(schema).not.toHaveProperty('aggregateRating');
    }
  });

  it('labels sample findings as own-site architecture, not client results', () => {
    expect(pageSource).toMatch(/own site architecture/i);
    expect(pageSource).toMatch(/not findings from a client/i);
    expect(pageSource).not.toMatch(/FAQPage|faqPageSchema/i);
  });
});
