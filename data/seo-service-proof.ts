/**
 * Explicit proof-module data for SEO website development (Phase 2).
 * No fabricated ranks, traffic, or crawl results.
 */

export interface SeoMatrixRow {
  intent: string;
  keywordGroup: string;
  targetPage: string;
  funnel: string;
  technicalStatus: string;
  conversionObjective: string;
}

export interface SeoAuditIssue {
  id: string;
  label: string;
  why: string;
  affected: string;
  action: string;
}

export interface SeoMethodStage {
  id: string;
  index: string;
  label: string;
  artefact: string;
  detail: string;
}

export interface SeoScanStage {
  id: string;
  label: string;
  finding: string;
  note: string;
}

/** Illustrative architecture matrix — sample structure, not live rankings. */
export const SEO_MATRIX_ROWS: SeoMatrixRow[] = [
  {
    intent: 'Commercial',
    keywordGroup: 'service + city',
    targetPage: '/services/…/',
    funnel: 'Consider',
    technicalStatus: 'Indexable',
    conversionObjective: 'Enquiry',
  },
  {
    intent: 'Comparison',
    keywordGroup: 'option A vs B',
    targetPage: '/compare/…/',
    funnel: 'Evaluate',
    technicalStatus: 'Linked',
    conversionObjective: 'Clarify fit',
  },
  {
    intent: 'Informational',
    keywordGroup: 'how / cost / guide',
    targetPage: '/resources/…/',
    funnel: 'Learn',
    technicalStatus: 'Supporting',
    conversionObjective: 'Trust',
  },
  {
    intent: 'Transactional',
    keywordGroup: 'package / quote',
    targetPage: '/website-packages/…/',
    funnel: 'Decide',
    technicalStatus: 'Canonical',
    conversionObjective: 'Proposal',
  },
];

export const SEO_AUDIT_ISSUES: SeoAuditIssue[] = [
  {
    id: 'duplicate-intent',
    label: 'Duplicate intent detected',
    why: 'Two pages chasing the same search job split authority and confuse crawlers.',
    affected: 'Service and location pages competing for the same query cluster.',
    action: 'Assign one primary destination per intent; redirect or retarget the duplicate.',
  },
  {
    id: 'thin-service',
    label: 'Thin service page',
    why: 'Pages without clear problem, proof and next step rarely earn commercial queries.',
    affected: 'Generic “services” copy with no deliverables or exclusions.',
    action: 'Rebuild around intent, scope and conversion — not filler paragraphs.',
  },
  {
    id: 'internal-link-gap',
    label: 'Internal-link gap',
    why: 'Important pages that are hard to reach from the hub crawl poorly and convert less.',
    affected: 'Money pages orphaned from homepage and related guides.',
    action: 'Add contextual links from hubs, related blocks and nav where they belong.',
  },
  {
    id: 'missing-schema',
    label: 'Missing structured data',
    why: 'Valid schema helps machines understand page type — it is not a ranking trick.',
    affected: 'Service and FAQ pages without Organisation / WebPage / FAQ where appropriate.',
    action: 'Add honest schema that matches visible content; never fabricate ratings.',
  },
  {
    id: 'slow-mobile',
    label: 'Slow mobile render',
    why: 'Heavy client JS and unbudgeted assets raise LCP and abandon mobile visitors.',
    affected: 'Hero media, third-party scripts, unoptimised fonts.',
    action: 'Enforce a performance budget; keep ranking HTML server-rendered.',
  },
  {
    id: 'indexation-conflict',
    label: 'Indexation conflict',
    why: 'Conflicting robots, noindex and sitemap entries waste crawl budget.',
    affected: 'Staging URLs, thank-you pages, or templates leaking into the index.',
    action: 'Align robots, canonicals and sitemap from one route registry.',
  },
];

export const SEO_METHOD_STAGES: SeoMethodStage[] = [
  {
    id: 'research',
    index: '01',
    label: 'Demand research',
    artefact: 'Research sheet',
    detail: 'Keyword and competitor notes specific to your market — not a generic keyword dump.',
  },
  {
    id: 'intent',
    index: '02',
    label: 'Intent model',
    artefact: 'Keyword map',
    detail: 'One destination page per commercial intent, with funnel stage and objective.',
  },
  {
    id: 'architecture',
    index: '03',
    label: 'Site architecture',
    artefact: 'Sitemap plan',
    detail: 'URL structure, hubs and internal-linking rules before design polish.',
  },
  {
    id: 'build',
    index: '04',
    label: 'Technical build',
    artefact: 'HTML / schema panel',
    detail: 'Server-rendered pages, clean metadata and schema that match visible content.',
  },
  {
    id: 'indexation',
    index: '05',
    label: 'Indexation',
    artefact: 'Search Console status',
    detail: 'Sitemap, robots and a monitored window after launch — not a set-and-forget checkbox.',
  },
  {
    id: 'measurement',
    index: '06',
    label: 'Measurement',
    artefact: 'Conversion events',
    detail: 'Analytics and conversion events wired to real enquiry paths.',
  },
];

/** Preview scan stages — explicitly not a live crawl. */
export const SEO_SCAN_STAGES: SeoScanStage[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    finding: 'Hub and service URL pattern looks consistent in this sample.',
    note: 'Preview only — a real audit inspects your live IA and redirects.',
  },
  {
    id: 'metadata',
    label: 'Metadata',
    finding: 'Titles and descriptions should be unique per intent destination.',
    note: 'Preview only — we do not fetch your live meta tags here.',
  },
  {
    id: 'indexation',
    label: 'Indexation',
    finding: 'Thank-you and template routes commonly need noindex controls.',
    note: 'Preview only — confirm against your robots and Search Console.',
  },
  {
    id: 'performance',
    label: 'Performance',
    finding: 'Client JS and hero weight are the usual mobile LCP risks.',
    note: 'Preview only — field metrics come from a real measurement pass.',
  },
  {
    id: 'structured-data',
    label: 'Structured data',
    finding: 'Schema must match visible content; ratings require real permissioned data.',
    note: 'Preview only — validators run against your published HTML.',
  },
  {
    id: 'internal-links',
    label: 'Internal links',
    finding: 'Money pages need contextual paths from hubs and related content.',
    note: 'Preview only — link graphs are built from your crawl.',
  },
];

export const SEO_DELIVERABLE_LAYERS = [
  {
    id: 'research',
    index: '01',
    heading: 'Research and mapping',
    items: [
      'Keyword and competitor research specific to your market',
      'Keyword-to-page map: one destination page per search intent',
      'Site architecture, URL structure and internal-linking plan',
    ],
  },
  {
    id: 'build',
    index: '02',
    heading: 'Technical build',
    items: [
      'Technical build: server-rendered pages, clean HTML, fast Core Web Vitals',
      'Unique metadata and appropriate schema markup throughout',
      'XML sitemap, robots and indexation controls',
    ],
  },
  {
    id: 'launch',
    index: '03',
    heading: 'Launch and measurement',
    items: [
      'Search Console setup with a 90-day indexation support window',
      'The full research and mapping documents — your asset, not our secret',
    ],
  },
] as const;
