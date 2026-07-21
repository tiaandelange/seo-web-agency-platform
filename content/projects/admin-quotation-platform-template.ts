import type { Project } from '@/types/content';

/** CASE-STUDY TEMPLATE — example structure only (D-07). */
export const adminQuotationPlatformTemplate: Project = {
  slug: 'admin-quotation-platform-template',
  title: 'Case Study Template: Admin & Quotation Platform',
  metaDescription:
    'Example case-study structure for an admin and quotation platform: structured intake, quote builder, status pipeline and follow-up automation.',
  heading: 'Case study template: admin and quotation platform',
  intro:
    '[TEMPLATE — example structure, not a real project.] Documents an admin-plus-quoting build: enquiries captured in a structured queue, professional quotes produced in minutes, and open quotes chased automatically.',
  status: 'template',
  noindex: true,
  placeholder: true,
  dateCreated: '2026-07-21',
  dateUpdated: '2026-07-21',
  clientDescriptor: '[e.g. “Industrial services company quoting daily”]',
  industry: 'Industrial services',
  location: '[City/province if publishable]',
  projectType: 'Admin panel with quotation workflow',
  categories: ['admin-systems'],
  serviceSlugs: ['admin-panel-development', 'rfq-and-quotation-systems'],
  solutionSlug: 'engineering-companies',
  stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  businessProblem:
    '[e.g. Quotes built by hand in Word from three price lists; enquiries scattered across inboxes and WhatsApp; follow-up dependent on memory.]',
  objectives: [
    '[e.g. one structured intake for all enquiries]',
    '[e.g. quote turnaround from days to hours]',
    '[e.g. visible pipeline: open, accepted, expired values]',
  ],
  scope: [
    '[e.g. intake queue with source tagging]',
    '[e.g. quote builder: line items, margins, VAT, branded PDF]',
    '[e.g. status pipeline, reminders, reporting]',
  ],
  solutionSummary:
    '[What was built and why: admin foundation first, quoting module on top; estimator judgement kept human, admin around it automated.]',
  process: [
    'Paid discovery and specification',
    'Stage 1: intake and customer records',
    'Stage 2: quote builder and PDF output',
    'Stage 3: pipeline, reminders, reporting',
    'Training and support handover',
  ],
  keyFunctionality: [
    '[e.g. structured intake: every enquiry lands with context]',
    '[e.g. versioned quotes: no more “which PDF did we send?”]',
    '[e.g. automatic follow-ups: open quotes never go quiet]',
  ],
  seoWork: [],
  results: [],
  dates: { start: '[yyyy-mm]', end: '[yyyy-mm]' },
  projectStatus: 'template',
  publishPermission: false,
  gallery: [],
  relatedProjectSlugs: ['catalogue-rfq-website-template', 'property-management-system-template'],
  relatedArticleSlugs: [],
};
