import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
import { CardGrid, InfoCard } from '@/components/cards';
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
      <PageHero
        variant="editorial"
        motif
        eyebrow="Comparison"
        title={comparison.heading}
        description={comparison.intro}
        meta={
          <p className="text-sm text-muted">
            Updated{' '}
            {new Date(comparison.dateUpdated).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        }
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Options</p>
            <p className="mt-3 text-sm font-semibold text-ink">{comparison.optionA}</p>
            <p className="mt-1 text-label text-muted">versus</p>
            <p className="mt-1 text-sm font-semibold text-ink">{comparison.optionB}</p>
          </div>
        }
      />

      <Section heading="Side by side" tone="surface">
        <div className="overflow-x-auto rounded-card border border-line bg-canvas p-4 shadow-card sm:p-6">
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

      <Section heading={`When ${comparison.optionA.toLowerCase()} is the right choice`}>
        <CardGrid>
          {comparison.whenA.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
      </Section>

      <Section heading={`When ${comparison.optionB.toLowerCase()} is the right choice`} tone="surface">
        <CardGrid>
          {comparison.whenB.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
      </Section>

      <InkBand heading="Our verdict" motif>
        <p className="max-w-3xl text-lg leading-relaxed text-sandstone">{comparison.verdict}</p>
        {supportedServices.length > 0 && (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-sandstone/90">
            Relevant service:{' '}
            {supportedServices.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && ' · '}
                <Link href={`/services/${s.slug}/`} className="text-cta underline">
                  {s.heading}
                </Link>
              </span>
            ))}
          </p>
        )}
      </InkBand>

      <CtaQuote heading="Apply this to your situation" ctaLabel="Book a consultation" />
      <JsonLd data={comparisonSchemaFor(comparison)} />
    </>
  );
}
