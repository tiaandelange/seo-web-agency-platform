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
      'VAT treatment will be stated clearly on every quote once registration status is confirmed. Quotes always state the total you will actually pay.',
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
        All figures on this page are indicative working ranges pending final confirmation.
      </PlaceholderNotice>

      <Section heading="Project pricing">
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
