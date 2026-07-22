import type { WorkflowNodeId } from './types';

export type WorkflowNodeLayout = {
  id: WorkflowNodeId;
  label: string;
  short: string;
  x: number;
  y: number;
};

export const WORKFLOW_VIEWBOX = { width: 840, height: 200 } as const;
export const WORKFLOW_NODE_RADIUS = 32;
export const WORKFLOW_CONNECTOR_INSET = 30;

/** Shared coordinate model for SVG graph and HTML overlays. */
export const WORKFLOW_NODES: WorkflowNodeLayout[] = [
  { id: 'capture', label: 'Capture', short: 'CAP', x: 70, y: 100 },
  { id: 'validate', label: 'Validate', short: 'VAL', x: 210, y: 100 },
  { id: 'calculate', label: 'Calculate', short: 'CAL', x: 350, y: 100 },
  { id: 'risk', label: 'Risk', short: 'RSK', x: 490, y: 100 },
  { id: 'approve', label: 'Approve', short: 'APR', x: 630, y: 100 },
  { id: 'dispatch', label: 'Dispatch', short: 'DSP', x: 770, y: 100 },
];

export function nodeMeta(id: WorkflowNodeId): WorkflowNodeLayout {
  const node = WORKFLOW_NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown workflow node: ${id}`);
  return node;
}
