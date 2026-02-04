
"use client";

import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Phone } from 'lucide-react';
import { ApplicationForm } from '@/components/member-portal/application-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { generateHowToSchema } from '@/lib/seo-schemas';
import { membershipHowTo } from '@/lib/howto-data';
import { Breadcrumb } from '@/components/breadcrumb';

export default function MemberPortalPage() {
  const { t, lang } = useLanguage();

  return (
    <>
      <Breadcrumb />
      <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('memberPortal.title')}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('memberPortal.desc')}</p>
        </header>

      <div className="flex justify-center">
        <section id="application" className="w-full max-w-lg">
          <Dialog>
            <Card>
              <CardHeader>
                <CardTitle>{t('memberPortal.joinTitle')}</CardTitle>
                <CardDescription>{t('memberPortal.joinDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    {t('memberPortal.applyOnline')}
                  </Button>
                </DialogTrigger>
                <Button asChild variant="secondary" className="w-full">
                  <a href="/docs/application-form.pdf" download>
                    <FileText className="mr-2 h-4 w-4" />
                    {t('memberPortal.downloadForm')}
                  </a>
                </Button>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2 pt-4 border-t">
                  <p className="text-sm text-center text-muted-foreground">{t('memberPortal.haveQuestions')}</p>
                  <Button asChild variant="outline">
                      <Link href="/contact">
                          <Phone className="mr-2 h-4 w-4" />
                          {t('contact.title')}
                      </Link>
                  </Button>
              </CardFooter>
            </Card>

            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{t('memberPortal.onlineApplicationTitle')}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[70vh] pr-6">
                <ApplicationForm />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </section>
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHowToSchema(lang === 'bn' ? membershipHowTo.bn.steps : membershipHowTo.en.steps))
        }}
      />
    </div>
    </>
  );
}
