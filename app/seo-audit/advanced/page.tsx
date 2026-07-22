import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/routes';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section, BulletList } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, seoAuditServiceSchema, webPageSchema } from '@/lib/schema';
import { SeoAuditTierCta } from '@/components/seo-audit-cta';
import { SeoAuditEligibilityForm } from '@/components/seo-audit-eligibility-form';
import {
  SEO_AUDIT_CUSTOM_QUOTE_PATH,
  SEO_AUDIT_HUB_PATH,
  getSeoAuditProduct,
  isSeoAuditTierActive,
  seoAuditTierPriceLabel,
  seoAuditTierPriceZar,
} from '@/config/seo-audit-product';
import {
  advancedComplexityBlocks,
  advancedCustomerMustSupply,
  advancedDeliverables,
  advancedEligibilityCovers,
  advancedExclusions,
  advancedFaqs,
  advancedImplementationIncludes,
  advancedPriorityFields,
  advancedProcess,
  advancedScopeSections,
  advancedWhoFor,
} from '@/data/seo-audit-advanced';

const product = getSeoAuditProduct('advanced');
const PATH = product.route;
const TITLE = product.seoTitle;
const DESCRIPTION = product.metaDescription;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function AdvancedSeoAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const active = isSeoAuditTierActive('advanced');

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader heading={product.heading} intro={product.supportingStatement} />

      <Section>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Advanced technical &amp; content SEO audit
        </p>
        <div className="mt-4 grid max-w-4xl gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="text-lg leading-relaxed text-muted">{product.positioning}</p>
          <p className="text-2xl font-bold text-ink">
            {seoAuditTierPriceLabel('advanced')}
            <span className="mt-1 block text-sm font-normal text-muted">No monthly retainer</span>
          </p>
        </div>
        {active ? (
          <div className="mt-8">
            <SeoAuditTierCta id="advanced" />
            <p className="mt-3 text-sm text-muted">
              Instant checkout is inactive until a payment provider is configured — request the pack
              via intake, or{' '}
              <Link href={SEO_AUDIT_CUSTOM_QUOTE_PATH} className="text-link underline">
                request a custom audit
              </Link>{' '}
              if you are above the limits.
            </p>
          </div>
        ) : (
          <p className="mt-8 max-w-2xl rounded-card border border-line bg-surface p-4" role="status">
            This offer is temporarily unavailable.{' '}
            <Link href={SEO_AUDIT_CUSTOM_QUOTE_PATH} className="text-link underline">
              Request a custom SEO audit
            </Link>
            .
          </p>
        )}
      </Section>

      <Section heading="Why larger websites need a deeper audit" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          Small brochure sites usually fail on titles, thin pages and basic crawl issues. Larger
          sites fail on architecture: templates that duplicate, filters that explode the crawl,
          categories that orphan products, and content that targets the same intent five times.
          Treating every URL as a separate page wastes budget — template and indexation analysis
          finds the leverage points first.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          This pack is built for sites up to {product.maxCrawlableUrls} crawlable URLs with up to{' '}
          {product.maxManualPages} priority pages reviewed in depth — not unlimited enterprise
          programmes.
        </p>
      </Section>

      <Section heading="Who it is for">
        <BulletList items={advancedWhoFor} />
      </Section>

      <Section heading="Standard eligibility" tone="surface" id="eligibility">
        <p className="mb-4 max-w-3xl leading-relaxed text-muted">
          The {seoAuditTierPriceLabel('advanced')} pack covers:
        </p>
        <BulletList items={advancedEligibilityCovers} />
        <p className="mt-6 mb-2 font-medium text-ink">You must supply</p>
        <BulletList items={advancedCustomerMustSupply} />
        {error === 'eligibility' && (
          <p role="alert" className="mt-6 max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            Please answer every eligibility question before continuing.
          </p>
        )}
        {active && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-ink">Check website eligibility</h3>
            <SeoAuditEligibilityForm defaultTier="advanced" />
          </div>
        )}
      </Section>

      <Section heading="Complexity gate — custom scope required">
        <p className="mb-4 max-w-3xl leading-relaxed text-muted">
          Your website requires a custom audit scope when any of the following apply. We do not
          reject the lead — we route you to a proposal with your details retained.
        </p>
        <BulletList items={advancedComplexityBlocks} />
        <p className="mt-6">
          <Link
            href={SEO_AUDIT_CUSTOM_QUOTE_PATH}
            className="rounded-card border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-surface"
          >
            Request a Custom SEO Audit
          </Link>
        </p>
      </Section>

      <Section heading="What the advanced audit covers" tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          {advancedScopeSections.map((block) => (
            <div key={block.heading}>
              <h3 className="text-base font-semibold text-ink">{block.heading}</h3>
              <BulletList items={block.items} />
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          We do not state that an indexable page is guaranteed to be indexed. Search volume is not
          promised traffic.
        </p>
      </Section>

      <Section heading="Implementation allowance">
        <p className="mb-4 max-w-3xl leading-relaxed text-muted">
          Up to eight eligible fixes or two hours of implementation, whichever limit is reached
          first. Eligible work may include:
        </p>
        <BulletList items={advancedImplementationIncludes} />
        <p className="mt-6 mb-2 font-medium text-ink">Not implemented in the fixed pack</p>
        <BulletList items={advancedExclusions} />
      </Section>

      <Section heading="Issue priority system" tone="surface">
        <p className="mb-4 max-w-3xl leading-relaxed text-muted">
          Every issue is logged with severity (Critical / High / Medium / Low / Observation) — not
          everything is critical. Each entry includes:
        </p>
        <BulletList items={advancedPriorityFields} />
      </Section>

      <Section heading="Deliverables">
        <BulletList items={advancedDeliverables} />
        <p className="mt-4 max-w-3xl text-sm text-muted">
          Typically a 20–30 page (or equivalent digital) report of useful findings — not filler.
        </p>
      </Section>

      <Section heading="How delivery works" tone="surface">
        <ol className="max-w-3xl list-decimal space-y-4 pl-5 text-muted">
          {advancedProcess.map((step) => (
            <li key={step.title}>
              <span className="font-semibold text-ink">{step.title}</span>
              <p className="mt-1 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted">
          {product.turnaround}. Complexity discovered after purchase may require an agreed scope
          reduction, an upgrade to a custom audit, or a refund before substantive audit work begins
          — commercial policy to be confirmed before public checkout launch.
        </p>
      </Section>

      <Section heading="Compare with the Priority Fix Pack">
        <p className="max-w-3xl leading-relaxed text-muted">
          Small brochure sites (≤10 pages) usually belong on the{' '}
          <Link href={SEO_AUDIT_HUB_PATH} className="text-link underline">
            SEO Audit &amp; Priority Fix Pack
          </Link>{' '}
          at R1,999. Use this advanced page when architecture, ecommerce, catalogues or scale demand
          a deeper roadmap.
        </p>
      </Section>

      <Section heading="Common questions" tone="surface">
        <FaqList items={advancedFaqs} />
      </Section>

      <Section heading="Related services">
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          <Link href="/services/seo-website-development/" className="text-link underline">
            SEO website development
          </Link>
          {' · '}
          <Link href="/services/ecommerce-websites/" className="text-link underline">
            Ecommerce websites
          </Link>
          {' · '}
          <Link href="/services/product-catalogue-websites/" className="text-link underline">
            Product catalogue websites
          </Link>
          {' · '}
          <Link href="/services/website-redesign/" className="text-link underline">
            Website redesign
          </Link>
          {' · '}
          <Link href="/pricing/" className="text-link underline">
            Pricing
          </Link>
        </p>
      </Section>

      {active && (
        <Section heading={`Ready for the ${seoAuditTierPriceLabel('advanced')} pack?`}>
          <SeoAuditTierCta id="advanced" />
        </Section>
      )}

      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(getBreadcrumbs(PATH)),
          seoAuditServiceSchema({
            path: PATH,
            name: product.name,
            description: DESCRIPTION,
            priceZar: seoAuditTierPriceZar('advanced'),
            currency: product.currency,
            available: active,
          }),
        ]}
      />
    </>
  );
}
