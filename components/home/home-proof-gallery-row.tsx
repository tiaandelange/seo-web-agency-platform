import Link from 'next/link';
import type { ProjectCardData } from '@/data/projects-showcase';
import { HomeProofFrame } from '@/components/home/home-proof-frame';

const CASE_STUDY_CTA = 'Inspect the case study';

type ProofProject = ProjectCardData & {
  externalSiteUrl: string;
  proofMedia: NonNullable<ProjectCardData['proofMedia']>;
};

type HomeProofGalleryRowProps = {
  project: ProofProject;
  /** First row desktop frame only — protects LCP; row two stays lazy. */
  priority?: boolean;
};

export function HomeProofGalleryRow({ project, priority = false }: HomeProofGalleryRowProps) {
  const { desktop, mobile } = project.proofMedia;

  return (
    <article className="home-proof-row border-b border-line pb-14 last:border-b-0 last:pb-0 md:pb-20">
      <div className="home-proof-row__media">
        <HomeProofFrame
          src={project.desktopSrc}
          alt={project.imageAlt}
          width={desktop.width}
          height={desktop.height}
          caption={desktop.caption}
          focalPosition={project.focalPosition}
          priority={priority}
          sizes="(max-width: 768px) 100vw, min(900px, 72vw)"
        />
        <HomeProofFrame
          src={project.mobileSrc}
          alt={project.proofMedia.mobileAlt ?? project.imageAlt}
          width={mobile.width}
          height={mobile.height}
          caption={mobile.caption}
          focalPosition={project.focalPosition}
          sizes="(max-width: 768px) min(320px, 88vw), 280px"
        />
      </div>

      <div className="home-proof-row__copy mt-6 md:mt-8">
        <p className="text-label text-muted">{project.statusLabel}</p>
        <h3 className="text-card-title mt-1 text-ink">{project.shortTitle}</h3>
        <p className="mt-1 text-sm font-medium text-ink">{project.category}</p>
        {project.problem && (
          <div className="mt-4 max-w-prose">
            <p className="text-label text-muted">Problem</p>
            <p className="mt-1 text-sm leading-relaxed text-graphite">{project.problem}</p>
          </div>
        )}
        {project.solution && (
          <div className="mt-3 max-w-prose">
            <p className="text-label text-muted">Solution</p>
            <p className="mt-1 text-sm leading-relaxed text-graphite">{project.solution}</p>
          </div>
        )}
        <div className="mt-6 border-t border-line pt-4">
          <Link
            href={project.href}
            className="inline-flex min-h-11 items-center font-semibold text-link underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          >
            {CASE_STUDY_CTA}
            <span aria-hidden> →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
