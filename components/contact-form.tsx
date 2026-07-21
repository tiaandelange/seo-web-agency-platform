import { QuoteForm } from '@/components/quote-form';

/**
 * Short contact form — same server action and protections as the quote form,
 * minimal fields (docs/technical/FORM-ARCHITECTURE.md).
 */
export function ContactForm() {
  return <QuoteForm formType="contact" />;
}
