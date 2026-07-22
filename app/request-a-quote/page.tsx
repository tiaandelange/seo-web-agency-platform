import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section, BulletList } from '@/components/section';
import { QuoteForm } from '@/components/quote-form';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';

const PATH = '/request-a-quote/';
const TITLE = 'Request a Proposal';
const DESCRIPTION =
  'Request a website or system proposal from Koppie Systems: a few scoping questions, a response within one business day, and a fixed itemised quote after one conversation — clear scope, no obligation.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; type?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Request a proposal"
        intro="Answer what you can below — rough is fine. You will hear back within one business day with either a scoping call invitation or clarifying questions, and after one conversation you receive a fixed, itemised quote. Clear scope, transparent pricing, no obligation."
      />

      {error && (
        <div className="mx-auto max-w-6xl px-4">
          <p role="alert" className="max-w-2xl rounded-card border border-line bg-surface p-4 text-ink">
            Something was missing from the form — please check the required fields (name, email,
            message and consent) and try again.
          </p>
        </div>
      )}

      <Section>
        <QuoteForm />
      </Section>

      <Section heading="What happens after you submit" tone="surface">
        <BulletList
          items={[
            'Within one business day: a reply from the person who would actually build your project — not a sales handler.',
            'One scoping conversation: your goals, our questions, honest guidance (including “you don’t need us” when true).',
            'A written fixed quote: itemised inclusions, exclusions, timeline and payment terms. It stays valid while you decide.',
          ]}
        />
      </Section>

      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'ContactPage' })} />
    </>
  );
}
