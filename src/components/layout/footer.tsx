"use client";

import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { useLanguage } from '@/context/language-context';

export function Footer() {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Left: Logo & Intro */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <Logo className="h-10 w-10" />
              <span className={`text-xl font-bold ${lang === 'en' ? 'font-headline' : 'font-body'}`}>Sonali Shokal</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">{t('footer.intro')}</p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-4">
            <h4 className={`font-semibold text-lg ${lang === 'en' ? 'font-headline' : 'font-body'}`}>{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">{t('footer.about')}</Link></li>
              <li><Link href="/#sanchay" className="text-muted-foreground hover:text-primary">{t('footer.savings')}</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">{t('footer.terms')}</Link></li>
            </ul>
          </div>

          {/* Right: Address & Map Link */}
          <div className="space-y-4">
            <h4 className={`font-semibold text-lg ${lang === 'en' ? 'font-headline' : 'font-body'}`}>{t('footer.contactInfo')}</h4>
            <p className="text-sm text-muted-foreground">{t('footer.address')}</p>
            <Link href="/contact#map" className="text-sm text-primary hover:underline">
              {lang === 'en' ? 'View on Map' : 'মানচিত্রে দেখুন'}
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-primary text-primary-foreground text-center py-4">
        <div className="container mx-auto px-4 text-sm">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
