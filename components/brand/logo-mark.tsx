import type { ComponentProps } from 'react';
import { KoppieLogo } from '@/components/brand/koppie-logo';

/** Symbol-only convenience wrapper for compact UI review. */
export function LogoMark(props: Omit<ComponentProps<typeof KoppieLogo>, 'variant'>) {
  return <KoppieLogo variant="symbol" {...props} />;
}
