"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function Breadcrumb() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null;
  }

  // Generate breadcrumb items
  const paths = pathname.split('/').filter(Boolean);
  
  // Map of path segments to display names
  const pathNameMap: Record<string, string> = {
    'about': t('nav.about'),
    'contact': t('nav.contact'),
    'projects': t('nav.projects'),
    'gallery': t('nav.gallery'),
    'member-portal': t('nav.memberPortal'),
    'terms': t('nav.terms'),
    'admin': 'Admin',
  };

  const breadcrumbItems = [
    { name: t('nav.home'), url: '/' },
    ...paths.map((path, index) => {
      const url = '/' + paths.slice(0, index + 1).join('/');
      return {
        name: pathNameMap[path] || path.charAt(0).toUpperCase() + path.slice(1),
        url,
      };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="bg-secondary/30 border-b">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-primary" aria-current="page">
                  {index === 0 && <Home className="h-4 w-4 inline mr-1" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {index === 0 && <Home className="h-4 w-4 inline mr-1" />}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
