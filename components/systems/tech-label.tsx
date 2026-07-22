import type { ReactNode } from 'react';

export function TechLabel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-label text-cta ${className}`.trim()}>{children}</p>;
}
