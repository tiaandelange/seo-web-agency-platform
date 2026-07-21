import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';

const PATH = '/request-a-quote/thank-you/';

/**
 * Conversion-completion page — noindex (docs/architecture/INDEXATION-RULES.md
 * rule 5). Reliable conversion point for analytics when tracking is enabled.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Thank You',
  description: 'Your message has been received — here is what happens next.',
  path: PATH,
  index: false,
});

export default function ThankYouPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading="Thank you — message received"
        intro="Your enquiry is in. Expect a reply within one business day from the person who would actually build your project."
      />
      <Section heading="While you wait">
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-muted marker:text-accent">
          <li>
            <Link href="/process/" className="text-accent underline">
              See how a project runs
            </Link>{' '}
            — the six stages and what you receive at each.
          </li>
          <li>
            <Link href="/pricing/" className="text-accent underline">
              Review indicative pricing
            </Link>{' '}
            — so the scoping conversation starts from shared numbers.
          </li>
          <li>
            <Link href="/resources/choosing-a-website-development-company/" className="text-accent underline">
              Read how to choose a developer
            </Link>{' '}
            — including the questions you should ask us.
          </li>
        </ul>
      </Section>
    </>
  );
}
