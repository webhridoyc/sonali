export const SITE_URL = 'https://sonalisokalsomobaysomity.com';

export const SITE_NAME_EN = 'Sonali Shokal Somobay Somity';
export const SITE_NAME_BN = 'সোনালী সকাল সমবায় সমিতি';

export const SITE_DESCRIPTION_EN =
  'Official portal for Sonali Shokal Somobay Somity (সোনালী সকাল সমবায় সমিতি), a Government-registered cooperative society in Ashulia (Savar), Dhaka, focused on eliminating rural poverty through community development projects.';

export const SITE_DESCRIPTION_BN =
  'সোনালী সকাল সমবায় সমিতি (Sonali Shokal Somobay Somity) এর অফিসিয়াল পোর্টাল, আশুলিয়া (সাভার), ঢাকায় অবস্থিত একটি সরকার-নিবন্ধিত সমবায় সমিতি যা গ্রামীণ দারিদ্র্য দূরীকরণে সম্প্রদায় উন্নয়ন প্রকল্পের মাধ্যমে কাজ করে।';

const BRAND_KEYWORDS = [
  'সোনালী সকাল সমবায় সমিতি',
  'সোনালী সকাল সমবায় সমিতি লিমিটেড',
  'Sonali Sokal Cooperative Society',
  'Sonali Shokal Somobay Somity',
  'Sonali Sokal Somobay Somiti',
  'Sonali Sokal Somobay Somity',
  'sonaly sokal somobay somity',
];

const SAVINGS_KEYWORDS = [
  'সেরা সঞ্চয় প্রকল্প',
  'Best savings scheme',
  'মাসিক ডিপিএস সুবিধা',
  'Monthly DPS',
  'এফডিআর বা ফিক্সড ডিপোজিট',
  'FDR rates',
  'দৈনিক সঞ্চয় হিসাব',
  'Daily savings account',
  'সঞ্চয়ের ওপর সর্বোচ্চ মুনাফা',
  'High profit on savings',
];

const LOAN_KEYWORDS = [
  'সহজ শর্তে ঋণ সুবিধা',
  'Easy loan processing',
  'ক্ষুদ্র ব্যবসা ঋণ',
  'Small business loan',
  'ব্যক্তিগত ঋণ',
  'পার্সোনাল লোন',
  'Personal loan',
  'বিনা জামানতে ঋণ',
  'Collateral free loan',
  'স্বল্প সুদে ঋণ',
  'Low interest loan',
];

const TRUST_INFO_KEYWORDS = [
  'নিবন্ধিত সমবায় সমিতি',
  'Registered cooperative society',
  'সমবায় সমিতির সদস্য হওয়ার নিয়ম',
  'How to join a cooperative',
  'সমবায় অধিদপ্তরের নিবন্ধিত প্রতিষ্ঠান',
  'বিশ্বস্ত সমবায় সমিতি বাংলাদেশ',
];

const LOCAL_SEO_KEYWORDS = [
  // Office area targeting (Ashulia / Savar)
  'আশুলিয়ায় সেরা সমিতি',
  'সাভারে সেরা সমিতি',
  'আশুলিয়ায় সঞ্চয় ও ঋণদান',
  'সাভারে সঞ্চয় ও ঋণদান',
  'সমবায় সমিতি আশুলিয়া',
  'সমবায় সমিতি সাভার',
  'Ashulia cooperative society',
  'Savar cooperative society',
  'Somobay Somity in Savar',
  'cooperative society Dhaka',
];

export const SITE_KEYWORDS = [
  ...BRAND_KEYWORDS,
  ...SAVINGS_KEYWORDS,
  ...LOAN_KEYWORDS,
  ...TRUST_INFO_KEYWORDS,
  ...LOCAL_SEO_KEYWORDS,
];

export const DEFAULT_OG_IMAGE_PATH = '/images/hero-dairy.png';

export const LOGO_PATH = '/logo.png';
export const ICON_PATH = '/icon.png';
export const APPLE_ICON_PATH = '/apple-icon.png';

// Cache-buster for assets that may be replaced without changing filenames.
// Bump this string whenever you update logo/icon files.
export const ASSET_VERSION = '2026-02-02';

