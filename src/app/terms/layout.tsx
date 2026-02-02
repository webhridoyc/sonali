import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME_EN } from '@/lib/seo';

const title = 'Terms & Conditions';
const description = `Read the community guidelines and terms for using the ${SITE_NAME_EN} website.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    url: '/terms',
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME_EN }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
