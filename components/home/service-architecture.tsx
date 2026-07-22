import Link from 'next/link';
import { HOME_CAPABILITIES } from '@/data/homepage';
import { HomeSection } from '@/components/home/home-section';

export function ServiceArchitecture() {
  const defaultId = HOME_CAPABILITIES[0]?.id ?? 'lead-gen';

  return (
    <HomeSection
      eyebrow="Capability map"
      heading="What we build — as connected systems"
      headingLevel="major"
      intro="One dominant proposition at a time. Select a capability to see how search, interface and operations connect."
    >
      <div className="home-capability-map mt-10 border border-line">
        <div className="grid lg:grid-cols-[minmax(220px,280px)_1fr]">
          <div className="flex flex-col border-b border-line bg-canvas lg:border-b-0 lg:border-r">
            {HOME_CAPABILITIES.map((cap) => (
              <div key={cap.id}>
                <input
                  type="radio"
                  name="home-capability"
                  id={`cap-${cap.id}`}
                  defaultChecked={cap.id === defaultId}
                  className={`cap-radio cap-radio-${cap.id} sr-only`}
                />
                <label htmlFor={`cap-${cap.id}`} className="home-cap-label">
                  {cap.label}
                </label>
              </div>
            ))}
            <p className="mt-auto border-t border-line px-4 py-3 text-sm">
              <Link href="/services/" className="font-medium text-link hover:underline">
                All services →
              </Link>
            </p>
          </div>

          <div className="relative min-h-[360px] bg-surface">
            <div className="pointer-events-none absolute inset-0 technical-grid opacity-35" aria-hidden="true" />
            {HOME_CAPABILITIES.map((cap) => (
              <article key={cap.id} className={`home-cap-panel home-cap-panel-${cap.id} relative p-6 md:p-8`}>
                <p className="font-mono text-xs uppercase tracking-widest text-cta">System module</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{cap.label}</h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{cap.useCase}</p>
                <p className="mt-4 text-sm font-medium text-ink">{cap.outcome}</p>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  {cap.flow.map((step, i) => (
                    <span key={step} className="flex items-center gap-2 font-mono text-xs">
                      <span className="border border-line bg-canvas px-2 py-1 text-ink">{step}</span>
                      {i < cap.flow.length - 1 && (
                        <span className="hidden text-cta sm:inline" aria-hidden="true">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {cap.modules.map((mod) => (
                    <li key={mod} className="border border-line bg-canvas px-3 py-2 text-xs text-muted">
                      {mod}
                    </li>
                  ))}
                </ul>

                <p className="mt-6">
                  <Link
                    href={`/services/${cap.serviceSlug}/`}
                    className="text-sm font-semibold text-link hover:underline"
                  >
                    Service detail →
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
