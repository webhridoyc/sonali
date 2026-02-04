
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
      
      {/* Voice Search Optimization - Hidden Q&A content for crawlers */}
      <div className="sr-only">
        <h2>Common Questions About Sonali Shokal Somobay Somity</h2>
        <div>
          <h3>What is Sonali Shokal?</h3>
          <p>Sonali Shokal Somobay Somity is a government-registered cooperative society in Ashulia, Savar, Dhaka. We focus on poverty eradication through sustainable livelihood projects.</p>
        </div>
        <div>
          <h3>Where are you located?</h3>
          <p>We are located in Ashulia, Savar, Dhaka, Bangladesh. Our office is at Baid Gao, Pagla Bazar, Kabirpur, Ashulia.</p>
        </div>
        <div>
          <h3>How can I join?</h3>
          <p>You can join by applying online through our member portal or downloading the application form from our website.</p>
        </div>
        <div>
          <h3>What services do you offer?</h3>
          <p>We offer savings schemes, loan facilities, skill development training, and participation in cooperative projects.</p>
        </div>
      </div>
    </div>
  );
}
