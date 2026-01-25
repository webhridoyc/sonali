"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';
import { Logo } from '@/components/layout/logo';
import { MainNav } from '@/components/layout/main-nav';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { useLanguage } from '@/context/language-context';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold font-headline">Sonali Shokal</span>
            </Link>
            <div className="mt-6 flex flex-col gap-4">
               <Link href="/" className="text-lg font-medium">{t('nav.home')}</Link>
               <Link href="/about" className="text-lg font-medium text-muted-foreground">{t('nav.about')}</Link>
               <Link href="/projects" className="text-lg font-medium text-muted-foreground">{t('nav.projects')}</Link>
               <Link href="/member-portal" className="text-lg font-medium text-muted-foreground">{t('nav.members')}</Link>
               <Link href="/contact" className="text-lg font-medium text-muted-foreground">{t('nav.contact')}</Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <Button asChild>
            <a href="tel:+8801234567890">
              <Phone className="mr-2 h-4 w-4" />
              {t('nav.callNow')}
            </a>
          </Button>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
