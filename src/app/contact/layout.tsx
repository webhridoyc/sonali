import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata('contact', 'bn', { pathname: '/contact' });

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
