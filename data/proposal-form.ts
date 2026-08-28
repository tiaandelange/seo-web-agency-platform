/**
 * Curated proposal-form service options — labels for buyers, values for lead routing.
 * Includes fixed-price SEO audit products alongside build services.
 */
import {
  formatZarPlus,
  formatZarRange,
  formatZarUnder,
} from '@/lib/format-zar';

export const PROPOSAL_SERVICE_OPTIONS = [
  { value: 'seo-website-development', label: 'SEO-first business website' },
  { value: 'lead-generation-websites', label: 'Lead-generation website' },
  { value: 'ecommerce-websites', label: 'Ecommerce website' },
  { value: 'product-catalogue-websites', label: 'Product catalogue or RFQ website' },
  { value: 'website-redesign', label: 'Website redesign' },
  { value: 'seo-audit-basic', label: 'SEO audit' },
  { value: 'seo-audit-advanced', label: 'Advanced SEO audit' },
  { value: 'analytics-and-conversion-tracking', label: 'Analytics & conversion tracking' },
  { value: 'search-care', label: 'Search Care (monthly)' },
  { value: 'customer-and-supplier-portals', label: 'Customer or supplier portal' },
  { value: 'admin-panel-development', label: 'Admin or quotation system' },
  { value: 'custom-web-applications', label: 'Workflow automation' },
  { value: 'website-maintenance-and-support', label: 'Hosting and support' },
  { value: 'not-sure', label: 'Not sure—please advise' },
] as const;

/** Shared with enquiry recommender — must stay identical to select option values. */
export const PROPOSAL_BUDGET_BAND_UNDER_5K = formatZarUnder(5000);
export const PROPOSAL_BUDGET_BAND_5_10 = formatZarRange(5000, 10000);
export const PROPOSAL_BUDGET_BAND_10_20 = formatZarRange(10000, 20000);
export const PROPOSAL_BUDGET_BAND_20_40 = formatZarRange(20000, 40000);
export const PROPOSAL_BUDGET_BAND_40_75 = formatZarRange(40000, 75000);
export const PROPOSAL_BUDGET_BAND_75_PLUS = formatZarPlus(75000);

export const PROPOSAL_BUDGET_BANDS = [
  PROPOSAL_BUDGET_BAND_UNDER_5K,
  PROPOSAL_BUDGET_BAND_5_10,
  PROPOSAL_BUDGET_BAND_10_20,
  PROPOSAL_BUDGET_BAND_20_40,
  PROPOSAL_BUDGET_BAND_40_75,
  PROPOSAL_BUDGET_BAND_75_PLUS,
  'Not sure—please advise',
] as const;

export const PROPOSAL_TIMELINES = [
  'As soon as possible',
  'Within 1–2 months',
  'Within 3–6 months',
  'Just researching',
] as const;
