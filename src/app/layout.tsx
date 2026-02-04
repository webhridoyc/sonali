
import type { Metadata, Viewport } from 'next';
import { Poppins, Hind_Siliguri } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import {
  APPLE_ICON_PATH,
  DEFAULT_OG_IMAGE_PATH,
  ICON_PATH,
  SITE_DESCRIPTION_EN,
  SITE_KEYWORDS,
  SITE_NAME_EN,
  SITE_URL,
  absoluteUrl,
  withAssetVersion,
  ORGANIZATION_SCHEMA,
  FINANCIAL_SERVICE_SCHEMA,
} from '@/lib/seo';

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME_EN} | Official Website`,
    template: `%s | ${SITE_NAME_EN}`,
  },
  description: SITE_DESCRIPTION_EN,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_NAME_EN,
    description: SITE_DESCRIPTION_EN,
    siteName: SITE_NAME_EN,
    locale: 'en_US',
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        alt: SITE_NAME_EN,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME_EN,
    description: SITE_DESCRIPTION_EN,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  icons: {
    icon: [{ url: withAssetVersion(ICON_PATH), type: 'image/png' }],
    apple: [{ url: withAssetVersion(APPLE_ICON_PATH), type: 'image/png' }],
    shortcut: [withAssetVersion(ICON_PATH)],
    other: [{ rel: 'icon', url: withAssetVersion('/favicon.ico') }],
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
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME_EN,
    url: SITE_URL,
    inLanguage: ['en', 'bn'],
    keywords: SITE_KEYWORDS.join(', '),
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${hindSiliguri.variable} font-body antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href={absoluteUrl('/')} />
        <link rel="alternate" hrefLang="en" href={absoluteUrl('/')} />
        <link rel="alternate" hrefLang="bn" href={absoluteUrl('/')} />
        <link rel="alternate" hrefLang="x-default" href={absoluteUrl('/')} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FINANCIAL_SERVICE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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