export function withAssetVersion(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${path}?v=${encodeURIComponent(ASSET_VERSION)}`;
}

export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

// Page-specific metadata
export const PAGE_METADATA = {
  home: {
    en: {
      title: 'Home | Sonali Shokal Somobay Somity',
      description: 'Join Sonali Shokal Somobay Somity - a trusted cooperative society in Ashulia, Savar offering best savings schemes, easy loans, and community development. Government-registered since 2022.',
      keywords: ['cooperative society Bangladesh', 'savings scheme Dhaka', 'easy loan Ashulia', 'Savar cooperative', 'community development'],
      ogImage: '/images/hero-dairy.png',
    },
    bn: {
      title: 'হোম | সোনালী সকাল সমবায় সমিতি',
      description: 'সোনালী সকাল সমবায় সমিতিতে যোগ দিন - আশুলিয়া, সাভারের বিশ্বস্ত সমবায় সমিতি যা সেরা সঞ্চয় প্রকল্প, সহজ ঋণ এবং সম্প্রদায় উন্নয়ন প্রদান করে। ২০২২ সাল থেকে সরকার-নিবন্ধিত।',
      keywords: ['সমবায় সমিতি বাংলাদেশ', 'সঞ্চয় প্রকল্প ঢাকা', 'সহজ ঋণ আশুলিয়া', 'সাভার সমবায়', 'সম্প্রদায় উন্নয়ন'],
      ogImage: '/images/hero-dairy.png',
    },
  },
  about: {
    en: {
      title: 'About Us | Sonali Shokal Somobay Somity',
      description: 'Learn about Sonali Shokal Somobay Somity - our mission to eliminate rural poverty, organizational structure, and Government registration #00034. Serving Ashulia community since 2022.',
      keywords: ['about cooperative society', 'registered cooperative', 'poverty alleviation', 'community organization', 'Ashulia cooperative'],
      ogImage: '/images/about-og.png',
    },
    bn: {
      title: 'আমাদের সম্পর্কে | সোনালী সকাল সমবায় সমিতি',
      description: 'সোনালী সকাল সমবায় সমিতি সম্পর্কে জানুন - গ্রামীণ দারিদ্র্য দূরীকরণে আমাদের লক্ষ্য, সাংগঠনিক কাঠামো এবং সরকারী নিবন্ধন #০০০৩৪। ২০২২ সাল থেকে আশুলিয়া সম্প্রদায়ের সেবায় নিয়োজিত।',
      keywords: ['সমবায় সমিতি সম্পর্কে', 'নিবন্ধিত সমবায়', 'দারিদ্র্য দূরীকরণ', 'সম্প্রদায় সংগঠন', 'আশুলিয়া সমবায়'],
      ogImage: '/images/about-og.png',
    },
  },
  contact: {
    en: {
      title: 'Contact Us | Sonali Shokal Somobay Somity',
      description: 'Get in touch with Sonali Shokal Somobay Somity. Visit our office in Ashulia, Savar or call +880 1883-088338. Email: sonalisokalsomobaysomiti@gmail.com',
      keywords: ['contact cooperative society', 'Ashulia office', 'Savar address', 'cooperative phone number', 'reach us'],
      ogImage: '/images/contact-og.png',
    },
    bn: {
      title: 'যোগাযোগ | সোনালী সকাল সমবায় সমিতি',
      description: 'সোনালী সকাল সমবায় সমিতির সাথে যোগাযোগ করুন। আমাদের আশুলিয়া, সাভার অফিসে আসুন অথবা কল করুন +৮৮০ ১৮৮৩-০৮৮৩৩৮। ইমেইল: sonalisokalsomobaysomiti@gmail.com',
      keywords: ['সমবায় সমিতি যোগাযোগ', 'আশুলিয়া অফিস', 'সাভার ঠিকানা', 'সমবায় ফোন নম্বর', 'আমাদের সাথে যোগাযোগ'],
      ogImage: '/images/contact-og.png',
    },
  },
  projects: {
    en: {
      title: 'Community Projects | Sonali Shokal Somobay Somity',
      description: 'Explore our community development projects: livestock farming, artisan support, and poverty alleviation initiatives. Real impact stories from Ashulia, Savar.',
      keywords: ['community projects', 'livestock farming', 'artisan support', 'poverty alleviation', 'rural development'],
      ogImage: '/images/projects-og.png',
    },
    bn: {
      title: 'সম্প্রদায় প্রকল্প | সোনালী সকাল সমবায় সমিতি',
      description: 'আমাদের সম্প্রদায় উন্নয়ন প্রকল্পগুলি দেখুন: পশুপালন, কারিগর সহায়তা এবং দারিদ্র্য দূরীকরণ উদ্যোগ। আশুলিয়া, সাভার থেকে বাস্তব প্রভাবের গল্প।',
      keywords: ['সম্প্রদায় প্রকল্প', 'পশুপালন', 'কারিগর সহায়তা', 'দারিদ্র্য দূরীকরণ', 'গ্রামীণ উন্নয়ন'],
      ogImage: '/images/projects-og.png',
    },
  },
  gallery: {
    en: {
      title: 'Photo Gallery | Sonali Shokal Somobay Somity',
      description: 'View our photo gallery showcasing community activities, development projects, and success stories from Sonali Shokal Somobay Somity in Ashulia, Savar.',
      keywords: ['photo gallery', 'community photos', 'project images', 'cooperative activities', 'success stories'],
      ogImage: '/images/gallery-og.png',
    },
    bn: {
      title: 'ফটো গ্যালারি | সোনালী সকাল সমবায় সমিতি',
      description: 'আমাদের ফটো গ্যালারি দেখুন যা আশুলিয়া, সাভারে সোনালী সকাল সমবায় সমিতির সম্প্রদায় কার্যক্রম, উন্নয়ন প্রকল্প এবং সফলতার গল্প প্রদর্শন করে।',
      keywords: ['ফটো গ্যালারি', 'সম্প্রদায় ফটো', 'প্রকল্প ছবি', 'সমবায় কার্যক্রম', 'সফলতার গল্প'],
      ogImage: '/images/gallery-og.png',
    },
  },
  'member-portal': {
    en: {
      title: 'Member Portal | Sonali Shokal Somobay Somity',
      description: 'Join Sonali Shokal Somobay Somity as a member. Apply online or download the application form. Start your journey to financial empowerment today.',
      keywords: ['member application', 'join cooperative', 'membership form', 'become member', 'cooperative registration'],
      ogImage: '/images/member-portal-og.png',
    },
    bn: {
      title: 'সদস্য পোর্টাল | সোনালী সকাল সমবায় সমিতি',
      description: 'সদস্য হিসেবে সোনালী সকাল সমবায় সমিতিতে যোগ দিন। অনলাইনে আবেদন করুন বা আবেদন ফর্ম ডাউনলোড করুন। আজই আর্থিক ক্ষমতায়নের যাত্রা শুরু করুন।',
      keywords: ['সদস্য আবেদন', 'সমবায়ে যোগদান', 'সদস্যপদ ফর্ম', 'সদস্য হন', 'সমবায় নিবন্ধন'],
      ogImage: '/images/member-portal-og.png',
    },
  },
  terms: {
    en: {
      title: 'Terms & Conditions | Sonali Shokal Somobay Somity',
      description: 'Read the terms and conditions for using Sonali Shokal Somobay Somity website and services. Understand membership rules, website usage, and governing policies.',
      keywords: ['terms and conditions', 'membership rules', 'website policy', 'cooperative terms', 'usage guidelines'],
      ogImage: '/images/terms-og.png',
    },
    bn: {
      title: 'শর্তাবলী | সোনালী সকাল সমবায় সমিতি',
      description: 'সোনালী সকাল সমবায় সমিতির ওয়েবসাইট এবং সেবা ব্যবহারের শর্তাবলী পড়ুন। সদস্যপদ নিয়ম, ওয়েবসাইট ব্যবহার এবং নিয়ন্ত্রক নীতি সম্পর্কে জানুন।',
      keywords: ['শর্তাবলী', 'সদস্যপদ নিয়ম', 'ওয়েবসাইট নীতি', 'সমবায় শর্ত', 'ব্যবহার নির্দেশিকা'],
      ogImage: '/images/terms-og.png',
    },
  },
} as const;

// Enhanced Organization Schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME_EN,
  alternateName: SITE_NAME_BN,
  url: SITE_URL,
  image: absoluteUrl(LOGO_PATH),
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(LOGO_PATH),
    width: '512',
    height: '512',
  },
  description: SITE_DESCRIPTION_EN,
  email: 'sonalisokalsomobaysomiti@gmail.com',
  telephone: '+8801883088338',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Baid Gao, Pagla Bazar, Kabirpur, Ashulia',
    addressLocality: 'Savar',
    addressRegion: 'Dhaka',
    postalCode: '1344',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.8987,
    longitude: 90.2881,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 23.8987,
      longitude: 90.2881,
    },
    geoRadius: '50000',
  },
  foundingDate: '2022',
  legalName: 'Sonali Shokal Somobay Somity Limited',
  taxID: '00034',
  sameAs: [
    'https://www.facebook.com/sonalisokalss',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+8801883088338',
    contactType: 'customer service',
    email: 'sonalisokalsomobaysomiti@gmail.com',
    availableLanguage: ['en', 'bn'],
  },
};

// Financial Service Schema
export const FINANCIAL_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${SITE_URL}/#financialservice`,
  name: SITE_NAME_EN,
  alternateName: SITE_NAME_BN,
  url: SITE_URL,
  description: 'Cooperative society providing savings schemes, loans, and financial services to rural communities.',
  image: `${SITE_URL}/logo.png`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: '512',
    height: '512',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Baid Gao, Pagla Bazar, Kabirpur, Ashulia',
    addressLocality: 'Savar',
    addressRegion: 'Dhaka',
    postalCode: '1344',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.8987,
    longitude: 90.2881,
  },
  telephone: '+8801883088338',
  email: 'sonalisokalsomobaysomiti@gmail.com',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Financial Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Savings Account',
          description: 'High-return savings schemes with competitive interest rates for members'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Monthly DPS',
          description: 'Monthly Deposit Pension Scheme with guaranteed returns and flexible terms'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'FDR',
          description: 'Fixed Deposit Return schemes with attractive interest rates and secure returns'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Daily Savings',
          description: 'Convenient daily savings program for regular small contributions'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Personal Loan',
          description: 'Easy personal loans with low interest rates and quick approval process'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Loan',
          description: 'Small business loans to support local entrepreneurs and community development'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Micro Credit',
          description: 'Micro-financing solutions for community projects and small ventures'
        }
      }
    ]
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '17:00'
    }
  ],
  sameAs: [
    'https://www.facebook.com/sonalisokalss'
  ],
  priceRange: '$$'
};

