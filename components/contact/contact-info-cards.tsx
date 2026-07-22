import Link from 'next/link';
import type { ReactNode } from 'react';
import { brand, publicEmail } from '@/config/brand';
import { formatPhoneDisplay } from '@/lib/phone';
import {
  IconArrow,
  IconClock,
  IconEmail,
  IconLocation,
  IconPhone,
  IconWhatsApp,
} from '@/components/contact/contact-icons';

function ReachRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-cta">{icon}</span>
      <div className="min-w-0">
        <p className="text-label text-muted">{label}</p>
        <div className="mt-1 text-sm text-ink">{children}</div>
      </div>
    </li>
  );
}

export function ContactReachCard() {
  const email = publicEmail();
  const hasContact = Boolean(brand.contact.phone || email || brand.contact.whatsapp);

  return (
    <article className="contact-card contact-card--reach rounded-card border border-line bg-canvas p-5 shadow-card sm:p-6">
      <h2 className="text-subsection-title text-ink">Ways to reach us</h2>
      <ul className="mt-4 space-y-3.5">
        {brand.contact.phone && (
          <ReachRow icon={<IconPhone />} label="Phone">
            <a href={`tel:${brand.contact.phone}`} className="font-medium text-link underline">
              {formatPhoneDisplay(brand.contact.phone)}
            </a>
          </ReachRow>
        )}
        {brand.contact.whatsapp && (
          <ReachRow icon={<IconWhatsApp />} label="WhatsApp">
            <a
              href={`https://wa.me/${brand.contact.whatsapp}`}
              className="font-medium text-link underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Message us directly
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
          </ReachRow>
        )}
        {email && (
          <ReachRow icon={<IconEmail />} label="Email">
            <a href={`mailto:${email}`} className="font-medium text-link underline">
              {email}
            </a>
          </ReachRow>
        )}
        {!hasContact && (
          <li className="text-sm text-muted">
            Direct telephone and email channels are being finalised — use the form below or{' '}
            <Link href="/request-a-quote/" className="text-link underline">
              request a proposal
            </Link>
            .
          </li>
        )}
        {brand.hours && (
          <ReachRow icon={<IconClock />} label="Enquiries">
            <p className="text-muted">{brand.hours}</p>
          </ReachRow>
        )}
        <ReachRow icon={<IconLocation />} label="Location">
          <p className="text-muted">
            Based in {brand.baseCity}, serving clients across Gauteng and throughout South Africa.
            International projects are considered by arrangement.
          </p>
          <p className="mt-1.5">
            <Link href="/areas-we-serve/" className="inline-flex items-center gap-1.5 font-medium text-link underline">
              Areas we serve
              <IconArrow />
            </Link>
          </p>
        </ReachRow>
      </ul>
    </article>
  );
}

export function ContactGuidanceCard() {
  return (
    <article className="contact-card contact-card--guidance rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
      <h2 className="text-subsection-title text-ink">When to use this form</h2>
      <ol className="mt-4 space-y-2.5">
        {[
          'General questions',
          'Support enquiries',
          'Existing project follow-up',
          'Small requests',
        ].map((item, i) => (
          <li key={item} className="flex gap-3 text-sm text-muted">
            <span className="font-mono text-[0.65rem] font-semibold text-link" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
        Planning a new website, ecommerce platform or business system? Use our{' '}
        <Link
          href="/request-a-quote/"
          className="inline-flex items-center gap-1.5 font-semibold text-link underline"
        >
          Request a Proposal
          <IconArrow />
        </Link>{' '}
        form so we can collect the project details needed for accurate scoping.
      </p>
    </article>
  );
}
