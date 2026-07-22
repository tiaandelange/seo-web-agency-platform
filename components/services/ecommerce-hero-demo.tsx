const DEMO = 'Illustrative workflow demo — sample interface';

export function EcommerceHeroDemo() {
  return (
    <div className="ecommerce-hero-demo overflow-hidden rounded-card border border-line bg-canvas shadow-elevated">
      <input
        type="radio"
        name="ecom-layer"
        id="ecom-catalogue"
        defaultChecked
        className="visually-hidden-control ecom-layer-radio ecom-layer-radio-catalogue"
      />
      <input
        type="radio"
        name="ecom-layer"
        id="ecom-checkout"
        className="visually-hidden-control ecom-layer-radio ecom-layer-radio-checkout"
      />
      <input
        type="radio"
        name="ecom-layer"
        id="ecom-order"
        className="visually-hidden-control ecom-layer-radio ecom-layer-radio-order"
      />

      <div className="border-b border-line bg-surface px-3 py-2">
        <p className="text-label text-cta">Commerce architecture</p>
        <p className="mt-1 text-xs text-muted">{DEMO}</p>
      </div>

      <fieldset className="border-b border-line px-3 py-2">
        <legend className="sr-only">Commerce layer</legend>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['ecom-catalogue', 'Catalogue', 'ecom-tab-catalogue'],
              ['ecom-checkout', 'Checkout', 'ecom-tab-checkout'],
              ['ecom-order', 'Order status', 'ecom-tab-order'],
            ] as const
          ).map(([id, label, tabClass]) => (
            <label
              key={id}
              htmlFor={id}
              className={`ecom-tab ${tabClass} inline-flex min-h-11 cursor-pointer items-center border border-line bg-canvas px-3 text-xs font-semibold uppercase tracking-wide text-muted`}
            >
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="ecom-panel ecom-panel-catalogue grid gap-3 p-4 sm:grid-cols-2">
        <div className="border border-line bg-surface p-3">
          <p className="font-mono text-[0.65rem] uppercase text-muted">SKU-1042</p>
          <p className="mt-1 text-sm font-medium text-ink">Industrial fitting set</p>
          <p className="mt-2 text-xs text-muted">Category / Components</p>
          <p className="mt-1 font-mono text-xs text-link">Schema / Product</p>
        </div>
        <div className="border border-line bg-surface p-3">
          <p className="font-mono text-[0.65rem] uppercase text-muted">SKU-1188</p>
          <p className="mt-1 text-sm font-medium text-ink">Spare seal kit</p>
          <p className="mt-2 text-xs text-muted">Category / Consumables</p>
          <p className="mt-1 font-mono text-xs text-link">Mobile nav / Indexed</p>
        </div>
        <p className="sm:col-span-2 font-mono text-[0.65rem] text-muted">
          Meta strip · unique title · OG · JSON-LD Product
        </p>
      </div>

      <div className="ecom-panel ecom-panel-checkout space-y-3 p-4 font-mono text-xs">
        <p className="text-label text-cta">Mobile checkout panel</p>
        <div className="border border-line bg-surface p-3 text-ink">
          <p>Cart / 2 lines</p>
          <p className="mt-1 text-muted">Delivery / Regional rate shown</p>
          <p className="mt-1 text-muted">Gateway / SA EFT + card</p>
          <p className="mt-3 text-cta">Pay · sample CTA</p>
        </div>
      </div>

      <div className="ecom-panel ecom-panel-order space-y-3 p-4 font-mono text-xs">
        <p className="text-label text-cta">Order status notification</p>
        <div className="border border-line bg-surface p-3 text-ink">
          <p>ORD-2026-055</p>
          <p className="mt-1 text-muted">Status / Packed</p>
          <p className="mt-1 text-muted">Next / Dispatch email</p>
          <p className="mt-1 text-link">Customer notified</p>
        </div>
      </div>
    </div>
  );
}
