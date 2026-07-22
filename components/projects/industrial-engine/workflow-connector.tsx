import {
  WORKFLOW_CONNECTOR_INSET,
  WORKFLOW_NODE_RADIUS,
  WORKFLOW_NODES,
} from '@/lib/industrial-engine/workflow-layout';
import type { WorkflowNodeId, NodeStatus } from '@/lib/industrial-engine/types';

export function WorkflowConnector({
  fromIndex,
  nodeStatuses,
  activeIndex,
  isRunning,
  reducedMotion,
}: {
  fromIndex: number;
  nodeStatuses: Record<WorkflowNodeId, NodeStatus>;
  activeIndex: number;
  isRunning: boolean;
  reducedMotion: boolean;
}) {
  const from = WORKFLOW_NODES[fromIndex];
  const to = WORKFLOW_NODES[fromIndex + 1];
  const x1 = from.x + WORKFLOW_CONNECTOR_INSET;
  const x2 = to.x - WORKFLOW_CONNECTOR_INSET;
  const y = from.y;
  const isActive = isRunning && activeIndex === fromIndex;
  const isComplete =
    nodeStatuses[to.id] === 'complete' || nodeStatuses[to.id] === 'warning';

  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className="stroke-white/15" strokeWidth={1} />
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        className={`engine-connector ${isComplete ? 'engine-connector-complete' : ''} ${isActive && !reducedMotion ? 'engine-connector-active' : ''}`}
        strokeWidth={isActive || isComplete ? 2 : 0}
      />
      {isActive && !reducedMotion && (
        <circle r="3" className="fill-cyan-400">
          <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${x1},${y} L${x2},${y}`} />
        </circle>
      )}
      <text x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" className="fill-white/25 font-mono text-[8px]">
        {`y=${y}`}
      </text>
    </g>
  );
}

export function WorkflowNodeRing({
  node,
  status,
  selected,
  reducedMotion,
}: {
  node: (typeof WORKFLOW_NODES)[number];
  status: NodeStatus;
  selected: boolean;
  reducedMotion: boolean;
}) {
  return (
    <g>
      <circle
        cx={node.x}
        cy={node.y}
        r={WORKFLOW_NODE_RADIUS}
        className={status === 'active' && !reducedMotion ? 'engine-node-pulse' : ''}
        fill="transparent"
        stroke={
          selected
            ? '#67e8f9'
            : status === 'active'
              ? '#22d3ee'
              : status === 'complete'
                ? '#2dd4bf'
                : status === 'warning'
                  ? '#b86e16'
                  : 'rgba(255,255,255,0.2)'
        }
        strokeWidth={selected || status === 'active' ? 2 : 1}
      />
      <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white/80 font-mono text-[10px]">
        {node.short}
      </text>
      <text x={node.x} y={node.y + 52} textAnchor="middle" className="fill-white/30 font-mono text-[7px]">
        {`x=${node.x}`}
      </text>
    </g>
  );
}
