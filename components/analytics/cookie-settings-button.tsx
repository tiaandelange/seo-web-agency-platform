'use client';

import { useAnalyticsConsent } from '@/components/analytics/analytics-provider';

/**
 * Footer control to reopen the analytics preference dialog.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { openCookieSettings } = useAnalyticsConsent();

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={
        className ??
        'text-sm text-accent-contrast/70 underline-offset-2 hover:text-accent-contrast hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sandstone'
      }
    >
      Cookie settings
    </button>
  );
}
