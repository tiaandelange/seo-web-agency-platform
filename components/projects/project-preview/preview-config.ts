'use client';

import type { ProjectPreviewId } from '@/data/project-preview-sources';

export type PreviewCanvasSize = {
  width: number;
  height: number;
};

/**
 * Fixed internal reference canvases.
 * Desktop heroes always lay out at ~1440px, then scale uniformly into the card.
 * Mobile heroes lay out at ~390px so text stays readable on stacked cards.
 *
 * Heights are measured from source hero + header crops (header + hero only).
 */
export const PREVIEW_DESKTOP_SIZE: Record<ProjectPreviewId, PreviewCanvasSize> = {
  damtech: { width: 1440, height: 920 },
  proplytic: { width: 1440, height: 880 },
  wedding: { width: 1440, height: 960 },
};

export const PREVIEW_MOBILE_SIZE: Record<ProjectPreviewId, PreviewCanvasSize> = {
  damtech: { width: 390, height: 720 },
  proplytic: { width: 390, height: 780 },
  wedding: { width: 390, height: 700 },
};

/** @deprecated Prefer PREVIEW_DESKTOP_SIZE[id].width */
export const PREVIEW_CANVAS_WIDTH = 1440;

/** @deprecated Prefer viewport-managed height from canvas × scale */
export const PREVIEW_DISPLAY_HEIGHT: Record<
  ProjectPreviewId,
  { featured: string; standard: string }
> = {
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

export function previewDesktopSize(id: ProjectPreviewId): PreviewCanvasSize {
  return PREVIEW_DESKTOP_SIZE[id];
}

export function previewMobileSize(id: ProjectPreviewId): PreviewCanvasSize {
  return PREVIEW_MOBILE_SIZE[id];
}

/** @deprecated */
export function previewCanvasHeight(id: ProjectPreviewId, featured?: boolean): number {
  if (id === 'damtech') return featured ? 980 : PREVIEW_DESKTOP_SIZE.damtech.height;
  return PREVIEW_DESKTOP_SIZE[id].height;
}

/** @deprecated */
export function previewDisplayHeightClass(id: ProjectPreviewId, featured?: boolean): string {
  const heights = PREVIEW_DISPLAY_HEIGHT[id];
  return featured ? heights.featured : heights.standard;
}
