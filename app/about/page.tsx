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
import { founderExtendedBio, team } from '@/data/team';

const PATH = '/about/';
const TITLE = 'About Us';
const DESCRIPTION =
  'About Koppie Systems — a Pretoria-based studio building SEO-first websites and practical digital systems for technical, industrial and service businesses.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHeader
        heading={`About ${brand.name}`}
        intro={`${brand.positioning} Based in ${brand.baseCity}, we work with businesses throughout South Africa through structured discovery, design, development, testing and review.`}
      />

      <Section heading="Why this business exists">
        <p className="max-w-3xl leading-relaxed text-muted">
          The local market splits into template sellers competing on price and agencies competing
          on gloss. Between them sits an underserved buyer: the contractor, engineer, manufacturer
          or practice owner who needs the phone to ring and the admin to shrink. {brand.name}{' '}
          exists for that buyer. We build search-first websites, and the quotation tools, admin
          panels and portals those websites grow into. One partner, both layers, everything owned
          by you.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{brand.brandPromise}</p>
      </Section>

      <Section heading="How we're different" tone="surface">
        <TrustSignals />
      </Section>

      <Section heading="Who does the work">
        {team.map((member) => (
          <div key={member.name} className="max-w-3xl">
            {member.placeholder && (
              <PlaceholderNotice>
                Founder biography is drafted for preview and awaits final owner approval before
                public launch. ECSA registration category is not published until verified wording
                is supplied.
              </PlaceholderNotice>
            )}
            <h3 className="text-lg font-semibold text-ink">
              {member.name} — {member.role}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{member.bio}</p>
            <p className="mt-4 leading-relaxed text-muted">{founderExtendedBio}</p>
          </div>
        ))}
      </Section>

      <Section heading="What to look at next" tone="surface">
        <p className="max-w-3xl leading-relaxed text-muted">
          The most useful pages for judging us: the{' '}
          <Link href="/process/" className="text-link underline">
            process page
          </Link>{' '}
          (how projects actually run),{' '}
          <Link href="/pricing/" className="text-link underline">
            pricing
          </Link>{' '}
          (indicative ranges published openly), and{' '}
          <Link href="/projects/" className="text-link underline">
            work
          </Link>{' '}
          (where real case studies publish as work completes with permission — honestly labelled
          until then).
        </p>
      </Section>

      <CtaQuote
        heading="Talk to the person who would build it"
        ctaLabel="Request a Proposal"
      />
      <JsonLd data={webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, pageType: 'AboutPage' })} />
    </>
  );
}
