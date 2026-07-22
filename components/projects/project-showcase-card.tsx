import Link from 'next/link';
import type { ProjectCardData } from '@/data/projects-showcase';
import { ProjectPreviewIsland } from './project-preview/project-preview-island';

function ProjectCardBody({ project }: { project: ProjectCardData }) {
  return (
  <div className="flex flex-1 flex-col p-6 sm:p-7">
    <div className="mb-4 flex items-center justify-between gap-3">
      <span className="inline-flex items-center rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {project.statusLabel}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-6 border-y border-line py-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Type</p>
        <p className="mt-1 text-sm font-medium text-ink">{project.category}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Industry</p>
        <p className="mt-1 text-sm font-medium text-ink">{project.industry}</p>
      </div>
    </div>

    <h2 className="mt-5 font-heading text-xl font-bold leading-snug text-ink sm:text-2xl">
      {project.title}
    </h2>
    <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{project.summary}</p>

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
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
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

export function ProjectShowcaseCard({ project }: { project: ProjectCardData }) {
  return (
    <article
      className="project-showcase-card group relative isolate flex min-h-0 flex-col overflow-hidden rounded-[18px] border border-slate-200/90 bg-white shadow-[0_14px_42px_rgba(11,31,40,0.06)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_26px_70px_rgba(11,31,40,0.13)] focus-within:border-slate-400 lg:min-h-[620px]"
    >
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
    <article
      className="project-showcase-card group relative isolate flex min-h-0 flex-col overflow-hidden rounded-[18px] border border-slate-200/90 bg-white shadow-[0_14px_42px_rgba(11,31,40,0.06)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_26px_70px_rgba(11,31,40,0.13)] focus-within:border-slate-400"
    >
      <div className="relative">
        <ProjectPreviewIsland project={project} />
        <div className="project-indicator-line absolute bottom-0 left-0 z-10 h-0.5 w-0 bg-cta transition-[width] duration-500 group-hover:w-full group-focus-within:w-full" />
      </div>
      <ProjectCardBody project={project} />
    </article>
  );
}
