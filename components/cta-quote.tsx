import Link from 'next/link';
import { brand } from '@/config/brand';

/**
 * Conversion CTA block — one primary action per page
 * (docs/architecture/PAGE-TEMPLATES.md baseline).
 */
export function CtaQuote({
  heading = 'Ready to talk about your project?',
  body = 'Tell us what you need and get a straight answer — clear scope, indicative pricing and a fixed quote after one scoping conversation.',
  ctaLabel = 'Request a Proposal',
  ctaHref = '/request-a-quote/',
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-card border border-line bg-canvas p-8 shadow-card">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{heading}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="rounded-card bg-cta px-5 py-3 font-semibold text-cta-contrast hover:opacity-90"
            >
              {ctaLabel}
            </Link>
            {brand.contact.whatsapp && (
              <a href={`https://wa.me/${brand.contact.whatsapp}`} className="font-medium text-link hover:underline">
                Or WhatsApp us
              </a>
            )}
            {!brand.contact.whatsapp && (
              <Link href="/contact/" className="font-medium text-link hover:underline">
                Or contact us
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
