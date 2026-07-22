import Link from 'next/link';
import type { ProjectCardData } from '@/data/projects-showcase';
import { ProjectPreviewIsland } from './project-preview/project-preview-island';

function ProjectCardBody({ project }: { project: ProjectCardData }) {
  return (
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-label inline-flex items-center rounded border border-line bg-surface px-2 py-1 text-muted">
          {project.statusLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 border-y border-line py-4">
        <div>
          <p className="text-label text-muted">Type</p>
          <p className="mt-1 text-sm font-medium text-ink">{project.category}</p>
        </div>
        <div>
          <p className="text-label text-muted">Industry</p>
          <p className="mt-1 text-sm font-medium text-ink">{project.industry}</p>
        </div>
      </div>

      <h2 className="text-subsection-title mt-5 leading-snug text-ink">{project.title}</h2>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>

      <ul className="mt-5 space-y-2">
        {project.scope.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-graphite">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cta" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5">
        <Link
          href={project.href}
          className="inline-flex items-center gap-2 font-medium text-link transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-within:translate-x-1 group-focus-within:-translate-y-1"
        >
          {project.ctaLabel}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </Link>
        {project.externalSiteUrl && (
          <a
            href={project.externalSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline-offset-2 hover:text-link hover:underline"
          >
            Live site
          </a>
        )}
      </div>
    </div>
  );
}

const cardShell =
  'project-showcase-card group relative isolate flex min-h-0 flex-col overflow-hidden rounded-card border border-line bg-canvas shadow-card transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-muted hover:shadow-elevated focus-within:border-muted';

export function ProjectShowcaseCard({ project }: { project: ProjectCardData }) {
  return (
    <article className={`${cardShell} lg:min-h-[620px]`}>
      <div className="relative">
        <ProjectPreviewIsland project={project} />
        <div className="project-indicator-line absolute bottom-0 left-0 z-10 h-0.5 w-0 bg-cta transition-[width] duration-500 group-hover:w-full group-focus-within:w-full" />
      </div>
      <ProjectCardBody project={project} />
    </article>
  );
}

export function FeaturedProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <article className={cardShell}>
      <div className="relative">
        <ProjectPreviewIsland project={project} />
        <div className="project-indicator-line absolute bottom-0 left-0 z-10 h-0.5 w-0 bg-cta transition-[width] duration-500 group-hover:w-full group-focus-within:w-full" />
      </div>
      <ProjectCardBody project={project} />
    </article>
  );
}
