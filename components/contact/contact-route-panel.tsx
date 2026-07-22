import Link from 'next/link';
import {
  SEO_AUDIT_PRODUCTS,
  isSeoAuditTierActive,
  seoAuditTierPriceZar,
} from '@/config/seo-audit-product';
import { IconArrow } from '@/components/contact/contact-icons';

const basic = SEO_AUDIT_PRODUCTS['priority-fix'];
const advanced = SEO_AUDIT_PRODUCTS.advanced;
const basicActive = isSeoAuditTierActive('priority-fix');
const advancedActive = isSeoAuditTierActive('advanced');
const anyAuditActive = basicActive || advancedActive;

function shortZar(amount: number): string {
  return `R${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function ContactRoutePanel() {
  return (
    <aside className="contact-route-panel relative overflow-hidden rounded-card border border-line bg-canvas p-5 shadow-card sm:p-6">
      <div className="pointer-events-none absolute inset-0 technical-grid opacity-30" aria-hidden="true" />
      <div className="relative">
        <p className="text-label text-cta">Guidance</p>
        <h2 className="text-subsection-title mt-2 text-ink">Choose the right route</h2>

        <ul className="mt-5 space-y-3">
          <li className="rounded-card border border-cta/40 bg-notice/60 p-3.5">
            <p className="text-label text-cta">General question</p>
            <p className="mt-1.5 text-sm text-muted">
              Use this form for support, existing-project follow-up or a general enquiry.
            </p>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink">
              Current page
            </p>
          </li>

          <li className="rounded-card border border-line bg-surface p-3.5">
            <p className="text-label text-link">New website or business system</p>
            <p className="mt-1.5 text-sm text-muted">
              Share your requirements through the proposal form so we can scope the project
              accurately.
            </p>
            <p className="mt-3">
              <Link
                href="/request-a-quote/"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link underline"
              >
                Request a Proposal
                <IconArrow />
              </Link>
            </p>
          </li>

          {anyAuditActive && (
            <li className="rounded-card border border-line bg-surface p-3.5">
              <p className="text-label text-link">SEO audit</p>
              <p className="mt-1.5 text-sm text-muted">
                Choose a fixed-price SEO audit for a small website or a more comprehensive audit for a
                larger site.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {basicActive && (
                  <Link
                    href={basic.route}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link underline"
                  >
                    View the {shortZar(seoAuditTierPriceZar('priority-fix'))} Audit
                    <IconArrow />
                  </Link>
                )}
                {advancedActive && (
                  <Link
                    href={advanced.route}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link underline"
                  >
                    View the {shortZar(seoAuditTierPriceZar('advanced'))} Advanced Audit
                    <IconArrow />
                  </Link>
                )}
              </div>
            </li>
          )}
        </ul>

        <div className="mt-6 border-t border-line pt-5">
          <h3 className="text-label text-muted">What happens next</h3>
          <ol className="contact-process mt-4">
            {[
              'Message received.',
              'Requirements reviewed.',
              'Recommended next step sent.',
            ].map((step, i) => (
              <li key={step} className="contact-process-step relative flex gap-3 pb-5 last:pb-0">
                <span
                  className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-link bg-canvas font-mono text-[0.65rem] font-semibold text-link"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="pt-1 text-sm text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </aside>
  );
}
