'use client';

import { useActionState, useMemo } from 'react';
import { assessSeoAuditEligibility } from '@/lib/seo-audit-actions';
import { initialEligibilityActionState } from '@/lib/form-action-state';
import { useEligibilitySuccessTracking } from '@/components/analytics/use-success-tracking';

const inputClass =
  'w-full rounded-card border border-line bg-canvas px-3 py-2.5 text-ink';

/**
 * Hub eligibility — routes to Priority Fix, Advanced, or custom proposal.
 * seo_audit_eligibility_complete fires only after a confirmed routing decision.
 */
export function SeoAuditEligibilityForm({
  defaultTier = 'auto',
}: {
  defaultTier?: 'auto' | 'priority-fix' | 'advanced';
}) {
  const [state, formAction, pending] = useActionState(
    assessSeoAuditEligibility,
    initialEligibilityActionState,
  );
  useEligibilitySuccessTracking(state);
  const renderedAt = useMemo(() => new Date().toISOString(), []);

  if (state.status === 'success') {
    return (
      <p className="max-w-2xl rounded-card border border-line bg-surface p-4 text-ink" role="status">
        Eligibility checked. Taking you to the next step…
      </p>
    );
  }

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <input type="hidden" name="rendered_at" value={renderedAt} />
      <input type="hidden" name="requested_tier" value={defaultTier} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website_eligibility">Leave this field empty</label>
        <input
          id="company_website_eligibility"
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === 'error' && (
        <p role="alert" className="rounded-card border border-error/40 bg-notice p-4 text-sm text-ink">
          Please answer every eligibility question, then try again.
        </p>
      )}

      <div>
        <label htmlFor="site_size" className="mb-1 block text-sm font-medium text-ink">
          Approximate crawlable URL / page count
        </label>
        <select id="site_size" name="site_size" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          <option value="up_to_10">Up to 10 pages</option>
          <option value="11_to_250">11–250 crawlable URLs</option>
          <option value="over_250">More than 250 crawlable URLs</option>
          <option value="unsure">Not sure</option>
        </select>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Is it ecommerce, a product catalogue, or multilingual / multi-country?
        </legend>
        <div className="flex flex-wrap gap-4 text-sm text-ink">
          <label className="flex items-center gap-2">
            <input type="radio" name="complex_site" value="no" required />
            No — standard brochure / service site
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="complex_site" value="ecommerce_or_catalogue" />
            Ecommerce or product catalogue (one language)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="complex_site" value="multi" />
            Multilingual, multi-country or multi-store
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Can you provide website access via your platform’s permission system?
        </legend>
        <div className="flex flex-wrap gap-4 text-sm text-ink">
          <label className="flex items-center gap-2">
            <input type="radio" name="can_provide_access" value="yes" required />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="can_provide_access" value="no" />
            No
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Is the website currently hacked, offline, under a manual Google penalty, or needing
          migration forensics / malware repair?
        </legend>
        <div className="flex flex-wrap gap-4 text-sm text-ink">
          <label className="flex items-center gap-2">
            <input type="radio" name="compromised" value="no" required />
            No
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="compromised" value="yes" />
            Yes
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Do you need content rewriting, redesign, custom development or enterprise workshops as
          part of this purchase?
        </legend>
        <div className="flex flex-wrap gap-4 text-sm text-ink">
          <label className="flex items-center gap-2">
            <input type="radio" name="wants_rewrite" value="no" required />
            No — audit and capped priority fixes only
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="wants_rewrite" value="yes" />
            Yes
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="rounded-card bg-cta px-6 py-3 font-semibold text-cta-contrast hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Checking…' : 'Check eligibility'}
      </button>
      <p className="text-sm text-muted">
        We route you to the Priority Fix Pack, the Advanced Audit, or a custom proposal — we do not
        reject the lead.
      </p>
    </form>
  );
}
