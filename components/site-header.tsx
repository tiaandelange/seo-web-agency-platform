import Link from 'next/link';
import { headerNav, headerCta } from '@/data/navigation';
import { MobileNav } from '@/components/mobile-nav';
import { BrandWordmark } from '@/components/brand-wordmark';

/**
 * Global header — plain crawlable anchors, no JS-dependent menus
 * (docs/architecture/NAVIGATION-MODEL.md). Desktop nav is server-rendered;
 * the mobile disclosure is the site's single client component.
 */
export function SiteHeader() {
  return (
    <header className="relative border-b border-line bg-canvas">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <BrandWordmark />

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading text-sm font-medium text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={headerCta.href}
            className="rounded-card bg-cta px-4 py-2.5 text-sm font-semibold text-cta-contrast hover:opacity-90"
          >
            {headerCta.label}
          </Link>
        </nav>

        <MobileNav links={headerNav} cta={headerCta} />
      </div>
    </header>
  );
}
