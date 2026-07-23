import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
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
      <PageHero
        variant="editorial"
        motif
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="The questions buyers actually ask, answered the way we answer them in scoping calls — including the ones other providers dodge."
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Topics</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {GROUPS.map((group) => (
                <li key={group.key}>{group.heading}</li>
              ))}
            </ul>
          </div>
        }
      />

      {GROUPS.map((group, i) => {
        const items = faqs.filter((f) => f.group === group.key);
        if (items.length === 0) return null;
        return (
          <Section key={group.key} heading={group.heading} tone={i % 2 === 0 ? 'surface' : 'plain'}>
            <FaqList items={items} variant="cards" />
          </Section>
        );
      })}

      <InkBand motif>
        <p className="max-w-2xl text-lg leading-relaxed text-sandstone">
          The questions buyers actually ask, answered the way we answer them in scoping calls —
          including the ones other providers dodge.
        </p>
      </InkBand>

      <CtaQuote heading="Question not covered?" body="Ask it directly — unanswered questions are exactly what the contact form is for, and good ones end up on this page." />
      {/* FAQPage schema is used ONLY here (D-09) — no rich-result expectation. */}
      <JsonLd data={[webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }), faqPageSchema(faqs, PATH)]} />
    </>
  );
}
