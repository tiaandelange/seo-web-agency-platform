import type { AuditEvent, EngineAction, EngineState, EngineStatus, WorkflowNodeId } from './types';
import { WORKFLOW_NODE_ORDER } from './constants';
import { defaultInputs, inputsFromPreset } from './presets';

function idleNodeStatuses(): Record<WorkflowNodeId, EngineState['nodeStatuses'][WorkflowNodeId]> {
  return {
    capture: 'idle',
    validate: 'idle',
    calculate: 'idle',
    risk: 'idle',
    approve: 'idle',
    dispatch: 'idle',
  };
}

export function createInitialState(): EngineState {
  return {
    inputs: defaultInputs(),
    runId: 0,
    status: 'idle',
    activeNodeId: null,
    selectedNodeId: 'capture',
    nodeStatuses: idleNodeStatuses(),
    completedNodeIds: [],
    auditEvents: [],
  };
}

function markDirtyIfComplete(state: EngineState): EngineStatus {
  if (state.status === 'complete' || state.status === 'running') return 'dirty';
  return state.status;
}

export function engineReducer(state: EngineState, action: EngineAction): EngineState {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
        status: markDirtyIfComplete(state),
      };
    case 'APPLY_PRESET':
      return {
        ...state,
        inputs: { ...state.inputs, ...inputsFromPreset(action.presetId) },
        status: markDirtyIfComplete(state),
      };
    case 'START_RUN': {
      const nextRunId = state.runId + 1;
      const queuedStatuses = { ...idleNodeStatuses() };
      for (const nodeId of WORKFLOW_NODE_ORDER) {
        queuedStatuses[nodeId] = 'queued';
      }
      return {
        ...state,
        runId: nextRunId,
        status: 'running',
        activeNodeId: null,
        nodeStatuses: queuedStatuses,
        completedNodeIds: [],
        auditEvents: [],
      };
    }
    case 'ACTIVATE_NODE':
      return {
        ...state,
        activeNodeId: action.nodeId,
        nodeStatuses: {
          ...state.nodeStatuses,
          [action.nodeId]: 'active',
        },
      };
    case 'COMPLETE_NODE': {
      const nodeStatus: EngineState['nodeStatuses'][WorkflowNodeId] =
        action.event.severity === 'warning' ? 'warning' : 'complete';
      return {
        ...state,
        activeNodeId: null,
        nodeStatuses: {
          ...state.nodeStatuses,
          [action.nodeId]: nodeStatus,
        },
        completedNodeIds: [...state.completedNodeIds, action.nodeId],
        auditEvents: [...state.auditEvents, action.event],
      };
    }
    case 'COMPLETE_RUN':
      return {
        ...state,
        status: 'complete',
        activeNodeId: null,
      };
    case 'SELECT_NODE':
      return {
        ...state,
        selectedNodeId: action.nodeId,
      };
    case 'RESET':
      return createInitialState();
    default:
      return state;
  }
}

export function buildAuditEvent(
  nodeId: WorkflowNodeId,
  timestampOffsetMs: number,
  title: string,
  description: string,
  severity: AuditEvent['severity'] = 'info',
): AuditEvent {
  return {
    id: `${nodeId}-${timestampOffsetMs}`,
    nodeId,
    timestampOffsetMs,
    title,
    description,
    severity,
  };
}
