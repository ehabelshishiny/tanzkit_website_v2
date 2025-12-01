import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('resources.blog.detailPage');
  
  return (
    <main className="container py-12">
      <Card className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">{t('prefix')} {params.slug}</h1>
        <p className="text-muted-foreground mb-8">{t('publishedOn')} March 15, 2024</p>
        <div className="prose prose-lg max-w-none">
          <p>{t('placeholder')}</p>
        </div>
      </Card>
    </main>
  );
}
