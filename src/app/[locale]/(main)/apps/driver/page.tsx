import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { appsData } from '@/config/apps-data';

export default function DriverAppPage() {
  const appConfig = appsData['driver'];
  
  return <AppDetailOriginalTemplate appConfig={appConfig} />;
}
