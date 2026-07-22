import {
  featuredShowcaseProject,
  secondaryShowcaseProjects,
} from '@/data/projects-showcase';
import { FeaturedProjectCard, ProjectShowcaseCard } from './project-showcase-card';

export function SelectedProjects() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-[1240px] space-y-6 px-5 py-16 sm:px-8 lg:space-y-8 lg:px-10 lg:py-24">
        <FeaturedProjectCard project={featuredShowcaseProject} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {secondaryShowcaseProjects.map((project) => (
            <ProjectShowcaseCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
