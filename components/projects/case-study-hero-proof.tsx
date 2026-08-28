import type { ProjectCardData } from '@/data/projects-showcase';
import { HomeProofFrame } from '@/components/home/home-proof-frame';

type CaseStudyHeroProofProps = {
  showcase: ProjectCardData;
  priority?: boolean;
};

/** Split desktop + mobile authorised frames for case-study hero aside. */
export function CaseStudyHeroProof({ showcase, priority = false }: CaseStudyHeroProofProps) {
  const media = showcase.proofMedia;
  if (!media) return null;

  const { desktop, mobile } = media;

  return (
    <div className="case-study-hero-proof">
      <HomeProofFrame
        src={showcase.desktopSrc}
        alt={showcase.imageAlt}
        width={desktop.width}
        height={desktop.height}
        caption={desktop.caption}
        focalPosition={showcase.focalPosition}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, min(520px, 42vw)"
      />
      <HomeProofFrame
        src={showcase.mobileSrc}
        alt={media.mobileAlt ?? showcase.imageAlt}
        width={mobile.width}
        height={mobile.height}
        caption={mobile.caption}
        focalPosition={showcase.focalPosition}
        sizes="(max-width: 1024px) min(280px, 72vw), 220px"
      />
    </div>
  );
}
