"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Download, Quote, ShieldCheck, Users, TrendingUp, Lock } from 'lucide-react';
import { translations } from '@/lib/translations';
import { generateFAQSchema, generateOrganizationReviewSchema } from '@/lib/seo-schemas';
import { faqData } from '@/lib/faq-data';
import { Breadcrumb } from '@/components/breadcrumb';

const ICON_MAP: Record<string, React.ElementType> = {
  shield: ShieldCheck,
  users: Users,
  'trending-up': TrendingUp,
  lock: Lock,
};

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const registrationCert = PlaceHolderImages.find((img) => img.id === 'registration-cert');
  const aboutReviews = translations.about.reviews.map((r) => ({
    author: r.author[lang],
    reviewBody: r.body[lang],
    datePublished: r.datePublished,
  }));
  const reviewSchema = generateOrganizationReviewSchema(aboutReviews);

  return (
    <>
      <Breadcrumb />
      
      <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('about.title')}</h1>
      </header>

      <section id="mission" className="mb-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">{t('about.missionTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">{t('about.missionText')}</p>
          </CardContent>
        </Card>
      </section>

      <section id="structure" className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t('about.structureTitle')}</h2>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {translations.about.committee.map((member, index) => (
                  <li key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                    <span className="font-semibold text-primary">{member.post[lang]}</span>
                    <span className="text-muted-foreground">{member.name[lang]}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="why-choose" className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t('about.whyChooseTitle')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {translations.about.whyChooseItems.map((item, index) => {
            const IconComp = ICON_MAP[item.icon] ?? ShieldCheck;
            return (
              <Card key={index} className="text-center shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-4 flex flex-col items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <IconComp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title[lang]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text[lang]}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="reviews" className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t('about.reviewsTitle')}</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">{t('about.reviewsIntro')}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {translations.about.reviews.map((review, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <Quote className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{review.author[lang]}</CardTitle>
                    <p className="text-sm text-muted-foreground">{review.role[lang]}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed italic">&ldquo;{review.body[lang]}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="legal" className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t('about.legalTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t('about.legalText')}</p>
            <Card className="bg-accent/20 border-accent">
                <CardContent className="p-6">
                    <p className="font-semibold">{t('about.regNo')}</p>
                    <p className="text-2xl font-bold text-primary">০০০৩৪</p>
                </CardContent>
            </Card>
          </div>
          <div className="flex flex-col items-center">
            {registrationCert && (
              <Card className="overflow-hidden w-full max-w-sm">
                <div className="relative h-96">
                    <Image
                        src={registrationCert.imageUrl}
                        alt={registrationCert.description}
                        data-ai-hint={registrationCert.imageHint}
                        fill
                        className="object-cover"
                    />
                </div>
                 <CardContent className="p-4">
                    <Button asChild className="w-full">
                        <a href={registrationCert.imageUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            {t('about.viewCert')}
                        </a>
                    </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* ADD FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateFAQSchema(
              lang === 'bn' ? faqData.bn.slice(0, 4) : faqData.en.slice(0, 4)
            )
          )
        }}
      />

      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema),
          }}
        />
      )}
      </div>
    </>
  );
}
