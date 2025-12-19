import { Metadata } from 'next';
import { getBlogPosts, getBlogPage } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { BlogListingClient } from '@/components/sections/resources/blog-listing-client';
import { getTranslations } from 'next-intl/server';

interface BlogsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const blogPage = await getBlogPage(locale);

  if (!blogPage) {
    return {
      title: 'Blog',
      description: 'Read our latest blog posts',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: blogPage.seo?.metaTitle,
      metaDescription: blogPage.seo?.metaDescription,
      keywords: blogPage.seo?.keywords,
      ogImage: blogPage.seo?.ogImage?.[locale]?.asset?.url,
      canonicalUrl: 'resources/blog',
    },
    locale,
    blogPage.hero.title,
    blogPage.hero.description
  );
}

export default async function BlogsPage({ params }: BlogsPageProps) {
  const { locale } = await params;
  const [blogPosts, blogPage, t] = await Promise.all([
    getBlogPosts(locale),
    getBlogPage(locale),
    getTranslations('resources.main'),
  ]);

  const translations = {
    categories: t('categories'),
    sortBy: t('sortBy'),
    newest: t('newest'),
    oldest: t('oldest'),
    clearFilters: t('clearFilters'),
    noResults: t('noResults'),
    tryAdjustingFilters: t('tryAdjustingFilters'),
    blogTitle: t('blogTitle'),
  };

  return (
    <BlogListingClient
      blogPosts={blogPosts || []}
      blogPage={blogPage}
      locale={locale}
      translations={translations}
    />
  );
}

