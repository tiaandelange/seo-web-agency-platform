import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { faqPageSchema, webPageSchema } from '@/lib/schema';
import { faqs } from '@/data/faqs';
import type { FaqGroup } from '@/types/content';

const PATH = '/faq/';
const TITLE = 'Frequently Asked Questions';
const DESCRIPTION =
  'Straight answers about website costs, project timelines, ownership, SEO expectations and support — the questions every buyer should ask.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const GROUPS: { key: FaqGroup; heading: string }[] = [
  { key: 'cost', heading: 'Cost and payment' },
  { key: 'process', heading: 'Process and timelines' },
  { key: 'technical', heading: 'Technical and SEO' },
  { key: 'support', heading: 'Support and ownership' },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Frequently asked questions"
        intro="The questions buyers actually ask, answered the way we answer them in scoping calls — including the ones other providers dodge."
      />

      {GROUPS.map((group, i) => {
        const items = faqs.filter((f) => f.group === group.key);
        if (items.length === 0) return null;
        return (
          <Section key={group.key} heading={group.heading} tone={i % 2 === 1 ? 'surface' : 'plain'}>
            <FaqList items={items} />
          </Section>
        );
      })}

      <CtaQuote heading="Question not covered?" body="Ask it directly — unanswered questions are exactly what the contact form is for, and good ones end up on this page." />
      {/* FAQPage schema is used ONLY here (D-09) — no rich-result expectation. */}
      <JsonLd data={[webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }), faqPageSchema(faqs, PATH)]} />
    </>
  );
}
