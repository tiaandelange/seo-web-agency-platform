import Link from 'next/link';
import { submitLead } from '@/lib/actions';
import { services } from '@/data/services';

/**
 * Quote-request form — server-rendered, works without JavaScript.
 * Spam: honeypot + render timestamp. Consent: explicit POPIA acknowledgement.
 * Architecture: docs/technical/FORM-ARCHITECTURE.md.
 */

const BUDGET_BANDS = [
  'Under R15,000',
  'R15,000 – R30,000',
  'R30,000 – R60,000',
  'R60,000 – R120,000',
  'Over R120,000',
  'Not sure yet',
];

const TIMELINES = ['As soon as possible', 'Within 1–2 months', 'Within 3–6 months', 'Just researching'];

const inputClass =
  'w-full rounded-card border border-line bg-canvas px-3 py-2.5 text-ink placeholder:text-muted';

export function QuoteForm({ formType = 'quote' }: { formType?: 'quote' | 'contact' }) {
  const isQuote = formType === 'quote';

  return (
    <form action={submitLead} className="max-w-2xl space-y-5">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`name_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Your name (required)
          </label>
          <input id={`name_${formType}`} name="name" type="text" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`email_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Email address (required)
          </label>
          <input id={`email_${formType}`} name="email" type="email" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`phone_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Phone (optional)
          </label>
          <input id={`phone_${formType}`} name="phone" type="tel" maxLength={50} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`company_${formType}`} className="mb-1 block text-sm font-medium text-ink">
            Company (optional)
          </label>
          <input id={`company_${formType}`} name="company" type="text" maxLength={200} className={inputClass} />
        </div>
      </div>

      {isQuote && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="service_interest" className="mb-1 block text-sm font-medium text-ink">
              What do you need?
            </label>
            <select id="service_interest" name="service_interest" className={inputClass} defaultValue="">
              <option value="">Select a service (optional)</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.heading}
                </option>
              ))}
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget_band" className="mb-1 block text-sm font-medium text-ink">
              Indicative budget (optional)
            </label>
            <select id="budget_band" name="budget_band" className={inputClass} defaultValue="">
              <option value="">Select a range (optional)</option>
              {BUDGET_BANDS.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="timeline" className="mb-1 block text-sm font-medium text-ink">
              Timeline (optional)
            </label>
            <select id="timeline" name="timeline" className={inputClass} defaultValue="">
              <option value="">Select a timeline (optional)</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`message_${formType}`} className="mb-1 block text-sm font-medium text-ink">
          {isQuote ? 'Tell us about your project (required)' : 'Your message (required)'}
        </label>
        <textarea
          id={`message_${formType}`}
          name="message"
          required
          rows={5}
          maxLength={5000}
          className={inputClass}
        />
      </div>

      <div className="flex items-start gap-3">
        <input id={`consent_${formType}`} name="consent" type="checkbox" required className="mt-1 h-4 w-4" />
        <label htmlFor={`consent_${formType}`} className="text-sm leading-relaxed text-muted">
          I consent to my details being used to respond to this enquiry, as described in the{' '}
          <Link href="/legal/privacy-policy/" className="text-accent underline">
            privacy policy
          </Link>
          . (Required)
        </label>
      </div>

      <button
        type="submit"
        className="rounded-card bg-accent px-6 py-3 font-semibold text-accent-contrast hover:opacity-90"
      >
        {isQuote ? 'Send quote request' : 'Send message'}
      </button>
      <p className="text-sm text-muted">
        We aim to respond within one business day. Your details are never shared or sold.
      </p>
    </form>
  );
}
