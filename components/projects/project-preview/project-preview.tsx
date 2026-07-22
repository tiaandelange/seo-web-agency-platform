'use client';

import dynamic from 'next/dynamic';
import type { ProjectPreviewId } from '@/data/project-preview-sources';

const DamtechPreview = dynamic(
  () => import('./damtech/damtech-preview').then((module) => module.DamtechPreview),
  { ssr: false },
);

const ProplyticPreview = dynamic(
  () => import('./proplytic/proplytic-preview').then((module) => module.ProplyticPreview),
  { ssr: false },
);

const WeddingPreview = dynamic(
  () => import('./wedding/wedding-preview').then((module) => module.WeddingPreview),
  { ssr: false },
);

export function ProjectPreview({
  previewId,
  featured,
}: {
  previewId: ProjectPreviewId;
  featured?: boolean;
}) {
  switch (previewId) {
    case 'damtech':
      return <DamtechPreview featured={featured} />;
    case 'proplytic':
      return <ProplyticPreview />;
    case 'wedding':
      return <WeddingPreview />;
    default: {
      const exhaustive: never = previewId;
      return exhaustive;
    }
  }
}
