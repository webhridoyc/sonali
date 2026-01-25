"use client";
import { HeroSlider } from '@/components/home/hero-slider';
import { TrustBar } from '@/components/home/trust-bar';
import { ServicesGrid } from '@/components/home/services-grid';
import { SanchaySection } from '@/components/home/sanchay-section';
import { useLanguage } from '@/context/language-context';

export default function Home() {
  const { lang } = useLanguage();
  return (
    <div className={lang === 'en' ? 'font-headline' : 'font-body'}>
      <HeroSlider />
      <TrustBar />
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <ServicesGrid />
        <SanchaySection />
      </div>
    </div>
  );
}
