import { SEO_METHOD_STAGES } from '@/data/seo-service-proof';
import { FlowStrip } from '@/components/systems/flow-strip';

export function SeoMethodTimeline() {
  return (
    <div>
      <FlowStrip steps={SEO_METHOD_STAGES.map((s) => s.label)} />
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SEO_METHOD_STAGES.map((stage) => (
          <li key={stage.id} className="border-l-2 border-link/40 pl-4">
            <p className="text-label text-cta">
              {stage.index} / {stage.label}
            </p>
            <p className="mt-2 font-mono text-xs text-link">{stage.artefact}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{stage.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
