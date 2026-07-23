'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProjectCardData } from '@/data/projects-showcase';
import { previewDesktopSize } from './preview-config';
import { ProjectPreview } from './project-preview';
import { ProjectPreviewErrorBoundary } from './project-preview-error-boundary';

function PreviewSkeleton({ previewId }: { previewId: ProjectCardData['previewId'] }) {
  const desktop = previewDesktopSize(previewId);
  return (
    <div
      className="w-full bg-slate-100"
      style={{ aspectRatio: `${desktop.width} / ${desktop.height}` }}
      aria-hidden
    />
  );
}

export function ProjectPreviewIsland({ project }: { project: ProjectCardData }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = hostRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef}>
      <ProjectPreviewErrorBoundary projectName={project.shortTitle}>
        {shouldLoad ? (
          <ProjectPreview previewId={project.previewId} featured={project.featured} />
        ) : (
          <PreviewSkeleton previewId={project.previewId} />
        )}
      </ProjectPreviewErrorBoundary>
    </div>
  );
}
