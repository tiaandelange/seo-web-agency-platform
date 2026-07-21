/**
 * Layout primitives: consistent section rhythm and H2 headings.
 */
export function Section({
  heading,
  children,
  tone = 'plain',
}: {
  heading?: string;
  children: React.ReactNode;
  tone?: 'plain' | 'surface';
}) {
  return (
    <section className={tone === 'surface' ? 'bg-surface' : ''}>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {heading && (
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink">{heading}</h2>
        )}
        {children}
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted marker:text-accent">
      {items.map((item) => (
        <li key={item} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}
