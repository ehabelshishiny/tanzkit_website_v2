import { AppDetailOriginalTemplate } from '@/components/sections/apps/app-detail-original-template';
import { appsData } from '@/config/apps-data';

export default function SupervisorAppPage() {
  const appConfig = appsData['supervisor'];
  
  return <AppDetailOriginalTemplate appConfig={appConfig} />;
}
