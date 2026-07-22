import type { InspectorContent } from '@/lib/industrial-engine/inspector';

export function NodeInspector({ content }: { content: InspectorContent }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f2229] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">{content.title}</p>
      <dl className="mt-4 space-y-2">
        {content.rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 text-sm">
            <dt className="text-white/60">{row.label}</dt>
            <dd className="font-mono text-right text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
      {content.formula && (
        <pre className="engine-formula mt-4 overflow-x-auto rounded border border-white/10 bg-black/30 p-3 font-mono text-xs leading-relaxed text-teal-200/90">
          {content.formula}
        </pre>
      )}
    </div>
  );
}
