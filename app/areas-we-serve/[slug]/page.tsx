import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { locationServiceSchema, webPageSchema } from '@/lib/schema';
import { getLiveLocations, getLocation } from '@/data/locations';
import { getService } from '@/data/services';
import { getProject } from '@/data/projects';
import { RelatedContent, type RelatedItem } from '@/components/related-content';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getLiveLocations().map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location || location.status !== 'live') return {};
  return buildMetadata({
    title: location.title,
    seoTitle: location.seoTitle,
    description: location.metaDescription,
    path: `/areas-we-serve/${location.slug}/`,
    index: !location.noindex,
  });
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location || location.status !== 'live') notFound();

  const path = `/areas-we-serve/${location.slug}/`;
  const localServices = location.serviceSlugs.map(getService).filter((s) => s !== undefined);
  const localProjects: RelatedItem[] = location.projectSlugs
    .map(getProject)
    .filter((p) => p !== undefined)
    .map((p) => ({ title: p.heading, href: `/projects/${p.slug}/`, kind: 'Local project' }));

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHeader heading={location.heading} intro={location.intro} updated={location.dateUpdated} />

      <Section heading={`Services available in ${location.city}`}>
        <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
          {localServices.map((service) => (
            <li key={service.slug} className="rounded-card border border-line bg-canvas p-4">
              <Link href={`/services/${service.slug}/`} className="font-medium text-ink hover:underline">
                {service.heading}
              </Link>
              <p className="mt-1 text-sm text-muted">{service.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Areas covered from this page" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          This page deliberately covers {location.city} together with{' '}
          {location.consolidatedAreas.join(', ')} — nearby areas we genuinely serve, consolidated
          honestly rather than cloned into doorway pages.
        </p>
      </Section>

      {localProjects.length > 0 && (
        <Section>
          <RelatedContent heading={`Projects in and around ${location.city}`} items={localProjects} />
        </Section>
      )}

      {location.localFaqs.length > 0 && (
        <Section heading="Local questions">
          <FaqList items={location.localFaqs} />
        </Section>
      )}

      <CtaQuote heading={`Start a project in ${location.city}`} />
      <JsonLd
        data={[
          webPageSchema({
            path,
            title: location.title,
            description: location.metaDescription,
            dateModified: location.dateUpdated,
          }),
          locationServiceSchema(location),
        ]}
      />
    </>
  );
}
