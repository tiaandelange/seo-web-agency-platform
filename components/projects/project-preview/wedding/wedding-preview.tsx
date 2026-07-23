'use client';

import { ProjectPreviewViewport } from '../project-preview-viewport';
import { usePreviewEntrance } from '../use-preview-entrance';
import { previewAllura, previewFraunces, previewInter } from '../preview-fonts';
import './wedding-preview.css';

/**
 * Wedding site header + hero only — rebuilt from Wedding_site @ 359ad704.
 * Interactive links/forms are inert presentation spans.
 */
export function WeddingPreview() {
  const rootRef = usePreviewEntrance(true);

  return (
    <ProjectPreviewViewport previewId="wedding" active>
      <div
        ref={rootRef}
        className={`weddingPreviewRoot ${previewInter.variable} ${previewFraunces.variable} ${previewAllura.variable} ${previewInter.className}`}
        data-project-preview="wedding"
      >
        <header className="site-header" id="wedding-preview-top">
          <nav className="nav" aria-label="Primary">
            <span className="brand">
              <span className="brand__monogram" aria-hidden="true">
                ✝
              </span>
              <span className="brand__text">De Lange Troue</span>
            </span>

            <span className="nav__toggle" aria-hidden="true">
              <span className="nav__toggle-lines" />
            </span>

            <div className="nav__meta nav__meta--bar" aria-hidden="true">
              <span className="nav__date">26 September 2026</span>
              <span className="nav__cta">RSVP</span>
            </div>

            <div className="nav__menu" id="navMenu">
              <ul className="nav__links" role="list">
                <li>
                  <span className="nav__link">Ons Storie</span>
                </li>
                <li>
                  <span className="nav__link">Skedule</span>
                </li>
                <li>
                  <span className="nav__link">Kleur Skema</span>
                </li>
                <li>
                  <span className="nav__link">Akkommodasie</span>
                </li>
                <li>
                  <span className="nav__link">Geskenke</span>
                </li>
              </ul>
            </div>

            <div className="nav__meta nav__meta--menu">
              <span className="nav__date">26 September 2026</span>
              <span className="nav__cta">RSVP</span>
            </div>
          </nav>
        </header>

        <section className="hero" aria-label="Hero">
          <div className="hero__media" role="img" aria-label="Wedding hero photos">
            <div className="hero__deck hero__deck--desktop" data-hero-deck="desktop">
              <div className="hero__slide is-active" aria-hidden="false" />
            </div>
            <div className="hero__deck hero__deck--mobile" data-hero-deck="mobile">
              <div className="hero__slide is-active" aria-hidden="false" />
            </div>
          </div>
          <div className="hero__overlay" aria-hidden="true" />

          <div className="hero__content container">
            <h1 className="hero__title">
              <span className="reveal-split" data-split>
                Tiaan &amp; Nina
              </span>
            </h1>
          </div>

          <div className="hero__datebar" aria-label="Wedding date">
            <span className="hero__datepart">SATERDAG</span>
            <svg
              className="hero__curl"
              width="70"
              height="12"
              viewBox="0 0 70 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 6c8-5 16-5 24 0s16 5 24 0 16-5 20 0"
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="hero__datepart">26 SEPTEMBER</span>
            <svg
              className="hero__curl"
              width="70"
              height="12"
              viewBox="0 0 70 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 6c8-5 16-5 24 0s16 5 24 0 16-5 20 0"
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="hero__datepart">2026</span>
          </div>
        </section>
      </div>
    </ProjectPreviewViewport>
  );
}
