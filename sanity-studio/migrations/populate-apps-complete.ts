import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = getCliClient();

// Helper function to generate unique keys
const generateKey = (prefix: string, index: number) => `${prefix}-${index}-${Date.now()}`;

// Helper function to upload image from file path
async function uploadImage(imagePath: string): Promise<any> {
  try {
    // Resolve the path relative to the project root
    const projectRoot = path.resolve(__dirname, '../../');
    const fullPath = path.join(projectRoot, 'public', imagePath);
    
    console.log(`   📤 Uploading image: ${imagePath}`);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`   ⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(imagePath);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });

    console.log(`   ✅ Uploaded: ${filename}`);
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`   ❌ Error uploading ${imagePath}:`, error);
    return null;
  }
}

// Complete app data with all content
const apps = [
  {
    slug: 'operator-dashboard',
    name: { en: 'Operator Dashboard', ar: 'لوحة تحكم المشغل' },
    tagline: { en: 'Complete fleet control', ar: 'تحكم كامل في الأسطول' },
    description: { 
      en: 'Comprehensive control center for fleet operations. Monitor your entire fleet in real-time, optimize routes, manage drivers, and gain actionable insights through advanced analytics.',
      ar: 'مركز تحكم شامل لعمليات الأسطول. راقب أسطولك بالكامل في الوقت الفعلي، وحسّن المسارات، وأدر السائقين، واحصل على رؤى قابلة للتنفيذ من خلال التحليلات المتقدمة.'
    },
    category: 'operators',
    layoutType: 'landscape',
    benefits: [
      { en: 'Real-time fleet visibility', ar: 'رؤية الأسطول في الوقت الفعلي' },
      { en: 'AI-powered dispatch automation', ar: 'أتمتة الإرسال بالذكاء الاصطناعي' },
      { en: 'Predictive maintenance analytics', ar: 'تحليلات الصيانة التنبؤية' },
      { en: 'Advanced reporting & insights', ar: 'تقارير ورؤى متقدمة' },
    ],
    screenshots: [
      '/assets/apps_screenshots/operator-dashboard/1.png',
      '/assets/apps_screenshots/operator-dashboard/2.png',
      '/assets/apps_screenshots/operator-dashboard/3.png',
      '/assets/apps_screenshots/operator-dashboard/4.png',
      '/assets/apps_screenshots/operator-dashboard/5.png',
      '/assets/apps_screenshots/operator-dashboard/6.png',
    ],
    features: [
      {
        title: { en: 'Real-time Fleet Tracking', ar: 'تتبع الأسطول في الوقت الفعلي' },
        description: { en: 'Monitor all vehicles and drivers in real-time with live GPS tracking', ar: 'راقب جميع المركبات والسائقين في الوقت الفعلي مع تتبع GPS المباشر' }
      },
      {
        title: { en: 'Automated Dispatch', ar: 'إرسال آلي' },
        description: { en: 'AI-powered dispatch system for optimal driver allocation', ar: 'نظام إرسال مدعوم بالذكاء الاصطناعي لتخصيص السائقين الأمثل' }
      },
      {
        title: { en: 'Performance Analytics', ar: 'تحليلات الأداء' },
        description: { en: 'Comprehensive analytics on driver performance and fleet efficiency', ar: 'تحليلات شاملة لأداء السائق وكفاءة الأسطول' }
      },
      {
        title: { en: 'Route Optimization', ar: 'تحسين المسار' },
        description: { en: 'Smart routing to reduce fuel costs and improve delivery times', ar: 'توجيه ذكي لتقليل تكاليف الوقود وتحسين أوقات التسليم' }
      },
    ],
    steps: [
      { 
        title: { en: 'Setup Your Fleet', ar: 'قم بإعداد أسطولك' },
        description: { en: 'Add vehicles and drivers to your dashboard', ar: 'أضف المركبات والسائقين إلى لوحة التحكم' }
      },
      { 
        title: { en: 'Configure Routes', ar: 'تكوين المسارات' },
        description: { en: 'Set up optimal routes and zones', ar: 'قم بإعداد المسارات والمناطق المثلى' }
      },
      { 
        title: { en: 'Monitor Operations', ar: 'مراقبة العمليات' },
        description: { en: 'Track all activities in real-time', ar: 'تتبع جميع الأنشطة في الوقت الفعلي' }
      },
      { 
        title: { en: 'Analyze Performance', ar: 'تحليل الأداء' },
        description: { en: 'Review analytics and optimize', ar: 'راجع التحليلات وحسّن' }
      },
    ],
    platforms: { ios: false, android: false, web: true },
    storeUrls: { appStore: '', playStore: '', webApp: '/login' },
    cta: {
      heading: { en: 'Ready to Transform Your Fleet Operations?', ar: 'هل أنت مستعد لتحويل عمليات أسطولك؟' },
      subtitle: { en: 'Get started with our Operator Dashboard today', ar: 'ابدأ مع لوحة تحكم المشغل اليوم' },
      primaryCta: { text: { en: 'Request Demo', ar: 'اطلب عرضًا توضيحيًا' }, href: '/contact' },
      backgroundStyle: 'gradient',
    },
    order: 1,
  },
  {
    slug: 'supervisor',
    name: { en: 'Supervisor App', ar: 'تطبيق المشرف' },
    tagline: { en: 'Manage operations with precision', ar: 'إدارة العمليات بدقة' },
    description: {
      en: 'Real-time fleet monitoring and coordination. Complete visibility and control over your fleet operations from your mobile device.',
      ar: 'مراقبة وتنسيق الأسطول في الوقت الفعلي. رؤية وتحكم كاملان في عمليات أسطولك من جهازك المحمول.'
    },
    category: 'operators',
    layoutType: 'portrait',
    benefits: [
      { en: 'Live driver performance tracking', ar: 'تتبع أداء السائق المباشر' },
      { en: 'Instant incident response', ar: 'استجابة فورية للحوادث' },
      { en: 'Mobile task assignment', ar: 'تعيين المهام عبر الهاتف المحمول' },
    ],
    screenshots: [
      '/assets/apps_screenshots/supervisor/1.png',
      '/assets/apps_screenshots/supervisor/2.png',
      '/assets/apps_screenshots/supervisor/3.png',
      '/assets/apps_screenshots/supervisor/4.png',
      '/assets/apps_screenshots/supervisor/5.png',
      '/assets/apps_screenshots/supervisor/6.png',
    ],
    features: [
      {
        title: { en: 'Real-time Driver Tracking', ar: 'تتبع السائقين في الوقت الفعلي' },
        description: { en: 'Monitor driver locations and status updates in real-time', ar: 'راقب مواقع السائقين وتحديثات الحالة في الوقت الفعلي' }
      },
      {
        title: { en: 'Performance Analytics', ar: 'تحليلات الأداء' },
        description: { en: 'Track and analyze driver performance metrics', ar: 'تتبع وتحليل مقاييس أداء السائق' }
      },
      {
        title: { en: 'Smart Alerts', ar: 'تنبيهات ذكية' },
        description: { en: 'Receive instant notifications for important events', ar: 'تلقي إشعارات فورية للأحداث المهمة' }
      },
      {
        title: { en: 'Team Management', ar: 'إدارة الفريق' },
        description: { en: 'Manage your driver team efficiently from mobile', ar: 'إدارة فريق السائقين بكفاءة من الهاتف المحمول' }
      },
    ],
    steps: [
      {
        title: { en: 'Download the App', ar: 'حمّل التطبيق' },
        description: { en: 'Get the Supervisor app from your app store', ar: 'احصل على تطبيق المشرف من متجر التطبيقات' }
      },
      {
        title: { en: 'Login with Credentials', ar: 'تسجيل الدخول' },
        description: { en: 'Use your supervisor credentials to access', ar: 'استخدم بيانات اعتماد المشرف للوصول' }
      },
      {
        title: { en: 'Monitor Fleet', ar: 'مراقبة الأسطول' },
        description: { en: 'View all drivers and vehicles in real-time', ar: 'عرض جميع السائقين والمركبات في الوقت الفعلي' }
      },
      {
        title: { en: 'Manage Tasks', ar: 'إدارة المهام' },
        description: { en: 'Assign and track tasks efficiently', ar: 'تعيين وتتبع المهام بكفاءة' }
      },
    ],
    platforms: { ios: true, android: true, web: false },
    storeUrls: { appStore: '', playStore: '', webApp: '' },
    cta: {
      heading: { en: 'Empower Your Supervisors', ar: 'مكّن مشرفيك' },
      subtitle: { en: 'Give your team the tools they need to succeed', ar: 'امنح فريقك الأدوات التي يحتاجونها للنجاح' },
      primaryCta: { text: { en: 'Download Now', ar: 'حمّل الآن' }, href: '#' },
      backgroundStyle: 'gradient',
    },
    order: 2,
  },
  {
    slug: 'driver',
    name: { en: 'Driver App', ar: 'تطبيق السائق' },
    tagline: { en: 'Navigate and deliver efficiently', ar: 'التنقل والتسليم بكفاءة' },
    description: {
      en: 'Optimized route navigation and delivery management. Smart navigation, automated trip logging, and real-time dispatch sync.',
      ar: 'تحسين المسارات وإدارة التسليم. ملاحة ذكية، تسجيل رحلات آلي، ومزامنة إرسال في الوقت الفعلي.'
    },
    category: 'operators',
    layoutType: 'portrait',
    benefits: [
      { en: 'Smart route optimization', ar: 'تحسين المسار الذكي' },
      { en: 'Automated trip logging', ar: 'تسجيل الرحلات الآلي' },
      { en: 'Real-time dispatch sync', ar: 'مزامنة الإرسال في الوقت الفعلي' },
    ],
    screenshots: [
      '/assets/apps_screenshots/driver/1.png',
      '/assets/apps_screenshots/driver/2.png',
      '/assets/apps_screenshots/driver/3.png',
      '/assets/apps_screenshots/driver/4.png',
      '/assets/apps_screenshots/driver/5.png',
      '/assets/apps_screenshots/driver/6.png',
    ],
    features: [
      {
        title: { en: 'Route Optimization', ar: 'تحسين المسار' },
        description: { en: 'AI-powered route suggestions to save time and fuel', ar: 'اقتراحات مسار مدعومة بالذكاء الاصطناعي لتوفير الوقت والوقود' }
      },
      {
        title: { en: 'Digital Trip Logging', ar: 'تسجيل الرحلات الرقمي' },
        description: { en: 'Automatic trip recording and reporting', ar: 'تسجيل وإعداد تقارير الرحلات التلقائي' }
      },
      {
        title: { en: 'Offline Capability', ar: 'قدرة دون اتصال' },
        description: { en: 'Work offline and sync when connected', ar: 'العمل دون اتصال والمزامنة عند الاتصال' }
      },
      {
        title: { en: 'Earnings Tracking', ar: 'تتبع الأرباح' },
        description: { en: 'Real-time earnings and payment tracking', ar: 'تتبع الأرباح والمدفوعات في الوقت الفعلي' }
      },
    ],
    steps: [
      {
        title: { en: 'Download & Install', ar: 'حمّل وثبّت' },
        description: { en: 'Get the Driver app on your mobile device', ar: 'احصل على تطبيق السائق على جهازك المحمول' }
      },
      {
        title: { en: 'Complete Profile', ar: 'أكمل الملف الشخصي' },
        description: { en: 'Add your details and vehicle information', ar: 'أضف تفاصيلك ومعلومات المركبة' }
      },
      {
        title: { en: 'Accept Trips', ar: 'قبول الرحلات' },
        description: { en: 'Start receiving and accepting trip requests', ar: 'ابدأ في تلقي وقبول طلبات الرحلات' }
      },
      {
        title: { en: 'Navigate & Deliver', ar: 'التنقل والتسليم' },
        description: { en: 'Follow optimized routes to destinations', ar: 'اتبع المسارات المحسّنة إلى الوجهات' }
      },
    ],
    platforms: { ios: true, android: true, web: false },
    storeUrls: { appStore: '', playStore: '', webApp: '' },
    cta: {
      heading: { en: 'Start Driving with Tranzkit', ar: 'ابدأ القيادة مع Tranzkit' },
      subtitle: { en: 'Join thousands of drivers earning more', ar: 'انضم إلى آلاف السائقين الذين يكسبون المزيد' },
      primaryCta: { text: { en: 'Become a Driver', ar: 'كن سائقًا' }, href: '/contact' },
      backgroundStyle: 'gradient',
    },
    order: 3,
  },
  {
    slug: 'enterprise-dashboard',
    name: { en: 'Enterprise Dashboard', ar: 'لوحة تحكم المؤسسة' },
    tagline: { en: 'Advanced analytics for enterprises', ar: 'تحليلات متقدمة للمؤسسات' },
    description: {
      en: 'Advanced analytics and management for enterprises. Strategic mobility intelligence platform with organization-wide analytics and cost optimization.',
      ar: 'تحليلات متقدمة وإدارة للمؤسسات. منصة ذكاء التنقل الاستراتيجي مع تحليلات على مستوى المؤسسة وتحسين التكلفة.'
    },
    category: 'enterprise',
    layoutType: 'landscape',
    benefits: [
      { en: 'Organization-wide analytics', ar: 'تحليلات على مستوى المؤسسة' },
      { en: 'Cost optimization insights', ar: 'رؤى تحسين التكلفة' },
      { en: 'Compliance management', ar: 'إدارة الامتثال' },
    ],
    screenshots: [
      '/assets/apps_screenshots/enterprise-dashboard/1.png',
      '/assets/apps_screenshots/enterprise-dashboard/2.png',
      '/assets/apps_screenshots/enterprise-dashboard/3.png',
      '/assets/apps_screenshots/enterprise-dashboard/4.png',
      '/assets/apps_screenshots/enterprise-dashboard/5.png',
      '/assets/apps_screenshots/enterprise-dashboard/6.png',
    ],
    features: [
      {
        title: { en: 'Comprehensive Analytics', ar: 'تحليلات شاملة' },
        description: { en: 'Deep insights into transportation spending and usage patterns', ar: 'رؤى عميقة في أنماط الإنفاق والاستخدام للنقل' }
      },
      {
        title: { en: 'Cost Optimization', ar: 'تحسين التكلفة' },
        description: { en: 'AI-powered recommendations to reduce transportation costs', ar: 'توصيات مدعومة بالذكاء الاصطناعي لتقليل تكاليف النقل' }
      },
      {
        title: { en: 'Compliance Management', ar: 'إدارة الامتثال' },
        description: { en: 'Automated compliance tracking and reporting', ar: 'تتبع وإعداد تقارير الامتثال الآلي' }
      },
      {
        title: { en: 'Employee Management', ar: 'إدارة الموظفين' },
        description: { en: 'Manage employee transportation access and policies', ar: 'إدارة وصول الموظفين للنقل والسياسات' }
      },
    ],
    steps: [
      {
        title: { en: 'Create Account', ar: 'إنشاء حساب' },
        description: { en: 'Set up your enterprise account', ar: 'قم بإعداد حساب مؤسستك' }
      },
      {
        title: { en: 'Configure Settings', ar: 'تكوين الإعدادات' },
        description: { en: 'Customize dashboard for your needs', ar: 'خصص لوحة التحكم لاحتياجاتك' }
      },
      {
        title: { en: 'Add Employees', ar: 'إضافة الموظفين' },
        description: { en: 'Invite team members and set permissions', ar: 'ادعُ أعضاء الفريق وحدد الأذونات' }
      },
      {
        title: { en: 'Track & Optimize', ar: 'التتبع والتحسين' },
        description: { en: 'Monitor operations and reduce costs', ar: 'راقب العمليات وقلل التكاليف' }
      },
    ],
    platforms: { ios: false, android: false, web: true },
    storeUrls: { appStore: '', playStore: '', webApp: '/login' },
    cta: {
      heading: { en: 'Transform Your Enterprise Transportation', ar: 'حوّل نقل مؤسستك' },
      subtitle: { en: 'Reduce costs and improve efficiency', ar: 'قلل التكاليف وحسّن الكفاءة' },
      primaryCta: { text: { en: 'Schedule Demo', ar: 'جدولة عرض توضيحي' }, href: '/contact' },
      backgroundStyle: 'gradient',
    },
    order: 4,
  },
  {
    slug: 'rider',
    name: { en: 'Rider App', ar: 'تطبيق الراكب' },
    tagline: { en: 'Book rides seamlessly', ar: 'احجز رحلات بسلاسة' },
    description: {
      en: 'Seamless booking and ride experience. One-tap ride booking with real-time driver tracking and integrated payment system.',
      ar: 'تجربة حجز ورحلة سلسة. حجز رحلة بنقرة واحدة مع تتبع السائق في الوقت الفعلي ونظام دفع متكامل.'
    },
    category: 'enterprise',
    layoutType: 'portrait',
    benefits: [
      { en: 'One-tap ride booking', ar: 'حجز رحلة بنقرة واحدة' },
      { en: 'Real-time driver tracking', ar: 'تتبع السائق في الوقت الفعلي' },
      { en: 'Integrated payment system', ar: 'نظام دفع متكامل' },
    ],
    screenshots: [
      '/assets/apps_screenshots/rider/1.png',
      '/assets/apps_screenshots/rider/2.png',
      '/assets/apps_screenshots/rider/3.png',
      '/assets/apps_screenshots/rider/4.png',
      '/assets/apps_screenshots/rider/5.png',
    ],
    features: [
      {
        title: { en: 'One-tap Booking', ar: 'حجز بنقرة واحدة' },
        description: { en: 'Book rides instantly with a single tap', ar: 'احجز الرحلات على الفور بنقرة واحدة' }
      },
      {
        title: { en: 'Live Ride Tracking', ar: 'تتبع الرحلة المباشر' },
        description: { en: 'Track your driver in real-time with accurate ETAs', ar: 'تتبع سائقك في الوقت الفعلي مع أوقات وصول دقيقة' }
      },
      {
        title: { en: 'Secure Payments', ar: 'مدفوعات آمنة' },
        description: { en: 'Multiple payment options with secure processing', ar: 'خيارات دفع متعددة مع معالجة آمنة' }
      },
      {
        title: { en: 'Trip History', ar: 'سجل الرحلات' },
        description: { en: 'Access your complete ride history and receipts', ar: 'الوصول إلى سجل الرحلات الكامل والإيصالات' }
      },
    ],
    steps: [
      {
        title: { en: 'Download App', ar: 'حمّل التطبيق' },
        description: { en: 'Get the Rider app from your app store', ar: 'احصل على تطبيق الراكب من متجر التطبيقات' }
      },
      {
        title: { en: 'Sign Up', ar: 'سجّل' },
        description: { en: 'Create your account in seconds', ar: 'أنشئ حسابك في ثوانٍ' }
      },
      {
        title: { en: 'Book a Ride', ar: 'احجز رحلة' },
        description: { en: 'Enter destination and request a ride', ar: 'أدخل الوجهة واطلب رحلة' }
      },
      {
        title: { en: 'Enjoy Your Trip', ar: 'استمتع برحلتك' },
        description: { en: 'Track your ride and arrive safely', ar: 'تتبع رحلتك واصل بأمان' }
      },
    ],
    platforms: { ios: true, android: true, web: false },
    storeUrls: { appStore: '', playStore: '', webApp: '' },
    cta: {
      heading: { en: 'Ready for a Better Ride Experience?', ar: 'هل أنت مستعد لتجربة رحلة أفضل؟' },
      subtitle: { en: 'Download the app and book your first ride', ar: 'حمّل التطبيق واحجز رحلتك الأولى' },
      primaryCta: { text: { en: 'Get Started', ar: 'ابدأ' }, href: '#' },
      backgroundStyle: 'gradient',
    },
    order: 5,
  },
];

// Main migration function
async function migrateApps() {
  console.log('🔄 Starting complete migration for Apps collection...\n');

  for (const appData of apps) {
    console.log(`🔄 Processing app: ${appData.name.en}...`);

    // Check if app already exists
    const existingApp = await client.fetch(
      `*[_type == "app" && slug.current == $slug][0]`,
      { slug: appData.slug }
    );

    // Upload screenshots
    console.log(`   📸 Uploading screenshots...`);
    const uploadedScreenshots = [];
    for (const screenshotPath of appData.screenshots) {
      const uploadedImage = await uploadImage(screenshotPath);
      if (uploadedImage) {
        uploadedScreenshots.push(uploadedImage);
      }
    }
    console.log(`   ✅ Uploaded ${uploadedScreenshots.length} screenshots`);

    // Prepare benefits array with proper structure
    const benefits = appData.benefits.map((benefit, index) => ({
      _key: generateKey('benefit', index),
      _type: 'localizedString',
      en: benefit.en,
      ar: benefit.ar,
    }));

    // Prepare features array
    const features = appData.features.map((feature, index) => ({
      _key: generateKey('feature', index),
      _type: 'featureItem',
      title: {
        _type: 'localizedString',
        en: feature.title.en,
        ar: feature.title.ar,
      },
      description: {
        _type: 'localizedText',
        en: feature.description.en,
        ar: feature.description.ar,
      },
    }));

    // Prepare steps array
    const steps = appData.steps.map((step, index) => ({
      _key: generateKey('step', index),
      _type: 'workflowStep',
      step: index + 1, // Add step number (required field)
      title: {
        _type: 'localizedString',
        en: step.title.en,
        ar: step.title.ar,
      },
      description: {
        _type: 'localizedText', // Changed from localizedString to localizedText
        en: step.description.en,
        ar: step.description.ar,
      },
    }));

    // Prepare CTA section
    const cta = {
      _type: 'ctaSection',
      heading: {
        _type: 'localizedString',
        en: appData.cta.heading.en,
        ar: appData.cta.heading.ar,
      },
      subtitle: {
        _type: 'localizedString',
        en: appData.cta.subtitle.en,
        ar: appData.cta.subtitle.ar,
      },
      primaryCta: {
        _type: 'ctaButton',
        text: {
          _type: 'localizedString',
          en: appData.cta.primaryCta.text.en,
          ar: appData.cta.primaryCta.text.ar,
        },
        href: appData.cta.primaryCta.href,
      },
      backgroundStyle: appData.cta.backgroundStyle,
    };

    if (existingApp) {
      console.log(`✅ App "${appData.name.en}" already exists (${existingApp._id})`);
      console.log(`   Updating with complete data...`);

      await client
        .patch(existingApp._id)
        .set({
          name: {
            _type: 'localizedString',
            en: appData.name.en,
            ar: appData.name.ar,
          },
          tagline: {
            _type: 'localizedString',
            en: appData.tagline.en,
            ar: appData.tagline.ar,
          },
          description: {
            _type: 'localizedText',
            en: appData.description.en,
            ar: appData.description.ar,
          },
          category: appData.category,
          layoutType: appData.layoutType,
          benefits: benefits,
          screenshots: uploadedScreenshots,
          features: features,
          steps: steps,
          platforms: appData.platforms,
          storeUrls: appData.storeUrls,
          cta: cta,
          order: appData.order,
        })
        .commit();

      console.log(`   ✅ Updated successfully with ${uploadedScreenshots.length} screenshots\n`);
    } else {
      console.log(`📝 Creating new app: ${appData.name.en}...`);

      const newApp = await client.create({
        _type: 'app',
        name: {
          _type: 'localizedString',
          en: appData.name.en,
          ar: appData.name.ar,
        },
        slug: {
          _type: 'slug',
          current: appData.slug,
        },
        tagline: {
          _type: 'localizedString',
          en: appData.tagline.en,
          ar: appData.tagline.ar,
        },
        description: {
          _type: 'localizedText',
          en: appData.description.en,
          ar: appData.description.ar,
        },
        category: appData.category,
        layoutType: appData.layoutType,
        benefits: benefits,
        screenshots: uploadedScreenshots,
        features: features,
        steps: steps,
        platforms: appData.platforms,
        storeUrls: appData.storeUrls,
        cta: cta,
        order: appData.order,
      });

      console.log(`   ✅ Created successfully (${newApp._id}) with ${uploadedScreenshots.length} screenshots\n`);
    }
  }

  console.log('✅ Migration completed successfully!\n');
  console.log('📋 Summary:');
  apps.forEach(app => {
    console.log(`  ✅ ${app.name.en}`);
  });
}

// Run the migration
migrateApps()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });

