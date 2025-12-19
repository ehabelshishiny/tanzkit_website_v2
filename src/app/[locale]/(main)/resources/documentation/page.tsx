import { Metadata } from 'next';
import { getDocumentationPage } from '@/lib/sanity/queries';
import { generateResourceMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';

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
    documentationPage.hero.title,
    documentationPage.hero.description
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-16 border-b bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          {documentationPage.hero.subtitle && (
            <p className="text-primary font-semibold mb-4">
              {documentationPage.hero.subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {documentationPage.hero.title}
          </h1>
          {documentationPage.hero.description && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {documentationPage.hero.description}
            </p>
          )}
        </div>
      </div>

      {/* HTML Content */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border
              prose-img:rounded-lg prose-img:shadow-md
              prose-ul:my-6 prose-ol:my-6
              prose-li:my-2"
            dangerouslySetInnerHTML={{ __html: documentationPage.htmlContent || '' }}
          />
        </div>
      </div>
    </div>
  );
}

