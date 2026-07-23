/**
 * Central brand configuration — Koppie Systems.
 *
 * Single source of truth for every visible company detail. Nothing elsewhere in the
 * app may hardcode the business name, domain, contact details or service areas.
 *
 * Preview identity approved 2026-07-22 (docs/brand/KOPPIE-SYSTEMS-BRAND-IDENTITY.md).
 * Owner launch inputs 2026-07-22: domain, phone/WhatsApp, lead email, VAT not registered,
 * nationwide + international service policy. Registration number and final logo still open.
 * Empty contact strings remain hidden in the UI.
 */

export interface BrandContact {
  /** Empty string = not rendered. E.164 preferred for tel: links. */
  phone: string;
  /** Public display email — only rendered when verification.emailLive. */
  email: string;
  /** International format, digits only, e.g. "27614188807". Empty = WhatsApp links hidden. */
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
  /** Domain ownership confirmed and DNS live on the production host. */
  domain: boolean;
  /** Public email mailbox live and monitored. */
  emailLive: boolean;
  /** Final logo approved by owner (not provisional). */
  logoFinal: boolean;
  /** Founder biography approved for public publication. */
  founderBioApproved: boolean;
}

export interface BrandVat {
  /** True only when registered for VAT. */
  registered: boolean;
  /** VAT number when registered; empty when not applicable. */
  number: string;
}

export interface BrandConfig {
  /** Trading name shown across the site. */
  name: string;
  /** Short name for compact contexts. */
  shortName: string;
  /** Proposed registered legal name — not claimed as registered until verification.registration. */
  legalName: string;
  /** Company registration number when verified. Empty = not claimed. */
  registrationNumber: string;
  /** VAT status. */
  vat: BrandVat;
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
  /** Primary production domain (apex). Canonical host uses www when production is live. */
  primaryDomain: string;
  /** Canonical production origin (https + www). Used only when verification.domain and production env. */
  productionOrigin: string;
  /** Proposed secondary domain. */
  proposedSecondaryDomain: string;
  /** Planned public email once domain mailbox is live — never rendered while emailLive is false. */
  proposedEmail: string;
  /**
   * Lead-delivery destination (ops). Never rendered as a public mailto unless also
   * set as contact.email with emailLive. Configure via LEAD_TO_EMAIL in the host env.
   */
  leadDeliveryEmail: string;
  contact: BrandContact;
  /**
   * Physical address. null = service-area business, address omitted from schema
   * and pages (current policy: nationwide & international, no public street address).
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
  legalName: 'Koppie Systems (Pty) Ltd', // Proposed — registration number not yet verified
  registrationNumber: '',
  vat: {
    registered: false,
    number: '',
  },
  tagline: 'Built to be found. Designed to work.',
  brandPromise: 'Clear digital systems that produce practical business value.',
  positioning:
    'Koppie Systems builds SEO-first websites and practical digital systems for technical, industrial and service businesses.',
  description:
    'Koppie Systems is a Pretoria-based website-development and digital-systems company building SEO-first websites, ecommerce platforms, portals and custom business tools for clients throughout South Africa and selected international engagements.',
  fallbackSiteUrl: 'http://localhost:3000',
  primaryDomain: 'koppiesystems.co.za',
  productionOrigin: 'https://www.koppiesystems.co.za',
  proposedSecondaryDomain: 'koppiesystems.com',
  proposedEmail: 'hello@koppiesystems.co.za',
  leadDeliveryEmail: 'delangetiaanoffice@gmail.com',
  contact: {
    phone: '+27614188807',
    email: 'hello@koppiesystems.co.za',
    whatsapp: '27614188807',
  },
  address: null,
  baseCity: 'Pretoria',
  province: 'Gauteng',
  serviceAreas: ['Pretoria', 'Centurion', 'Gauteng', 'South Africa', 'International'],
  country: 'ZA',
  social: [],
  googleBusinessProfile: '',
  hours: 'Messages may be submitted at any time. We normally respond within one business day.',
  locale: 'en_ZA',
  verification: {
    registration: false,
    trademark: false,
    // Owner named the primary domain; DNS/host connection for production is still a launch gate.
    domain: false,
    // Public hello@ address published for contact; confirm mailbox monitoring before production indexing.
    emailLive: true,
    logoFinal: false,
    // Trust P0 (2026-07-23): owner directed publication of factual founder bio
    // without ECSA registration claims (ECSA wording still withheld).
    founderBioApproved: true,
  },
};

/** Site origin: env first, then fallback. No trailing slash. Never hardcodes the production domain. */
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

/** VAT notice for invoices/legal copy. */
export function vatStatusLabel(): string {
  return brand.vat.registered
    ? `VAT registered${brand.vat.number ? ` (${brand.vat.number})` : ''}`
    : 'Not VAT registered';
}
