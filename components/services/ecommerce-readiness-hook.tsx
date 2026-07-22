import {
  ECOMMERCE_CLASSIFICATIONS,
  ECOMMERCE_READINESS_QUESTIONS,
} from '@/data/ecommerce-service-proof';

/**
 * GET form readiness check — classifications via CSS :has rules.
 * Planning language only; not a binding quote.
 */
export function EcommerceReadinessHook() {
  return (
    <form
      action="/request-a-quote/"
      method="get"
      className="ecommerce-readiness border border-line bg-canvas p-5 sm:p-6"
    >
      <input type="hidden" name="type" value="ecommerce" />
      <input type="hidden" name="service_interest" value="ecommerce-websites" />

      <p className="text-label text-cta">Ecommerce readiness check</p>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Answer a few planning questions. We show a likely architecture class — indicative only —
        then you can send it with your enquiry.
      </p>

      <div className="mt-6 space-y-6">
        {ECOMMERCE_READINESS_QUESTIONS.map((q) => (
          <fieldset key={q.id}>
            <legend className="text-sm font-medium text-ink">{q.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-line bg-surface px-3 py-2 text-sm text-ink has-[:checked]:border-cta has-[:checked]:bg-notice"
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    className="visually-hidden-control"
                    defaultChecked={opt === q.options[0]}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 space-y-3" aria-live="polite">
        {ECOMMERCE_CLASSIFICATIONS.map((c) => (
          <div
            key={c.id}
            className={`commerce-class ${c.className} hidden border-l-2 border-link bg-surface px-4 py-3`}
          >
            <p className="text-label text-link">{c.label}</p>
            <p className="mt-2 text-sm text-ink">{c.summary}</p>
            <p className="mt-2 text-xs text-muted">
              Planning classification only — not a fixed quote or guarantee.
            </p>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-cta px-5 text-sm font-semibold text-cta-contrast hover:opacity-90"
      >
        Scope this ecommerce build
      </button>
    </form>
  );
}
