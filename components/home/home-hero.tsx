import { getImageProps } from 'next/image';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { HomeHeroRotator } from '@/components/home/home-hero-rotator';

/** Decorative mountain layers — desktop landscape + mobile portrait (max-width 767px). */
const HERO_MOUNTAIN_DESKTOP = {
  src: '/images/koppie-systems-website-development-hero.webp',
  width: 2400,
  height: 900,
} as const;

const HERO_MOUNTAIN_MOBILE = {
  src: '/images/hero-mobile.webp',
  width: 1080,
  height: 1920,
} as const;

function CtaArrow() {
  return (
    <span className="home-hero-cta-arrow" aria-hidden="true">
      →
    </span>
  );
}

function HeroMountainImage() {
  const common = {
    alt: '',
    sizes: '100vw',
  } as const;

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    ...HERO_MOUNTAIN_MOBILE,
    priority: true,
  });

  const {
    props: { srcSet: desktopSrcSet, ...desktopRest },
  } = getImageProps({
    ...common,
    ...HERO_MOUNTAIN_DESKTOP,
    priority: true,
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
      <img {...desktopRest} alt="" className="home-hero-mountain-image" />
    </picture>
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
          <HeroMountainImage />
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
              Websites and systems built to generate{' '}
              <span className="text-cta">enquiries</span>
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
