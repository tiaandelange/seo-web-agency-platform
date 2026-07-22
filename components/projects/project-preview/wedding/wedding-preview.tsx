'use client';

import { previewCanvasHeight, previewDisplayHeightClass } from '../preview-config';
import { ProjectPreviewViewport } from '../project-preview-viewport';
import { usePreviewEntrance } from '../use-preview-entrance';
import { previewAllura, previewFraunces, previewInter } from '../preview-fonts';
import './wedding-preview.css';

export function WeddingPreview() {
  const rootRef = usePreviewEntrance(true);

  return (
    <ProjectPreviewViewport
      previewId="wedding"
      canvasHeight={previewCanvasHeight('wedding')}
      displayHeightClass={previewDisplayHeightClass('wedding')}
      active
    >
      <div
        ref={rootRef}
        className={`weddingPreviewRoot ${previewInter.variable} ${previewFraunces.variable} ${previewAllura.variable} ${previewInter.className}`}
        data-project-preview="wedding"
      >
        <header className="site-header" id="wedding-preview-top">
          <nav className="nav is-scrolled" aria-label="Primary">
            <span className="brand">
              <span className="brand__monogram" aria-hidden="true">
                ✝
              </span>
              <span className="brand__text">De Lange Troue</span>
            </span>
            <div className="nav__menu" id="navMenu">
              <ul className="nav__links" role="list">
                <li>
                  <span className="nav__link">Our Story</span>
                </li>
                <li>
                  <span className="nav__link">Accommodation</span>
                </li>
                <li>
                  <span className="nav__link">Wedding Palette</span>
                </li>
                <li>
                  <span className="nav__link">Gifts</span>
                </li>
              </ul>
              <div className="nav__meta">
                <span className="nav__date">26 September 2026</span>
                <span className="nav__cta">RSVP</span>
              </div>
            </div>
          </nav>
        </header>

        <section className="hero" aria-label="Hero">
          <div
            className="hero__media"
            role="img"
            aria-label="Wedding hero image"
            style={{
              backgroundImage: 'url(/project-previews/wedding/hero.jpg)',
            }}
          />
          <div className="hero__overlay" aria-hidden="true" />

          <div className="hero__content container">
            <div className="hero__kicker reveal-on-load">
              <span className="hero__kicker-line">A September celebration</span>
            </div>

            <h1 className="hero__title">
              <span className="reveal-split" data-split>
                NINA & TIAAN
              </span>
            </h1>

            <p className="hero__subtitle reveal-on-load" style={{ ['--d' as string]: '180ms' }}>
              With full hearts, we invite you to share in our wedding weekend — September{' '}
              <span className="nowrap">2026</span>.
            </p>

            <div className="hero__actions reveal-on-load" style={{ ['--d' as string]: '260ms' }}>
              <span className="btn btn--primary">RSVP</span>
              <span className="btn btn--ghost">Our Story</span>
            </div>

            <div className="hero__flourish" aria-hidden="true">
              <svg
                className="flourish"
                width="520"
                height="180"
                viewBox="0 0 520 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 136c62-54 118-80 168-79 44 1 66 28 72 49 7 26-5 52-36 57-36 6-67-21-66-56 2-45 56-93 140-90 67 2 121 40 170 95"
                  stroke="rgba(248,244,237,0.55)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M262 78c-8-22-4-45 18-57 22-11 47-1 56 19 8 19 4 45-22 55"
                  stroke="rgba(248,244,237,0.35)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M320 100c19-15 44-18 63-5 19 13 22 38 8 56"
                  stroke="rgba(248,244,237,0.28)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="hero__scrollhint" aria-hidden="true">
            <span className="scrollhint__line" />
            <span className="scrollhint__text">Scroll</span>
          </div>
        </section>
      </div>
    </ProjectPreviewViewport>
  );
}
