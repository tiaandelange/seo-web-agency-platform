import type { Project } from '@/types/content';

/** CASE-STUDY TEMPLATE — example structure only (D-07). */
export const catalogueRfqWebsiteTemplate: Project = {
  slug: 'catalogue-rfq-website-template',
  title: 'Case Study Template: Catalogue & RFQ Website',
  metaDescription:
    'Example case-study structure for a product catalogue and RFQ website: structured range, spec sheets, quote-basket workflow and measurable outcomes.',
  heading: 'Case study template: product catalogue and RFQ website',
  intro:
    '[TEMPLATE — example structure, not a real project.] Documents a catalogue-plus-RFQ build: how an offline product range became structured, searchable pages feeding quote requests into a managed pipeline.',
  status: 'template',
  noindex: true,
  placeholder: true,
  dateCreated: '2026-07-21',
  dateUpdated: '2026-07-21',
  clientDescriptor: '[e.g. “National industrial fasteners distributor”]',
  industry: 'Manufacturing / distribution',
  location: '[City/province if publishable]',
  projectType: 'Product catalogue website with RFQ workflow',
  categories: ['websites', 'ecommerce'],
  serviceSlugs: ['product-catalogue-websites', 'rfq-and-quotation-systems'],
  solutionSlug: 'manufacturers-and-suppliers',
  stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  businessProblem:
    '[e.g. Range lived in PDF price lists; product searches landed on rivals; every enquiry began with clarification emails.]',
  objectives: [
    '[e.g. every product line indexable with full specifications]',
    '[e.g. RFQ basket replacing free-text enquiry emails]',
    '[e.g. range maintainable in bulk by internal staff]',
  ],
  scope: [
    '[e.g. product data model: categories, variants, spec fields]',
    '[e.g. bulk import from cleaned spreadsheets; admin update workflow]',
    '[e.g. RFQ basket, structured submissions, notification flow]',
  ],
  solutionSummary:
    '[What was built and why: catalogue architecture as indexable pages, crawl-safe filtering, RFQ flow matched to how the sales desk actually quotes.]',
  process: [
    'Discovery and range-structure workshop',
    'Data template, sample load and structure approval',
    'Catalogue and RFQ build',
    'Full range load and validation',
    'Launch, training, measurement handover',
  ],
  keyFunctionality: [
    '[e.g. spec-complete product pages: buyers self-qualify]',
    '[e.g. RFQ basket: one structured request instead of email ping-pong]',
    '[e.g. bulk price updates: a category revision in minutes]',
  ],
  seoWork: [
    '[e.g. unique metadata per product/category; structured data where applicable]',
    '[e.g. filter/parameter indexation control]',
  ],
  results: [],
  dates: { start: '[yyyy-mm]', end: '[yyyy-mm]' },
  projectStatus: 'template',
  publishPermission: false,
  gallery: [],
  relatedProjectSlugs: ['admin-quotation-platform-template', 'contractor-website-template'],
  relatedArticleSlugs: ['website-cost-south-africa'],
};
