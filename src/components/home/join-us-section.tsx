
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function JoinUsSection() {
  const { t, lang } = useLanguage();

  const collageImages = [
    'hero-dairy',
    'hero-pottery',
    'hero-textile',
    'impact-rahima',
  ].map(id => PlaceHolderImages.find(img => img.id === id)).filter(img => !!img);


  return (
    <section id="join-us" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image Collage */}
      <div className="absolute inset-0 w-full h-full">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          {collageImages.map((image) => (
            image && (
              <div key={image.id} className="relative w-full h-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Users className="h-12 w-12 text-white" />
            </div>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-white ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
          {t('home.join.title')}
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-white/90 mb-8">
          {t('home.join.text')}
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/member-portal">{t('home.join.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
