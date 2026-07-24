'use server';

import { deliverLead } from '@/lib/lead-delivery';
import { normalizeWebsiteUrl } from '@/lib/website-url';
import type { LeadFormId } from '@/lib/analytics-types';

/**
 * Lead-form server action — docs/technical/FORM-ARCHITECTURE.md.
 * Returns structured state so the client can fire generate_lead only after
 * confirmed delivery, then navigate to the thank-you page.
 */

const MAX_LEN = 5000;

function clean(value: FormDataEntryValue | null, max = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export type LeadActionState =
  | { status: 'idle' }
  | { status: 'error'; error: 'validation' | 'delivery' }
  | {
      status: 'success';
      track: boolean;
      formId: LeadFormId;
      redirectTo: string;
    };

export const initialLeadActionState: LeadActionState = { status: 'idle' };

export async function submitLead(
  _prev: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const honeypot = clean(formData.get('company_website'));
  const name = clean(formData.get('name'));
  const email = clean(formData.get('email'));
  const phone = clean(formData.get('phone'), 50);
  const company = clean(formData.get('company'));
  const websiteRaw = clean(formData.get('website_url'), 500);
  const serviceInterest = clean(formData.get('service_interest'));
  const budgetBand = clean(formData.get('budget_band'), 100);
  const timeline = clean(formData.get('timeline'), 100);
  const message = clean(formData.get('message'), MAX_LEN);
  const consent = formData.get('consent') === 'on';
  const formType = clean(formData.get('form_type'), 50) || 'quote';

  const formId: LeadFormId = formType === 'contact' ? 'contact' : 'request_quote';
  const thankYou = '/request-a-quote/thank-you/';

  if (honeypot) {
    // Silent discard — pretend success so bots learn nothing. Do not track.
    return { status: 'success', track: false, formId, redirectTo: thankYou };
  }

  const renderedAt = clean(formData.get('rendered_at'), 50);
  if (renderedAt) {
    const renderedMs = Date.parse(renderedAt);
    if (!Number.isNaN(renderedMs) && Date.now() - renderedMs < 3000) {
      return { status: 'success', track: false, formId, redirectTo: thankYou };
    }
  }

  const website = normalizeWebsiteUrl(websiteRaw);
  const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const serviceOk = formType !== 'quote' || serviceInterest.length > 0;
  const valid =
    name.length > 0 &&
    emailShape.test(email) &&
    message.length > 0 &&
    consent &&
    serviceOk &&
    website.ok;

  if (!valid) {
    return { status: 'error', error: 'validation' };
  }

  const lead = {
    formType,
    name,
    email,
    phone,
    company,
    websiteUrl: website.ok ? website.value : '',
    serviceInterest,
    budgetBand,
    timeline,
    message,
    consent,
    submittedAt: new Date().toISOString(),
  };

  const result = await deliverLead(lead);

  if (!result.ok) {
    console.error('[lead] delivery failed', {
      submissionId: result.submissionId,
      provider: result.provider,
      reason: result.reason,
      formType: lead.formType,
      submittedAt: lead.submittedAt,
    });
    return { status: 'error', error: 'delivery' };
  }

  console.log('[lead] delivery ok', {
    submissionId: result.submissionId,
    provider: result.provider,
    formType: lead.formType,
    submittedAt: lead.submittedAt,
  });

  return { status: 'success', track: true, formId, redirectTo: thankYou };
}
