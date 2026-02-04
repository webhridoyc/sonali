import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata('projects', 'bn', { pathname: '/projects' });

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
