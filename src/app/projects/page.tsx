"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { translations } from '@/lib/translations';

export default function ProjectsPage() {
  const { t, lang } = useLanguage();

  type GalleryImageItem = {
    id: string;
    title: string;
  };

  type GallerySectionProps = {
    title: string;
    images: GalleryImageItem[];
  };

  const galleryImages = {
    livestock: [
      { id: 'project-cows', title: t('projects.cows') },
      { id: 'project-goats', title: t('projects.goats') },
      { id: 'project-ducks', title: t('projects.ducks') },
    ],
    artisans: [
      { id: 'project-pottery-work', title: t('projects.pottery') },
      { id: 'project-weaving', title: t('projects.weaving') },
      { id: 'project-artisan', title: t('projects.artisan') },
    ],
  };

  const impactStories = translations.projects.impactStories;

  const GallerySection = ({ title, images }: GallerySectionProps) => (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img: GalleryImageItem) => {
          const imageData = PlaceHolderImages.find((i) => i.id === img.id);
          if (!imageData) return null;
          return (
            <Card key={img.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={imageData.imageUrl}
                    alt={img.title}
                    data-ai-hint={imageData.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-background">
                <p className="font-semibold w-full text-center">{img.title}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('projects.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('projects.desc')}</p>
      </header>

      <GallerySection title={t('projects.livestockTitle')} images={galleryImages.livestock} />
      <GallerySection title={t('projects.artisanTitle')} images={galleryImages.artisans} />

      <section id="impact" className="py-12 bg-secondary/50 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t('projects.impactTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {impactStories.map((story, index) => {
                return (
                    <Card key={index} className="overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>{story.title[lang]}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground leading-relaxed">{story.story[lang]}</p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </section>
    </div>
  );
}
