import 'server-only';

import { getEmailDeliveryMode, getSiteEnv, resolveResendEmailConfig } from '@/lib/email/config';
import { sendTemplateEmail } from '@/lib/email/send-template';
import { idempotencyKey } from '@/lib/email/templates';
import type { FormEmailDeliveryResult } from '@/lib/email/types';
import {
  buildProposalConfirmationVariables,
  buildProposalInternalVariables,
  createSubmissionReference,
} from '@/lib/email/variables';

export type ProposalSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  websiteUrl?: string;
  serviceInterest?: string;
  budgetBand?: string;
  timeline?: string;
  message: string;
  submittedAt?: string;
  submissionReference?: string;
};

/**
 * Proposal request: internal notification first, then customer confirmation.
 */
export async function sendProposalSubmission(
  input: ProposalSubmissionInput
): Promise<FormEmailDeliveryResult> {
  const submittedAt = input.submittedAt || new Date().toISOString();
  const submissionReference =
    input.submissionReference || createSubmissionReference('proposal', new Date(submittedAt));

  const mode = getEmailDeliveryMode();
  if (mode === 'log') {
    console.log('[email] proposal submission (log mode — no delivery)', {
      submissionReference,
      formType: 'quote',
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
    console.error('[email] proposal config incomplete', {
      submissionReference,
      reason: resolved.reason,
      siteEnv: getSiteEnv(),
    });
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
    websiteUrl: input.websiteUrl,
    serviceInterest: input.serviceInterest,
    budgetBand: input.budgetBand,
    timeline: input.timeline,
    message: input.message,
    submittedAt,
    submissionReference,
  };

  const internalVars = buildProposalInternalVariables(context);
  const internal = await sendTemplateEmail({
    config,
    to: config.internalToEmail,
    replyTo: input.email,
    templateId: config.templates.proposalInternal,
    variables: internalVars,
    idempotencyKey: idempotencyKey('proposal-internal', submissionReference),
  });

  if (!internal.ok) {
    console.error('[email] proposal internal failed', {
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

  const confirmationVars = buildProposalConfirmationVariables(context);
  const confirmation = await sendTemplateEmail({
    config,
    to: input.email,
    replyTo: config.replyToEmail,
    templateId: config.templates.proposalConfirmation,
    variables: confirmationVars,
    idempotencyKey: idempotencyKey('proposal-confirmation', submissionReference),
  });

  if (!confirmation.ok) {
    console.error('[email] proposal confirmation failed after internal ok', {
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

  console.log('[email] proposal delivery ok', {
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
