export const SITE_URL = 'https://sonalisokalsomobaysomity.com';

export const SITE_NAME_EN = 'Sonali Shokal Somobay Somity';
export const SITE_NAME_BN = 'সোনালী সকাল সমবায় সমিতি';

export const SITE_DESCRIPTION_EN =
  'Official portal for Sonali Shokal Somobay Somity (সোনালী সকাল সমবায় সমিতি), a Government-registered cooperative society in Ashulia (Savar), Dhaka, focused on eliminating rural poverty through community development projects.';

const BRAND_KEYWORDS = [
  'সোনালী সকাল সমবায় সমিতি',
  'সোনালী সকাল সমবায় সমিতি লিমিটেড',
  'Sonali Sokal Cooperative Society',
  'Sonali Shokal Somobay Somity',
  'Sonali Sokal Somobay Somiti',
  'Sonali Sokal Somobay Somity',
  'sonaly sokal somobay somity',
];

const SAVINGS_KEYWORDS = [
  'সেরা সঞ্চয় প্রকল্প',
  'Best savings scheme',
  'মাসিক ডিপিএস সুবিধা',
  'Monthly DPS',
  'এফডিআর বা ফিক্সড ডিপোজিট',
  'FDR rates',
  'দৈনিক সঞ্চয় হিসাব',
  'Daily savings account',
  'সঞ্চয়ের ওপর সর্বোচ্চ মুনাফা',
  'High profit on savings',
];

const LOAN_KEYWORDS = [
  'সহজ শর্তে ঋণ সুবিধা',
  'Easy loan processing',
  'ক্ষুদ্র ব্যবসা ঋণ',
  'Small business loan',
  'ব্যক্তিগত ঋণ',
  'পার্সোনাল লোন',
  'Personal loan',
  'বিনা জামানতে ঋণ',
  'Collateral free loan',
  'স্বল্প সুদে ঋণ',
  'Low interest loan',
];

const TRUST_INFO_KEYWORDS = [
  'নিবন্ধিত সমবায় সমিতি',
  'Registered cooperative society',
  'সমবায় সমিতির সদস্য হওয়ার নিয়ম',
  'How to join a cooperative',
  'সমবায় অধিদপ্তরের নিবন্ধিত প্রতিষ্ঠান',
  'বিশ্বস্ত সমবায় সমিতি বাংলাদেশ',
];

const LOCAL_SEO_KEYWORDS = [
  // Office area targeting (Ashulia / Savar)
  'আশুলিয়ায় সেরা সমিতি',
  'সাভারে সেরা সমিতি',
  'আশুলিয়ায় সঞ্চয় ও ঋণদান',
  'সাভারে সঞ্চয় ও ঋণদান',
  'সমবায় সমিতি আশুলিয়া',
  'সমবায় সমিতি সাভার',
  'Ashulia cooperative society',
  'Savar cooperative society',
  'Somobay Somity in Savar',
  'cooperative society Dhaka',
];

export const SITE_KEYWORDS = [
  ...BRAND_KEYWORDS,
  ...SAVINGS_KEYWORDS,
  ...LOAN_KEYWORDS,
  ...TRUST_INFO_KEYWORDS,
  ...LOCAL_SEO_KEYWORDS,
];

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

// Re-export BREADCRUMB_SCHEMA for convenience
export { BREADCRUMB_SCHEMA } from './seo-schemas';
