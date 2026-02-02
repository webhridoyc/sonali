import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME_EN } from '@/lib/seo';

const title = 'Contact';
const description = `Contact ${SITE_NAME_EN} in Ashulia, Savar, Dhaka. Phone: +8801883088338, Email: sonalisokalsomobaysomiti@gmail.com.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    url: '/contact',
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME_EN }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
