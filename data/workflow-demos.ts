/**
 * Server-rendered illustrative workflows for RFQ and portal/admin pages.
 * No fake customer names or financial figures.
 */

export type WorkflowStep = {
  id: string;
  title: string;
  detail: string;
};

export type WorkflowDemo = {
  id: 'rfq-quotation' | 'portal-admin';
  heading: string;
  intro: string;
  label: string;
  steps: WorkflowStep[];
};

export const WORKFLOW_DEMOS: Record<WorkflowDemo['id'], WorkflowDemo> = {
  'rfq-quotation': {
    id: 'rfq-quotation',
    heading: 'From enquiry to tracked quotation',
    intro:
      'A typical RFQ-to-quote loop for quote-driven businesses. Stages are illustrative — your modules and statuses are agreed in discovery.',
    label: 'Illustrative workflow',
    steps: [
      {
        id: 'submit',
        title: 'Customer submits RFQ',
        detail: 'Website form or admin capture with structured fields.',
      },
      {
        id: 'review',
        title: 'Admin reviews',
        detail: 'Assign owner, check completeness, flag missing specs.',
      },
      {
        id: 'items',
        title: 'Items and costs added',
        detail: 'Line items, rates, margins and VAT handled in one builder.',
      },
      {
        id: 'generate',
        title: 'Quote generated',
        detail: 'Numbered, versioned quotation ready to send.',
      },
      {
        id: 'send',
        title: 'PDF / email sent',
        detail: 'Branded PDF and email delivery with a clear record.',
      },
      {
        id: 'respond',
        title: 'Customer responds',
        detail: 'Accept, decline or request changes — status updates.',
      },
      {
        id: 'track',
        title: 'Status tracked',
        detail: 'Open pipeline visible; follow-up reminders on live quotes.',
      },
    ],
  },
  'portal-admin': {
    id: 'portal-admin',
    heading: 'How portal and admin access is organised',
    intro:
      'Authenticated systems need clear roles, records and notifications — not a public brochure page with a login bolted on.',
    label: 'Illustrative workflow',
    steps: [
      {
        id: 'auth',
        title: 'Authentication',
        detail: 'Signed-in users only — sessions and password reset handled properly.',
      },
      {
        id: 'roles',
        title: 'Role permissions',
        detail: 'Staff, customers or suppliers see only what their role allows.',
      },
      {
        id: 'records',
        title: 'Records',
        detail: 'Structured entities (jobs, properties, orders) replace spreadsheet tabs.',
      },
      {
        id: 'documents',
        title: 'Documents',
        detail: 'Uploads and downloads attached to the right record.',
      },
      {
        id: 'requests',
        title: 'Requests',
        detail: 'Quotes, support tickets or change requests enter a queue.',
      },
      {
        id: 'statuses',
        title: 'Statuses',
        detail: 'Everyone sees the same stage — no “final_v7” folklore.',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        detail: 'Email or in-app alerts when something needs action.',
      },
      {
        id: 'reporting',
        title: 'Reporting',
        detail: 'Exports and dashboards for the numbers you actually manage by.',
      },
    ],
  },
};
