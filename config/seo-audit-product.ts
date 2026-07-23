import { brand } from '@/config/brand';

/**
 * Two-tier SEO audit products (D-30 / D-31).
 * Single source for prices, limits, routes and checkout — never scatter literals.
 */

export type SeoAuditProductId = 'priority-fix' | 'advanced';

export interface SeoAuditProduct {
  id: SeoAuditProductId;
  name: string;
  shortName: string;
  sku: string;
  defaultPriceZar: number;
  currency: 'ZAR';
  route: string;
  intakePath: string;
  thankYouPath: string;
  indexable: boolean;
  maxCrawlableUrls: number;
  maxManualPages: number;
  maxCompetitors: number;
  implementationFixLimit: number;
  implementationMinutes: number;
  turnaround: string;
  positioning: string;
  shortDescription: string;
  seoTitle: string;
  metaDescription: string;
  heading: string;
  supportingStatement: string;
  bestFor: string[];
  envActiveKey: string;
  envPriceKey: string;
  envCheckoutKey: string;
  /** Legacy env keys still honoured for the basic pack. */
  legacyActiveKey?: string;
  legacyPriceKey?: string;
  legacyCheckoutKey?: string;
}

export const SEO_AUDIT_HUB_PATH = '/seo-audit/';
export const SEO_AUDIT_CUSTOM_QUOTE_PATH = '/request-a-quote/?type=custom-seo-audit';

/** @deprecated Use SEO_AUDIT_HUB_PATH */
export const SEO_AUDIT_PATH = SEO_AUDIT_HUB_PATH;

export const SEO_AUDIT_PRODUCTS: Record<SeoAuditProductId, SeoAuditProduct> = {
  'priority-fix': {
    id: 'priority-fix',
    name: 'SEO Audit & Priority Fix Pack',
    shortName: 'Priority Fix Pack',
    sku: 'seo-audit-priority-fix',
    defaultPriceZar: 2950,
    currency: 'ZAR',
    route: '/seo-audit/',
    intakePath: '/seo-audit/intake/',
    thankYouPath: '/seo-audit/thank-you/',
    indexable: true,
    maxCrawlableUrls: 10,
    maxManualPages: 10,
    maxCompetitors: 0,
    implementationFixLimit: 5,
    implementationMinutes: 90,
    turnaround: 'Five business days after payment, eligibility and access',
    positioning:
      'Find the SEO problems holding your website back and get the most important quick fixes implemented.',
    shortDescription:
      'A focused SEO audit for small South African business websites, including a prioritised action plan and implementation of selected high-impact fixes.',
    seoTitle: 'SEO Audit South Africa – Priority Fixes Included',
    metaDescription:
      'Compare once-off SEO audits for South African websites: R2,950 priority fixes for small sites, or R8,500 advanced technical and content audits.',
    heading: 'SEO Audits with Priority Fixes — Clear Scope, Once-Off Price',
    supportingStatement:
      'Choose a focused audit for a small business website, or a comprehensive technical and content audit for larger, ecommerce and catalogue sites — without a monthly retainer.',
    bestFor: [
      'Small service and brochure websites',
      'Contractors and professional practices',
      'Local businesses',
      'Sites with no more than 10 indexable pages',
      'A low-risk diagnostic before larger work',
    ],
    envActiveKey: 'SEO_AUDIT_BASIC_ACTIVE',
    envPriceKey: 'SEO_AUDIT_BASIC_PRICE_ZAR',
    envCheckoutKey: 'NEXT_PUBLIC_SEO_AUDIT_BASIC_CHECKOUT_URL',
    legacyActiveKey: 'SEO_AUDIT_PRODUCT_ACTIVE',
    legacyPriceKey: 'SEO_AUDIT_PRICE_ZAR',
    legacyCheckoutKey: 'NEXT_PUBLIC_SEO_AUDIT_CHECKOUT_URL',
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced SEO Audit & Implementation Roadmap',
    shortName: 'Advanced SEO Audit',
    sku: 'seo-audit-advanced',
    defaultPriceZar: 8500,
    currency: 'ZAR',
    route: '/seo-audit/advanced/',
    intakePath: '/seo-audit/advanced/intake/',
    thankYouPath: '/seo-audit/advanced/thank-you/',
    indexable: true,
    maxCrawlableUrls: 250,
    maxManualPages: 25,
    maxCompetitors: 3,
    implementationFixLimit: 8,
    implementationMinutes: 120,
    turnaround: 'Seven to ten business days after payment, eligibility and access',
    positioning:
      'A comprehensive technical, content and website-architecture audit for established, ecommerce and content-rich websites.',
    shortDescription:
      'Find the structural, technical and content problems affecting a larger website, understand what should be fixed first, and receive a prioritised 90-day implementation roadmap.',
    seoTitle: 'Advanced SEO Audit South Africa',
    metaDescription:
      'Comprehensive technical, content and website-architecture SEO audit for larger websites. Includes priority fixes and a 90-day roadmap for R8,500.',
    heading: 'Advanced SEO Audit for Larger and More Complex Websites',
    supportingStatement:
      'Get a detailed assessment of your website’s technical foundation, indexation, architecture, content and organic-search opportunities, followed by a prioritised 90-day implementation roadmap.',
    bestFor: [
      'Established business and multi-service websites',
      'Ecommerce and product catalogues',
      'Supplier and manufacturer sites',
      'Content-rich sites that grew without clear architecture',
      'Sites with indexation or duplication concerns',
      'Businesses preparing for a redesign or migration',
    ],
    envActiveKey: 'SEO_AUDIT_ADVANCED_ACTIVE',
    envPriceKey: 'SEO_AUDIT_ADVANCED_PRICE_ZAR',
    envCheckoutKey: 'NEXT_PUBLIC_SEO_AUDIT_ADVANCED_CHECKOUT_URL',
  },
};

