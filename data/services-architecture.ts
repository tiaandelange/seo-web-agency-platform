/**
 * Explicit capability architecture for /services/ and custom-systems proof modules.
 * Do not infer flows or output kinds from service copy strings.
 */

export type CapabilityTier = 'acquire' | 'operate' | 'scale';

export type CapabilityOutputKind =
  | 'search-snippet'
  | 'enquiry-record'
  | 'quote-document'
  | 'status-view'
  | 'integration-log';

export interface CapabilityTierMeta {
  id: CapabilityTier;
  index: string;
  label: string;
  summary: string;
  statusLabel: string;
  flow: string[];
}

export interface CapabilityServiceLink {
  slug: string;
  title: string;
  summary: string;
  tier: CapabilityTier;
  flow: string[];
  outputKind: CapabilityOutputKind;
}

export interface ServiceProblemPath {
  id: string;
  label: string;
  diagnosis: string;
  tier: CapabilityTier;
  flow: string[];
  primaryServiceSlug: string;
  exploreHref: string;
  /** Static query for Discuss CTA — known at render time */
  discussHref: string;
}

export type WorkflowStepId =
  | 'enquiry'
  | 'site-visit'
  | 'costing'
  | 'approval'
  | 'quote'
  | 'job'
  | 'invoice';

export interface WorkflowStep {
  id: WorkflowStepId;
  label: string;
}

export interface WorkflowBottleneckRule {
  id: string;
  /** CSS hook class on the callout element */
  className: string;
  /** Step values that must all be checked */
  requiredSteps: WorkflowStepId[];
  callout: string;
}

export const CAPABILITY_TIERS: CapabilityTierMeta[] = [
  {
    id: 'acquire',
    index: '01',
    label: 'Acquire',
    summary: 'Websites, ecommerce and search visibility',
    statusLabel: 'Demand → enquiry',
    flow: [
      'Search demand',
      'Landing page',
      'Enquiry capture',
      'CRM / RFQ record',
      'Follow-up',
    ],
  },
  {
    id: 'operate',
    index: '02',
    label: 'Operate',
    summary: 'Portals, quotations and internal workflows',
    statusLabel: 'Intake → delivery',
    flow: [
      'Customer enquiry',
      'Structured intake',
      'Admin review',
      'Quote and approval',
      'Project status',
    ],
  },
  {
    id: 'scale',
    index: '03',
    label: 'Scale',
    summary: 'Integrations, automation and ongoing support',
    statusLabel: 'Connect → sustain',
    flow: [
      'Stable core system',
      'Approved integrations',
      'Automated handoffs',
      'Monitoring',
      'Care plan',
    ],
  },
];

