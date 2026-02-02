export const SITE_URL = 'https://sonalisokalsomobaysomity.com';

export const SITE_NAME_EN = 'Sonali Shokal Somobay Somity';
export const SITE_NAME_BN = 'সোনালী সকাল সমবায় সমিতি';

export const SITE_DESCRIPTION_EN =
  'Official portal for Sonali Shokal Somobay Somity, a Government-registered cooperative society in Ashulia (Savar), Dhaka, focused on eliminating rural poverty through community development projects.';

export const DEFAULT_OG_IMAGE_PATH = '/images/hero-dairy.png';

export const LOGO_PATH = '/logo.png';
export const ICON_PATH = '/icon.png';
export const APPLE_ICON_PATH = '/apple-icon.png';

// Cache-buster for assets that may be replaced without changing filenames.
// Bump this string whenever you update logo/icon files.
export const ASSET_VERSION = '2026-02-02';

export function withAssetVersion(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${path}?v=${encodeURIComponent(ASSET_VERSION)}`;
}

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}
