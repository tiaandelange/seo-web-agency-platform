'use client';

import { AuthenticHtmlPreview } from '../authentic-html-preview';
import { PROPLYTIC_HEADER_HTML, PROPLYTIC_HERO_HTML } from './proplytic-source-markup';

/**
 * Authentic Proplytic homepage first fold — header and hero markup extracted from
 * https://www.proplytic.co.za/ production SSR output (2026-07-22). Styles in proplytic-preview.css.
 */
export function ProplyticHomepageFrame({
  rootRef,
}: {
  rootRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <AuthenticHtmlPreview
      rootRef={rootRef}
      rootClassName="proplyticPreviewRoot"
      headerHtml={PROPLYTIC_HEADER_HTML}
      heroHtml={PROPLYTIC_HERO_HTML}
    />
  );
}
