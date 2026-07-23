import Link from 'next/link';
import { brand } from '@/config/brand';
import { KoppieLogo } from '@/components/brand/koppie-logo';

/**
 * Homepage link wrapping the review-candidate Figma logo.
 * Not used by SiteHeader yet — BrandWordmark remains live until approval.
 */
export function SiteLogo({
  href = '/',
  variant = 'full',
  className,
}: {
  href?: string;
  variant?: 'full' | 'symbol';
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${brand.name} home`}
      className={`logo-link inline-flex shrink-0 items-center py-2 pr-5 hover:opacity-90 ${className ?? ''}`}
    >
      <KoppieLogo variant={variant} titled={false} />
    </Link>
  );
}
