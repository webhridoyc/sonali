import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata('about', 'bn', { pathname: '/about' });

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
