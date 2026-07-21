import Link from 'next/link';
import { brand } from '@/config/brand';
import { footerColumns, footerLegal } from '@/data/navigation';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const hasContact = brand.contact.phone || brand.contact.email || brand.contact.whatsapp;

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {brand.contact.phone && (
                <li>
                  <a href={`tel:${brand.contact.phone}`} className="hover:text-ink">
                    {brand.contact.phone}
                  </a>
                </li>
              )}
              {brand.contact.email && (
                <li>
                  <a href={`mailto:${brand.contact.email}`} className="hover:text-ink">
                    {brand.contact.email}
                  </a>
                </li>
              )}
              {brand.contact.whatsapp && (
                <li>
                  <a href={`https://wa.me/${brand.contact.whatsapp}`} className="hover:text-ink">
                    WhatsApp us
                  </a>
                </li>
              )}
              {!hasContact && <li>Contact details coming soon.</li>}
              <li className="pt-2">Serving {brand.serviceAreas.slice(0, 3).join(', ')} and clients across South Africa.</li>
            </ul>
          </div>
        </nav>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {footerLegal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
