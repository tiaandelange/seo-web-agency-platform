'use client';

import { useEffect, useState, type RefObject } from 'react';

export type PreviewMode = 'desktop' | 'mobile';

export type PreviewScaleState = {
  scale: number;
  containerWidth: number;
  ready: boolean;
  mode: PreviewMode;
};

/** Switch to mobile canvas below this container width (not viewport width). */
export const PREVIEW_MOBILE_BREAKPOINT = 640;

export function resolvePreviewMode(containerWidth: number): PreviewMode {
  if (containerWidth <= 0) return 'desktop';
  return containerWidth < PREVIEW_MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
}

/**
 * Measures the preview container once, picks desktop vs mobile reference width
 * from container width, then returns a uniform scale:
 *   scale = min(containerWidth / referenceWidth, 1)
 */
export function usePreviewScale(
  containerRef: RefObject<HTMLElement | null>,
  desktopWidth: number,
  mobileWidth: number,
): PreviewScaleState {
  const [state, setState] = useState<PreviewScaleState>({
    scale: 0,
    containerWidth: 0,
    ready: false,
    mode: 'desktop',
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element || desktopWidth <= 0 || mobileWidth <= 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const { width } = element.getBoundingClientRect();
      if (width <= 0) return;
      const mode = resolvePreviewMode(width);
      const referenceWidth = mode === 'mobile' ? mobileWidth : desktopWidth;
      const nextScale = Math.min(width / referenceWidth, 1);
      setState((prev) => {
        if (
          prev.ready &&
          prev.mode === mode &&
          Math.abs(prev.scale - nextScale) < 0.001 &&
          Math.abs(prev.containerWidth - width) < 0.5
        ) {
          return prev;
        }
        return {
          scale: nextScale,
          containerWidth: width,
          ready: true,
          mode,
        };
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    schedule();

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerRef, desktopWidth, mobileWidth]);

  return state;
}
