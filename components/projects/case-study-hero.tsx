import type { Project } from '@/types/content';
import type { ProjectCardData } from '@/data/projects-showcase';
import { PageHero } from '@/components/layout/page-hero';
import { CaseStudyHeroProof } from '@/components/projects/case-study-hero-proof';

type CaseStudyHeroProps = {
  project: Project;
  showcase: ProjectCardData;
  statusLabel: string;
};

export function CaseStudyHero({ project, showcase, statusLabel }: CaseStudyHeroProps) {
  return (
    <PageHero
      variant="standard"
      title={project.heading}
      description={project.intro}
      aside={<CaseStudyHeroProof showcase={showcase} priority />}
      asideLayout="proof"
      trailingMeta={
        <div className="case-study-hero-meta space-y-4">
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-label text-muted">Project type</dt>
              <dd className="mt-1 font-medium text-ink">{project.projectType}</dd>
            </div>
            <div>
              <dt className="text-label text-muted">Industry</dt>
              <dd className="mt-1 font-medium text-ink">{project.industry}</dd>
            </div>
            <div>
              <dt className="text-label text-muted">Public label</dt>
              <dd className="mt-1 font-medium text-ink">{statusLabel}</dd>
            </div>
            {project.dateUpdated && (
              <div>
                <dt className="text-label text-muted">Updated</dt>
                <dd className="mt-1 font-medium text-ink">
                  <time dateTime={project.dateUpdated}>
                    {new Date(project.dateUpdated).toLocaleDateString('en-ZA', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </time>
                </dd>
              </div>
            )}
          </dl>
          {project.liveUrl && (
            <p className="text-sm text-muted">
              <a
                href={project.liveUrl}
                className="underline-offset-2 hover:text-link hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                <span className="sr-only"> (opens live site in a new tab)</span>
              </a>
              <span className="ml-1">— live client site; case study on this page is primary.</span>
            </p>
          )}
        </div>
      }
    />
  );
}
