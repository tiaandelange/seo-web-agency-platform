/**
 * Homepage editorial content — capability maps, workflow and methodology.
 * Keeps page.tsx compositional; no fabricated metrics or client claims.
 */

export type HomeCapability = {
  id: string;
  label: string;
  serviceSlug: string;
  outcome: string;
  useCase: string;
  flow: string[];
  modules: string[];
};

export const HOME_CAPABILITIES: HomeCapability[] = [
  {
    id: 'lead-gen',
    label: 'Lead-generation websites',
    serviceSlug: 'lead-generation-websites',
    outcome: 'Qualified enquiries from search — not just traffic.',
    useCase: 'Contractors, technical services and B2B firms that live on quotes and call-outs.',
    flow: [
      'Search landing pages',
      'Qualification form',
      'CRM / RFQ inbox',
      'Quote follow-up',
    ],
    modules: ['Service & location pages', 'Enquiry tracking', 'Search Console map', 'Conversion events'],
  },
  {
    id: 'catalogue',
    label: 'Product catalogue platforms',
    serviceSlug: 'product-catalogue-websites',
    outcome: 'Your full range online, structured and quotable.',
    useCase: 'Manufacturers and suppliers with technical buyers who need specs before they enquire.',
    flow: ['Category hierarchy', 'Product detail pages', 'RFQ basket', 'Quote request'],
    modules: ['Category SEO', 'Spec sheets', 'RFQ workflow', 'Admin product list'],
  },
  {
    id: 'ecommerce',
    label: 'Ecommerce',
    serviceSlug: 'ecommerce-websites',
    outcome: 'Product pages built to rank with SA payment gateways.',
    useCase: 'Businesses ready to sell online with manageable catalogue size.',
    flow: ['Category pages', 'Product pages', 'Checkout', 'Order notification'],
    modules: ['Product schema', 'Payment gateway', 'Stock display', 'Order admin'],
  },
  {
    id: 'systems',
    label: 'Portal & admin systems',
    serviceSlug: 'rfq-and-quotation-systems',
    outcome: 'Repeatable quoting and operations behind the public site.',
    useCase: 'Teams drowning in spreadsheet quotes and manual follow-up.',
    flow: ['Website enquiry', 'RFQ qualification', 'Admin review', 'Quotation builder', 'Client approval'],
    modules: ['RFQ inbox', 'Quote PDFs', 'Status tracking', 'Customer records'],
  },
  {
    id: 'maintenance',
    label: 'Maintenance & optimisation',
    serviceSlug: 'website-maintenance-and-support',
    outcome: 'The site stays fast, secure and improving after launch.',
    useCase: 'Established sites that need care without a full rebuild.',
    flow: ['Monitoring', 'Updates', 'SEO checks', 'Improvement backlog'],
    modules: ['Backups', 'Security patches', 'Performance checks', 'Content support'],
  },
];

export type WorkflowStep = {
  step: string;
  title: string;
  fragment: string;
  status?: string;
};

export const HOME_WORKFLOW_STEPS: WorkflowStep[] = [
  { step: '01', title: 'Website enquiry', fragment: 'Form capture', status: 'New RFQ' },
  { step: '02', title: 'RFQ qualification', fragment: 'Scope & budget fields', status: 'Reviewing' },
  { step: '03', title: 'Admin review', fragment: 'Customer record', status: 'Assigned' },
  { step: '04', title: 'Quotation builder', fragment: 'Line items & PDF', status: 'Draft quote' },
  { step: '05', title: 'Client approval', fragment: 'Approval link', status: 'Sent' },
];

export type MethodologyStep = {
  number: string;
  label: string;
  title: string;
  body: string;
  deliverable: string;
};

export const HOME_METHODOLOGY: MethodologyStep[] = [
  {
    number: '01',
    label: 'Commercial discovery',
    title: 'Understand the business before the interface',
    body: 'Business model, service geography, project value bands and how buyers actually enquire.',
    deliverable: 'Commercial requirements brief',
  },
  {
    number: '02',
    label: 'Search architecture',
    title: 'Keyword demand becomes page structure',
    body: 'Every commercial intent gets a mapped page — services, locations and industries where justified.',
    deliverable: 'Keyword-to-page system',
  },
  {
    number: '03',
    label: 'Interface & conversion',
    title: 'Hierarchy, trust and enquiry pathways',
    body: 'Page structure, proof placement, forms and RFQ flows designed before development begins.',
    deliverable: 'Approved interactive prototype',
  },
  {
    number: '04',
    label: 'Build & measure',
    title: 'Server-rendered, budgeted, documented',
    body: 'Fast semantic pages, structured data, analytics events and handover you can operate.',
    deliverable: 'Live site + measurement baseline',
  },
];

export const HOME_INDUSTRIES = [
  { slug: 'contractors', label: 'Contractors & trade businesses' },
  { slug: 'engineering-companies', label: 'Engineering & industrial services' },
  { slug: 'manufacturers-and-suppliers', label: 'Manufacturers & suppliers' },
  { slug: 'professional-services', label: 'Professional practices' },
  { slug: 'small-businesses', label: 'Small businesses nationwide' },
];

export const HOME_SECONDARY_SERVICES = [
  { slug: 'business-websites', label: 'Business websites' },
  { slug: 'custom-web-applications', label: 'Custom web applications' },
  { slug: 'admin-panel-development', label: 'Admin panels' },
  { slug: 'customer-and-supplier-portals', label: 'Customer & supplier portals' },
];
