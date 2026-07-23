import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
import { CardGrid, InfoCard } from '@/components/cards';
import { FaqList } from '@/components/faq-list';
import { RelatedContent, type RelatedItem } from '@/components/related-content';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { solutions, getSolution } from '@/data/solutions';
import { getService } from '@/data/services';
import { relatedProjectItems } from '@/lib/project-proof';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return solutions.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.title,
    seoTitle: solution.seoTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}/`,
    index: !solution.noindex,
  });
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const path = `/solutions/${solution.slug}/`;
  const recommendedServices = solution.recommendedServiceSlugs
    .map(getService)
    .filter((s) => s !== undefined);
  const related: RelatedItem[] = relatedProjectItems(solution.relatedProjectSlugs, {
    fallbackToWork: true,
  });

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHero
        variant="editorial"
        motif
        eyebrow="Industry solution"
        title={solution.heading}
        description={solution.intro}
        meta={
          <p className="text-sm text-muted">
            Updated{' '}
            {new Date(solution.dateUpdated).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        }
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Industry</p>
            <p className="mt-2 text-sm font-semibold text-ink">{solution.industry}</p>
            {recommendedServices[0] && (
              <p className="mt-4 text-sm text-muted">
                Start with{' '}
                <Link href={`/services/${recommendedServices[0].slug}/`} className="text-link underline">
                  {recommendedServices[0].heading}
                </Link>
              </p>
            )}
          </div>
        }
      />

      <Section heading={`What ${solution.industry.toLowerCase()} need from a website`} tone="surface">
        <CardGrid>
          {solution.painPoints.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Our recommended approach">
        <CardGrid>
          {solution.approach.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
        <div className="mt-8 flex flex-wrap gap-3">
          {recommendedServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="rounded-card border border-line bg-canvas px-4 py-2 text-sm font-medium text-ink shadow-card hover:bg-surface"
            >
              {service.heading} →
            </Link>
          ))}
        </div>
      </Section>

      <InkBand heading={solution.industry} motif>
        <p className="max-w-3xl text-lg leading-relaxed text-sandstone">{solution.intro}</p>
      </InkBand>

      {solution.faqs.length > 0 && (
        <Section heading="Questions we hear from this industry" tone="surface">
          <FaqList items={solution.faqs} variant="cards" />
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <RelatedContent heading="Related projects" items={related.slice(0, 4)} />
        </Section>
      )}

      <CtaQuote />
      <JsonLd
        data={webPageSchema({
          path,
          title: solution.title,
          description: solution.metaDescription,
          dateModified: solution.dateUpdated,
        })}
      />
    </>
  );
}
