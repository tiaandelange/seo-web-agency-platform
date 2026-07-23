import type { ReactNode } from 'react';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';

/**
 * Dark content band — mirrors homepage band-ink system sections.
 * Uses existing .band-ink token pairing (light text on ink).
 */
export function InkBand({
  heading,
  children,
  id,
  motif = false,
}: {
  heading?: string;
  children: ReactNode;
  id?: string;
  motif?: boolean;
}) {
  return (
    <section id={id} className="band-ink relative overflow-hidden">
      {motif && (
        <div
          className="contour-grid pointer-events-none absolute inset-0 opacity-50"
          aria-hidden="true"
        />
      )}
      <Container className="relative py-14 md:py-20">
        {heading && (
          <Heading as="h2" variant="sectionTitle" className="mb-6 text-accent-contrast">
            {heading}
          </Heading>
        )}
        {children}
      </Container>
    </section>
  );
}
