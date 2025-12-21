/**
 * Migration script to populate Apps collection with default content
 * Run this with: npx sanity exec migrations/populate-apps.ts --with-user-token
 * 
 * NOTE: This migration creates app documents with placeholder data.
 * You MUST upload screenshots manually in Sanity Studio after running this migration.
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// Generate unique keys for array items
function generateKey(prefix: string, index: number) {
  return `${prefix}-${index}-${Date.now()}`;
}

async function migrateApps() {
  console.log('🔄 Starting migration for Apps collection...');

  const apps = [
    {
      slug: 'operator-dashboard',
      name: { en: 'Operator Dashboard', ar: 'لوحة تحكم المشغل' },
      tagline: { en: 'Complete fleet control', ar: 'تحكم كامل في الأسطول' },
      description: { en: 'Comprehensive control center for fleet operations', ar: 'مركز تحكم شامل لعمليات الأسطول' },
      category: 'operators',
      layoutType: 'landscape',
      benefits: [
        { en: 'Real-time fleet visibility', ar: 'رؤية الأسطول في الوقت الفعلي' },
        { en: 'Automated dispatch & routing', ar: 'إرسال وتوجيه آلي' },
        { en: 'Advanced analytics & reporting', ar: 'تحليلات وتقارير متقدمة' },
      ],
      steps: [
        { title: { en: 'Setup Your Fleet', ar: 'قم بإعداد أسطولك' }, description: { en: 'Add vehicles and drivers to your dashboard', ar: 'أضف المركبات والسائقين إلى لوحة التحكم' } },
        { title: { en: 'Configure Routes', ar: 'تكوين المسارات' }, description: { en: 'Set up optimal routes and zones', ar: 'قم بإعداد المسارات والمناطق المثلى' } },
        { title: { en: 'Monitor Operations', ar: 'مراقبة العمليات' }, description: { en: 'Track all activities in real-time', ar: 'تتبع جميع الأنشطة في الوقت الفعلي' } },
        { title: { en: 'Analyze Performance', ar: 'تحليل الأداء' }, description: { en: 'Review analytics and optimize', ar: 'راجع التحليلات وحسّن' } },
      ],
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
      description: { en: 'Real-time fleet monitoring and coordination', ar: 'مراقبة وتنسيق الأسطول في الوقت الفعلي' },
      category: 'operators',
      layoutType: 'portrait',
      benefits: [
        { en: 'Real-time driver tracking', ar: 'تتبع السائقين في الوقت الفعلي' },
        { en: 'Instant incident response', ar: 'استجابة فورية للحوادث' },
        { en: 'Smart task assignment', ar: 'تعيين المهام الذكي' },
      ],
      steps: [
        { title: { en: 'Download the App', ar: 'حمّل التطبيق' }, description: { en: 'Get the Supervisor app from your app store', ar: 'احصل على تطبيق المشرف من متجر التطبيقات' } },
        { title: { en: 'Login with Credentials', ar: 'تسجيل الدخول' }, description: { en: 'Use your supervisor credentials to access', ar: 'استخدم بيانات اعتماد المشرف للوصول' } },
        { title: { en: 'Monitor Fleet', ar: 'مراقبة الأسطول' }, description: { en: 'View all drivers and vehicles in real-time', ar: 'عرض جميع السائقين والمركبات في الوقت الفعلي' } },
        { title: { en: 'Manage Tasks', ar: 'إدارة المهام' }, description: { en: 'Assign and track tasks efficiently', ar: 'تعيين وتتبع المهام بكفاءة' } },
      ],
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
      description: { en: 'Optimized route navigation and delivery management', ar: 'تحسين المسارات وإدارة التسليم' },
      category: 'operators',
      layoutType: 'portrait',
      benefits: [
        { en: 'Route optimization', ar: 'تحسين المسار' },
        { en: 'Digital trip logging', ar: 'تسجيل الرحلات الرقمي' },
        { en: 'Offline sync capability', ar: 'قدرة المزامنة دون اتصال' },
      ],
      steps: [
        { title: { en: 'Download & Install', ar: 'حمّل وثبّت' }, description: { en: 'Get the Driver app on your mobile device', ar: 'احصل على تطبيق السائق على جهازك المحمول' } },
        { title: { en: 'Complete Profile', ar: 'أكمل الملف الشخصي' }, description: { en: 'Add your details and vehicle information', ar: 'أضف تفاصيلك ومعلومات المركبة' } },
        { title: { en: 'Accept Trips', ar: 'قبول الرحلات' }, description: { en: 'Start receiving and accepting trip requests', ar: 'ابدأ في تلقي وقبول طلبات الرحلات' } },
        { title: { en: 'Navigate & Deliver', ar: 'التنقل والتسليم' }, description: { en: 'Follow optimized routes to destinations', ar: 'اتبع المسارات المحسّنة إلى الوجهات' } },
      ],
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
      description: { en: 'Advanced analytics and management for enterprises', ar: 'تحليلات متقدمة وإدارة للمؤسسات' },
      category: 'enterprise',
      layoutType: 'landscape',
      benefits: [
        { en: 'Comprehensive analytics', ar: 'تحليلات شاملة' },
        { en: 'Cost optimization tools', ar: 'أدوات تحسين التكلفة' },
        { en: 'Compliance management', ar: 'إدارة الامتثال' },
      ],
      steps: [
        { title: { en: 'Create Account', ar: 'إنشاء حساب' }, description: { en: 'Set up your enterprise account', ar: 'قم بإعداد حساب مؤسستك' } },
        { title: { en: 'Configure Settings', ar: 'تكوين الإعدادات' }, description: { en: 'Customize dashboard for your needs', ar: 'خصص لوحة التحكم لاحتياجاتك' } },
        { title: { en: 'Add Employees', ar: 'إضافة الموظفين' }, description: { en: 'Invite team members and set permissions', ar: 'ادعُ أعضاء الفريق وحدد الأذونات' } },
        { title: { en: 'Track & Optimize', ar: 'التتبع والتحسين' }, description: { en: 'Monitor operations and reduce costs', ar: 'راقب العمليات وقلل التكاليف' } },
      ],
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
      description: { en: 'Seamless booking and ride experience', ar: 'حجز سلس وتجربة رحلة' },
      category: 'enterprise',
      layoutType: 'portrait',
      benefits: [
        { en: 'One-tap booking', ar: 'حجز بنقرة واحدة' },
        { en: 'Live ride tracking', ar: 'تتبع الرحلة المباشر' },
        { en: 'Secure payment options', ar: 'خيارات دفع آمنة' },
      ],
      steps: [
        { title: { en: 'Download App', ar: 'حمّل التطبيق' }, description: { en: 'Get the Rider app from your app store', ar: 'احصل على تطبيق الراكب من متجر التطبيقات' } },
        { title: { en: 'Sign Up', ar: 'سجّل' }, description: { en: 'Create your account in seconds', ar: 'أنشئ حسابك في ثوانٍ' } },
        { title: { en: 'Book a Ride', ar: 'احجز رحلة' }, description: { en: 'Enter destination and request a ride', ar: 'أدخل الوجهة واطلب رحلة' } },
        { title: { en: 'Enjoy Your Trip', ar: 'استمتع برحلتك' }, description: { en: 'Track your ride and arrive safely', ar: 'تتبع رحلتك واصل بأمان' } },
      ],
      cta: {
        heading: { en: 'Ready for a Better Ride Experience?', ar: 'هل أنت مستعد لتجربة رحلة أفضل؟' },
        subtitle: { en: 'Download the app and book your first ride', ar: 'حمّل التطبيق واحجز رحلتك الأولى' },
        primaryCta: { text: { en: 'Get Started', ar: 'ابدأ' }, href: '#' },
        backgroundStyle: 'gradient',
      },
      order: 5,
    },
  ];

  for (const appData of apps) {
    console.log(`\n🔄 Processing app: ${appData.name.en}...`);

    // Check if app already exists
    const existingApp = await client.fetch(
      `*[_type == "app" && slug.current == $slug][0]`,
      { slug: appData.slug }
    );

    if (existingApp) {
      console.log(`✅ App "${appData.name.en}" already exists (${existingApp._id})`);
      console.log(`   Updating with latest data...`);

      await client
        .patch(existingApp._id)
        .set({
          name: appData.name,
          tagline: appData.tagline,
          description: appData.description,
          category: appData.category,
          layoutType: appData.layoutType,
          benefits: appData.benefits,
          steps: appData.steps,
          cta: appData.cta,
          order: appData.order,
        })
        .commit();

      console.log(`   ✅ Updated successfully`);
    } else {
      console.log(`📝 Creating new app: ${appData.name.en}...`);

      const newApp = await client.create({
        _type: 'app',
        name: appData.name,
        slug: {
          _type: 'slug',
          current: appData.slug,
        },
        tagline: appData.tagline,
        description: appData.description,
        category: appData.category,
        layoutType: appData.layoutType,
        benefits: appData.benefits,
        screenshots: [], // Empty - must be uploaded manually in Sanity Studio
        steps: appData.steps,
        platforms: {
          ios: appData.layoutType === 'portrait',
          android: appData.layoutType === 'portrait',
          web: appData.layoutType === 'landscape',
        },
        storeUrls: {
          appStore: '',
          playStore: '',
          webApp: '',
        },
        cta: appData.cta,
        order: appData.order,
      });

      console.log(`   ✅ Created successfully (${newApp._id})`);
    }
  }

  console.log('\n✅ Migration completed successfully!');
  console.log('\n📋 Summary:');
  console.log('  ✅ Operator Dashboard');
  console.log('  ✅ Enterprise Dashboard');
  console.log('  ✅ Supervisor App');
  console.log('  ✅ Driver App');
  console.log('  ✅ Rider App');
  console.log('\n⚠️  IMPORTANT: You must now upload screenshots for each app in Sanity Studio!');
  console.log('   Screenshot locations:');
  console.log('   - Operator Dashboard: /assets/apps_screenshots/operator-dashboard/*.png');
  console.log('   - Enterprise Dashboard: /assets/apps_screenshots/enterprise-dashboard/*.png');
  console.log('   - Supervisor App: /assets/apps_screenshots/supervisor/*.png');
  console.log('   - Driver App: /assets/apps_screenshots/driver/*.png');
  console.log('   - Rider App: /assets/apps_screenshots/rider/*.png');
}

migrateApps().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});

