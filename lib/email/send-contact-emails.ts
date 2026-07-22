import 'server-only';

import { getEmailDeliveryMode, getSiteEnv, resolveResendEmailConfig } from '@/lib/email/config';
import { sendTemplateEmail } from '@/lib/email/send-template';
import { idempotencyKey } from '@/lib/email/templates';
import type { FormEmailDeliveryResult } from '@/lib/email/types';
import {
  buildContactConfirmationVariables,
  buildContactInternalVariables,
  createSubmissionReference,
} from '@/lib/email/variables';

export type ContactSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt?: string;
  submissionReference?: string;
};

/**
 * Contact enquiry: internal notification first, then customer confirmation.
 * Confirmation is never sent when the internal send fails.
 */
export async function sendContactSubmission(
  input: ContactSubmissionInput
): Promise<FormEmailDeliveryResult> {
  const submittedAt = input.submittedAt || new Date().toISOString();
  const submissionReference =
    input.submissionReference || createSubmissionReference('contact', new Date(submittedAt));

  const mode = getEmailDeliveryMode();
  if (mode === 'log') {
    console.log('[email] contact submission (log mode — no delivery)', {
      submissionReference,
      formType: 'contact',
      submittedAt,
    });
    return {
      ok: true,
      provider: 'log',
      submissionReference,
      confirmationSent: false,
    };
  }

  const resolved = resolveResendEmailConfig();
  if (!resolved.ok) {
    if (getSiteEnv() === 'production' || mode === 'templates') {
      console.error('[email] contact config incomplete', {
        submissionReference,
        reason: resolved.reason,
      });
      return {
        ok: false,
        provider: 'resend-templates',
        submissionReference,
        reason: resolved.reason,
      };
    }
    return {
      ok: false,
      provider: 'resend-templates',
      submissionReference,
      reason: resolved.reason,
    };
  }

  const { config } = resolved;
  const context = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    message: input.message,
    submittedAt,
    submissionReference,
  };

  const internalVars = buildContactInternalVariables(context);
  const internal = await sendTemplateEmail({
    config,
    to: config.internalToEmail,
    replyTo: input.email,
    templateId: config.templates.contactInternal,
    variables: internalVars,
    idempotencyKey: idempotencyKey('contact-internal', submissionReference),
  });

  if (!internal.ok) {
    console.error('[email] contact internal failed', {
      submissionReference,
      reason: internal.reason,
    });
    return {
      ok: false,
      provider: 'resend-templates',
      submissionReference,
      reason: internal.reason,
    };
  }

  const confirmationVars = buildContactConfirmationVariables(context);
  const confirmation = await sendTemplateEmail({
    config,
    to: input.email,
    replyTo: config.replyToEmail,
    templateId: config.templates.contactConfirmation,
    variables: confirmationVars,
    idempotencyKey: idempotencyKey('contact-confirmation', submissionReference),
  });

  if (!confirmation.ok) {
    console.error('[email] contact confirmation failed after internal ok', {
      submissionReference,
      reason: confirmation.reason,
    });
    return {
      ok: true,
      provider: 'resend-templates',
      submissionReference,
      confirmationSent: false,
      confirmationFailed: true,
    };
  }

  console.log('[email] contact delivery ok', {
    submissionReference,
    confirmationSent: true,
  });

  return {
    ok: true,
    provider: 'resend-templates',
    submissionReference,
    confirmationSent: true,
  };
}
