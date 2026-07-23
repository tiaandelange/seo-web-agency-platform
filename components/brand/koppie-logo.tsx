import type { ComponentProps } from 'react';
import Image from 'next/image';
import { brand } from '@/config/brand';

type KoppieLogoProps = {
  variant?: 'full' | 'symbol';
  /** When false, omit accessible name (parent Link should label). */
  titled?: boolean;
  title?: string;
  className?: string;
  compact?: boolean;
  colorVariant?: 'light' | 'dark';
};

/**
 * SVG mark file + optional HTML wordmark (not baked into the SVG).
 * Live header uses BrandWordmark; this mirrors the same pattern.
 */
export function KoppieLogo({
  variant = 'full',
  titled = true,
  title = brand.name,
  className,
  compact = false,
  colorVariant = 'light',
}: KoppieLogoProps) {
  const nameColor = colorVariant === 'dark' ? 'text-accent-contrast' : 'text-ink';
  const systemsColor = colorVariant === 'dark' ? 'text-sandstone' : 'text-link';

  const mark = (
    <Image
      src="/brand/koppie-logo-symbol.svg"
      alt={titled && variant === 'symbol' ? title : ''}
      width={compact ? 32 : 40}
      height={compact ? 32 : 40}
      className={
        variant === 'symbol'
          ? `h-8 w-8 shrink-0 sm:h-10 sm:w-10 ${className ?? ''}`
          : 'h-8 w-8 shrink-0 sm:h-10 sm:w-10'
      }
      unoptimized
      aria-hidden={variant === 'full' || !titled}
    />
  );

  if (variant === 'symbol') {
    return mark;
  }

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className ?? ''}`}
      role={titled ? 'img' : undefined}
      aria-label={titled ? title : undefined}
    >
      {mark}
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
}

export type { KoppieLogoProps };
export type LogoMarkProps = Omit<ComponentProps<typeof KoppieLogo>, 'variant'>;
