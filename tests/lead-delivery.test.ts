import { afterEach, describe, expect, it, vi } from 'vitest';
import { deliverLead, type LeadPayload } from '../lib/lead-delivery';

const baseLead: LeadPayload = {
  formType: 'quote',
  name: 'Test User',
  email: 'test@example.com',
  phone: '+27821234567',
  company: 'Example Co',
  websiteUrl: '',
  serviceInterest: 'business-websites',
  budgetBand: 'R28k–R60k',
  timeline: '1–3 months',
  message: 'Need a lead-generation website.',
  consent: true,
  submittedAt: '2026-07-22T08:00:00.000Z',
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('deliverLead', () => {
  it('logs successfully when no provider is configured', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', '');
    vi.stubEnv('LEAD_WEBHOOK_URL', '');
    vi.stubEnv('LEAD_DELIVERY_API_KEY', '');
    vi.stubEnv('RESEND_API_KEY', '');
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.provider).toBe('log');
      expect(result.submissionId).toMatch(/^lead_/);
    }
    expect(log).toHaveBeenCalled();
  });

  it('posts to the webhook and succeeds on HTTP 200', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'webhook');
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://hooks.example.com/lead');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.provider).toBe('webhook');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://hooks.example.com/lead',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('fails honestly on webhook HTTP errors', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'webhook');
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://hooks.example.com/lead');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 502 }));

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.provider).toBe('webhook');
      expect(result.reason).toContain('502');
    }
  });

  it('fails honestly on webhook network exceptions', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'webhook');
    vi.stubEnv('LEAD_WEBHOOK_URL', 'https://hooks.example.com/lead');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('network_error');
  });

  it('fails when webhook provider is selected but URL is absent', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'webhook');
    vi.stubEnv('LEAD_WEBHOOK_URL', '');

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/LEAD_WEBHOOK_URL/);
  });

  it('sends via Resend when configured', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'resend');
    vi.stubEnv('LEAD_DELIVERY_API_KEY', 're_test');
    vi.stubEnv('LEAD_TO_EMAIL', 'ops@example.com');
    vi.stubEnv('LEAD_FROM_EMAIL', 'leads@koppiesystems.co.za');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.provider).toBe('resend');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer re_test' }),
      })
    );
  });

  it('fails Resend when FROM address is missing', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'resend');
    vi.stubEnv('LEAD_DELIVERY_API_KEY', 're_test');
    vi.stubEnv('LEAD_TO_EMAIL', 'ops@example.com');
    vi.stubEnv('LEAD_FROM_EMAIL', '');

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/LEAD_FROM_EMAIL/);
  });

  it('fails Resend on provider HTTP errors', async () => {
    vi.stubEnv('LEAD_DELIVERY_PROVIDER', 'resend');
    vi.stubEnv('LEAD_DELIVERY_API_KEY', 're_test');
    vi.stubEnv('LEAD_TO_EMAIL', 'ops@example.com');
    vi.stubEnv('LEAD_FROM_EMAIL', 'leads@koppiesystems.co.za');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }));

    const result = await deliverLead(baseLead);

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain('401');
  });
});
