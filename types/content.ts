/**
 * Content model — normative type definitions for all site content.
 * Human-readable documentation: docs/technical/CONTENT-SCHEMA.md
 * and docs/content/CONTENT-MODELS.md.
 */

export type ContentStatus = 'live' | 'draft' | 'planned' | 'template';

export type ServiceCategory = 'website' | 'system' | 'recurring';
export type ProjectCategory = 'websites' | 'ecommerce' | 'admin-systems';
export type ResourceCategory =
  | 'website-cost-guides'
  | 'seo-guides'
  | 'ecommerce-guides'
  | 'business-systems';
export type CtaType = 'quote' | 'consultation';
export type FaqGroup = 'cost' | 'process' | 'technical' | 'support';

/** Shared SEO fields for every indexable content entry. */
export interface SeoFields {
  /** Page-title part; the layout template appends the brand name. */
  title: string;
  /** Optional full override of the title part (e.g. to add a geo modifier). */
  seoTitle?: string;
  /** 70–160 characters, unique sitewide. Enforced by the validator. */
  metaDescription: string;
  slug: string;
  /** Explicit cross-canonical path (rare; requires a decision-log entry). */
  canonicalPath?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  /** Path under /public or absolute URL. */
  socialImage?: string;
}

export interface BaseContent extends SeoFields {
  /** H1. */
  heading: string;
  /** Lead paragraph rendered under the H1. */
  intro: string;
  status: ContentStatus;
  /** ISO date yyyy-mm-dd. */
  dateCreated: string;
  /** ISO date yyyy-mm-dd; drives sitemap lastModified and visible “Updated”. */
  dateUpdated: string;
  /** True while the entry contains unconfirmed placeholder content. */
  placeholder?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
  group?: FaqGroup;
}

export interface ImageRef {
  src: string;
  /** Required, non-empty — validator enforced. */
  alt: string;
  width?: number;
  height?: number;
}

export interface Service extends BaseContent {
  category: ServiceCategory;
  /** One-line card summary (≤ ~120 chars). */
  summary: string;
  /** Customer problems, in the customer's words. */
  problems: string[];
  deliverables: string[];
  exclusions: string[];
  faqs: Faq[];
  relatedServiceSlugs: string[];
  relatedPackageSlugs: string[];
  relatedSolutionSlugs: string[];
  relatedProjectSlugs: string[];
  relatedArticleSlugs: string[];
  primaryKeywordCluster: string;
  ctaType: CtaType;
}

export interface Solution extends BaseContent {
  industry: string;
  painPoints: string[];
  /** How we solve it — each item names the relevant service. */
  approach: string[];
  recommendedServiceSlugs: string[];
  relatedProjectSlugs: string[];
  faqs: Faq[];
  primaryKeywordCluster: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: 'ZAR';
  /** Always true until the owner confirms final pricing (D-11). */
  indicative: true;
}

export interface PackageOffer extends BaseContent {
  /** Exactly one parent service. */
  serviceSlug: string;
  idealFor: string[];
  inclusions: string[];
  exclusions: string[];
  /** null = price on application. */
  priceRange: PriceRange | null;
  /** Honest delivery estimate, e.g. "3–5 weeks". */
  timeline: string;
  faqs: Faq[];
  primaryKeywordCluster: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  /** Only verified results are ever rendered. */
  verified: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  company?: string;
  /** Rendered only when true. */
  permissionConfirmed: boolean;
}

/** Trust taxonomy — controls public labels, related-link wording and client language. */
export type ProjectClassification =
  | 'client-project'
  | 'internal-product'
  | 'personal-project'
  | 'illustrative-demo'
  | 'template';

export type ProjectEvidenceLevel = 'complete' | 'limited' | 'illustrative' | 'none';

export interface Project extends BaseContent {
  /** Real name only with written permission; otherwise anonymised descriptor. */
  clientDescriptor: string;
  industry: string;
  location?: string;
  projectType: string;
  /** Central trust classification — never invent “client” language for templates/demos. */
  classification: ProjectClassification;
  /** Customer-facing status chip / related-link kind source. */
  publicLabel: string;
  evidenceLevel: ProjectEvidenceLevel;
  categories: ProjectCategory[];
  serviceSlugs: string[];
  solutionSlug?: string;
  stack: string[];
  businessProblem: string;
  objectives: string[];
  scope: string[];
  solutionSummary: string;
  process: string[];
  keyFunctionality: string[];
  seoWork: string[];
  results: ProjectResult[];
  dates: { start?: string; end?: string };
  projectStatus: 'completed' | 'in-progress' | 'template';
  /** False ⇒ page is forced noindex and excluded from the sitemap. */
  publishPermission: boolean;
  testimonial?: Testimonial;
  featuredImage?: ImageRef;
  gallery: ImageRef[];
  relatedProjectSlugs: string[];
  relatedArticleSlugs: string[];
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface SourceRef {
  label: string;
  url: string;
}

export interface Article extends BaseContent {
  category: ResourceCategory;
  /** At least one — validator enforced. */
  supportsServiceSlugs: string[];
  relatedArticleSlugs: string[];
  body: ArticleSection[];
  sources?: SourceRef[];
  /** Author slug from `data/authors.ts` — required for live articles. */
  authorSlug: string;
}

export interface ComparisonCriterion {
  name: string;
  aNote: string;
  bNote: string;
}

export interface Comparison extends BaseContent {
  optionA: string;
  optionB: string;
  criteria: ComparisonCriterion[];
  whenA: string[];
  whenB: string[];
  verdict: string;
  supportsServiceSlugs: string[];
  primaryKeywordCluster: string;
}

export interface LocationArea extends BaseContent {
  city: string;
  province: string;
  /** True subset of services genuinely offered in this area. */
  serviceSlugs: string[];
  /** Nearby areas served from this page (prevents doorway pages). */
  consolidatedAreas: string[];
  localFaqs: Faq[];
  projectSlugs: string[];
  primaryKeywordCluster: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  placeholder?: boolean;
}

/** Central author record for articles and About. */
export interface Author {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  longBio?: string;
  /** Path under /public — omit when no approved image exists. */
  image?: ImageRef;
  expertise: string[];
  /** Only real public profiles. */
  sameAs?: string[];
  /** Must be true to render on live pages. */
  approved: boolean;
  schemaType: 'Person';
}

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

export interface ResourceCategoryInfo extends BaseContent {
  category: ResourceCategory;
}

export interface LegalDoc extends BaseContent {
  sections: ArticleSection[];
  effectiveDate: string;
}
