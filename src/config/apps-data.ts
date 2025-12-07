export interface AppConfig {
  id: string;
  name: string;
  nameAr: string; // Arabic name
  slug: string;
  description: string;
  descriptionAr: string; // Arabic description
  layoutType: 'portrait' | 'landscape';
  screenshots: string[];
}

export const appsData: Record<string, AppConfig> = {
  'operator-dashboard': {
    id: 'operator-dashboard',
    name: 'Operator Dashboard',
    nameAr: 'لوحة تحكم المشغل',
    slug: 'operator-dashboard',
    description: 'Comprehensive control center for fleet operations',
    descriptionAr: 'مركز تحكم شامل لعمليات الأسطول',
    layoutType: 'landscape',
    screenshots: [
      '/apps_screenshots/operator-dashboard/1.png',
      '/apps_screenshots/operator-dashboard/2.png',
      '/apps_screenshots/operator-dashboard/3.png',
      '/apps_screenshots/operator-dashboard/4.png',
      '/apps_screenshots/operator-dashboard/5.png',
      '/apps_screenshots/operator-dashboard/6.png',
      '/apps_screenshots/operator-dashboard/7.png',
      '/apps_screenshots/operator-dashboard/8.png',
      '/apps_screenshots/operator-dashboard/9.png',
      '/apps_screenshots/operator-dashboard/10.png',
      '/apps_screenshots/operator-dashboard/11.png',
      '/apps_screenshots/operator-dashboard/12.png',
      '/apps_screenshots/operator-dashboard/13.png',
      '/apps_screenshots/operator-dashboard/14.png',
      '/apps_screenshots/operator-dashboard/15.png',
      '/apps_screenshots/operator-dashboard/16.png',
      '/apps_screenshots/operator-dashboard/17.png',
      '/apps_screenshots/operator-dashboard/18.png',

    ]
  },
  'enterprise-dashboard': {
    id: 'enterprise-dashboard',
    name: 'Enterprise Dashboard',
    nameAr: 'لوحة تحكم المؤسسة',
    slug: 'enterprise-dashboard',
    description: 'Advanced analytics and management for enterprises',
    descriptionAr: 'تحليلات متقدمة وإدارة للمؤسسات',
    layoutType: 'landscape',
    screenshots: [
      '/apps_screenshots/enterprise-dashboard/1.png',
      '/apps_screenshots/enterprise-dashboard/2.png',
      '/apps_screenshots/enterprise-dashboard/3.png',
      '/apps_screenshots/enterprise-dashboard/4.png',
      '/apps_screenshots/enterprise-dashboard/5.png',
      '/apps_screenshots/enterprise-dashboard/6.png',
      '/apps_screenshots/enterprise-dashboard/7.png',
      '/apps_screenshots/enterprise-dashboard/8.png',
      '/apps_screenshots/enterprise-dashboard/9.png',
      '/apps_screenshots/enterprise-dashboard/10.png',
      '/apps_screenshots/enterprise-dashboard/11.png',
      '/apps_screenshots/enterprise-dashboard/12.png',
      '/apps_screenshots/enterprise-dashboard/13.png',
    ]
  },
  'supervisor': {
    id: 'supervisor',
    name: 'Supervisor App',
    nameAr: 'تطبيق المشرف',
    slug: 'supervisor',
    description: 'Real-time fleet monitoring and coordination',
    descriptionAr: 'مراقبة وتنسيق الأسطول في الوقت الفعلي',
    layoutType: 'portrait',
    screenshots: [
      '/apps_screenshots/supervisor/1.png',
      '/apps_screenshots/supervisor/2.png',
      '/apps_screenshots/supervisor/3.png',
      '/apps_screenshots/supervisor/4.png',
      '/apps_screenshots/supervisor/5.png',
      '/apps_screenshots/supervisor/6.png',
      '/apps_screenshots/supervisor/7.png',
      '/apps_screenshots/supervisor/8.png',
    ]
  },
  'driver': {
    id: 'driver',
    name: 'Driver App',
    nameAr: 'تطبيق السائق',
    slug: 'driver',
    description: 'Optimized route navigation and delivery management',
    descriptionAr: 'تحسين المسارات وإدارة التسليم',
    layoutType: 'portrait',
    screenshots: [
      '/apps_screenshots/driver/1.png',
      '/apps_screenshots/driver/2.png',
      '/apps_screenshots/driver/3.png',
      '/apps_screenshots/driver/4.png',
      '/apps_screenshots/driver/5.png',
      '/apps_screenshots/driver/6.png',
    ]
  },
  'rider': {
    id: 'rider',
    name: 'Rider App',
    nameAr: 'تطبيق الراكب',
    slug: 'rider',
    description: 'Seamless booking and ride experience',
    descriptionAr: 'تجربة حجز وتنقل سلسة',
    layoutType: 'portrait',
    screenshots: [
      '/apps_screenshots/rider/1.png',
      '/apps_screenshots/rider/2.png',
      '/apps_screenshots/rider/3.png',
      '/apps_screenshots/rider/4.png',
      '/apps_screenshots/rider/5.png',
    ]
  }
};
