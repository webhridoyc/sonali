"use client";

import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Edit } from 'lucide-react';
import { ApplicationForm } from '@/components/member-portal/application-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MemberPortalPage() {
  const { t, lang } = useLanguage();

  const documents = [
    { name: t('memberPortal.appForm'), href: '/docs/application-form.pdf' },
    { name: t('memberPortal.auditReport'), href: '/docs/audit-report.pdf' },
    { name: t('memberPortal.bylaws'), href: '/docs/bylaws.pdf' },
  ];

  return (
    <div className={`container mx-auto px-4 py-8 sm:py-12 md:py-16 ${lang === 'en' ? 'font-headline' : 'font-body'}`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('memberPortal.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('memberPortal.desc')}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <section id="downloads">
          <Card>
            <CardHeader>
              <CardTitle>{t('memberPortal.downloadsTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {documents.map((doc, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span>{doc.name}</span>
                    <Button asChild variant="outline" size="sm">
                      <a href={doc.href} download>
                        <Download className="mr-2 h-4 w-4" />
                        {t('memberPortal.download')}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="application">
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
                    Download
                  </a>
                </Button>
              </CardContent>
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
    </div>
  );
}
