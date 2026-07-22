import 'server-only';

import { Resend } from 'resend';

let cached: Resend | null | undefined;

/**
 * Shared Resend client. Returns null when API key is absent.
 * Never export the API key. Never import from client components.
 */
export function getResendClient(): Resend | null {
  if (cached !== undefined) return cached;

  const apiKey = (process.env.RESEND_API_KEY || process.env.LEAD_DELIVERY_API_KEY || '').trim();
  if (!apiKey) {
    cached = null;
    return cached;
  }

  cached = new Resend(apiKey);
  return cached;
}

/** Test helper — clears memoised client between cases. */
export function resetResendClientForTests(): void {
  cached = undefined;
}
