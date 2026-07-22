/**
 * Central brand configuration — Koppie Systems.
 *
 * Single source of truth for every visible company detail. Nothing elsewhere in the
 * app may hardcode the business name, domain, contact details or service areas.
 *
 * Preview identity approved 2026-07-22 (docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md).
 * Registration, trademark and domain ownership are NOT verified — do not claim them.
 * Empty contact strings are hidden in the UI.
 */

export interface BrandContact {
  /** Empty string = not rendered. */
  phone: string;
  /** Empty until domain-owned mailbox is live. */
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

export interface BrandVerification {
  /** CIPC / company registration confirmed. */
  registration: boolean;
  /** Trademark screening / registration confirmed. */
  trademark: boolean;
  /** Domain ownership confirmed and DNS live. */
  domain: boolean;
  /** Public email mailbox live and monitored. */
  emailLive: boolean;
  /** Final logo approved by owner (not provisional). */
  logoFinal: boolean;
  /** Founder biography approved for public publication. */
  founderBioApproved: boolean;
}

export interface BrandConfig {
  /** Trading name shown across the site. */
  name: string;
  /** Short name for compact contexts. */
  shortName: string;
  /** Proposed registered legal name — not claimed as registered until verification.registration. */
  legalName: string;
  /** Marketing tagline (hero/footer). Title template uses a functional descriptor separately if needed. */
  tagline: string;
  /** Brand promise — short supporting line. */
  brandPromise: string;
  /** Primary positioning sentence. */
  positioning: string;
  /** One-sentence description used in Organization schema and default OG description. */
  description: string;
  /** Absolute origin, no trailing slash. Overridden by NEXT_PUBLIC_SITE_URL at runtime. */
  fallbackSiteUrl: string;
  /** Proposed primary domain (not canonical until verification.domain). */
  proposedPrimaryDomain: string;
  /** Proposed secondary domain. */
  proposedSecondaryDomain: string;
  /** Planned public email once domain is owned — never rendered while emailLive is false. */
  proposedEmail: string;
  contact: BrandContact;
  /**
   * Physical address. null = service-area business, address omitted from schema
   * and pages (current policy).
   */
  address: BrandAddress | null;
  /** Base city for geographic copy. */
  baseCity: string;
  /** Province. */
  province: string;
  /** Areas genuinely served, used in copy and ProfessionalService.areaServed. */
  serviceAreas: string[];
  /** Country focus. */
  country: string;
  /** Social / profile URLs for Organization.sameAs. Empty array = omitted. */
  social: string[];
  /** Google Business Profile URL once created. Empty = omitted. */
  googleBusinessProfile: string;
  /** Business hours in plain language (rendered on contact page when set). Empty = hidden. */
  hours: string;
  /** Locale for html lang and Open Graph. */
  locale: string;
  /** Verification gates — drive what may be claimed publicly. */
  verification: BrandVerification;
}

export const brand: BrandConfig = {
  name: 'Koppie Systems',
  shortName: 'Koppie',
  legalName: 'Koppie Systems (Pty) Ltd', // Proposed — not verified as registered
  tagline: 'Built to be found. Designed to work.',
  brandPromise: 'Clear digital systems that produce practical business value.',
  positioning:
    'Koppie Systems builds SEO-first websites and practical digital systems for technical, industrial and service businesses.',
  description:
    'Koppie Systems is a Pretoria-based website-development and digital-systems company building SEO-first websites, ecommerce platforms, portals and custom business tools for clients throughout South Africa.',
  fallbackSiteUrl: 'http://localhost:3000',
  proposedPrimaryDomain: 'koppiesystems.co.za',
  proposedSecondaryDomain: 'koppiesystems.com',
  proposedEmail: 'hello@koppiesystems.co.za',
  contact: {
    phone: '',
    email: '', // Render only when verification.emailLive — leave empty until domain-owned mailbox exists
    whatsapp: '',
  },
  address: null,
  baseCity: 'Pretoria',
  province: 'Gauteng',
  serviceAreas: ['Pretoria', 'Centurion', 'Gauteng', 'South Africa'],
  country: 'ZA',
  social: [],
  googleBusinessProfile: '',
  hours: '', // Confirm before publishing
  locale: 'en_ZA',
  verification: {
    registration: false,
    trademark: false,
    domain: false,
    emailLive: false,
    logoFinal: false,
    founderBioApproved: false,
  },
};

/** Site origin: env first, then fallback. No trailing slash. Never hardcodes the proposed domain. */
export function siteOrigin(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || brand.fallbackSiteUrl;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/** True only when the deployment should be indexable. */
export function isProductionSite(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === 'production';
}

/** Public email only when a live mailbox is confirmed. */
export function publicEmail(): string {
  return brand.verification.emailLive ? brand.contact.email || brand.proposedEmail : '';
}
