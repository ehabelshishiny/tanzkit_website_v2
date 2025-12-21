import { Metadata } from 'next';
import {
  getResourcesHubPage,
  getBlogPosts,
  getCaseStudies,
  getFAQs,
  getActiveCareers,
  getFeaturedBlogPosts,
  getFeaturedCaseStudies,
} from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { ResourcesHubClient } from '@/components/sections/resources/resources-hub-client';
import { getTranslations } from 'next-intl/server';

interface ResourcesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const resourcesPage = await getResourcesHubPage(locale);

  if (!resourcesPage) {
    return {
      title: 'Resources Hub',
      description: 'Explore our resources including blogs, case studies, and FAQs',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: resourcesPage.seo?.metaTitle,
      metaDescription: resourcesPage.seo?.metaDescription,
      keywords: resourcesPage.seo?.keywords,
      ogImage: resourcesPage.seo?.ogImage?.[locale]?.asset?.url,
      canonicalUrl: 'resources',
    },
    locale,
    resourcesPage.hero.title,
    resourcesPage.hero.description
  );
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;

  const [resourcesPage, blogPosts, caseStudies, faqs, careers, featuredBlogs, featuredCaseStudies, t] =
    await Promise.all([
      getResourcesHubPage(locale),
      getBlogPosts(locale),
      getCaseStudies(locale),
      getFAQs(locale),
      getActiveCareers(locale),
      getFeaturedBlogPosts(locale),
      getFeaturedCaseStudies(locale),
      getTranslations('resources.main'),
    ]);

  const translations = {
    all: t('filters.all'),
    blogs: t('filters.blog'),
    caseStudies: t('filters.caseStudies'),
    faq: t('filters.faq'),
    careers: t('filters.careers'),
    viewAll: t('viewAll'),
    noResources: t('noResources'),
    noBlogPosts: t('noBlogPosts'),
    noCaseStudies: t('noCaseStudies'),
    noFAQs: t('noFAQs'),
    noCareers: t('noCareers'),
    applyNow: t('applyNow'),
    latestBlogPosts: t('latestBlogPosts'),
    featuredCaseStudies: t('featuredCaseStudies'),
    frequentlyAskedQuestions: t('frequentlyAskedQuestions'),
    openPositions: t('openPositions'),
  };

  return (
    <ResourcesHubClient
      resourcesPage={resourcesPage}
      blogPosts={blogPosts || []}
      caseStudies={caseStudies || []}
      faqs={faqs || []}
      careers={careers || []}
      featuredBlogs={featuredBlogs || []}
      featuredCaseStudies={featuredCaseStudies || []}
      locale={locale}
      translations={translations}
    />
  );
}

