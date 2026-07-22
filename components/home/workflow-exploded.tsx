import Link from 'next/link';
import { HOME_WORKFLOW_STEPS } from '@/data/homepage';
import { HomeSection } from '@/components/home/home-section';

export function WorkflowExploded() {
  return (
    <HomeSection
      tone="surface"
      eyebrow="RFQ workflow · System 02"
      heading="Systems that support the work"
      headingLevel="major"
      intro="Once enquiries arrive, the same partner can build the admin layer — quotation tools, status tracking and customer records behind the public site."
    >
      <div className="home-workflow mt-12 overflow-x-auto pb-4">
        <ol className="flex min-w-[640px] gap-0">
          {HOME_WORKFLOW_STEPS.map((step, i) => (
            <li key={step.step} className="home-workflow-step relative flex-1 px-2">
              {i > 0 && (
                <span className="home-workflow-connector absolute -left-2 top-8 hidden h-px w-4 bg-cta/60 sm:block" aria-hidden="true" />
              )}
              <p className="font-mono text-xs text-cta">{step.step}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{step.title}</p>
              <div className="mt-3 border border-line bg-canvas p-3 shadow-card">
                <p className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">
                  {step.fragment}
                </p>
                {step.status && (
                  <p className="mt-2 inline-block border border-cta/30 bg-notice px-2 py-0.5 font-mono text-[0.65rem] text-cta">
                    {step.status}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-8 max-w-prose text-sm text-muted">
        Illustrative workflow — scope and modules are agreed in discovery.{' '}
        <Link href="/services/rfq-and-quotation-systems/" className="text-link underline">
          RFQ &amp; quotation systems
        </Link>{' '}
        and{' '}
        <Link href="/services/admin-panel-development/" className="text-link underline">
          admin panels
        </Link>{' '}
        are quoted separately from brochure sites.
      </p>
    </HomeSection>
  );
}
