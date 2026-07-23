import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/config/brand';

/**
 * Site brand lockup — Figma SVG mark + HTML stacked wordmark
 * (docs/brand/ASSET-REGISTER.md). Wordmark stays live type, not baked into the SVG.
 */
export function BrandWordmark({
  href = '/',
  variant = 'light',
  compact = false,
}: {
  href?: string;
  variant?: 'light' | 'dark';
  compact?: boolean;
}) {
  const nameColor = variant === 'dark' ? 'text-accent-contrast' : 'text-ink';
  const systemsColor = variant === 'dark' ? 'text-sandstone' : 'text-link';
  const markSize = compact ? 32 : 40;

  const mark = (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/brand/koppie-logo-symbol.svg"
        alt=""
        width={markSize}
        height={markSize}
        className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
        priority
        unoptimized
        aria-hidden
      />
      <span className={`leading-none ${nameColor}`}>
        <span
          data-brand-name
          className="block font-heading text-base font-bold tracking-tight sm:text-lg"
        >
          {brand.shortName}
        </span>
        {!compact && (
          <span
            data-brand-systems
            className={`mt-0.5 block font-heading text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${systemsColor}`}
          >
            Systems
          </span>
        )}
      </span>
    </span>
  );

  return (
    <Link href={href} className="font-heading hover:opacity-90" aria-label={`${brand.name} home`}>
      {mark}
    </Link>
  );
}
