import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { appsData } from '@/config/apps-data';

export default function OperatorDashboardPage() {
  const appConfig = appsData['operator-dashboard'];
  
  return <AppDetailOriginalTemplate appConfig={appConfig} />;
}
