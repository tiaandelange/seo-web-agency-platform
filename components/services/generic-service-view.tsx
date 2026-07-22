import Link from 'next/link';
import type { Service } from '@/types/content';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
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

/**
 * Shared service template — behaviour preserved from the former inline page.
 * Dedicated proof layouts branch before this view (D-32).
 */
export function GenericServiceView({ service }: { service: Service }) {
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
      <PageHeader
        eyebrow="Service"
        heading={service.heading}
        intro={service.intro}
        updated={service.dateUpdated}
      />

      <Section heading="Problems this solves" measure="narrow">
        <BulletList items={service.problems} />
      </Section>

      <Section heading="What's included" tone="surface" measure="narrow">
        <BulletList items={service.deliverables} />
      </Section>

      <Section heading="What's not included" measure="narrow">
        <p className="mb-4 leading-relaxed text-muted">
          Clear exclusions protect your budget and our working relationship — anything below can
          be scoped separately when you need it:
        </p>
        <BulletList items={service.exclusions} />
      </Section>

      <Section heading="Pricing and packages" tone="surface" measure="narrow">
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
              {', '}with indicative ranges published openly on our{' '}
            </>
          ) : (
            <>Indicative ranges for this service are published openly on our </>
          )}
          <Link href="/pricing/" className="text-accent underline">
            pricing page
          </Link>
          . Every project gets a fixed, itemised quote after one scoping conversation.
        </p>
      </Section>

      {service.faqs.length > 0 && (
        <Section heading="Frequently asked questions" measure="narrow">
          <FaqList items={service.faqs} />
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="surface">
          <RelatedContent heading="Related pages" items={related.slice(0, 5)} />
        </Section>
      )}

      {(service.slug === 'seo-website-development' ||
        service.slug === 'website-redesign' ||
        service.slug === 'website-maintenance-and-support' ||
        service.slug === 'ecommerce-websites' ||
        service.slug === 'product-catalogue-websites') && (
        <Section heading="Prefer a fixed-price SEO audit first?" measure="narrow">
          <p className="leading-relaxed text-muted">
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
