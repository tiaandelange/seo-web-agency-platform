/**
 * Curated proposal-form service options — labels for buyers, values for lead routing.
 * Includes fixed-price SEO audit products alongside build services.
 */

export const PROPOSAL_SERVICE_OPTIONS = [
  { value: 'seo-website-development', label: 'SEO-first business website' },
  { value: 'lead-generation-websites', label: 'Lead-generation website' },
  { value: 'ecommerce-websites', label: 'Ecommerce website' },
  { value: 'product-catalogue-websites', label: 'Product catalogue or RFQ website' },
  { value: 'website-redesign', label: 'Website redesign' },
  { value: 'seo-audit-basic', label: 'SEO audit' },
  { value: 'seo-audit-advanced', label: 'Advanced SEO audit' },
  { value: 'customer-and-supplier-portals', label: 'Customer or supplier portal' },
  { value: 'admin-panel-development', label: 'Admin or quotation system' },
  { value: 'custom-web-applications', label: 'Workflow automation' },
  { value: 'website-maintenance-and-support', label: 'Hosting and support' },
  { value: 'not-sure', label: 'Not sure—please advise' },
] as const;

export const PROPOSAL_BUDGET_BANDS = [
  'Under R5,000',
  'R5,000–R10,000',
  'R10,000–R20,000',
  'R20,000–R40,000',
  'R40,000–R75,000',
  'R75,000+',
  'Not sure—please advise',
] as const;

export const PROPOSAL_TIMELINES = [
  'As soon as possible',
  'Within 1–2 months',
  'Within 3–6 months',
  'Just researching',
] as const;
