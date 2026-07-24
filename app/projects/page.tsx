import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Section } from '@/components/section';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { ProjectsHero } from '@/components/projects/projects-hero';
import { SelectedProjects } from '@/components/projects/selected-projects';
import { IndustrialEngineLazy } from '@/components/projects/industrial-engine-lazy';
import { ProjectsConversionCTA } from '@/components/projects/projects-conversion-cta';

const PATH = '/projects/';
const TITLE = 'Projects and Case Studies';
const DESCRIPTION =
  'Selected websites, portals and custom systems developed by Koppie Systems for technical, industrial and service businesses.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <ProjectsHero />
      <Section heading="What you will find here">
        <div className="max-w-prose space-y-4 leading-relaxed text-muted">
          <p>
            Case studies on this site are published only with owner permission and reviewed
            screenshots. We do not invent client counts, traffic figures, rankings or testimonials.
            When a project is still a template or awaiting imagery clearance, it stays noindex and
            out of the sitemap until the publication checklist is complete.
          </p>
          <p>
            Browse by category for website builds, admin systems and related work, or open an
            individual study for the problem, architecture, delivery notes and links to the live
            service or package that matches that shape of work. If you are evaluating us for a
            similar brief, use the case study to see how we structure search pages, enquiry flows
            and operational tools — then request a proposal with your own constraints attached.
          </p>
          <p>
            New authorised projects appear here as they clear permission and review. Until then,
            the method is visible on this site itself: route map, metadata standards, measurement
            wiring and the process pages that document how we deliver.
          </p>
        </div>
      </Section>
      <SelectedProjects />
      <IndustrialEngineLazy />
      <ProjectsConversionCTA />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
