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
      projectValue: '60-120k',
      websiteStatus: 'outdated',
    });
    expect(rec.serviceSlug).toBe('product-catalogue-websites');
    expect(rec.items.some((i) => i.includes('RFQ'))).toBe(true);
  });

  it('builds quote href with prefilled params', () => {
    const rec = buildEnquiryRecommendation({
      businessType: 'contractor',
      primaryNeed: 'lead-gen',
      projectValue: '30-60k',
      websiteStatus: 'diy',
    });
    const href = enquiryQuoteHref(rec);
    expect(href).toContain('/request-a-quote/');
    expect(href).toContain('service_interest=');
    expect(href).toContain('message=');
  });
});
