"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export function SanchaySection() {
  const { t, lang } = useLanguage();

  return (
    <section id="sanchay" className="py-12 md:py-20 bg-secondary/50 rounded-lg mt-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
          {t('sanchay.title')}
        </h2>
        <p className={`text-2xl md:text-3xl font-semibold text-primary mb-8 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
          "{t('sanchay.slogan')}"
        </p>
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardContent className="p-8">
            <p className="text-muted-foreground leading-relaxed">
              {t('sanchay.desc')}
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href="/about#sanchay">{t('sanchay.learnMore')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
