/**
 * Migration script to populate Operators & Drivers page with default content
 * Run this with: npx sanity exec migrations/fix-feature-items.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// Generate unique keys for array items
function generateKey(prefix: string, index: number) {
  return `${prefix}-${index}-${Date.now()}`;
}

async function migrateOperatorsPage() {
  console.log('🔄 Starting migration for Operators & Drivers page...');

  // Fetch the operators page document
  const query = `*[_type == "solutionsOperatorsDriversPage"][0]`;
  let doc = await client.fetch(query);

  // If document doesn't exist, create it
  if (!doc) {
    console.log('📝 Creating new Operators & Drivers page document...');
    doc = await client.create({
      _type: 'solutionsOperatorsDriversPage',
      title: 'Solutions: Operators & Drivers',
    });
    console.log('✅ Created document:', doc._id);
  } else {
    console.log('✅ Found existing document:', doc._id);
  }

  console.log('🔄 Populating with default content...');

  // Prepare the full content update
  const updates = {
    // Hero Section
    hero: {
      title: {
        en: 'Scale Your Fleet Operations',
        ar: 'قم بتوسيع عمليات أسطولك',
      },
      subtitle: {
        en: 'Empower operators with advanced tools and drivers with seamless earning opportunities',
        ar: 'قم بتمكين المشغلين بأدوات متقدمة والسائقين بفرص كسب سلسة',
      },
      cta: {
        en: 'Get Started',
        ar: 'ابدأ الآن',
      },
    },

    // Overview Section
    overview: {
      text: {
        en: 'Operators need efficient fleet management and revenue optimization. Drivers want flexible schedules and reliable income. Tranzkit bridges both worlds with powerful automation, real-time insights, and tools designed for growth.',
        ar: 'يحتاج المشغلون إلى إدارة فعالة للأسطول وتحسين الإيرادات. يريد السائقون جداول مرنة ودخل موثوق. يربط Tranzkit بين العالمين بأتمتة قوية ورؤى في الوقت الفعلي وأدوات مصممة للنمو.',
      },
    },

    // Role Switcher
    roleSwitcher: {
      tabs: {
        operator: {
          en: 'Operators',
          ar: 'المشغلون',
        },
        driver: {
          en: 'Drivers',
          ar: 'السائقون',
        },
      },
      operator: {
        title: {
          en: 'For Fleet Operators',
          ar: 'لمشغلي الأسطول',
        },
        description: {
          en: 'Complete control over your transportation operations',
          ar: 'تحكم كامل في عمليات النقل الخاصة بك',
        },
        features: [
          {
            _key: generateKey('operator-feature', 0),
            _type: 'featureItem',
            title: {
              en: 'Fleet Management Dashboard',
              ar: 'لوحة إدارة الأسطول',
            },
            description: {
              en: 'Monitor and manage your entire fleet from a centralized command center',
              ar: 'راقب وأدر أسطولك بالكامل من مركز قيادة مركزي',
            },
          },
          {
            _key: generateKey('operator-feature', 1),
            _type: 'featureItem',
            title: {
              en: 'Driver Management',
              ar: 'إدارة السائقين',
            },
            description: {
              en: 'Recruit, onboard, and manage drivers with comprehensive tools',
              ar: 'قم بتوظيف وإدارة السائقين بأدوات شاملة',
            },
          },
          {
            _key: generateKey('operator-feature', 2),
            _type: 'featureItem',
            title: {
              en: 'Revenue Optimization',
              ar: 'تحسين الإيرادات',
            },
            description: {
              en: 'Maximize earnings with dynamic pricing and demand forecasting',
              ar: 'زيادة الأرباح مع التسعير الديناميكي والتنبؤ بالطلب',
            },
          },
          {
            _key: generateKey('operator-feature', 3),
            _type: 'featureItem',
            title: {
              en: 'Compliance & Safety',
              ar: 'الامتثال والسلامة',
            },
            description: {
              en: 'Ensure regulatory compliance and maintain safety standards',
              ar: 'ضمان الامتثال التنظيمي والحفاظ على معايير السلامة',
            },
          },
        ],
      },
      driver: {
        title: {
          en: 'For Drivers',
          ar: 'للسائقين',
        },
        description: {
          en: 'Earn more with flexible schedules and powerful tools',
          ar: 'اكسب المزيد مع جداول مرنة وأدوات قوية',
        },
        features: [
          {
            _key: generateKey('driver-feature', 0),
            _type: 'featureItem',
            title: {
              en: 'Flexible Earnings',
              ar: 'أرباح مرنة',
            },
            description: {
              en: 'Drive on your schedule and maximize your income with smart routing',
              ar: 'قد على جدولك الزمني وزيادة دخلك مع التوجيه الذكي',
            },
          },
          {
            _key: generateKey('driver-feature', 1),
            _type: 'featureItem',
            title: {
              en: 'Easy Navigation',
              ar: 'ملاحة سهلة',
            },
            description: {
              en: 'Turn-by-turn navigation with real-time traffic updates',
              ar: 'ملاحة خطوة بخطوة مع تحديثات حركة المرور في الوقت الفعلي',
            },
          },
          {
            _key: generateKey('driver-feature', 2),
            _type: 'featureItem',
            title: {
              en: 'Instant Payments',
              ar: 'مدفوعات فورية',
            },
            description: {
              en: 'Get paid quickly with multiple payout options',
              ar: 'احصل على أموالك بسرعة مع خيارات دفع متعددة',
            },
          },
          {
            _key: generateKey('driver-feature', 3),
            _type: 'featureItem',
            title: {
              en: 'Driver Support',
              ar: 'دعم السائق',
            },
            description: {
              en: '24/7 support team ready to help with any issues',
              ar: 'فريق دعم على مدار الساعة جاهز للمساعدة في أي مشاكل',
            },
          },
        ],
      },
    },

    // Timeline Section
    timeline: {
      title: {
        en: '24/7 Operations Management',
        ar: 'إدارة العمليات على مدار الساعة',
      },
      subtitle: {
        en: 'Track and manage your fleet operations around the clock',
        ar: 'تتبع وإدارة عمليات أسطولك على مدار الساعة',
      },
      items: [
        {
          _key: generateKey('timeline', 0),
          time: '06:00',
          title: {
            en: 'Morning Rush',
            ar: 'ذروة الصباح',
          },
          description: {
            en: 'Peak demand period with optimized driver allocation',
            ar: 'فترة الطلب القصوى مع تخصيص السائقين الأمثل',
          },
        },
        {
          _key: generateKey('timeline', 1),
          time: '12:00',
          title: {
            en: 'Midday Operations',
            ar: 'عمليات منتصف النهار',
          },
          description: {
            en: 'Steady flow management and route optimization',
            ar: 'إدارة التدفق المستقر وتحسين المسار',
          },
        },
        {
          _key: generateKey('timeline', 2),
          time: '18:00',
          title: {
            en: 'Evening Peak',
            ar: 'ذروة المساء',
          },
          description: {
            en: 'High-demand period with surge pricing strategies',
            ar: 'فترة الطلب العالي مع استراتيجيات التسعير المرتفع',
          },
        },
        {
          _key: generateKey('timeline', 3),
          time: '00:00',
          title: {
            en: 'Night Service',
            ar: 'خدمة ليلية',
          },
          description: {
            en: 'Continuous operations with night shift management',
            ar: 'عمليات مستمرة مع إدارة الورديات الليلية',
          },
        },
      ],
    },

    // Dashboards Section
    dashboards: {
      title: {
        en: 'Powerful Dashboard Views',
        ar: 'عروض لوحة معلومات قوية',
      },
      subtitle: {
        en: 'Everything you need to manage your operations efficiently',
        ar: 'كل ما تحتاجه لإدارة عملياتك بكفاءة',
      },
      screenshots: [],
    },

    // Mobile Apps Section
    mobileApps: {
      title: {
        en: 'Driver App Features',
        ar: 'ميزات تطبيق السائق',
      },
      subtitle: {
        en: 'Everything drivers need in one powerful mobile application',
        ar: 'كل ما يحتاجه السائقون في تطبيق جوال قوي واحد',
      },
      features: [
        {
          _key: generateKey('mobile-feature', 0),
          title: {
            en: 'Real-Time Navigation',
            ar: 'ملاحة في الوقت الفعلي',
          },
          description: {
            en: 'Smart routing with live traffic updates',
            ar: 'توجيه ذكي مع تحديثات حركة المرور المباشرة',
          },
          badge: {
            en: 'GPS',
            ar: 'GPS',
          },
        },
        {
          _key: generateKey('mobile-feature', 1),
          title: {
            en: 'Earnings Tracker',
            ar: 'متتبع الأرباح',
          },
          description: {
            en: 'Monitor your daily, weekly, and monthly earnings',
            ar: 'راقب أرباحك اليومية والأسبوعية والشهرية',
          },
          badge: {
            en: 'Analytics',
            ar: 'تحليلات',
          },
        },
        {
          _key: generateKey('mobile-feature', 2),
          title: {
            en: 'Trip History',
            ar: 'سجل الرحلات',
          },
          description: {
            en: 'Access complete history of all your trips',
            ar: 'الوصول إلى السجل الكامل لجميع رحلاتك',
          },
          badge: {
            en: 'History',
            ar: 'السجل',
          },
        },
        {
          _key: generateKey('mobile-feature', 3),
          title: {
            en: 'In-App Support',
            ar: 'دعم داخل التطبيق',
          },
          description: {
            en: 'Get help instantly through the app',
            ar: 'احصل على المساعدة فورًا من خلال التطبيق',
          },
          badge: {
            en: 'Support',
            ar: 'الدعم',
          },
        },
      ],
    },

    // Features Section
    features: {
      title: {
        en: 'Complete Fleet Management Suite',
        ar: 'مجموعة إدارة الأسطول الكاملة',
      },
      overview: {
        en: 'Our comprehensive platform provides everything from driver management to revenue optimization, all in one place.',
        ar: 'توفر منصتنا الشاملة كل شيء من إدارة السائقين إلى تحسين الإيرادات، كل ذلك في مكان واحد.',
      },
      items: [
        {
          _key: generateKey('feature', 0),
          title: {
            en: 'Smart Dispatch System',
            ar: 'نظام إرسال ذكي',
          },
          description: {
            en: 'AI-powered dispatch that matches drivers with rides efficiently',
            ar: 'إرسال مدعوم بالذكاء الاصطناعي يطابق السائقين مع الرحلات بكفاءة',
          },
          points: [
            { _key: generateKey('point', 0), _type: 'localizedString', en: 'Automated driver assignment', ar: 'تعيين السائق الآلي' },
            { _key: generateKey('point', 1), _type: 'localizedString', en: 'Real-time route optimization', ar: 'تحسين المسار في الوقت الفعلي' },
            { _key: generateKey('point', 2), _type: 'localizedString', en: 'Predictive demand forecasting', ar: 'التنبؤ بالطلب التنبؤي' },
          ],
        },
        {
          _key: generateKey('feature', 1),
          title: {
            en: 'Revenue Management',
            ar: 'إدارة الإيرادات',
          },
          description: {
            en: 'Maximize profitability with dynamic pricing and analytics',
            ar: 'زيادة الربحية مع التسعير الديناميكي والتحليلات',
          },
          points: [
            { _key: generateKey('point', 3), _type: 'localizedString', en: 'Dynamic surge pricing', ar: 'تسعير ديناميكي متزايد' },
            { _key: generateKey('point', 4), _type: 'localizedString', en: 'Revenue analytics dashboard', ar: 'لوحة تحليلات الإيرادات' },
            { _key: generateKey('point', 5), _type: 'localizedString', en: 'Commission management', ar: 'إدارة العمولات' },
          ],
        },
        {
          _key: generateKey('feature', 2),
          title: {
            en: 'Driver Performance',
            ar: 'أداء السائق',
          },
          description: {
            en: 'Track and improve driver performance with detailed metrics',
            ar: 'تتبع وتحسين أداء السائق بمقاييس مفصلة',
          },
          points: [
            { _key: generateKey('point', 6), _type: 'localizedString', en: 'Performance ratings', ar: 'تقييمات الأداء' },
            { _key: generateKey('point', 7), _type: 'localizedString', en: 'Behavior monitoring', ar: 'مراقبة السلوك' },
            { _key: generateKey('point', 8), _type: 'localizedString', en: 'Incentive programs', ar: 'برامج الحوافز' },
          ],
        },
      ],
    },

    // AI Impact Section
    aiImpact: {
      title: {
        en: 'AI-Powered Intelligence',
        ar: 'الذكاء المدعوم بالذكاء الاصطناعي',
      },
      subtitle: {
        en: 'Leverage artificial intelligence to optimize fleet utilization, predict demand patterns, and automate complex routing decisions. Our AI engine continuously learns from your operations to deliver smarter recommendations and maximize profitability.',
        ar: 'استفد من الذكاء الاصطناعي لتحسين استخدام الأسطول والتنبؤ بأنماط الطلب وأتمتة قرارات التوجيه المعقدة. يتعلم محرك الذكاء الاصطناعي لدينا باستمرار من عملياتك لتقديم توصيات أكثر ذكاءً وتعظيم الربحية.',
      },
      impactTitle: {
        en: 'Real Results',
        ar: 'نتائج حقيقية',
      },
      metrics: [
        {
          _key: generateKey('metric', 0),
          value: '40%',
          label: {
            en: 'Reduced Idle Time',
            ar: 'تقليل وقت الخمول',
          },
          description: {
            en: 'AI-optimized dispatch reduces driver idle time',
            ar: 'الإرسال المحسّن بالذكاء الاصطناعي يقلل من وقت خمول السائق',
          },
        },
        {
          _key: generateKey('metric', 1),
          value: '25%',
          label: {
            en: 'Higher Revenue',
            ar: 'إيرادات أعلى',
          },
          description: {
            en: 'Dynamic pricing increases overall revenue',
            ar: 'التسعير الديناميكي يزيد من الإيرادات الإجمالية',
          },
        },
        {
          _key: generateKey('metric', 2),
          value: '60%',
          label: {
            en: 'Faster Matching',
            ar: 'مطابقة أسرع',
          },
          description: {
            en: 'Smart algorithms match drivers with rides faster',
            ar: 'الخوارزميات الذكية تطابق السائقين مع الرحلات بشكل أسرع',
          },
        },
        {
          _key: generateKey('metric', 3),
          value: '35%',
          label: {
            en: 'Cost Savings',
            ar: 'توفير التكاليف',
          },
          description: {
            en: 'Operational efficiency reduces overall costs',
            ar: 'الكفاءة التشغيلية تقلل من التكاليف الإجمالية',
          },
        },
      ],
    },

    // FAQ Section
    faq: {
      title: {
        en: 'Frequently Asked Questions',
        ar: 'الأسئلة الشائعة',
      },
      subtitle: {
        en: 'Find answers to common questions about our platform',
        ar: 'ابحث عن إجابات للأسئلة الشائعة حول منصتنا',
      },
      items: [
        {
          _key: generateKey('faq', 0),
          question: {
            en: 'How do I get started as a fleet operator?',
            ar: 'كيف أبدأ كمشغل أسطول؟',
          },
          answer: {
            en: 'Simply sign up for an operator account, complete the verification process, and you can start adding vehicles and drivers to your fleet immediately.',
            ar: 'ما عليك سوى التسجيل للحصول على حساب مشغل، وإكمال عملية التحقق، ويمكنك البدء في إضافة المركبات والسائقين إلى أسطولك على الفور.',
          },
        },
        {
          _key: generateKey('faq', 1),
          question: {
            en: 'What are the commission rates?',
            ar: 'ما هي معدلات العمولة؟',
          },
          answer: {
            en: 'Commission rates vary based on your fleet size and service level. Contact our sales team for a customized pricing plan that fits your business needs.',
            ar: 'تختلف معدلات العمولة بناءً على حجم أسطولك ومستوى الخدمة. اتصل بفريق المبيعات لدينا للحصول على خطة تسعير مخصصة تناسب احتياجات عملك.',
          },
        },
        {
          _key: generateKey('faq', 2),
          question: {
            en: 'Can drivers work for multiple operators?',
            ar: 'هل يمكن للسائقين العمل لدى عدة مشغلين؟',
          },
          answer: {
            en: 'Yes, drivers can choose to work with multiple operators on our platform, giving them maximum flexibility and earning potential.',
            ar: 'نعم، يمكن للسائقين اختيار العمل مع عدة مشغلين على منصتنا، مما يمنحهم أقصى قدر من المرونة وإمكانات الكسب.',
          },
        },
        {
          _key: generateKey('faq', 3),
          question: {
            en: 'What support is available for operators?',
            ar: 'ما الدعم المتاح للمشغلين؟',
          },
          answer: {
            en: 'We provide 24/7 technical support, dedicated account managers for enterprise clients, and comprehensive training resources to help you succeed.',
            ar: 'نحن نقدم دعمًا فنيًا على مدار الساعة طوال أيام الأسبوع، ومديري حسابات مخصصين لعملاء المؤسسات، وموارد تدريبية شاملة لمساعدتك على النجاح.',
          },
        },
      ],
    },

    // CTA Section
    cta: {
      heading: {
        en: 'Ready to Transform Your Fleet Operations?',
        ar: 'هل أنت مستعد لتحويل عمليات أسطولك؟',
      },
      subtitle: {
        en: 'Join thousands of operators and drivers who are already growing their business with Tranzkit',
        ar: 'انضم إلى آلاف المشغلين والسائقين الذين ينمون أعمالهم بالفعل مع Tranzkit',
      },
      primaryCta: {
        text: {
          en: 'Start Free Trial',
          ar: 'ابدأ تجربة مجانية',
        },
        href: '/contact',
      },
      secondaryCta: {
        text: {
          en: 'Schedule Demo',
          ar: 'جدولة عرض توضيحي',
        },
        href: '/contact',
      },
    },
  };

  // Apply the updates
  console.log('🔄 Updating document with all content...');

  await client
    .patch(doc._id)
    .set(updates)
    .commit();

  console.log('✅ Migration completed successfully!');
  console.log('📝 All sections have been populated with default content');
  console.log('');
  console.log('📋 Populated sections:');
  console.log('  ✅ Hero Section');
  console.log('  ✅ Overview Section');
  console.log('  ✅ Role Switcher (Operator & Driver features)');
  console.log('  ✅ Timeline (4 time slots)');
  console.log('  ✅ Dashboards (ready for screenshots)');
  console.log('  ✅ Mobile Apps (4 features)');
  console.log('  ✅ Features Section (3 features)');
  console.log('  ✅ AI Impact (4 metrics)');
  console.log('  ✅ FAQ (4 questions)');
  console.log('  ✅ CTA Section');
}

migrateOperatorsPage()
  .then(() => {
    console.log('');
    console.log('🎉 Done! Your Operators & Drivers page is ready.');
    console.log('💡 Next steps:');
    console.log('   1. Go to Sanity Studio');
    console.log('   2. Add dashboard screenshots to the Dashboards section');
    console.log('   3. Customize any content as needed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });