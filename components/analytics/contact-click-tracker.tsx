'use client';

import { useEffect } from 'react';
import {
  contactMethodFromHref,
  linkLocationFromPath,
  trackAnalyticsEvent,
  type LinkLocation,
} from '@/lib/analytics';

function resolveLinkLocation(anchor: HTMLAnchorElement): LinkLocation {
  if (anchor.closest('header')) return 'header';
  if (anchor.closest('footer')) return 'footer';
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  return linkLocationFromPath(path);
}

/**
 * One delegated document listener for tel / mailto / WhatsApp clicks.
 * Mount once. Never sends href or destination values.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const method = contactMethodFromHref(href);
      if (!method) return;

      trackAnalyticsEvent('contact_click', {
        contact_method: method,
        link_location: resolveLinkLocation(anchor),
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
