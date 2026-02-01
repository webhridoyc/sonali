
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { Users } from 'lucide-react';

export function JoinUsSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="join-us" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Users className="h-12 w-12 text-primary" />
            </div>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-primary ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
          {t('home.join.title')}
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          {t('home.join.text')}
        </p>
        <Button asChild size="lg">
          <Link href="/member-portal">{t('home.join.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
