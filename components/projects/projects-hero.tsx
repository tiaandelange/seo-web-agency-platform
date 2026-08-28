import { featuredShowcaseProject } from '@/data/projects-showcase';
import { HomeProofFrame } from '@/components/home/home-proof-frame';
import { PageHero } from '@/components/layout/page-hero';

export function ProjectsHero() {
  const { proofMedia } = featuredShowcaseProject;
  const desktop = proofMedia?.desktop;

  return (
    <PageHero
      variant="editorial"
      eyebrow="Selected work / 03"
      title="Websites and systems built around real operations."
      description="Selected lead-generation platforms and custom systems developed for technical, industrial and service businesses. This section shows authorised work only — published when the client grants permission and imagery clears review."
      asideLayout="proof"
      meta={
        <p className="projects-trust-note max-w-xl">
          Projects are published only with client permission. Scope and results are never fabricated.
        </p>
      }
      aside={
        desktop ? (
          <div className="projects-hero-proof">
            <HomeProofFrame
              src={featuredShowcaseProject.desktopSrc}
              alt={featuredShowcaseProject.imageAlt}
              width={desktop.width}
              height={desktop.height}
              caption={desktop.caption}
              focalPosition={featuredShowcaseProject.focalPosition}
              priority
              sizes="(max-width: 1024px) 100vw, min(560px, 42vw)"
            />
          </div>
        ) : undefined
      }
    />
  );
}
