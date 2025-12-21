import { defineType } from 'sanity';
import { IconPicker } from '../../components/IconPicker';

/**
 * Solutions: Operators & Drivers Page
 * Based on solutions.operatorsDrivers in translation JSON
 */
export const solutionsOperatorsDriversPage = defineType({
  name: 'solutionsOperatorsDriversPage',
  title: 'Solutions: Operators & Drivers',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Solutions: Operators & Drivers',
      readOnly: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    // Hero Section
    {
      name: 'hero',
      title: '🎯 Hero Section',
      type: 'object',
      description: 'Main hero section at the top of the page',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          initialValue: {
            en: 'Scale Your Fleet Operations',
            ar: 'قم بتوسيع عمليات أسطولك',
          },
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          initialValue: {
            en: 'Empower operators with advanced tools and drivers with seamless earning opportunities',
            ar: 'قم بتمكين المشغلين بأدوات متقدمة والسائقين بفرص كسب سلسة',
          },
        },
        {
          name: 'cta',
          title: 'CTA Button Text',
          type: 'localizedString',
          initialValue: {
            en: 'Get Started',
            ar: 'ابدأ الآن',
          },
        },
      ],
    },
    // Overview Section
    {
      name: 'overview',
      title: '📝 Overview Section',
      type: 'object',
      description: 'Brief overview text introducing the page content',
      fields: [
        {
          name: 'text',
          title: 'Overview Text',
          type: 'localizedText',
          initialValue: {
            en: 'Operators need efficient fleet management and revenue optimization. Drivers want flexible schedules and reliable income. Tranzkit bridges both worlds with powerful automation, real-time insights, and tools designed for growth.',
            ar: 'يحتاج المشغلون إلى إدارة فعالة للأسطول وتحسين الإيرادات. يريد السائقون جداول مرنة ودخل موثوق. يربط Tranzkit بين العالمين بأتمتة قوية ورؤى في الوقت الفعلي وأدوات مصممة للنمو.',
          },
        },
      ],
    },
    // Role Switcher (Tabs)
    {
      name: 'roleSwitcher',
      title: '🔄 Role Switcher Tabs',
      type: 'object',
      description: 'Tabbed section showing content for Operators and Drivers',
      fields: [
        {
          name: 'tabs',
          title: 'Tab Labels',
          type: 'object',
          fields: [
            {
              name: 'operator',
              title: 'Operator Tab',
              type: 'localizedString',
              initialValue: {
                en: 'Operators',
                ar: 'المشغلون',
              },
            },
            {
              name: 'driver',
              title: 'Driver Tab',
              type: 'localizedString',
              initialValue: {
                en: 'Drivers',
                ar: 'السائقون',
              },
            },
          ],
        },
        {
          name: 'operator',
          title: 'Operator Content',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
              initialValue: {
                en: 'For Fleet Operators',
                ar: 'لمشغلي الأسطول',
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localizedText',
              initialValue: {
                en: 'Complete control over your transportation operations',
                ar: 'تحكم كامل في عمليات النقل الخاصة بك',
              },
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'featureItem' }],
            },
          ],
        },
        {
          name: 'driver',
          title: 'Driver Content',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
              initialValue: {
                en: 'For Drivers',
                ar: 'للسائقين',
              },
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localizedText',
              initialValue: {
                en: 'Earn more with flexible schedules and powerful tools',
                ar: 'اكسب المزيد مع جداول مرنة وأدوات قوية',
              },
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'featureItem' }],
            },
          ],
        },
      ],
    },
    // Timeline Section
    {
      name: 'timeline',
      title: '⏰ 24/7 Operations Timeline',
      type: 'object',
      description: 'Timeline showing operations throughout the day',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          initialValue: {
            en: '24/7 Operations Management',
            ar: 'إدارة العمليات على مدار الساعة',
          },
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          initialValue: {
            en: 'Track and manage your fleet operations around the clock',
            ar: 'تتبع وإدارة عمليات أسطولك على مدار الساعة',
          },
        },
        {
          name: 'items',
          title: 'Timeline Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'time',
                  title: 'Time',
                  type: 'string',
                  description: 'e.g., "06:00", "12:00"',
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Select an icon for this timeline item (optional)',
                  components: {
                    input: IconPicker,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // Dashboards Section
    {
      name: 'dashboards',
      title: '📊 Dashboard Preview Carousel',
      type: 'object',
      description: 'Showcase different dashboard views with screenshots',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          description: 'e.g., "Powerful Dashboard Views"',
          initialValue: {
            en: 'Powerful Dashboard Views',
            ar: 'عروض لوحة معلومات قوية',
          },
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
          description: 'Brief description of the dashboard features',
          initialValue: {
            en: 'Everything you need to manage your operations efficiently',
            ar: 'كل ما تحتاجه لإدارة عملياتك بكفاءة',
          },
        },
        {
          name: 'screenshots',
          title: 'Dashboard Screenshots',
          type: 'array',
          description: 'Upload screenshots of different dashboard views',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Dashboard Name',
                  type: 'localizedString',
                  description: 'e.g., "Fleet Overview", "Driver Management"',
                },
                {
                  name: 'description',
                  title: 'Dashboard Description',
                  type: 'localizedText',
                  description: 'Brief description of what this dashboard shows',
                },
                {
                  name: 'image',
                  title: 'Screenshot',
                  type: 'image',
                  description: 'Dashboard screenshot (recommended: 1200x800px)',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // Mobile Apps Section
    {
      name: 'mobileApps',
      title: '📱 Driver App Features',
      type: 'object',
      description: 'Showcase driver mobile app features',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          initialValue: {
            en: 'Driver App Features',
            ar: 'ميزات تطبيق السائق',
          },
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          initialValue: {
            en: 'Everything drivers need in one powerful mobile application',
            ar: 'كل ما يحتاجه السائقون في تطبيق جوال قوي واحد',
          },
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Feature Description',
                  type: 'localizedText',
                },
                {
                  name: 'badge',
                  title: 'Badge Text',
                  type: 'localizedString',
                  description: 'e.g., "New", "Popular"',
                },
              ],
            },
          ],
        },
      ],
    },
    // Features Section
    {
      name: 'features',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Overview Text',
          type: 'localizedText',
          description: 'Introductory text displayed above the features',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                },
                {
                  name: 'points',
                  title: 'Feature Points',
                  type: 'array',
                  of: [{ type: 'localizedString' }],
                },
              ],
            },
          ],
        },
      ],
    },
    // AI Impact Section
    {
      name: 'aiImpact',
      title: '🤖 AI Impact Section',
      type: 'object',
      description: 'AI advantages and impact metrics',
      fields: [
        {
          name: 'title',
          title: 'AI Advantage Title',
          type: 'localizedString',
          description: 'Title for the AI advantage section',
          initialValue: {
            en: 'AI-Powered Intelligence',
            ar: 'الذكاء المدعوم بالذكاء الاصطناعي',
          },
        },
        {
          name: 'subtitle',
          title: 'AI Advantage Subtitle',
          type: 'localizedText',
          description: 'Description for the AI advantage section',
          initialValue: {
            en: 'Leverage artificial intelligence to optimize fleet utilization, predict demand patterns, and automate complex routing decisions. Our AI engine continuously learns from your operations to deliver smarter recommendations and maximize profitability.',
            ar: 'استفد من الذكاء الاصطناعي لتحسين استخدام الأسطول والتنبؤ بأنماط الطلب وأتمتة قرارات التوجيه المعقدة. يتعلم محرك الذكاء الاصطناعي لدينا باستمرار من عملياتك لتقديم توصيات أكثر ذكاءً وتعظيم الربحية.',
          },
        },
        {
          name: 'impactTitle',
          title: 'Impact Metrics Title',
          type: 'localizedString',
          description: 'Title for the impact metrics section (e.g., "Real Impact, Real Results")',
          initialValue: {
            en: 'Real Results',
            ar: 'نتائج حقيقية',
          },
        },
        {
          name: 'metrics',
          title: 'Impact Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Metric Value',
                  type: 'localizedString',
                  description: 'e.g., "35%", "3x"',
                },
                {
                  name: 'label',
                  title: 'Metric Label',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                },
              ],
            },
          ],
        },
      ],
    },
    // FAQ Section
    {
      name: 'faq',
      title: '❓ FAQ Section',
      type: 'object',
      description: 'Frequently asked questions',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          initialValue: {
            en: 'Frequently Asked Questions',
            ar: 'الأسئلة الشائعة',
          },
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          initialValue: {
            en: 'Find answers to common questions about our platform',
            ar: 'ابحث عن إجابات للأسئلة الشائعة حول منصتنا',
          },
        },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'question',
                  title: 'Question',
                  type: 'localizedString',
                },
                {
                  name: 'answer',
                  title: 'Answer',
                  type: 'localizedText',
                },
              ],
            },
          ],
        },
      ],
    },
    // CTA Section
    {
      name: 'cta',
      title: '🎯 CTA Section',
      type: 'ctaSection',
      description: 'Call-to-action section at the bottom of the page',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Solutions: Operators & Drivers',
      };
    },
  },
});

