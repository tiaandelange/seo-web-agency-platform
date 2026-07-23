import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
import { CardGrid, LinkCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { getLiveLocations, isLocationIndexable } from '@/data/locations';
import { brand } from '@/config/brand';

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
      <PageHero
        variant="editorial"
        motif
        eyebrow="Service areas"
        title="Areas we serve"
        description="We are based in Pretoria and work with businesses throughout South Africa — websites and systems deliver well remotely. Indexable location pages exist only where we can state genuine local operating context without inventing offices."
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Base</p>
            <p className="mt-2 text-sm font-semibold text-ink">{brand.baseCity}</p>
            <p className="mt-2 text-sm text-muted">Serving {brand.country} nationwide</p>
          </div>
        }
      />
      <Section tone="surface">
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
          <div className="mt-10 max-w-3xl rounded-card border border-line bg-canvas p-6 shadow-card">
            <h2 className="text-section-title text-ink">Also served (not a local office)</h2>
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
      </Section>

      <InkBand motif>
        <p className="max-w-3xl text-lg leading-relaxed text-sandstone">
          Elsewhere in South Africa? Everything except in-person meetings works identically — same
          process, same response targets, same ownership terms.
        </p>
      </InkBand>

      <CtaQuote />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
