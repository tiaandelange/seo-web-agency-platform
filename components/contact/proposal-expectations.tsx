import Link from 'next/link';
import { brand, publicEmail } from '@/config/brand';
import { formatPhoneDisplay } from '@/lib/phone';

/**
 * Shared commercial expectations for contact and proposal pages.
 */
export function ProposalExpectations({ variant }: { variant: 'contact' | 'quote' }) {
  const email = publicEmail();

  return (
    <aside className="rounded-card border border-line bg-canvas p-5 sm:p-6">
      <h2 className="text-subsection-title text-ink">
        {variant === 'quote' ? 'Before you submit' : 'What to expect'}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
        <li>
          <span className="font-medium text-ink">Response. </span>
          {brand.hours}
        </li>
        <li>
          <span className="font-medium text-ink">After submission. </span>
          {variant === 'quote'
            ? 'We review requirements, ask clarifying questions if needed, then send an itemised proposal with scope and price.'
            : 'We reply with the right next step — answers, a short call, or a pointer to the proposal form for scoped work.'}
        </li>
        <li>
          <span className="font-medium text-ink">Helpful to prepare. </span>
          What you sell, who buys it, current website (if any), must-have functionality, and a rough budget band.
        </li>
        <li>
          <span className="font-medium text-ink">First discussion. </span>
          The initial scoping conversation to clarify requirements happens before you commit to a paid build — no-obligation proposal.
        </li>
        <li>
          <span className="font-medium text-ink">Suitable projects. </span>
          Business websites, catalogues, ecommerce, portals, RFQ systems and custom admin tools for technical and service businesses.
        </li>
        <li>
          <span className="font-medium text-ink">Privacy. </span>
          Your details are used only to handle the enquiry — see our{' '}
          <Link href="/legal/privacy-policy/" className="text-link underline">
            privacy policy
          </Link>
          . Consent is required on the form.
        </li>
      </ul>

      {(brand.contact.phone || brand.contact.whatsapp || email) && (
        <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
          Prefer direct contact?{' '}
          {brand.contact.phone && (
            <a href={`tel:${brand.contact.phone}`} className="text-link underline">
              {formatPhoneDisplay(brand.contact.phone)}
            </a>
          )}
          {brand.contact.phone && (brand.contact.whatsapp || email) && ' · '}
          {brand.contact.whatsapp && (
            <a
              href={`https://wa.me/${brand.contact.whatsapp}`}
              className="text-link underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          )}
          {brand.contact.whatsapp && email && ' · '}
          {email && (
            <a href={`mailto:${email}`} className="text-link underline">
              {email}
            </a>
          )}
        </p>
      )}
    </aside>
  );
}
