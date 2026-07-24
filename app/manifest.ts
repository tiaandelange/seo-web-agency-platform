import type { MetadataRoute } from 'next';
import { brand } from '@/config/brand';

/**
 * Web app manifest — brand presence for install/home-screen contexts.
 * Browser favicon remains `app/icon.svg` (file convention).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.shortName,
    description: brand.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#14242b',
    theme_color: '#14242b',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
