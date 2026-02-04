// FAQ Schema for Voice Search Optimization
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Review/Rating Schema for Testimonials
export function generateReviewSchema(reviews: Array<{
  author: string,
  rating: number,
  reviewBody: string,
  datePublished: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Sonali Shokal Somobay Somity Membership",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": reviews.length.toString()
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished
    }))
  };
}

// HowTo Schema for Application Process
export function generateHowToSchema(steps: Array<{name: string, text: string, image?: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Become a Member of Sonali Shokal Somobay Somity",
    "description": "Step-by-step guide to applying for membership",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };
}

// Video Schema (if you add videos)
export function generateVideoSchema(video: {
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string,
  contentUrl: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": video.contentUrl
  };
}

// Event Schema (for meetings/events)
export function generateEventSchema(event: {
  name: string,
  startDate: string,
  location: string,
  description: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "startDate": event.startDate,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": "Baid Gao, Pagla Bazar, Kabirpur, Ashulia, Savar, Dhaka"
    },
    "description": event.description,
    "organizer": {
      "@type": "Organization",
      "name": "Sonali Shokal Somobay Somity"
    }
  };
}

// Breadcrumb Schema
export function BREADCRUMB_SCHEMA(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
