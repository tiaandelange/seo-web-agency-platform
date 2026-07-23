import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/section';
import { CardGrid, SolutionCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { itemListSchema, webPageSchema } from '@/lib/schema';
import { solutions } from '@/data/solutions';

const PATH = '/solutions/';
const TITLE = 'Industry Solutions';
const DESCRIPTION =
  'Websites and systems built for how specific industries win work: contractors, engineering, manufacturers, property, professional services and small businesses.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function SolutionsPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHero
        variant="editorial"
        motif
        eyebrow="Industry solutions"
        title="Industry solutions"
        description="Generic websites produce generic results. These pages describe how we build for specific kinds of businesses — the search behaviour of their buyers, the proof their industry expects, and the systems their operations grow into."
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Also browse</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              <Link href="/services/" className="text-link underline">
                Services
              </Link>
            </p>
            <p className="mt-2 text-sm text-muted">Capability pages by website type and system.</p>
          </div>
        }
      />
      <Section heading="Industries we build for" tone="surface">
        <CardGrid>
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </CardGrid>
      </Section>
      <CtaQuote heading="Don't see your industry?" body="The method transfers: search research, intent-mapped pages, honest proof. Tell us what you do and we will tell you what would work." />
      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' }),
          itemListSchema(solutions.map((s) => ({ name: s.heading, path: `/solutions/${s.slug}/` }))),
        ]}
      />
    </>
  );
}
