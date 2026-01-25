"use client";

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { Sprout, Shirt, Paintbrush } from 'lucide-react';
import { PotteryIcon } from '@/components/icons/pottery-icon';

export function ServicesGrid() {
  const { t, lang } = useLanguage();

  const services = [
    {
      icon: <Sprout className="h-10 w-10 text-primary" />,
      title: t('services.livestock'),
      description: t('services.livestockDesc'),
    },
    {
      icon: <Shirt className="h-10 w-10 text-primary" />,
      title: t('services.textiles'),
      description: t('services.textilesDesc'),
    },
    {
      icon: <Paintbrush className="h-10 w-10 text-primary" />,
      title: t('services.handicrafts'),
      description: t('services.handicraftsDesc'),
    },
    {
      icon: <PotteryIcon className="h-10 w-10 text-primary" />,
      title: t('services.pottery'),
      description: t('services.potteryDesc'),
    },
  ];

  return (
    <section id="services" className="py-12 md:py-16">
      <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
        {t('services.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="mb-4">{service.icon}</div>
              <CardTitle className={lang === 'en' ? 'font-headline' : 'font-body'}>{service.title}</CardTitle>
              <CardDescription className="pt-2">{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
