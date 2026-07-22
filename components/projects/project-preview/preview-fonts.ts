import { Allura, Fraunces, Inter } from 'next/font/google';

/**
 * Preview-scoped fonts — loaded via next/font so CSS never uses mid-file
 * `@import url(https://fonts.googleapis.com/...)` (invalid CSS that caused
 * Next.js Runtime Error "[object Event]" when project preview stylesheets loaded).
 */
export const previewInter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-preview-inter',
  display: 'swap',
});

export const previewFraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-preview-fraunces',
  display: 'swap',
});

export const previewAllura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-preview-allura',
  display: 'swap',
});
