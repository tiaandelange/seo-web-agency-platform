import type { WorkflowNodeLayout } from '@/lib/industrial-engine/workflow-layout';
import type { NodeStatus } from '@/lib/industrial-engine/types';
import { nodeStatusClass, statusIndicator } from './engine-utils';

export function WorkflowNodeButton({
  node,
  status,
  selected,
  keyOutput,
  onSelect,
}: {
  node: WorkflowNodeLayout;
  status: NodeStatus;
  selected: boolean;
  keyOutput: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${node.label}, status ${status}, ${keyOutput}`}
      className={`min-h-11 w-full rounded border px-2 py-2 text-left transition-colors ${nodeStatusClass(status, selected)}`}
    >
      <span className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider">
        <span>
          <span aria-hidden className="mr-1">
            {statusIndicator(status)}
          </span>
          {node.label}
        </span>
        <span className="truncate text-[9px] normal-case text-white/70">{keyOutput}</span>
      </span>
    </button>
  );
}
