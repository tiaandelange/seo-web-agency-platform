import type { Faq } from '@/types/content';
import { seoAuditTierPriceLabel } from '@/config/seo-audit-product';

/** Advanced-tier content — distinct from the hub / Priority Fix Pack. */

export const advancedWhoFor = [
  'Established business websites',
  'Ecommerce websites and product catalogues',
  'Supplier and manufacturer websites',
  'Content-rich multi-service sites',
  'Websites that grew without a clear architecture',
  'Sites with indexation or duplication concerns',
  'Businesses preparing for a redesign or migration',
  'Businesses seeing declining organic visibility',
];

export const advancedEligibilityCovers = [
  'One public website and one domain',
  'One primary country or search market and one language',
  'Up to 250 crawlable URLs',
  'Up to 25 manually reviewed priority pages',
  'Up to 3 organic competitors',
  'One Search Console property and one GA4 property where available',
  'One Google Business Profile where relevant',
  'One ecommerce, catalogue or standard website platform',
  'One stakeholder handover session',
];

export const advancedCustomerMustSupply = [
  'Website URL and sitemap URL where available',
  'CMS or platform and approximate page/product count',
  'Search Console access (required for the advanced pack)',
  'GA4 access where available',
  'GBP access where relevant',
  'Primary services or product categories and important service areas',
  'Primary competitors and priority products/services',
  'Recent website changes and known ranking or indexation concerns',
  'Permission to review and implement approved changes',
  'Confirmation that a current backup exists',
];

export const advancedComplexityBlocks = [
  'More than 250 crawlable URLs',
  'More than one language or international subdirectory structure',
  'Multiple domains or subdomains requiring review',
  'More than one ecommerce storefront',
  'More than 25 priority templates or page types',
  'Known manual action, malware or active security problem',
  'Recent complex migration requiring forensic analysis',
  'Substantial JavaScript rendering problems or server-log analysis',
  'Extensive backlink remediation, content rewriting or custom development',
  'Enterprise stakeholder workshops',
];

export const advancedScopeSections: { heading: string; items: string[] }[] = [
  {
    heading: 'Complete crawl and indexation',
    items: [
      'HTTP status codes, redirect chains/loops and internal broken links',
      'Robots.txt, XML sitemap coverage and quality',
      'Meta robots, observable X-Robots-Tag and canonical conflicts',
      'Duplicate URLs, trailing-slash, HTTP/HTTPS and www variants',
      'Parameter, filtered/faceted and paginated URLs',
      'Crawl depth, low-value crawlable/indexable pages and soft 404s',
      'Search Console indexing reports, Crawl Stats and URL Inspection samples',
    ],
  },
  {
    heading: 'Site architecture',
    items: [
      'Main navigation, category/service/product hierarchy and breadcrumbs',
      'Hub and supporting pages, topical relationships and internal-link depth',
      'Orphaned content, overlinked low-value pages and underlinked commercial pages',
      'Pagination, filtered navigation and internal anchor text',
      'Ecommerce/catalogue path: home → category → subcategory → product',
    ],
  },
  {
    heading: 'Template analysis',
    items: [
      'Identify meaningful page types (home, service, location, category, product, article, project, comparison, archives, filters, system pages)',
      'Review template-level issues rather than treating every URL as a one-off',
    ],
  },
  {
    heading: 'On-page SEO (up to 25 priority pages)',
    items: [
      'Title quality/duplication/intent, meta descriptions and H1 hierarchy',
      'Content focus, search intent, keyword overlap and thin/duplicate content',
      'Internal links, CTAs, trust information and location relevance',
      'Structured information and indexation suitability',
    ],
  },
  {
    heading: 'Keyword and content-gap analysis',
    items: [
      'Primary commercial themes and page-to-keyword mapping',
      'Overlap, unsupported targets and missing commercial/supporting pages',
      'Competitor topic comparison and intent mismatch',
      'Consolidation candidates — and pages that should not be created',
    ],
  },
  {
    heading: 'Competitor review (up to 3)',
    items: [
      'Architecture, coverage, content depth and page types',
      'Internal linking, metadata, structured data and trust signals',
      'Backlink-profile direction and search-result presentation',
    ],
  },
  {
    heading: 'Performance and Core Web Vitals',
    items: [
      'Representative templates: home, category/service, product/detail, article, one more',
      'LCP, INP where field data exists, CLS and render-blocking resources',
      'JS payload, images, fonts, third-party scripts, caching and compression',
      'Lab vs field data; confirmed vs likely causes — no score promises',
    ],
  },
  {
    heading: 'Structured data',
    items: [
      'Organisation, LocalBusiness/ProfessionalService, Service, Product/Offer where relevant',
      'BreadcrumbList, Article, FAQ, WebSite/WebPage and case-study markup',
      'Validation errors and visible-content consistency — no invented ratings',
    ],
  },
  {
    heading: 'Ecommerce and catalogue (where applicable)',
    items: [
      'Category structure, product discoverability and faceted navigation',
      'Variants, canonicalisation, availability and product schema',
      'Internal search, out-of-stock/discontinued handling and related products',
      'Feeds/Merchant Center readiness where relevant — setup remains a separate service',
    ],
  },
  {
    heading: 'Backlink-profile assessment',
    items: [
      'Linking domains, obvious spam, lost/broken links and important linked pages',
      'Links to redirects/errors, competitor differences and authority concentration',
      'Directional only — not disavow submission or full remediation',
    ],
  },
  {
    heading: 'Local SEO and conversion (where relevant)',
    items: [
      'GBP, business details, service areas and location-page quality',
      'Local schema, map links and obvious local content gaps',
      'Above-the-fold message, CTAs, forms, phone/WhatsApp and trust assets',
    ],
  },
];

