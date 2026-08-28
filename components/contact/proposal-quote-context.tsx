import Link from 'next/link';
import { brand, publicEmail } from '@/config/brand';
import { formatPhoneDisplay } from '@/lib/phone';
import { PROPOSAL_SERVICE_OPTIONS } from '@/data/proposal-form';
import { PROPOSAL_PROCESS_STEPS } from '@/data/proposal-page-copy';
import { ProposalReassuranceChips } from '@/components/contact/proposal-reassurance-chips';
import { Eyebrow } from '@/components/typography/eyebrow';

export type ProposalPrefillSummary = {
  serviceInterest?: string;
  budgetBand?: string;
  fromConfigurator?: boolean;
};

function serviceLabel(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return PROPOSAL_SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function ProposalQuoteIntro({
  prefill,
}: {
  prefill?: ProposalPrefillSummary;
}) {
  const service = serviceLabel(prefill?.serviceInterest);

  return (
    <header className="proposal-quote-intro">
      <Eyebrow>Proposal</Eyebrow>
      <h1 className="text-page-title mt-3 text-ink">Request a website proposal</h1>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted md:text-base">
        Rough details are completely fine. We normally respond within one business day with initial
        questions or a link to a short scoping call, then send an itemised proposal with scope,
        price and next steps.
      </p>
      <ProposalReassuranceChips />
      {prefill?.fromConfigurator && (service || prefill.budgetBand) && (
        <>
          <p className="proposal-prefill-note-mobile mt-4 text-sm text-muted lg:hidden" role="status">
            Configurator prefill applied
            {service ? ` — ${service}` : ''}
            {prefill.budgetBand ? ` · ${prefill.budgetBand}` : ''}. Edit the form before sending.
          </p>
          <div
            className="proposal-prefill-note mt-5 hidden rounded-card border border-line bg-canvas p-4 lg:block"
            role="status"
          >
            <p className="text-label text-muted">From homepage configurator</p>
            {service && (
              <p className="mt-2 text-sm text-ink">
                <span className="font-medium">Service shape: </span>
                {service}
              </p>
            )}
            {prefill.budgetBand && (
              <p className="mt-1 text-sm text-ink">
                <span className="font-medium">Indicative budget: </span>
                {prefill.budgetBand}
              </p>
            )}
            <p className="mt-2 text-sm text-muted">
              Adjust the fields in the form if your needs changed — nothing is submitted until you
              send.
            </p>
          </div>
        </>
      )}
    </header>
  );
}

export function ProposalQuoteSupport() {
  const email = publicEmail();

  return (
    <aside className="proposal-quote-support" aria-label="Proposal process and contact">
      <div className="proposal-quote-process">
        <p className="text-label text-muted">What happens next</p>
        <ol className="mt-3 space-y-3">
          {PROPOSAL_PROCESS_STEPS.map((stepLabel, i) => (
            <li key={stepLabel} className="flex gap-3 text-sm leading-relaxed text-graphite">
              <span
                className="w-6 shrink-0 font-mono text-xs tabular-nums text-cta"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{stepLabel}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        <span className="font-medium text-ink">Helpful to prepare. </span>
        What you sell, who buys it, current website (if any), must-have functionality, and a rough
        budget band. Suitable for business websites, catalogues, ecommerce, portals, RFQ systems and
        custom admin tools for technical and service businesses.
      </p>

      <p className="mt-4 text-sm text-muted">{brand.hours}</p>

      <p className="mt-4 text-sm">
        Prefer to browse first?{' '}
        <Link href="/pricing/" className="text-link underline-offset-2 hover:underline">
          Pricing
        </Link>
        {' · '}
        <Link href="/services/" className="text-link underline-offset-2 hover:underline">
          Services
        </Link>
      </p>

      {(brand.contact.phone || brand.contact.whatsapp || email) && (
        <p className="mt-3 text-sm text-muted">
          Direct contact:{' '}
          {brand.contact.phone && (
            <a href={`tel:${brand.contact.phone}`} className="text-link underline-offset-2 hover:underline">
              {formatPhoneDisplay(brand.contact.phone)}
            </a>
          )}
          {brand.contact.phone && brand.contact.whatsapp && ' · '}
          {brand.contact.whatsapp && (
            <a
              href={`https://wa.me/${brand.contact.whatsapp}`}
              className="text-link underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          )}
          {email && (brand.contact.phone || brand.contact.whatsapp) && ' · '}
          {email && (
            <a href={`mailto:${email}`} className="text-link underline-offset-2 hover:underline">
              {email}
            </a>
          )}
        </p>
      )}
    </aside>
  );
}
