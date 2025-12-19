import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { getAppBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface DriverAppPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function DriverAppPage({ params }: DriverAppPageProps) {
  const { locale } = await params;
  const appData = await getAppBySlug('driver', locale);

  if (!appData) {
    notFound();
  }

  return <AppDetailOriginalTemplate appData={appData} locale={locale} />;
}
