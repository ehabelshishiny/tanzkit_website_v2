import { Metadata } from 'next';
import { getFAQs, getFAQPage } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { generateFAQSchema } from '@/lib/seo/structuredData';
import { StructuredData } from '@/components/seo/structured-data';
import { FAQListingClient } from '@/components/sections/resources/faq-listing-client';
import { getTranslations } from 'next-intl/server';

interface FAQPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const faqPage = await getFAQPage(locale);

  if (!faqPage) {
    return {
      title: 'FAQ',
      description: 'Frequently Asked Questions',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: faqPage.seo?.metaTitle,
      metaDescription: faqPage.seo?.metaDescription,
      keywords: faqPage.seo?.keywords,
      ogImage: faqPage.seo?.ogImage?.[locale]?.asset?.url,
      canonicalUrl: 'resources/faq',
    },
    locale,
    faqPage.hero.title,
    faqPage.hero.description
  );
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const [faqCategories, faqPage, t] = await Promise.all([
    getFAQs(locale),
    getFAQPage(locale),
    getTranslations('resources.main'),
  ]);

  // Flatten all FAQs for structured data
  const allFAQs = faqCategories.flatMap((category: any) =>
    category.items.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  const structuredData = generateFAQSchema(allFAQs, locale);

  const translations = {
    searchPlaceholder: t('searchPlaceholder'),
    filterByCategory: locale === 'ar' ? 'تصفية حسب الفئة' : 'Filter by Category',
    clearFilters: t('clearFilters'),
    noQuestionsFound: locale === 'ar' ? 'لم يتم العثور على أسئلة' : 'No questions found',
    noQuestionsMatching: locale === 'ar' ? 'لم يتم العثور على أسئلة تطابق' : 'No questions found matching',
    faqTitle: t('faqTitle'),
  };

  const heroTitle = faqPage?.hero?.title || translations.faqTitle;
  const heroSubtitle = faqPage?.hero?.subtitle || undefined;
  const heroDescription = faqPage?.hero?.description || undefined;

  return (
    <>
      <StructuredData data={structuredData} />
      <FAQListingClient
        faqCategories={faqCategories || []}
        locale={locale}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroDescription={heroDescription}
        translations={translations}
      />
    </>
  );
}
