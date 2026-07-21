import type { SchemaObject } from '@/lib/schema';

/**
 * Renders JSON-LD structured data. Escapes `<` to prevent script-context
 * injection from content strings.
 */
export function JsonLd({ data }: { data: SchemaObject | SchemaObject[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
