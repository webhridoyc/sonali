"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GalleryPage() {
  const { t, lang } = useLanguage();

  const ArticleCard = ({ title, children, ...props }: { title: string, children: React.ReactNode, key: string }) => (
    <Card {...props} className="break-inside-avoid overflow-hidden flex flex-col bg-secondary/30 mb-6 shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{children}</p>
      </CardContent>
    </Card>
  );

  const ImageCard = ({ image, ...props }: { image: any, key: string }) => (
    <Card {...props} className="overflow-hidden break-inside-avoid mb-6 hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={image.imageUrl}
            alt={t(`gallery.images.${image.id}`) || image.description}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-background">
        <p className="font-semibold w-full text-center text-sm">{t(`gallery.images.${image.id}`) || image.description}</p>
      </CardFooter>
    </Card>
  );

  const galleryItems: any[] = PlaceHolderImages.filter(img => img.id !== 'registration-cert');

  // Interleave article cards
  const articles = [
    { type: 'article', title: t('gallery.article1Title'), content: t('gallery.article1Content') },
    { type: 'article', title: t('gallery.article2Title'), content: t('gallery.article2Content') }
  ];

  if (galleryItems.length > 3) {
    galleryItems.splice(3, 0, articles[0]);
  } else {
    galleryItems.push(articles[0]);
  }
  
  if (galleryItems.length > 8) {
    galleryItems.splice(8, 0, articles[1]);
  } else {
    galleryItems.push(articles[1]);
  }

  return (
    <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('gallery.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('gallery.desc')}</p>
      </header>

      <section>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {galleryItems.map((item, index) => {
            if (item.type === 'article') {
              return <ArticleCard key={`article-${index}`} title={item.title}>{item.content}</ArticleCard>;
            }
            return <ImageCard key={item.id || `image-${index}`} image={item} />;
          })}
        </div>
      </section>
    </div>
  );
}
