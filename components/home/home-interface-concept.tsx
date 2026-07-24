import Image from 'next/image';
import { HomeSection } from '@/components/home/home-section';
import { HOMEPAGE_THUMBNAIL } from '@/lib/seo';

/**
 * Visible homepage preferred-image signal for Google (primaryImageOfPage).
 * Illustrative concept only — not live metrics or case-study proof.
 */
export function HomeInterfaceConcept() {
  return (
    <HomeSection
      id="digital-solutions"
      tone="surface"
      eyebrow="Illustrative interface concept"
      heading="Websites and systems designed around your operations"
      headingLevel="functional"
      intro="A concept view of the kinds of websites, portals and workflow tools we build — labelled clearly so it is never mistaken for live performance data."
    >
      <figure className="mt-8">
        <Image
          src={HOMEPAGE_THUMBNAIL.path}
          alt={HOMEPAGE_THUMBNAIL.alt}
          width={HOMEPAGE_THUMBNAIL.width}
          height={HOMEPAGE_THUMBNAIL.height}
          sizes="(max-width: 768px) 100vw, 1152px"
          className="h-auto w-full"
          priority={false}
        />
        <figcaption className="mt-3 text-sm text-muted">{HOMEPAGE_THUMBNAIL.caption}</figcaption>
      </figure>
    </HomeSection>
  );
}
