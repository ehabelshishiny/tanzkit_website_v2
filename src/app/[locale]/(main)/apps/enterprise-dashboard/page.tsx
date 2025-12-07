import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { appsData } from '@/config/apps-data';

export default function EnterpriseDashboardPage() {
  const appConfig = appsData['enterprise-dashboard'];
  
  return <AppDetailOriginalTemplate appConfig={appConfig} />;
}
