import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, LinkCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { getLiveLocations } from '@/data/locations';

const PATH = '/areas-we-serve/';
const TITLE = 'Areas We Serve';
const DESCRIPTION =
  'Where we work: based in Pretoria, serving Johannesburg and clients across South Africa — with honest pages only for areas we genuinely serve.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function AreasPage() {
  const liveLocations = getLiveLocations();

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Areas we serve"
        intro="We are based in Pretoria and work with clients across South Africa — websites and systems deliver perfectly well remotely. The pages below exist only for areas where we can say something genuinely local; you will not find a hundred interchangeable town pages here."
      />
      <Section>
        <CardGrid>
          {liveLocations.map((location) => (
            <LinkCard
              key={location.slug}
              title={location.heading}
              description={`${location.city}, ${location.province} — including ${location.consolidatedAreas.slice(0, 3).join(', ')}.`}
              href={`/areas-we-serve/${location.slug}/`}
            />
          ))}
        </CardGrid>
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">
          Elsewhere in South Africa? Everything except in-person meetings works identically — same
          process, same response targets, same ownership terms.
        </p>
      </Section>
      <CtaQuote />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
