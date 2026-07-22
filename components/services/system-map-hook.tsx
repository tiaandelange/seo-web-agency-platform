import Link from 'next/link';
import {
  CAPABILITY_SERVICES,
  CAPABILITY_TIERS,
  SERVICE_PROBLEM_PATHS,
} from '@/data/services-architecture';
import { FlowStrip } from '@/components/systems/flow-strip';
import { Container } from '@/components/layout/container';

const DEFAULT_ID = SERVICE_PROBLEM_PATHS[0]?.id ?? 'qualified-enquiries';

export function SystemMapHook() {
  return (
    <section className="system-map-hook border-b border-line bg-surface" aria-labelledby="system-map-heading">
      <Container className="py-14 md:py-16">
        <p className="text-label text-cta">Build your system map</p>
        <h2 id="system-map-heading" className="text-section-title mt-2 max-w-2xl text-ink">
          Start from the problem — not the service name
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Select what you are trying to improve. We show a short recommended path and where to go
          next.
        </p>

        <div className="system-map-root mt-8 grid gap-8 lg:grid-cols-12">
          {SERVICE_PROBLEM_PATHS.map((path) => (
            <input
              key={`radio-${path.id}`}
              type="radio"
              name="system-map-problem"
              id={`problem-${path.id}`}
              value={path.id}
              defaultChecked={path.id === DEFAULT_ID}
              className={`visually-hidden-control problem-radio problem-radio-${path.id}`}
            />
          ))}

          <fieldset className="lg:col-span-5">
            <legend className="sr-only">What are you trying to improve?</legend>
            <div className="flex flex-col gap-1">
              {SERVICE_PROBLEM_PATHS.map((path) => (
                <label
                  key={path.id}
                  htmlFor={`problem-${path.id}`}
                  className={`system-map-label problem-label-${path.id} flex min-h-11 cursor-pointer items-center border-l-2 border-transparent px-3 py-3 text-sm font-medium text-muted transition-colors`}
                >
                  {path.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="lg:col-span-7">
            {SERVICE_PROBLEM_PATHS.map((path) => {
              const tierMeta = CAPABILITY_TIERS.find((t) => t.id === path.tier);
              const primary = CAPABILITY_SERVICES.find((s) => s.slug === path.primaryServiceSlug);
              return (
                <article
                  key={path.id}
                  className={`system-map-panel system-map-panel-${path.id} border border-line bg-canvas p-5 sm:p-6`}
                >
                  <p className="text-label text-link">
                    Tier / {tierMeta?.index} {tierMeta?.label}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted">{path.diagnosis}</p>
                  <div className="mt-5">
                    <FlowStrip steps={path.flow} />
                  </div>
                  <p className="mt-5 text-sm text-ink">
                    Primary capability:{' '}
                    <Link href={path.exploreHref} className="font-semibold text-link underline">
                      {primary?.title ?? path.primaryServiceSlug}
                    </Link>
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={path.exploreHref}
                      className="inline-flex min-h-11 items-center rounded-sm border border-line bg-canvas px-4 text-sm font-semibold text-ink hover:border-muted"
                    >
                      Explore this service
                    </Link>
                    <Link
                      href={path.discussHref}
                      className="inline-flex min-h-11 items-center rounded-sm bg-cta px-4 text-sm font-semibold text-cta-contrast hover:opacity-90"
                    >
                      Discuss this workflow
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
