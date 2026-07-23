import { COMMERCE_MODELS } from '@/data/commerce-models';
import { Container } from '@/components/layout/container';

/**
 * Responsive commerce model comparison — stacked labelled rows on narrow viewports.
 */
export function CommerceModelMatrix() {
  return (
    <section
      id="commerce-models"
      className="border-b border-line"
      aria-labelledby="commerce-models-heading"
    >
      <Container className="py-14 md:py-20">
        <h2 id="commerce-models-heading" className="text-section-title text-ink">
          Choose the commerce model
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          Checkout, catalogue-only, RFQ basket, trade pricing and custom integrations solve different
          problems. Pick the shape before you buy a stack.
        </p>

        <div className="commerce-matrix mt-10">
          {COMMERCE_MODELS.map((model) => (
            <article key={model.id} className="commerce-matrix__card">
              <header className="commerce-matrix__header">
                <h3 className="text-base font-semibold text-ink">{model.name}</h3>
                <p className="text-label mt-1 text-cta">{model.scope} scope</p>
              </header>
              <dl className="commerce-matrix__dl">
                <div>
                  <dt>Primary purpose</dt>
                  <dd>{model.primaryPurpose}</dd>
                </div>
                <div>
                  <dt>Checkout</dt>
                  <dd>{model.checkout}</dd>
                </div>
                <div>
                  <dt>Account requirement</dt>
                  <dd>{model.accountRequirement}</dd>
                </div>
                <div>
                  <dt>Typical integrations</dt>
                  <dd>{model.typicalIntegrations}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
