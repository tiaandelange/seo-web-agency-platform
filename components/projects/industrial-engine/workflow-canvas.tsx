import { WORKFLOW_NODES, WORKFLOW_VIEWBOX } from '@/lib/industrial-engine/workflow-layout';
import { nodeKeyOutput } from '@/lib/industrial-engine/inspector';
import type { DerivedCommercial, NodeStatus, WorkflowNodeId } from '@/lib/industrial-engine/types';
import { WorkflowConnector, WorkflowNodeRing } from './workflow-connector';
import { WorkflowNodeButton } from './workflow-node';

export function WorkflowCanvas({
  nodeStatuses,
  activeNodeId,
  selectedNodeId,
  isRunning,
  reducedMotion,
  commercial,
  onSelectNode,
}: {
  nodeStatuses: Record<WorkflowNodeId, NodeStatus>;
  activeNodeId: WorkflowNodeId | null;
  selectedNodeId: WorkflowNodeId;
  isRunning: boolean;
  reducedMotion: boolean;
  commercial: DerivedCommercial;
  onSelectNode: (id: WorkflowNodeId) => void;
}) {
  const activeIndex = activeNodeId ? WORKFLOW_NODES.findIndex((n) => n.id === activeNodeId) : -1;

  return (
    <div className="engine-canvas relative overflow-hidden rounded-lg border border-white/10 bg-[#0f2229] p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${WORKFLOW_VIEWBOX.width} ${WORKFLOW_VIEWBOX.height}`}
        className="hidden w-full lg:block"
        role="img"
        aria-hidden
      >
        <title>RFQ to quote workflow graph</title>
        <desc>
          Six-stage workflow from capture through validate, calculate, risk, approve and dispatch.
        </desc>
        {WORKFLOW_NODES.slice(0, -1).map((_, i) => (
          <WorkflowConnector
            key={WORKFLOW_NODES[i].id}
            fromIndex={i}
            nodeStatuses={nodeStatuses}
            activeIndex={activeIndex}
            isRunning={isRunning}
            reducedMotion={reducedMotion}
          />
        ))}
        {WORKFLOW_NODES.map((node) => (
          <WorkflowNodeRing
            key={node.id}
            node={node}
            status={nodeStatuses[node.id]}
            selected={selectedNodeId === node.id}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>

      <div
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        role="list"
        aria-label="Workflow stages"
      >
        {WORKFLOW_NODES.map((node) => (
          <div key={node.id} role="listitem">
            <WorkflowNodeButton
              node={node}
              status={nodeStatuses[node.id]}
              selected={selectedNodeId === node.id}
              keyOutput={nodeKeyOutput(node.id, commercial)}
              onSelect={() => onSelectNode(node.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
