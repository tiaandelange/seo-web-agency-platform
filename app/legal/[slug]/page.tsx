import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { PlaceholderNotice } from '@/components/placeholder-notice';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { legalDocs, getLegalDoc } from '@/data/legal';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.title,
    description: doc.metaDescription,
    path: `/legal/${doc.slug}/`,
    index: !doc.noindex,
  });
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const path = `/legal/${doc.slug}/`;

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHeader heading={doc.heading} intro={doc.intro} updated={doc.dateUpdated} />
      {doc.placeholder && (
        <PlaceholderNotice>
          This is a structured draft pending review by a qualified person before launch (owner
          input #10). Bracketed sections are placeholders.
        </PlaceholderNotice>
      )}
      <div className="mx-auto max-w-6xl px-4 pb-10">
        <p className="mb-6 text-sm text-muted">Effective date: {doc.effectiveDate}</p>
        {doc.sections.map((section, i) => (
          <section key={i} className="py-4">
            {section.heading && (
              <h2 className="text-section-title-article mb-3 text-ink">{section.heading}</h2>
            )}
            {section.paragraphs.map((paragraph, j) => (
              <p key={j} className="mb-3 max-w-3xl leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <JsonLd data={webPageSchema({ path, title: doc.title, description: doc.metaDescription })} />
    </>
  );
}
