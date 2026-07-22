import type { ReactNode } from 'react';

export type ContainerWidth = 'wide' | 'default' | 'narrow';

const widthClass: Record<ContainerWidth, string> = {
  wide: 'koppie-container-wide',
  default: 'koppie-container',
  narrow: 'koppie-container-narrow',
};

export function Container({
  width = 'default',
  children,
  className = '',
}: {
  width?: ContainerWidth;
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${widthClass[width]} ${className}`.trim()}>{children}</div>;
}
