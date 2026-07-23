import type { PackageOffer } from '@/types/content';

/**
 * Productised packages — transactional intent pages.
 * priceRange values are published indicative ranges (D-11): the UI must render
 * the word “indicative” wherever a range appears. The fixed, itemised quote after
 * scoping is the binding number.
 */
export const packages: PackageOffer[] = [
  {
    slug: 'one-page-website',
    serviceSlug: 'lead-generation-websites',
    title: 'One-Page Website Package',
    metaDescription:
      'One-page website package: focused landing page for one offer, SEO-structured, yours to own. Indicative R6,500–R12,000. Fixed quote after scoping.',
    heading: 'One-page website package',
    intro:
      'A deliberately single-page website for one clear offer — a campaign landing page, a single-service trade or contractor site, or a credible first presence. One long-form page with sectioned anchors, structured for search and owned by you — not a cut-down multi-page site. When you need more pages later, it upgrades cleanly into the Starter or Professional builds on the same architecture.',
    status: 'live',
    dateCreated: '2026-07-23',
    dateUpdated: '2026-07-23',
    placeholder: false,
    idealFor: [
      'A single-service contractor or trade that needs one strong page, not a full brochure site',
      'A campaign or PPC landing page that must convert and still be properly structured',
      'A new venture that needs one credible, findable page live quickly',
    ],
    inclusions: [
      'One long-form page with clear sectioned anchors (not multiple indexed URLs)',
      'Keyword mapping for the one core offer before build',
      'Mobile-first responsive build with fast load times',
      'Unique title, meta description and schema markup',
      'Enquiry form plus click-to-call and WhatsApp actions',
      'POPIA-compliant conversion tracking setup: GA4, Tag Manager and Consent Mode v2, with conversion events for calls, WhatsApp and forms',
      'Google Search Console setup',
      'XML sitemap and robots configuration',
      'Launch checklist walkthrough and handover documentation',
      'You own the domain, content and code — no lock-in',
    ],
    exclusions: [
      'Multiple indexed pages (about, services, areas) — see the Starter package',
      'Blog, resources or content hubs',
      'Product catalogues or ecommerce — see the larger packages',
      'Logo design and brand identity (can be briefed separately)',
      'Copywriting beyond structural guidance (add-on)',
      'Ongoing SEO campaigns',
    ],
    priceRange: { min: 6500, max: 12000, currency: 'ZAR', indicative: true },
    timeline: '1–2 weeks from content kickoff',
    faqs: [
      {
        question: 'Will one page rank in Google?',
        answer:
          'A single well-structured page can rank for a focused, long-tail intent — for example one service in one area. It will not compete for broad head terms the way a multi-page site can. We set expectations honestly at scoping so the page matches a realistic search goal.',
        group: 'technical',
      },
      {
        question: 'Can I grow it into a full site later?',
        answer:
          'Yes. The one-pager is built on the same architecture as the Starter and Professional packages, so adding pages, areas or a quoting flow later is an extension — not a rebuild from scratch.',
        group: 'process',
      },
    ],
    primaryKeywordCluster: 'one page website',
  },
    {
    slug: 'starter-business-website',
    serviceSlug: 'business-websites',
    title: 'Starter Business Website Package',
    metaDescription:
      'Starter business website package: up to 6 SEO-structured pages, mobile-first build, Search Console setup. Indicative R14,000–R25,000. Fixed quote after scoping.',
    heading: 'Starter business website package',
    intro:
      'The right first website: compact, properly structured for search, and owned by you. Built for new and small businesses replacing no site — or a DIY site Google ignores.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: false,
    idealFor: [
      'A new business that needs a credible presence customers can find',
      'A trade or service owner replacing a DIY builder site that never ranked',
      'A one-person practice that wants the fundamentals done properly once',
    ],
    inclusions: [
      'Up to 6 pages: home, about, up to 3 service pages, contact',
      'Keyword mapping for your core services before build',
      'Mobile-first responsive build with fast load times',
      'Unique titles, meta descriptions and schema markup',
      'Contact form, click-to-call and WhatsApp actions',
      'POPIA-compliant conversion tracking setup: GA4, Tag Manager and Consent Mode v2, with conversion events for calls, WhatsApp and forms',
      'Google Search Console setup',
      'XML sitemap and robots configuration',
      'Launch checklist walkthrough and handover documentation',
      'You own the domain, content and code — no lock-in',
    ],
    exclusions: [
      'Logo design and brand identity (can be briefed separately)',
      'Copywriting beyond structural guidance (add-on)',
      'Ecommerce, catalogues or custom features — see the larger packages',
      'Ongoing SEO campaigns',
    ],
    priceRange: { min: 14000, max: 25000, currency: 'ZAR', indicative: true },
    timeline: '2–4 weeks from content kickoff',
    faqs: [
      {
        question: 'What do you need from me to start?',
        answer:
          'A scoping call, your service list and prices or ranges, any existing logo and photos, and about two focused hours of your input across the project for content decisions and review. We structure everything else.',
        group: 'process',
      },
      {
        question: 'Can the site grow later without rebuilding?',
        answer:
          'Yes — that is the point of starting on a proper architecture. More service pages, areas, a catalogue or even a booking or quoting system extend the same foundation. Nothing about the Starter build is throwaway.',
        group: 'technical',
      },
    ],
    primaryKeywordCluster: 'starter website package',
  },
  {
    slug: 'professional-business-website',
    serviceSlug: 'lead-generation-websites',
    title: 'Professional Business Website Package',
    metaDescription:
      'Professional lead-generation website package: 8–15 mapped pages, conversion structure, tracking and case-study setup. Indicative R28,000–R60,000.',
    heading: 'Professional business website package',
    intro:
      'The full lead-generation build: search-mapped architecture across all your services, conversion structure, measurement and proof — for established businesses that want the website carrying real commercial weight.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: false,
    idealFor: [
      'A contractor or service business whose growth depends on steady enquiries',
      'An established SME whose current site looks fine but produces nothing',
      'A firm entering a competitive metro market that needs to rank properly',
    ],
    inclusions: [
      '8–15 pages architected from keyword and competitor research',
      'Dedicated, conversion-structured page per service line',
      'Area targeting for regions you genuinely serve',
      'Quote-request flow with spam protection and consent handling',
      'POPIA-compliant conversion tracking setup: GA4, Tag Manager and Consent Mode v2, with conversion events for calls, WhatsApp and forms',
      'Case-study structure ready for your completed projects',
      'Full metadata, schema, sitemap and indexation controls',
      'Search Console onboarding with a 90-day indexation window',
      'Everything in the Starter package’s ownership and handover terms',
    ],
    exclusions: [
      'Ongoing content production and SEO campaigns (support plans available)',
      'Paid-advertising management',
      'Ecommerce functionality — see the Ecommerce package',
    ],
    priceRange: { min: 28000, max: 60000, currency: 'ZAR', indicative: true },
    timeline: '4–7 weeks from content kickoff',
    faqs: [
      {
        question: 'What moves the price within the range?',
        answer:
          'Page count, how much copywriting help you need, the number of service areas, and any extras like photography coordination. After scoping you get a fixed itemised quote — the range exists so you can budget before we talk.',
        group: 'cost',
      },
      {
        question: 'How involved do I need to be?',
        answer:
          'Front-loaded and bounded: a scoping workshop, service-detail questionnaires, and review points at structure, draft and pre-launch. Plan for four to six hours total across the project.',
        group: 'process',
      },
    ],
    primaryKeywordCluster: 'professional website package',
  },
  {
    slug: 'product-catalogue-website',
    serviceSlug: 'product-catalogue-websites',
    title: 'Product Catalogue Website Package',
    metaDescription:
      'Product catalogue website package: structured range, spec sheets, RFQ basket and bulk loading from your spreadsheets. Indicative R45,000–R90,000.',
    heading: 'Product catalogue website package',
    intro:
      'Your full range online, structured and quotable: category and product pages built for search, spec sheets where buyers expect them, and an RFQ basket that turns browsing into quote requests.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: false,
    idealFor: [
      'A manufacturer or distributor whose range lives in PDF price lists',
      'A supplier losing product searches to marketplaces and rivals',
      'A B2B seller that quotes rather than checkouts',
    ],
    inclusions: [
      'Product data model for your range, variants and specifications',
      'Category and product templates with unique indexable content',
      'Initial bulk load of your range from structured spreadsheets',
      'Spec-sheet and document downloads attached to products',
      'RFQ basket and structured quote-request workflow',
      'Crawl-safe filtering and product search',
      'Admin workflow for prices, products and range changes',
      'Core business pages (home, about, contact) in the same architecture',
      'POPIA-compliant conversion tracking setup: GA4, Tag Manager and Consent Mode v2, with conversion events for calls, WhatsApp and forms',
      'Metadata, schema, sitemap, Search Console — the full SEO baseline',
    ],
    exclusions: [
      'Online payments — that is the Ecommerce package',
      'Live ERP/stock integration (scoped separately)',
      'Data cleaning of severely unstructured ranges (quoted after a sample)',
    ],
    priceRange: { min: 45000, max: 90000, currency: 'ZAR', indicative: true },
    timeline: '5–8 weeks, driven mostly by product-data readiness',
    faqs: [
      {
        question: 'Our product data is a mess — can we still start?',
        answer:
          'Yes. We give you a structured template and review a sample of your range early; if serious cleaning is needed we quote it honestly rather than discovering it mid-build. Clean data is the single biggest factor in catalogue timelines.',
        group: 'process',
      },
      {
        question: 'Can it become an online store later?',
        answer:
          'Yes — the catalogue architecture is the hard part, and checkout can be added to it for the product lines where fixed-price online payment makes sense. Many clients run catalogue-plus-RFQ and ecommerce side by side.',
        group: 'technical',
      },
    ],
    primaryKeywordCluster: 'product catalogue website package',
  },
  {
    slug: 'ecommerce-website',
    serviceSlug: 'ecommerce-websites',
    title: 'Ecommerce Website Package',
    metaDescription:
      'Ecommerce website package for SA sellers: SEO product architecture, local payment gateway, delivery setup and conversion tracking. Indicative R70,000–R160,000.',
    heading: 'Ecommerce website package',
    intro:
      'A store built to sell: product pages structured for search, a mobile checkout people finish, South African payment and delivery realities handled properly — and the numbers visible from day one.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: false,
    idealFor: [
      'A retailer outgrowing a template-platform store that ranks for nothing',
      'A B2B seller adding fixed-price online ordering to a catalogue',
      'A brand that needs speed, SEO and checkout quality more than plugins',
    ],
    inclusions: [
      'SEO-structured product catalogue with unique product metadata',
      'Cart and checkout tuned for mobile completion',
      'SA payment gateway integration chosen at scoping (PayFast/Yoco/Peach)',
      'Delivery options, order emails and status flow',
      'POPIA-compliant conversion tracking setup: GA4, Tag Manager and Consent Mode v2, with conversion events for calls, WhatsApp and forms',
      'Order management suited to your fulfilment process',
      'Performance budget enforced: fast mobile loads',
      'Full SEO baseline: schema, sitemap, Search Console onboarding',
    ],
    exclusions: [
      'Marketplace/channel feeds and ERP sync (scoped separately)',
      'Large-range product photography and copywriting (quoted separately)',
      'Ongoing trading support (Ecommerce support plan available)',
    ],
    priceRange: { min: 70000, max: 160000, currency: 'ZAR', indicative: true },
    timeline: '6–10 weeks depending on range size and integrations',
    faqs: [
      {
        question: 'What determines where we land in the price range?',
        answer:
          'Range size and data readiness, payment/delivery complexity, B2B features like account pricing, and how much product content help you need. Scoping produces a fixed quote with the drivers itemised.',
        group: 'cost',
      },
      {
        question: 'Do you handle POPIA and payment security?',
        answer:
          'Card handling stays with the accredited gateway — your store never touches raw card data. Customer data handling is designed POPIA-consciously: minimal collection, clear consent and documented retention, with the legal pages to match.',
        group: 'technical',
      },
    ],
    primaryKeywordCluster: 'ecommerce website package',
  },
  {
    slug: 'custom-web-system',
    serviceSlug: 'custom-web-applications',
    title: 'Custom Web System',
    metaDescription:
      'Custom web systems — admin panels, RFQ and quotation tools, portals — scoped through paid discovery. Indicative from R80,000; discovery R8,000–R15,000.',
    heading: 'Custom web system',
    intro:
      'For the processes no product fits: admin panels, quotation systems, portals and workflow tools, scoped honestly through paid discovery so you see the specification and the number before committing to a build.',
    status: 'live',
    dateCreated: '2026-07-21',
    dateUpdated: '2026-07-21',
    placeholder: false,
    idealFor: [
      'A business run on spreadsheets that have started costing real money',
      'A quote-driven company ready to systematise intake and follow-up',
      'An operation whose software wishlist starts with “nothing out there quite…”',
    ],
    inclusions: [
      'Paid discovery: process mapping, data model, written specification, fixed build quote',
      'Staged build with working software reviewed every cycle',
      'Accounts, roles and permissions mirroring your organisation',
      'Reporting and exports for your actual management numbers',
      'POPIA-compliant conversion tracking setup: GA4, Tag Manager and Consent Mode v2, with conversion events for calls, WhatsApp and forms',
      'Deployment, documentation and full code ownership',
      'Application support plan with response targets after go-live',
    ],
    exclusions: [
      'Fixed build pricing before discovery (the specification IS the price basis)',
      'Big-bang delivery — we ship in stages deliberately',
      'Features speculatively built “because we might need it”',
    ],
    priceRange: null,
    timeline: 'Discovery 2–3 weeks; builds typically 6–16 weeks in stages',
    faqs: [
      {
        question: 'Why is discovery paid?',
        answer:
          'Because it is real work with a real deliverable: your process mapped, a data model, a written specification and a fixed quote — a document any competent developer could build from. Free “discovery” is a sales call wearing a hard hat. Indicative discovery pricing is on the pricing page.',
        group: 'cost',
      },
      {
        question: 'What if we only need something small?',
        answer:
          'Then discovery will say so, and the quote will match. The goal is the smallest system that removes the pain — a focused admin panel is a common and unglamorous answer, and we are comfortable recommending it.',
        group: 'process',
      },
    ],
    primaryKeywordCluster: 'custom web system',
  },
];

export function getPackage(slug: string): PackageOffer | undefined {
  return packages.find((p) => p.slug === slug);
}
