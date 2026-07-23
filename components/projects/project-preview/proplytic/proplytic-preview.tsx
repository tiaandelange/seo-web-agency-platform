'use client';

import { ProjectPreviewViewport } from '../project-preview-viewport';
import { usePreviewEntrance } from '../use-preview-entrance';
import { ProplyticHomepageFrame } from './proplytic-homepage-frame';
import './proplytic-preview.css';

export function ProplyticPreview() {
  const rootRef = usePreviewEntrance(true);

  return (
    <ProjectPreviewViewport previewId="proplytic" active>
      <ProplyticHomepageFrame rootRef={rootRef} />
    </ProjectPreviewViewport>
  );
}
