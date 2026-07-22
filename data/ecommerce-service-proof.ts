/**
 * Explicit proof-module data for ecommerce website development (Phase 2).
 */

export interface CommerceFrictionStep {
  id: string;
  label: string;
  friction: string;
}

export interface CommerceLayer {
  id: string;
  index: string;
  heading: string;
  items: string[];
}

export interface EcommerceReadinessQuestion {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface EcommerceClassification {
  id: string;
  label: string;
  summary: string;
  /** CSS hook — shown when matching radios are selected */
  className: string;
}

export const COMMERCE_FRICTION_STEPS: CommerceFrictionStep[] = [
  {
    id: 'discovery',
    label: 'Product discovery',
    friction: 'Weak search visibility — buyers never reach the catalogue.',
  },
  {
    id: 'product',
    label: 'Product page',
    friction: 'Slow product pages on mobile raise bounce before add-to-cart.',
  },
  {
    id: 'cart',
    label: 'Cart',
    friction: 'Unclear delivery pricing appears too late in the journey.',
  },
  {
    id: 'payment',
    label: 'Payment',
    friction: 'Checkout abandonment when gateways or trust cues are weak.',
  },
  {
    id: 'confirmation',
    label: 'Confirmation',
    friction: 'Poor fulfilment communication creates support calls after purchase.',
  },
];

export const COMMERCE_LAYERS: CommerceLayer[] = [
  {
    id: 'storefront',
    index: '01',
    heading: 'Storefront',
    items: [
      'Product catalogue with SEO-structured category and product pages',
      'Unique metadata and structured data per product',
      'Performance budget: fast mobile loads as a hard requirement',
    ],
  },
  {
    id: 'transaction',
    index: '02',
    heading: 'Transaction',
    items: [
      'Cart and checkout tuned for completion on mobile',
      'South African payment gateway integration (PayFast, Yoco, Peach — chosen at scoping)',
      'Delivery options, order confirmation and status emails',
    ],
  },
  {
    id: 'operations',
    index: '03',
    heading: 'Operations',
    items: ['Order management workflow suited to your fulfilment process'],
  },
  {
    id: 'growth',
    index: '04',
    heading: 'Growth infrastructure',
    items: ['Search Console, analytics and ecommerce conversion events'],
  },
];

export const ECOMMERCE_READINESS_QUESTIONS: EcommerceReadinessQuestion[] = [
  {
    id: 'products',
    label: 'Approximate product count',
    options: [
      { value: 'under-50', label: 'Under 50' },
      { value: '50-500', label: '50–500' },
      { value: '500-plus', label: '500+' },
    ],
  },
  {
    id: 'payments',
    label: 'Payment approach',
    options: [
      { value: 'sa-gateway', label: 'SA card / EFT gateway' },
      { value: 'mixed', label: 'Mixed / still deciding' },
      { value: 'b2b-account', label: 'Account / invoice terms' },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery complexity',
    options: [
      { value: 'simple', label: 'Simple flat or regional rates' },
      { value: 'complex', label: 'Complex / variable logistics' },
      { value: 'quote', label: 'Often quoted manually' },
    ],
  },
  {
    id: 'model',
    label: 'Primary selling model',
    options: [
      { value: 'retail', label: 'Direct retail checkout' },
      { value: 'catalogue-rfq', label: 'Catalogue + quotation' },
      { value: 'b2b', label: 'B2B account commerce' },
    ],
  },
];

/**
 * Classification panels — revealed by explicit :has combinations.
 * Soft language only; planning ranges, not binding quotes.
 */
export const ECOMMERCE_CLASSIFICATIONS: EcommerceClassification[] = [
  {
    id: 'standard',
    className: 'commerce-class--standard',
    label: 'Standard commerce build',
    summary:
      'A focused storefront with SA payments and SEO-structured product pages is likely the right starting shape.',
  },
  {
    id: 'catalogue',
    className: 'commerce-class--catalogue',
    label: 'Catalogue and quotation platform',
    summary:
      'When buyers request quotes more often than they check out, a catalogue-plus-RFQ path is commonly a better fit than forced ecommerce.',
  },
  {
    id: 'b2b',
    className: 'commerce-class--b2b',
    label: 'B2B account commerce',
    summary:
      'Account pricing and invoice terms usually need workflow rules beyond a template storefront — worth scoping as commercial software.',
  },
  {
    id: 'custom',
    className: 'commerce-class--custom',
    label: 'Custom transactional system',
    summary:
      'Large catalogues, complex logistics or unusual fulfilment rules commonly need discovery before an honest build quote.',
  },
];
