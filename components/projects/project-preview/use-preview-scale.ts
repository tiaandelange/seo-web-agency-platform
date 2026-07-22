'use client';

import { useEffect, useState } from 'react';

export function usePreviewScale(
  containerRef: React.RefObject<HTMLElement | null>,
  virtualWidth: number,
): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const { width } = element.getBoundingClientRect();
      if (width <= 0) return;
      const next = width / virtualWidth;
      setScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
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
  }, [containerRef, virtualWidth]);

  return scale;
}
