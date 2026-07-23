'use client';

import { AuthenticHtmlPreview } from '../authentic-html-preview';
import { DAMTECH_HEADER_HTML, DAMTECH_HERO_HTML } from './damtech-source-markup';

/**
 * Authentic Damtech homepage first fold — header and hero markup extracted from
 * local Damtech-Website SSR (commit a96ab2ea). Styles in damtech-preview.css.
 */
export function DamtechHomepageFrame({
  rootRef,
}: {
  rootRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <AuthenticHtmlPreview
      rootRef={rootRef}
      rootClassName="damtechPreviewRoot"
      headerHtml={DAMTECH_HEADER_HTML}
      heroHtml={DAMTECH_HERO_HTML}
    />
  );
}
