import type { Faq } from '@/types/content';
import { seoAuditPriceLabel, SEO_AUDIT_PRODUCT } from '@/config/seo-audit-product';

/**
 * Content for the SEO Audit & Priority Fix Pack landing and intake pages.
 * Commercial terms are operational drafts — attorney review before public launch (D-30).
 */

export const seoAuditWhoFor = [
  'South African small businesses',
  'Contractors and technical service providers',
  'Professional practices',
  'Local service businesses',
  'Established brochure websites that are not generating enough Google enquiries',
  'Owners unsure whether the site needs optimisation or replacement',
];

export const seoAuditEligibilityCovers = [
  'One public website and one domain',
  `A maximum of ${SEO_AUDIT_PRODUCT.maxIndexablePages} indexable pages`,
  'One language and one business',
  'One standard CMS or website platform',
  'A functioning, accessible website',
  'Owner-authorised administrative access where implementation is required',
];

export const seoAuditCustomerMustSupply = [
  'Website URL and business name',
  'Primary services and target service area',
  'Preferred customer type',
  'Website or CMS access via the platform’s permission system (not passwords in a form)',
  'Google Search Console access where available',
  'Google Business Profile URL where applicable',
  'Permission to make the included changes',
  'Confirmation that a current backup exists',
];

export const seoAuditInclusions = {
  crawlability: [
    'HTTP status, HTTPS, robots.txt and XML sitemap',
    'Robots meta, canonicals and accidental noindex',
    'Redirect problems, broken internal links and conflicting URLs',
    'Obvious crawl traps and whether important pages are discoverable',
    'Search Console indexation information where access is supplied',
  ],
  onPage: [
    'SEO titles, meta descriptions and one clear H1',
    'Heading hierarchy and page-topic clarity',
    'Duplicate or missing metadata and thin or duplicated content',
    'Descriptive URLs, image alt text and internal links',
    'Service/location relevance, CTAs and search-intent match',
  ],
  technical: [
    'Mobile usability and server-visible content',
    'JavaScript dependence and structured-data presence/validity',
    'Favicon, social metadata and basic accessibility barriers',
    'Image sizing/compression and obvious layout-shift causes',
    'Intrusive popups or interstitials',
  ],
  performance: [
    'Homepage, one primary service page and one other commercial page',
    'LCP, INP where field data exists, and CLS indicators',
    'PageSpeed/Lighthouse findings without score promises',
    'Oversized images, unnecessary scripts and font-loading issues',
    'Caching/compression indicators and obvious bottlenecks',
  ],
  searchConsole: [
    'Indexed/excluded pages, queries, impressions, clicks and CTR',
    'Sitemap status, Core Web Vitals and manual-action/security checks',
    'URL Inspection for key pages — delegated access only, never ownership transfer',
  ],
  local: [
    'GBP existence and name/telephone/service-area consistency',
    'Location wording, contact details and local landing-page quality',
    'Obvious local-search gaps (GBP creation/optimisation is an upsell)',
  ],
  conversion: [
    'Primary CTA, phone/WhatsApp visibility and form usability',
    'Trust signals, contact information and service clarity',
    'Above-the-fold message and obvious conversion friction',
  ],
};

export const seoAuditImplementationIncludes = [
  'Correcting SEO titles and meta descriptions',
  'Correcting one H1 per page and improving heading hierarchy',
  'Correcting basic canonical or accidental noindex directives',
  'Fixing simple robots.txt issues and sitemap configuration',
  'Adding or improving image alt text and contextual internal links',
  'Fixing simple broken links and basic structured-data fields',
  'Improving page-topic wording using existing customer content',
  'Adding a clearer call to action',
  'Connecting or verifying Search Console where access and DNS permit',
];

export const seoAuditExclusions = [
  'Page redesigns or new templates',
  'Rewriting complete pages or writing new articles',
  'Building new location pages',
  'Platform migrations or custom plugin/application development',
  'Advanced schema systems or server migration',
  'Malware repair, backlink removal, disavow files or penalty recovery',
  'Ecommerce optimisation or multilingual SEO',
  'Complex JavaScript performance work or major Core Web Vitals redevelopment',
  'Third-party licence costs',
  'Google Business Profile creation/optimisation (available as an upsell)',
  'Unlimited emails, calls, revisions or fixes',
];

