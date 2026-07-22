'use client';

import { previewCanvasHeight, previewDisplayHeightClass } from '../preview-config';
import { ProjectPreviewViewport } from '../project-preview-viewport';
import { usePreviewEntrance } from '../use-preview-entrance';
import { DamtechHomepageFrame } from './damtech-homepage-frame';
import './damtech-preview.css';

export function DamtechPreview({ featured }: { featured?: boolean }) {
  const rootRef = usePreviewEntrance(true);

  return (
    <ProjectPreviewViewport
      previewId="damtech"
      canvasHeight={previewCanvasHeight('damtech', featured)}
      displayHeightClass={previewDisplayHeightClass('damtech', featured)}
      active
    >
      <DamtechHomepageFrame rootRef={rootRef} />
    </ProjectPreviewViewport>
  );
}
