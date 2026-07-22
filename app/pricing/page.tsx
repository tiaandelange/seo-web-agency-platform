import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section, BulletList } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { PlaceholderNotice } from '@/components/placeholder-notice';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { packages } from '@/data/packages';
import { SEO_AUDIT_PROJECT_PRICING } from '@/config/seo-audit-product';

const PATH = '/pricing/';
const TITLE = 'Website Design Pricing';
const DESCRIPTION =
  'Website design and development pricing in South Africa, published openly: indicative ranges per package, what moves price up or down, and support plan costs.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const PRICING_FAQS = [
  {
    question: 'Why ranges instead of fixed prices?',
    answer:
      'Because honest fixed prices require scope, and scope requires a conversation. The ranges bound your budgeting; the scoping call converts your specifics into a fixed, itemised quote — which is the binding number.',
  },
  {
    question: 'Why are you more expensive than R3,000 package sites?',
    answer:
      'Different product. Volume packages optimise for launching fast; our builds start with search research and architecture, which is skilled time. If a template site genuinely fits your situation, our custom-vs-template comparison says so openly.',
  },
  {
    question: 'Do prices include VAT?',
    answer:
      'VAT treatment will be stated clearly on every quote once registration status is confirmed. Quotes always state the total you will actually pay. The fixed SEO Audit pack is currently shown as a once-off total while we are not VAT registered.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Website design and development pricing"
        intro="Published openly because price-hiding wastes everyone's time. Ranges below are indicative; every project receives a fixed, itemised quote after one scoping conversation, and the quote is the binding number."
      />
      <PlaceholderNotice>
        All figures on this page are indicative working ranges pending final confirmation — except
        the fixed SEO Audit entry product, which is a published once-off price.
      </PlaceholderNotice>

      <Section heading="Fixed-price SEO audits">
        <p className="mb-6 max-w-3xl text-sm text-muted">
          Distinct from website packages, monthly SEO support and maintenance — once-off diagnostics
          with capped implementation.
        </p>
        <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
          <article className="rounded-card border border-line bg-canvas p-6 shadow-card">
            <h3 className="text-lg font-semibold text-ink">
              <Link href="/seo-audit/" className="hover:underline">
                SEO Audit &amp; Priority Fix Pack
              </Link>
            </h3>
            <p className="mt-2 text-base font-medium text-ink">R1,999 once-off</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Up to 10 pages · five fixes or 90 minutes · 30-day plan · five business days after
              access. Not for ecommerce/multilingual sites.
            </p>
            <p className="mt-4">
              <Link href="/seo-audit/#eligibility" className="text-sm font-semibold text-link underline">
                Check eligibility
              </Link>
            </p>
          </article>
          <article className="rounded-card border border-line bg-canvas p-6 shadow-card">
            <h3 className="text-lg font-semibold text-ink">
              <Link href="/seo-audit/advanced/" className="hover:underline">
                Advanced SEO Audit &amp; Implementation Roadmap
              </Link>
            </h3>
            <p className="mt-2 text-base font-medium text-ink">R5,999 once-off</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Up to 250 crawlable URLs · architecture/content/competitors · eight fixes or two hours
              · 90-day roadmap · 7–10 business days after access.
            </p>
            <p className="mt-4">
              <Link
                href="/seo-audit/advanced/#eligibility"
                className="text-sm font-semibold text-link underline"
              >
                Check eligibility
              </Link>
            </p>
          </article>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          Above those limits?{' '}
          <Link href="/request-a-quote/?type=custom-seo-audit" className="text-link underline">
            Request a custom SEO audit
          </Link>
          .
        </p>
      </Section>

      <Section heading="Project pricing" tone="surface">
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-line text-left">
                <th scope="col" className="py-3 pr-4 font-semibold text-ink">Package</th>
                <th scope="col" className="py-3 pr-4 font-semibold text-ink">Indicative range</th>
                <th scope="col" className="py-3 font-semibold text-ink">Typical timeline</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.slug} className="border-b border-line align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-medium">
                    <Link href={`/website-packages/${pkg.slug}/`} className="text-accent underline">
                      {pkg.heading}
                    </Link>
                  </th>
                  <td className="py-3 pr-4 text-muted">
                    {pkg.priceRange
                      ? `R${pkg.priceRange.min.toLocaleString('en-ZA')} – R${pkg.priceRange.max.toLocaleString('en-ZA')} (indicative)`
                      : 'From R80,000; discovery R8,000–R15,000 (indicative)'}
                  </td>
                  <td className="py-3 text-muted">{pkg.timeline}</td>
                </tr>
              ))}
              <tr className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium">
                  <Link href={SEO_AUDIT_PROJECT_PRICING.hubPath} className="text-accent underline">
                    {SEO_AUDIT_PROJECT_PRICING.label}
                  </Link>
                </th>
                <td className="py-3 pr-4 text-muted">
                  R{SEO_AUDIT_PROJECT_PRICING.priceRange.min.toLocaleString('en-ZA')} – R
                  {SEO_AUDIT_PROJECT_PRICING.priceRange.max.toLocaleString('en-ZA')} (indicative)
                </td>
                <td className="py-3 text-muted">{SEO_AUDIT_PROJECT_PRICING.timeline}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          Out-of-plan hourly work: indicative R650–R950 per hour. Support plans: indicative
          R850–R8,000 per month by tier — detailed on the{' '}
          <Link href="/services/website-maintenance-and-support/" className="text-link underline">
            maintenance and support page
          </Link>
          . VAT treatment is stated on quotes once registration status is confirmed — ranges here are VAT-neutral.
        </p>
      </Section>

      <Section heading="What moves the price up or down" tone="surface">
        <BulletList
          items={[
            'Up: more pages with unique content, copywriting help, large product ranges, integrations, B2B pricing rules, custom functionality.',
            'Down: fewer pages done properly, content you supply in our structure, phased delivery (site now, systems later), reusing clean existing assets.',
            'Never a factor: hidden hosting mark-ups, surprise licence fees, or hostage pricing at handover — you own everything, always.',
          ]}
        />
      </Section>

      <Section heading="Wondering what the wider market charges?">
        <p className="max-w-3xl leading-relaxed text-muted">
          Our guide to{' '}
          <Link href="/resources/website-cost-south-africa/" className="text-link underline">
            website costs in South Africa
          </Link>{' '}
          covers the full market honestly — from R2,000 templates to R160,000 builds — with dated
          sources, so you can sanity-check any quote, including ours.
        </p>
      </Section>

      <Section heading="Pricing questions" tone="surface">
        <FaqList items={PRICING_FAQS} />
      </Section>

      <CtaQuote
        heading="Get a scoped proposal"
        body="One scoping conversation converts these indicative ranges into a written, itemised quote — clear scope, transparent pricing, no obligation."
        ctaLabel="Request a Proposal"
      />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
