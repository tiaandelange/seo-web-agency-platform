import Link from 'next/link';
import { brand } from '@/config/brand';

/**
 * Temporary typographic wordmark — NOT a final approved logo.
 * Replace with final SVG when brand.verification.logoFinal is true
 * (see docs/brand/LOGO-PRODUCTION-BRIEF.md).
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

  const mark = (
    <span className="inline-flex items-center gap-2.5">
      {!brand.verification.logoFinal && (
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] bg-ink"
          aria-hidden="true"
          title="Provisional mark — subject to owner approval"
        >
          {/* Provisional geometric K / contour motif — private preview only */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 16V4M4 10L9 4M4 10L9 16M11 7.5C12.5 6 14.2 5.2 16 5M11 12.5C12.5 14 14.2 14.8 16 15"
              stroke="#B85C24"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      <span className={`leading-none ${nameColor}`}>
        <span className="block font-heading text-base font-bold tracking-tight sm:text-lg">
          {brand.shortName}
        </span>
        {!compact && (
          <span
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
