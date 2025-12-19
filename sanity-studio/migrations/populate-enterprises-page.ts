/**
 * Migration script to populate Enterprises & Passengers page with default content
 * Run this with: npx sanity exec migrations/populate-enterprises-page.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// Generate unique keys for array items
function generateKey(prefix: string, index: number) {
  return `${prefix}-${index}-${Date.now()}`;
}

async function migrateEnterprisesPage() {
  console.log('🔄 Starting migration for Enterprises & Passengers page...');

  // Fetch the enterprises page document
  const query = `*[_type == "solutionsEnterprisesPassengersPage"][0]`;
  let doc = await client.fetch(query);

  // If document doesn't exist, create it
  if (!doc) {
    console.log('📝 Creating new Enterprises & Passengers page document...');
    doc = await client.create({
      _type: 'solutionsEnterprisesPassengersPage',
      title: 'Solutions: Enterprises & Passengers',
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
        en: 'Reliable Transport. Total Visibility.',
        ar: 'نقل موثوق. رؤية شاملة.',
      },
      subtitle: {
        en: 'Tranzkit gives enterprises control over employee mobility and offers passengers a seamless, stress-free travel experience.',
        ar: 'يمنح Tranzkit الشركات السيطرة على تنقل الموظفين ويوفر للركاب تجربة سفر سلسة وخالية من التوتر.',
      },
      cta: {
        en: 'Book a Demo',
        ar: 'احجز عرضًا توضيحيًا',
      },
    },

    // Overview Section
    overview: {
      text: {
        en: 'Companies need to transport employees safely, efficiently, and cost-effectively. Passengers want timely, safe rides without uncertainty. Tranzkit meets both needs in a single platform - delivering insights, automation, and real-time updates for everyone.',
        ar: 'تحتاج الشركات إلى نقل الموظفين بأمان وكفاءة وفعالية من حيث التكلفة. يريد الركاب رحلات آمنة وفي الوقت المناسب دون عدم يقين. يلبي Tranzkit كلا الاحتياجين في منصة واحدة - تقديم الرؤى والأتمتة والتحديثات في الوقت الفعلي للجميع.',
      },
    },

    // Audience Switcher
    audienceSwitcher: {
      tabs: {
        enterprise: {
          en: 'Enterprises',
          ar: 'الشركات',
        },
        passenger: {
          en: 'Passengers',
          ar: 'الركاب',
        },
      },
      enterprise: {
        title: {
          en: 'Enterprise Solutions',
          ar: 'حلول المؤسسات',
        },
        description: {
          en: 'Comprehensive fleet management and corporate transportation solutions',
          ar: 'إدارة شاملة للأسطول وحلول النقل المؤسسي',
        },
        features: [
          {
            _key: generateKey('enterprise-feature', 0),
            _type: 'featureItem',
            title: {
              en: 'Centralized Fleet Management',
              ar: 'إدارة الأسطول المركزية',
            },
            description: {
              en: 'Manage your entire corporate fleet from a single dashboard with real-time visibility',
              ar: 'إدارة أسطول شركتك بالكامل من لوحة تحكم واحدة مع رؤية في الوقت الفعلي',
            },
          },
          {
            _key: generateKey('enterprise-feature', 1),
            _type: 'featureItem',
            title: {
              en: 'Employee Transportation',
              ar: 'نقل الموظفين',
            },
            description: {
              en: 'Streamline employee commute programs with automated scheduling and routing',
              ar: 'تبسيط برامج تنقل الموظفين مع الجدولة والتوجيه الآلي',
            },
          },
          {
            _key: generateKey('enterprise-feature', 2),
            _type: 'featureItem',
            title: {
              en: 'Cost Optimization',
              ar: 'تحسين التكلفة',
            },
            description: {
              en: 'Reduce transportation costs with AI-powered route optimization and analytics',
              ar: 'تقليل تكاليف النقل مع تحسين المسار والتحليلات المدعومة بالذكاء الاصطناعي',
            },
          },
          {
            _key: generateKey('enterprise-feature', 3),
            _type: 'featureItem',
            title: {
              en: 'Compliance & Reporting',
              ar: 'الامتثال والتقارير',
            },
            description: {
              en: 'Automated compliance tracking and comprehensive reporting for stakeholders',
              ar: 'تتبع الامتثال الآلي والتقارير الشاملة لأصحاب المصلحة',
            },
          },
        ],
      },
      passenger: {
        title: {
          en: 'Passenger Experience',
          ar: 'تجربة الركاب',
        },
        description: {
          en: 'Seamless, reliable, and comfortable transportation for your employees',
          ar: 'نقل سلس وموثوق ومريح لموظفيك',
        },
        features: [
          {
            _key: generateKey('passenger-feature', 0),
            _type: 'featureItem',
            title: {
              en: 'Easy Booking',
              ar: 'حجز سهل',
            },
            description: {
              en: 'Book rides in seconds with our intuitive mobile app interface',
              ar: 'احجز الرحلات في ثوانٍ مع واجهة تطبيق الهاتف المحمول البديهية',
            },
          },
          {
            _key: generateKey('passenger-feature', 1),
            _type: 'featureItem',
            title: {
              en: 'Real-time Tracking',
              ar: 'التتبع في الوقت الفعلي',
            },
            description: {
              en: 'Track your ride in real-time with accurate ETAs and driver information',
              ar: 'تتبع رحلتك في الوقت الفعلي مع أوقات الوصول الدقيقة ومعلومات السائق',
            },
          },
          {
            _key: generateKey('passenger-feature', 2),
            _type: 'featureItem',
            title: {
              en: 'Safety First',
              ar: 'السلامة أولاً',
            },
            description: {
              en: 'Verified drivers, emergency SOS button, and trip sharing for peace of mind',
              ar: 'سائقون موثقون، زر SOS للطوارئ، ومشاركة الرحلة لراحة البال',
            },
          },
          {
            _key: generateKey('passenger-feature', 3),
            _type: 'featureItem',
            title: {
              en: 'Flexible Options',
              ar: 'خيارات مرنة',
            },
            description: {
              en: 'Choose from various vehicle types and ride-sharing options to suit your needs',
              ar: 'اختر من بين أنواع المركبات المختلفة وخيارات مشاركة الرحلات لتناسب احتياجاتك',
            },
          },
        ],
      },
    },

    // Feature Showcase
    featureShowcase: {
      title: {
        en: 'Everything You Need to Succeed',
        ar: 'كل ما تحتاجه للنجاح',
      },
      subtitle: {
        en: 'Powerful features designed for enterprise-scale transportation management',
        ar: 'ميزات قوية مصممة لإدارة النقل على مستوى المؤسسات',
      },
      features: [
        {
          _key: generateKey('showcase-feature', 0),
          title: {
            en: 'Advanced Analytics',
            ar: 'تحليلات متقدمة',
          },
          description: {
            en: 'Real-time insights and predictive analytics for data-driven decisions',
            ar: 'رؤى في الوقت الفعلي وتحليلات تنبؤية لاتخاذ قرارات مبنية على البيانات',
          },
        },
        {
          _key: generateKey('showcase-feature', 1),
          title: {
            en: 'Enterprise Security',
            ar: 'أمان المؤسسات',
          },
          description: {
            en: 'Bank-level encryption and compliance certifications',
            ar: 'تشفير على مستوى البنوك وشهادات الامتثال',
          },
        },
        {
          _key: generateKey('showcase-feature', 2),
          title: {
            en: 'Instant Dispatch',
            ar: 'إرسال فوري',
          },
          description: {
            en: 'Automated routing and real-time driver allocation',
            ar: 'توجيه آلي وتخصيص السائقين في الوقت الفعلي',
          },
        },
        {
          _key: generateKey('showcase-feature', 3),
          title: {
            en: 'Team Management',
            ar: 'إدارة الفريق',
          },
          description: {
            en: 'Comprehensive tools for managing drivers and staff',
            ar: 'أدوات شاملة لإدارة السائقين والموظفين',
          },
        },
        {
          _key: generateKey('showcase-feature', 4),
          title: {
            en: 'Multi-location Support',
            ar: 'دعم متعدد المواقع',
          },
          description: {
            en: 'Manage operations across multiple cities and regions',
            ar: 'إدارة العمليات عبر مدن ومناطق متعددة',
          },
        },
        {
          _key: generateKey('showcase-feature', 5),
          title: {
            en: '24/7 Operations',
            ar: 'عمليات على مدار الساعة',
          },
          description: {
            en: 'Round-the-clock support and monitoring',
            ar: 'دعم ومراقبة على مدار الساعة',
          },
        },
      ],
    },

    // Workflow Section
    workflow: {
      passenger: {
        title: {
          en: 'Your Journey with Tranzkit',
          ar: 'رحلتك مع Tranzkit',
        },
        subtitle: {
          en: 'From booking to destination in 5 simple steps',
          ar: 'من الحجز إلى الوجهة في 5 خطوات بسيطة',
        },
        steps: [
          {
            _key: generateKey('passenger-step', 0),
            _type: 'workflowStep',
            title: {
              en: 'Book Your Ride',
              ar: 'احجز رحلتك',
            },
            description: {
              en: 'Open the app, enter your destination, and select your preferred vehicle type',
              ar: 'افتح التطبيق، أدخل وجهتك، واختر نوع المركبة المفضل لديك',
            },
          },
          {
            _key: generateKey('passenger-step', 1),
            _type: 'workflowStep',
            title: {
              en: 'Get Matched',
              ar: 'احصل على مطابقة',
            },
            description: {
              en: 'Our AI instantly matches you with the nearest available driver',
              ar: 'يطابقك الذكاء الاصطناعي لدينا على الفور مع أقرب سائق متاح',
            },
          },
          {
            _key: generateKey('passenger-step', 2),
            _type: 'workflowStep',
            title: {
              en: 'Track in Real-time',
              ar: 'تتبع في الوقت الفعلي',
            },
            description: {
              en: 'Watch your driver approach with live GPS tracking and accurate ETAs',
              ar: 'شاهد سائقك يقترب مع تتبع GPS المباشر وأوقات الوصول الدقيقة',
            },
          },
          {
            _key: generateKey('passenger-step', 3),
            _type: 'workflowStep',
            title: {
              en: 'Enjoy Your Ride',
              ar: 'استمتع برحلتك',
            },
            description: {
              en: 'Relax in comfort with verified drivers and in-app safety features',
              ar: 'استرخ بشكل مريح مع السائقين الموثقين وميزات السلامة داخل التطبيق',
            },
          },
          {
            _key: generateKey('passenger-step', 4),
            _type: 'workflowStep',
            title: {
              en: 'Rate & Review',
              ar: 'قيّم وراجع',
            },
            description: {
              en: 'Share your experience to help us maintain quality standards',
              ar: 'شارك تجربتك لمساعدتنا في الحفاظ على معايير الجودة',
            },
          },
        ],
      },
      enterprise: {
        title: {
          en: 'Enterprise Dashboard Flow',
          ar: 'تدفق لوحة تحكم المؤسسة',
        },
        subtitle: {
          en: 'Set up and manage your fleet in minutes',
          ar: 'قم بإعداد وإدارة أسطولك في دقائق',
        },
        steps: [
          {
            _key: generateKey('enterprise-step', 0),
            _type: 'workflowStep',
            title: {
              en: 'Setup Your Fleet',
              ar: 'قم بإعداد أسطولك',
            },
            description: {
              en: 'Add vehicles, drivers, and define your operational zones',
              ar: 'أضف المركبات والسائقين وحدد مناطق التشغيل الخاصة بك',
            },
          },
          {
            _key: generateKey('enterprise-step', 1),
            _type: 'workflowStep',
            title: {
              en: 'Configure Rules',
              ar: 'تكوين القواعد',
            },
            description: {
              en: 'Set up routing rules, pricing, and employee access policies',
              ar: 'قم بإعداد قواعد التوجيه والتسعير وسياسات وصول الموظفين',
            },
          },
          {
            _key: generateKey('enterprise-step', 2),
            _type: 'workflowStep',
            title: {
              en: 'Monitor Operations',
              ar: 'مراقبة العمليات',
            },
            description: {
              en: 'Track all rides, driver performance, and fleet utilization in real-time',
              ar: 'تتبع جميع الرحلات وأداء السائقين واستخدام الأسطول في الوقت الفعلي',
            },
          },
          {
            _key: generateKey('enterprise-step', 3),
            _type: 'workflowStep',
            title: {
              en: 'Analyze & Optimize',
              ar: 'تحليل وتحسين',
            },
            description: {
              en: 'Review analytics, identify trends, and optimize routes for cost savings',
              ar: 'راجع التحليلات، وحدد الاتجاهات، وحسّن المسارات لتوفير التكاليف',
            },
          },
          {
            _key: generateKey('enterprise-step', 4),
            _type: 'workflowStep',
            title: {
              en: 'Scale & Grow',
              ar: 'التوسع والنمو',
            },
            description: {
              en: 'Expand to new locations and add more vehicles as your needs grow',
              ar: 'توسع إلى مواقع جديدة وأضف المزيد من المركبات مع نمو احتياجاتك',
            },
          },
        ],
      },
    },

    // App Screens Carousel
    appScreens: {
      title: {
        en: 'Powerful Apps for Every User',
        ar: 'تطبيقات قوية لكل مستخدم',
      },
      subtitle: {
        en: 'Intuitive interfaces designed for enterprises, drivers, and passengers',
        ar: 'واجهات بديهية مصممة للمؤسسات والسائقين والركاب',
      },
      screenshots: [],
    },

    // Features Section
    features: {
      overview: {
        en: 'Our comprehensive platform provides everything from driver management to revenue optimization, all in one place.',
        ar: 'توفر منصتنا الشاملة كل شيء من إدارة السائقين إلى تحسين الإيرادات، كل ذلك في مكان واحد.',
      },
      title: {
        en: 'Features',
        ar: 'الميزات',
      },
      items: [
        {
          _key: generateKey('feature-item', 0),
          title: {
            en: 'Centralized Management for Enterprises',
            ar: 'الإدارة المركزية للمؤسسات',
          },
          description: {
            en: 'Complete control over employee transport',
            ar: 'سيطرة كاملة على نقل الموظفين',
          },
          points: [
            { _key: generateKey('point', 0), _type: 'localizedString', en: 'One dashboard for all trips, suppliers, and budgets', ar: 'لوحة تحكم واحدة لجميع الرحلات والموردين والميزانيات' },
            { _key: generateKey('point', 1), _type: 'localizedString', en: 'Automated cost tracking and approvals', ar: 'تتبع التكاليف والموافقات الآلية' },
            { _key: generateKey('point', 2), _type: 'localizedString', en: 'SLA monitoring and reporting', ar: 'مراقبة وإعداد تقارير اتفاقية مستوى الخدمة' },
          ],
        },
        {
          _key: generateKey('feature-item', 1),
          title: {
            en: 'Seamless Booking & Ride Experience for Passengers',
            ar: 'حجز سلس وتجربة رحلة للركاب',
          },
          description: {
            en: 'Stress-free travel for your team',
            ar: 'سفر خالٍ من التوتر لفريقك',
          },
          points: [
            { _key: generateKey('point', 3), _type: 'localizedString', en: 'Easy mobile booking and trip tracking', ar: 'حجز سهل عبر الهاتف المحمول وتتبع الرحلات' },
            { _key: generateKey('point', 4), _type: 'localizedString', en: 'Verified drivers and safety checks', ar: 'سائقون موثقون وفحوصات السلامة' },
            { _key: generateKey('point', 5), _type: 'localizedString', en: 'Instant notifications and support', ar: 'إشعارات فورية ودعم' },
          ],
        },
        {
          _key: generateKey('feature-item', 2),
          title: {
            en: 'Analytics and Decision-Making Tools',
            ar: 'أدوات التحليل واتخاذ القرار',
          },
          description: {
            en: 'Data-driven transport optimization',
            ar: 'تحسين النقل المبني على البيانات',
          },
          points: [
            { _key: generateKey('point', 6), _type: 'localizedString', en: 'Insights to reduce transport costs', ar: 'رؤى لتقليل تكاليف النقل' },
            { _key: generateKey('point', 7), _type: 'localizedString', en: 'Data-driven decisions for route and supplier optimization', ar: 'قرارات مبنية على البيانات لتحسين المسار والموردين' },
            { _key: generateKey('point', 8), _type: 'localizedString', en: 'Performance dashboards and actionable reports', ar: 'لوحات معلومات الأداء والتقارير القابلة للتنفيذ' },
          ],
        },
        {
          _key: generateKey('feature-item', 3),
          title: {
            en: 'Integration & Compliance',
            ar: 'التكامل والامتثال',
          },
          description: {
            en: 'Seamless integration with your systems',
            ar: 'تكامل سلس مع أنظمتك',
          },
          points: [
            { _key: generateKey('point', 9), _type: 'localizedString', en: 'Connect with HR, payroll, or finance systems', ar: 'الاتصال بأنظمة الموارد البشرية أو الرواتب أو المالية' },
            { _key: generateKey('point', 10), _type: 'localizedString', en: 'Secure, role-based access', ar: 'وصول آمن قائم على الأدوار' },
            { _key: generateKey('point', 11), _type: 'localizedString', en: 'Multilingual support (Arabic & English)', ar: 'دعم متعدد اللغات (العربية والإنجليزية)' },
          ],
        },
      ],
    },

    // Testimonials
    testimonials: {
      title: {
        en: 'Trusted by Leading Organizations',
        ar: 'موثوق به من قبل المنظمات الرائدة',
      },
      subtitle: {
        en: 'See what our enterprise clients say about Tranzkit',
        ar: 'انظر ما يقوله عملاؤنا من المؤسسات عن Tranzkit',
      },
      items: [
        {
          _key: generateKey('testimonial', 0),
          name: 'Sarah Johnson',
          role: {
            en: 'Fleet Manager',
            ar: 'مدير الأسطول',
          },
          company: 'TechCorp Industries',
          content: {
            en: 'Tranzkit transformed our employee transportation program. We reduced costs by 30% while improving service quality.',
            ar: 'حوّل Tranzkit برنامج نقل الموظفين لدينا. قللنا التكاليف بنسبة 30٪ مع تحسين جودة الخدمة.',
          },
          initials: 'SJ',
          rating: 5,
        },
        {
          _key: generateKey('testimonial', 1),
          name: 'Ahmed Al-Rashid',
          role: {
            en: 'Operations Director',
            ar: 'مدير العمليات',
          },
          company: 'Global Logistics',
          content: {
            en: 'The real-time tracking and analytics have given us unprecedented visibility into our fleet operations.',
            ar: 'أعطانا التتبع في الوقت الفعلي والتحليلات رؤية غير مسبوقة لعمليات أسطولنا.',
          },
          initials: 'AA',
          rating: 5,
        },
        {
          _key: generateKey('testimonial', 2),
          name: 'Maria Garcia',
          role: {
            en: 'HR Manager',
            ar: 'مدير الموارد البشرية',
          },
          company: 'Innovation Labs',
          content: {
            en: 'Our employees love the app. It\'s made their daily commute stress-free and reliable.',
            ar: 'يحب موظفونا التطبيق. لقد جعل تنقلهم اليومي خاليًا من التوتر وموثوقًا.',
          },
          initials: 'MG',
          rating: 5,
        },
      ],
    },

    // AI Impact Section
    aiImpact: {
      title: {
        en: 'AI Advantage',
        ar: 'ميزة الذكاء الاصطناعي',
      },
      subtitle: {
        en: 'Tranzkit uses AI to forecast transport demand, allocate vehicles efficiently, and provide predictive analytics for cost optimization. Enterprises can see real-time performance metrics while passengers experience reliable and consistent service.',
        ar: 'يستخدم Tranzkit الذكاء الاصطناعي للتنبؤ بطلب النقل، وتخصيص المركبات بكفاءة، وتوفير تحليلات تنبؤية لتحسين التكلفة. يمكن للمؤسسات رؤية مقاييس الأداء في الوقت الفعلي بينما يختبر الركاب خدمة موثوقة ومتسقة.',
      },
      impactTitle: {
        en: 'Impact',
        ar: 'التأثير',
      },
      metrics: [
        {
          _key: generateKey('metric', 0),
          value: {
            en: '25%',
            ar: '٢٥٪',
          },
          label: {
            en: 'reduction in transport costs',
            ar: 'تخفيض في تكاليف النقل',
          },
          description: {
            en: 'Average cost savings achieved by our enterprise clients',
            ar: 'متوسط ​​التوفير في التكاليف الذي حققه عملاؤنا من المؤسسات',
          },
        },
        {
          _key: generateKey('metric', 1),
          value: {
            en: 'Increased',
            ar: 'زيادة',
          },
          label: {
            en: 'employee satisfaction and punctuality',
            ar: 'رضا الموظفين والالتزام بالمواعيد',
          },
          description: {
            en: 'Improved employee experience and on-time arrivals',
            ar: 'تحسين تجربة الموظفين والوصول في الوقت المحدد',
          },
        },
        {
          _key: generateKey('metric', 2),
          value: {
            en: 'Transparent',
            ar: 'شفاف',
          },
          label: {
            en: 'tracking of all trips and invoices',
            ar: 'تتبع جميع الرحلات والفواتير',
          },
          description: {
            en: 'Complete visibility into transportation spending',
            ar: 'رؤية كاملة للإنفاق على النقل',
          },
        },
        {
          _key: generateKey('metric', 3),
          value: {
            en: 'Safer',
            ar: 'أكثر أمانًا',
          },
          label: {
            en: 'and more predictable passenger journeys',
            ar: 'ورحلات ركاب أكثر قابلية للتنبؤ',
          },
          description: {
            en: 'Enhanced safety features and reliable service',
            ar: 'ميزات سلامة محسّنة وخدمة موثوقة',
          },
        },
      ],
    },

    // CTA Section
    cta: {
      heading: {
        en: 'Enhance Your Transport Experience.',
        ar: 'عزز تجربة النقل الخاصة بك.',
      },
      subtitle: {
        en: 'Gain control and reliability for your team today.',
        ar: 'احصل على السيطرة والموثوقية لفريقك اليوم.',
      },
      primaryCta: {
        text: {
          en: 'Book Your Demo',
          ar: 'احجز عرضك التوضيحي',
        },
        href: '/contact',
      },
    },
  };

  // Update the document
  console.log('🔄 Updating document...');
  await client.patch(doc._id).set(updates).commit();

  console.log('✅ Migration completed successfully!');
  console.log('📝 All sections have been populated with default content');
  console.log('\n📋 Populated sections:');
  console.log('  ✅ Hero Section');
  console.log('  ✅ Audience Switcher (Enterprise & Passenger features)');
  console.log('  ✅ Overview Section');
  console.log('  ✅ Feature Showcase (6 features)');
  console.log('  ✅ Workflow (Passenger & Enterprise steps)');
  console.log('  ✅ App Screens (ready for screenshots)');
  console.log('  ✅ Features Section (4 features)');
  console.log('  ✅ Testimonials (3 testimonials)');
  console.log('  ✅ AI Impact (4 metrics)');
  console.log('  ✅ CTA Section');
  console.log('\n🎉 Done! Your Enterprises & Passengers page is ready.');
  console.log('💡 Next steps:');
  console.log('   1. Go to Sanity Studio');
  console.log('   2. Add app screenshots to the App Screens section');
  console.log('   3. Customize any content as needed');
}

migrateEnterprisesPage().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});

