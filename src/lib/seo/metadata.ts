import { Metadata } from 'next';

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[] | string | Record<string, unknown>;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

function normalizeKeywords(
  keywords: SEOData['keywords'],
  locale: string
): string[] | undefined {
  if (!keywords) return undefined;

  if (Array.isArray(keywords)) {
    return keywords.filter((k): k is string => typeof k === 'string' && k.trim().length > 0);
  }

  if (typeof keywords === 'string') {
    return keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
  }

  if (typeof keywords === 'object') {
    const localized = keywords[locale];
    if (Array.isArray(localized)) {
      return localized.filter((k): k is string => typeof k === 'string' && k.trim().length > 0);
    }
    if (typeof localized === 'string') {
      return localized
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
    }
  }

  return undefined;
}

export async function generateResourceMetadata(
  seoData: SEOData,
  locale: string,
  defaultTitle?: string,
  defaultDescription?: string
): Promise<Metadata> {
  const title = seoData.metaTitle || defaultTitle || 'Tranzkit';
  const description = seoData.metaDescription || defaultDescription || '';
  const normalizedKeywords = normalizeKeywords(seoData.keywords, locale);
  
  return {
    title,
    description,
    keywords: normalizedKeywords,
    openGraph: {
      title,
      description,
      images: seoData.ogImage ? [{ url: seoData.ogImage }] : [],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seoData.ogImage ? [seoData.ogImage] : [],
    },
    alternates: {
      canonical: seoData.canonicalUrl,
      languages: {
        'en': `/en/${seoData.canonicalUrl || ''}`,
        'ar': `/ar/${seoData.canonicalUrl || ''}`,
      },
    },
    robots: {
      index: !seoData.noIndex,
      follow: !seoData.noFollow,
    },
  };
}
