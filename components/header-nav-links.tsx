'use client';

/**
 * Desktop header links — client only for aria-current against the active route.
 * Markup remains plain anchors; no menu state.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/data/navigation';

function withTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function HeaderNavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const current = withTrailingSlash(pathname || '/');

  return (
    <>
      {links.map((item) => {
        const href = withTrailingSlash(item.href);
        const active = current === href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="site-header-link"
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
