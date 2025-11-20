// Icon name type for serialization
export type IconName =
  | 'Users'
  | 'Car'
  | 'UserCircle'
  | 'LayoutDashboard'
  | 'Building2'
  | 'MapPin'
  | 'Clock'
  | 'Shield'
  | 'BarChart3'
  | 'Route'
  | 'Bell'
  | 'CreditCard'
  | 'MessageSquare'
  | 'CheckCircle'
  | 'Zap'
  | 'TrendingUp';

export interface AppFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface AppScreenshot {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface AppConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  image?: string; // Optional placeholder image URL
  appType: 'mobile' | 'desktop'; // Categorize apps for layout purposes
  gradient: string;
  accentColor: string;
  features: {
    icon: IconName;
    titleKey: string;
    descriptionKey: string;
  }[];
  screenshots: AppScreenshot[];
  appStoreUrl: string;
  playStoreUrl: string;
  requirements: {
    ios: string;
    android: string;
  };
  use3DVariant?: boolean; // Use the 3D variant card (AppCard3DVariant)
  use3DCard?: boolean; // Use the alternative 3D card layout (image at top, icon badge)
}

export const appsConfig: Record<string, AppConfig> = {
  supervisor: {
    id: 'supervisor',
    name: 'Supervisor App',
    tagline: 'Manage operations with precision',
    description: 'Real-time fleet monitoring and operational control',
    icon: 'Users',
    image: '/test_image_mobile.jpg',
    appType: 'mobile',
    gradient: 'from-blue-500/10 via-cyan-500/10 to-blue-600/10',
    accentColor: '#3B82F6',
    use3DVariant: true,
    features: [
      { icon: 'MapPin', titleKey: 'realTimeTracking', descriptionKey: 'realTimeTrackingDesc' },
      { icon: 'BarChart3', titleKey: 'analytics', descriptionKey: 'analyticsDesc' },
      { icon: 'Bell', titleKey: 'alerts', descriptionKey: 'alertsDesc' },
      { icon: 'Users', titleKey: 'teamManagement', descriptionKey: 'teamManagementDesc' },
    ],
    screenshots: [
      { id: '1', title: 'Dashboard Overview', description: 'Monitor your entire fleet at a glance', category: 'Management' },
      { id: '2', title: 'Live Tracking', description: 'Real-time vehicle and driver tracking', category: 'Tracking' },
      { id: '3', title: 'Analytics', description: 'Comprehensive performance metrics', category: 'Analytics' },
      { id: '4', title: 'Team Management', description: 'Manage drivers and assignments', category: 'Team' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/tranzkit-supervisor',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tranzkit.supervisor',
    requirements: {
      ios: 'iOS 14.0 or later',
      android: 'Android 8.0 or later',
    },
  },
  driver: {
    id: 'driver',
    name: 'Driver App',
    tagline: 'Navigate smarter, earn more',
    description: 'Optimized routes and seamless trip management',
    icon: 'Car',
    image: '/test_image_mobile.jpg',
    appType: 'mobile',
    gradient: 'from-green-500/10 via-emerald-500/10 to-green-600/10',
    accentColor: '#10B981',
    use3DVariant: true,
    features: [
      { icon: 'Route', titleKey: 'smartRouting', descriptionKey: 'smartRoutingDesc' },
      { icon: 'Clock', titleKey: 'scheduleManagement', descriptionKey: 'scheduleManagementDesc' },
      { icon: 'CreditCard', titleKey: 'earnings', descriptionKey: 'earningsDesc' },
      { icon: 'Shield', titleKey: 'safety', descriptionKey: 'safetyDesc' },
    ],
    screenshots: [
      { id: '1', title: 'Active Trip', description: 'Navigate with turn-by-turn directions', category: 'Navigation' },
      { id: '2', title: 'Trip History', description: 'View completed trips and earnings', category: 'History' },
      { id: '3', title: 'Schedule', description: 'Manage your availability and shifts', category: 'Schedule' },
      { id: '4', title: 'Earnings', description: 'Track your income and payments', category: 'Earnings' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/tranzkit-driver',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tranzkit.driver',
    requirements: {
      ios: 'iOS 14.0 or later',
      android: 'Android 8.0 or later',
    },
  },
  rider: {
    id: 'rider',
    name: 'Rider App',
    tagline: 'Book rides in seconds',
    description: 'Fast, safe, and reliable transportation',
    icon: 'UserCircle',
    image: '/test_image_mobile.jpg',
    appType: 'mobile',
    gradient: 'from-purple-500/10 via-pink-500/10 to-purple-600/10',
    accentColor: '#A855F7',
    use3DVariant: true,
    features: [
      { icon: 'Zap', titleKey: 'quickBooking', descriptionKey: 'quickBookingDesc' },
      { icon: 'MapPin', titleKey: 'liveTracking', descriptionKey: 'liveTrackingDesc' },
      { icon: 'CreditCard', titleKey: 'payments', descriptionKey: 'paymentsDesc' },
      { icon: 'MessageSquare', titleKey: 'support', descriptionKey: 'supportDesc' },
    ],
    screenshots: [
      { id: '1', title: 'Book a Ride', description: 'Simple and intuitive booking interface', category: 'Booking' },
      { id: '2', title: 'Track Your Ride', description: 'Real-time driver location and ETA', category: 'Tracking' },
      { id: '3', title: 'Payment', description: 'Multiple secure payment options', category: 'Payment' },
      { id: '4', title: 'Trip History', description: 'Review past trips and receipts', category: 'History' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/tranzkit-rider',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tranzkit.rider',
    requirements: {
      ios: 'iOS 14.0 or later',
      android: 'Android 8.0 or later',
    },
  },
  operatorDashboard: {
    id: 'operator-dashboard',
    name: 'Operator Dashboard',
    tagline: 'Complete fleet control',
    description: 'Comprehensive platform for transport operators',
    icon: 'LayoutDashboard',
    image: '/test_image_desktop.png',
    appType: 'desktop',
    gradient: 'from-orange-500/10 via-amber-500/10 to-orange-600/10',
    accentColor: '#F97316',
    use3DVariant: true,
    features: [
      { icon: 'BarChart3', titleKey: 'businessIntelligence', descriptionKey: 'businessIntelligenceDesc' },
      { icon: 'Users', titleKey: 'fleetManagement', descriptionKey: 'fleetManagementDesc' },
      { icon: 'TrendingUp', titleKey: 'revenueOptimization', descriptionKey: 'revenueOptimizationDesc' },
      { icon: 'CheckCircle', titleKey: 'compliance', descriptionKey: 'complianceDesc' },
    ],
    screenshots: [
      { id: '1', title: 'Operations Dashboard', description: 'Complete overview of your operations', category: 'Dashboard' },
      { id: '2', title: 'Fleet Analytics', description: 'Deep insights into fleet performance', category: 'Analytics' },
      { id: '3', title: 'Driver Management', description: 'Manage your entire driver network', category: 'Management' },
      { id: '4', title: 'Revenue Reports', description: 'Financial analytics and reporting', category: 'Finance' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/tranzkit-operator',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tranzkit.operator',
    requirements: {
      ios: 'iOS 14.0 or later',
      android: 'Android 8.0 or later',
    },
  },
  enterpriseDashboard: {
    id: 'enterprise-dashboard',
    name: 'Enterprise Dashboard',
    tagline: 'Corporate mobility management',
    description: 'Streamline employee transportation and logistics',
    icon: 'Building2',
    image: '/test_image_desktop.png',
    appType: 'desktop',
    gradient: 'from-indigo-500/10 via-violet-500/10 to-indigo-600/10',
    accentColor: '#6366F1',
    use3DVariant: true,
    features: [
      { icon: 'Users', titleKey: 'employeeManagement', descriptionKey: 'employeeManagementDesc' },
      { icon: 'CreditCard', titleKey: 'costControl', descriptionKey: 'costControlDesc' },
      { icon: 'BarChart3', titleKey: 'reporting', descriptionKey: 'reportingDesc' },
      { icon: 'Shield', titleKey: 'security', descriptionKey: 'securityDesc' },
    ],
    screenshots: [
      { id: '1', title: 'Enterprise Dashboard', description: 'Centralized control for corporate transport', category: 'Dashboard' },
      { id: '2', title: 'Employee Rides', description: 'Manage employee transportation requests', category: 'Management' },
      { id: '3', title: 'Cost Analytics', description: 'Track and optimize transportation costs', category: 'Analytics' },
      { id: '4', title: 'Compliance Reports', description: 'Ensure policy compliance and reporting', category: 'Compliance' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/tranzkit-enterprise',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.tranzkit.enterprise',
    requirements: {
      ios: 'iOS 14.0 or later',
      android: 'Android 8.0 or later',
    },
  },
};

export const appsArray = Object.values(appsConfig);

