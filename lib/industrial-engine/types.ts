export type WorkflowNodeId =
  | 'capture'
  | 'validate'
  | 'calculate'
  | 'risk'
  | 'approve'
  | 'dispatch';

export type NodeStatus = 'idle' | 'queued' | 'active' | 'complete' | 'warning';

export type ScenarioId = 'liner-installation' | 'fabrication-rfq' | 'field-service';

export type UrgencyLevel = 'standard' | 'priority' | 'shutdown';

export type ComplexityLevel = 'routine' | 'moderate' | 'complex';

export type EngineInputs = {
  scenarioId: ScenarioId;
  quantity: number;
  distanceKm: number;
  urgency: UrgencyLevel;
  complexity: ComplexityLevel;
  requiresSiteInspection: boolean;
  supportingFiles: number;
  dailyRfqVolume: number;
};

export type EngineStatus = 'idle' | 'running' | 'complete' | 'dirty';

export type AuditEvent = {
  id: string;
  nodeId: WorkflowNodeId;
  timestampOffsetMs: number;
  title: string;
  description: string;
  severity: 'info' | 'success' | 'warning';
};

export type EngineState = {
  inputs: EngineInputs;
  runId: number;
  status: EngineStatus;
  activeNodeId: WorkflowNodeId | null;
  selectedNodeId: WorkflowNodeId;
  nodeStatuses: Record<WorkflowNodeId, NodeStatus>;
  completedNodeIds: WorkflowNodeId[];
  auditEvents: AuditEvent[];
};

export type EngineAction =
  | { type: 'SET_INPUT'; field: keyof EngineInputs; value: EngineInputs[keyof EngineInputs] }
  | { type: 'APPLY_PRESET'; presetId: ScenarioId }
  | { type: 'START_RUN' }
  | { type: 'ACTIVATE_NODE'; nodeId: WorkflowNodeId }
  | { type: 'COMPLETE_NODE'; nodeId: WorkflowNodeId; event: AuditEvent }
  | { type: 'COMPLETE_RUN' }
  | { type: 'SELECT_NODE'; nodeId: WorkflowNodeId }
  | { type: 'RESET' };

export type DerivedCommercial = {
  effectiveQuantity: number;
  materialCost: number;
  labourDays: number;
  labourCost: number;
  travelCost: number;
  baseCommercialCost: number;
  riskContingency: number;
  subtotalExVat: number;
  vat: number;
  totalInclVat: number;
  validationScore: number;
  riskScore: number;
  approvalTier: string;
  approvalSlug: string;
  quoteReference: string;
  unitLabel: string;
  processingTimeMs: number;
  simulatedRfqCapacity: number;
};
