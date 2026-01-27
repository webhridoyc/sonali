"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/logo';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

export function MainNav() {
  const { t, lang } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/member-portal', label: t('nav.members') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="h-8 w-8" />
        <span className={cn('font-bold text-primary', lang === 'en' ? 'font-headline' : 'font-body')}>{t('site.name')}</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === item.href ? 'text-foreground' : 'text-foreground/60',
              lang === 'en' ? 'font-headline' : 'font-body'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