export const CAPABILITY_SERVICES: CapabilityServiceLink[] = [
  {
    slug: 'business-websites',
    title: 'Business websites',
    summary: 'A credible, rankable foundation site for an established business.',
    tier: 'acquire',
    flow: ['Positioning', 'Architecture', 'Build', 'Launch'],
    outputKind: 'search-snippet',
  },
  {
    slug: 'lead-generation-websites',
    title: 'Lead generation websites',
    summary: 'Enquiry-focused sites for quote and call-out businesses.',
    tier: 'acquire',
    flow: ['Search demand', 'Landing page', 'Enquiry capture', 'Follow-up'],
    outputKind: 'enquiry-record',
  },
  {
    slug: 'seo-website-development',
    title: 'SEO website development',
    summary: 'Sites architected from search demand before design begins.',
    tier: 'acquire',
    flow: ['Demand research', 'Intent model', 'Architecture', 'Measurement'],
    outputKind: 'search-snippet',
  },
  {
    slug: 'ecommerce-websites',
    title: 'Ecommerce websites',
    summary: 'Stores with SA payments and product pages built to rank.',
    tier: 'acquire',
    flow: ['Catalogue', 'Checkout', 'Payment', 'Fulfilment'],
    outputKind: 'status-view',
  },
  {
    slug: 'product-catalogue-websites',
    title: 'Product catalogue websites',
    summary: 'Structured, quotable B2B ranges without forced checkout.',
    tier: 'acquire',
    flow: ['Catalogue', 'RFQ', 'Quote', 'Follow-up'],
    outputKind: 'enquiry-record',
  },
  {
    slug: 'website-redesign',
    title: 'Website redesign',
    summary: 'Audit-first rebuilds that protect earned search equity.',
    tier: 'acquire',
    flow: ['Audit', 'Redirect map', 'Rebuild', 'Monitor'],
    outputKind: 'search-snippet',
  },
  {
    slug: 'custom-web-applications',
    title: 'Custom web applications',
    summary: 'Bespoke systems for processes no packaged product fits.',
    tier: 'operate',
    flow: ['Discovery', 'Data model', 'Workflow screens', 'Handover'],
    outputKind: 'status-view',
  },
  {
    slug: 'admin-panel-development',
    title: 'Admin panel development',
    summary: 'Replace spreadsheet sprawl with one permissioned system.',
    tier: 'operate',
    flow: ['Intake', 'Records', 'Permissions', 'Exports'],
    outputKind: 'status-view',
  },
  {
    slug: 'rfq-and-quotation-systems',
    title: 'RFQ and quotation systems',
    summary: 'Structured quoting: intake, PDFs, status and follow-up.',
    tier: 'operate',
    flow: ['RFQ intake', 'Costing', 'Quote PDF', 'Approval'],
    outputKind: 'quote-document',
  },
  {
    slug: 'customer-and-supplier-portals',
    title: 'Customer and supplier portals',
    summary: 'Secure self-service for repeat B2B relationships.',
    tier: 'operate',
    flow: ['Login', 'Documents', 'Status', 'Notifications'],
    outputKind: 'status-view',
  },
  {
    slug: 'website-maintenance-and-support',
    title: 'Website maintenance and support',
    summary: 'Care plans that keep sites fast, secure and improving.',
    tier: 'scale',
    flow: ['Monitoring', 'Updates', 'Backups', 'Improvements'],
    outputKind: 'integration-log',
  },
];

export const SERVICE_PROBLEM_PATHS: ServiceProblemPath[] = [
  {
    id: 'qualified-enquiries',
    label: 'Generate more qualified enquiries',
    diagnosis:
      'You likely need a site structured around search intent and enquiry capture — not a brochure with a contact form bolted on.',
    tier: 'acquire',
    flow: ['Search demand', 'Landing page', 'Enquiry capture', 'CRM / RFQ record', 'Follow-up'],
    primaryServiceSlug: 'lead-generation-websites',
    exploreHref: '/services/lead-generation-websites/',
    discussHref: '/request-a-quote/?type=lead-generation&problem=qualified-enquiries',
  },
  {
    id: 'spreadsheet-quoting',
    label: 'Replace spreadsheet quoting',
    diagnosis:
      'Pricing and follow-up commonly break when quotes live in Word, Excel and inboxes. A structured RFQ path usually fits first.',
    tier: 'operate',
    flow: ['Enquiry', 'Structured RFQ', 'Costing', 'Quote PDF', 'Approval', 'Follow-up'],
    primaryServiceSlug: 'rfq-and-quotation-systems',
    exploreHref: '/services/rfq-and-quotation-systems/',
    discussHref: '/request-a-quote/?type=custom-system&problem=spreadsheet-quoting',
  },
  {
    id: 'status-calls',
    label: 'Reduce status-update calls',
    diagnosis:
      'Repeat “just checking” calls usually mean customers lack a reliable place to see documents and job status.',
    tier: 'operate',
    flow: ['Secure login', 'Documents', 'Live status', 'Notifications'],
    primaryServiceSlug: 'customer-and-supplier-portals',
    exploreHref: '/services/customer-and-supplier-portals/',
    discussHref: '/request-a-quote/?type=custom-system&problem=status-calls',
  },
  {
    id: 'search-visibility',
    label: 'Improve search visibility',
    diagnosis:
      'Weak rankings are often an architecture problem — intent coverage, internal links and technical foundations — not a content sprinkle.',
    tier: 'acquire',
    flow: ['Demand research', 'Intent model', 'Site architecture', 'Technical build', 'Measurement'],
    primaryServiceSlug: 'seo-website-development',
    exploreHref: '/services/seo-website-development/',
    discussHref: '/request-a-quote/?type=seo-website&problem=search-visibility',
  },
  {
    id: 'disconnected-systems',
    label: 'Connect disconnected systems',
    diagnosis:
      'When email, spreadsheets and tools do not share a data model, re-entry and missed handoffs are common. Worth mapping before buying another tool.',
    tier: 'operate',
    flow: ['Single intake', 'Structured data', 'Workflow', 'Live status', 'Integrations'],
    primaryServiceSlug: 'custom-web-applications',
    exploreHref: '/services/custom-web-applications/',
    discussHref: '/request-a-quote/?type=custom-system&problem=disconnected-systems',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 'enquiry', label: 'Enquiry' },
  { id: 'site-visit', label: 'Site visit' },
  { id: 'costing', label: 'Costing' },
  { id: 'approval', label: 'Approval' },
  { id: 'quote', label: 'Quote' },
  { id: 'job', label: 'Job' },
  { id: 'invoice', label: 'Invoice' },
];

