import type { Project } from '@/types/content';

/**
 * Proplytic property portfolio software (founder product / internal product).
 * Live product: https://www.proplytic.co.za / https://proplytic.co.za
 *
 * Source audit (read-only, 2026-07-23):
 * - Repo: C:\Users\delanget\Documents\GitHub\PropertyGuy (Proplytic public brand)
 * - Branch/commit: main @ ab25f63
 * - Working tree: dirty — frontend/api/_lib/propertyCalculator/financialMetrics.ts
 *   modified; no fetch/reset/clean performed
 * - Frontend: Vite + React + TypeScript; Supabase auth/data; React Query; Chart.js;
 *   pdfmake; Stripe subscriptions; Resend
 * - Authenticated routes evidenced in router: portfolio dashboard, properties,
 *   tenants, leases, invoices, statements, documents, financials, reports,
 *   settings, admin panel, calculator surfaces
 * - Public marketing: pricing, login/signup, contact, legal, calculator hub
 *
 * Self-permission for founder product (2026-07-22). Screenshots from marketing
 * homepage only (2026-07-23) — no tenant PII. Sample UI figures on marketing
 * pages are product demos, not Koppie performance claims.
 * Search indexing held until ownerCaseStudyIndexApproval.
 */
export const proplyticPropertySoftware: Project = {
  slug: 'proplytic-property-software',
  title: 'Proplytic — Property Portfolio Software for Owner-Managers',
  metaDescription:
    'Proplytic case study: South African property portfolio software for owner-managers — dashboards, tenants, leases, invoices, statements and PDF reports.',
  heading: 'Proplytic: property portfolio software',
  intro:
    'Proplytic is a founder-built SaaS product for South African owner-managers and small portfolio investors. It is a web application — not a brochure site — connecting property records, rental admin, portfolio analytics and document exports in one authenticated workspace. The live product is proplytic.co.za.',
  status: 'live',
  noindex: true,
  placeholder: false,
  dateCreated: '2026-07-22',
  dateUpdated: '2026-07-23',
  clientDescriptor: 'Proplytic (founder product)',
  industry: 'Property / PropTech',
  location: 'South Africa',
  projectType: 'Custom web application (SaaS)',
  classification: 'internal-product',
  publicLabel: 'Internal product',
  evidenceLevel: 'complete',
  categories: ['admin-systems'],
  serviceSlugs: [
    'custom-web-applications',
    'admin-panel-development',
    'customer-and-supplier-portals',
  ],
  solutionSlug: 'property-businesses',
  stack: [
    'React',
    'TypeScript',
    'Vite',
    'Supabase',
    'React Query',
    'pdfmake',
    'Stripe',
    'Resend',
  ],
  liveUrl: 'https://www.proplytic.co.za/',
  businessProblem:
    'Owner-managers were reconciling bonds, rent, levies and expenses across spreadsheets, then rebuilding investor reports by hand. Agency trust-account tools assume multi-landlord agency workflows — the wrong fit for self-managed portfolios that still need structure, documents and portfolio metrics.',
  objectives: [
    'Give owner-managers one authenticated place for equity, cash flow, yield and occupancy views',
    'Keep tenants, leases, invoices and statements linked to property records',
    'Export investor-ready PDF reports from the same live assumptions and actuals',
    'Offer clear ZAR subscription plans without forcing agency software complexity',
  ],
  scope: [
    'Public marketing site with pricing, authentication entry and calculator hub',
    'Secure login, signup and email confirmation flows',
    'Portfolio dashboard and property-level detail/financial views',
    'Property create/edit workflows and portfolio listings',
    'Tenant and lease management with detail and form flows',
    'Invoices, recurring invoices, statements and document areas',
    'Metrics views for equity, valuations, bonds, returns, expenses, leases, rent due, deposits and cash flow',
    'PDF report generation for property and portfolio reporting',
    'Subscription billing via Stripe and account settings',
    'Role-gated admin surfaces for product operations',
  ],
  solutionSummary:
    'Proplytic is built as an authenticated React application on Supabase, with a public marketing layer for acquisition and a deep workspace for day-to-day portfolio admin. Charts, documents and PDF exports sit on the same property and tenancy data model — sized for owner-managers rather than agency trust accounts.',
  process: [
    'Product discovery for owner-manager workflows and SA portfolio realities',
    'Application architecture for properties, tenancies, billing documents and analytics',
    'Iterative build of dashboards, admin records, invoices/statements and exports',
    'Subscription and settings surfaces for plan management',
    'Public marketing site and product launch at proplytic.co.za',
  ],
  keyFunctionality: [
    'Authenticated portfolio dashboard and property workspaces',
    'Property, tenant and lease records with create/edit detail flows',
    'Invoices, statements and document management',
    'Portfolio metric views (equity, cash flow, returns and related slices)',
    'Investor-oriented PDF report generation',
    'Public property calculators and marketing pricing pages',
    'Stripe-backed subscription plans and account settings',
    'Responsive application UI across desktop and mobile viewports',
  ],
  seoWork: [
    'Marketing site structured around owner-manager search intents',
    'Clear positioning against agency trust-account software',
    'Pricing and FAQ content for plan comparison',
    'Prerendered public meta for key marketing routes',
  ],
  constraints: [
    'Case-study screenshots use the public marketing homepage only — no real tenant names, addresses or financial figures',
    'Marketing-site sample figures are illustrative product demos, not measured customer outcomes',
    'No rankings, MRR, signup or retention metrics are claimed in this write-up',
    'Internal repository still carries historical PropertyGuy naming in paths; the public brand is Proplytic',
  ],
  currentStatusNarrative:
    'Proplytic is live at proplytic.co.za as a subscribed web application with public marketing pages and an authenticated portfolio workspace. This case study describes delivered product capability; commercial traction metrics are out of scope until independently verified for publication.',
  results: [],
  dates: {},
  projectStatus: 'completed',
  publishPermission: true,
  caseStudyNarrativeComplete: true,
  ownerCaseStudyIndexApproval: false,
  featuredImage: {
    src: '/images/work/proplytic-desktop.webp',
    alt: 'Desktop screenshot of the Proplytic marketing homepage with portfolio software positioning and product interface preview',
    width: 1440,
    height: 900,
  },
  gallery: [
    {
      src: '/images/work/proplytic-mobile.webp',
      alt: 'Mobile screenshot of the Proplytic marketing homepage',
      width: 390,
      height: 844,
    },
  ],
  relatedProjectSlugs: ['damtech-website'],
  relatedArticleSlugs: ['what-is-an-seo-first-website'],
};
