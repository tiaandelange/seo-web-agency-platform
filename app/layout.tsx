import type { Metadata, Viewport } from 'next';
import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { brand, siteOrigin } from '@/config/brand';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BackToTop } from '@/components/back-to-top';
import { JsonLd } from '@/components/json-ld';
import { AnalyticsProvider } from '@/components/analytics/analytics-provider';
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
  applicationName: brand.name,
  creator: brand.name,
  publisher: brand.name,
  // Favicon: app/icon.svg + app/favicon.ico. Apple: public/apple-touch-icon.png
  // (file-convention /apple-icon breaks under trailingSlash). Social: opengraph/twitter images.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#14242b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

  return (
    <html lang="en-ZA" className={`${manrope.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className={inter.className}>
        <AnalyticsProvider measurementId={gaMeasurementId}>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <BackToTop />
          <JsonLd data={[organizationSchema(), websiteSchema()]} />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
