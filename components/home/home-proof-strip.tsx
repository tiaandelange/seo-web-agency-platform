import Link from 'next/link';
import { brand } from '@/config/brand';
import { showcaseProjects } from '@/data/projects-showcase';
import { ProjectScreenshot } from '@/components/projects/project-screenshot';
import { HomeSection } from '@/components/home/home-section';

const PROOF_SLUGS = ['damtech-website', 'proplytic-property-software', 'wedding-website-portfolio'] as const;

/**
 * Early homepage proof — real screenshots with truthful labels (not a logo strip).
 * Cards open the live sites so visitors can inspect the real work.
 */
export function HomeProofStrip() {
  const projects = PROOF_SLUGS.map((slug) => showcaseProjects.find((p) => p.slug === slug)).filter(
    (p): p is (typeof showcaseProjects)[number] & { externalSiteUrl: string } =>
      Boolean(p?.externalSiteUrl),
  );

  return (
    <HomeSection
      id="selected-work"
      tone="surface"
      eyebrow="Selected work"
      heading="Proof you can inspect"
      headingLevel="functional"
      intro={`${brand.name} builds public websites as well as the forms, portals, dashboards and operational workflows behind them. Here is what that looks like in practice — labelled honestly.`}
    >
      <ul className="home-proof-strip mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const liveUrl = project.externalSiteUrl;
          const host = liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
          return (
            <li key={project.slug}>
              <article className="flex h-full flex-col overflow-hidden border border-line bg-canvas">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
                >
                  <ProjectScreenshot
                    desktopSrc={project.desktopSrc}
                    mobileSrc={project.mobileSrc}
                    alt={project.imageAlt}
                    focalPosition={project.focalPosition}
                    variant="card"
                  />
                  <div className="border-t border-line p-4">
                    <p className="text-label text-muted">{project.statusLabel}</p>
                    <h3 className="text-card-title mt-1 text-ink group-hover:text-link">
                      {project.shortTitle}
                      <span className="sr-only"> (opens live site in a new tab)</span>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{project.category}</p>
                    <p className="mt-2 text-sm font-medium text-link">{host} ↗</p>
                  </div>
                </a>
              </article>
            </li>
          );
        })}
      </ul>
      <p className="mt-8">
        <Link href="/projects/" className="font-semibold text-link hover:underline">
          View all projects →
        </Link>
      </p>
    </HomeSection>
  );
}
