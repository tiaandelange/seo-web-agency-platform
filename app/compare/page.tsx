import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, ComparisonCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { itemListSchema, webPageSchema } from '@/lib/schema';
import { comparisons } from '@/data/comparisons';

const PATH = '/compare/';
const TITLE = 'Comparisons';
const DESCRIPTION =
  'Honest comparisons for website decisions: custom vs template, WordPress vs Next.js, website vs web application, and maintenance options — trade-offs included.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ComparePage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Comparisons"
        intro="Decision pages with the trade-offs left in. Each comparison represents both options at their best, tells you the conditions under which each wins, and gives our verdict with its limits stated."
      />
      <Section>
        <CardGrid>
          {comparisons.map((c) => (
            <ComparisonCard key={c.slug} comparison={c} />
          ))}
        </CardGrid>
      </Section>
      <CtaQuote heading="Still weighing it up?" body="Bring the question to a consultation — you'll get the same honesty in person, applied to your specifics." ctaLabel="Book a consultation" />
      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' }),
          itemListSchema(comparisons.map((c) => ({ name: c.heading, path: `/compare/${c.slug}/` }))),
        ]}
      />
    </>
  );
}
