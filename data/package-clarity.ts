/**
 * Visible commercial clarity for each package page (Prompt 6).
 * Does not change indicative price ranges (D-11).
 */

export type PackageClarity = {
  suitableCustomer: string;
  includedPages: string;
  contentResponsibility: string;
  forms: string;
  seoScope: string;
  revisions: string;
  hosting: string;
  support: string;
  deliveryRange: string;
  exclusionsSummary: string;
  priceDrivers: string;
};

export const PACKAGE_CLARITY: Record<string, PackageClarity> = {
  'one-page-website': {
    suitableCustomer:
      'Single-service trades, campaign landing pages, or new ventures that need one strong page fast.',
    includedPages: 'One long-form page with sectioned anchors — deliberately a single indexed URL.',
    contentResponsibility:
      'You supply the offer facts, photos and approvals; we structure the page and provide writing guidance. Full copywriting is an add-on.',
    forms: 'Enquiry form plus click-to-call and WhatsApp actions.',
    seoScope:
      'Keyword mapping for the one core offer, unique metadata, schema, sitemap and Search Console setup.',
    revisions: 'Two rounds of structured revisions at draft and pre-launch review points.',
    hosting: 'Hosting is chosen and billed separately — we recommend and configure; you own the account.',
    support: 'Launch handover included; ongoing care via a maintenance plan if you want it.',
    deliveryRange: '1–2 weeks from content kickoff.',
    exclusionsSummary:
      'Multiple indexed pages, blogs, catalogues, ecommerce, brand identity and ongoing SEO campaigns.',
    priceDrivers: 'Copy help needed, asset readiness, and any light extras beyond the single page.',
  },
  'starter-business-website': {
    suitableCustomer: 'New or small businesses that need a credible, findable first site.',
    includedPages: 'Up to 6 pages (home, about, up to 3 services, contact).',
    contentResponsibility:
      'You supply service facts, photos and approvals; we structure pages and provide writing guidance. Full copywriting is an add-on.',
    forms: 'Contact form plus click-to-call and WhatsApp actions.',
    seoScope: 'Keyword mapping for core services, unique metadata, schema, sitemap and Search Console setup.',
    revisions: 'Two rounds of structured revisions at draft and pre-launch review points.',
    hosting: 'Hosting is chosen and billed separately — we recommend and configure; you own the account.',
    support: 'Launch handover included; ongoing care via a maintenance plan if you want it.',
    deliveryRange: '2–4 weeks from content kickoff.',
    exclusionsSummary: 'Logo/brand identity, ecommerce, catalogues, campaigns and bulk copywriting.',
    priceDrivers: 'Page count within the cap, how much copy help you need, and asset readiness.',
  },
  'professional-business-website': {
    suitableCustomer: 'Established service businesses that need the site to produce enquiries.',
    includedPages: '8–15 pages mapped from keyword and competitor research.',
    contentResponsibility:
      'You approve service detail and proofs; we architect and draft structure. Extended copywriting quoted if needed.',
    forms: 'Quote-request flow with spam protection and consent handling.',
    seoScope: 'Full service/area architecture, metadata, schema, indexation controls and 90-day Search Console window.',
    revisions: 'Review points at structure, draft and pre-launch — plan for focused feedback, not endless polish loops.',
    hosting: 'Hosting separate; we set up and hand over ownership.',
    support: 'Handover included; content and SEO care plans available after launch.',
    deliveryRange: '4–7 weeks from content kickoff.',
    exclusionsSummary: 'Ongoing campaigns, paid ads management and ecommerce checkout.',
    priceDrivers: 'Page count, service areas, copywriting depth and photography coordination.',
  },
  'product-catalogue-website': {
    suitableCustomer: 'Manufacturers and B2B suppliers who quote rather than check out.',
    includedPages: 'Core business pages plus category and product templates for your range.',
    contentResponsibility:
      'You supply structured product data (we provide a template); we model, load and present it. Severe data cleaning is quoted after a sample.',
    forms: 'RFQ basket and structured quote-request workflow.',
    seoScope: 'Indexable category/product templates, crawl-safe filters, product schema where applicable, Search Console baseline.',
    revisions: 'Structure and template reviews plus a sample-range check before full load.',
    hosting: 'Hosting separate; admin access for product updates included in the build.',
    support: 'Handover training; catalogue care plans for ongoing range changes.',
    deliveryRange: '5–8 weeks, driven mostly by product-data readiness.',
    exclusionsSummary: 'Online payments, live ERP sync and unstructured data cleanup beyond a sample.',
    priceDrivers: 'Range size, data cleanliness, variants/specs depth and admin complexity.',
  },
  'ecommerce-website': {
    suitableCustomer: 'Sellers ready for fixed-price online ordering with SA payments.',
    includedPages: 'Storefront pages plus SEO-structured category and product templates.',
    contentResponsibility:
      'You own product facts and imagery; large-range photography/copy is quoted separately.',
    forms: 'Cart, checkout and order confirmation — not an RFQ basket.',
    seoScope: 'Product metadata and schema, performance budget, Search Console and ecommerce events.',
    revisions: 'Checkout path and product-template reviews before go-live.',
    hosting: 'Hosting separate; payment gateway account remains yours.',
    support: 'Launch support included; ecommerce care plan available for trading operations.',
    deliveryRange: '6–10 weeks depending on range size and integrations.',
    exclusionsSummary: 'Marketplace feeds, ERP sync and large-range content production.',
    priceDrivers: 'Range size, payment/delivery rules, B2B account features and content help.',
  },
  'custom-web-system': {
    suitableCustomer: 'Businesses whose quoting, portals or admin work no packaged product fits.',
    includedPages: 'Not a page package — screens and modules defined in discovery.',
    contentResponsibility:
      'You own process knowledge and sample data; we map workflows and write the specification.',
    forms: 'Whatever the process needs: intake, approvals, uploads — scoped in discovery.',
    seoScope: 'Public marketing site SEO is separate unless bundled; the system itself is usually authenticated.',
    revisions: 'Staged delivery with review each cycle — not a single big-bang sign-off.',
    hosting: 'Hosting and environments scoped with the build; you own the stack.',
    support: 'Application support plan with response targets after go-live.',
    deliveryRange: 'Discovery 2–3 weeks; builds typically 6–16 weeks in stages.',
    exclusionsSummary: 'Fixed build pricing before discovery; speculative “might need it” features.',
    priceDrivers: 'Process complexity, roles, integrations and reporting — priced from the written specification.',
  },
};

export function getPackageClarity(slug: string): PackageClarity | undefined {
  return PACKAGE_CLARITY[slug];
}
