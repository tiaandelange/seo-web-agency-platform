import type { Faq } from '@/types/content';
import { CardGrid, InfoCard } from '@/components/cards';

/**
 * FAQ block — semantic heading + prose pairs (crawlable, no JS accordions).
 * FAQPage JSON-LD is added ONLY on /faq/ (D-09), by the page, not here.
 * `variant="cards"` uses elevated InfoCards for visual rhythm (same copy).
 */
export function FaqList({
  items,
  headingLevel = 3,
  variant = 'list',
}: {
  items: Faq[];
  headingLevel?: 3 | 4;
  variant?: 'list' | 'cards';
}) {
  if (items.length === 0) return null;

  if (variant === 'cards') {
    return (
      <CardGrid>
        {items.map((faq) => (
          <InfoCard
            key={faq.question}
            title={faq.question}
            description={faq.answer}
            headingAs="h3"
          />
        ))}
      </CardGrid>
    );
  }

  const H: 'h3' | 'h4' = headingLevel === 3 ? 'h3' : 'h4';
  return (
    <div className="measure-narrow space-y-6">
      {items.map((faq) => (
        <div key={faq.question}>
          <H className="text-card-title text-ink">{faq.question}</H>
          <p className="mt-2 leading-relaxed text-muted">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
