'use server';

import { redirect } from 'next/navigation';
import { deliverLead } from '@/lib/lead-delivery';
import { normalizeWebsiteUrl } from '@/lib/website-url';

/**
 * Lead-form server action — docs/technical/FORM-ARCHITECTURE.md.
 * - Honeypot check (silent discard: bots see success).
 * - Minimum-time trap (silent discard).
 * - Server-side validation regardless of client behaviour.
 * - Delivery via lib/lead-delivery.ts (webhook | resend | log).
 * - Delivery failure → error redirect (never a false thank-you).
 * - Never exposes secrets to the client; never sends email from client code.
 */

const MAX_LEN = 5000;

function clean(value: FormDataEntryValue | null, max = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export async function submitLead(formData: FormData): Promise<void> {
  // Honeypot: real users never see or fill this field.
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

  const returnPath = formType === 'contact' ? '/contact/' : '/request-a-quote/';

  if (honeypot) {
    // Silent discard — pretend success so bots learn nothing.
    redirect('/request-a-quote/thank-you/');
  }

  // Minimum-elapsed-time trap (D-12): humans take longer than a few seconds
  // between page render and submit. Skipped when the field is missing or
  // unparseable so no legitimate visitor can ever be falsely rejected.
  const renderedAt = clean(formData.get('rendered_at'), 50);
  if (renderedAt) {
    const renderedMs = Date.parse(renderedAt);
    if (!Number.isNaN(renderedMs) && Date.now() - renderedMs < 3000) {
      redirect('/request-a-quote/thank-you/');
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
    redirect(`${returnPath}?error=1`);
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
    redirect(`${returnPath}?error=1`);
  }

  console.log('[lead] delivery ok', {
    submissionId: result.submissionId,
    provider: result.provider,
    formType: lead.formType,
    submittedAt: lead.submittedAt,
  });

  redirect('/request-a-quote/thank-you/');
}
