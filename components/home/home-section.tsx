/**
 * Homepage section rhythm — distinct from generic Section cards elsewhere.
 */
export function HomeSection({
  id,
  eyebrow,
  heading,
  headingLevel = 'major',
  intro,
  tone = 'plain',
  children,
  className = '',
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingLevel?: 'major' | 'functional' | 'display';
  intro?: string;
  tone?: 'plain' | 'surface' | 'ink';
  children: React.ReactNode;
  className?: string;
}) {
  const toneClass =
    tone === 'surface' ? 'bg-surface' : tone === 'ink' ? 'band-ink' : '';
  const headingClass =
    headingLevel === 'display'
      ? 'home-display'
      : headingLevel === 'functional'
        ? 'home-heading-functional'
        : 'home-heading-major';

  return (
    <section id={id} className={`${toneClass} ${className}`.trim()}>
      <div className="home-container py-14 md:py-20">
        {eyebrow && (
          <p className="home-eyebrow mb-3">{eyebrow}</p>
        )}
        {heading && <h2 className={`${headingClass} max-w-4xl`}>{heading}</h2>}
        {intro && (
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}
