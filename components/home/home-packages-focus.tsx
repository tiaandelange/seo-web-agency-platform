import Link from 'next/link';
import { packages } from '@/data/packages';
import { HomeSection } from '@/components/home/home-section';

const FEATURED = packages.find((p) => p.slug === 'professional-business-website');
const SECONDARY = packages.filter((p) =>
  ['starter-business-website', 'product-catalogue-website'].includes(p.slug),
);

export function HomePackagesFocus() {
  if (!FEATURED) return null;

  return (
    <HomeSection tone="surface" heading="Packages" headingLevel="functional">
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <article className="border border-line bg-canvas p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-cta">Hero package</p>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            <Link href={`/website-packages/${FEATURED.slug}/`} className="hover:underline">
              {FEATURED.heading}
            </Link>
          </h3>
          <p className="mt-3 max-w-prose leading-relaxed text-muted">{FEATURED.intro}</p>
          {FEATURED.priceRange && (
            <p className="mt-4 text-base font-semibold text-ink">
              Indicative R{FEATURED.priceRange.min.toLocaleString('en-ZA')} – R
              {FEATURED.priceRange.max.toLocaleString('en-ZA')}
            </p>
          )}
          <Link
            href="/request-a-quote/"
            className="mt-6 inline-block rounded-sm bg-cta px-5 py-2.5 text-sm font-semibold text-cta-contrast hover:opacity-90"
          >
            Request a proposal
          </Link>
        </article>
        <div>
          <p className="text-sm font-medium text-ink">Other starting points</p>
          <ul className="mt-4 space-y-4 border-l border-line pl-4">
            {SECONDARY.map((pkg) => (
              <li key={pkg.slug}>
                <Link
                  href={`/website-packages/${pkg.slug}/`}
                  className="font-medium text-ink hover:underline"
                >
                  {pkg.heading}
                </Link>
                <p className="mt-1 text-sm text-muted">{pkg.intro.slice(0, 100)}…</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/website-packages/" className="font-medium text-link hover:underline">
              All packages and indicative pricing →
            </Link>
          </p>
        </div>
      </div>
    </HomeSection>
  );
}
