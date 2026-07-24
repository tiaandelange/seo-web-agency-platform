/**
 * Shared analytics enums — safe to import from server or client modules.
 * Keep free of browser / gtag imports.
 */

export type AnalyticsConsent = 'unknown' | 'granted' | 'denied';

export type KoppieAnalyticsEvent =
  | 'generate_lead'
  | 'contact_click'
  | 'seo_audit_eligibility_complete';

export type LeadFormId = 'contact' | 'request_quote' | 'seo_audit_intake';

export type ContactMethod = 'phone' | 'email' | 'whatsapp';

export type LinkLocation =
  | 'header'
  | 'footer'
  | 'contact_page'
  | 'pricing_page'
  | 'service_page'
  | 'seo_audit_page'
  | 'request_quote_page'
  | 'general_cta';

export type AuditRoute =
  | 'priority_fix_pack'
  | 'advanced_audit'
  | 'custom_proposal'
  | 'other';

export const ANALYTICS_CONSENT_KEY = 'koppie_analytics_consent';
