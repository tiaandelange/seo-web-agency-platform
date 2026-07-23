import Link from 'next/link';
import type { Service } from '@/types/content';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Section, BulletList } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { RelatedContent, type RelatedItem } from '@/components/related-content';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { serviceSchema, webPageSchema } from '@/lib/schema';
import { getPackage } from '@/data/packages';
import { getSolution } from '@/data/solutions';
import { relatedProjectItems } from '@/lib/project-proof';
import { getArticle } from '@/data/articles';
import { Container } from '@/components/layout/container';
import { TechLabel } from '@/components/systems/tech-label';
import { Lead } from '@/components/typography/lead';
import { SeoKeywordMatrix } from '@/components/services/seo-keyword-matrix';
import { SeoScanHook } from '@/components/services/seo-scan-hook';
import { SeoAuditSimulation } from '@/components/services/seo-audit-simulation';
import { SeoMethodTimeline } from '@/components/services/seo-method-timeline';
import { SEO_DELIVERABLE_LAYERS } from '@/data/seo-service-proof';
import { ServiceProofBlock } from '@/components/services/service-proof-block';

export function SeoWebsiteServiceView({ service }: { service: Service }) {
  const path = `/services/${service.slug}/`;

  const related: RelatedItem[] = [
    ...service.relatedSolutionSlugs
      .map(getSolution)
      .filter((s) => s !== undefined)
      .map((s) => ({ title: s.heading, href: `/solutions/${s.slug}/`, kind: 'Industry' })),
    ...relatedProjectItems(service.relatedProjectSlugs),
    ...service.relatedArticleSlugs
      .map(getArticle)
      .filter((a) => a !== undefined)
      .map((a) => ({ title: a.heading, href: `/resources/${a.slug}/`, kind: 'Guide' })),
  ];

  const relatedPackages = service.relatedPackageSlugs
    .map(getPackage)
    .filter((p) => p !== undefined);

  return (
    <>
      <Breadcrumbs path={path} />

      <header className="border-b border-line bg-canvas">
        <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TechLabel>SEO service / 02</TechLabel>
            <h1 className="text-page-title mt-3 text-ink">{service.heading}</h1>
            <Lead className="mt-4">{service.intro}</Lead>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex gap-2">
                <span className="text-cta" aria-hidden>
                  →
                </span>
                Architect one page per search intent before design polish.
              </li>
              <li className="flex gap-2">
                <span className="text-cta" aria-hidden>
                  →
                </span>
                Keep the method inspectable — research documents stay your asset.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-a-quote/?type=seo-website&service_interest=seo-website-development"
                className="inline-flex min-h-11 items-center rounded-sm bg-cta px-5 text-sm font-semibold text-cta-contrast hover:opacity-90"
              >
                Book a consultation
              </Link>
              <a
                href="#seo-problems"
                className="inline-flex min-h-11 items-center rounded-sm border border-line px-5 text-sm font-semibold text-ink hover:border-muted"
              >
                See diagnostic themes
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SeoKeywordMatrix />
          </div>
        </Container>
      </header>

      <SeoScanHook />

      <section id="seo-problems" className="border-b border-line" aria-labelledby="seo-problems-heading">
        <Container className="py-14 md:py-20">
          <h2 id="seo-problems-heading" className="text-section-title text-ink">
            Problems this architecture prevents
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Select a common failure mode. Each panel explains why it matters and what we change —
            sample themes, not a live audit of your domain.
          </p>
          <div className="mt-10">
            <SeoAuditSimulation />
          </div>
          <section className="measure-narrow mt-12" aria-labelledby="seo-symptoms">
            <h3 id="seo-symptoms" className="text-card-title text-ink">
              Common symptoms
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-link">
              {service.problems.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </section>

      <ServiceProofBlock serviceSlug={service.slug} />

      <section className="border-b border-line bg-surface" aria-labelledby="seo-method">
        <Container className="py-14 md:py-20">
          <h2 id="seo-method" className="text-section-title text-ink">
            Methodology you can inspect
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Demand research through measurement — each stage leaves an artefact you can review.
          </p>
          <div className="mt-10">
            <SeoMethodTimeline />
          </div>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="seo-included">
        <Container className="py-14 md:py-20">
          <h2 id="seo-included" className="text-section-title text-ink">
            What is included
          </h2>
          <div className="mt-10 space-y-8">
            {SEO_DELIVERABLE_LAYERS.map((layer, i) => (
              <div
                key={layer.id}
                className={`max-w-xl border-l-2 border-link/50 pl-5 ${i % 2 === 1 ? 'sm:ml-12' : ''}`}
              >
                <p className="text-label text-cta">
                  {layer.index} / {layer.heading}
                </p>
                <h3 className="text-card-title mt-1 text-ink">{layer.heading}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-link">
                  {layer.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section heading="What's not included" tone="surface" measure="narrow">
        <p className="mb-4 leading-relaxed text-muted">
          Clear exclusions protect your budget — ranking guarantees are never on the list:
        </p>
        <BulletList items={service.exclusions} />
      </Section>

      <Section heading="Pricing and packages" measure="narrow">
        <p className="leading-relaxed text-muted">
          {relatedPackages.length > 0 ? (
            <>
              This service pairs with{' '}
              {relatedPackages.map((pkg, i) => (
                <span key={pkg.slug}>
                  {i > 0 && ' and '}
                  <Link href={`/website-packages/${pkg.slug}/`} className="text-accent underline">
                    {pkg.heading}
                  </Link>
                </span>
              ))}
              . Indicative ranges sit on our{' '}
            </>
          ) : (
            <>Indicative ranges are on our </>
          )}
          <Link href="/pricing/" className="text-accent underline">
            pricing page
          </Link>
          . Prefer a fixed diagnostic first? See the{' '}
          <Link href="/seo-audit/" className="text-link underline">
            SEO audit packs
          </Link>
          .
        </p>
      </Section>

      {service.faqs.length > 0 && (
        <Section heading="Frequently asked questions" tone="surface" measure="narrow">
          <FaqList items={service.faqs} />
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <RelatedContent heading="Related pages" items={related.slice(0, 5)} />
        </Section>
      )}

      <CtaQuote
        heading="Talk it through with the person who would build it"
        ctaLabel="Book a consultation"
        ctaHref="/request-a-quote/?type=seo-website&service_interest=seo-website-development"
      />
      <JsonLd
        data={[
          webPageSchema({
            path,
            title: service.seoTitle ?? service.title,
            description: service.metaDescription,
            dateModified: service.dateUpdated,
          }),
          serviceSchema(service),
        ]}
      />
    </>
  );
}
