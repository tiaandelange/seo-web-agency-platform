import { SEO_AUDIT_ISSUES } from '@/data/seo-service-proof';

const DEFAULT = SEO_AUDIT_ISSUES[0]?.id ?? 'duplicate-intent';

export function SeoAuditSimulation() {
  return (
    <div className="seo-audit-sim">
      {SEO_AUDIT_ISSUES.map((issue) => (
        <input
          key={`radio-${issue.id}`}
          type="radio"
          name="seo-audit-issue"
          id={`seo-issue-${issue.id}`}
          value={issue.id}
          defaultChecked={issue.id === DEFAULT}
          className={`visually-hidden-control seo-issue-radio seo-issue-radio-${issue.id}`}
        />
      ))}

      <div className="grid gap-6 lg:grid-cols-12">
        <fieldset className="lg:col-span-5">
          <legend className="text-label text-cta">Diagnostic scan (sample)</legend>
          <div className="mt-3 flex flex-col gap-1">
            {SEO_AUDIT_ISSUES.map((issue) => (
              <label
                key={issue.id}
                htmlFor={`seo-issue-${issue.id}`}
                className={`seo-issue-label seo-issue-label-${issue.id} flex min-h-11 cursor-pointer items-center border-l-2 border-transparent px-3 py-3 text-sm font-medium text-muted`}
              >
                {issue.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="lg:col-span-7">
          {SEO_AUDIT_ISSUES.map((issue) => (
            <article
              key={issue.id}
              className={`seo-issue-panel seo-issue-panel-${issue.id} border border-line bg-canvas p-5`}
            >
              <p className="text-label text-muted">Illustrative workflow demo — sample findings</p>
              <h3 className="text-card-title mt-2 text-ink">{issue.label}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-cta">
                    Why it matters
                  </dt>
                  <dd className="mt-1 text-muted">{issue.why}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-cta">
                    What is affected
                  </dt>
                  <dd className="mt-1 text-muted">{issue.affected}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-link">
                    Recommended action
                  </dt>
                  <dd className="mt-1 text-ink">{issue.action}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
