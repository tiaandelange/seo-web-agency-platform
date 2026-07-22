/**
 * Layout primitives: consistent section rhythm and H2 headings.
 * Spacing and type follow homepage-measured design tokens.
 */
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';

export function Section({
  heading,
  children,
  tone = 'plain',
  id,
  measure = 'default',
}: {
  heading?: string;
  children: React.ReactNode;
  tone?: 'plain' | 'surface';
  id?: string;
  /** Narrow (~760px) for long prose; default keeps full container for grids/tables. */
  measure?: 'default' | 'narrow';
}) {
  return (
    <section id={id} className={tone === 'surface' ? 'bg-surface' : ''}>
      <Container className="py-14 md:py-20">
        {heading && (
          <Heading as="h2" variant="sectionTitle" className="mb-6">
            {heading}
          </Heading>
        )}
        {measure === 'narrow' ? <div className="measure-narrow">{children}</div> : children}
      </Container>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-muted marker:text-link">
      {items.map((item) => (
        <li key={item} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}
