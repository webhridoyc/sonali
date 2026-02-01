"use client";

import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

      <div className="max-w-4xl mx-auto space-y-8">
        {termsSections.map(section => (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="text-2xl">{t(`terms.${section}.title`)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{t(`terms.${section}.content`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
