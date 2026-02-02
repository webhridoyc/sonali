import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME_EN } from '@/lib/seo';

const title = 'Gallery';
const description = `Photo gallery of ${SITE_NAME_EN} activities, community programs, and projects.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    url: '/gallery',
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME_EN }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
