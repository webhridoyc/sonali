
import type { Metadata, Viewport } from 'next';
import { Poppins, Hind_Siliguri } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

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
  icons: {
    icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='50' fill='hsl(var(--primary))' /%3e%3ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='60' font-family='var(--font-poppins), sans-serif' font-weight='bold' fill='hsl(var(--accent))'%3eS%3c/text%3e%3c/svg%3e",
    shortcut: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='50' fill='hsl(var(--primary))' /%3e%3ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='60' font-family='var(--font-poppins), sans-serif' font-weight='bold' fill='hsl(var(--accent))'%3eS%3c/text%3e%3c/svg%3e",
    apple: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='50' fill='hsl(var(--primary))' /%3e%3ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='60' font-family='var(--font-poppins), sans-serif' font-weight='bold' fill='hsl(var(--accent))'%3eS%3c/text%3e%3c/svg%3e",
  },
};

export const viewport: Viewport = {
  themeColor: '#1A854D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${hindSiliguri.variable} font-body antialiased`}
      suppressHydrationWarning
    >
      <body>
        <FirebaseClientProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
