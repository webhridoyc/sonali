import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sonali Shokal Somobay Somity | Official Website',
  description:
    'Official portal for Sonali Shokal Somobay Somity, a Government-registered cooperative society in Savar, Dhaka, focused on eliminating rural poverty through livestock, textiles, handicrafts, and pottery projects.',
  keywords: [
    'Sonali Shokal',
    'Somobay Somity in Savar',
    'Ashulia Cooperative Society',
    'cooperative society Dhaka',
    'সোনালী সকাল সমবায় সমিতি',
  ],
};

export const viewport: Viewport = {
  themeColor: '#1b5e20',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