export const advancedImplementationIncludes = [
  'Title and description corrections',
  'Heading corrections and basic canonical/noindex fixes',
  'Robots.txt and sitemap configuration corrections',
  'Straightforward redirect corrections',
  'Internal-link and broken-link improvements',
  'Basic schema and image-alt corrections',
  'Simple CTA improvements and low-risk template configuration changes',
  'Basic Search Console setup corrections',
];

export const advancedExclusions = [
  'Full template redevelopment or major information-architecture changes',
  'Content migration or extensive redirect maps',
  'Complete schema systems, custom plugins or complex JavaScript repairs',
  'Server or database changes and platform migration',
  'Extensive content writing',
  'Backlink remediation or log-file analysis',
  'International or multilingual SEO architecture',
  'Full ecommerce-feed work',
  'Unlimited revisions, calls or stakeholder workshops',
];

export const advancedDeliverables = [
  'Executive summary and technical health assessment',
  'Full crawl, indexation and architecture assessments',
  'Template-level and priority-page findings',
  'Keyword/content-gap and competitor comparison',
  'Core Web Vitals, structured data, ecommerce/catalogue and backlink findings where applicable',
  'Local SEO and conversion/trust findings where applicable',
  'Prioritised issue register with impact-versus-effort matrix',
  'List of fixes implemented and work outside scope',
  '90-day implementation roadmap and spreadsheet issue register',
  'Recorded walkthrough and maximum 45-minute strategy handover',
  'Optional quotation for follow-up implementation',
];

export const advancedProcess = [
  {
    title: 'Purchase or request and complete intake',
    body: 'Confirm eligibility, then complete the advanced intake with access and competitor details.',
  },
  {
    title: 'Grant Search Console and platform access',
    body: 'Turnaround starts only after required access and information arrive — never via password forms.',
  },
  {
    title: 'Crawl, analyse and implement eligible fixes',
    body: 'Comprehensive audit plus up to eight eligible fixes or two hours of implementation.',
  },
  {
    title: 'Roadmap handover',
    body: 'Receive the report pack, spreadsheet register, recording and 45-minute strategy call.',
  },
];

export const advancedFaqs: Faq[] = [
  {
    question: 'How is this different from the R2,950 Priority Fix Pack?',
    answer:
      'The Priority Fix Pack is for small sites (≤10 pages) with a focused crawl and 30-day plan. The Advanced Audit covers up to 250 crawlable URLs, deeper architecture/content/competitor work, ecommerce/catalogue review where relevant, and a 90-day roadmap.',
    group: 'process',
  },
  {
    question: 'My site has more than 250 URLs — can I still buy this?',
    answer:
      'Not as a fixed pack. Sites above the complexity gate need a custom audit scope. Use the eligibility check and we will route you to a proposal with your details retained.',
    group: 'process',
  },
  {
    question: 'Do you guarantee rankings after the advanced audit?',
    answer:
      'No. We deliver evidence-based findings, eligible fixes and a prioritised roadmap. Results depend on competition, content, authority, implementation and ongoing work.',
    group: 'technical',
  },
  {
    question: `What does the ${seoAuditTierPriceLabel('advanced')} implementation allowance cover?`,
    answer:
      'Up to eight eligible fixes or two hours — whichever comes first. Larger structural or development work is documented, estimated and quoted separately before any extra implementation.',
    group: 'cost',
  },
  {
    question: 'Is Search Console required?',
    answer:
      'Yes for the advanced pack — delegated access, not ownership transfer. Without it, indexation and query analysis is incomplete and we may re-scope.',
    group: 'process',
  },
];

export const advancedPriorityFields = [
  'Issue title',
  'Affected URL or template',
  'Evidence',
  'Severity (Critical / High / Medium / Low / Observation)',
  'Likely business and SEO impact',
  'Recommended action and difficulty',
  'Responsible role',
  'Included / fixed / validation method',
];
