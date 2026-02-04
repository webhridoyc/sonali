"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BREADCRUMB_SCHEMA } from '@/lib/seo';
import { useLanguage } from '@/context/language-context';

export function Breadcrumb() {
  const pathname = usePathname();
  const { t } = useLanguage();
  
  const paths = pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    { name: t('nav.home'), url: 'https://sonalisokalsomobaysomity.com/' }
  ];
  
  paths.forEach((path, index) => {
    const url = `https://sonalisokalsomobaysomity.com/${paths.slice(0, index + 1).join('/')}`;
    const name = t(`nav.${path}`) || path.charAt(0).toUpperCase() + path.slice(1);
    breadcrumbItems.push({ name, url });
  });

  if (breadcrumbItems.length === 1) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BREADCRUMB_SCHEMA(breadcrumbItems))
        }}
      />
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-foreground">{item.name}</span>
              ) : (
                <Link href={item.url} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
