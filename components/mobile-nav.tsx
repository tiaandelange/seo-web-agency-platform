'use client';

/**
 * Mobile navigation disclosure — the site's only menu client component
 * (justification: expand/collapse state; see docs/technical/PERFORMANCE-BUDGET.md rule 1).
 * Links remain plain anchors; the toggle is a real <button> with aria-expanded.
 */
import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/data/navigation';

function withTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function MobileNav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const current = withTrailingSlash(pathname || '/');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="mobile-nav-toggle"
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <nav
          id={menuId}
          ref={panelRef}
          aria-label="Primary"
          className="mobile-nav-panel"
        >
          <ul className="mobile-nav-list">
            {links.map((item) => {
              const href = withTrailingSlash(item.href);
              const active = current === href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mobile-nav-cta-item">
              <Link
                href={cta.href}
                className="mobile-nav-cta"
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
