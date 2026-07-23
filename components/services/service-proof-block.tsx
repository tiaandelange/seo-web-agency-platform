import Link from 'next/link';
import { getServiceProof } from '@/data/service-proof-map';
import { getShowcaseBySlug } from '@/data/projects-showcase';
import { getProject } from '@/data/projects';
import { relatedItemKindForProject } from '@/lib/project-proof';
import { ProjectScreenshot } from '@/components/projects/project-screenshot';
import { Section } from '@/components/section';

export function ServiceProofBlock({ serviceSlug }: { serviceSlug: string }) {
  const entry = getServiceProof(serviceSlug);
  if (!entry) return null;

  return (
    <Section heading="Relevant proof" tone="surface">
      <p className="max-w-prose leading-relaxed text-muted">{entry.note}</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {entry.items.map((item, index) => {
          if (item.kind === 'none') {
            return (
              <li
                key={`none-${index}`}
                className="border border-line bg-canvas p-5 text-sm leading-relaxed text-muted"
              >
                {item.relevance}
              </li>
            );
          }

          if (item.kind === 'demo') {
            return (
              <li key={item.href} className="border border-dashed border-line bg-canvas p-5">
                <p className="text-label text-cta">Illustrative workflow demo</p>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  <Link href={item.href} className="text-link hover:underline">
                    {item.label}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.relevance}</p>
              </li>
            );
          }

          const project = getProject(item.slug);
          const showcase = getShowcaseBySlug(item.slug);
          if (!project) return null;

          return (
            <li key={item.slug} className="overflow-hidden border border-line bg-canvas">
              {showcase && (
                <Link href={`/projects/${item.slug}/`} className="block">
                  <ProjectScreenshot
                    desktopSrc={showcase.desktopSrc}
                    mobileSrc={showcase.mobileSrc}
                    alt={showcase.imageAlt}
                    focalPosition={showcase.focalPosition}
                    variant="card"
                  />
                </Link>
              )}
              <div className="p-5">
                <p className="text-label text-muted">{relatedItemKindForProject(project)}</p>
                <h3 className="mt-1 text-base font-semibold text-ink">
                  <Link href={`/projects/${item.slug}/`} className="text-link hover:underline">
                    {project.heading}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.relevance}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
