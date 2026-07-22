'use client';

import styles from './authentic-html-preview.module.css';
import { previewInter } from './preview-fonts';

export function AuthenticHtmlPreview({
  rootClassName,
  headerHtml,
  heroHtml,
  rootRef,
}: {
  rootClassName: string;
  headerHtml: string;
  heroHtml: string;
  rootRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={rootRef}
      className={`${rootClassName} ${previewInter.variable} ${previewInter.className} ${styles.previewRoot} pointer-events-none select-none`}
      data-project-preview-root
    >
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
      <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
    </div>
  );
}
