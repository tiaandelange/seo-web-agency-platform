import 'server-only';

export type SiteEnv = 'production' | 'preview' | 'development';

export type ResendEmailConfig = {
  apiKey: string;
  fromEmail: string;
  internalToEmail: string;
  replyToEmail: string;
  templates: {
    contactInternal: string;
    contactConfirmation: string;
    proposalInternal: string;
    proposalConfirmation: string;
  };
};

function trimEnv(name: string): string {
  return (process.env[name] || '').trim();
}

export function getSiteEnv(): SiteEnv {
  const raw = (process.env.NEXT_PUBLIC_SITE_ENV || '').trim().toLowerCase();
  if (raw === 'production') return 'production';
  if (raw === 'preview') return 'preview';
  return 'development';
}

/**
 * Email delivery mode for contact/proposal:
 * - templates: hosted Resend templates
 * - log: no external send
 */
export function getEmailDeliveryMode(): 'templates' | 'log' {
  const explicit = (process.env.EMAIL_DELIVERY_MODE || '').trim().toLowerCase();
  if (explicit === 'log') return 'log';
  if (explicit === 'templates') return 'templates';

  const provider = (process.env.LEAD_DELIVERY_PROVIDER || '').trim().toLowerCase();
  if (provider === 'log' || provider === 'webhook') return 'log';
  if (provider === 'resend') return 'templates';

  if (trimEnv('RESEND_API_KEY') || trimEnv('LEAD_DELIVERY_API_KEY')) {
    return 'templates';
  }
  return 'log';
}

/**
 * Resolve Resend template config. Returns a safe reason when incomplete.
 * Production callers treat incomplete config as a hard operational failure.
 */
export function resolveResendEmailConfig():
  | { ok: true; config: ResendEmailConfig }
  | { ok: false; reason: string } {
  const apiKey = trimEnv('RESEND_API_KEY') || trimEnv('LEAD_DELIVERY_API_KEY');
  const fromEmail = trimEnv('RESEND_FROM_EMAIL') || trimEnv('LEAD_FROM_EMAIL');
  const internalToEmail = trimEnv('RESEND_INTERNAL_TO_EMAIL') || trimEnv('LEAD_TO_EMAIL');
  const replyToEmail =
    trimEnv('RESEND_REPLY_TO_EMAIL') ||
    fromEmail.replace(/^.*<([^>]+)>.*$/, '$1').trim() ||
    fromEmail;

  const contactInternal = trimEnv('RESEND_TEMPLATE_CONTACT_INTERNAL');
  const contactConfirmation = trimEnv('RESEND_TEMPLATE_CONTACT_CONFIRMATION');
  const proposalInternal = trimEnv('RESEND_TEMPLATE_PROPOSAL_INTERNAL');
  const proposalConfirmation = trimEnv('RESEND_TEMPLATE_PROPOSAL_CONFIRMATION');

  if (!apiKey) return { ok: false, reason: 'RESEND_API_KEY unset' };
  if (!fromEmail) return { ok: false, reason: 'RESEND_FROM_EMAIL (or LEAD_FROM_EMAIL) unset' };
  if (!internalToEmail) {
    return { ok: false, reason: 'RESEND_INTERNAL_TO_EMAIL (or LEAD_TO_EMAIL) unset' };
  }
  if (!replyToEmail) return { ok: false, reason: 'RESEND_REPLY_TO_EMAIL unset' };
  if (!contactInternal) return { ok: false, reason: 'RESEND_TEMPLATE_CONTACT_INTERNAL unset' };
  if (!contactConfirmation) {
    return { ok: false, reason: 'RESEND_TEMPLATE_CONTACT_CONFIRMATION unset' };
  }
  if (!proposalInternal) return { ok: false, reason: 'RESEND_TEMPLATE_PROPOSAL_INTERNAL unset' };
  if (!proposalConfirmation) {
    return { ok: false, reason: 'RESEND_TEMPLATE_PROPOSAL_CONFIRMATION unset' };
  }

  return {
    ok: true,
    config: {
      apiKey,
      fromEmail,
      internalToEmail,
      replyToEmail,
      templates: {
        contactInternal,
        contactConfirmation,
        proposalInternal,
        proposalConfirmation,
      },
    },
  };
}
