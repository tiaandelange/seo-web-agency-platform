import type { Project } from '@/types/content';

/**
 * Damtech lead-generation website + operational quoting system.
 * Live site: https://www.dam-tech.co.za / https://dam-tech.co.za
 *
 * Source audit (read-only, 2026-07-23):
 * - Repo: C:\Users\delanget\Documents\GitHub\Damtech-Website
 * - Branch/commit: main @ a96ab2e (clean working tree)
 * - Stack evidenced in package.json + lib/: Next.js, React, TypeScript, Tailwind,
 *   Supabase, Resend, @react-pdf/renderer, Upstash rate-limit
 * - Public routes: service pages (HDPE/PVC lining, reservoirs, waterproofing,
 *   regional pages), projects showcase, calculators, quote/RFQ intake, contact
 * - Admin routes: RFQ inbox, quote builder/preview/revisions, pricing catalogues
 *   (materials/labour/travel/tanks), customers, suppliers, settings, audit
 *
 * Naming permission: owner-authorised 2026-07-22. Screenshots 2026-07-23.
 * Search indexing: held until ownerCaseStudyIndexApproval (publication gate).
 * No testimonials, rankings, traffic or revenue claims (D-07 / D-10).
 */
export const damtechWebsite: Project = {
  slug: 'damtech-website',
  title: 'Damtech Website — Dam Lining, Water Storage & Quotation System',
  metaDescription:
    'Damtech case study: South African dam-lining website with service architecture, calculators, RFQ intake and admin quotation workflows by Koppie Systems.',
  heading: 'Damtech: dam lining website and quotation system',
  intro:
    'Damtech is a South African dam-lining and water-storage contractor. Koppie Systems built the public marketing site and the operational layer behind it: technical calculators, structured RFQ intake, and an admin quotation platform with PDF output. The live site is dam-tech.co.za.',
  status: 'live',
  noindex: true,
  placeholder: false,
  dateCreated: '2026-07-22',
  dateUpdated: '2026-07-23',
  clientDescriptor: 'Damtech',
  industry: 'Construction / water infrastructure',
  location: 'South Africa (nationwide service)',
  projectType: 'Lead-generation website with RFQ and quotation admin',
  classification: 'client-project',
  publicLabel: 'Live project',
  evidenceLevel: 'complete',
  categories: ['websites', 'admin-systems'],
  serviceSlugs: [
    'lead-generation-websites',
    'seo-website-development',
    'business-websites',
    'rfq-and-quotation-systems',
    'admin-panel-development',
  ],
  solutionSlug: 'contractors',
  stack: [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Supabase',
    'Resend',
    'React-PDF',
  ],
  liveUrl: 'https://www.dam-tech.co.za/',
  businessProblem:
    'Buyers researching dam linings, steel reservoirs and waterproofing needed clear service pages and a way to request a quote without email ping-pong. Internally, Damtech needed structured RFQs, priced quotations and PDF output instead of rebuilding every quote by hand from scattered price lists.',
  objectives: [
    'Publish a search-oriented service architecture for linings, reservoirs, waterproofing and maintenance',
    'Capture enquiries as structured RFQs with calculator-assisted sizing where relevant',
    'Give staff an authenticated admin workspace to review RFQs, build quotes and issue PDFs',
    'Support nationwide service messaging without inventing local branch offices',
  ],
  scope: [
    'Public marketing site: services, regional pages, project showcase, FAQ, contact and thank-you flows',
    'Technical calculators with RFQ prefill into the quote pathway',
    'Customer-facing quote/RFQ submission with validation and rate limiting',
    'Admin authentication and role permissions',
    'RFQ inbox, customer and supplier records',
    'Quote builder with line items, revisions, preview and PDF generation',
    'Pricing administration for materials, labour, travel, equipment and tank models, including CSV import pipelines',
    'Transactional email for quotation workflows (Resend)',
  ],
  solutionSummary:
    'One Next.js application covers both layers: a crawlable lead-generation website for technical buyers, and a Supabase-backed admin system for RFQ intake, estimating and quotation. Public pages explain the offer; calculators and forms feed structured requests; staff price and issue quotes without leaving the same product.',
  process: [
    'Discovery of services, geographies, proof assets and quoting workflow',
    'Information architecture for public services, projects and contact',
    'Public site build with SEO-led page structure and enquiry pathways',
    'RFQ, estimating and quotation modules with admin UI',
    'Pricing catalogue and import tooling for maintainable rates',
    'Launch and ongoing iteration on dam-tech.co.za',
  ],
  keyFunctionality: [
    'Service and regional pages for dam linings, reservoirs and waterproofing',
    'Project examples labelled by location and application',
    'Technical calculators that can prefill quote preparation',
    'Structured RFQ submission into an admin inbox',
    'Quote builder with preview, revisions and React-PDF output',
    'Pricing catalogues with import/validation for materials and tank models',
    'Email delivery for quote-related notifications',
    'Permissioned admin areas with audit-oriented controls',
  ],
  seoWork: [
    'Service-led routes matching commercial search intents (lining types, reservoirs, regional queries)',
    'Server-rendered pages with clear headings for technical buyers',
    'Internal links between services, projects, calculators and contact',
    'Sitemap and metadata helpers maintained in the application codebase',
  ],
  constraints: [
    'No fabricated ranking, traffic or lead-volume claims are published for this case study',
    'Admin pricing, customer and quotation data remain private — only the public marketing UI is shown in screenshots',
    'Nationwide coverage is stated as service reach, not as a network of local offices',
  ],
  currentStatusNarrative:
    'The public website and quotation platform are live at dam-tech.co.za. This case study documents delivered capability from the production codebase and public site; quantified marketing results are not claimed here.',
  results: [],
  dates: {},
  projectStatus: 'completed',
  publishPermission: true,
  caseStudyNarrativeComplete: true,
  ownerCaseStudyIndexApproval: false,
  featuredImage: {
    src: '/images/work/damtech-desktop.webp',
    alt: 'Desktop screenshot of the Damtech homepage showing dam-lining and water-storage services with a quote call to action',
    width: 1440,
    height: 900,
  },
  gallery: [
    {
      src: '/images/work/damtech-mobile.webp',
      alt: 'Mobile screenshot of the Damtech homepage hero and primary navigation',
      width: 390,
      height: 844,
    },
  ],
  relatedProjectSlugs: ['proplytic-property-software'],
  relatedArticleSlugs: ['what-is-an-seo-first-website'],
};
