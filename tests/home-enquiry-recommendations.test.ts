import { describe, expect, it } from 'vitest';
import {
  PROPOSAL_BUDGET_BAND_UNDER_5K,
} from '@/data/proposal-form';
import {
  buildEnquiryRecommendation,
  enquiryQuoteHref,
} from '@/lib/home-enquiry-recommendations';
import { formatZar, formatZarMonthly } from '@/lib/format-zar';

const NBSP = '\u202f';

describe('home enquiry recommendations', () => {
  it('recommends catalogue system for manufacturers', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'manufacturer',
      primaryNeed: 'catalogue',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('product-catalogue-websites');
    expect(rec.items.some((i) => i.includes('RFQ'))).toBe(true);
    expect(rec.projectValueLabel).toContain(`R35${NBSP}000`);
  });

  it('recommends SEO audit with fixed pack range', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'seo-audit',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('seo-audit-basic');
    expect(rec.headline.toLowerCase()).toContain('seo audit');
    expect(rec.projectValueLabel).toContain(`R2${NBSP}950`);
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
    expect(rec.projectValueLabel).toBe(formatZarMonthly(3950));
    expect(rec.budgetHint).toBe(PROPOSAL_BUDGET_BAND_UNDER_5K);
  });

  it('recommends Measurement & Reporting monthly add-on', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'professional',
      primaryNeed: 'measurement-reporting',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('analytics-and-conversion-tracking');
    expect(rec.projectValueLabel).toBe(formatZarMonthly(1250));
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
    expect(neu.projectValueLabel).toContain(`R9${NBSP}500`);
    expect(redesign.projectValueLabel).toContain(`R22${NBSP}000`);
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
    expect(decodeURIComponent(href)).toContain(formatZar(9500).slice(0, 4));
  });
});
