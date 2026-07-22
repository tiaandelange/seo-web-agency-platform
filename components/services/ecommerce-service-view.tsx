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
import { getProject } from '@/data/projects';
import { getArticle } from '@/data/articles';
import { Container } from '@/components/layout/container';
import { TechLabel } from '@/components/systems/tech-label';
import { Lead } from '@/components/typography/lead';
import { EcommerceHeroDemo } from '@/components/services/ecommerce-hero-demo';
import { CommerceFrictionJourney } from '@/components/services/commerce-friction-journey';
import { EcommerceReadinessHook } from '@/components/services/ecommerce-readiness-hook';
import { COMMERCE_LAYERS } from '@/data/ecommerce-service-proof';

export function EcommerceServiceView({ service }: { service: Service }) {
  const path = `/services/${service.slug}/`;

  const related: RelatedItem[] = [
    ...service.relatedSolutionSlugs
      .map(getSolution)
      .filter((s) => s !== undefined)
      .map((s) => ({ title: s.heading, href: `/solutions/${s.slug}/`, kind: 'Industry' })),
    ...service.relatedProjectSlugs
      .map(getProject)
      .filter((p) => p !== undefined)
      .map((p) => ({ title: p.heading, href: `/projects/${p.slug}/`, kind: 'Project' })),
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
            <TechLabel>Commerce service / 03</TechLabel>
            <h1 className="text-page-title mt-3 text-ink">{service.heading}</h1>
            <Lead className="mt-4">{service.intro}</Lead>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex gap-2">
                <span className="text-cta" aria-hidden>
                  →
                </span>
                Product pages structured to be found — not only to look like a store.
              </li>
              <li className="flex gap-2">
                <span className="text-cta" aria-hidden>
                  →
                </span>
                Checkout and fulfilment designed for completion on mobile.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-a-quote/?type=ecommerce&service_interest=ecommerce-websites"
                className="inline-flex min-h-11 items-center rounded-sm bg-cta px-5 text-sm font-semibold text-cta-contrast hover:opacity-90"
              >
                Request a quote
              </Link>
              <a
                href="#commerce-readiness"
                className="inline-flex min-h-11 items-center rounded-sm border border-line px-5 text-sm font-semibold text-ink hover:border-muted"
              >
                Check readiness
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <EcommerceHeroDemo />
          </div>
        </Container>
      </header>

      <section className="border-b border-line" aria-labelledby="commerce-friction-heading">
        <Container className="py-14 md:py-20">
          <h2 id="commerce-friction-heading" className="text-section-title text-ink">
            Where commercial value is lost
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Follow the path from discovery to confirmation. Each stage shows a common friction
            point — sample themes, not your live analytics.
          </p>
          <div className="mt-10">
            <CommerceFrictionJourney />
          </div>
          <section className="measure-narrow mt-12" aria-labelledby="ecom-symptoms">
            <h3 id="ecom-symptoms" className="text-subsection-title text-ink">
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

      <section
        id="commerce-readiness"
        className="border-b border-line bg-surface"
        aria-labelledby="commerce-readiness-heading"
      >
        <Container className="py-14 md:py-20">
          <h2 id="commerce-readiness-heading" className="text-section-title text-ink">
            Classify the build shape
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Not every catalogue needs a full checkout. This check helps separate standard commerce
            from quotation or B2B account paths.
          </p>
          <div className="mt-8 max-w-3xl">
            <EcommerceReadinessHook />
          </div>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="commerce-layers">
        <Container className="py-14 md:py-20">
          <h2 id="commerce-layers" className="text-section-title text-ink">
            What is included — system layers
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Deliverables grouped by storefront, transaction, operations and growth — not one flat
            checklist.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {COMMERCE_LAYERS.map((layer, i) => (
              <div
                key={layer.id}
                className={`border-l-2 border-link/50 pl-5 ${i % 2 === 1 ? 'lg:mt-8' : ''}`}
              >
                <p className="text-label text-cta">
                  {layer.index} / {layer.heading}
                </p>
                <h3 className="text-subsection-title mt-1 text-ink">{layer.heading}</h3>
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
          Clear exclusions protect scope — marketplace feeds and large-range content are quoted
          separately:
        </p>
        <BulletList items={service.exclusions} />
      </Section>

      <Section heading="Pricing and packages" measure="narrow">
        <p className="leading-relaxed text-muted">
          {relatedPackages.length > 0 ? (
            <>
              This service is available as{' '}
              {relatedPackages.map((pkg, i) => (
                <span key={pkg.slug}>
                  {i > 0 && ' and '}
                  <Link href={`/website-packages/${pkg.slug}/`} className="text-accent underline">
                    {pkg.heading}
                  </Link>
                </span>
              ))}
              . Indicative ranges on our{' '}
            </>
          ) : (
            <>Indicative ranges on our </>
          )}
          <Link href="/pricing/" className="text-accent underline">
            pricing page
          </Link>
          . Every project gets a fixed, itemised quote after scoping.
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

      <Section heading="Prefer a fixed-price SEO audit first?" measure="narrow">
        <p className="leading-relaxed text-muted">
          Larger, ecommerce or catalogue sites: the{' '}
          <Link href="/seo-audit/advanced/" className="text-link underline">
            Advanced SEO Audit
          </Link>{' '}
          (R5,999) with architecture review and a 90-day roadmap. Smaller sites: the{' '}
          <Link href="/seo-audit/" className="text-link underline">
            SEO Audit &amp; Priority Fix Pack
          </Link>{' '}
          (R1,999).
        </p>
      </Section>

      <CtaQuote
        heading="Get a straight quote for this work"
        ctaLabel="Request a quote"
        ctaHref="/request-a-quote/?type=ecommerce&service_interest=ecommerce-websites"
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
