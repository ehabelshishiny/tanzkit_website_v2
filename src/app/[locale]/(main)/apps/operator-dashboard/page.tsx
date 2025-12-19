import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { getAppBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';

interface OperatorDashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function OperatorDashboardPage({ params }: OperatorDashboardPageProps) {
  const { locale } = await params;
  const appData = await getAppBySlug('operator-dashboard', locale);

  if (!appData) {
    notFound();
  }

  return <AppDetailOriginalTemplate appData={appData} locale={locale} />;
}
