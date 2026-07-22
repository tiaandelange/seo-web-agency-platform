'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProjectCardData } from '@/data/projects-showcase';
import { ProjectPreview } from './project-preview';
import { ProjectPreviewErrorBoundary } from './project-preview-error-boundary';

function PreviewSkeleton({ featured }: { featured?: boolean }) {
  return (
    <div
      className={`bg-slate-100 ${featured ? 'h-[32rem] sm:h-[36rem]' : 'h-[20rem] sm:h-[22rem] lg:h-[24rem]'}`}
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
          <PreviewSkeleton featured={project.featured} />
        )}
      </ProjectPreviewErrorBoundary>
    </div>
  );
}
