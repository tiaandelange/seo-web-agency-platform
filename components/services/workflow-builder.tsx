import {
  WORKFLOW_BOTTLENECKS,
  WORKFLOW_STEPS,
} from '@/data/services-architecture';

/**
 * GET form — encodes selected steps as query params without client JS.
 * Bottleneck callouts use explicit :has rules in globals.css.
 */
export function WorkflowBuilder() {
  return (
    <form
      action="/request-a-quote/"
      method="get"
      className="workflow-builder border border-line bg-canvas p-5 sm:p-6"
    >
      <input type="hidden" name="type" value="custom-system" />
      <input type="hidden" name="service_interest" value="custom-web-applications" />

      <fieldset>
        <legend className="text-subsection-title text-ink">
          Select the steps in your current process
        </legend>
        <p className="mt-2 text-sm text-muted">
          Choose what happens today. Likely friction points appear below — not audit findings.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {WORKFLOW_STEPS.map((step) => (
            <label
              key={step.id}
              className="workflow-step-label relative inline-flex min-h-11 cursor-pointer items-center gap-2 border border-line bg-surface px-3 py-2 text-sm text-ink has-[:checked]:border-cta has-[:checked]:bg-notice"
            >
              <input
                type="checkbox"
                name="step"
                value={step.id}
                className="visually-hidden-control"
              />
              <span>{step.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="workflow-bottlenecks mt-6 space-y-3" aria-live="polite">
        {WORKFLOW_BOTTLENECKS.map((rule) => (
          <p
            key={rule.id}
            className={`workflow-bottleneck ${rule.className} hidden border-l-2 border-cta bg-notice px-3 py-2 text-sm text-ink`}
          >
            {rule.callout}
          </p>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-cta px-5 text-sm font-semibold text-cta-contrast hover:opacity-90"
      >
        Send this workflow to Koppie
      </button>
    </form>
  );
}
