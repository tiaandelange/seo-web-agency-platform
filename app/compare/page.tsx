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
const TITLE = 'Website Decision Comparisons';
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
      <Section heading="How we write comparisons">
        <div className="max-w-prose space-y-4 leading-relaxed text-muted">
          <p>
            Buyers often arrive with a binary question — custom versus template, WordPress versus
            Next.js, website versus web application, or which maintenance model to buy. These pages
            exist so you can decide with the trade-offs visible, not a sales script that only
            praises one side.
          </p>
          <p>
            Each comparison states when option A is enough, when option B is worth the cost, and
            where our recommendation stops being general advice. We link onward to services and
            packages when a commercial next step is clear, and we leave education pages educational
            so they do not cannibalise transactional intent.
          </p>
          <p>
            If your constraints are unusual — legacy content, a hard go-live date, or an existing
            stack you must keep — bring that into a consultation. The same honesty applies; the
            answer just becomes specific to your constraints.
          </p>
        </div>
      </Section>
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
