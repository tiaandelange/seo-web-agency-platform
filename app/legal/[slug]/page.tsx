import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/layout/container';
import { PlaceholderNotice } from '@/components/placeholder-notice';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { legalDocs, getLegalDoc } from '@/data/legal';

interface Params {
  slug: string;
}

function sectionId(heading: string, index: number): string {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return slug || `section-${index + 1}`;
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
  const toc = doc.sections
    .map((section, i) =>
      section.heading
        ? { id: sectionId(section.heading, i), label: section.heading }
        : null,
    )
    .filter((item): item is { id: string; label: string } => Boolean(item));

  return (
    <>
      <Breadcrumbs path={path} />
      <PageHero
        variant="editorial"
        motif
        eyebrow="Legal"
        title={doc.heading}
        description={doc.intro}
        meta={
          <p className="text-sm text-muted">
            Updated{' '}
            {new Date(doc.dateUpdated).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        }
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Document</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Effective date: {doc.effectiveDate}
            </p>
          </div>
        }
      />
      {doc.placeholder && (
        <PlaceholderNotice>
          This is a structured draft pending review by a qualified person before launch (owner
          input #10). Bracketed sections are placeholders.
        </PlaceholderNotice>
      )}

      <section className="border-b border-line bg-surface">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <nav
                aria-label="On this page"
                className="rounded-card border border-line bg-canvas p-5 shadow-card"
              >
                <p className="text-label text-cta">On this page</p>
                <ol className="mt-4 space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm font-medium text-link hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                  Effective date: {doc.effectiveDate}
                </p>
              </nav>
            </aside>

            <article className="lg:col-span-8">
              {doc.sections.map((section, i) => {
                const id = section.heading ? sectionId(section.heading, i) : undefined;
                return (
                  <section key={i} id={id} className="scroll-mt-28 border-b border-line py-6 last:border-b-0">
                    {section.heading && (
                      <h2 className="text-section-title-article mb-3 text-ink">{section.heading}</h2>
                    )}
                    {section.paragraphs.map((paragraph, j) => (
                      <p key={j} className="mb-3 max-w-3xl leading-relaxed text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                );
              })}
            </article>
          </div>
        </Container>
      </section>

      <CtaQuote
        heading="Questions about how we handle information?"
        body="Use the contact form and we will point you to the right section — or clarify anything that is still provisional pending legal review."
        ctaLabel="Contact us"
        ctaHref="/contact/"
      />
      <JsonLd data={webPageSchema({ path, title: doc.title, description: doc.metaDescription })} />
    </>
  );
}
