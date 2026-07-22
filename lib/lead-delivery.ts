/**
 * Lead-delivery providers — server-only.
 * Secrets stay in env; never import this from client components.
 *
 * Providers:
 * - webhook: POST JSON to LEAD_WEBHOOK_URL
 * - resend: email via Resend HTTP API (no SDK dependency)
 * - log: development fallback (no external delivery)
 */

export type LeadPayload = {
  formType: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  budgetBand: string;
  timeline: string;
  message: string;
  consent: boolean;
  submittedAt: string;
};

export type LeadDeliveryResult =
  | { ok: true; provider: string; submissionId: string }
  | { ok: false; provider: string; submissionId: string; reason: string };

export function createSubmissionId(): string {
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function providerName(): string {
  const raw = (process.env.LEAD_DELIVERY_PROVIDER || '').trim().toLowerCase();
  if (raw === 'resend' || raw === 'webhook' || raw === 'log') return raw;
  if (process.env.LEAD_WEBHOOK_URL) return 'webhook';
  if (process.env.LEAD_DELIVERY_API_KEY || process.env.RESEND_API_KEY) return 'resend';
  return 'log';
}

function formatLeadText(lead: LeadPayload, submissionId: string): string {
  return [
    `Submission ID: ${submissionId}`,
    `Form: ${lead.formType}`,
    `Submitted: ${lead.submittedAt}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '(none)'}`,
    `Company: ${lead.company || '(none)'}`,
    `Service interest: ${lead.serviceInterest || '(none)'}`,
    `Budget band: ${lead.budgetBand || '(none)'}`,
    `Timeline: ${lead.timeline || '(none)'}`,
    `Consent: ${lead.consent ? 'yes' : 'no'}`,
    '',
    'Message:',
    lead.message,
  ].join('\n');
}

async function deliverWebhook(
  lead: LeadPayload,
  submissionId: string
): Promise<LeadDeliveryResult> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    return { ok: false, provider: 'webhook', submissionId, reason: 'LEAD_WEBHOOK_URL unset' };
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const secret = process.env.LEAD_WEBHOOK_SECRET;
    if (secret) headers.Authorization = `Bearer ${secret}`;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...lead, submissionId }),
    });

    if (!response.ok) {
      return {
        ok: false,
        provider: 'webhook',
        submissionId,
        reason: `HTTP ${response.status}`,
      };
    }
    return { ok: true, provider: 'webhook', submissionId };
  } catch {
    return { ok: false, provider: 'webhook', submissionId, reason: 'network_error' };
  }
}

async function deliverResend(
  lead: LeadPayload,
  submissionId: string
): Promise<LeadDeliveryResult> {
  const apiKey = process.env.LEAD_DELIVERY_API_KEY || process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey) {
    return { ok: false, provider: 'resend', submissionId, reason: 'API key unset' };
  }
  if (!to) {
    return { ok: false, provider: 'resend', submissionId, reason: 'LEAD_TO_EMAIL unset' };
  }
  if (!from) {
    return {
      ok: false,
      provider: 'resend',
      submissionId,
      reason: 'LEAD_FROM_EMAIL unset (verified domain address required)',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `[Koppie Systems] ${lead.formType} enquiry — ${lead.name}`,
        text: formatLeadText(lead, submissionId),
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        provider: 'resend',
        submissionId,
        reason: `HTTP ${response.status}`,
      };
    }
    return { ok: true, provider: 'resend', submissionId };
  } catch {
    return { ok: false, provider: 'resend', submissionId, reason: 'network_error' };
  }
}

/**
 * Deliver a validated lead. Callers must not thank-you-redirect on ok:false.
 * Ops logging must omit message body and contact fields.
 */
export async function deliverLead(lead: LeadPayload): Promise<LeadDeliveryResult> {
  const submissionId = createSubmissionId();
  const provider = providerName();

  if (provider === 'webhook') {
    return deliverWebhook(lead, submissionId);
  }
  if (provider === 'resend') {
    return deliverResend(lead, submissionId);
  }

  // Development / not-yet-configured: log metadata only (no PII).
  console.log('[lead] received (log provider — configure LEAD_DELIVERY_PROVIDER before launch)', {
    submissionId,
    formType: lead.formType,
    serviceInterest: lead.serviceInterest,
    submittedAt: lead.submittedAt,
  });
  return { ok: true, provider: 'log', submissionId };
}
