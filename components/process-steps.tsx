/**
 * Process steps — shared by /process/ (full) and other pages (excerpt).
 */
export interface ProcessStep {
  name: string;
  summary: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    name: 'Discovery & scoping',
    summary:
      'We understand your business, customers and goals, then agree scope, inclusions and a fixed quote.',
  },
  {
    name: 'SEO architecture',
    summary:
      'Search research becomes a keyword-to-page map: which pages exist, what each targets, how they connect.',
  },
  {
    name: 'Build',
    summary:
      'Structure first, then working pages you can review — fast, semantic, mobile-first, measured against performance budgets.',
  },
  {
    name: 'Content & QA',
    summary:
      'Content loads into the structure; every page passes the on-page checklist before it ships.',
  },
  {
    name: 'Launch',
    summary:
      'Domain, redirects where relevant, Search Console verification, sitemap submission and a documented handover.',
  },
  {
    name: 'Measure & support',
    summary:
      'Indexation monitoring, real query data and — if you choose a plan — ongoing care and improvement.',
  },
];

export function ProcessSteps({ steps = PROCESS_STEPS }: { steps?: ProcessStep[] }) {
  return (
    <ol className="grid max-w-4xl gap-4 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={step.name} className="rounded-card border border-line bg-canvas p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Step {i + 1}</p>
          <h3 className="mt-1 text-base font-semibold text-ink">{step.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.summary}</p>
        </li>
      ))}
    </ol>
  );
}
