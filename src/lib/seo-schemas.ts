import { SITE_URL, SITE_NAME_EN } from './seo';

// FAQ Schema Generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// HowTo Schema Generator
export function generateHowToSchema(steps: Array<{ name: string; text: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Become a Member',
    description: 'Step-by-step guide to joining Sonali Shokal Somobay Somity',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Review/Rating Schema Generator
export function generateReviewSchema(reviews: Array<{ 
  author: string; 
  rating: number; 
  reviewBody: string;
  datePublished: string;
}>) {
  // Handle empty reviews array
  if (reviews.length === 0) {
    return null;
  }
  
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME_EN,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}

// Safer Organization Review schema generator.
// Use this when you want to publish member testimonials as reviews WITHOUT implying star ratings.
// If ratings are provided for all reviews, it will also include AggregateRating.
export function generateOrganizationReviewSchema(reviews: Array<{
  author: string;
  reviewBody: string;
  datePublished: string;
  rating?: number;
}>) {
  if (reviews.length === 0) {
    return null;
  }

  const ratings = reviews
    .map(r => r.rating)
    .filter((r): r is number => typeof r === 'number' && Number.isFinite(r));

  const shouldIncludeAggregate = ratings.length === reviews.length && ratings.length > 0;
  const averageRating = shouldIncludeAggregate
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    : null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME_EN,
    ...(shouldIncludeAggregate
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating!.toFixed(1),
            reviewCount: reviews.length,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      ...(typeof review.rating === 'number' && Number.isFinite(review.rating)
        ? {
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(review.rating),
              bestRating: '5',
              worstRating: '1',
            },
          }
        : {}),
    })),
  };
}