export const seoAuditDeliverables = [
  'Executive summary',
  'Plain-language website health assessment',
  'Prioritised issue register (high / medium / low)',
  'List of fixes implemented',
  'Recommendations outside the fixed scope',
  '30-day action plan',
  'Before-and-after record for changed items',
  'Short recorded walkthrough or a maximum 20-minute handover call',
  'Optional quotation for follow-up work where appropriate',
];

export const seoAuditProcess = [
  {
    title: 'Purchase and complete the intake',
    body: 'Buy via secure checkout when configured, or request the pack and complete the intake form.',
  },
  {
    title: 'Supply website and Search Console access',
    body: 'Grant access through the platform’s permission system. The turnaround clock starts only after required access arrives.',
  },
  {
    title: 'Audit and implement eligible priority fixes',
    body: `We audit the site and implement up to ${SEO_AUDIT_PRODUCT.implementationPagesOrMinutes.maxPages} priority-page fixes or ${SEO_AUDIT_PRODUCT.implementationPagesOrMinutes.maxMinutes} minutes of implementation — whichever limit is reached first.`,
  },
  {
    title: 'Receive the report, action plan and walkthrough',
    body: 'You receive the deliverables pack and a short walkthrough or handover call.',
  },
];

export const seoAuditExampleIssues = [
  'Important pages blocked by robots.txt or accidental noindex',
  'Duplicate titles and thin service pages competing with each other',
  'Missing or vague H1s and weak calls to action',
  'Broken internal links and conflicting canonicals',
  'Oversized images hurting mobile LCP',
  'Search Console coverage gaps that nobody is watching',
];

export const seoAuditFollowUps = [
  'Priority SEO implementation sprint',
  'Website content and service-page improvement',
  'Website redesign',
  'SEO-first website rebuild',
  'Search Console monitoring',
  'Monthly website care',
  'Local SEO and Google Business Profile support',
];

export const seoAuditTerms = [
  'One website and one domain; maximum 10 indexable pages in the fixed pack.',
  'Payment upfront. No ranking guarantee.',
  'No refund after audit work begins.',
  'Customer must provide required access; turnaround begins after access is received.',
  'Fixed implementation allowance — excess recommendations are quoted separately.',
  'Third-party fees are excluded.',
  'Results depend on competition, content, authority, website condition and ongoing work.',
  'Commercial terms are operational drafts pending attorney review before public launch.',
];

export const seoAuditFaqs: Faq[] = [
  {
    question: 'Is this a full SEO campaign or retainer?',
    answer:
      'No. It is a once-off audit with a capped set of priority fixes and a 30-day action plan. Ongoing campaigns and retainers are separate, optional services.',
    group: 'process',
  },
  {
    question: 'What if my website has more than 10 pages?',
    answer:
      'Use the Advanced SEO Audit (up to 250 crawlable URLs) when the site is larger or ecommerce/catalogue. Multilingual, multi-store or sites above those limits need a custom audit — the eligibility check routes you correctly and keeps the lead.',
    group: 'process',
  },
  {
    question: 'Will you guarantee rankings?',
    answer:
      'No honest provider can. We identify problems, implement eligible fixes and give you a prioritised plan. Rankings depend on competition, content, authority and ongoing work.',
    group: 'technical',
  },
  {
    question: 'Do I need to give you my passwords?',
    answer:
      'No. Grant access through your CMS or hosting permission system, and invite us to Search Console with limited permission. Never send passwords or payment-card details through the intake form.',
    group: 'process',
  },
  {
    question: `What does ${seoAuditPriceLabel()} include for implementation?`,
    answer: `Up to five priority-page fixes or 90 minutes of implementation — whichever comes first. Larger fixes are listed in the report and quoted separately.`,
    group: 'cost',
  },
  {
    question: 'How fast is delivery?',
    answer: `Within ${SEO_AUDIT_PRODUCT.turnaroundBusinessDays} business days after payment, eligibility confirmation and receipt of all required access.`,
    group: 'process',
  },
];
