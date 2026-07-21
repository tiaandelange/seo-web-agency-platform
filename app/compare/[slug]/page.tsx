import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section, BulletList } from '@/components/section';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { comparisonSchemaFor } from '@/lib/schema';
import { comparisons, getComparison } from '@/data/comparisons';
import { getService } from '@/data/services';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return buildMetadata({
    title: comparison.title,
    seoTitle: comparison.seoTitle,
    description: comparison.metaDescription,
    path: `/compare/${comparison.slug}/`,
    index: !comparison.noindex,
    ogType: 'article',
    dateUpdated: comparison.dateUpdated,
  });
}

export default async function ComparisonPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const path = `/compare/${comparison.slug}/`;
  const supportedServices = comparison.supportsServiceSlugs.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHeader heading={comparison.heading} intro={comparison.intro} updated={comparison.dateUpdated} />

      <Section heading="Side by side">
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-line text-left">
                <th scope="col" className="py-3 pr-4 font-semibold text-ink">
                  Criterion
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold text-ink">
                  {comparison.optionA}
                </th>
                <th scope="col" className="py-3 font-semibold text-ink">
                  {comparison.optionB}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.criteria.map((criterion) => (
                <tr key={criterion.name} className="border-b border-line align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                    {criterion.name}
                  </th>
                  <td className="py-3 pr-4 text-muted">{criterion.aNote}</td>
                  <td className="py-3 text-muted">{criterion.bNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section heading={`When ${comparison.optionA.toLowerCase()} is the right choice`} tone="surface">
        <BulletList items={comparison.whenA} />
      </Section>

      <Section heading={`When ${comparison.optionB.toLowerCase()} is the right choice`}>
        <BulletList items={comparison.whenB} />
      </Section>

      <Section heading="Our verdict" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">{comparison.verdict}</p>
        {supportedServices.length > 0 && (
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Relevant service:{' '}
            {supportedServices.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ' · '}
                <Link href={`/services/${s.slug}/`} className="text-accent underline">
                  {s.heading}
                </Link>
              </span>
            ))}
          </p>
        )}
      </Section>

      <CtaQuote heading="Apply this to your situation" ctaLabel="Book a consultation" />
      <JsonLd data={comparisonSchemaFor(comparison)} />
    </>
  );
}
