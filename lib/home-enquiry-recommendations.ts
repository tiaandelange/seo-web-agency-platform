/**
 * Honest system-shape recommendations for the homepage enquiry anchor.
 * Describes scope and published indicative ranges — never fabricated outcomes.
 * Ranges mirror data/packages.ts and config/seo-audit-product.ts (D-11).
 */

export type EnquiryInputs = {
  businessType: string;
  primaryNeed: string;
  websiteStatus: string;
};

export type EnquiryRecommendation = {
  headline: string;
  items: string[];
  /** Human-readable indicative project cost for the selected system shape. */
  projectValueLabel: string;
  serviceSlug: string;
  /** Prefill value for /request-a-quote/ budget_band (must match PROPOSAL_BUDGET_BANDS). */
  budgetHint: string;
  messageSeed: string;
};

type SystemShape = {
  headline: string;
  items: string[];
  serviceSlug: string;
  projectValueLabel: string;
  budgetHint: string;
};

function resolveSystemShape(inputs: EnquiryInputs): SystemShape {
  const { businessType, primaryNeed, websiteStatus } = inputs;

  if (primaryNeed === 'seo-audit') {
    return {
      serviceSlug: 'seo-audit-basic',
      headline: 'SEO audit with priority fixes',
      projectValueLabel: 'R2,950 – R8,500 (fixed packs)',
      budgetHint: 'R5,000–R10,000',
      items: [
        'Technical and on-page review of the live site (crawl + priority pages)',
        'Prioritised fix list ranked by commercial impact',
        'Choice of Priority Fix Pack (R2,950) or Advanced audit (R8,500)',
        'Written findings you can action in-house or hand to a developer',
      ],
    };
  }

  if (primaryNeed === 'catalogue' || businessType === 'manufacturer') {
    return {
      serviceSlug: 'product-catalogue-websites',
      headline: 'Catalogue & RFQ system',
      projectValueLabel: 'R45,000 – R90,000 (indicative)',
      budgetHint: 'R40,000–R75,000',
      items: [
        'Searchable product catalogue with category and product SEO pages',
        'RFQ basket so buyers request quotes on selected items',
        'Admin workflow to manage products, prices and inbound enquiries',
        'Handover with tracking and Search Console baseline',
      ],
    };
  }

  if (primaryNeed === 'ecommerce') {
    return {
      serviceSlug: 'ecommerce-websites',
      headline: 'Ecommerce website system',
      projectValueLabel: 'R70,000 – R160,000 (indicative)',
      budgetHint: 'R75,000+',
      items: [
        'Category and product pages structured for search and conversion',
        'Cart and checkout with a South African payment gateway',
        'Order notifications plus a practical product/order admin',
        'Analytics events for purchase and key funnel steps',
      ],
    };
  }

  if (primaryNeed === 'portal' || primaryNeed === 'systems') {
    return {
      serviceSlug: 'rfq-and-quotation-systems',
      headline: 'Enquiry-to-quote workflow',
      projectValueLabel: 'From R80,000 (indicative; discovery first)',
      budgetHint: 'R75,000+',
      items: [
        'Public website with qualification forms that feed a structured RFQ',
        'Admin inbox, quotation builder and status tracking',
        'Client-facing approval step so quotes do not stall in email',
        'Paid discovery produces the written specification before build',
      ],
    };
  }

  if (websiteStatus === 'none' || websiteStatus === 'diy') {
    return {
      serviceSlug: 'lead-generation-websites',
      headline: 'Lead-generation website system',
      projectValueLabel: 'R14,000 – R60,000 (indicative)',
      budgetHint: 'R20,000–R40,000',
      items: [
        'SEO-mapped service and location pages matched to how buyers search',
        'Enquiry forms with call and WhatsApp conversion tracking',
        'Search Console and analytics baseline from day one',
        'You own the domain, content and code — no lock-in',
      ],
    };
  }

  // Established / redesign path
  return {
    serviceSlug: 'website-redesign',
    headline: 'Redesign with search architecture',
    projectValueLabel: 'R28,000 – R60,000 (indicative)',
    budgetHint: 'R40,000–R75,000',
    items: [
      'Audit of current structure, indexation and enquiry pathways',
      'Rebuilt page map aligned to real search demand',
      'Conversion and form pathways refreshed for qualified enquiries',
      'Redirect and launch plan so existing rankings are not discarded',
    ],
  };
}

export function buildEnquiryRecommendation(inputs: EnquiryInputs): EnquiryRecommendation {
  const shape = resolveSystemShape(inputs);

  const messageSeed = [
    'Enquiry via homepage system preview.',
    `Business type: ${inputs.businessType}.`,
    `Primary need: ${inputs.primaryNeed}.`,
    `Website status: ${inputs.websiteStatus}.`,
    `Recommended shape: ${shape.headline}.`,
    `Indicative project cost: ${shape.projectValueLabel}.`,
  ].join(' ');

  return {
    headline: shape.headline,
    items: shape.items,
    projectValueLabel: shape.projectValueLabel,
    serviceSlug: shape.serviceSlug,
    budgetHint: shape.budgetHint,
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
