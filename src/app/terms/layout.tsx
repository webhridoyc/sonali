import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata('terms', 'bn', { pathname: '/terms' });

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
