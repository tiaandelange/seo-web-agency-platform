import type { ReactNode } from 'react';

export function AppShellFrame({
  title,
  children,
  footer,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-canvas shadow-elevated">
      <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cta" aria-hidden />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            {title}
          </span>
        </div>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-link">
          Status / Demo
        </span>
      </div>
      <div className="grid min-h-[280px] grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr]">
        <aside className="border-r border-line bg-ink/95 px-2 py-3 text-accent-contrast" aria-hidden>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-sandstone/80">Nav</p>
          <ul className="mt-3 space-y-2 font-mono text-[0.6rem] text-white/55">
            <li className="rounded bg-white/10 px-1.5 py-1 text-white">Inbox</li>
            <li className="px-1.5 py-1">Jobs</li>
            <li className="px-1.5 py-1">Quotes</li>
            <li className="px-1.5 py-1">Reports</li>
          </ul>
        </aside>
        <div className="min-w-0 bg-surface p-3 sm:p-4">{children}</div>
      </div>
      {footer && (
        <div className="border-t border-line bg-canvas px-3 py-2 font-mono text-[0.65rem] text-muted">
          {footer}
        </div>
      )}
    </div>
  );
}
