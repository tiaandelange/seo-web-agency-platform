/**
 * Central service → proof mapping (Prompt 6).
 * Prefer real projects; otherwise labelled demos or honest “no public proof yet”.
 * Never invent clients or metrics.
 */

export type ProofKind = 'project' | 'demo' | 'none';

export type ServiceProofEntry = {
  serviceSlug: string;
  /** Short note for the service page proof block. */
  note: string;
  items: Array<
    | {
        kind: 'project';
        slug: string;
        /** Why this project is relevant here — not a result claim. */
        relevance: string;
      }
    | {
        kind: 'demo';
        label: string;
        href: string;
        relevance: string;
      }
    | {
        kind: 'none';
        relevance: string;
      }
  >;
  /** Optional SSR workflow key from data/workflow-demos.ts */
  workflowId?: 'rfq-quotation' | 'portal-admin';
  /** Show commerce model matrix on this service page */
  showCommerceMatrix?: boolean;
};

export const SERVICE_PROOF_MAP: ServiceProofEntry[] = [
  {
    serviceSlug: 'business-websites',
    note: 'Public website architecture with enquiry pathways — shown through a live project, not a stock template.',
    items: [
      {
        kind: 'project',
        slug: 'damtech-website',
        relevance: 'Service architecture, location/application proof pages and enquiry capture for a technical contractor.',
      },
    ],
  },
  {
    serviceSlug: 'lead-generation-websites',
    note: 'Enquiry-led structure: search-matched pages that feed a qualified quote request.',
    items: [
      {
        kind: 'project',
        slug: 'damtech-website',
        relevance: 'Lead-generation website with calculators, RFQ intake and follow-through into quoting.',
      },
    ],
  },
  {
    serviceSlug: 'seo-website-development',
    note: 'SEO-first means crawlable structure and intent-matched pages — inspectable on a live build.',
    items: [
      {
        kind: 'project',
        slug: 'damtech-website',
        relevance: 'Keyword-to-page service architecture for a specialist industrial service business.',
      },
    ],
  },
  {
    serviceSlug: 'analytics-and-conversion-tracking',
    note: 'Measurement setup is operational configuration, not a portfolio screenshot. No fabricated conversion-rate claims.',
    items: [
      {
        kind: 'none',
        relevance:
          'Proof is the method: GA4 event taxonomy, Consent Mode v2, and a Looker Studio dashboard you own after handover — ask for a walkthrough on the scoping call.',
      },
    ],
  },
  {
    serviceSlug: 'product-catalogue-websites',
    note: 'Catalogue-plus-quote is a different commercial model from checkout ecommerce. No public client catalogue case study yet — choose the model matrix and RFQ system proof instead.',
    items: [
      {
        kind: 'project',
        slug: 'damtech-website',
        relevance: 'Adjacent proof: structured service/product enquiry into an RFQ and quotation workflow.',
      },
      {
        kind: 'demo',
        label: 'Illustrative workflow — Industrial Engine (RFQ → quote)',
        href: '/projects/#industrial-engine',
        relevance: 'Interactive demo of capture → calculate → approve → dispatch when you need to see the operational loop.',
      },
    ],
    showCommerceMatrix: true,
  },
  {
    serviceSlug: 'ecommerce-websites',
    note: 'No public ecommerce client case study yet. Use the model matrix to choose the right commerce shape before scoping.',
    items: [
      {
        kind: 'none',
        relevance: 'We do not invent storefront case studies. Scope starts from product count, payment model and fulfilment rules.',
      },
    ],
    showCommerceMatrix: true,
  },
  {
    serviceSlug: 'custom-web-applications',
    note: 'Operational software for processes that do not fit a brochure site.',
    items: [
      {
        kind: 'project',
        slug: 'proplytic-property-software',
        relevance: 'Internal product: authenticated records, portfolio views, documents and reporting for property operations.',
      },
      {
        kind: 'demo',
        label: 'Illustrative workflow — Industrial Engine',
        href: '/projects/#industrial-engine',
        relevance: 'Explore a labelled RFQ-to-quote simulation when your process is quote-driven industrial work.',
      },
    ],
  },
  {
    serviceSlug: 'admin-panel-development',
    note: 'Permissioned internal tools for records, statuses and reporting.',
    items: [
      {
        kind: 'project',
        slug: 'proplytic-property-software',
        relevance: 'Admin-side portfolio and rental operations interface with structured records.',
      },
    ],
    workflowId: 'portal-admin',
  },
  {
    serviceSlug: 'rfq-and-quotation-systems',
    note: 'Structured quoting from intake through PDF and status tracking.',
    items: [
      {
        kind: 'project',
        slug: 'damtech-website',
        relevance: 'Live RFQ intake with admin quotation, line items, PDF generation and status handling.',
      },
      {
        kind: 'demo',
        label: 'Illustrative workflow — Industrial Engine',
        href: '/projects/#industrial-engine',
        relevance: 'Interactive sample of an RFQ-to-quote loop with labelled demo data.',
      },
    ],
    workflowId: 'rfq-quotation',
  },
  {
    serviceSlug: 'customer-and-supplier-portals',
    note: 'Authenticated access to records, documents, requests and statuses.',
    items: [
      {
        kind: 'project',
        slug: 'proplytic-property-software',
        relevance: 'Account-gated application surfaces for portfolio data, documents and operational status.',
      },
    ],
    workflowId: 'portal-admin',
  },
  {
    serviceSlug: 'website-redesign',
    note: 'Redesign proof is architectural: same commercial goals, stronger structure. No separate redesign case study published yet.',
    items: [
      {
        kind: 'project',
        slug: 'damtech-website',
        relevance: 'Example of a search-led rebuild shape: service pages, proof and enquiry paths designed as one system.',
      },
    ],
  },
  {
    serviceSlug: 'website-maintenance-and-support',
    note: 'Maintenance is recurring care, not a portfolio screenshot. No fabricated uptime or ranking claims.',
    items: [
      {
        kind: 'none',
        relevance: 'Ask for the care-plan scope on pricing and process pages — proof is the method and response targets, not a vanity metric.',
      },
    ],
  },
];

export function getServiceProof(serviceSlug: string): ServiceProofEntry | undefined {
  return SERVICE_PROOF_MAP.find((entry) => entry.serviceSlug === serviceSlug);
}
