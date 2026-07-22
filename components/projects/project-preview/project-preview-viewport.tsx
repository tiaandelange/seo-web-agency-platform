'use client';

import { useRef, type ReactNode } from 'react';
import { PREVIEW_CANVAS_WIDTH } from './preview-config';
import { usePreviewScale } from './use-preview-scale';
import styles from './project-preview-viewport.module.css';

export function ProjectPreviewViewport({
  previewId,
  canvasHeight,
  displayHeightClass,
  active,
  children,
}: {
  previewId: string;
  canvasHeight: number;
  displayHeightClass: string;
  active: boolean;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = usePreviewScale(containerRef, PREVIEW_CANVAS_WIDTH);

  return (
    <div
      ref={containerRef}
      className={`${styles.previewViewport} ${displayHeightClass}`}
      data-project-preview-viewport={previewId}
      aria-hidden="true"
      inert
    >
      <div className={styles.previewMeasure}>
        <div
          className={styles.previewCanvas}
          style={{
            width: PREVIEW_CANVAS_WIDTH,
            minHeight: canvasHeight,
            transform: `scale(${scale})`,
          }}
          data-preview-active={active ? 'true' : 'false'}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
