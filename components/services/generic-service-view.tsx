import Link from 'next/link';
import type { Service } from '@/types/content';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
import { CardGrid, InfoCard } from '@/components/cards';
import { FaqList } from '@/components/faq-list';
import { RelatedContent, type RelatedItem } from '@/components/related-content';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { serviceSchema, webPageSchema } from '@/lib/schema';
import { getPackage } from '@/data/packages';
import { getSolution } from '@/data/solutions';
import { getArticle } from '@/data/articles';
import { relatedProjectItems } from '@/lib/project-proof';
import { getServiceProof } from '@/data/service-proof-map';
import { ServiceProofBlock } from '@/components/services/service-proof-block';
import { IllustrativeWorkflow } from '@/components/services/illustrative-workflow';
import { CommerceModelMatrix } from '@/components/services/commerce-model-matrix';

/**
 * Shared service template — behaviour preserved from the former inline page.
 * Dedicated proof layouts branch before this view (D-32).
 * Visual upgrade: editorial hero, card grids, ink band (Tier 2).
 */
export function GenericServiceView({ service }: { service: Service }) {
  const path = `/services/${service.slug}/`;
  const proof = getServiceProof(service.slug);

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
      <PageHero
        variant="editorial"
        motif
        eyebrow="Service"
        title={service.heading}
        description={service.intro}
        meta={
          <p className="text-sm text-muted">
            Updated{' '}
            {new Date(service.dateUpdated).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        }
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">
              {service.ctaType === 'consultation' ? 'Consultation' : 'Quote'}
            </p>
            <p className="mt-2 text-sm text-muted">{service.summary}</p>
          </div>
        }
      />

      <Section heading="Problems this solves" tone="surface">
        <CardGrid>
          {service.problems.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
      </Section>

      <ServiceProofBlock serviceSlug={service.slug} />

      {proof?.workflowId && <IllustrativeWorkflow workflowId={proof.workflowId} />}

      {proof?.showCommerceMatrix && <CommerceModelMatrix />}

      <Section heading="What's included" tone="surface">
        <CardGrid>
          {service.deliverables.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
      </Section>

      <Section heading="What's not included">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Clear exclusions protect your budget and our working relationship — anything below can
          be scoped separately when you need it:
        </p>
        <CardGrid>
          {service.exclusions.map((item, i) => (
            <InfoCard
              key={item}
              label={String(i + 1).padStart(2, '0')}
              description={item}
              headingAs="h3"
            />
          ))}
        </CardGrid>
      </Section>

      <InkBand heading="Pricing and packages" motif>
        <p className="max-w-3xl text-lg leading-relaxed text-sandstone">
          {relatedPackages.length > 0 ? (
            <>
              This service is available as{' '}
              {relatedPackages.map((pkg, i) => (
                <span key={pkg.slug}>
                  {i > 0 && ' and '}
                  <Link href={`/website-packages/${pkg.slug}/`} className="text-cta underline">
                    {pkg.heading}
                  </Link>
                </span>
              ))}
              {', '}with indicative ranges published openly on our{' '}
            </>
          ) : (
            <>Indicative ranges for this service are published openly on our </>
          )}
          <Link href="/pricing/" className="text-cta underline">
            pricing page
          </Link>
          . Every project gets a fixed, itemised quote after one scoping conversation.
        </p>
      </InkBand>

      {service.faqs.length > 0 && (
        <Section heading="Frequently asked questions" tone="surface">
          <FaqList items={service.faqs} variant="cards" />
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <RelatedContent heading="Related pages" items={related.slice(0, 5)} />
        </Section>
      )}

      {(service.slug === 'seo-website-development' ||
        service.slug === 'website-redesign' ||
        service.slug === 'website-maintenance-and-support' ||
        service.slug === 'ecommerce-websites' ||
        service.slug === 'product-catalogue-websites') && (
        <Section heading="Prefer a fixed-price SEO audit first?" tone="surface">
          <p className="max-w-3xl leading-relaxed text-muted">
            Small sites: the{' '}
            <Link href="/seo-audit/" className="text-link underline">
              SEO Audit &amp; Priority Fix Pack
            </Link>{' '}
            (R1,999). Larger, ecommerce or catalogue sites: the{' '}
            <Link href="/seo-audit/advanced/" className="text-link underline">
              Advanced SEO Audit
            </Link>{' '}
            (R5,999) with architecture review and a 90-day roadmap.
          </p>
        </Section>
      )}

      <CtaQuote
        heading={
          service.ctaType === 'consultation'
            ? 'Talk it through with the person who would build it'
            : 'Get a straight quote for this work'
        }
        ctaLabel={service.ctaType === 'consultation' ? 'Book a consultation' : 'Request a quote'}
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
