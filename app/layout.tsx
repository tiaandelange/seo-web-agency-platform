import type { Metadata } from 'next';
import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { brand, siteOrigin } from '@/config/brand';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { JsonLd } from '@/components/json-ld';
import { organizationSchema, websiteSchema } from '@/lib/schema';

/**
 * Fonts via next/font — latin subset only, display swap.
 * Payload kept within the project font budget (docs/technical/PERFORMANCE-BUDGET.md).
 */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  // Distinct from @theme --font-heading to avoid circular var() references.
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  // Favicon is provided by app/icon.svg (App Router file convention).
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${manrope.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className={inter.className}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
