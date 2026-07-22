import type { NodeStatus } from '@/lib/industrial-engine/types';

export function nodeStatusClass(status: NodeStatus | string, selected: boolean): string {
  if (selected) return 'border-cyan-400 bg-cyan-950/60 text-cyan-100';
  if (status === 'active') return 'border-cyan-400/80 bg-cyan-900/40 text-white';
  if (status === 'complete') return 'border-teal-500/50 bg-teal-950/40 text-teal-100';
  if (status === 'warning') return 'border-warning/60 bg-warning/10 text-warning';
  if (status === 'queued') return 'border-white/20 bg-white/5 text-white/60';
  return 'border-white/15 bg-white/5 text-white/50';
}

export function statusIndicator(status: NodeStatus | string): string {
  if (status === 'active') return '●';
  if (status === 'complete') return '✓';
  if (status === 'warning') return '!';
  if (status === 'queued') return '○';
  return '·';
}