/** Hub metadata (broader transactional intent than the advanced page alone). */
export const SEO_AUDIT_HUB = {
  seoTitle: SEO_AUDIT_PRODUCTS['priority-fix'].seoTitle,
  metaDescription: SEO_AUDIT_PRODUCTS['priority-fix'].metaDescription,
  heading: SEO_AUDIT_PRODUCTS['priority-fix'].heading,
  supportingStatement: SEO_AUDIT_PRODUCTS['priority-fix'].supportingStatement,
};

/** Indicative range for the /pricing/ project table — spans published tiers through custom enquiries. */
export const SEO_AUDIT_PROJECT_PRICING = {
  label: 'SEO Audit',
  hubPath: SEO_AUDIT_HUB_PATH,
  priceRange: {
    min: SEO_AUDIT_PRODUCTS['priority-fix'].defaultPriceZar,
    max: 15000,
  },
  timeline: '5–10 business days after payment, eligibility and access (by tier)',
} as const;

function envFlagTrue(value: string | undefined, defaultTrue: boolean): boolean {
  if (value === undefined || value.trim() === '') return defaultTrue;
  const flag = value.trim().toLowerCase();
  return flag === '1' || flag === 'true' || flag === 'yes';
}

function parsePrice(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function formatAmount(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getSeoAuditProduct(id: SeoAuditProductId): SeoAuditProduct {
  return SEO_AUDIT_PRODUCTS[id];
}

export function listSeoAuditProducts(): SeoAuditProduct[] {
  return [SEO_AUDIT_PRODUCTS['priority-fix'], SEO_AUDIT_PRODUCTS.advanced];
}

export function isSeoAuditTierActive(id: SeoAuditProductId): boolean {
  const product = getSeoAuditProduct(id);
  const primary = process.env[product.envActiveKey];
  if (primary !== undefined && primary.trim() !== '') {
    return envFlagTrue(primary, true);
  }
  if (product.legacyActiveKey) {
    return envFlagTrue(process.env[product.legacyActiveKey], true);
  }
  return true;
}

export function seoAuditTierPriceZar(id: SeoAuditProductId): number {
  const product = getSeoAuditProduct(id);
  const primary = process.env[product.envPriceKey];
  if (primary !== undefined && primary.trim() !== '') {
    return parsePrice(primary, product.defaultPriceZar);
  }
  if (product.legacyPriceKey) {
    return parsePrice(process.env[product.legacyPriceKey], product.defaultPriceZar);
  }
  return product.defaultPriceZar;
}

export function seoAuditTierCheckoutUrl(id: SeoAuditProductId): string {
  const product = getSeoAuditProduct(id);
  const primary = (process.env[product.envCheckoutKey] || '').trim();
  if (primary) return primary;
  if (product.legacyCheckoutKey) {
    return (process.env[product.legacyCheckoutKey] || '').trim();
  }
  return '';
}

export function isSeoAuditTierCheckoutConfigured(id: SeoAuditProductId): boolean {
  return isSeoAuditTierActive(id) && seoAuditTierCheckoutUrl(id).length > 0;
}

export function seoAuditTierPriceLabel(id: SeoAuditProductId): string {
  const amount = formatAmount(seoAuditTierPriceZar(id));
  if (!brand.vat.registered) {
    return `R${amount} once-off`;
  }
  const vatBit = brand.vat.number ? ` incl. VAT (${brand.vat.number})` : ' incl. VAT';
  return `R${amount} once-off${vatBit}`;
}

export function seoAuditTierPrimaryCtaLabel(id: SeoAuditProductId): string {
  const price = seoAuditTierPriceLabel(id);
  if (isSeoAuditTierCheckoutConfigured(id)) {
    return id === 'advanced' ? `Buy the Advanced SEO Audit — ${price}` : `Buy the SEO Audit — ${price}`;
  }
  return id === 'advanced'
    ? `Request the ${price} Advanced SEO Audit`
    : `Request the ${price} SEO Audit`;
}

export function seoAuditTierPrimaryCtaHref(id: SeoAuditProductId): string {
  if (isSeoAuditTierCheckoutConfigured(id)) {
    return seoAuditTierCheckoutUrl(id);
  }
  return getSeoAuditProduct(id).intakePath;
}

export function seoAuditTierPrimaryCtaExternal(id: SeoAuditProductId): boolean {
  return isSeoAuditTierCheckoutConfigured(id);
}

/** Comparison rows for the hub (mobile-friendly cards use the same source). */
export const SEO_AUDIT_COMPARISON_ROWS: { feature: string; basic: string; advanced: string }[] = [
  { feature: 'Price', basic: 'R2,950 once-off', advanced: 'R8,500 once-off' },
  { feature: 'Recommended website size', basic: 'Up to 10 pages', advanced: 'Up to 250 crawlable URLs' },
  { feature: 'Manual page review', basic: 'Up to 10 pages', advanced: 'Up to 25 priority pages' },
  { feature: 'Technical crawl', basic: 'Focused', advanced: 'Comprehensive' },
  { feature: 'Search Console review', basic: 'Included where access is supplied', advanced: 'Detailed review' },
  { feature: 'GA4 review', basic: 'Not required', advanced: 'Included where access is supplied' },
  { feature: 'Keyword review', basic: 'Primary terms only', advanced: 'Keyword and content-gap analysis' },
  { feature: 'Competitor review', basic: 'Not included', advanced: 'Up to 3 organic competitors' },
  { feature: 'Backlink review', basic: 'Obvious risk check only', advanced: 'Backlink-profile assessment' },
  { feature: 'Site architecture', basic: 'Basic review', advanced: 'Detailed architecture review' },
  {
    feature: 'Ecommerce / catalogue review',
    basic: 'Excluded',
    advanced: 'Included where applicable',
  },
  { feature: 'Implementation', basic: 'Five fixes or 90 minutes', advanced: 'Eight fixes or two hours' },
  { feature: 'Action plan', basic: '30 days', advanced: '90 days' },
  { feature: 'Handover', basic: 'Recording or 20-minute call', advanced: 'Recording and 45-minute strategy call' },
  { feature: 'Turnaround', basic: 'Five business days', advanced: 'Seven to ten business days' },
];

/* ---- Backward-compatible aliases for the basic pack (existing imports) ---- */

/** @deprecated Prefer getSeoAuditProduct('priority-fix') */
export const SEO_AUDIT_PRODUCT = {
  name: SEO_AUDIT_PRODUCTS['priority-fix'].name,
  shortName: SEO_AUDIT_PRODUCTS['priority-fix'].shortName,
  sku: SEO_AUDIT_PRODUCTS['priority-fix'].sku,
  defaultPriceZar: SEO_AUDIT_PRODUCTS['priority-fix'].defaultPriceZar,
  maxIndexablePages: SEO_AUDIT_PRODUCTS['priority-fix'].maxCrawlableUrls,
  implementationPagesOrMinutes: {
    maxPages: SEO_AUDIT_PRODUCTS['priority-fix'].implementationFixLimit,
    maxMinutes: SEO_AUDIT_PRODUCTS['priority-fix'].implementationMinutes,
  },
  turnaroundBusinessDays: 5,
  currency: 'ZAR' as const,
  positioning: SEO_AUDIT_PRODUCTS['priority-fix'].positioning,
  shortDescription: SEO_AUDIT_PRODUCTS['priority-fix'].shortDescription,
  seoTitle: SEO_AUDIT_PRODUCTS['priority-fix'].seoTitle,
  metaDescription: SEO_AUDIT_PRODUCTS['priority-fix'].metaDescription,
  heading: SEO_AUDIT_PRODUCTS['priority-fix'].heading,
  supportingStatement: SEO_AUDIT_PRODUCTS['priority-fix'].supportingStatement,
};

export const SEO_AUDIT_INTAKE_PATH = SEO_AUDIT_PRODUCTS['priority-fix'].intakePath;
export const SEO_AUDIT_THANK_YOU_PATH = SEO_AUDIT_PRODUCTS['priority-fix'].thankYouPath;

export function isSeoAuditProductActive(): boolean {
  return isSeoAuditTierActive('priority-fix');
}

export function seoAuditCheckoutUrl(): string {
  return seoAuditTierCheckoutUrl('priority-fix');
}

export function isSeoAuditCheckoutConfigured(): boolean {
  return isSeoAuditTierCheckoutConfigured('priority-fix');
}

export function seoAuditPriceZar(): number {
  return seoAuditTierPriceZar('priority-fix');
}

export function seoAuditPriceLabel(): string {
  return seoAuditTierPriceLabel('priority-fix');
}

export function seoAuditPrimaryCtaLabel(): string {
  return seoAuditTierPrimaryCtaLabel('priority-fix');
}

export function seoAuditPrimaryCtaHref(): string {
  return seoAuditTierPrimaryCtaHref('priority-fix');
}

export function seoAuditPrimaryCtaExternal(): boolean {
  return seoAuditTierPrimaryCtaExternal('priority-fix');
}
