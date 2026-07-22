import type { ReactNode } from 'react';
import { Container, type ContainerWidth } from './container';

export type SectionSpacing = 'compact' | 'default' | 'large';

const spacingClass: Record<SectionSpacing, string> = {
  compact: 'py-12 md:py-16',
  default: 'py-14 md:py-20',
  large: 'py-16 md:py-24',
};

/**
 * Shared section rhythm — homepage HomeSection spacing is the default.
 */
export function LayoutSection({
  id,
  tone = 'plain',
  spacing = 'default',
  width = 'default',
  children,
  className = '',
}: {
  id?: string;
  tone?: 'plain' | 'surface' | 'ink';
  spacing?: SectionSpacing;
  width?: ContainerWidth;
  children: ReactNode;
  className?: string;
}) {
  const toneClass =
    tone === 'surface' ? 'bg-surface' : tone === 'ink' ? 'band-ink' : '';

  return (
    <section id={id} className={`${toneClass} ${className}`.trim()}>
      <Container width={width} className={spacingClass[spacing]}>
        {children}
      </Container>
    </section>
  );
}
