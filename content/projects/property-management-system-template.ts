import type { Project } from '@/types/content';

/** CASE-STUDY TEMPLATE — example structure only (D-07). */
export const propertyManagementSystemTemplate: Project = {
  slug: 'property-management-system-template',
  title: 'Case Study Template: Property Management System',
  metaDescription:
    'Example case-study structure for a property-management web application: leases, invoicing, reporting and portal workflows documented honestly.',
  heading: 'Case study template: property management web application',
  intro:
    '[TEMPLATE — example structure, not a real project.] Documents a property-management system build: portfolio admin from spreadsheets into one system — leases, invoicing, statements and owner reporting.',
  status: 'template',
  noindex: true,
  placeholder: true,
  dateCreated: '2026-07-21',
  dateUpdated: '2026-07-21',
  clientDescriptor: '[e.g. “Gauteng residential portfolio operator”]',
  industry: 'Property',
  location: '[City/province if publishable]',
  projectType: 'Custom web application',
  categories: ['admin-systems'],
  serviceSlugs: ['custom-web-applications', 'admin-panel-development'],
  solutionSlug: 'property-businesses',
  stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
  businessProblem:
    '[e.g. Leases, escalations and invoicing across spreadsheets; month-end assembled by hand; no live arrears view.]',
  objectives: [
    '[e.g. single source of truth for properties, tenants, leases]',
    '[e.g. automated monthly invoicing with escalations]',
    '[e.g. live arrears and portfolio reporting]',
  ],
  scope: [
    '[e.g. data model: properties, units, tenants, leases, transactions]',
    '[e.g. invoicing engine, statements, deposit handling]',
    '[e.g. role-based access; import of historical records]',
  ],
  solutionSummary:
    '[What was built and why: staged delivery starting with the highest-pain module; SA-specific lease and escalation handling; reporting matched to how the owner actually reviews the portfolio.]',
  process: [
    'Paid discovery: process mapping and specification',
    'Stage 1: core records and lease engine',
    'Stage 2: invoicing and statements',
    'Stage 3: reporting and refinements',
    'Training, documentation, support handover',
  ],
  keyFunctionality: [
    '[e.g. lease lifecycle with escalations: renewals stop being surprises]',
    '[e.g. one-click month-end: invoices and statements in minutes]',
    '[e.g. arrears dashboard: problems visible the day they start]',
  ],
  seoWork: [],
  results: [],
  dates: { start: '[yyyy-mm]', end: '[yyyy-mm]' },
  projectStatus: 'template',
  publishPermission: false,
  gallery: [],
  relatedProjectSlugs: ['admin-quotation-platform-template'],
  relatedArticleSlugs: [],
};
