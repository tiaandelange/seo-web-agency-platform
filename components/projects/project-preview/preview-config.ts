'use client';

import type { ProjectPreviewId } from '@/data/project-preview-sources';

export const PREVIEW_CANVAS_WIDTH = 1440;

export const PREVIEW_DISPLAY_HEIGHT: Record<ProjectPreviewId, { featured: string; standard: string }> = {
  damtech: {
    featured: 'h-[32rem] sm:h-[36rem] lg:h-[36rem]',
    standard: 'h-[20rem] sm:h-[22rem] lg:h-[24rem]',
  },
  proplytic: {
    featured: 'h-[24rem] sm:h-[26rem] lg:h-[28rem]',
    standard: 'h-[20rem] sm:h-[22rem] lg:h-[24rem]',
  },
  wedding: {
    featured: 'h-[24rem] sm:h-[26rem] lg:h-[28rem]',
    standard: 'h-[18rem] sm:h-[20rem] lg:h-[22rem]',
  },
};

export function previewCanvasHeight(id: ProjectPreviewId, featured?: boolean): number {
  if (id === 'damtech') return featured ? 980 : 900;
  if (id === 'proplytic') return 920;
  return 900;
}

export function previewDisplayHeightClass(id: ProjectPreviewId, featured?: boolean): string {
  const heights = PREVIEW_DISPLAY_HEIGHT[id];
  return featured ? heights.featured : heights.standard;
}
