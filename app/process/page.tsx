import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { ProcessSteps } from '@/components/process-steps';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';

const PATH = '/process/';
const TITLE = 'Our Web Development Process';
const DESCRIPTION =
  'How a project runs from scoping to launch and measurement: six documented stages, what you receive at each, and the honest timelines behind them.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const PROCESS_FAQS = [
  {
    question: 'How much of my time will the project need?',
    answer:
      'A few focused hours, front-loaded: the scoping conversation, service/product detail input, and two or three review points. The process is designed around decisions, not meetings — you approve structure once, drafts once, and launch once.',
  },
  {
    question: 'What if I want changes mid-project?',
    answer:
      'Small refinements are part of the review cycles. Genuine scope changes get a written mini-quote before any work happens — no surprise invoices, no silent scope creep, in either direction.',
  },
  {
    question: 'What do I actually receive at handover?',
    answer:
      'The live site on your domain, admin/hosting access in your name, the keyword-to-page research, Search Console verified and submitted, and a plain-language handover document. If we part ways the day after launch, you keep everything.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Our web development process"
        intro="Publishing the process is part of the pitch: if a provider cannot tell you exactly how a project runs, they are improvising with your money. Six stages, each with a defined output you can hold us to."
      />

      <Section>
        <ProcessSteps />
      </Section>

      <Section heading="Honest timelines" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          Starter sites: two to four weeks. Professional lead-generation builds: four to seven.
          Catalogues and ecommerce: five to ten, driven mostly by product-data readiness. Custom
          systems: staged over six to sixteen weeks after discovery. The variable that moves every
          timeline is content and decision speed — which is why the process front-loads both.
        </p>
      </Section>

      <Section heading="Process questions">
        <FaqList items={PROCESS_FAQS} />
      </Section>

      <CtaQuote heading="Start with the scoping conversation" body="One call, straight answers, and a written fixed quote — you'll know exactly what you'd be buying before spending a rand." />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION })} />
    </>
  );
}
