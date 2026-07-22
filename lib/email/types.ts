import 'server-only';

export const RESEND_VAR_MAX = 2000;
export const OPTIONAL_NOT_SUPPLIED = 'Not supplied';
export const OPTIONAL_NOT_SPECIFIED = 'Not specified';

export type ContactInternalVariables = {
  CUSTOMER_NAME: string;
  CONTACT_EMAIL: string;
  PHONE: string;
  COMPANY: string;
  MESSAGE: string;
  SUBMITTED_AT: string;
  SUBMISSION_REFERENCE: string;
};

export type ContactConfirmationVariables = {
  CUSTOMER_NAME: string;
  MESSAGE: string;
  SUBMITTED_AT: string;
  SUBMISSION_REFERENCE: string;
};

export type ProposalInternalVariables = {
  CUSTOMER_NAME: string;
  CONTACT_EMAIL: string;
  PHONE: string;
  COMPANY: string;
  WEBSITE_URL: string;
  SERVICE: string;
  BUDGET: string;
  TIMELINE: string;
  PROJECT_DETAILS: string;
  SUBMITTED_AT: string;
  SUBMISSION_REFERENCE: string;
};

export type ProposalConfirmationVariables = {
  CUSTOMER_NAME: string;
  SERVICE: string;
  BUDGET: string;
  TIMELINE: string;
  WEBSITE_URL: string;
  PROJECT_DETAILS: string;
  SUBMITTED_AT: string;
  SUBMISSION_REFERENCE: string;
};

export type TemplateSendResult =
  | { ok: true; emailId: string }
  | { ok: false; reason: string };

export type FormEmailDeliveryResult =
  | {
      ok: true;
      provider: 'resend-templates' | 'log';
      submissionReference: string;
      confirmationSent: boolean;
      confirmationFailed?: boolean;
    }
  | {
      ok: false;
      provider: 'resend-templates' | 'log';
      submissionReference: string;
      reason: string;
    };
