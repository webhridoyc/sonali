import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata('gallery', 'bn', { pathname: '/gallery' });

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
