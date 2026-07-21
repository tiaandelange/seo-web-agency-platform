import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { brand } from '@/config/brand';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';
import { TrustSignals } from '@/components/trust-signals';
import { PlaceholderNotice } from '@/components/placeholder-notice';
import { CtaQuote } from '@/components/cta-quote';
import { JsonLd } from '@/components/json-ld';
import { webPageSchema } from '@/lib/schema';
import { team } from '@/data/team';

const PATH = '/about/';
const TITLE = 'About Us';
const DESCRIPTION =
  'An engineering-led South African web development studio: who builds your project, the standards it is held to, and why the business exists.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading={`About ${brand.name}`}
        intro="A small, engineering-led studio with a simple thesis: South African businesses deserve websites architected to be found and systems built to fit — from one accountable person, not a hand-off chain."
      />

      <Section heading="Why this business exists">
        <p className="max-w-3xl leading-relaxed text-muted">
          The local market splits into template sellers competing on price and agencies competing
          on gloss. Between them sits an underserved buyer: the contractor, engineer, manufacturer
          or practice owner who needs the phone to ring and the admin to shrink. {brand.name}{' '}
          exists for that buyer. We build search-first websites, and — because the founder is a
          systems engineer at heart — the quotation tools, admin panels and portals that websites
          grow into. One partner, both layers, everything owned by you.
        </p>
      </Section>

      <Section heading="How we're different" tone="surface">
        <TrustSignals />
      </Section>

      <Section heading="Who does the work">
        {team.map((member) => (
          <div key={member.name} className="max-w-3xl">
            {member.placeholder && (
              <PlaceholderNotice>
                Founder bio pending — will be replaced with the real profile before launch (owner
                input #9).
              </PlaceholderNotice>
            )}
            <h3 className="text-lg font-semibold text-ink">
              {member.name} — {member.role}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{member.bio}</p>
          </div>
        ))}
      </Section>

      <Section heading="What to look at next" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          The most useful pages for judging us: the{' '}
          <Link href="/process/" className="text-accent underline">
            process page
          </Link>{' '}
          (how projects actually run),{' '}
          <Link href="/pricing/" className="text-accent underline">
            pricing
          </Link>{' '}
          (published openly), and{' '}
          <Link href="/projects/" className="text-accent underline">
            projects
          </Link>{' '}
          (where real case studies publish as work completes — honestly labelled until then).
        </p>
      </Section>

      <CtaQuote heading="Talk to the person who would build it" ctaLabel="Book a consultation" />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'AboutPage' })} />
    </>
  );
}
