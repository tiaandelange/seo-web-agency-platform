export function FlowStrip({
  steps,
  orientation = 'horizontal',
}: {
  steps: string[];
  orientation?: 'horizontal' | 'vertical';
}) {
  if (orientation === 'vertical') {
    return (
      <ol className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <div className="flex w-4 flex-col items-center">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-link" aria-hidden />
              {i < steps.length - 1 && (
                <span className="min-h-6 w-px flex-1 bg-link/40" aria-hidden />
              )}
            </div>
            <span className="pb-4 font-mono text-xs text-ink">{step}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2 font-mono text-xs">
          <span className="border border-line bg-canvas px-2 py-1.5 text-ink">{step}</span>
          {i < steps.length - 1 && (
            <span className="hidden text-cta sm:inline" aria-hidden>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
