import Link from 'next/link';
import { HOMEPAGE_CAPABILITY_PATHS } from '@/data/homepage-paths';
import { HomeSection } from '@/components/home/home-section';

/**
 * Three commercial paths — websites, commerce/catalogue, portals/systems.
 */
export function CapabilityPaths() {
  return (
    <HomeSection
      eyebrow="Where to start"
      heading="Three capability paths"
      headingLevel="major"
      intro="Choose the shape that matches the problem — then open the service that goes with it."
    >
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {HOMEPAGE_CAPABILITY_PATHS.map((path) => (
          <li key={path.id}>
            <article className="flex h-full flex-col border border-line bg-canvas p-6">
              <h3 className="text-lg font-bold text-ink">{path.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Problem. </span>
                {path.problem}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Typical functionality. </span>
                {path.functionality}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Suitable for. </span>
                {path.suitableFor}
              </p>
              <p className="mt-4 text-sm">
                <Link href={path.proofHref} className="text-link underline">
                  {path.proofLabel}
                </Link>
              </p>
              <p className="mt-auto pt-6">
                <Link
                  href={path.ctaHref}
                  className="inline-flex min-h-11 items-center font-semibold text-link hover:underline"
                >
                  {path.ctaLabel} →
                </Link>
              </p>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted">
        Need the full list?{' '}
        <Link href="/services/" className="font-medium text-link hover:underline">
          All services →
        </Link>
      </p>
    </HomeSection>
  );
}
