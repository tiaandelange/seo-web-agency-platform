import Link from 'next/link';
import {
  CUSTOM_SYSTEM_FROM_ZAR,
  formatPackageIndicativeRange,
  formatZar,
  getPackage,
} from '@/data/packages';
import { HomeSection } from '@/components/home/home-section';
import { formatZarOnceOff } from '@/lib/format-zar';

/**
 * Plain-language price answer after the enquiry preview — not a second hero.
 * Ranges derive from data/packages.ts so they cannot drift from /pricing/.
 */
export function HomePriceStrip() {
  const onePage = getPackage('one-page-website');
  const starter = getPackage('starter-business-website');
  const professional = getPackage('professional-business-website');

  const rows: Array<{ label: string; price: string }> = [];
  if (onePage?.priceRange) {
    rows.push({
      label: 'One-page website',
      price: formatPackageIndicativeRange(onePage.priceRange.min, onePage.priceRange.max),
    });
  }
  if (starter?.priceRange) {
    rows.push({
      label: 'Starter business website',
      price: formatPackageIndicativeRange(starter.priceRange.min, starter.priceRange.max),
    });
  }
  if (professional?.priceRange) {
    rows.push({
      label: 'Professional lead-generation website',
      price: formatPackageIndicativeRange(professional.priceRange.min, professional.priceRange.max),
    });
  }
  rows.push({
    label: 'Custom web systems',
    price: `From ${formatZar(CUSTOM_SYSTEM_FROM_ZAR)} (discovery first)`,
  });

  return (
    <HomeSection
      id="website-prices"
      tone="surface"
      eyebrow="Indicative pricing"
      heading="Website prices in plain language"
      headingLevel="functional"
      intro="Published ranges so you can budget before a call. The quote after scoping is the binding number — not a surprise later."
    >
      <dl className="mt-8 divide-y divide-line border border-line bg-canvas">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className="text-sm font-medium text-ink">{row.label}</dt>
            <dd className="text-sm font-semibold text-ink sm:text-right">{row.price}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted">
        SEO audits from {formatZarOnceOff(2950)}. Catalogues, ecommerce and monthly Search Care are on the
        pricing page.
      </p>
      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="/pricing/" className="font-semibold text-link hover:underline">
          Full pricing table →
        </Link>
        <Link
          href="/resources/website-cost-south-africa/"
          className="font-medium text-ink hover:underline"
        >
          Website cost guide (SA market)
        </Link>
      </p>
    </HomeSection>
  );
}
