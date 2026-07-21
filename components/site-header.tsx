import Link from 'next/link';
import { brand } from '@/config/brand';
import { headerNav, headerCta } from '@/data/navigation';
import { MobileNav } from '@/components/mobile-nav';

/**
 * Global header — plain crawlable anchors, no JS-dependent menus
 * (docs/architecture/NAVIGATION-MODEL.md). Desktop nav is server-rendered;
 * the mobile disclosure is the site's single client component.
 */
export function SiteHeader() {
  return (
    <header className="relative border-b border-line bg-canvas">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          {brand.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={headerCta.href}
            className="rounded-card bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:opacity-90"
          >
            {headerCta.label}
          </Link>
        </nav>

        <MobileNav links={headerNav} cta={headerCta} />
      </div>
    </header>
  );
}
