import {
  formatCurrency,
  formatQuantity,
  riskClassification,
} from './calculations';
import type { DerivedCommercial, EngineInputs, WorkflowNodeId } from './types';

export type InspectorContent = {
  title: string;
  rows: { label: string; value: string }[];
  formula?: string;
};

export function buildInspector(
  nodeId: WorkflowNodeId,
  inputs: EngineInputs,
  commercial: DerivedCommercial,
  unitLabel: string,
): InspectorContent {
  const requestId = `REQ-${String(commercial.quoteReference.slice(-4))}`;

  switch (nodeId) {
    case 'capture':
      return {
        title: 'Capture module',
        rows: [
          { label: 'Project type', value: inputs.scenarioId.replace(/-/g, ' ') },
          { label: 'Quantity', value: String(inputs.quantity) },
          { label: 'Location distance', value: `${inputs.distanceKm} km` },
          { label: 'Uploaded documents', value: String(inputs.supportingFiles) },
          { label: 'Request ID', value: requestId },
        ],
      };
    case 'validate':
      return {
        title: 'Validation module',
        rows: [
          { label: 'Required fields', value: commercial.validationScore >= 80 ? 'Complete' : 'Review' },
          { label: 'Completeness', value: `${commercial.validationScore}%` },
          {
            label: 'Missing-data warnings',
            value: inputs.supportingFiles === 0 ? 'No supporting files' : 'None',
          },
          { label: 'Unit validation', value: unitLabel },
        ],
      };
    case 'calculate':
      return {
        title: 'Calculation engine',
        rows: [
          { label: 'Effective quantity', value: formatQuantity(commercial.effectiveQuantity, unitLabel) },
          { label: 'Material', value: formatCurrency(commercial.materialCost) },
          { label: 'Labour days', value: String(commercial.labourDays) },
          { label: 'Labour', value: formatCurrency(commercial.labourCost) },
          { label: 'Travel', value: formatCurrency(commercial.travelCost) },
          { label: 'Contingency', value: formatCurrency(commercial.riskContingency) },
        ],
        formula: 'effectiveQuantity = quantity × (1 + waste%)',
      };
    case 'risk':
      return {
        title: 'Risk evaluation',
        rows: [
          { label: 'Complexity score', value: inputs.complexity },
          { label: 'Distance exposure', value: `${Math.round(inputs.distanceKm / 20)} pts` },
          { label: 'Urgency exposure', value: inputs.urgency },
          { label: 'Total risk score', value: String(Math.round(commercial.riskScore)) },
          { label: 'Contingency amount', value: formatCurrency(commercial.riskContingency) },
        ],
      };
    case 'approve':
      return {
        title: 'Approval routing',
        rows: [
          { label: 'Approval tier', value: commercial.approvalTier },
          { label: 'Reviewer type', value: commercial.approvalSlug },
          {
            label: 'Threshold reason',
            value: `Subtotal ${formatCurrency(commercial.subtotalExVat)} · risk ${Math.round(commercial.riskScore)}`,
          },
          {
            label: 'Approval status',
            value: commercial.approvalTier.includes('Manager') ? 'Pending manager' : 'Routed',
          },
        ],
      };
    case 'dispatch':
      return {
        title: 'Dispatch module',
        rows: [
          { label: 'Quote reference', value: commercial.quoteReference },
          { label: 'PDF status', value: 'Generated (simulated)' },
          { label: 'Email status', value: 'Queued (simulated)' },
          { label: 'Follow-up status', value: 'T+2 business days' },
        ],
      };
  }
}

export function nodeKeyOutput(nodeId: WorkflowNodeId, commercial: DerivedCommercial): string {
  switch (nodeId) {
    case 'capture':
      return `${commercial.quoteReference.slice(-4)} queued`;
    case 'validate':
      return `${commercial.validationScore}% complete`;
    case 'calculate':
      return formatCurrency(commercial.materialCost);
    case 'risk':
      return riskClassification(commercial.riskScore);
    case 'approve':
      return commercial.approvalSlug;
    case 'dispatch':
      return commercial.quoteReference;
    default:
      return '—';
  }
}
