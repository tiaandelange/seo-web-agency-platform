import Link from 'next/link';
import type { SeoAuditProductId } from '@/config/seo-audit-product';
import {
  SEO_AUDIT_COMPARISON_ROWS,
  SEO_AUDIT_CUSTOM_QUOTE_PATH,
  SEO_AUDIT_HUB_PATH,
  getSeoAuditProduct,
  isSeoAuditTierActive,
  seoAuditTierPriceLabel,
  seoAuditTierPrimaryCtaExternal,
  seoAuditTierPrimaryCtaHref,
  seoAuditTierPrimaryCtaLabel,
} from '@/config/seo-audit-product';

export function SeoAuditTierCta({
  id,
  showEligibility = true,
  eligibilityHref,
  className = '',
}: {
  id: SeoAuditProductId;
  showEligibility?: boolean;
  eligibilityHref?: string;
  className?: string;
}) {
  if (!isSeoAuditTierActive(id)) {
    return (
      <p className="text-sm text-muted" role="status">
        This offer is temporarily unavailable.{' '}
        <Link href={SEO_AUDIT_CUSTOM_QUOTE_PATH} className="text-link underline">
          Request a custom SEO audit
        </Link>
        .
      </p>
    );
  }

  const href = seoAuditTierPrimaryCtaHref(id);
  const external = seoAuditTierPrimaryCtaExternal(id);
  const label = seoAuditTierPrimaryCtaLabel(id);
  const elig = eligibilityHref ?? `${getSeoAuditProduct(id).route}#eligibility`;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`.trim()}>
      {external ? (
        <a
          href={href}
          className="rounded-card bg-cta px-5 py-3 text-sm font-semibold text-cta-contrast hover:opacity-90"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <Link
          href={href}
          className="rounded-card bg-cta px-5 py-3 text-sm font-semibold text-cta-contrast hover:opacity-90"
        >
          {label}
        </Link>
      )}
      {showEligibility && (
        <a
          href={elig}
          className="rounded-card border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-surface"
        >
          Check Website Eligibility
        </a>
      )}
    </div>
  );
}

/** Desktop table + mobile stacked cards — same data source. */
export function SeoAuditComparison() {
  const basic = getSeoAuditProduct('priority-fix');
  const advanced = getSeoAuditProduct('advanced');

  return (
    <div>
      {/* Mobile: stacked cards */}
      <div className="grid gap-6 md:hidden">
        <article className="rounded-card border border-line bg-canvas p-5 shadow-card">
          <h3 className="text-lg font-semibold text-ink">{basic.name}</h3>
          <p className="mt-1 text-base font-medium text-ink">{seoAuditTierPriceLabel('priority-fix')}</p>
          <dl className="mt-4 space-y-3 text-sm">
            {SEO_AUDIT_COMPARISON_ROWS.map((row) => (
              <div key={row.feature}>
                <dt className="font-medium text-ink">{row.feature}</dt>
                <dd className="text-muted">{row.basic}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <SeoAuditTierCta id="priority-fix" eligibilityHref={`${SEO_AUDIT_HUB_PATH}#eligibility`} />
          </div>
        </article>
        <article className="rounded-card border border-line bg-canvas p-5 shadow-card">
          <h3 className="text-lg font-semibold text-ink">{advanced.name}</h3>
          <p className="mt-1 text-base font-medium text-ink">{seoAuditTierPriceLabel('advanced')}</p>
          <dl className="mt-4 space-y-3 text-sm">
            {SEO_AUDIT_COMPARISON_ROWS.map((row) => (
              <div key={row.feature}>
                <dt className="font-medium text-ink">{row.feature}</dt>
                <dd className="text-muted">{row.advanced}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <SeoAuditTierCta id="advanced" />
            <p className="mt-3 text-sm">
              <Link href={advanced.route} className="text-link underline">
                Full advanced audit details →
              </Link>
            </p>
          </div>
        </article>
      </div>

      {/* Desktop: comparison table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full max-w-5xl border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-line text-left">
              <th scope="col" className="py-3 pr-4 font-semibold text-ink">
                Feature
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold text-ink">
                {basic.shortName}
              </th>
              <th scope="col" className="py-3 font-semibold text-ink">
                {advanced.shortName}
              </th>
            </tr>
          </thead>
          <tbody>
            {SEO_AUDIT_COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className="border-b border-line align-top">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink">
                  {row.feature}
                </th>
                <td className="py-3 pr-4 text-muted">{row.basic}</td>
                <td className="py-3 text-muted">{row.advanced}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 grid max-w-5xl gap-4 sm:grid-cols-2">
          <SeoAuditTierCta id="priority-fix" eligibilityHref={`${SEO_AUDIT_HUB_PATH}#eligibility`} />
          <div>
            <SeoAuditTierCta id="advanced" />
            <p className="mt-2 text-sm">
              <Link href={advanced.route} className="text-link underline">
                Full advanced audit details →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Prefer SeoAuditTierCta */
export function SeoAuditCtaGroup(props: { showSecondary?: boolean; className?: string }) {
  return (
    <SeoAuditTierCta
      id="priority-fix"
      showEligibility={props.showSecondary !== false}
      className={props.className}
    />
  );
}

/** @deprecated Prefer seoAuditTierPriceLabel */
export function SeoAuditPriceBadge({ id = 'priority-fix' }: { id?: SeoAuditProductId }) {
  return (
    <p className="text-2xl font-bold text-ink">
      {seoAuditTierPriceLabel(id)}
      <span className="mt-1 block text-sm font-normal text-muted">No monthly retainer</span>
    </p>
  );
}
