"use client";

import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TermsPage() {
  const { t, lang } = useLanguage();

  const termsSections = [
    'introduction',
    'membership',
    'websiteUse',
    'intellectualProperty',
    'limitation',
    'governingLaw',
    'contact',
  ];

  return (
    <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('terms.title')}</h1>
        <p className="mt-4 text-sm text-muted-foreground">{t('terms.lastUpdated')}</p>
      </header>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8 md:p-10 space-y-8">
            {termsSections.map((section, index) => (
                <article key={section}>
                    <h2 className="text-2xl font-semibold text-primary mb-4">{t(`terms.${section}.title`)}</h2>
                    <p className="text-muted-foreground leading-relaxed">{t(`terms.${section}.content`)}</p>
                    {index < termsSections.length - 1 && <Separator className="mt-8" />}
                </article>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
