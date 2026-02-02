import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE_PATH, SITE_DESCRIPTION_EN, SITE_NAME_EN } from '@/lib/seo';

const title = 'About';
const description = `Learn about ${SITE_NAME_EN}: our mission, committee, and official registration details.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    url: '/about',
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME_EN }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
