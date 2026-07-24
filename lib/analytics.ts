/**
 * Client-side GA4 helpers — consent-gated, PII-free.
 * Import only from Client Components. Never send form field values here.
 */

import { sendGAEvent } from '@next/third-parties/google';
import {
  ANALYTICS_CONSENT_KEY,
  type AnalyticsConsent,
  type KoppieAnalyticsEvent,
  type ContactMethod,
  type LinkLocation,
} from '@/lib/analytics-types';

export type {
  AnalyticsConsent,
  KoppieAnalyticsEvent,
  LeadFormId,
  ContactMethod,
  LinkLocation,
  AuditRoute,
} from '@/lib/analytics-types';

export { ANALYTICS_CONSENT_KEY } from '@/lib/analytics-types';

type AnalyticsParameter = string | number | boolean;

function measurementId(): string {
  return (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '').trim();
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const raw = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (raw === 'granted' || raw === 'denied') return raw;
  } catch {
    /* private mode / blocked storage */
  }
  return 'unknown';
}

export function writeAnalyticsConsent(value: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

export function canSendAnalytics(): boolean {
  return (
    typeof window !== 'undefined' &&
    measurementId().length > 0 &&
    readAnalyticsConsent() === 'granted'
  );
}

/**
 * Safe no-op when consent is missing, GA is unset, or sendGAEvent throws.
 */
export function trackAnalyticsEvent(
  eventName: KoppieAnalyticsEvent,
  parameters?: Record<string, AnalyticsParameter>,
): void {
  if (!canSendAnalytics()) return;
  try {
    if (parameters) {
      sendGAEvent('event', eventName, parameters);
    } else {
      sendGAEvent('event', eventName);
    }
  } catch {
    /* never break UX for analytics */
  }
}

/** Remove first-party GA cookies after consent is revoked. */
export function clearGaCookies(): void {
  if (typeof document === 'undefined') return;

  const names = document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  const host = window.location.hostname;
  const domains = Array.from(
    new Set([host, `.${host}`, '.koppiesystems.co.za', 'koppiesystems.co.za']),
  );

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
}

export function linkLocationFromPath(pathname: string): Exclude<
  LinkLocation,
  'header' | 'footer'
> {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (path === '/contact/' || path.startsWith('/contact/')) return 'contact_page';
  if (path === '/pricing/' || path.startsWith('/pricing/')) return 'pricing_page';
  if (path.startsWith('/services/')) return 'service_page';
  if (path.startsWith('/seo-audit/')) return 'seo_audit_page';
  if (path === '/request-a-quote/' || path.startsWith('/request-a-quote/')) {
    return 'request_quote_page';
  }
  return 'general_cta';
}

export function contactMethodFromHref(href: string): ContactMethod | null {
  const value = href.trim().toLowerCase();
  if (value.startsWith('tel:')) return 'phone';
  if (value.startsWith('mailto:')) return 'email';
  if (
    value.startsWith('https://wa.me/') ||
    value.startsWith('http://wa.me/') ||
    value.startsWith('https://api.whatsapp.com/') ||
    value.startsWith('http://api.whatsapp.com/')
  ) {
    return 'whatsapp';
  }
  return null;
}
