import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, ArticleCard, LinkCard } from '@/components/cards';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { articles, getLiveResourceCategories } from '@/data/articles';

const PATH = '/resources/';
const TITLE = 'Guides & Resources';
const DESCRIPTION =
  'Plain-language guides for South African business owners: what websites cost, how to choose a developer, and how search visibility actually works.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function ResourcesPage() {
  const categories = getLiveResourceCategories();
  const liveArticles = articles.filter((a) => a.status === 'live');

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Guides and resources"
        intro="Everything here exists to answer a question buyers actually ask — with dated figures, named sources and no lead-bait fluff. If a guide helps you buy well from someone else, it has done its job."
      />

      <Section heading="How to use this library">
        <div className="max-w-prose space-y-4 leading-relaxed text-muted">
          <p>
            Start with the question you are actually trying to answer. Cost guides help you budget
            and compare quotes without guessing. SEO guides explain what changes visibility for a
            South African business site — and what usually wastes money. Comparison pages belong
            under Compare when you are choosing between approaches rather than learning a topic.
          </p>
          <p>
            Every live guide is written to be useful even if you never hire us: sources are named
            where we rely on market research, pricing language stays indicative until a quote is
            issued, and we avoid fabricated case statistics. When a topic is still planned, the
            category stays empty rather than padded with thin pages.
          </p>
          <p>
            If your situation is specific — catalogue versus ecommerce, redesign versus rebuild, or
            whether an SEO audit is enough — use the related service or package links inside each
            guide, or bring the question to a scoping conversation for a straight answer.
          </p>
        </div>
      </Section>

      <Section heading="Browse by topic">
        <CardGrid>
          {categories.map((category) => (
            <LinkCard
              key={category.slug}
              title={category.heading}
              description={category.intro}
              href={`/resources/${category.slug}/`}
            />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Latest guides" tone="surface">
        <CardGrid>
          {liveArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </CardGrid>
      </Section>

      <CtaQuote
        heading="Prefer answers specific to your business?"
        body="Guides generalise; a scoping conversation doesn't. Tell us your situation and get a straight, tailored answer."
      />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'CollectionPage' })} />
    </>
  );
}
