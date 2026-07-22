import Link from 'next/link';
import { brand, publicEmail } from '@/config/brand';
import { footerColumns, footerLegal } from '@/data/navigation';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const email = publicEmail();
  const hasContact = Boolean(brand.contact.phone || email || brand.contact.whatsapp);

  return (
    <footer className="mt-16 border-t border-line bg-ink text-accent-contrast">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-sandstone">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-accent-contrast/80 hover:text-accent-contrast">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sandstone">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm text-accent-contrast/80">
              {brand.contact.phone && (
                <li>
                  <a href={`tel:${brand.contact.phone}`} className="hover:text-accent-contrast">
                    {brand.contact.phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-accent-contrast">
                    {email}
                  </a>
                </li>
              )}
              {brand.contact.whatsapp && (
                <li>
                  <a href={`https://wa.me/${brand.contact.whatsapp}`} className="hover:text-accent-contrast">
                    WhatsApp us
                  </a>
                </li>
              )}
              {!hasContact && (
                <li>
                  <Link href="/request-a-quote/" className="hover:text-accent-contrast">
                    Request a proposal
                  </Link>
                </li>
              )}
              <li className="pt-2 text-sandstone">
                Based in {brand.baseCity}, serving businesses throughout South Africa and selected
                international engagements.
              </li>
              <li className="text-xs text-accent-contrast/60">{brand.tagline}</li>
            </ul>
          </div>
        </nav>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-accent-contrast/70 sm:flex-row">
          <p>
            © {year} {brand.name}. All rights reserved.
            {!brand.verification.registration && (
              <span className="block text-xs text-accent-contrast/50 sm:inline sm:before:content-['_|_']">
                Trading name for preview — company registration not yet verified.
              </span>
            )}
          </p>
          <ul className="flex flex-wrap gap-4">
            {footerLegal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent-contrast">
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
