import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();

vi.mock('../lib/email/client', () => ({
  getResendClient: () => ({ emails: { send: sendMock } }),
  resetResendClientForTests: () => undefined,
}));

import { resetResendClientForTests } from '../lib/email/client';
import {
  buildContactInternalVariables,
  buildProposalInternalVariables,
  createSubmissionReference,
  optionalDisplay,
  plainVar,
} from '../lib/email/variables';
import { resolveResendEmailConfig, getEmailDeliveryMode } from '../lib/email/config';
import { idempotencyKey } from '../lib/email/templates';
import { sendContactSubmission } from '../lib/email/send-contact-emails';
import { sendProposalSubmission } from '../lib/email/send-proposal-emails';
import { OPTIONAL_NOT_SUPPLIED, OPTIONAL_NOT_SPECIFIED } from '../lib/email/types';
import { deliverLead } from '../lib/lead-delivery';

function stubFullResendTemplates() {
  vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'resend');
  vi.stubEnv('EMAIL_DELIVERY_MODE', '');
  vi.stubEnv('RESEND_API_KEY', 're_test');
  vi.stubEnv('RESEND_FROM_EMAIL', 'Koppie Systems <leads@example.co.za>');
  vi.stubEnv('RESEND_INTERNAL_TO_EMAIL', 'ops@example.com');
  vi.stubEnv('RESEND_REPLY_TO_EMAIL', 'hello@example.co.za');
  vi.stubEnv('RESEND_TEMPLATE_CONTACT_INTERNAL', 'koppie-contact-internal');
  vi.stubEnv('RESEND_TEMPLATE_CONTACT_CONFIRMATION', 'koppie-contact-confirmation');
  vi.stubEnv('RESEND_TEMPLATE_PROPOSAL_INTERNAL', 'koppie-proposal-internal');
  vi.stubEnv('RESEND_TEMPLATE_PROPOSAL_CONFIRMATION', 'koppie-proposal-confirmation');
}

beforeEach(() => {
  sendMock.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  resetResendClientForTests();
});

describe('Resend template configuration', () => {
  it('fails when API key is missing', () => {
    stubFullResendTemplates();
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('LEAD_DELIVERY_API_KEY', '');

    const resolved = resolveResendEmailConfig();
    expect(resolved.ok).toBe(false);
    if (!resolved.ok) expect(resolved.reason).toMatch(/RESEND_API_KEY/);
  });

  it('fails when a template identifier is missing', () => {
    stubFullResendTemplates();
    vi.stubEnv('RESEND_TEMPLATE_CONTACT_INTERNAL', '');

    const resolved = resolveResendEmailConfig();
    expect(resolved.ok).toBe(false);
    if (!resolved.ok) expect(resolved.reason).toMatch(/CONTACT_INTERNAL/);
  });

  it('fails when sender is missing', () => {
    stubFullResendTemplates();
    vi.stubEnv('RESEND_FROM_EMAIL', '');
    vi.stubEnv('LEAD_FROM_EMAIL', '');

    const resolved = resolveResendEmailConfig();
    expect(resolved.ok).toBe(false);
    if (!resolved.ok) expect(resolved.reason).toMatch(/FROM/);
  });

  it('fails when internal destination is missing', () => {
    stubFullResendTemplates();
    vi.stubEnv('RESEND_INTERNAL_TO_EMAIL', '');
    vi.stubEnv('LEAD_TO_EMAIL', '');

    const resolved = resolveResendEmailConfig();
    expect(resolved.ok).toBe(false);
    if (!resolved.ok) expect(resolved.reason).toMatch(/INTERNAL_TO|LEAD_TO/);
  });

  it('resolves when all required variables are set', () => {
    stubFullResendTemplates();
    const resolved = resolveResendEmailConfig();
    expect(resolved.ok).toBe(true);
  });

  it('honours EMAIL_DELIVERY_MODE=log', () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'resend');
    vi.stubEnv('EMAIL_DELIVERY_MODE', 'log');
    expect(getEmailDeliveryMode()).toBe('log');
  });
});

