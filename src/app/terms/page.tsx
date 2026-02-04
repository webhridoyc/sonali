"use client";

import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb } from '@/components/breadcrumb';

export default function TermsPage() {
  const { t, lang } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <>
      <Breadcrumb />
      
      <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${isClient ? (lang === 'en' ? 'font-headline' : 'font-body') : ''}`}>
      <header className="text-center mb-12">
        {isClient ? (
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('terms.title')}</h1>
        ) : (
          <Skeleton className="h-12 w-3/4 mx-auto" />
        )}
        {isClient ? (
          <p className="mt-4 text-sm text-muted-foreground">{t('terms.lastUpdated')}</p>
        ) : (
          <Skeleton className="h-4 w-1/4 mx-auto mt-4" />
        )}
      </header>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8 md:p-10 space-y-8">
          {termsSections.map((section, index) => (
            <article key={section}>
              {isClient ? (
                <h2 className="text-2xl font-semibold text-primary mb-4">{t(`terms.${section}.title`)}</h2>
              ) : (
                <Skeleton className="h-8 w-1/2 mb-4" />
              )}
              {isClient ? (
                <p className="text-muted-foreground leading-relaxed">{t(`terms.${section}.content`)}</p>
              ) : (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              )}
              {index < termsSections.length - 1 && <Separator className="mt-8" />}
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
    </>
  );
}
