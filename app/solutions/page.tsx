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
      <Section heading="How these pages are organised">
        <div className="max-w-prose space-y-4 leading-relaxed text-muted">
          <p>
            Industry pages sit beside our service catalogue on purpose. Services describe what we
            build — lead-generation sites, catalogues, ecommerce, portals and custom workflows.
            Solutions describe who that work is for and how buyers in that trade actually search,
            evaluate and buy. A contractor winning municipal tenders does not need the same page map
            as a manufacturer publishing a technical range, or a property business collecting
            qualified rental enquiries.
          </p>
          <p>
            Each solution page covers the commercial problem, the search behaviour we design for,
            the website or system shape that usually fits, and the proof an industry buyer expects to
            see before contacting you. Where a productised package is the right entry point, we
            point to it. Where custom discovery is required, we say so plainly.
          </p>
          <p>
            We only publish industries we can speak about with operating context — not a directory
            of every SIC code. If your sector is adjacent to one listed here, start with the closest
            match or tell us what you do on the proposal form and we will map the fit.
          </p>
        </div>
      </Section>
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
