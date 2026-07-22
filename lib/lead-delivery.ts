/**
 * Lead-delivery providers — server-only.
 * Secrets stay in env; never import this from client components.
 *
 * Providers:
 * - webhook: POST JSON to LEAD_WEBHOOK_URL
 * - resend: contact/proposal use hosted templates; other form types use legacy text
 * - log: development fallback (no external delivery)
 */

import { sendContactSubmission } from '@/lib/email/send-contact-emails';
import { sendProposalSubmission } from '@/lib/email/send-proposal-emails';
import { getEmailDeliveryMode } from '@/lib/email/config';

export type LeadPayload = {
  formType: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl: string;
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
    `Website: ${lead.websiteUrl || '(none)'}`,
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

/**
 * Legacy raw-text Resend path for form types without published hosted templates
 * (e.g. SEO-audit intake). Do not use for contact/proposal when templates exist.
 */
async function deliverResendLegacyText(
  lead: LeadPayload,
  submissionId: string
): Promise<LeadDeliveryResult> {
  const apiKey = process.env.LEAD_DELIVERY_API_KEY || process.env.RESEND_API_KEY;
  const to = process.env.RESEND_INTERNAL_TO_EMAIL || process.env.LEAD_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || process.env.LEAD_FROM_EMAIL;

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
        'Idempotency-Key': `legacy-lead/${submissionId}`.slice(0, 256),
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

async function deliverContactOrProposalTemplates(
  lead: LeadPayload
): Promise<LeadDeliveryResult> {
  if (lead.formType === 'contact') {
    const result = await sendContactSubmission({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
      submittedAt: lead.submittedAt,
    });
    if (!result.ok) {
      return {
        ok: false,
        provider: result.provider,
        submissionId: result.submissionReference,
        reason: result.reason,
      };
    }
    return {
      ok: true,
      provider: result.provider,
      submissionId: result.submissionReference,
    };
  }

  // quote / proposal
  const result = await sendProposalSubmission({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    websiteUrl: lead.websiteUrl,
    serviceInterest: lead.serviceInterest,
    budgetBand: lead.budgetBand,
    timeline: lead.timeline,
    message: lead.message,
    submittedAt: lead.submittedAt,
  });
  if (!result.ok) {
    return {
      ok: false,
      provider: result.provider,
      submissionId: result.submissionReference,
      reason: result.reason,
    };
  }
  return {
    ok: true,
    provider: result.provider,
    submissionId: result.submissionReference,
  };
}

/**
 * Deliver a validated lead. Callers must not thank-you-redirect on ok:false.
 * Ops logging must omit message body and contact fields.
 */
export async function deliverLead(lead: LeadPayload): Promise<LeadDeliveryResult> {
  const submissionId = createSubmissionId();
  const provider = providerName();
  const templatedForm = lead.formType === 'contact' || lead.formType === 'quote';

  if (provider === 'webhook') {
    return deliverWebhook(lead, submissionId);
  }

  if (provider === 'resend') {
    if (templatedForm) {
      // EMAIL_DELIVERY_MODE=log forces local no-send even when provider=resend
      if (getEmailDeliveryMode() === 'log') {
        console.log('[lead] received (EMAIL_DELIVERY_MODE=log)', {
          submissionId,
          formType: lead.formType,
          submittedAt: lead.submittedAt,
        });
        return { ok: true, provider: 'log', submissionId };
      }
      return deliverContactOrProposalTemplates(lead);
    }
    // SEO-audit intake and other form types: legacy text until dedicated templates exist
    return deliverResendLegacyText(lead, submissionId);
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
