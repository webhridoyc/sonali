"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-context';
import Autoplay from "embla-carousel-autoplay"

export function HeroSlider() {
  const { t, lang } = useLanguage();
  const slides = [
    {
      id: 'hero-dairy',
      caption: t('hero.slide3'),
    },
    {
      id: 'hero-pottery',
      caption: t('hero.slide1'),
    },
    {
      id: 'hero-textile',
      caption: t('hero.slide2'),
    },
  ];

  return (
    <div className="relative w-full">
      <Carousel 
        opts={{ loop: true }}
        plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        className="w-full">
        <CarouselContent>
          {slides.map((slide) => {
            const imageData = PlaceHolderImages.find((img) => img.id === slide.id);
            if (!imageData) return null;
            return (
              <CarouselItem key={slide.id}>
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                  <Image
                    src={imageData.imageUrl}
                    alt={imageData.description}
                    data-ai-hint={imageData.imageHint}
                    fill
                    className="object-cover"
                    priority={slides.indexOf(slide) === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h1
                      className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg px-4 ${
                        lang === 'en' ? 'font-headline' : 'font-body'
                      }`}
                    >
                      {slide.caption}
                    </h1>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-white/50" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-white/50" />
      </Carousel>
    </div>
  );
}
