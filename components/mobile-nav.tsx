'use client';

/**
 * Mobile navigation disclosure — the site's only client component
 * (justification: expand/collapse state; see docs/technical/PERFORMANCE-BUDGET.md rule 1).
 * Links remain plain anchors; the toggle is a real <button> with aria-expanded.
 */
import { useState } from 'react';
import Link from 'next/link';
import type { NavLink } from '@/data/navigation';

export function MobileNav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-card border border-line px-3 py-2 text-sm font-medium text-ink"
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="absolute inset-x-0 top-full z-50 border-b border-line bg-canvas px-4 pb-6 shadow-sm"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-card px-3 py-3 text-base font-medium text-ink hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={cta.href}
            className="block rounded-card bg-cta px-4 py-3 text-center text-base font-semibold text-cta-contrast"
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
