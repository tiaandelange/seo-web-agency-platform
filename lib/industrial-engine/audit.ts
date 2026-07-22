import type { DerivedCommercial, EngineInputs } from './types';
import { buildAuditEvent } from './reducer';
import { formatQuantity } from './calculations';

export function auditEventsForRun(inputs: EngineInputs, commercial: DerivedCommercial) {
  let elapsed = 0;

  const capture = buildAuditEvent(
    'capture',
    (elapsed += 650),
    'Request payload captured',
    `Project type: ${inputs.scenarioId.replace(/-/g, ' ')} · Qty ${inputs.quantity} · ${inputs.distanceKm} km`,
  );

  const validateSeverity =
    commercial.validationScore < 80 ? ('warning' as const) : ('success' as const);
  const validate = buildAuditEvent(
    'validate',
    (elapsed += 850),
    `${commercial.validationScore}% data completeness confirmed`,
    inputs.supportingFiles === 0 ? 'No supporting files attached — flagged for review' : 'Required fields and units validated',
    validateSeverity,
  );

  const calculate = buildAuditEvent(
    'calculate',
    (elapsed += 1050),
    'Five commercial line items generated',
    `Effective ${formatQuantity(commercial.effectiveQuantity, commercial.unitLabel)} · labour ${commercial.labourDays} days`,
    'success',
  );

  const riskLabel =
    commercial.riskScore < 40 ? 'low' : commercial.riskScore < 70 ? 'moderate' : 'elevated';
  const risk = buildAuditEvent(
    'risk',
    (elapsed += 900),
    `Risk score classified as ${riskLabel}`,
    `Contingency ${Math.round((commercial.riskContingency / commercial.baseCommercialCost) * 100)}% applied · score ${Math.round(commercial.riskScore)}`,
    commercial.riskScore >= 70 ? 'warning' : 'info',
  );

  const approve = buildAuditEvent(
    'approve',
    (elapsed += 800),
    `${commercial.approvalTier} route selected`,
    `Threshold triggered at subtotal below review limits · risk ${Math.round(commercial.riskScore)}`,
    'info',
  );

  const dispatch = buildAuditEvent(
    'dispatch',
    (elapsed += 700),
    'Quote package prepared for dispatch',
    `${commercial.quoteReference} · PDF ready · follow-up scheduled`,
    'success',
  );

  return [capture, validate, calculate, risk, approve, dispatch];
}

export function industrialEngineQuoteHref(
  inputs: EngineInputs,
  approvalSlug: string,
): string {
  const params = new URLSearchParams({
    service_interest: 'custom-web-applications',
    source: 'industrial-engine',
    scenario: inputs.scenarioId,
    complexity: inputs.complexity,
    approval: approvalSlug,
  });
  return `/request-a-quote/?${params.toString()}`;
}