describe('template variables', () => {
  it('applies optional fallbacks and caps length', () => {
    expect(optionalDisplay('')).toBe(OPTIONAL_NOT_SUPPLIED);
    expect(optionalDisplay('  ')).toBe(OPTIONAL_NOT_SUPPLIED);
    expect(plainVar('a'.repeat(3000)).length).toBe(2000);
  });

  it('builds contact internal variables without EMAIL key', () => {
    const vars = buildContactInternalVariables({
      name: 'Ada',
      email: 'ada@example.com',
      phone: '',
      company: '',
      message: 'Hello',
      submittedAt: '2026-07-22T08:00:00.000Z',
      submissionReference: 'KS-CON-20260722-ABC123',
    });
    expect(vars.PHONE).toBe(OPTIONAL_NOT_SUPPLIED);
    expect(vars.COMPANY).toBe(OPTIONAL_NOT_SUPPLIED);
    expect(vars.CONTACT_EMAIL).toBe('ada@example.com');
    expect(Object.keys(vars)).not.toContain('EMAIL');
  });

  it('builds proposal variables with service labels and website plain text', () => {
    const vars = buildProposalInternalVariables({
      name: 'Ada',
      email: 'ada@example.com',
      websiteUrl: '',
      serviceInterest: 'ecommerce-websites',
      budgetBand: '',
      timeline: '',
      message: 'Need a shop',
      submittedAt: '2026-07-22T08:00:00.000Z',
      submissionReference: 'KS-PRO-20260722-ABC123',
    });
    expect(vars.WEBSITE_URL).toBe(OPTIONAL_NOT_SUPPLIED);
    expect(vars.SERVICE).toBe('Ecommerce website');
    expect(vars.BUDGET).toBe(OPTIONAL_NOT_SPECIFIED);
    expect(vars.TIMELINE).toBe(OPTIONAL_NOT_SPECIFIED);
  });

  it('creates stable-looking submission references', () => {
    expect(createSubmissionReference('contact', new Date('2026-07-22T12:00:00Z'))).toMatch(
      /^KS-CON-20260722-[A-Z0-9]{6}$/
    );
    expect(createSubmissionReference('proposal', new Date('2026-07-22T12:00:00Z'))).toMatch(
      /^KS-PRO-20260722-[A-Z0-9]{6}$/
    );
  });

  it('builds distinct idempotency keys', () => {
    expect(idempotencyKey('contact-internal', 'KS-CON-1')).toBe('contact-internal/KS-CON-1');
    expect(idempotencyKey('contact-confirmation', 'KS-CON-1')).toBe(
      'contact-confirmation/KS-CON-1'
    );
  });
});

