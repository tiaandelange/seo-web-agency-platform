import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

/**
 * Payment webhook stub for the SEO Audit pack.
 * Provider-agnostic: verifies a shared secret header and logs an order reference
 * without trusting query-string “success” parameters from the browser.
 *
 * Configure SEO_AUDIT_PAYMENT_WEBHOOK_SECRET in the host environment.
 * Durable idempotency storage is a launch blocker before public checkout.
 */

const seenEvents = new Set<string>();

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.SEO_AUDIT_PAYMENT_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'webhook_unconfigured' }, { status: 503 });
  }

  const header =
    request.headers.get('x-seo-audit-webhook-secret') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    '';

  if (!header || !secretsMatch(header, secret)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const eventId = String(body.eventId || body.id || '');
  const orderRef = String(body.orderReference || body.reference || '');
  const status = String(body.status || '');

  if (!eventId || !orderRef) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  if (seenEvents.has(eventId)) {
    console.log('[seo-audit-webhook] duplicate ignored', { eventId });
    return NextResponse.json({ ok: true, duplicate: true });
  }
  seenEvents.add(eventId);

  if (status && status.toLowerCase() !== 'paid' && status.toLowerCase() !== 'succeeded') {
    console.error('[seo-audit-webhook] non-success status', { eventId, status });
    return NextResponse.json({ ok: false, error: 'payment_not_successful' }, { status: 422 });
  }

  console.log('[seo-audit-webhook] payment recorded', {
    eventId,
    orderRef,
    amount: body.amount ?? null,
    currency: body.currency ?? 'ZAR',
  });

  return NextResponse.json({ ok: true });
}
