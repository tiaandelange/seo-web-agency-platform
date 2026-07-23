import Link from 'next/link';
import { headerNav, headerCta } from '@/data/navigation';
import { MobileNav } from '@/components/mobile-nav';
import { BrandWordmark } from '@/components/brand-wordmark';
import { HeaderNavLinks } from '@/components/header-nav-links';

/**
 * Global header — plain crawlable anchors, no JS-dependent menus
 * (docs/architecture/NAVIGATION-MODEL.md). Desktop nav is server-rendered
 * except for aria-current (HeaderNavLinks). Mobile disclosure is the site's
 * single menu client component.
 *
 * Homepage immersive treatment: CSS `body:has(.home-hero)` so internal pages
 * keep the light header without a duplicated header component.
 */
export function SiteHeader() {
  return (
    <header className="site-header relative border-b border-line bg-canvas">
      <div className="site-header-inner koppie-container flex items-center justify-between gap-4 py-3.5">
        <BrandWordmark />

        <nav aria-label="Primary" className="site-header-nav hidden items-center lg:flex">
          <HeaderNavLinks links={headerNav} />
          <Link href={headerCta.href} className="site-header-cta">
            {headerCta.label}
          </Link>
        </nav>

        <MobileNav links={headerNav} cta={headerCta} />
      </div>
    </header>
  );
}
