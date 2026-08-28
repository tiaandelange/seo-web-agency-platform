'use client';

import Link from 'next/link';

type CookieConsentBannerProps = {
  onAccept: () => void;
  onReject: () => void;
};

/**
 * Compact bottom-sheet consent (Option B) — non-modal, equal-weight actions.
 * Accept / Reject handlers and prior-blocking stay in AnalyticsProvider.
 */
export function CookieConsentBanner({ onAccept, onReject }: CookieConsentBannerProps) {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="cookie-consent-bar cookie-consent-sheet pointer-events-none fixed inset-x-0 bottom-0 z-50"
    >
      <div className="cookie-consent-sheet__surface pointer-events-auto mx-2 mb-[max(0.5rem,env(safe-area-inset-bottom))] max-h-[min(40vh,12.5rem)] overflow-y-auto rounded-t-card border border-line border-b-0 border-t-cta bg-canvas">
        <div className="koppie-container flex flex-col gap-3 py-3.5">
          <div className="min-w-0 text-sm leading-snug text-muted">
            <p>Optional analytics cookies help us understand site usage.</p>
            <p className="mt-1">
              Read our{' '}
              <Link
                href="/legal/cookie-policy/"
                className="font-medium text-link underline underline-offset-2 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
              >
                Cookie Policy
              </Link>{' '}
              before you choose.
            </p>
          </div>
          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={onAccept}
              className="cookie-consent-action inline-flex min-h-11 flex-1 items-center justify-center rounded-sm border border-line bg-canvas px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={onReject}
              className="cookie-consent-action inline-flex min-h-11 flex-1 items-center justify-center rounded-sm border border-line bg-canvas px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
