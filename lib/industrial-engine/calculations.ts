import {
  CREW_DAY_RATE,
  SITE_INSPECTION_FEE,
  TRAVEL_RATE_PER_KM,
  VAT_RATE,
  TOTAL_WORKFLOW_MS,
} from './constants';
import { presetForInputs } from './presets';
import type { ComplexityLevel, DerivedCommercial, EngineInputs, UrgencyLevel } from './types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export { clamp };

const COMPLEXITY_FACTOR: Record<ComplexityLevel, number> = {
  routine: 0.02,
  moderate: 0.05,
  complex: 0.09,
};

const URGENCY_MULTIPLIER: Record<UrgencyLevel, number> = {
  standard: 1,
  priority: 1.08,
  shutdown: 1.18,
};

export function deriveApprovalTier(
  subtotalExVat: number,
  riskScore: number,
): { tier: string; slug: string } {
  if (subtotalExVat < 50_000 && riskScore < 40) {
    return { tier: 'Automated commercial review', slug: 'automated' };
  }
  if (subtotalExVat < 250_000 && riskScore < 70) {
    return { tier: 'Manager approval', slug: 'manager' };
  }
  return { tier: 'Director approval', slug: 'director' };
}

export function formatQuoteReference(runId: number): string {
  return `KOP-DEMO-2026-${String(runId).padStart(4, '0')}`;
}

export function deriveCommercial(inputs: EngineInputs, runId: number): DerivedCommercial {
  const preset = presetForInputs(inputs);
  const { quantity, distanceKm, urgency, complexity, requiresSiteInspection, supportingFiles, dailyRfqVolume } =
    inputs;

  const effectiveQuantity = quantity * (1 + preset.wastePercent / 100);
  const materialCost = effectiveQuantity * preset.materialRate;
  const labourDays = Math.max(1, Math.ceil(quantity / preset.dailyCapacity));
  const labourCost = labourDays * preset.crewSize * CREW_DAY_RATE;
  const travelCost =
    distanceKm * 2 * TRAVEL_RATE_PER_KM + (requiresSiteInspection ? SITE_INSPECTION_FEE : 0);

  const complexityFactor = COMPLEXITY_FACTOR[complexity];
  const urgencyMultiplier = URGENCY_MULTIPLIER[urgency];

  const baseCommercialCost = materialCost + labourCost + travelCost;
  const riskContingency = baseCommercialCost * complexityFactor;
  const subtotalExVat = (baseCommercialCost + riskContingency) * urgencyMultiplier;
  const vat = subtotalExVat * VAT_RATE;
  const totalInclVat = subtotalExVat + vat;

  const validationScore = clamp(
    100 -
      (supportingFiles === 0 ? 12 : 0) -
      (distanceKm > 500 ? 8 : 0) -
      (complexity === 'complex' ? 7 : 0) -
      (urgency === 'shutdown' ? 9 : 0),
    0,
    100,
  );

  const riskScore = clamp(
    10 +
      distanceKm / 20 +
      (complexity === 'moderate' ? 18 : 0) +
      (complexity === 'complex' ? 34 : 0) +
      (urgency === 'priority' ? 12 : 0) +
      (urgency === 'shutdown' ? 26 : 0) +
      (supportingFiles === 0 ? 10 : 0),
    0,
    100,
  );

  const { tier: approvalTier, slug: approvalSlug } = deriveApprovalTier(subtotalExVat, riskScore);

  const complexityWeight = complexity === 'complex' ? 0.6 : complexity === 'moderate' ? 0.75 : 0.9;
  const simulatedRfqCapacity = Math.max(
    1,
    Math.round((dailyRfqVolume * 60 * complexityWeight) / Math.max(labourDays, 1)),
  );

  return {
    effectiveQuantity,
    materialCost,
    labourDays,
    labourCost,
    travelCost,
    baseCommercialCost,
    riskContingency,
    subtotalExVat,
    vat,
    totalInclVat,
    validationScore,
    riskScore,
    approvalTier,
    approvalSlug,
    quoteReference: formatQuoteReference(runId),
    unitLabel: preset.unitLabel,
    processingTimeMs: TOTAL_WORKFLOW_MS,
    simulatedRfqCapacity,
  };
}

const zarFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return zarFormatter.format(Math.round(value));
}

export function riskClassification(score: number): string {
  if (score < 40) return 'Low';
  if (score < 70) return 'Moderate';
  return 'Elevated';
}

export function formatQuantity(value: number, unit: string): string {
  const formatted = value % 1 === 0 ? value.toLocaleString('en-ZA') : value.toLocaleString('en-ZA', { maximumFractionDigits: 1 });
  return `${formatted} ${unit}`;
}

export function formatElapsed(ms: number): string {
  const seconds = ms / 1000;
  return `${seconds.toFixed(2)} s`;
}

export function formatAuditTimestamp(ms: number): string {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const wholeSeconds = Math.floor(seconds);
  const millis = Math.round((seconds - wholeSeconds) * 1000);
  return `${String(minutes).padStart(2, '0')}:${String(wholeSeconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
}
