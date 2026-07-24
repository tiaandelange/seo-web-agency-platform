import { describe, expect, it } from 'vitest';
import {
  buildEnquiryRecommendation,
  enquiryQuoteHref,
} from '../lib/home-enquiry-recommendations';

describe('home enquiry recommendations', () => {
  it('recommends catalogue system for manufacturers', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'manufacturer',
      primaryNeed: 'catalogue',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('product-catalogue-websites');
    expect(rec.items.some((i) => i.includes('RFQ'))).toBe(true);
    expect(rec.projectValueLabel).toMatch(/R45,000/);
  });

  it('recommends SEO audit with fixed pack range', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'seo-audit',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('seo-audit-basic');
    expect(rec.headline.toLowerCase()).toContain('seo audit');
    expect(rec.projectValueLabel).toMatch(/R2,950/);
    expect(rec.items.length).toBeGreaterThanOrEqual(3);
    expect(rec.items.length).toBeLessThanOrEqual(5);
  });

  it('varies project value for new site vs redesign', () => {
    const neu = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'lead-gen',
      websiteStatus: 'none',
    });
    const redesign = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'lead-gen',
      websiteStatus: 'redesign',
    });
    expect(neu.serviceSlug).toBe('lead-generation-websites');
    expect(redesign.serviceSlug).toBe('website-redesign');
    expect(neu.projectValueLabel).not.toBe(redesign.projectValueLabel);
  });

  it('builds quote href with prefilled params', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'lead-gen',
      websiteStatus: 'diy',
    });
    const href = enquiryQuoteHref(rec);
    expect(href).toContain('/request-a-quote/');
    expect(href).toContain('service_interest=');
    expect(href).toContain('budget_band=');
    expect(href).toContain('message=');
  });
});
