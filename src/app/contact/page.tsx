"use client";

import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Facebook } from 'lucide-react';
import { Map } from '@/components/contact/map';
import { ContactForm } from '@/components/contact/contact-form';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const { t, lang } = useLanguage();

  return (
    <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('contact.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('contact.desc')}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <section id="contact-form">
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.send')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>

        <section id="contact-info" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('footer.contactInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <p>{t('footer.address')}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+8801234567890" className="hover:underline">+880 1234 567890</a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.socialTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                  {t('contact.facebook')}
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <section id="map" className="mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t('contact.officeTitle')}</h2>
        <Map />
      </section>
    </div>
  );
}
