
"use client";
import { HeroSlider } from '@/components/home/hero-slider';
import { TrustBar } from '@/components/home/trust-bar';
import { ServicesGrid } from '@/components/home/services-grid';
import { SanchaySection } from '@/components/home/sanchay-section';
import { useLanguage } from '@/context/language-context';
import { IntroductionSection } from '@/components/home/introduction-section';
import { ImpactHighlights } from '@/components/home/impact-highlights';
import { JoinUsSection } from '@/components/home/join-us-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const { lang } = useLanguage();
  return (
    <div className={lang === 'en' ? 'font-headline' : 'font-body'}>
      <HeroSlider />
      <TrustBar />
      <div className="container mx-auto px-4">
        <div className="py-12 md:py-20">
          <IntroductionSection />
        </div>
        <Separator />
        <ServicesGrid />
      </div>
      <div className="bg-secondary/30 mt-12 md:mt-16">
        <div className="container mx-auto px-4">
            <ImpactHighlights />
        </div>
      </div>
      <SanchaySection />
      <JoinUsSection />
    </div>
  );
}
