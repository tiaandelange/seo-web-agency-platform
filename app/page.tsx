import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { buildMetadata, HOMEPAGE_THUMBNAIL } from '@/lib/seo';
import { JsonLd } from '@/components/json-ld';
import { professionalServiceSchema, webPageSchema } from '@/lib/schema';
import { Section } from '@/components/section';
import { FaqList } from '@/components/faq-list';
import { faqs } from '@/data/faqs';
import { HomeHero } from '@/components/home/home-hero';
import { HomeActionLedger } from '@/components/home/home-action-ledger';
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
import { HomeInterfaceConcept } from '@/components/home/home-interface-concept';
import { HomePriceStrip } from '@/components/home/home-price-strip';

const HOME_TITLE = 'SEO-First Websites & Digital Systems';
const HOME_DESCRIPTION =
  'Koppie Systems builds SEO-first websites, ecommerce platforms and practical digital systems for technical and service businesses across South Africa.';

/** Social share description — dedicated OG card copy, not the in-page hero. */
const HOME_OG_DESCRIPTION =
  'Professional websites, customer portals and custom digital systems for South African businesses.';

export const metadata: Metadata = {
  ...buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
    ogTitle: `${brand.name} | Websites and Business Systems`,
    ogDescription: HOME_OG_DESCRIPTION,
    // Site-wide card from app/opengraph-image.jpg + twitter-image.jpg (no duplicate images here).
  }),
  title: { absolute: `${HOME_TITLE} | ${brand.name}` },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <EnquirySystemAnchor />
      <HomePriceStrip />
      <HomeProofStrip />
      <HomeActionLedger
        id="home-action-after-proof"
        tone="sandstone"
        copy="Authorised Damtech and Proplytic work is inspectable on this site — tell us your brief when you are ready to scope something similar."
        secondaryHref="/projects/"
        secondaryLabel="Inspect our work"
      />
      <HomeInterfaceConcept />
      <CapabilityPaths />
      <ServiceArchitecture />
      <EditorialBreak />
      <WorkflowExploded />
      <MethodologySpine />
      <HomeActionLedger
        id="home-action-after-method"
        tone="ink"
        copy="Research, structure, build and measure — one documented method. Share your operations and we will map the website or system shape in discovery."
        secondaryHref="/process/"
        secondaryLabel="Full process documentation"
      />
      <ProofPreview />
      <HomeAuditStrip />
      <HomePackagesFocus />
      <HomeActionLedger
        id="home-action-after-pricing"
        tone="sandstone"
        copy="Indicative packages and fixed-price audits are starting points — the quote after scoping is the binding number."
        secondaryHref="/seo-audit/"
        secondaryLabel="Compare audit tiers"
      />

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

      <HomeActionLedger
        id="home-action-closing"
        tone="ink"
        title="Ready to talk about your project?"
        copy="Tell us what you need and get a straight answer — clear scope, indicative pricing and a fixed quote after one scoping conversation."
        primaryLabel="Request a Proposal"
        secondaryHref={
          brand.contact.whatsapp
            ? `https://wa.me/${brand.contact.whatsapp}`
            : '/contact/'
        }
        secondaryLabel={brand.contact.whatsapp ? 'Or WhatsApp us' : 'Or contact us'}
        secondaryExternal={Boolean(brand.contact.whatsapp)}
      />
      <JsonLd
        data={[
          professionalServiceSchema(),
          webPageSchema({
            path: '/',
            title: `${HOME_TITLE} | ${brand.name}`,
            description: HOME_DESCRIPTION,
            primaryImage: {
              path: HOMEPAGE_THUMBNAIL.path,
              width: HOMEPAGE_THUMBNAIL.width,
              height: HOMEPAGE_THUMBNAIL.height,
              caption: HOMEPAGE_THUMBNAIL.caption,
            },
          }),
        ]}
      />
    </>
  );
}
