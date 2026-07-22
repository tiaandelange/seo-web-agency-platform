import { AppShellFrame } from '@/components/systems/app-shell-frame';

const DEMO_LABEL = 'Illustrative workflow demo — sample data';

export function CustomSystemsHeroDemo() {
  return (
    <div className="custom-systems-hero-demo">
      <input
        type="radio"
        name="app-shell-view"
        id="shell-ops"
        defaultChecked
        className="visually-hidden-control shell-radio shell-radio-ops"
      />
      <input
        type="radio"
        name="app-shell-view"
        id="shell-commercial"
        className="visually-hidden-control shell-radio shell-radio-commercial"
      />
      <input
        type="radio"
        name="app-shell-view"
        id="shell-management"
        className="visually-hidden-control shell-radio shell-radio-management"
      />

      <AppShellFrame
        title="Operational workspace"
        footer={
          <span>
            Audit / sample — last action recorded as status change · {DEMO_LABEL}
          </span>
        }
      >
        <p className="mb-3 rounded border border-notice-border bg-notice px-2 py-1.5 text-xs text-ink">
          {DEMO_LABEL}
        </p>

        <fieldset className="mb-4">
          <legend className="sr-only">Application view</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['shell-ops', 'Operations', 'shell-tab-ops'],
                ['shell-commercial', 'Commercial', 'shell-tab-commercial'],
                ['shell-management', 'Management', 'shell-tab-management'],
              ] as const
            ).map(([id, label, tabClass]) => (
              <label
                key={id}
                htmlFor={id}
                className={`shell-tab ${tabClass} inline-flex min-h-11 cursor-pointer items-center border border-line bg-canvas px-3 text-xs font-semibold uppercase tracking-wide text-muted`}
              >
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="shell-panel shell-panel-ops space-y-2 font-mono text-xs text-ink">
          <p className="text-label text-cta">Operations</p>
          <p>Active workflows</p>
          <ul className="space-y-1 text-muted">
            <li>RFQ intake</li>
            <li>Site assessment</li>
            <li>Project preparation</li>
          </ul>
          <p className="pt-2 text-cta">Status / 4 items require action</p>
        </div>

        <div className="shell-panel shell-panel-commercial space-y-2 font-mono text-xs text-ink">
          <p className="text-label text-cta">Commercial</p>
          <p>Quote Q-2026-018</p>
          <ul className="space-y-1 text-muted">
            <li>Draft</li>
            <li>Pricing review</li>
            <li>Approval required</li>
          </ul>
          <p className="pt-2 text-link">PDF output available</p>
        </div>

        <div className="shell-panel shell-panel-management space-y-2 font-mono text-xs text-ink">
          <p className="text-label text-cta">Management</p>
          <p>Workflow exceptions</p>
          <ul className="space-y-1 text-muted">
            <li>Overdue approval</li>
            <li>Incomplete costing record</li>
            <li>Recent audit activity</li>
          </ul>
        </div>
      </AppShellFrame>
    </div>
  );
}
