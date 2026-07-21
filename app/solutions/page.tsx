import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
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
      <PageHeader
        heading="Industry solutions"
        intro="Generic websites produce generic results. These pages describe how we build for specific kinds of businesses — the search behaviour of their buyers, the proof their industry expects, and the systems their operations grow into."
      />
      <Section>
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
