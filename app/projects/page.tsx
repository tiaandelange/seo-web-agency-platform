import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
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
      <SelectedProjects />
      <IndustrialEngineLazy />
      <ProjectsConversionCTA />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
