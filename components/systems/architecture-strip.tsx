import { ARCHITECTURE_LAYERS } from '@/data/services-architecture';

export function ArchitectureStrip() {
  return (
    <dl className="architecture-strip grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9 xl:gap-3">
      {ARCHITECTURE_LAYERS.map((layer, i) => (
        <div
          key={layer.id}
          className="relative border-l-2 border-link/40 pl-3 xl:border-l-0 xl:border-t-2 xl:pt-3"
        >
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-cta">
            {String(i + 1).padStart(2, '0')} / {layer.label}
          </dt>
          <dd className="mt-1 text-sm leading-snug text-muted">{layer.gloss}</dd>
        </div>
      ))}
    </dl>
  );
}
