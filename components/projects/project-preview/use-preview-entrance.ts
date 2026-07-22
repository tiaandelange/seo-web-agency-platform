'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';

export function usePreviewEntrance(active: boolean) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !active) return;

    root.classList.add('is-preview-active');
    if (reducedMotion) {
      root.classList.add('is-preview-complete');
      return;
    }

    root.classList.add('is-loaded');
    root.classList.add('is-preview-complete');

    const splitTargets = root.querySelectorAll('[data-split]');
    splitTargets.forEach((element) => {
      if (element.querySelector('.split__inner')) return;
      const text = element.textContent ?? '';
      element.textContent = '';
      const inner = document.createElement('span');
      inner.className = 'split__inner';
      inner.textContent = text.trim();
      element.appendChild(inner);
    });
  }, [active, reducedMotion]);

  return rootRef;
}
