import Link from 'next/link';
import { brand } from '@/config/brand';
import { showcaseProjects } from '@/data/projects-showcase';
import { HomeSection } from '@/components/home/home-section';
import { HomeProofGallery } from '@/components/home/home-proof-gallery';

const PROOF_SLUGS = ['damtech-website', 'proplytic-property-software'] as const;

/**
 * Homepage proof gallery — authorised Damtech + Proplytic captures at native
 * aspect ratios. Each row pairs desktop and mobile frames; primary CTA opens
 * the case study on koppiesystems.co.za (live sites linked from case studies).
 */
export function HomeProofStrip() {
  const projects = PROOF_SLUGS.map((slug) => showcaseProjects.find((p) => p.slug === slug)).filter(
    (
      p,
    ): p is (typeof showcaseProjects)[number] & {
      externalSiteUrl: string;
      proofMedia: NonNullable<(typeof showcaseProjects)[number]['proofMedia']>;
    } => Boolean(p?.externalSiteUrl && p.proofMedia),
  );

  return (
    <HomeSection
      id="selected-work"
      tone="surface"
      eyebrow="Selected work"
      heading="Proof you can inspect"
      headingLevel="functional"
      intro={`${brand.name} builds public websites as well as the forms, portals, dashboards and operational workflows behind them. Here is what that looks like in practice — labelled honestly.`}
    >
      <HomeProofGallery projects={projects} />
      <p className="mt-10 md:mt-12">
        <Link href="/projects/" className="font-semibold text-link hover:underline">
          View all projects →
        </Link>
      </p>
    </HomeSection>
  );
}
