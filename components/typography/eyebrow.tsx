import type { ReactNode } from 'react';

export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`home-eyebrow ${className}`.trim()}>{children}</p>;
}
