import type { WorkflowNodeId } from './types';

export const VAT_RATE = 0.15;
export const TRAVEL_RATE_PER_KM = 6.8;
export const SITE_INSPECTION_FEE = 4500;
export const CREW_DAY_RATE = 3200;

export const WORKFLOW_NODE_ORDER: WorkflowNodeId[] = [
  'capture',
  'validate',
  'calculate',
  'risk',
  'approve',
  'dispatch',
];

export const WORKFLOW_STAGES = [
  { id: 'capture' as const, duration: 650 },
  { id: 'validate' as const, duration: 850 },
  { id: 'calculate' as const, duration: 1050 },
  { id: 'risk' as const, duration: 900 },
  { id: 'approve' as const, duration: 800 },
  { id: 'dispatch' as const, duration: 700 },
] as const;

export const TOTAL_WORKFLOW_MS = WORKFLOW_STAGES.reduce((sum, s) => sum + s.duration, 0);
