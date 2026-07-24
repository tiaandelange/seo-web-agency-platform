import Link from 'next/link';
import { brand } from '@/config/brand';
import { showcaseProjects } from '@/data/projects-showcase';
import { HomeSection } from '@/components/home/home-section';
import { HomeProofStripRotator } from '@/components/home/home-proof-strip-rotator';

const PROOF_SLUGS = ['damtech-website', 'proplytic-property-software', 'wedding-website-portfolio'] as const;

/**
 * Early homepage proof — real screenshots with truthful labels (not a logo strip).
 * Cards open the live sites so visitors can inspect the real work.
 * Mobile: horizontal swipe + 5s auto-advance (see HomeProofStripRotator).
 */
export function HomeProofStrip() {
  const projects = PROOF_SLUGS.map((slug) => showcaseProjects.find((p) => p.slug === slug)).filter(
    (p): p is (typeof showcaseProjects)[number] & { externalSiteUrl: string } =>
      Boolean(p?.externalSiteUrl),
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
      <HomeProofStripRotator projects={projects} />
      <p className="mt-8">
        <Link href="/projects/" className="font-semibold text-link hover:underline">
          View all projects →
        </Link>
      </p>
    </HomeSection>
  );
}
