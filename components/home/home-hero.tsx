import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { HomeHeroRotator } from '@/components/home/home-hero-rotator';

/** Decorative mountain silhouette — dimensions match the WebP asset (prevents CLS). */
const HERO_MOUNTAIN = {
  src: '/images/koppie-systems-website-development-hero.webp',
  width: 2400,
  height: 900,
} as const;

function CtaArrow() {
  return (
    <span className="home-hero-cta-arrow" aria-hidden="true">
      →
    </span>
  );
}

export function HomeHero() {
  return (
    <header className="home-hero band-ink relative overflow-hidden">
      <div className="home-hero-bg" aria-hidden="true">
        <div className="home-hero-base" />
        <div className="home-hero-atmosphere" />
        <div className="home-hero-glow" />
        <div className="home-hero-light-haze" />
        <div className="home-hero-haze" />
        <div className="home-hero-grid" />
        <div className="home-hero-linework" />
        <div className="home-hero-particles" />
        <div className="home-hero-mountains">
          <Image
            src={HERO_MOUNTAIN.src}
            alt=""
            width={HERO_MOUNTAIN.width}
            height={HERO_MOUNTAIN.height}
            priority
            sizes="100vw"
            className="home-hero-mountain-image"
          />
          <div className="home-hero-mountain-tone" />
          <div className="home-hero-mountain-rim" />
        </div>
        <div className="home-hero-vignette" />
      </div>

      <div className="home-container home-hero-content relative">
        <div className="home-hero-grid-layout">
          <div className="home-hero-primary">
            <p className="home-eyebrow home-hero-eyebrow">SEO-first websites &amp; digital systems</p>
            <h1 className="text-display-editorial home-hero-title">
              Websites and systems built to generate enquiries
            </h1>
            <p className="home-hero-lead text-lead">
              {brand.name} is an SEO-first website design and development company in South Africa. We
              build sites that get you found on Google — plus the business systems behind them: forms,
              portals, dashboards and quotation workflows — for technical, industrial and service
              businesses.
            </p>
            <div className="home-hero-actions">
              <Link href="/request-a-quote/" className="home-hero-cta-primary">
                Request a Proposal
                <CtaArrow />
              </Link>
              <Link href="/projects/" className="home-hero-cta-secondary">
                View Our Work
                <CtaArrow />
              </Link>
            </div>
          </div>
          <div className="home-hero-secondary">
            <HomeHeroRotator />
          </div>
        </div>
      </div>
    </header>
  );
}
