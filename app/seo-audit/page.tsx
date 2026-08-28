import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { Section, BulletList } from '@/components/section';
import { InkBand } from '@/components/layout/ink-band';
import { CardGrid, InfoCard } from '@/components/cards';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { seoAuditServiceSchema, webPageSchema } from '@/lib/schema';
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
import { formatZar } from '@/lib/format-zar';
import {
  seoAuditAtAGlance,
  seoAuditDeliverables,
  seoAuditExclusions,
  seoAuditFaqs,
  seoAuditHubOpening,
  seoAuditImplementationIncludes,
  seoAuditOwnSiteSampleFindings,
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
            <p className="text-label text-cta">Two packs · once-off ZAR</p>
            <p className="mt-2 text-sm text-muted">
              ≤10 indexable pages → Priority Fix {formatZar(seoAuditTierPriceZar('priority-fix'))}
            </p>
            <p className="mt-1 text-sm text-muted">
              11–250 URLs / ecommerce → Advanced {formatZar(seoAuditTierPriceZar('advanced'))}
            </p>
            <p className="mt-1 text-sm text-muted">Above limits → custom audit quote</p>
            <p className="mt-4">
              <a
                href={`${PATH}#eligibility`}
                className="text-sm font-semibold text-link underline-offset-2 hover:underline"
              >
                Check eligibility →
              </a>
            </p>
          </div>
        }
      />

      <Section tone="surface">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{seoAuditHubOpening.lead}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          <span className="font-medium text-ink">Priority Fix Pack ({formatZar(seoAuditTierPriceZar('priority-fix'))} once-off)</span>{' '}
          suits small service and brochure sites with up to {basic.maxCrawlableUrls} indexable pages.
          {' '}
          <span className="font-medium text-ink">Advanced SEO Audit ({formatZar(seoAuditTierPriceZar('advanced'))} once-off)</span>{' '}
          suits larger, ecommerce and catalogue sites (up to {advanced.maxCrawlableUrls} crawlable URLs).
          Both include a written report, capped priority fixes within the pack allowance, and a clear action plan.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{seoAuditHubOpening.delivery}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{seoAuditHubOpening.servicesAnswer}</p>

        <div className="mt-8 max-w-3xl rounded-card border border-line bg-canvas p-5">
          <p className="text-label text-muted">At a glance — both packs</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="font-medium text-ink">Examined: </span>
            {seoAuditAtAGlance.examined}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="font-medium text-ink">Not included: </span>
            {seoAuditAtAGlance.excluded}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <span className="font-medium text-ink">Turnaround: </span>
            {seoAuditAtAGlance.turnaround}
          </p>
        </div>
      </Section>

      <Section heading="Pick depth by site size" tone="surface">
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Not sure which website SEO audit you need? Use this side-by-side view — Priority Fix for small
          sites that need quick wins, Advanced for technical depth, architecture and competitor context.
          Every price is once-off in ZAR; sites above published limits route to a{' '}
          <Link href={SEO_AUDIT_CUSTOM_QUOTE_PATH} className="text-link underline">
            custom audit quote
          </Link>{' '}
          instead of an open-ended retainer.
        </p>
        <div className="mt-6">
          <SeoAuditComparison />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Above both limits, multilingual, multi-store or forensic cases?{' '}
          <Link href={SEO_AUDIT_CUSTOM_QUOTE_PATH} className="text-link underline">
            Request a Custom SEO Audit
          </Link>
          . See fixed prices in context on{' '}
          <Link href="/pricing/" className="text-link underline">
            Pricing
          </Link>{' '}
          or read{' '}
          <Link href="/resources/seo-cost-south-africa/" className="text-link underline">
            how SEO pricing works in South Africa
          </Link>
          .
        </p>
      </Section>

      <Section heading="Example checks from our own site architecture" tone="surface">
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          These categories come from how we run and validate our own stack — illustrative of audit
          checks, not findings from a client site and not traffic or ranking claims.
        </p>
        <CardGrid>
          {seoAuditOwnSiteSampleFindings.map((item, i) => (
            <InfoCard
              key={item.title}
              label={String(i + 1).padStart(2, '0')}
              title={item.title}
              description={item.body}
            />
          ))}
        </CardGrid>
      </Section>

      <Section heading="Eligibility check" id="eligibility">
        <p className="mb-6 max-w-3xl leading-relaxed text-muted">
          Answer a few questions (~30 seconds) so we can route you to the Priority Fix Pack intake, the
          Advanced Audit intake, or a custom proposal. We do not reject the lead — we route it to the
          right depth.
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

      <Section heading="SEO Audit & Priority Fix Pack" tone="surface" id="priority-fix">
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

      <Section heading="Advanced SEO Audit & Implementation Roadmap" id="advanced">
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
          <SeoAuditTierCta id="advanced" eligibilityHref={`${PATH}#eligibility`} />
          <Link href={advanced.route} className="text-sm font-medium text-link underline">
            Read the full advanced audit page →
          </Link>
        </div>
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
          {seoAuditExclusions.map((item, i) => (
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
          <Link href="/pricing/" className="text-link underline">
            Pricing
          </Link>
          ,{' '}
          <Link href="/resources/seo-cost-south-africa/" className="text-link underline">
            SEO cost guide (South Africa)
          </Link>
          ,{' '}
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
          ,{' '}
          <Link href={`${PATH}#eligibility`} className="text-link underline">
            check eligibility
          </Link>
          ,{' '}
          <Link href={basic.intakePath} className="text-link underline">
            Priority Fix intake
          </Link>
          .
        </p>
      </Section>

      <CtaQuote
        heading="Ready to book a fixed-price SEO audit?"
        body={`Check eligibility above to match your site to the ${formatZar(seoAuditTierPriceZar('priority-fix'))} or ${formatZar(seoAuditTierPriceZar('advanced'))} pack — or request a custom audit if you are above published limits.`}
        ctaLabel="Check eligibility"
        ctaHref={`${PATH}#eligibility`}
      />

      <JsonLd
        data={[
          webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }),
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
