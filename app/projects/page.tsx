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
  'Selected Koppie Systems work — Damtech and Proplytic — plus the documentation standard used for every published case study.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const publishedDrafts = projects.filter((p) => p.publishPermission && p.status !== 'template');
const templates = projects.filter((p) => p.status === 'template');

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Projects and case studies"
        intro="Authorised projects appear here with honest scope. Pages stay out of search indexes until screenshots and remaining publication gates are complete — no invented results or testimonials."
      />

      <Section heading="How we document every project">
        <p className="max-w-3xl leading-relaxed text-muted">
          A project page records the business problem, objectives and scope, the solution and why
          those choices, the implementation process, the SEO or product work performed, and —
          only where verified — measured results. We do not invent clients, metrics or reviews.
        </p>
      </Section>

      {publishedDrafts.length > 0 && (
        <Section heading="Authorised projects" tone="surface">
          <p className="mb-6 max-w-3xl text-sm text-muted">
            Named with owner permission. Draft screenshots and indexation are still gated until
            imagery clears privacy review.
          </p>
          <CardGrid>
            {publishedDrafts.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </CardGrid>
        </Section>
      )}

      {templates.length > 0 && (
        <Section heading="Case-study structure examples">
          <p className="mb-6 max-w-3xl text-sm text-muted">
            Clearly-marked example templates, not client work. Excluded from search engines by
            design.
          </p>
          <CardGrid>
            {templates.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </CardGrid>
        </Section>
      )}

      <CtaQuote
        heading="Want a documented case study?"
        body="When we publish your project, it is only with written permission — and only with facts we can stand behind."
      />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
