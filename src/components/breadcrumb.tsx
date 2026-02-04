"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const pathNameMap: Record<string, { en: string; bn: string }> = {
  about: { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
  contact: { en: 'Contact', bn: 'যোগাযোগ' },
  projects: { en: 'Projects', bn: 'প্রকল্প' },
  gallery: { en: 'Gallery', bn: 'গ্যালারি' },
  'member-portal': { en: 'Member Portal', bn: 'সদস্য পোর্টাল' },
  terms: { en: 'Terms & Conditions', bn: 'শর্তাবলী' },
};

export function Breadcrumb() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  
  return (
    <nav aria-label="Breadcrumb" className="bg-secondary/20 py-3 px-4 border-b">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-primary transition-colors flex items-center"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">{lang === 'en' ? 'Home' : 'হোম'}</span>
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            const isLast = index === pathSegments.length - 1;
            const label = pathNameMap[segment] || { en: segment, bn: segment };
            
            return (
              <li key={href} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                {isLast ? (
                  <span className="text-primary font-medium" aria-current="page">
                    {label[lang]}
                  </span>
                ) : (
                  <Link 
                    href={href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label[lang]}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
