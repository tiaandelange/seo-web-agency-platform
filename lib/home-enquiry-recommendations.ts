/**
 * Honest system-shape recommendations for the homepage enquiry anchor.
 * Describes scope — never public pricing or fabricated outcomes.
 */

export type EnquiryInputs = {
  businessType: string;
  primaryNeed: string;
  projectValue: string;
  websiteStatus: string;
};

export type EnquiryRecommendation = {
  headline: string;
  items: string[];
  serviceSlug: string;
  budgetHint: string;
  messageSeed: string;
};

export function buildEnquiryRecommendation(inputs: EnquiryInputs): EnquiryRecommendation {
  const { businessType, primaryNeed, projectValue, websiteStatus } = inputs;

  const items: string[] = [];
  let serviceSlug = 'lead-generation-websites';
  let headline = 'Lead-generation website system';

  if (primaryNeed === 'catalogue' || businessType === 'manufacturer') {
    serviceSlug = 'product-catalogue-websites';
    headline = 'Catalogue & RFQ system';
    items.push('Structured product catalogue with category SEO');
    items.push('RFQ basket and qualification workflow');
    items.push('Admin product and enquiry list');
  } else if (primaryNeed === 'ecommerce') {
    serviceSlug = 'ecommerce-websites';
    headline = 'Ecommerce website system';
    items.push('Category and product pages built for search');
    items.push('Checkout with SA payment gateway');
    items.push('Order notifications and basic admin');
  } else if (primaryNeed === 'portal' || primaryNeed === 'systems') {
    serviceSlug = 'rfq-and-quotation-systems';
    headline = 'Enquiry-to-quote workflow';
    items.push('Public website with qualification forms');
    items.push('RFQ inbox and quotation builder');
    items.push('Status tracking and client approval step');
  } else if (websiteStatus === 'none' || websiteStatus === 'diy') {
    serviceSlug = 'lead-generation-websites';
    headline = 'Lead-generation website system';
    items.push('SEO-mapped service and location pages');
    items.push('Enquiry forms with conversion tracking');
    items.push('Search Console and analytics baseline');
  } else {
    serviceSlug = 'website-redesign';
    headline = 'Redesign with search architecture';
    items.push('Audit of current structure and indexation');
    items.push('Rebuilt page map aligned to search demand');
    items.push('Conversion and enquiry pathway refresh');
  }

  if (projectValue === 'over-120k' || primaryNeed === 'portal') {
    items.push('Scoped admin or portal module (discovery required)');
  } else if (projectValue !== 'under-30k') {
    items.push('Optional ongoing maintenance plan');
  }

  const budgetMap: Record<string, string> = {
    'under-30k': 'Under R15,000',
    '30-60k': 'R30,000 – R60,000',
    '60-120k': 'R60,000 – R120,000',
    'over-120k': 'Over R120,000',
    unsure: '',
  };

  const messageSeed = [
    'Enquiry via homepage system preview.',
    `Business type: ${businessType}.`,
    `Primary need: ${primaryNeed}.`,
    `Website status: ${websiteStatus}.`,
    `Recommended shape: ${headline}.`,
  ].join(' ');

  return {
    headline,
    items,
    serviceSlug,
    budgetHint: budgetMap[projectValue] ?? '',
    messageSeed,
  };
}

export function enquiryQuoteHref(rec: EnquiryRecommendation): string {
  const params = new URLSearchParams();
  params.set('service_interest', rec.serviceSlug);
  if (rec.budgetHint) params.set('budget_band', rec.budgetHint);
  params.set('message', rec.messageSeed);
  return `/request-a-quote/?${params.toString()}`;
}
