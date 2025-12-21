import { Metadata } from 'next';
import { getCaseStudies, getCaseStudiesPage } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { CaseStudiesListingClient } from '@/components/sections/resources/case-studies-listing-client';
import { getTranslations } from 'next-intl/server';

interface CaseStudiesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CaseStudiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const caseStudiesPage = await getCaseStudiesPage(locale);

  if (!caseStudiesPage) {
    return {
      title: 'Case Studies',
      description: 'Explore our success stories and client case studies',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: caseStudiesPage.seo?.metaTitle,
      metaDescription: caseStudiesPage.seo?.metaDescription,
      keywords: caseStudiesPage.seo?.keywords,
      ogImage: caseStudiesPage.seo?.ogImage?.[locale]?.asset?.url,
      canonicalUrl: 'resources/case-studies',
    },
    locale,
    caseStudiesPage.hero.title,
    caseStudiesPage.hero.description
  );
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale } = await params;
  const [caseStudies, caseStudiesPage, t] = await Promise.all([
    getCaseStudies(locale),
    getCaseStudiesPage(locale),
    getTranslations('resources.main'),
  ]);

  const translations = {
    filterCaseStudies: locale === 'ar' ? 'تصفية دراسات الحالة' : 'Filter Case Studies',
    categories: t('categories'),
    industries: locale === 'ar' ? 'الصناعات' : 'Industries',
    clearFilters: t('clearFilters'),
    noResults: t('noResults'),
    tryAdjustingFilters: t('tryAdjustingFilters'),
    caseStudiesTitle: t('caseStudiesTitle'),
  };

  return (
    <CaseStudiesListingClient
      caseStudies={caseStudies || []}
      locale={locale}
      heroTitle={caseStudiesPage?.hero?.title}
      heroSubtitle={caseStudiesPage?.hero?.subtitle}
      heroDescription={caseStudiesPage?.hero?.description}
      translations={translations}
    />
  );
}

