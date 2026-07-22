import type { Faq } from '@/types/content';

/**
 * FAQ block — semantic heading + prose pairs (crawlable, no JS accordions).
 * FAQPage JSON-LD is added ONLY on /faq/ (D-09), by the page, not here.
 */
export function FaqList({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 3 | 4 }) {
  if (items.length === 0) return null;
  const H: 'h3' | 'h4' = headingLevel === 3 ? 'h3' : 'h4';
  return (
    <div className="measure-narrow space-y-6">
      {items.map((faq) => (
        <div key={faq.question}>
          <H className="text-base font-semibold text-ink">{faq.question}</H>
          <p className="mt-2 leading-relaxed text-muted">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
