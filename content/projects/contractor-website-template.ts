import type { Project } from '@/types/content';

/**
 * CASE-STUDY TEMPLATE — example structure only (D-07).
 * No real client, figures or outcomes. Replace per
 * docs/content/CASE-STUDY-FRAMEWORK.md → “Converting a template”.
 */
export const contractorWebsiteTemplate: Project = {
  slug: 'contractor-website-template',
  title: 'Case Study Template: Contractor Website',
  metaDescription:
    'Example case-study structure for an SEO-focused contractor website project: problem, objectives, scope, solution, process and measured results.',
  heading: 'Case study template: SEO-focused contractor website',
  intro:
    '[TEMPLATE — example structure, not a real project.] This template shows how a contractor website case study is documented: the business problem in the client’s words, the search-led architecture decisions, and only verified results.',
  status: 'template',
  noindex: true,
  placeholder: true,
  dateCreated: '2026-07-21',
  dateUpdated: '2026-07-21',
  clientDescriptor: '[Anonymised descriptor, e.g. “Gauteng civil and earthworks contractor”]',
  industry: 'Construction / contracting',
  location: '[City/province if publishable]',
  projectType: 'Lead-generation website',
  categories: ['websites'],
  serviceSlugs: ['lead-generation-websites', 'seo-website-development'],
  solutionSlug: 'contractors',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  businessProblem:
    '[2–4 sentences in the client’s terms: e.g. referral pipeline flattening; high-value emergency searches going to ranked competitors; existing one-page site invisible on Google.]',
  objectives: [
    '[Measurable objective, e.g. rank for core service + area searches]',
    '[e.g. produce tracked enquiries: calls, WhatsApp, quote forms]',
    '[e.g. present proof: completed-project pages that win tender shortlists]',
  ],
  scope: [
    '[e.g. keyword-to-page mapping across N service lines]',
    '[e.g. dedicated page per service; area pages for genuine service regions]',
    '[e.g. quote flow with call/WhatsApp tracking; Search Console baseline]',
  ],
  solutionSummary:
    '[What was built and why those choices: page architecture from search demand; conversion placement for mobile; case-study structure for completed jobs.]',
  process: [
    'Discovery and search-demand research',
    'Architecture and keyword-to-page approval',
    'Build: templates, content structure, tracking',
    'Content load and review cycles',
    'Launch, indexation submission, measurement handover',
  ],
  keyFunctionality: [
    '[Feature: benefit — e.g. sticky mobile call action: call while the need is hot]',
    '[e.g. per-service enquiry forms: context arrives with the lead]',
    '[e.g. project gallery structured as case studies: proof that ranks]',
  ],
  seoWork: [
    '[e.g. one page per service intent; area targeting without doorway spam]',
    '[e.g. schema: Organization, Service, BreadcrumbList]',
    '[e.g. Search Console onboarding and 90-day indexation support]',
  ],
  results: [
    // ONLY verified results, each { metric, value, verified: true }. Empty = section hidden.
  ],
  dates: { start: '[yyyy-mm]', end: '[yyyy-mm]' },
  projectStatus: 'template',
  publishPermission: false,
  gallery: [],
  relatedProjectSlugs: ['catalogue-rfq-website-template'],
  relatedArticleSlugs: ['what-is-an-seo-first-website'],
};
