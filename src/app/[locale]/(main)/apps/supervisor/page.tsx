import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { getAppBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface SupervisorAppPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function SupervisorAppPage({ params }: SupervisorAppPageProps) {
  const { locale } = await params;
  const appData = await getAppBySlug('supervisor', locale);

  if (!appData) {
    notFound();
  }

  return <AppDetailOriginalTemplate appData={appData} locale={locale} />;
}
