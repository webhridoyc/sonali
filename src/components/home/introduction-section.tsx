
"use client";

import { useLanguage } from '@/context/language-context';
import { Sprout } from 'lucide-react';

export function IntroductionSection() {
    const { t, lang } = useLanguage();

    return (
        <section id="introduction" className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                    <Sprout className="h-12 w-12 text-primary" />
                </div>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
                {t('home.intro.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.intro.text')}
            </p>
        </section>
    );
}
