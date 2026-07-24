'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { CookieConsentBanner } from '@/components/analytics/cookie-consent-banner';
import { ContactClickTracker } from '@/components/analytics/contact-click-tracker';
import {
  clearGaCookies,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsent,
} from '@/lib/analytics';

type AnalyticsContextValue = {
  consent: AnalyticsConsent;
  ready: boolean;
  openCookieSettings: () => void;
  acceptAnalytics: () => void;
  rejectAnalytics: () => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function useAnalyticsConsent(): AnalyticsContextValue {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error('useAnalyticsConsent must be used within AnalyticsProvider');
  }
  return ctx;
}

type AnalyticsProviderProps = {
  measurementId: string;
  children: ReactNode;
};

/**
 * Consent-gated GA4 loader. Justification for 'use client': must read localStorage
 * and gate the GoogleAnalytics script after hydration (POPIA prior consent).
 */
export function AnalyticsProvider({ measurementId, children }: AnalyticsProviderProps) {
  const gaId = measurementId.trim();
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<AnalyticsConsent>('unknown');
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setConsent(readAnalyticsConsent());
    setReady(true);
  }, []);

  const acceptAnalytics = useCallback(() => {
    writeAnalyticsConsent('granted');
    setConsent('granted');
    setSettingsOpen(false);
  }, []);

  const rejectAnalytics = useCallback(() => {
    const wasGranted = readAnalyticsConsent() === 'granted' || consent === 'granted';
    writeAnalyticsConsent('denied');
    setConsent('denied');
    setSettingsOpen(false);
    clearGaCookies();
    if (wasGranted) {
      window.location.reload();
    }
  }, [consent]);

  const openCookieSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      ready,
      openCookieSettings,
      acceptAnalytics,
      rejectAnalytics,
    }),
    [consent, ready, openCookieSettings, acceptAnalytics, rejectAnalytics],
  );

  const showBanner = ready && (consent === 'unknown' || settingsOpen);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
      <ContactClickTracker />
      {consent === 'granted' && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {showBanner ? (
        <CookieConsentBanner onAccept={acceptAnalytics} onReject={rejectAnalytics} />
      ) : null}
    </AnalyticsContext.Provider>
  );
}
