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
    expect(rec.projectValueLabel).toMatch(/R35,000/);
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

  it('recommends Search Care monthly product', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'search-care',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('search-care');
    expect(rec.projectValueLabel).toMatch(/R3,950\/mo/);
    expect(rec.budgetHint).toBe('Under R5,000');
  });

  it('recommends Measurement & Reporting monthly add-on', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'professional',
      primaryNeed: 'measurement-reporting',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('analytics-and-conversion-tracking');
    expect(rec.projectValueLabel).toMatch(/R1,250\/mo/);
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
    expect(neu.projectValueLabel).toMatch(/R9,500/);
    expect(redesign.projectValueLabel).toMatch(/R22,000/);
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
