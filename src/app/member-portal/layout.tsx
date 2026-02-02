import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME_EN } from '@/lib/seo';

const title = 'Member Portal';
const description = `Apply for membership with ${SITE_NAME_EN}, download the application form, and reach out for assistance.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/member-portal' },
  openGraph: {
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    url: '/member-portal',
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME_EN }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function MemberPortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
