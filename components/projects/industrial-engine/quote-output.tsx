import {
  formatCurrency,
  formatQuantity,
  riskClassification,
} from '@/lib/industrial-engine/calculations';
import type { DerivedCommercial } from '@/lib/industrial-engine/types';

export function QuoteOutput({
  commercial,
  unitLabel,
}: {
  commercial: DerivedCommercial;
  unitLabel: string;
}) {
  return (
    <div className="rounded-lg border border-teal-500/30 bg-teal-950/20 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-300/80">
        Live quotation output
      </p>
      <p className="mt-2 font-mono text-lg text-white">{commercial.quoteReference}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Subtotal (ex VAT)</dt>
          <dd className="font-mono">{formatCurrency(commercial.subtotalExVat)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">VAT (15%)</dt>
          <dd className="font-mono">{formatCurrency(commercial.vat)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-white/10 pt-2 font-medium">
          <dt>Total (incl VAT)</dt>
          <dd className="font-mono text-cta">{formatCurrency(commercial.totalInclVat)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Approval route</dt>
          <dd className="font-mono text-right">{commercial.approvalTier}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Estimated labour days</dt>
          <dd className="font-mono">{commercial.labourDays}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Risk classification</dt>
          <dd className="font-mono">{riskClassification(commercial.riskScore)}</dd>
        </div>
      </dl>
      <p className="mt-3 font-mono text-xs text-white/50">
        Effective qty: {formatQuantity(commercial.effectiveQuantity, unitLabel)}
      </p>
    </div>
  );
}
