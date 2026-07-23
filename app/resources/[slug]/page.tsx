import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { CardGrid, ArticleCard } from '@/components/cards';
import { RelatedContent, type RelatedItem } from '@/components/related-content';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { articleSchemaFor, webPageSchema } from '@/lib/schema';
import {
  articles,
  getArticle,
  getArticlesByCategory,
  getLiveResourceCategories,
  getResourceCategory,
} from '@/data/articles';
import { getService } from '@/data/services';
import { getApprovedAuthor } from '@/data/authors';
import { ArticleAuthor } from '@/components/article-author';

/**
 * Shared namespace under /resources/: live category listings and articles.
 * Planned categories are not generated (D-18); collisions validator-checked.
 */

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return [
    ...getLiveResourceCategories().map((c) => ({ slug: c.slug })),
    ...articles.filter((a) => a.status === 'live').map((a) => ({ slug: a.slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getResourceCategory(slug);
  if (category && category.status === 'live') {
    return buildMetadata({
      title: category.title,
      description: category.metaDescription,
      path: `/resources/${category.slug}/`,
    });
  }
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    seoTitle: article.seoTitle,
    description: article.metaDescription,
    path: `/resources/${article.slug}/`,
    index: !article.noindex,
    ogType: 'article',
    dateUpdated: article.dateUpdated,
  });
}

export default async function ResourceOrArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const category = getResourceCategory(slug);
  if (category && category.status === 'live') {
    const path = `/resources/${category.slug}/`;
    const items = getArticlesByCategory(category.category);
    return (
      <>
        <Breadcrumbs path={path} />
        <PageHeader heading={category.heading} intro={category.intro} />
        <Section>
          <CardGrid>
            {items.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </CardGrid>
        </Section>
        <CtaQuote />
        <JsonLd
          data={webPageSchema({
            path,
            title: category.title,
            description: category.metaDescription,
            pageType: 'CollectionPage',
          })}
        />
      </>
    );
  }

  const article = getArticle(slug);
  if (!article || article.status !== 'live') notFound();

  const author = getApprovedAuthor(article.authorSlug);
  if (!author) notFound();

  const path = `/resources/${article.slug}/`;
  const supportedServices = article.supportsServiceSlugs.map(getService).filter((s) => s !== undefined);
  const related: RelatedItem[] = [
    ...supportedServices.map((s) => ({ title: s.heading, href: `/services/${s.slug}/`, kind: 'Service' })),
    ...article.relatedArticleSlugs
      .map(getArticle)
      .filter((a) => a !== undefined)
      .map((a) => ({ title: a.heading, href: `/resources/${a.slug}/`, kind: 'Guide' })),
  ];

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHeader heading={article.heading} intro={article.intro} />

      <div className="mx-auto max-w-6xl px-4">
        <ArticleAuthor
          author={author}
          datePublished={article.dateCreated}
          dateUpdated={article.dateUpdated}
        />
      </div>

      <article className="mx-auto max-w-6xl px-4">
        {article.body.map((section, i) => (
          <section key={i} className="py-5">
            {section.heading && (
              <h2 className="text-section-title-article mb-4 text-ink">{section.heading}</h2>
            )}
            {section.paragraphs.map((paragraph, j) => (
              <p key={j} className="mb-4 max-w-3xl leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {article.sources && article.sources.length > 0 && (
          <section className="py-5">
            <h2 className="text-section-title-article mb-4 text-ink">Sources</h2>
            <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted marker:text-accent">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="nofollow noopener" className="text-accent underline">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 max-w-3xl text-sm text-muted">
              Figures accessed {new Date(article.dateUpdated).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}; market prices change — treat ranges as directional.
            </p>
          </section>
        )}

        {supportedServices.length > 0 && (
          <section className="py-5">
            <p className="max-w-3xl rounded-card border border-line bg-surface p-5 leading-relaxed text-muted">
              What to do next: if this guide matched your situation, the practical next step is our{' '}
              <Link href={`/services/${supportedServices[0].slug}/`} className="text-accent underline">
                {supportedServices[0].heading.toLowerCase()}
              </Link>{' '}
              service — or skip straight to a tailored estimate via the quote form below.
            </p>
          </section>
        )}
      </article>

      {related.length > 0 && (
        <Section tone="surface">
          <RelatedContent heading="Related reading and services" items={related.slice(0, 4)} />
        </Section>
      )}

      <CtaQuote heading="Get an answer specific to your business" ctaLabel="Request a tailored estimate" />
      <JsonLd data={articleSchemaFor(article)} />
    </>
  );
}
