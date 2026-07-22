import {
  featuredShowcaseProject,
  secondaryShowcaseProjects,
} from '@/data/projects-showcase';
import { Container } from '@/components/layout/container';
import { FeaturedProjectCard, ProjectShowcaseCard } from './project-showcase-card';

export function SelectedProjects() {
  return (
    <section className="border-b border-line bg-surface">
      <Container width="wide" className="space-y-6 py-14 md:space-y-8 md:py-20">
        <FeaturedProjectCard project={featuredShowcaseProject} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {secondaryShowcaseProjects.map((project) => (
            <ProjectShowcaseCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
