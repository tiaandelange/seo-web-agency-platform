import 'server-only';

import { getResendClient } from '@/lib/email/client';
import type { ResendEmailConfig } from '@/lib/email/config';
import type { TemplateSendResult } from '@/lib/email/types';

/**
 * Send a hosted Resend template. Never mixes template with html/text/react.
 */
export async function sendTemplateEmail(args: {
  config: ResendEmailConfig;
  to: string;
  replyTo: string;
  templateId: string;
  variables: Record<string, string>;
  idempotencyKey: string;
}): Promise<TemplateSendResult> {
  const client = getResendClient();
  if (!client) {
    return { ok: false, reason: 'Resend client unavailable' };
  }

  // Defensive: ensure no reserved EMAIL key slips through.
  if (Object.prototype.hasOwnProperty.call(args.variables, 'EMAIL')) {
    return { ok: false, reason: 'reserved_variable_EMAIL' };
  }

  try {
    const { data, error } = await client.emails.send(
      {
        from: args.config.fromEmail,
        to: [args.to],
        replyTo: args.replyTo,
        template: {
          id: args.templateId,
          variables: args.variables,
        },
      },
      { idempotencyKey: args.idempotencyKey }
    );

    if (error) {
      return { ok: false, reason: error.name || 'provider_error' };
    }
    if (!data?.id) {
      return { ok: false, reason: 'missing_email_id' };
    }
    return { ok: true, emailId: data.id };
  } catch {
    return { ok: false, reason: 'network_or_sdk_error' };
  }
}
