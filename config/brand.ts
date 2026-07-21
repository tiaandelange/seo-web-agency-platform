/**
 * Central brand configuration.
 *
 * Single source of truth for every visible company detail. Nothing elsewhere in the
 * app may hardcode the business name, domain, contact details or service areas.
 *
 * WORKING BRAND: "Meridian Web Systems" is a TEMPORARY placeholder
 * (see docs/business/NAME-SHORTLIST.md). Replace the values below once the final
 * name, domain and contact details are confirmed (docs/REQUIRED-USER-INPUTS.md).
 */

export interface BrandContact {
  /** PLACEHOLDER until verified. Empty string = not rendered. */
  phone: string;
  /** PLACEHOLDER until verified. */
  email: string;
  /** International format, digits only, e.g. "27821234567". Empty = WhatsApp links hidden. */
  whatsapp: string;
}

export interface BrandAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface BrandConfig {
  /** Trading name shown across the site. */
  name: string;
  /** Registered legal name once incorporated. */
  legalName: string;
  /** Short strapline used in the default title template and footer. */
  tagline: string;
  /** One-sentence description used in Organization schema and default OG description. */
  description: string;
  /** Absolute origin, no trailing slash. Overridden by NEXT_PUBLIC_SITE_URL at runtime. */
  fallbackSiteUrl: string;
  contact: BrandContact;
  /**
   * Physical address. null = service-area business, address omitted from schema
   * and pages (current state — owner decision #4).
   */
  address: BrandAddress | null;
  /** Areas genuinely served, used in copy and ProfessionalService.areaServed. */
  serviceAreas: string[];
  /** Country focus. */
  country: string;
  /** Social / profile URLs for Organization.sameAs. Empty array = omitted. */
  social: string[];
  /** Google Business Profile URL once created. Empty = omitted. */
  googleBusinessProfile: string;
  /** Business hours in plain language (rendered on contact page when set). */
  hours: string;
  /** Locale for html lang and Open Graph. */
  locale: string;
}

export const brand: BrandConfig = {
  name: 'Meridian Web Systems',
  legalName: 'Meridian Web Systems (Pty) Ltd', // PLACEHOLDER — not registered
  tagline: 'SEO-first websites & business systems',
  description:
    'South African web development company building SEO-first business websites, ' +
    'product catalogue and ecommerce websites, and custom admin, quotation and portal systems.',
  fallbackSiteUrl: 'http://localhost:3000',
  contact: {
    phone: '', // PLACEHOLDER — add verified number before launch
    email: '', // PLACEHOLDER — add verified address before launch
    whatsapp: '', // PLACEHOLDER
  },
  address: null, // Service-area business until an address is confirmed
  serviceAreas: ['Pretoria', 'Johannesburg', 'Centurion', 'Gauteng', 'South Africa'],
  country: 'ZA',
  social: [], // e.g. 'https://www.linkedin.com/company/…' once created
  googleBusinessProfile: '',
  hours: 'Monday to Friday, 08:00–17:00', // PLACEHOLDER — confirm
  locale: 'en_ZA',
};

/** Site origin: env first, then fallback. No trailing slash. */
export function siteOrigin(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || brand.fallbackSiteUrl;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/** True only when the deployment should be indexable. */
export function isProductionSite(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === 'production';
}
