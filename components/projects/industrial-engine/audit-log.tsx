import { formatAuditTimestamp } from '@/lib/industrial-engine/calculations';
import type { AuditEvent } from '@/lib/industrial-engine/types';

export function AuditLog({
  containerRef,
  events,
  onUserScroll,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  events: AuditEvent[];
  onUserScroll: () => void;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f2229] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Audit log</p>
      <div
        ref={containerRef}
        onScroll={onUserScroll}
        className="mt-3 max-h-40 overflow-y-auto overflow-x-hidden font-mono text-xs"
        tabIndex={0}
        aria-live="polite"
      >
        {events.length === 0 ? (
          <p className="text-white/40">Run the workflow to populate audit events.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event) => (
              <li key={event.id} className="flex gap-3 text-white/75">
                <span className="shrink-0 text-white/40">{formatAuditTimestamp(event.timestampOffsetMs)}</span>
                <span>
                  <span className="text-white">{event.title}</span>
                  <span className="text-white/50"> — {event.description}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
