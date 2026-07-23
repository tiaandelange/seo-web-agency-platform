'use client';

/**
 * Desktop header links — client only for aria-current against the active route.
 * Markup remains plain anchors (including dropdown children); no JS menu state.
 * Submenus reveal via CSS :hover / :focus-within — crawlable in SSR HTML.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/data/navigation';

function withTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function HeaderNavLinks({ links }: { links: NavItem[] }) {
  const pathname = usePathname();
  const current = withTrailingSlash(pathname || '/');

  return (
    <>
      {links.map((item) => {
        const href = withTrailingSlash(item.href);
        const active = current === href;
        const childActive = item.children?.some(
          (child) => withTrailingSlash(child.href) === current,
        );

        if (!item.children?.length) {
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
        }

        const submenuId = `nav-submenu-${item.href.replace(/\W+/g, '-')}`;

        return (
          <div key={item.href} className="site-header-dropdown">
            <Link
              href={item.href}
              className="site-header-link"
              aria-current={active ? 'page' : undefined}
              aria-haspopup="true"
              aria-controls={submenuId}
              data-active-branch={childActive ? 'true' : undefined}
            >
              {item.label}
            </Link>
            <ul id={submenuId} className="site-header-submenu" role="list" aria-label={item.label}>
              {item.children.map((child) => {
                const childHref = withTrailingSlash(child.href);
                const childIsActive = current === childHref;
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="site-header-submenu-link"
                      aria-current={childIsActive ? 'page' : undefined}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
