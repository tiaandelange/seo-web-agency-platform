import { WORKFLOW_DEMOS, type WorkflowDemo } from '@/data/workflow-demos';
import { Container } from '@/components/layout/container';

export function IllustrativeWorkflow({
  workflowId,
}: {
  workflowId: WorkflowDemo['id'];
}) {
  const workflow = WORKFLOW_DEMOS[workflowId];

  return (
    <section
      className="border-b border-line bg-surface"
      aria-labelledby={`workflow-${workflow.id}-heading`}
    >
      <Container className="py-14 md:py-20">
        <p className="text-label text-cta">{workflow.label}</p>
        <h2 id={`workflow-${workflow.id}-heading`} className="text-section-title mt-2 text-ink">
          {workflow.heading}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{workflow.intro}</p>

        <ol className="illustrative-workflow mt-10">
          {workflow.steps.map((step, index) => (
            <li key={step.id} className="illustrative-workflow__step">
              <div className="illustrative-workflow__marker" aria-hidden="true">
                <span className="illustrative-workflow__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {index < workflow.steps.length - 1 && (
                  <span className="illustrative-workflow__connector" />
                )}
              </div>
              <div className="illustrative-workflow__body">
                <h3 className="text-card-title text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