export const WORKFLOW_BOTTLENECKS: WorkflowBottleneckRule[] = [
  {
    id: 'retyping',
    className: 'bottleneck--retyping',
    requiredSteps: ['enquiry', 'costing'],
    callout: 'Information is likely being re-entered before pricing begins — worth reviewing the handoff.',
  },
  {
    id: 'field-handover',
    className: 'bottleneck--field-handover',
    requiredSteps: ['site-visit', 'costing'],
    callout: 'Field information commonly needs a structured handover into costing rather than informal notes.',
  },
  {
    id: 'approval-delay',
    className: 'bottleneck--approval-delay',
    requiredSteps: ['costing', 'approval', 'quote'],
    callout: 'Approval delays may be blocking quote turnaround when costing, sign-off and PDF output are separate.',
  },
  {
    id: 'commercial-ops',
    className: 'bottleneck--commercial-ops',
    requiredSteps: ['quote', 'job'],
    callout: 'Accepted commercial data commonly needs to become operational data without another retype.',
  },
  {
    id: 'handover',
    className: 'bottleneck--handover',
    requiredSteps: ['job', 'invoice'],
    callout: 'Completion and invoicing may require a reliable status handover between delivery and finance.',
  },
  {
    id: 'shared-model',
    className: 'bottleneck--shared-model',
    requiredSteps: ['enquiry', 'invoice'],
    callout: 'A process that spans enquiry through invoice often justifies one shared data model.',
  },
];

export const ARCHITECTURE_LAYERS = [
  {
    id: 'application',
    label: 'Application',
    gloss: 'Workflow screens shaped around how your team actually works.',
  },
  {
    id: 'authentication',
    label: 'Authentication',
    gloss: 'Secure sign-in and session management.',
  },
  {
    id: 'roles',
    label: 'Roles',
    gloss: 'Control who may view, create, approve or change records.',
  },
  {
    id: 'database',
    label: 'Database',
    gloss: 'A managed data store for operational records you own.',
  },
  {
    id: 'files',
    label: 'Files',
    gloss: 'Document and attachment storage with clear access rules.',
  },
  {
    id: 'audit',
    label: 'Audit trail',
    gloss: 'Record important actions and status changes.',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    gloss: 'Connect email, accounting, payments or other approved services.',
  },
  {
    id: 'deployment',
    label: 'Deployment',
    gloss: 'Staged releases with a known path to production.',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    gloss: 'Visibility into uptime, errors and operational health.',
  },
] as const;

/** Map existing deliverable strings into staggered layers (meaning preserved). */
export const CUSTOM_SYSTEMS_DELIVERABLE_LAYERS = [
  {
    id: 'discovery',
    index: '01',
    heading: 'Discovery',
    items: [
      'Paid discovery: process mapping, data model and a written build specification',
    ],
  },
  {
    id: 'application',
    index: '02',
    heading: 'Application',
    items: [
      'Web application built with TypeScript, Next.js and a managed database',
      'Screens designed around your real workflow, not generic CRUD',
      'Reporting and exports for the numbers you actually manage by',
    ],
  },
  {
    id: 'governance',
    index: '03',
    heading: 'Governance',
    items: [
      'User accounts, roles and permissions that mirror your organisation',
      'Staged delivery with working software reviewed every cycle',
    ],
  },
  {
    id: 'handover',
    index: '04',
    heading: 'Handover',
    items: [
      'Documentation, handover and full code ownership',
      'Support plan with response targets after go-live',
    ],
  },
] as const;

export function servicesForTier(tier: CapabilityTier): CapabilityServiceLink[] {
  return CAPABILITY_SERVICES.filter((s) => s.tier === tier);
}
