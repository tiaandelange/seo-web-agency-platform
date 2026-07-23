import type { Project } from '@/types/content';

/**
 * Proplytic property portfolio software — owner-authorised publication (2026-07-22).
 * Live product: https://proplytic.co.za
 *
 * Founder-built product (self-permission). Screenshots captured 2026-07-23 from
 * the live marketing homepage. Indexation stays noindex until the remaining
 * case-study publication gate clears. No testimonials or fabricated metrics.
 * Sample UI figures on the marketing site are illustrative product demos, not
 * Koppie Systems performance claims.
 */
export const proplyticPropertySoftware: Project = {
  slug: 'proplytic-property-software',
  title: 'Proplytic — Property Portfolio Software for Owner-Managers',
  metaDescription:
    'How Koppie Systems built Proplytic: South African property portfolio software for owner-managers — analytics, rental admin and investor-ready reports.',
  heading: 'Proplytic: property portfolio software',
  intro:
    'Proplytic is a founder-built SaaS product for South African owner-managers and small portfolio investors. It connects property records, rental admin and portfolio analytics in one workspace. The live product is proplytic.co.za.',
  status: 'live',
  noindex: true,
  placeholder: false,
  dateCreated: '2026-07-22',
  dateUpdated: '2026-07-23',
  clientDescriptor: 'Proplytic (founder product)',
  industry: 'Property / PropTech',
  location: 'South Africa',
  projectType: 'Custom web application',
  categories: ['admin-systems'],
  serviceSlugs: [
    'custom-web-applications',
    'admin-panel-development',
    'customer-and-supplier-portals',
  ],
  solutionSlug: 'property-businesses',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  businessProblem:
    'Owner-managers were reconciling bonds, rent, levies and expenses across spreadsheets, then rebuilding investor reports by hand. Agency trust-account tools were the wrong fit for self-managed portfolios.',
  objectives: [
    'Give owner-managers a single place for equity, cash flow, yield and occupancy',
    'Keep tenants, leases, invoices and statements linked to portfolio metrics',
    'Export investor-ready PDF reports from the same live data',
  ],
  scope: [
    'Portfolio dashboard and property-level performance views',
    'Rental admin for tenants, leases, invoices and statements',
    'Property-type calculators and public calculator hub',
    'Investor PDF export workflows',
    'ZAR subscription plans for Starter through Portfolio tiers',
  ],
  solutionSummary:
    'A custom web application sized for owner-managers: connected property records, portfolio analytics and reporting — without multi-landlord agency complexity.',
  process: [
    'Product discovery for owner-manager workflows',
    'Application architecture for properties, admin and analytics',
    'Iterative build of dashboards, admin and exports',
    'Public marketing site and product launch at proplytic.co.za',
  ],
  keyFunctionality: [
    'Portfolio roll-ups for equity, cash flow, yield and occupancy',
    'Linked tenants, leases, invoices and statements',
    'Investor-ready PDF exports from live assumptions and actuals',
    'Property-type calculators and a free public calculator hub',
  ],
  seoWork: [
    'Marketing site structured around owner-manager search intents',
    'Clear positioning against agency trust-account software',
    'Pricing and FAQ content for plan comparison',
  ],
  results: [],
  dates: {},
  projectStatus: 'completed',
  publishPermission: true,
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
