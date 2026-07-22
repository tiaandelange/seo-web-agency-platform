import type { CapabilityOutputKind } from '@/data/services-architecture';

const DEMO_LABEL = 'Illustrative workflow demo — sample interface';

export function CapabilityOutputPanel({ kind }: { kind: CapabilityOutputKind }) {
  return (
    <div className="border border-line bg-canvas p-4 shadow-card">
      <p className="text-label text-muted">{DEMO_LABEL}</p>
      <div className="mt-4">{renderOutput(kind)}</div>
    </div>
  );
}

function renderOutput(kind: CapabilityOutputKind) {
  switch (kind) {
    case 'search-snippet':
      return (
        <div className="space-y-2 text-sm">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-link">
            Output / Search snippet
          </p>
          <p className="text-link underline">Industrial supplier — Pretoria</p>
          <p className="text-xs text-success">example.co.za › services</p>
          <p className="text-muted">
            Structured service pages mapped to search intent, with clear enquiry paths.
          </p>
        </div>
      );
    case 'enquiry-record':
      return (
        <div className="space-y-2 font-mono text-xs">
          <p className="uppercase tracking-widest text-cta">Output / Enquiry record</p>
          <p className="text-ink">REF-2026-041</p>
          <p className="text-muted">Status / Qualified</p>
          <p className="text-muted">Source / Landing page</p>
          <p className="text-muted">Service / Lead capture workflow</p>
        </div>
      );
    case 'quote-document':
      return (
        <div className="space-y-2 border border-line bg-surface p-3 font-mono text-xs">
          <p className="uppercase tracking-widest text-cta">Output / Quotation PDF</p>
          <p className="text-ink">Q-2026-018</p>
          <p className="text-muted">Status / Draft</p>
          <p className="text-muted">Lines / Structured</p>
          <p className="text-muted">VAT / Calculated</p>
          <p className="mt-2 border-t border-line pt-2 text-link">PDF output available</p>
        </div>
      );
    case 'status-view':
      return (
        <div className="space-y-2 font-mono text-xs">
          <p className="uppercase tracking-widest text-cta">Output / Status view</p>
          <p className="text-ink">JOB-2026-007</p>
          <p className="text-muted">Status / In progress</p>
          <p className="text-muted">Stage / Fulfilment</p>
          <p className="text-muted">Next / Customer notification</p>
        </div>
      );
    case 'integration-log':
      return (
        <div className="space-y-2 font-mono text-xs">
          <p className="uppercase tracking-widest text-cta">Output / Integration event</p>
          <p className="text-ink">EVT-2026-112</p>
          <p className="text-muted">Channel / Email handoff</p>
          <p className="text-muted">Result / Accepted</p>
          <p className="text-muted">Retry / Not required</p>
        </div>
      );
    default:
      return null;
  }
}
