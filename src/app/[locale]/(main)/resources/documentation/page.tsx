import { Metadata } from 'next';
import { getDocumentationPage } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { IsolatedHtmlContent } from '@/components/ui/isolated-html-content';

interface DocumentationPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: DocumentationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const documentationPage = await getDocumentationPage(locale);

  if (!documentationPage) {
    return {
      title: 'Documentation',
      description: 'Product Documentation',
    };
  }

  return generateResourceMetadata(
    {
      metaTitle: documentationPage.seo?.metaTitle,
      metaDescription: documentationPage.seo?.metaDescription,
      keywords: documentationPage.seo?.keywords,
      ogImage: documentationPage.seo?.ogImage?.[locale]?.asset?.url,
      canonicalUrl: 'resources/documentation',
    },
    locale,
    'Documentation',
    'Product Documentation'
  );
}

export default async function DocumentationPage({ params }: DocumentationPageProps) {
  const { locale } = await params;
  const [documentationPage, t] = await Promise.all([
    getDocumentationPage(locale),
    getTranslations('resources.main'),
  ]);

  if (!documentationPage) {
    const notFoundTitle = locale === 'ar' ? 'الوثائق غير موجودة' : 'Documentation Not Found';
    const notFoundMessage = locale === 'ar'
      ? 'يرجى إضافة محتوى الوثائق في Sanity Studio.'
      : 'Please add documentation content in Sanity Studio.';

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{notFoundTitle}</h1>
          <p className="text-muted-foreground">
            {notFoundMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* HTML Content - Isolated in iframe to prevent style leakage */}
      <IsolatedHtmlContent html={documentationPage.htmlContent || ''} />
    </div>
  );
}

