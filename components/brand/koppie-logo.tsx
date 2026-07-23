import type { ComponentProps } from 'react';
import Image from 'next/image';
import { brand } from '@/config/brand';

const wordmarkLine =
  'block font-heading text-[0.65rem] font-semibold uppercase tracking-[0.16em] leading-none';

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
      src="/brand/koppie-logo-symbol-nobg.svg"
      alt={titled && variant === 'symbol' ? title : ''}
      width={compact ? 32 : 36}
      height={compact ? 32 : 36}
      className={
        variant === 'symbol'
          ? `block h-8 w-8 shrink-0 self-center sm:h-9 sm:w-9 ${className ?? ''}`
          : 'block h-8 w-8 shrink-0 self-center sm:h-9 sm:w-9'
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
}

export type { KoppieLogoProps };
export type LogoMarkProps = Omit<ComponentProps<typeof KoppieLogo>, 'variant'>;
