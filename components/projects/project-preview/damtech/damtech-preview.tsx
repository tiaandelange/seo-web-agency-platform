'use client';

import { ProjectPreviewViewport } from '../project-preview-viewport';
import { usePreviewEntrance } from '../use-preview-entrance';
import { DamtechHomepageFrame } from './damtech-homepage-frame';
import './damtech-preview.css';

export function DamtechPreview({ featured }: { featured?: boolean }) {
  void featured;
  const rootRef = usePreviewEntrance(true);

  return (
    <ProjectPreviewViewport previewId="damtech" active>
      <DamtechHomepageFrame rootRef={rootRef} />
    </ProjectPreviewViewport>
  );
}
