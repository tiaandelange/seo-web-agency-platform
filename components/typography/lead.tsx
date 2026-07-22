import type { ReactNode } from 'react';

export function Lead({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-lead text-muted ${className}`.trim()}>{children}</p>;
}
