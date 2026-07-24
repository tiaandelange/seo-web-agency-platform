import { showcaseProjects } from '@/data/projects-showcase';
import { PageHero } from '@/components/layout/page-hero';

export function ProjectsHero() {
  return (
    <PageHero
      variant="editorial"
      eyebrow="Selected work / 03"
      title="Websites and systems built around real operations."
      description="Selected lead-generation platforms and custom systems developed for technical, industrial and service businesses. This section shows authorised work only — published when the client grants permission and imagery clears review."
      meta={
        <p className="projects-trust-note max-w-xl">
          Projects are published only with client permission. Scope and results are never fabricated.
        </p>
      }
      aside={
        <>
          <p className="text-label text-muted">Authorised projects</p>
          <p
            className="mt-2 font-heading text-section-title font-bold text-ink"
            aria-label="Two authorised projects"
          >
            {String(showcaseProjects.length).padStart(2, '0')}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Publication and indexation follow owner permission and imagery review.
          </p>
        </>
      }
    />
  );
}
