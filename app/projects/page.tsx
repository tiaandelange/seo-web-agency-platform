import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, ProjectCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { projects } from '@/data/projects';

const PATH = '/projects/';
const TITLE = 'Projects & Case Studies';
const DESCRIPTION =
  'How we document projects: substantive case studies covering the business problem, scope, solution and verified results — publishing as client work completes.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Projects and case studies"
        intro="We are a new studio, so this section is honest about what it is: the documentation standard our projects will be published to, with real case studies appearing here as client work completes and publication permission is granted. No invented clients, no borrowed portfolios."
      />

      <Section heading="How we document every project">
        <p className="max-w-3xl leading-relaxed text-muted">
          A project page here is never a screenshot gallery. Each case study records the business
          problem in the client&apos;s terms, the objectives and scope, the solution and why those
          choices, the implementation process, the SEO work performed, and — only where verified —
          measured results. The example templates below show that structure exactly as future case
          studies will use it.
        </p>
      </Section>

      <Section heading="Case-study structure examples" tone="surface">
        <p className="mb-6 max-w-3xl text-sm text-muted">
          These are clearly-marked example templates, not real projects. They are excluded from
          search engines by design.
        </p>
        <CardGrid>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </CardGrid>
      </Section>

      <CtaQuote
        heading="Want to be an early case study?"
        body="Early clients get senior attention at a new-studio price — and, only with your written permission, a documented case study that markets both of us."
      />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
