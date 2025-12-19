// Blog Post Article Schema
export function generateBlogPostSchema(post: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.image?.asset?.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name,
      jobTitle: post.author?.role,
      image: post.author?.avatar?.asset?.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tranzkit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tranzkit.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tranzkit.com/${locale}/resources/blogs/${post.slug.current}`,
    },
  };
}

// FAQ Page Schema
export function generateFAQSchema(faqs: any[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Job Posting Schema
export function generateJobPostingSchema(job: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.fullDescription,
    datePosted: job.postedDate,
    validThrough: job.closingDate,
    employmentType: job.type,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Tranzkit',
      sameAs: 'https://tranzkit.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
  };
}

// Case Study Schema (as Article)
export function generateCaseStudySchema(caseStudy: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    image: caseStudy.featuredImage?.image?.asset?.url,
    datePublished: caseStudy.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Tranzkit',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tranzkit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tranzkit.com/logo.png',
      },
    },
  };
}

