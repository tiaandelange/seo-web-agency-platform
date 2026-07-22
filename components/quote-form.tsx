import Link from 'next/link';
import { submitLead } from '@/lib/actions';
import {
  PROPOSAL_BUDGET_BANDS,
  PROPOSAL_SERVICE_OPTIONS,
  PROPOSAL_TIMELINES,
} from '@/data/proposal-form';

/**
 * Proposal / contact form — server-rendered, works without JavaScript.
 * Spam: honeypot + render timestamp. Consent: explicit POPIA acknowledgement.
 * Architecture: docs/technical/FORM-ARCHITECTURE.md.
 */

const inputClass =
  'min-h-11 w-full rounded-card border border-line bg-canvas px-3 py-2.5 text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link';

export function QuoteForm({
  formType = 'quote',
  defaults,
}: {
  formType?: 'quote' | 'contact';
  defaults?: {
    serviceInterest?: string;
    budgetBand?: string;
    message?: string;
    websiteUrl?: string;
  };
}) {
  const isQuote = formType === 'quote';
  const knownService =
    defaults?.serviceInterest &&
    PROPOSAL_SERVICE_OPTIONS.some((o) => o.value === defaults.serviceInterest)
      ? defaults.serviceInterest
      : '';

  return (
    <form
      action={submitLead}
      className={`proposal-form space-y-5 ${isQuote ? 'proposal-form--quote' : ''}`}
      noValidate={false}
    >
      <input type="hidden" name="form_type" value={formType} />
      <input type="hidden" name="rendered_at" value={new Date().toISOString()} />
      {/* Honeypot — hidden from humans, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`company_website_${formType}`}>Leave this field empty</label>
        <input
          id={`company_website_${formType}`}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {isQuote && (
        <h2 className="text-subsection-title text-ink">Tell us about your project</h2>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`name_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Name <span className="text-muted">(required)</span>
          </label>
          <input
            id={`name_${formType}`}
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`email_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Email <span className="text-muted">(required)</span>
          </label>
          <input
            id={`email_${formType}`}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`phone_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id={`phone_${formType}`}
            name="phone"
            type="tel"
            maxLength={50}
            autoComplete="tel"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`company_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Company <span className="text-muted">(optional)</span>
          </label>
          <input
            id={`company_${formType}`}
            name="company"
            type="text"
            maxLength={200}
            autoComplete="organization"
            className={inputClass}
          />
        </div>
      </div>

      {isQuote && (
        <>
          <div>
            <label htmlFor="website_url" className="mb-1 block text-sm font-medium text-ink">
              Current website URL <span className="text-muted">(optional)</span>
            </label>
            <input
              id="website_url"
              name="website_url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://example.co.za"
              maxLength={500}
              defaultValue={defaults?.websiteUrl ?? ''}
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="service_interest" className="mb-1 block text-sm font-medium text-ink">
                What do you need? <span className="text-muted">(required)</span>
              </label>
              <select
                id="service_interest"
                name="service_interest"
                required
                className={inputClass}
                defaultValue={knownService}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {PROPOSAL_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <div
                className="proposal-audit-notice proposal-audit-notice--basic mt-3 hidden rounded-card border border-notice-border bg-notice p-3 text-sm text-ink"
                role="status"
              >
                This service has a fixed price of R1,999.{' '}
                <Link href="/seo-audit/" className="font-semibold text-link underline">
                  View the package and check eligibility
                </Link>
                . You can still send this form if your site falls outside that scope.
              </div>
              <div
                className="proposal-audit-notice proposal-audit-notice--advanced mt-3 hidden rounded-card border border-notice-border bg-notice p-3 text-sm text-ink"
                role="status"
              >
                This service has a fixed price of R5,999 for eligible websites.{" "}
                <Link href="/seo-audit/advanced/" className="font-semibold text-link underline">
                  View the advanced audit
                </Link>
                . Continue below if you need a custom scope.
              </div>
            </div>

            <div>
              <label htmlFor="budget_band" className="mb-1 block text-sm font-medium text-ink">
                Indicative budget <span className="text-muted">(optional)</span>
              </label>
              <select
                id="budget_band"
                name="budget_band"
                className={inputClass}
                defaultValue={defaults?.budgetBand ?? ''}
              >
                <option value="">Select a range (optional)</option>
                {PROPOSAL_BUDGET_BANDS.map((band) => (
                  <option key={band} value={band}>
                    {band}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="timeline" className="mb-1 block text-sm font-medium text-ink">
                Timeline <span className="text-muted">(optional)</span>
              </label>
              <select id="timeline" name="timeline" className={inputClass} defaultValue="">
                <option value="">Select a timeline (optional)</option>
                {PROPOSAL_TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      <div>
        <label htmlFor={`message_${formType}`} className="mb-1 block text-sm font-medium text-ink">
          {isQuote ? 'Tell us about your project' : 'How can we help?'}{' '}
          <span className="text-muted">(required)</span>
        </label>
        {isQuote ? (
          <p id={`message_hint_${formType}`} className="mb-2 text-sm text-muted">
            What does your business do, what do you need built or improved, and what result are you
            hoping to achieve?
          </p>
        ) : (
          <p id={`message_hint_${formType}`} className="mb-2 text-sm text-muted">
            Ask a question, request support or tell us briefly what you need.
          </p>
        )}
        <textarea
          id={`message_${formType}`}
          name="message"
          required
          rows={5}
          maxLength={5000}
          className={inputClass}
          defaultValue={defaults?.message ?? ''}
          aria-describedby={`message_hint_${formType}`}
          placeholder={
            isQuote
              ? 'Brief context is enough — a formal brief is not required.'
              : undefined
          }
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id={`consent_${formType}`}
          name="consent"
          type="checkbox"
          required
          className="mt-3 h-4 w-4 shrink-0"
        />
        <label htmlFor={`consent_${formType}`} className="min-h-11 py-2 text-sm leading-relaxed text-muted">
          I agree that Koppie Systems may use my details to respond to and manage this enquiry, as
          described in the{' '}
          <Link href="/legal/privacy-policy/" className="text-link underline">
            privacy policy
          </Link>
          . <span className="text-muted">(Required)</span>
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center rounded-sm bg-cta px-6 py-3 font-semibold text-cta-contrast hover:opacity-90"
      >
        {isQuote ? 'Send project details' : 'Send message'}
      </button>
      <p className="text-sm text-muted">
        {isQuote
          ? 'We normally respond within one business day. No obligation and no automatic mailing-list signup. We do not sell your personal information.'
          : 'We use your information only to respond to and manage your enquiry, as explained in our privacy policy. We do not sell your personal information.'}
      </p>
    </form>
  );
}
