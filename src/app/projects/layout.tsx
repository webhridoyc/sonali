import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME_EN } from '@/lib/seo';

const title = 'Projects';
const description = `Explore ${SITE_NAME_EN} projects in livestock, textiles, handicrafts, and pottery—plus community impact stories.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    url: '/projects',
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: SITE_NAME_EN }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${SITE_NAME_EN}`,
    description,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
