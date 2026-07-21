'use server';

import { redirect } from 'next/navigation';

/**
 * Lead-form server action — docs/technical/FORM-ARCHITECTURE.md.
 * - Honeypot check (silent discard: bots see success).
 * - Server-side validation regardless of client behaviour.
 * - Delivery: POST to LEAD_WEBHOOK_URL when configured; otherwise server log.
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
      // Silent discard, same as the honeypot.
      redirect('/request-a-quote/thank-you/');
    }
  }

  const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid =
    name.length > 0 && emailShape.test(email) && message.length > 0 && consent;

  if (!valid) {
    redirect(`${returnPath}?error=1`);
  }

  const lead = {
    formType,
    name,
    email,
    phone,
    company,
    serviceInterest,
    budgetBand,
    timeline,
    message,
    consent,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!response.ok) {
        // fetch does not throw on HTTP errors — surface them for ops follow-up.
        console.error('[lead] webhook delivery failed', `HTTP ${response.status}`);
      }
    } catch (error) {
      // Delivery failure must not lose the enquiry silently for the visitor;
      // log for ops follow-up. TODO (owner input #12): add a fallback channel.
      console.error('[lead] webhook delivery failed', error);
    }
  } else {
    // Development / not-yet-configured mode: server-side log only (no PII in
    // production log drains — configure the webhook before launch).
    console.log('[lead] received (no LEAD_WEBHOOK_URL configured)', {
      formType: lead.formType,
      serviceInterest: lead.serviceInterest,
      submittedAt: lead.submittedAt,
    });
  }

  redirect('/request-a-quote/thank-you/');
}
