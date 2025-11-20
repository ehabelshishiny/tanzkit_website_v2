import { AppDetailTemplate } from '@/components/sections/apps/app-detail-template';
import { appsConfig } from '@/config/apps';

export default function RiderAppPage() {
  return <AppDetailTemplate app={appsConfig.rider} />;
}

