import 'server-only';

import {
  OPTIONAL_NOT_SPECIFIED,
  OPTIONAL_NOT_SUPPLIED,
  RESEND_VAR_MAX,
  type ContactConfirmationVariables,
  type ContactInternalVariables,
  type ProposalConfirmationVariables,
  type ProposalInternalVariables,
} from '@/lib/email/types';
import {
  PROPOSAL_BUDGET_BANDS,
  PROPOSAL_SERVICE_OPTIONS,
  PROPOSAL_TIMELINES,
} from '@/data/proposal-form';

/** Plain-text template value: trim, strip CR, cap length. Never HTML. */
export function plainVar(value: string | undefined | null, max = RESEND_VAR_MAX): string {
  if (value == null) return '';
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, max);
}

export function optionalDisplay(
  value: string | undefined | null,
  fallback: string = OPTIONAL_NOT_SUPPLIED
): string {
  const cleaned = plainVar(value, RESEND_VAR_MAX);
  return cleaned.length > 0 ? cleaned : fallback;
}

/** Format instant in South Africa for human-readable template fields. */
export function formatSubmittedAtSa(isoOrDate: string | Date): string {
  const date = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(date.getTime())) {
    return plainVar(String(isoOrDate));
  }
  return new Intl.DateTimeFormat('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function randomToken(length = 6): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function createSubmissionReference(kind: 'contact' | 'proposal', at = new Date()): string {
  const y = at.getUTCFullYear();
  const m = String(at.getUTCMonth() + 1).padStart(2, '0');
  const d = String(at.getUTCDate()).padStart(2, '0');
  const prefix = kind === 'contact' ? 'KS-CON' : 'KS-PRO';
  return `${prefix}-${y}${m}${d}-${randomToken()}`;
}

export function labelServiceInterest(value: string): string {
  const match = PROPOSAL_SERVICE_OPTIONS.find((o) => o.value === value);
  return match ? match.label : optionalDisplay(value, OPTIONAL_NOT_SPECIFIED);
}

export function labelBudget(value: string): string {
  const cleaned = plainVar(value, 100);
  if (!cleaned) return OPTIONAL_NOT_SPECIFIED;
  if ((PROPOSAL_BUDGET_BANDS as readonly string[]).includes(cleaned)) return cleaned;
  return cleaned;
}

export function labelTimeline(value: string): string {
  const cleaned = plainVar(value, 100);
  if (!cleaned) return OPTIONAL_NOT_SPECIFIED;
  if ((PROPOSAL_TIMELINES as readonly string[]).includes(cleaned)) return cleaned;
  return cleaned;
}

export type ContactVariableInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt: string;
  submissionReference: string;
};

export function buildContactInternalVariables(
  input: ContactVariableInput
): ContactInternalVariables {
  return {
    CUSTOMER_NAME: plainVar(input.name, 200),
    CONTACT_EMAIL: plainVar(input.email, 200),
    PHONE: optionalDisplay(input.phone),
    COMPANY: optionalDisplay(input.company),
    MESSAGE: plainVar(input.message, RESEND_VAR_MAX),
    SUBMITTED_AT: formatSubmittedAtSa(input.submittedAt),
    SUBMISSION_REFERENCE: plainVar(input.submissionReference, 64),
  };
}

export function buildContactConfirmationVariables(
  input: ContactVariableInput
): ContactConfirmationVariables {
  return {
    CUSTOMER_NAME: plainVar(input.name, 200),
    MESSAGE: plainVar(input.message, RESEND_VAR_MAX),
    SUBMITTED_AT: formatSubmittedAtSa(input.submittedAt),
    SUBMISSION_REFERENCE: plainVar(input.submissionReference, 64),
  };
}

export type ProposalVariableInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  websiteUrl?: string;
  serviceInterest?: string;
  budgetBand?: string;
  timeline?: string;
  message: string;
  submittedAt: string;
  submissionReference: string;
};

export function buildProposalInternalVariables(
  input: ProposalVariableInput
): ProposalInternalVariables {
  return {
    CUSTOMER_NAME: plainVar(input.name, 200),
    CONTACT_EMAIL: plainVar(input.email, 200),
    PHONE: optionalDisplay(input.phone),
    COMPANY: optionalDisplay(input.company),
    WEBSITE_URL: optionalDisplay(input.websiteUrl),
    SERVICE: labelServiceInterest(input.serviceInterest || ''),
    BUDGET: labelBudget(input.budgetBand || ''),
    TIMELINE: labelTimeline(input.timeline || ''),
    PROJECT_DETAILS: plainVar(input.message, RESEND_VAR_MAX),
    SUBMITTED_AT: formatSubmittedAtSa(input.submittedAt),
    SUBMISSION_REFERENCE: plainVar(input.submissionReference, 64),
  };
}

export function buildProposalConfirmationVariables(
  input: ProposalVariableInput
): ProposalConfirmationVariables {
  return {
    CUSTOMER_NAME: plainVar(input.name, 200),
    SERVICE: labelServiceInterest(input.serviceInterest || ''),
    BUDGET: labelBudget(input.budgetBand || ''),
    TIMELINE: labelTimeline(input.timeline || ''),
    WEBSITE_URL: optionalDisplay(input.websiteUrl),
    PROJECT_DETAILS: plainVar(input.message, RESEND_VAR_MAX),
    SUBMITTED_AT: formatSubmittedAtSa(input.submittedAt),
    SUBMISSION_REFERENCE: plainVar(input.submissionReference, 64),
  };
}
