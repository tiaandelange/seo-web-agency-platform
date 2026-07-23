import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/routes';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section, BulletList } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
import { CardGrid, InfoCard } from '@/components/cards';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, seoAuditServiceSchema, webPageSchema } from '@/lib/schema';
import { SeoAuditComparison, SeoAuditTierCta } from '@/components/seo-audit-cta';
import { SeoAuditEligibilityForm } from '@/components/seo-audit-eligibility-form';
import {
  SEO_AUDIT_CUSTOM_QUOTE_PATH,
  SEO_AUDIT_HUB,
  SEO_AUDIT_HUB_PATH,
  getSeoAuditProduct,
  isSeoAuditTierActive,
  listSeoAuditProducts,
  seoAuditTierPriceZar,
} from '@/config/seo-audit-product';
import {
  seoAuditDeliverables,
  seoAuditExclusions,
  seoAuditFaqs,
  seoAuditImplementationIncludes,
  seoAuditProcess,
  seoAuditTerms,
  seoAuditWhoFor,
} from '@/data/seo-audit';

const PATH = SEO_AUDIT_HUB_PATH;
const TITLE = SEO_AUDIT_HUB.seoTitle;
const DESCRIPTION = SEO_AUDIT_HUB.metaDescription;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function SeoAuditHubPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const basic = getSeoAuditProduct('priority-fix');
  const advanced = getSeoAuditProduct('advanced');

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHero
        variant="editorial"
        motif
        eyebrow="SEO audit"
        title={SEO_AUDIT_HUB.heading}
        description={SEO_AUDIT_HUB.supportingStatement}
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Two packs</p>
            <p className="mt-2 text-sm text-muted">
              Priority Fix Pack R{seoAuditTierPriceZar('priority-fix').toLocaleString('en-ZA')} ·
              Advanced R{seoAuditTierPriceZar('advanced').toLocaleString('en-ZA')}
            </p>
          </div>
        }
      />

      <Section tone="surface">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          An SEO audit is a structured review of how search engines crawl, understand and rank your
          website — and whether visitors can convert once they arrive. Koppie Systems offers two
          once-off packs so you buy the depth your site actually needs, not an open-ended retainer.
        </p>
      </Section>

      <Section heading="Which pack fits your website?" tone="surface">
        <SeoAuditComparison />
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Above both limits, multilingual, multi-store or forensic cases?{' '}
          <Link href={SEO_AUDIT_CUSTOM_QUOTE_PATH} className="text-link underline">
            Request a Custom SEO Audit
          </Link>
          .
        </p>
      </Section>

      <Section heading="SEO Audit & Priority Fix Pack" id="priority-fix">
        <p className="max-w-3xl leading-relaxed text-muted">{basic.positioning}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{basic.shortDescription}</p>
        <p className="mt-4 font-medium text-ink">Best for</p>
        <BulletList items={basic.bestFor} />
        <p className="mt-6 font-medium text-ink">Included (summary)</p>
        <BulletList
          items={[
            'Up to 10 indexable pages — focused crawl and on-page review',
            'Three-page performance sample and Search Console where access is supplied',
            'Conversion review and five eligible fixes or 90 minutes',
            '30-day action plan and recording or 20-minute handover',
            basic.turnaround,
          ]}
        />
        <div className="mt-6">
          <SeoAuditTierCta id="priority-fix" eligibilityHref={`${PATH}#eligibility`} />
        </div>
      </Section>

      <Section heading="Advanced SEO Audit & Implementation Roadmap" tone="surface" id="advanced">
        <p className="max-w-3xl leading-relaxed text-muted">{advanced.positioning}</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{advanced.shortDescription}</p>
        <p className="mt-4 font-medium text-ink">Best for</p>
        <BulletList items={advanced.bestFor} />
        <p className="mt-6 font-medium text-ink">Goes deeper on</p>
        <BulletList
          items={[
            'Up to 250 crawlable URLs and 25 priority pages',
            'Architecture, templates, indexation and duplicate/canonical issues',
            'Keyword/content gaps, up to 3 competitors, ecommerce/catalogue where applicable',
            'Eight eligible fixes or two hours, plus a 90-day roadmap',
            advanced.turnaround,
          ]}
        />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <SeoAuditTierCta id="advanced" />
          <Link href={advanced.route} className="text-sm font-medium text-link underline">
            Read the full advanced audit page →
          </Link>
        </div>
      </Section>

      <Section heading="Eligibility check" id="eligibility">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Answer a few questions before checkout. We route you to the Priority Fix Pack, the Advanced
          Audit, or a custom proposal — we keep the lead either way.
        </p>
        {error === 'eligibility' && (
          <p role="alert" className="mb-6 max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            Please answer every eligibility question before continuing.
          </p>
        )}
        {(isSeoAuditTierActive('priority-fix') || isSeoAuditTierActive('advanced')) && (
          <SeoAuditEligibilityForm defaultTier="auto" />
        )}
      </Section>

      <Section heading="Priority Fix Pack — detail" tone="surface">
        <p className="mb-2 font-medium text-ink">Who it is for</p>
        <CardGrid>
          {seoAuditWhoFor.map((item, i) => (
            <InfoCard key={item} label={String(i + 1).padStart(2, '0')} description={item} />
          ))}
        </CardGrid>
        <p className="mt-8 mb-2 font-medium text-ink">Implementation included</p>
        <CardGrid>
          {seoAuditImplementationIncludes.map((item, i) => (
            <InfoCard key={item} label={String(i + 1).padStart(2, '0')} description={item} />
          ))}
        </CardGrid>
        <p className="mt-8 mb-2 font-medium text-ink">Not included</p>
        <CardGrid>
          {seoAuditExclusions.slice(0, 8).map((item, i) => (
            <InfoCard key={item} label={String(i + 1).padStart(2, '0')} description={item} />
          ))}
        </CardGrid>
        <p className="mt-8 mb-2 font-medium text-ink">Deliverables</p>
        <CardGrid>
          {seoAuditDeliverables.map((item, i) => (
            <InfoCard key={item} label={String(i + 1).padStart(2, '0')} description={item} />
          ))}
        </CardGrid>
        <p className="mt-8 mb-2 font-medium text-ink">Process</p>
        <ol className="max-w-3xl list-decimal space-y-3 pl-5 text-muted">
          {seoAuditProcess.map((step) => (
            <li key={step.title}>
              <span className="font-semibold text-ink">{step.title}</span>
              <p className="mt-1">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <InkBand heading="No ranking guarantee" motif>
        <p className="max-w-3xl text-lg leading-relaxed text-sandstone">
          Neither pack guarantees rankings, traffic or enquiries. Visibility depends on competition,
          content, authority, website condition and work after delivery.
        </p>
      </InkBand>

      <Section heading="Product terms" tone="surface">
        <CardGrid>
          {seoAuditTerms.map((item, i) => (
            <InfoCard key={item} label={String(i + 1).padStart(2, '0')} description={item} />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Common questions">
        <FaqList items={seoAuditFaqs} variant="cards" />
        <p className="mt-6 text-sm text-muted">
          Related:{' '}
          <Link href="/services/seo-website-development/" className="text-link underline">
            SEO website development
          </Link>
          ,{' '}
          <Link href="/services/website-redesign/" className="text-link underline">
            website redesign
          </Link>
          ,{' '}
          <Link href="/resources/what-is-an-seo-first-website/" className="text-link underline">
            what is an SEO-first website
          </Link>
          .
        </p>
      </Section>

      <CtaQuote
        heading="Ready for a fixed-price SEO audit?"
        body="Check eligibility above, or request a custom audit if your site is above the published pack limits."
        ctaLabel="Check eligibility"
        ctaHref={`${PATH}#eligibility`}
      />

      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(getBreadcrumbs(PATH)),
          ...listSeoAuditProducts()
            .filter((p) => p.id === 'priority-fix' || isSeoAuditTierActive(p.id))
            .map((p) =>
              seoAuditServiceSchema({
                path: p.id === 'priority-fix' ? PATH : p.route,
                name: p.name,
                description: p.shortDescription,
                priceZar: seoAuditTierPriceZar(p.id),
                currency: p.currency,
                available: isSeoAuditTierActive(p.id),
              })
            ),
        ]}
      />
    </>
  );
}
