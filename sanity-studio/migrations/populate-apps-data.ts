/**
 * Migration script to populate all 5 app documents with complete data
 * This extracts data from apps-data.ts and translation files
 * 
 * IMPORTANT: Screenshots must be uploaded to Sanity first!
 * Run this with: npx sanity exec migrations/populate-apps-data.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// Complete app data extracted from codebase
const appsData = [
  {
    slug: 'operator-dashboard',
    name: { en: 'Operator Dashboard', ar: 'لوحة تحكم المشغل' },
    tagline: { en: 'Central command hub for fleet operations', ar: 'مركز القيادة المركزي لعمليات الأسطول' },
    description: { en: 'Comprehensive control center for fleet operations', ar: 'مركز تحكم شامل لعمليات الأسطول' },
    category: 'operators',
    layoutType: 'landscape',
    benefits: [
      { en: 'Real-time fleet visibility', ar: 'رؤية الأسطول في الوقت الفعلي' },
      { en: 'AI-powered dispatch automation', ar: 'أتمتة الإرسال بالذكاء الاصطناعي' },
      { en: 'Predictive maintenance analytics', ar: 'تحليلات الصيانة التنبؤية' },
    ],
    platforms: { ios: false, android: false, web: true },
    order: 1,
  },
  {
    slug: 'enterprise-dashboard',
    name: { en: 'Enterprise Dashboard', ar: 'لوحة تحكم المؤسسة' },
    tagline: { en: 'Strategic mobility intelligence platform', ar: 'منصة ذكاء التنقل الاستراتيجي' },
    description: { en: 'Advanced analytics and management for enterprises', ar: 'تحليلات متقدمة وإدارة للمؤسسات' },
    category: 'enterprise',
    layoutType: 'landscape',
    benefits: [
      { en: 'Organization-wide analytics', ar: 'تحليلات على مستوى المؤسسة' },
      { en: 'Cost optimization insights', ar: 'رؤى تحسين التكلفة' },
      { en: 'Compliance management', ar: 'إدارة الامتثال' },
    ],
    platforms: { ios: false, android: false, web: true },
    order: 4,
  },
  {
    slug: 'supervisor',
    name: { en: 'Supervisor App', ar: 'تطبيق المشرف' },
    tagline: { en: 'Mobile fleet oversight and driver management', ar: 'إشراف متنقل على الأسطول وإدارة السائقين' },
    description: { en: 'Real-time fleet monitoring and coordination', ar: 'مراقبة وتنسيق الأسطول في الوقت الفعلي' },
    category: 'operators',
    layoutType: 'portrait',
    benefits: [
      { en: 'Live driver performance tracking', ar: 'تتبع أداء السائق المباشر' },
      { en: 'Instant incident response', ar: 'استجابة فورية للحوادث' },
      { en: 'Mobile task assignment', ar: 'تعيين المهام عبر الهاتف المحمول' },
    ],
    platforms: { ios: true, android: true, web: false },
    order: 2,
  },
  {
    slug: 'driver',
    name: { en: 'Driver App', ar: 'تطبيق السائق' },
    tagline: { en: 'AI-guided navigation and trip management', ar: 'ملاحة موجهة بالذكاء الاصطناعي وإدارة الرحلات' },
    description: { en: 'Optimized route navigation and delivery management', ar: 'تحسين المسارات وإدارة التسليم' },
    category: 'operators',
    layoutType: 'portrait',
    benefits: [
      { en: 'Smart route optimization', ar: 'تحسين المسار الذكي' },
      { en: 'Automated trip logging', ar: 'تسجيل الرحلات التلقائي' },
      { en: 'Real-time dispatch sync', ar: 'مزامنة الإرسال في الوقت الفعلي' },
    ],
    platforms: { ios: true, android: true, web: false },
    order: 3,
  },
  {
    slug: 'rider',
    name: { en: 'Rider App', ar: 'تطبيق الراكب' },
    tagline: { en: 'Seamless employee transportation experience', ar: 'تجربة نقل سلسة للموظفين' },
    description: { en: 'Seamless booking and ride experience', ar: 'تجربة حجز وتنقل سلسة' },
    category: 'enterprise',
    layoutType: 'portrait',
    benefits: [
      { en: 'One-tap ride booking', ar: 'حجز رحلة بنقرة واحدة' },
      { en: 'Real-time driver tracking', ar: 'تتبع السائق في الوقت الفعلي' },
      { en: 'Integrated payment system', ar: 'نظام دفع متكامل' },
    ],
    platforms: { ios: true, android: true, web: false },
    order: 5,
  },
];

// Common getting started steps for all apps
const commonSteps = [
  {
    title: { en: 'Download the App', ar: 'حمّل التطبيق' },
    description: { en: 'Get Tranzkit from App Store or Google Play', ar: 'احصل على Tranzkit من آب ستور أو جوجل بلاي' },
  },
  {
    title: { en: 'Create Account', ar: 'أنشئ حساب' },
    description: { en: 'Sign up in seconds with your email or phone', ar: 'سجّل في ثوانٍ باستخدام بريدك الإلكتروني أو هاتفك' },
  },
  {
    title: { en: 'Start Using', ar: 'ابدأ الاستخدام' },
    description: { en: 'Access all features and start managing your operations', ar: 'الوصول إلى جميع الميزات وبدء إدارة عملياتك' },
  },
  {
    title: { en: 'Enjoy & Rate', ar: 'استمتع وقيّم' },
    description: { en: 'Experience seamless operations and rate your experience', ar: 'استمتع بعمليات سلسة وقيّم تجربتك' },
  },
];

async function populateApps() {
  console.log('🚀 Starting apps data population...\n');

  for (const appData of appsData) {
    console.log(`\n📱 Processing: ${appData.name.en} (${appData.slug})`);

    // Check if app already exists
    const existingApp = await client.fetch(
      `*[_type == "app" && slug.current == $slug][0]`,
      { slug: appData.slug }
    );

    const steps = commonSteps.map((step, index) => ({
      _key: `step-${index}`,
      _type: 'workflowStep',
      ...step,
    }));

    const appDocument = {
      _type: 'app',
      name: appData.name,
      slug: { _type: 'slug', current: appData.slug },
      tagline: appData.tagline,
      description: appData.description,
      category: appData.category,
      layoutType: appData.layoutType,
      benefits: appData.benefits,
      platforms: appData.platforms,
      steps,
      order: appData.order,
    };

    if (existingApp) {
      console.log(`   ✏️  Updating existing document: ${existingApp._id}`);
      await client.patch(existingApp._id).set(appDocument).commit();
      console.log(`   ✅ Updated successfully`);
    } else {
      console.log(`   📝 Creating new document`);
      const created = await client.create(appDocument);
      console.log(`   ✅ Created: ${created._id}`);
    }
  }

  console.log('\n🎉 All apps populated successfully!');
  console.log('\n⚠️  IMPORTANT NEXT STEPS:');
  console.log('   1. Upload screenshots for each app in Sanity Studio');
  console.log('   2. Add store URLs if available');
  console.log('   3. Add CTA sections for each app');
  console.log('   4. Add SEO metadata');
}

populateApps()
  .then(() => {
    console.log('\n✅ Migration completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });

