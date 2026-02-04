import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata('member-portal', 'bn', { pathname: '/member-portal' });

export default function MemberPortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
