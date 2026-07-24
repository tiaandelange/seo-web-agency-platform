'use client';

/**
 * Client component justification: mobile-only horizontal scroll-snap for the three
 * proof cards (~2 KB). Auto-advances every 5s with native swipe; desktop/tablet keep
 * the CSS grid (no JS behaviour). Parent HomeProofStrip stays a server component;
 * card markup and live URLs remain in the initial HTML.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProjectCardData } from '@/data/projects-showcase';
import { ProjectScreenshot } from '@/components/projects/project-screenshot';

const ROTATE_MS = 5000;
const RESUME_MS = 8000;
const MOBILE_MQ = '(max-width: 639px)';

type ProofProject = ProjectCardData & { externalSiteUrl: string };

export function HomeProofStripRotator({ projects }: { projects: ProofProject[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedUntilRef = useRef(0);
  const [active, setActive] = useState(0);
  const skipScrollSyncRef = useRef(false);

  const isMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_MQ).matches;
  }, []);

  const pauseAutoplay = useCallback(() => {
    pausedUntilRef.current = Date.now() + RESUME_MS;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || !isMobile()) return;
      const slide = track.children[index] as HTMLElement | undefined;
      if (!slide) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      skipScrollSyncRef.current = true;
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      window.setTimeout(
        () => {
          skipScrollSyncRef.current = false;
        },
        reduceMotion ? 0 : 450,
      );
    },
    [isMobile],
  );

  /* Auto-advance left → right every 5s on mobile only */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    const id = window.setInterval(() => {
      if (!isMobile()) return;
      if (Date.now() < pausedUntilRef.current) return;
      setActive((i) => (i + 1) % projects.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [isMobile, projects.length]);

  useEffect(() => {
    scrollToIndex(active);
  }, [active, scrollToIndex]);

  /* Keep active index in sync when the user swipes */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (skipScrollSyncRef.current || !isMobile()) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        if (slides.length === 0) return;
        const left = track.scrollLeft;
        let nearest = 0;
        let best = Number.POSITIVE_INFINITY;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - left);
          if (dist < best) {
            best = dist;
            nearest = i;
          }
        });
        setActive((prev) => (prev === nearest ? prev : nearest));
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, [isMobile]);

  return (
    <ul
      ref={trackRef}
      className="home-proof-strip mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Selected work you can inspect"
      onPointerDown={pauseAutoplay}
      onTouchStart={pauseAutoplay}
      onKeyDown={pauseAutoplay}
    >
      {projects.map((project, index) => {
        const liveUrl = project.externalSiteUrl;
        const host = liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
        return (
          <li
            key={project.slug}
            className="home-proof-strip__slide"
            aria-current={active === index ? 'true' : undefined}
          >
            <article className="flex h-full flex-col overflow-hidden border border-line bg-canvas">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
              >
                <ProjectScreenshot
                  desktopSrc={project.desktopSrc}
                  mobileSrc={project.mobileSrc}
                  alt={project.imageAlt}
                  focalPosition={project.focalPosition}
                  variant="card"
                />
                <div className="border-t border-line p-4">
                  <p className="text-label text-muted">{project.statusLabel}</p>
                  <h3 className="text-card-title mt-1 text-ink group-hover:text-link">
                    {project.shortTitle}
                    <span className="sr-only"> (opens live site in a new tab)</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{project.category}</p>
                  <p className="mt-2 text-sm font-medium text-link">{host} ↗</p>
                </div>
              </a>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
