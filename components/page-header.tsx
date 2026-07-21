/**
 * Page header — enforces exactly one H1 per page. Every page renders its H1
 * through this component (docs/architecture/PAGE-TEMPLATES.md baseline).
 */
export function PageHeader({
  heading,
  intro,
  updated,
}: {
  heading: string;
  intro?: string;
  updated?: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-4 pt-6">
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {heading}
      </h1>
      {intro && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{intro}</p>}
      {updated && (
        <p className="mt-3 text-sm text-muted">
          Updated{' '}
          {new Date(updated).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}
        </p>
      )}
    </div>
  );
}