// Breadcrumb helper function
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

// Helper functions for metadata generation
export function getPageMetadata(pageKey: keyof typeof PAGE_METADATA, locale: 'en' | 'bn' = 'bn') {
  return PAGE_METADATA[pageKey]?.[locale] || PAGE_METADATA.home[locale];
}

export function getOpenGraphMetadata(pageKey: keyof typeof PAGE_METADATA, locale: 'en' | 'bn' = 'bn') {
  const metadata = getPageMetadata(pageKey, locale);
  return {
    type: 'website' as const,
    url: SITE_URL,
    title: metadata.title,
    description: metadata.description,
    siteName: locale === 'en' ? SITE_NAME_EN : SITE_NAME_BN,
    locale: locale === 'en' ? 'en_US' : 'bn_BD',
    images: [
      {
        url: absoluteUrl(metadata.ogImage),
        width: 1200,
        height: 630,
        alt: metadata.title,
      },
    ],
  };
}

export function getTwitterMetadata(pageKey: keyof typeof PAGE_METADATA, locale: 'en' | 'bn' = 'bn') {
  const metadata = getPageMetadata(pageKey, locale);
  return {
    card: 'summary_large_image' as const,
    title: metadata.title,
    description: metadata.description,
    images: [absoluteUrl(metadata.ogImage)],
  };
}

export function getRobotsContent(options: {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
} = {}) {
  const {
    index = true,
    follow = true,
    noarchive = false,
    nosnippet = false,
    noimageindex = false,
  } = options;

  return {
    index,
    follow,
    noarchive,
    nosnippet,
    noimageindex,
    googleBot: {
      index,
      follow,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function canonicalUrl(pathname: string): string {
  return absoluteUrl(pathname);
}

// Complete metadata generator for Next.js pages
export function generateMetadata(
  pageKey: keyof typeof PAGE_METADATA,
  locale: 'en' | 'bn' = 'bn',
  options: {
    pathname?: string;
    robotsOptions?: Parameters<typeof getRobotsContent>[0];
  } = {}
) {
  const metadata = getPageMetadata(pageKey, locale);
  const { pathname = '/', robotsOptions } = options;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: canonicalUrl(pathname),
    },
    robots: getRobotsContent(robotsOptions),
    openGraph: getOpenGraphMetadata(pageKey, locale),
    twitter: getTwitterMetadata(pageKey, locale),
  };
}