describe('contact and proposal template sends', () => {
  it('sends contact internal then confirmation with template payloads', async () => {
    stubFullResendTemplates();
    sendMock
      .mockResolvedValueOnce({ data: { id: 'email_internal' }, error: null })
      .mockResolvedValueOnce({ data: { id: 'email_confirm' }, error: null });

    const result = await sendContactSubmission({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Help please',
      submittedAt: '2026-07-22T08:00:00.000Z',
      submissionReference: 'KS-CON-20260722-TEST01',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.confirmationSent).toBe(true);
      expect(result.submissionReference).toBe('KS-CON-20260722-TEST01');
    }
    expect(sendMock).toHaveBeenCalledTimes(2);

    const internalPayload = sendMock.mock.calls[0][0];
    const internalOpts = sendMock.mock.calls[0][1];
    expect(internalPayload.template.id).toBe('koppie-contact-internal');
    expect(internalPayload.template.variables.CONTACT_EMAIL).toBe('ada@example.com');
    expect(internalPayload.html).toBeUndefined();
    expect(internalPayload.text).toBeUndefined();
    expect(internalPayload.react).toBeUndefined();
    expect(internalPayload.replyTo).toBe('ada@example.com');
    expect(internalOpts.idempotencyKey).toBe('contact-internal/KS-CON-20260722-TEST01');

    const confirmPayload = sendMock.mock.calls[1][0];
    expect(confirmPayload.template.id).toBe('koppie-contact-confirmation');
    expect(confirmPayload.to).toEqual(['ada@example.com']);
    expect(confirmPayload.replyTo).toBe('hello@example.co.za');
  });

  it('blocks confirmation when internal contact send fails', async () => {
    stubFullResendTemplates();
    sendMock.mockResolvedValue({ data: null, error: { name: 'validation_error' } });

    const result = await sendContactSubmission({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Help',
      submissionReference: 'KS-CON-FAIL1',
    });

    expect(result.ok).toBe(false);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('treats confirmation failure as lead received after internal ok', async () => {
    stubFullResendTemplates();
    sendMock
      .mockResolvedValueOnce({ data: { id: 'email_internal' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { name: 'rate_limit_exceeded' } });
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const result = await sendContactSubmission({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Help',
      submissionReference: 'KS-CON-PARTIAL',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.confirmationSent).toBe(false);
      expect(result.confirmationFailed).toBe(true);
    }
  });

  it('sends proposal templates with service mapping and idempotency keys', async () => {
    stubFullResendTemplates();
    sendMock
      .mockResolvedValueOnce({ data: { id: 'p_int' }, error: null })
      .mockResolvedValueOnce({ data: { id: 'p_conf' }, error: null });

    const result = await sendProposalSubmission({
      name: 'Ada',
      email: 'ada@example.com',
      serviceInterest: 'seo-website-development',
      budgetBand: 'R20,000–R40,000',
      timeline: 'Within 1–2 months',
      websiteUrl: '',
      message: 'Build a site',
      submissionReference: 'KS-PRO-20260722-TEST01',
    });

    expect(result.ok).toBe(true);
    const internal = sendMock.mock.calls[0][0];
    expect(internal.template.variables.SERVICE).toBe('SEO-first business website');
    expect(internal.template.variables.WEBSITE_URL).toBe(OPTIONAL_NOT_SUPPLIED);
    expect(internal.html).toBeUndefined();
    expect(sendMock.mock.calls[0][1].idempotencyKey).toBe(
      'proposal-internal/KS-PRO-20260722-TEST01'
    );
    expect(sendMock.mock.calls[1][1].idempotencyKey).toBe(
      'proposal-confirmation/KS-PRO-20260722-TEST01'
    );
  });

  it('does not log PII on contact success', async () => {
    stubFullResendTemplates();
    sendMock
      .mockResolvedValueOnce({ data: { id: 'a' }, error: null })
      .mockResolvedValueOnce({ data: { id: 'b' }, error: null });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    await sendContactSubmission({
      name: 'Secret Name',
      email: 'secret@example.com',
      phone: '+27820000000',
      message: 'Sensitive brief',
      submissionReference: 'KS-CON-LOG1',
    });

    const serialized = JSON.stringify(log.mock.calls);
    expect(serialized).not.toContain('Secret Name');
    expect(serialized).not.toContain('secret@example.com');
    expect(serialized).not.toContain('+27820000000');
    expect(serialized).not.toContain('Sensitive brief');
  });

  it('routes quote leads through proposal templates via deliverLead', async () => {
    stubFullResendTemplates();
    sendMock
      .mockResolvedValueOnce({ data: { id: 'a' }, error: null })
      .mockResolvedValueOnce({ data: { id: 'b' }, error: null });

    const result = await deliverLead({
      formType: 'quote',
      name: 'Ada',
      email: 'ada@example.com',
      phone: '',
      company: '',
      websiteUrl: '',
      serviceInterest: 'ecommerce-websites',
      budgetBand: 'R10,000–R20,000',
      timeline: 'Just researching',
      message: 'Need a store',
      consent: true,
      submittedAt: '2026-07-22T08:00:00.000Z',
    });

    expect(result.ok).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(2);
    expect(sendMock.mock.calls[0][0].template.id).toBe('koppie-proposal-internal');
  });
});
