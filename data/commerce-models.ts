/**
 * Ecommerce vs catalogue commercial models — shared matrix for both service pages.
 */

export type CommerceModel = {
  id: string;
  name: string;
  primaryPurpose: string;
  checkout: string;
  accountRequirement: string;
  typicalIntegrations: string;
  scope: 'Standard' | 'Custom' | 'Hybrid';
};

export const COMMERCE_MODELS: CommerceModel[] = [
  {
    id: 'standard-checkout',
    name: 'Standard checkout',
    primaryPurpose: 'Sell fixed-price products online with card or EFT payment.',
    checkout: 'Present — cart and payment gateway',
    accountRequirement: 'Optional guest checkout; accounts helpful for repeat buyers',
    typicalIntegrations: 'SA payment gateway, delivery rates, order email',
    scope: 'Standard',
  },
  {
    id: 'catalogue-only',
    name: 'Catalogue only',
    primaryPurpose: 'Publish a searchable range so buyers find specs and contact you.',
    checkout: 'Absent — contact or enquiry only',
    accountRequirement: 'Usually none on the public site',
    typicalIntegrations: 'Spec downloads, enquiry form, optional CRM notify',
    scope: 'Standard',
  },
  {
    id: 'rfq-basket',
    name: 'RFQ basket',
    primaryPurpose: 'Let buyers assemble a product list and request a formal quote.',
    checkout: 'Absent — quote request replaces payment',
    accountRequirement: 'Optional; useful for returning trade buyers',
    typicalIntegrations: 'RFQ inbox, quote PDF, status tracking',
    scope: 'Hybrid',
  },
  {
    id: 'trade-pricing',
    name: 'Trade / customer pricing',
    primaryPurpose: 'Show negotiated or tiered prices to authorised accounts.',
    checkout: 'Optional — cart may appear only after login',
    accountRequirement: 'Required — roles and price lists',
    typicalIntegrations: 'Account portal, price lists, invoice/terms handoff',
    scope: 'Custom',
  },
  {
    id: 'custom-integrations',
    name: 'Custom integrations',
    primaryPurpose: 'Connect stock, ERP, dealer networks or unusual fulfilment rules.',
    checkout: 'Depends on the commercial model above',
    accountRequirement: 'Usually required for B2B sync',
    typicalIntegrations: 'ERP/stock APIs, dealer feeds, custom fulfilment',
    scope: 'Custom',
  },
];
