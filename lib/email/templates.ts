import 'server-only';

export const EMAIL_TEMPLATES = {
  contactInternal: 'RESEND_TEMPLATE_CONTACT_INTERNAL',
  contactConfirmation: 'RESEND_TEMPLATE_CONTACT_CONFIRMATION',
  proposalInternal: 'RESEND_TEMPLATE_PROPOSAL_INTERNAL',
  proposalConfirmation: 'RESEND_TEMPLATE_PROPOSAL_CONFIRMATION',
} as const;

export function idempotencyKey(
  kind:
    | 'contact-internal'
    | 'contact-confirmation'
    | 'proposal-internal'
    | 'proposal-confirmation',
  submissionReference: string
): string {
  return `${kind}/${submissionReference}`.slice(0, 256);
}
