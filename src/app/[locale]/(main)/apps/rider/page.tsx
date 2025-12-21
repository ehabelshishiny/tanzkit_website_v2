import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { getAppBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface RiderAppPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function RiderAppPage({ params }: RiderAppPageProps) {
  const { locale } = await params;
  const appData = await getAppBySlug('rider', locale);

  if (!appData) {
    notFound();
  }

  return <AppDetailOriginalTemplate appData={appData} locale={locale} />;
}
