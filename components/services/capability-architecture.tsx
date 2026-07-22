import Link from 'next/link';
import {
  CAPABILITY_TIERS,
  servicesForTier,
  type CapabilityTier,
} from '@/data/services-architecture';
import { FlowStrip } from '@/components/systems/flow-strip';
import { CapabilityOutputPanel } from '@/components/services/capability-output-panel';
import { Container } from '@/components/layout/container';

const DEFAULT_TIER: CapabilityTier = 'acquire';

export function CapabilityArchitecture() {
  return (
    <section className="capability-architecture border-b border-line" aria-labelledby="capability-arch-heading">
      <Container className="py-14 md:py-20">
        <p className="text-label text-cta">Capability architecture</p>
        <h2 id="capability-arch-heading" className="text-section-title mt-2 max-w-2xl text-ink">
          Three connected tiers — not a catalogue of equal cards
        </h2>
        <p className="mt-3 max-w-2xl text-lead text-muted">
          Select a tier to see how demand, operations and support connect. Every service remains a
          crawlable link.
        </p>

        <div className="capability-arch-map mt-10">
          {CAPABILITY_TIERS.map((tier) => (
            <input
              key={`input-${tier.id}`}
              type="radio"
              name="capability-tier"
              id={`tier-${tier.id}`}
              value={tier.id}
              defaultChecked={tier.id === DEFAULT_TIER}
              className={`visually-hidden-control tier-radio tier-radio-${tier.id}`}
            />
          ))}

          <div className="grid gap-8 lg:grid-cols-12">
            <fieldset className="lg:col-span-3">
              <legend className="sr-only">Capability tier</legend>
              <div className="flex flex-col gap-1">
                {CAPABILITY_TIERS.map((tier) => (
                  <label
                    key={tier.id}
                    htmlFor={`tier-${tier.id}`}
                    className={`capability-tier-label tier-label-${tier.id} flex min-h-11 cursor-pointer flex-col justify-center border-l-2 border-transparent px-3 py-3 transition-colors`}
                  >
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      {tier.index} / {tier.label}
                    </span>
                    <span className="mt-1 text-sm font-medium text-ink">{tier.summary}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="lg:col-span-5">
              {CAPABILITY_TIERS.map((tier) => {
                const services = servicesForTier(tier.id);
                return (
                  <div
                    key={tier.id}
                    className={`capability-tier-panel capability-tier-panel-${tier.id} space-y-6`}
                  >
                    <p className="text-label text-link">{tier.statusLabel}</p>
                    <FlowStrip steps={tier.flow} orientation="vertical" />
                    <ul className="space-y-3 border-t border-line pt-5">
                      {services.map((svc) => (
                        <li key={svc.slug}>
                          <Link
                            href={`/services/${svc.slug}/`}
                            className="group block min-h-11 py-1"
                          >
                            <span className="font-medium text-ink group-hover:text-link group-hover:underline">
                              {svc.title}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted">{svc.summary}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-4">
              {CAPABILITY_TIERS.map((tier) => {
                const featured = servicesForTier(tier.id)[0];
                return (
                  <div
                    key={tier.id}
                    className={`capability-tier-panel capability-tier-panel-${tier.id}`}
                  >
                    <CapabilityOutputPanel kind={featured?.outputKind ?? 'enquiry-record'} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fallback crawlable list — always in HTML */}
          <nav className="mt-12 border-t border-line pt-8" aria-label="All services">
            <p className="text-label text-muted">All services</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITY_TIERS.flatMap((tier) =>
                servicesForTier(tier.id).map((svc) => (
                  <li key={`all-${svc.slug}`}>
                    <Link
                      href={`/services/${svc.slug}/`}
                      className="inline-flex min-h-11 items-center text-sm font-medium text-link hover:underline"
                    >
                      {svc.title}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
