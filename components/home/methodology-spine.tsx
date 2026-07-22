import Link from 'next/link';
import { HOME_INDUSTRIES, HOME_METHODOLOGY, HOME_SECONDARY_SERVICES } from '@/data/homepage';
import { HomeSection } from '@/components/home/home-section';

export function MethodologySpine() {
  return (
    <HomeSection
      eyebrow="Method · Industries · Evidence"
      heading="SEO-first delivery, documented end to end"
      headingLevel="major"
      intro="Research, structure, build and measure — one continuous methodology, not three separate card sections."
    >
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(200px,260px)_1fr]">
        <aside>
          <p className="home-eyebrow">Industries we map</p>
          <ul className="mt-4 space-y-2 border-l border-line pl-4">
            {HOME_INDUSTRIES.map((ind) => (
              <li key={ind.slug}>
                <Link
                  href={`/solutions/${ind.slug}/`}
                  className="text-sm text-muted hover:text-link hover:underline"
                >
                  {ind.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="home-eyebrow mt-8">Also available</p>
          <ul className="mt-3 space-y-1.5 pl-0 text-sm text-muted">
            {HOME_SECONDARY_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="hover:text-link hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <ol className="home-method-spine space-y-0">
          {HOME_METHODOLOGY.map((step) => (
            <li key={step.number} className="home-method-step grid gap-4 border-l-2 border-line py-8 pl-6 md:grid-cols-[4rem_1fr] md:pl-8">
              <p className="font-mono text-3xl font-bold leading-none text-cta/80 md:text-4xl">
                {step.number}
              </p>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{step.label}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{step.body}</p>
                <p className="mt-3 font-mono text-xs text-ink">
                  Output: <span className="text-muted">{step.deliverable}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-6">
        <Link href="/process/" className="font-medium text-link hover:underline">
          Full process documentation →
        </Link>
      </p>
    </HomeSection>
  );
}
