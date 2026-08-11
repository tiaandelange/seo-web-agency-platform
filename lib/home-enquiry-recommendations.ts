/**
 * Honest system-shape recommendations for the homepage enquiry anchor.
 * Describes scope and published indicative ranges — never fabricated outcomes.
 * Ranges derive from data/packages.ts and config/seo-audit-product.ts (D-11).
 */

import {
  CUSTOM_SYSTEM_FROM_ZAR,
  formatPackageIndicativeRange,
  formatZar,
  getPackage,
} from '@/data/packages';
import { SEO_AUDIT_PRODUCTS } from '@/config/seo-audit-product';

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

const MEASUREMENT_REPORTING_ZAR = 1250;
const SEARCH_CARE_ZAR = 3950;

function packageRangeLabel(slug: string): string {
  const pkg = getPackage(slug);
  if (!pkg?.priceRange) {
    throw new Error(`Package ${slug} must have a priceRange for enquiry labels`);
  }
  return formatPackageIndicativeRange(pkg.priceRange.min, pkg.priceRange.max);
}

function starterToProfessionalSpanLabel(): string {
  const starter = getPackage('starter-business-website');
  const pro = getPackage('professional-business-website');
  if (!starter?.priceRange || !pro?.priceRange) {
    throw new Error('Starter and professional packages require priceRange');
  }
  return formatPackageIndicativeRange(starter.priceRange.min, pro.priceRange.max);
}

function resolveSystemShape(inputs: EnquiryInputs): SystemShape {
  const { businessType, primaryNeed, websiteStatus } = inputs;

  if (primaryNeed === 'seo-audit') {
    const basic = SEO_AUDIT_PRODUCTS['priority-fix'].defaultPriceZar;
    const advanced = SEO_AUDIT_PRODUCTS['advanced'].defaultPriceZar;
    return {
      serviceSlug: 'seo-audit-basic',
      headline: 'SEO audit with priority fixes',
      projectValueLabel: `${formatZar(basic)} – ${formatZar(advanced)} (fixed packs)`,
      budgetHint: 'R5,000–R10,000',
      items: [
        'Technical and on-page review of the live site (crawl + priority pages)',
        'Prioritised fix list ranked by commercial impact',
        `Choice of Priority Fix Pack (${formatZar(basic)}) or Advanced audit (${formatZar(advanced)})`,
        'Written findings you can action in-house or hand to a developer',
      ],
    };
  }

  if (primaryNeed === 'search-care') {
    return {
      serviceSlug: 'search-care',
      headline: 'Search Care — monthly search health',
      projectValueLabel: `${formatZar(SEARCH_CARE_ZAR)}/mo`,
      budgetHint: 'Under R5,000',
      items: [
        'Monthly Search Console and GA4 health review with plain-English actions',
        'Capped technical and on-page fixes (up to five eligible fixes or two hours)',
        'Looker Studio / reporting kept current so you can see enquiry trends',
        'No content mill, link-building or ranking guarantees — month-to-month',
      ],
    };
  }

  if (primaryNeed === 'measurement-reporting') {
    return {
      serviceSlug: 'analytics-and-conversion-tracking',
      headline: 'Measurement & Reporting (monthly add-on)',
      projectValueLabel: `${formatZar(MEASUREMENT_REPORTING_ZAR)}/mo`,
      budgetHint: 'Under R5,000',
      items: [
        'Monthly conversion reporting from GA4 events that matter (calls, WhatsApp, forms)',
        'Looker Studio dashboard upkeep after a healthy tracking setup',
        'Plain-English insight readout you can act on each month',
        'Stackable on a support plan — not a full SEO campaign',
      ],
    };
  }

  if (primaryNeed === 'catalogue' || businessType === 'manufacturer') {
    return {
      serviceSlug: 'product-catalogue-websites',
      headline: 'Catalogue & RFQ system',
      projectValueLabel: packageRangeLabel('product-catalogue-website'),
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
      projectValueLabel: packageRangeLabel('ecommerce-website'),
      budgetHint: 'R45,000–R75,000',
      items: [
        'Search-first category and product architecture (not a theme grid)',
        'Cart and checkout with a South African payment gateway',
        'Delivery options and order notifications that match fulfilment',
        'GA4 purchase and funnel events readable from day one',
      ],
    };
  }

  if (primaryNeed === 'portal' || primaryNeed === 'systems') {
    return {
      serviceSlug: 'rfq-and-quotation-systems',
      headline: 'Enquiry-to-quote workflow',
      projectValueLabel: `From ${formatZar(CUSTOM_SYSTEM_FROM_ZAR)} (indicative; discovery first)`,
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
      projectValueLabel: starterToProfessionalSpanLabel(),
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
    projectValueLabel: packageRangeLabel('professional-business-website'),
    budgetHint: 'R20,000–R40,000',
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
