import { CUSTOM_SYSTEMS_DELIVERABLE_LAYERS } from '@/data/services-architecture';

export function DeliverableLayers() {
  return (
    <div className="deliverable-layers space-y-8">
      {CUSTOM_SYSTEMS_DELIVERABLE_LAYERS.map((layer, i) => (
        <div
          key={layer.id}
          className={`relative max-w-xl border-l-2 border-link/50 pl-5 ${
            i % 2 === 1 ? 'sm:ml-12 lg:ml-24' : ''
          }`}
        >
          <p className="text-label text-cta">
            {layer.index} / {layer.heading}
          </p>
          <h3 className="text-card-title mt-1 text-ink">{layer.heading}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-link">
            {layer.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
