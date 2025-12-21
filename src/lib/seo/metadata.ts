import { Metadata } from 'next';

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export async function generateResourceMetadata(
  seoData: SEOData,
  locale: string,
  defaultTitle?: string,
  defaultDescription?: string
): Promise<Metadata> {
  const title = seoData.metaTitle || defaultTitle || 'Tranzkit';
  const description = seoData.metaDescription || defaultDescription || '';
  
  return {
    title,
    description,
    keywords: seoData.keywords?.join(', '),
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

