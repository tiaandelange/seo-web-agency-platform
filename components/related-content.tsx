import Link from 'next/link';

/**
 * Related-content block — renders curated links from data relations
 * (docs/architecture/INTERNAL-LINKING-MAP.md). Max ~5 items; curation over
 * completeness is enforced editorially, not here.
 */
export interface RelatedItem {
  title: string;
  href: string;
  kind: string;
}

export function RelatedContent({ heading = 'Related', items }: { heading?: string; items: RelatedItem[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-section-title mb-4 tracking-tight text-ink">{heading}</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href} className="rounded-card border border-line bg-canvas p-4">
            <p className="text-label text-muted">{item.kind}</p>
            <Link href={item.href} className="mt-1 block font-medium text-ink hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
