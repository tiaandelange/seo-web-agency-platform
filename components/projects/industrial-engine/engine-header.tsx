export function EngineHeader({
  engineStatusLabel,
}: {
  engineStatusLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cta">
          Interactive demonstration · Simulated data
        </p>
        <h2 id="engine-heading" className="projects-heading-functional mt-2 text-white">
          Industrial Engine Preview
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
          Launch a simulated project enquiry through a configurable RFQ, calculation and quotation
          workflow.
        </p>
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
        Engine status · {engineStatusLabel}
      </p>
    </div>
  );
}
