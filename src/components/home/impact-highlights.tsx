
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { translations } from '@/lib/translations';
import { ArrowRight } from 'lucide-react';

export function ImpactHighlights() {
  const { t, lang } = useLanguage();

  // Take the first two stories to highlight
  const highlightedStories = translations.projects.impactStories.slice(0, 2);

  return (
    <section id="impact-highlights" className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
          {t('home.impact.title')}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {highlightedStories.map((story) => {
          const imageData = PlaceHolderImages.find((i) => i.id === story.imageId);
          return (
            <Card key={story.imageId} className="overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
              {imageData && (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={imageData.imageUrl}
                    alt={story.title[lang]}
                    data-ai-hint={imageData.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{story.title[lang]}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">{story.summary[lang]}</p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0 font-semibold text-primary">
                    <Link href="/projects">
                        {t('home.impact.link')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
