import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { appsData } from '@/config/apps-data';

export default function RiderAppPage() {
  const appConfig = appsData['rider'];
  
  return <AppDetailOriginalTemplate appConfig={appConfig} />;
}
