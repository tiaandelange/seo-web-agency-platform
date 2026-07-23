'use client';

import { useRef, type ReactNode } from 'react';
import type { ProjectPreviewId } from '@/data/project-preview-sources';
import {
  previewDesktopSize,
  previewMobileSize,
  type PreviewCanvasSize,
} from './preview-config';
import { usePreviewScale } from './use-preview-scale';
import styles from './project-preview-viewport.module.css';

/**
 * Fixed-reference preview frame:
 * - Internal canvas keeps source desktop (or mobile) design width/height
 * - Canvas is uniformly scaled to fit the container
 * - Outer wrapper height = referenceHeight × scale
 */
export function ProjectPreviewViewport({
  previewId,
  desktopSize,
  mobileSize,
  active,
  children,
}: {
  previewId: ProjectPreviewId;
  desktopSize?: PreviewCanvasSize;
  mobileSize?: PreviewCanvasSize;
  active: boolean;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktop = desktopSize ?? previewDesktopSize(previewId);
  const mobile = mobileSize ?? previewMobileSize(previewId);

  const { scale, ready, mode } = usePreviewScale(
    containerRef,
    desktop.width,
    mobile.width,
  );

  const reference = mode === 'mobile' ? mobile : desktop;
  const scaledHeight = ready ? reference.height * scale : reference.height * 0.35;

  return (
    <div
      ref={containerRef}
      className={styles.previewViewport}
      style={{ height: scaledHeight }}
      data-project-preview-viewport={previewId}
      data-preview-mode={mode}
      data-preview-ready={ready ? 'true' : 'false'}
      aria-hidden="true"
      {...{ inert: true }}
    >
      <div
        className={styles.previewCanvas}
        style={{
          width: reference.width,
          height: reference.height,
          transform: `scale(${ready ? scale : 0.01})`,
          opacity: ready ? 1 : 0,
        }}
        data-preview-active={active ? 'true' : 'false'}
        data-preview-mode={mode}
      >
        {children}
      </div>
    </div>
  );
}
