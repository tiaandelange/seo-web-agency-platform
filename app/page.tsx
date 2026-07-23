import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';
import { professionalServiceSchema, webPageSchema } from '@/lib/schema';
import { Section } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { CtaQuote } from '@/components/cta-quote';
import { faqs } from '@/data/faqs';
import { HomeHero } from '@/components/home/home-hero';
import { HomeProofStrip } from '@/components/home/home-proof-strip';
import { EnquirySystemAnchor } from '@/components/home/enquiry-system-anchor';
import { CapabilityPaths } from '@/components/home/capability-paths';
import { ServiceArchitecture } from '@/components/home/service-architecture';
import { WorkflowExploded } from '@/components/home/workflow-exploded';
import { MethodologySpine } from '@/components/home/methodology-spine';
import { EditorialBreak } from '@/components/home/editorial-break';
import { ProofPreview } from '@/components/home/proof-preview';
import { HomeAuditStrip } from '@/components/home/home-audit-strip';
import { HomePackagesFocus } from '@/components/home/home-packages-focus';

const HOME_TITLE = 'SEO-First Websites & Digital Systems';
const HOME_DESCRIPTION =
  'Koppie Systems builds SEO-first websites, ecommerce platforms and practical digital systems for technical and service businesses across South Africa.';

/** Social share description — separate from decorative in-page hero alt (which stays empty). */
const HOME_OG_IMAGE_DESCRIPTION =
  'Koppie Systems — SEO-first websites, ecommerce platforms and custom business systems in South Africa';

const HOME_OG_IMAGE = '/images/koppie-systems-website-development-hero.webp';

export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
    ogDescription: HOME_OG_IMAGE_DESCRIPTION,
    socialImage: HOME_OG_IMAGE,
    socialImageAlt: HOME_OG_IMAGE_DESCRIPTION,
    socialImageWidth: 2400,
    socialImageHeight: 900,
  }),
  title: { absolute: `${HOME_TITLE} | ${brand.name}` },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeProofStrip />
      <EnquirySystemAnchor />
      <CapabilityPaths />
      <ServiceArchitecture />
      <EditorialBreak />
      <WorkflowExploded />
      <MethodologySpine />
      <ProofPreview />
      <HomeAuditStrip />
      <HomePackagesFocus />

      <Section heading="A new company, run on senior standards">
        <p className="max-w-prose leading-relaxed text-muted">
          We are a new company and we say so plainly — you will find no invented client counts or
          purchased reviews here. What you get instead: structured discovery, design, development,
          testing and review; a documented method you can inspect on every page of this site; and
          measurement wired in from day one. As projects complete with permission, real case
          studies will appear{' '}
          <Link href="/projects/" className="text-link underline">
            in our work section
          </Link>
          .
        </p>
      </Section>

      <Section heading="Common questions" tone="surface">
        <FaqList items={faqs.slice(0, 3)} />
        <p className="mt-6">
          <Link href="/faq/" className="font-medium text-link hover:underline">
            More questions and answers →
          </Link>
        </p>
      </Section>

      <CtaQuote
        heading="Ready to talk about your project?"
        body="Tell us what you need and get a straight answer — clear scope, indicative pricing and a fixed quote after one scoping conversation."
        ctaLabel="Request a Proposal"
      />
      <JsonLd
        data={[
          professionalServiceSchema(),
          webPageSchema({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION }),
        ]}
      />
    </>
  );
}
