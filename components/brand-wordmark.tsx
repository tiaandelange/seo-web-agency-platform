import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/config/brand';

const wordmarkLine =
  'block font-heading text-[0.65rem] font-semibold uppercase tracking-[0.16em] leading-none';

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
  const markSize = compact ? 32 : 36;

  const mark = (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/brand/koppie-logo-symbol-nobg.svg"
        alt=""
        width={markSize}
        height={markSize}
        className="block h-8 w-8 shrink-0 self-center sm:h-9 sm:w-9"
        priority
        unoptimized
        aria-hidden
      />
      <span className="flex flex-col justify-center gap-1">
        <span data-brand-name className={`${wordmarkLine} ${nameColor}`}>
          {brand.shortName.toUpperCase()}
        </span>
        {!compact && (
          <span data-brand-systems className={`${wordmarkLine} ${systemsColor}`}>
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
