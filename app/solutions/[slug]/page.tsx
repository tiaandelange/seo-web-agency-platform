import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section, BulletList } from '@/components/section';
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
      <PageHeader heading={solution.heading} intro={solution.intro} updated={solution.dateUpdated} />

      <Section heading={`What ${solution.industry.toLowerCase()} need from a website`}>
        <BulletList items={solution.painPoints} />
      </Section>

      <Section heading="Our recommended approach" tone="surface">
        <BulletList items={solution.approach} />
        <div className="mt-6 flex flex-wrap gap-3">
          {recommendedServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="rounded-card border border-line bg-canvas px-4 py-2 text-sm font-medium text-ink hover:bg-surface"
            >
              {service.heading} →
            </Link>
          ))}
        </div>
      </Section>

      {solution.faqs.length > 0 && (
        <Section heading="Questions we hear from this industry">
          <FaqList items={solution.faqs} />
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="surface">
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
