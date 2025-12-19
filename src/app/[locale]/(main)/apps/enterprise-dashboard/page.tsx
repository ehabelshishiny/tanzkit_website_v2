import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { getAppBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface EnterpriseDashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function EnterpriseDashboardPage({ params }: EnterpriseDashboardPageProps) {
  const { locale } = await params;
  const appData = await getAppBySlug('enterprise-dashboard', locale);

  if (!appData) {
    notFound();
  }

  return <AppDetailOriginalTemplate appData={appData} locale={locale} />;
}
