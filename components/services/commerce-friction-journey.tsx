import { COMMERCE_FRICTION_STEPS } from '@/data/ecommerce-service-proof';

const DEFAULT = COMMERCE_FRICTION_STEPS[0]?.id ?? 'discovery';

export function CommerceFrictionJourney() {
  return (
    <div className="commerce-friction">
      {COMMERCE_FRICTION_STEPS.map((step) => (
        <input
          key={`fr-${step.id}`}
          type="radio"
          name="commerce-friction"
          id={`friction-${step.id}`}
          value={step.id}
          defaultChecked={step.id === DEFAULT}
          className={`visually-hidden-control friction-radio friction-radio-${step.id}`}
        />
      ))}

      <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {COMMERCE_FRICTION_STEPS.map((step, i) => (
          <li key={step.id} className="flex items-center gap-2">
            <label
              htmlFor={`friction-${step.id}`}
              className={`friction-label friction-label-${step.id} inline-flex min-h-11 cursor-pointer items-center border border-line bg-canvas px-3 py-2 font-mono text-xs text-muted`}
            >
              {step.label}
            </label>
            {i < COMMERCE_FRICTION_STEPS.length - 1 && (
              <span className="hidden text-cta sm:inline" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6">
        {COMMERCE_FRICTION_STEPS.map((step) => (
          <article
            key={step.id}
            className={`friction-panel friction-panel-${step.id} border-l-2 border-warning bg-notice px-4 py-3`}
          >
            <p className="text-label text-warning">Friction / {step.label}</p>
            <p className="mt-2 text-sm text-ink">{step.friction}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
