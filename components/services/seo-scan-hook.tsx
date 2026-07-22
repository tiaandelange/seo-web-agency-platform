import Link from 'next/link';
import { SEO_SCAN_STAGES } from '@/data/seo-service-proof';

const DEFAULT = SEO_SCAN_STAGES[0]?.id ?? 'architecture';

/**
 * Preview-only architecture scan — not a live crawl.
 * Domain field is illustrative; CTA uses a static GET to the real audit product.
 */
export function SeoScanHook() {
  return (
    <section
      className="seo-scan-hook border-b border-line bg-surface"
      aria-labelledby="seo-scan-heading"
    >
      <div className="koppie-container py-14 md:py-16">
        <p className="text-label text-cta">Technical site scan · preview</p>
        <h2 id="seo-scan-heading" className="text-section-title mt-2 max-w-2xl text-ink">
          See the checks an architecture audit covers
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          This module is a staged preview of audit themes — it does not crawl your website. For a
          real inspection, use the fixed-price SEO audit packs.
        </p>

        <div className="seo-scan-root mt-8 grid gap-8 lg:grid-cols-12">
          {SEO_SCAN_STAGES.map((stage) => (
            <input
              key={`scan-${stage.id}`}
              type="radio"
              name="seo-scan-stage"
              id={`seo-scan-${stage.id}`}
              value={stage.id}
              defaultChecked={stage.id === DEFAULT}
              className={`visually-hidden-control seo-scan-radio seo-scan-radio-${stage.id}`}
            />
          ))}

          <div className="lg:col-span-4">
            <label htmlFor="seo-demo-domain" className="text-sm font-medium text-ink">
              Demo domain (illustrative)
            </label>
            <input
              id="seo-demo-domain"
              type="text"
              readOnly
              value="example-business.co.za"
              className="mt-2 w-full border border-line bg-canvas px-3 py-2.5 text-sm text-muted"
            />
            <fieldset className="mt-5">
              <legend className="sr-only">Scan stage</legend>
              <div className="flex flex-col gap-1">
                {SEO_SCAN_STAGES.map((stage) => (
                  <label
                    key={stage.id}
                    htmlFor={`seo-scan-${stage.id}`}
                    className={`seo-scan-label seo-scan-label-${stage.id} flex min-h-11 cursor-pointer items-center border-l-2 border-transparent px-3 py-2.5 text-sm text-muted`}
                  >
                    {stage.label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-8">
            {SEO_SCAN_STAGES.map((stage) => (
              <article
                key={stage.id}
                className={`seo-scan-panel seo-scan-panel-${stage.id} border border-line bg-canvas p-5`}
              >
                <p className="text-label text-muted">
                  Illustrative workflow demo — not a live crawl
                </p>
                <h3 className="text-subsection-title mt-2 text-ink">{stage.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">{stage.finding}</p>
                <p className="mt-2 text-sm text-muted">{stage.note}</p>
              </article>
            ))}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/seo-audit/"
                className="inline-flex min-h-11 items-center rounded-sm bg-cta px-4 text-sm font-semibold text-cta-contrast hover:opacity-90"
              >
                Request the complete architecture audit
              </Link>
              <Link
                href="/request-a-quote/?type=seo-website&service_interest=seo-website-development"
                className="inline-flex min-h-11 items-center rounded-sm border border-line px-4 text-sm font-semibold text-ink hover:border-muted"
              >
                Discuss an SEO-first build
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
