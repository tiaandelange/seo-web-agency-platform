import Link from 'next/link';
import { submitSeoAuditIntake } from '@/lib/seo-audit-actions';
import type { SeoAuditProductId } from '@/config/seo-audit-product';
import {
  getSeoAuditProduct,
  isSeoAuditTierCheckoutConfigured,
  seoAuditTierPriceLabel,
} from '@/config/seo-audit-product';

const inputClass =
  'w-full rounded-card border border-line bg-canvas px-3 py-2.5 text-ink placeholder:text-muted';

export function SeoAuditIntakeForm({
  tier = 'priority-fix',
  showPaymentRef = false,
}: {
  tier?: SeoAuditProductId;
  showPaymentRef?: boolean;
}) {
  const product = getSeoAuditProduct(tier);
  const isAdvanced = tier === 'advanced';
  const checkoutReady = isSeoAuditTierCheckoutConfigured(tier);

  return (
    <form action={submitSeoAuditIntake} className="max-w-2xl space-y-5">
      <input type="hidden" name="rendered_at" value={new Date().toISOString()} />
      <input type="hidden" name="product_tier" value={tier} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`company_website_intake_${tier}`}>Leave this field empty</label>
        <input
          id={`company_website_intake_${tier}`}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="rounded-card border border-line bg-surface px-4 py-3 text-sm text-muted">
        Pack: {product.name} — {seoAuditTierPriceLabel(tier)}. Do not enter passwords, card numbers
        or Google account credentials. Invite us through CMS, hosting or Search Console permissions.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`name_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Your name (required)
          </label>
          <input id={`name_${tier}`} name="name" type="text" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`company_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Company
          </label>
          <input id={`company_${tier}`} name="company" type="text" maxLength={200} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor={`website_url_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Website URL (required)
        </label>
        <input
          id={`website_url_${tier}`}
          name="website_url"
          type="url"
          required
          placeholder="https://"
          maxLength={500}
          className={inputClass}
        />
      </div>

      {isAdvanced && (
        <div>
          <label htmlFor={`sitemap_url_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Sitemap URL (if available)
          </label>
          <input id={`sitemap_url_${tier}`} name="sitemap_url" type="url" maxLength={500} className={inputClass} />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`email_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Email (required)
          </label>
          <input id={`email_${tier}`} name="email" type="email" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`phone_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Telephone
          </label>
          <input id={`phone_${tier}`} name="phone" type="tel" maxLength={50} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor={`primary_services_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Primary services or product categories (required)
        </label>
        <textarea
          id={`primary_services_${tier}`}
          name="primary_services"
          required
          rows={3}
          maxLength={1000}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`service_areas_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Important service areas
        </label>
        <input id={`service_areas_${tier}`} name="service_areas" type="text" maxLength={500} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`website_platform_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Website platform / CMS
          </label>
          <input
            id={`website_platform_${tier}`}
            name="website_platform"
            type="text"
            placeholder="WordPress, Shopify, custom, etc."
            maxLength={200}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`page_count_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Approximate page / URL count
          </label>
          <select
            id={`page_count_${tier}`}
            name="page_count"
            className={inputClass}
            defaultValue={isAdvanced ? '11_to_250' : 'up_to_10'}
          >
            <option value="up_to_10">Up to 10</option>
            <option value="11_to_250">11–250</option>
            <option value="over_250">More than 250</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`seo_concern_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Primary SEO concern (required)
        </label>
        <textarea
          id={`seo_concern_${tier}`}
          name="seo_concern"
          required
          rows={4}
          maxLength={5000}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`gsc_available_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Google Search Console access{isAdvanced ? ' (required)' : ''}
        </label>
        <select
          id={`gsc_available_${tier}`}
          name="gsc_available"
          className={inputClass}
          defaultValue={isAdvanced ? 'invite_pending' : 'unsure'}
          required={isAdvanced}
        >
          <option value="yes">Yes — I can invite limited access</option>
          <option value="invite_pending">I will invite access after submitting</option>
          {!isAdvanced && <option value="no">No</option>}
          {!isAdvanced && <option value="unsure">Not sure</option>}
        </select>
      </div>

      {isAdvanced && (
        <div>
          <label htmlFor={`ga4_available_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            GA4 access available?
          </label>
          <select id={`ga4_available_${tier}`} name="ga4_available" className={inputClass} defaultValue="unsure">
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor={`gbp_url_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Google Business Profile URL (if any)
        </label>
        <input id={`gbp_url_${tier}`} name="gbp_url" type="url" maxLength={500} className={inputClass} />
      </div>

      {isAdvanced && (
        <div>
          <label htmlFor={`competitors_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Up to 3 organic competitors (URLs or names)
          </label>
          <textarea id={`competitors_${tier}`} name="competitors" rows={3} maxLength={1000} className={inputClass} />
        </div>
      )}

      <div>
        <label htmlFor={`priority_pages_${tier}`} className="mb-1 block text-sm font-medium text-ink">
          Preferred priority pages (URLs or labels)
        </label>
        <textarea
          id={`priority_pages_${tier}`}
          name="priority_pages"
          rows={3}
          maxLength={1000}
          className={inputClass}
        />
      </div>

      {(showPaymentRef || checkoutReady) && (
        <div>
          <label htmlFor={`payment_reference_${tier}`} className="mb-1 block text-sm font-medium text-ink">
            Payment / order reference (if already paid)
          </label>
          <input
            id={`payment_reference_${tier}`}
            name="payment_reference"
            type="text"
            maxLength={100}
            className={inputClass}
          />
        </div>
      )}

      <div className="space-y-3 text-sm text-ink">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="change_permission" className="mt-1" required />
          <span>I authorise Koppie Systems to make the included priority fixes within the fixed scope.</span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="backup_confirmed" className="mt-1" required />
          <span>I confirm a current website backup exists (or hosting backups are enabled).</span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" className="mt-1" required />
          <span>
            I consent to Koppie Systems processing this information to deliver the SEO audit under
            the{' '}
            <Link href="/legal/privacy-policy/" className="text-link underline">
              privacy policy
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="rounded-card bg-cta px-6 py-3 font-semibold text-cta-contrast hover:opacity-90"
      >
        Submit {product.shortName} intake
      </button>
    </form>
  );
}
