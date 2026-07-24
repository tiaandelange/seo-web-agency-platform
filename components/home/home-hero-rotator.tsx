'use client';

/**
 * Client component justification: timed opacity rotation of three static SSR-rendered
 * cards (~1 KB). Parent home-hero.tsx stays a server component; all card copy is in the
 * initial HTML for view-source / accessibility.
 */
import { useEffect, useState } from 'react';
import { brand } from '@/config/brand';

const ROTATE_MS = 5000;

const CARDS = [
  {
    eyebrow: 'No. 01 · How you got here',
    title: (
      <>
        Howzit — you found us
        <span className="block">
          through <span className="text-cta">our own SEO.</span>
        </span>
      </>
    ),
    body: 'No ads, no boosting, no "sponsored" label. You searched, Google agreed, and here we are — we’d love to do the same for your business.',
  },
  {
    eyebrow: 'No. 02 · The quiet part',
    title: (
      <>
        Websites that keep
        <span className="block">
          working <span className="text-cta">after hours.</span>
        </span>
      </>
    ),
    body: 'While you’re at the braai, the site is still catching enquiries and lining up quotes. No smoke breaks, no long weekends.',
  },
  {
    eyebrow: 'No. 03 · Where we’re from',
    title: (
      <>
        Built in {brand.baseCity}.
        <span className="block">
          Fast <span className="text-cta">everywhere.</span>
        </span>
      </>
    ),
    body: 'Your site lives on fast global edge servers, so when the lights go out here it stays up there. Nationwide, from the Jacaranda City.',
  },
];

export function HomeHeroRotator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % CARDS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid w-full" role="group" aria-label="What we do">
      {CARDS.map((card, i) => {
        const isActive = i === active;
        return (
          <div
            key={i}
            aria-hidden={!isActive}
            className={
              'col-start-1 row-start-1 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ' +
              (isActive ? 'opacity-100' : 'opacity-0 pointer-events-none')
            }
          >
            <p className="text-micro text-cta">{card.eyebrow}</p>
            <span className="home-hero-rule" aria-hidden="true" />
            <p className="home-hero-secondary-title">{card.title}</p>
            <p className="home-hero-secondary-body">{card.body}</p>
          </div>
        );
      })}
    </div>
  );
}
