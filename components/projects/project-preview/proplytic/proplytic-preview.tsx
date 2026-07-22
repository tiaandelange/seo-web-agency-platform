'use client';

import { previewCanvasHeight, previewDisplayHeightClass } from '../preview-config';
import { ProjectPreviewViewport } from '../project-preview-viewport';
import { usePreviewEntrance } from '../use-preview-entrance';
import { ProplyticHomepageFrame } from './proplytic-homepage-frame';
import './proplytic-preview.css';

export function ProplyticPreview() {
  const rootRef = usePreviewEntrance(true);

  return (
    <ProjectPreviewViewport
      previewId="proplytic"
      canvasHeight={previewCanvasHeight('proplytic')}
      displayHeightClass={previewDisplayHeightClass('proplytic')}
      active
    >
      <ProplyticHomepageFrame rootRef={rootRef} />
    </ProjectPreviewViewport>
  );
}
