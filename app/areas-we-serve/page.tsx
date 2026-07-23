import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, LinkCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { getLiveLocations, isLocationIndexable } from '@/data/locations';

const PATH = '/areas-we-serve/';
const TITLE = 'Areas We Serve';
const DESCRIPTION =
  'Based in Pretoria and serving businesses throughout South Africa — with honest location pages only for areas we genuinely serve.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function AreasPage() {
  const liveLocations = getLiveLocations();
  const primary = liveLocations.filter(isLocationIndexable);
  const secondary = liveLocations.filter((l) => !isLocationIndexable(l));

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Areas we serve"
        intro="We are based in Pretoria and work with businesses throughout South Africa — websites and systems deliver well remotely. Indexable location pages exist only where we can state genuine local operating context without inventing offices."
      />
      <Section>
        <CardGrid>
          {primary.map((location) => (
            <LinkCard
              key={location.slug}
              title={location.heading}
              description={`${location.city}, ${location.province} — including ${location.consolidatedAreas.slice(0, 3).join(', ')}.`}
              href={`/areas-we-serve/${location.slug}/`}
            />
          ))}
        </CardGrid>
        {secondary.length > 0 && (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-lg font-semibold text-ink">Also served (not a local office)</h2>
            <p className="mt-2 leading-relaxed text-muted">
              These pages remain available for visitors but are not promoted as established local
              offices and are currently excluded from the sitemap.
            </p>
            <ul className="mt-4 space-y-2">
              {secondary.map((location) => (
                <li key={location.slug}>
                  <Link href={`/areas-we-serve/${location.slug}/`} className="text-link underline">
                    {location.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
