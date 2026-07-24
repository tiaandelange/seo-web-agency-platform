'use client';

import Link from 'next/link';

type CookieConsentBannerProps = {
  onAccept: () => void;
  onReject: () => void;
};

/**
 * Slim fixed bottom consent bar — visual shell only.
 * Accept / Reject handlers and prior-blocking stay in AnalyticsProvider.
 */
export function CookieConsentBanner({ onAccept, onReject }: CookieConsentBannerProps) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="cookie-consent-bar fixed inset-x-0 bottom-0 z-50 border-t border-line bg-canvas shadow-card"
    >
      <div className="koppie-container flex flex-col gap-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-3.5">
        <p className="min-w-0 flex-1 text-sm leading-snug text-muted">
          We use optional analytics cookies to understand site usage; see our{' '}
          <Link
            href="/legal/cookie-policy/"
            className="text-link underline underline-offset-2 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          >
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm bg-cta px-5 py-2.5 text-sm font-semibold text-cta-contrast hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link sm:flex-none"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onReject}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm border border-line bg-canvas px-5 py-2.5 text-sm font-semibold text-ink hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link sm:flex-none"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
