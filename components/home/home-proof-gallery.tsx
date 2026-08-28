import type { ProjectCardData } from '@/data/projects-showcase';
import { HomeProofGalleryRow } from '@/components/home/home-proof-gallery-row';

type ProofProject = ProjectCardData & {
  externalSiteUrl: string;
  proofMedia: NonNullable<ProjectCardData['proofMedia']>;
};

export function HomeProofGallery({ projects }: { projects: ProofProject[] }) {
  return (
    <div className="home-proof-gallery mt-10 space-y-14 md:space-y-20" role="list">
      {projects.map((project, index) => (
        <div key={project.slug} role="listitem">
          <HomeProofGalleryRow project={project} priority={index === 0} />
        </div>
      ))}
    </div>
  );
}
