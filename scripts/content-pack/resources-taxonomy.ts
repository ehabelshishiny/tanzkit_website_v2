const L = (en: string, ar: string) => ({ en, ar })

const seo = (
  metaTitleEn: string,
  metaTitleAr: string,
  metaDescriptionEn: string,
  metaDescriptionAr: string,
  keywordsEn: string[],
  keywordsAr: string[],
  canonicalUrl: string,
) => ({
  metaTitle: L(metaTitleEn, metaTitleAr),
  metaDescription: L(metaDescriptionEn, metaDescriptionAr),
  keywords: {
    en: keywordsEn,
    ar: keywordsAr,
  },
  canonicalUrl,
  noIndex: false,
  noFollow: false,
})

export const resourcesHubPageDoc = {
  _id: 'resourcesHubPage',
  _type: 'resourcesHubPage',
  hero: {
    title: L('Resources for Employee Transportation Excellence', 'مركز موارد لتميّز نقل الموظفين'),
    subtitle: L('Insights, guides, case studies, and FAQs', 'رؤى وأدلة ودراسات حالة وأسئلة شائعة'),
    description: L(
      'Explore practical content for operators and enterprise teams running fixed-route and demand-based employee transport with stronger visibility, safety, and financial control.',
      'اكتشف محتوى عمليًا للمشغّلين وفرق الشركات التي تدير نقل الموظفين الثابت وعند الطلب برؤية أوضح وسلامة أعلى وتحكم مالي أدق.',
    ),
  },
  blogSection: {
    title: L('Blog & Insights', 'المدونة والرؤى'),
    description: L(
      'Actionable articles on transport operations, dispatch governance, route optimization, supplier management, and transport finance.',
      'مقالات تطبيقية حول تشغيل النقل وحوكمة التوزيع وتحسين المسارات وإدارة المورّدين ومالية النقل.',
    ),
  },
  caseStudiesSection: {
    title: L('Case Studies', 'دراسات الحالة'),
    description: L(
      'Learn how transport operators and enterprise buyers improve SLA performance, occupancy, and settlement accuracy using Tranzkit.',
      'تعرّف كيف حسّن المشغّلون والجهات المؤسسية المشترية أداء اتفاقيات الخدمة ونِسب الإشغال ودقة التسويات باستخدام ترانزكيت.',
    ),
  },
  faqSection: {
    title: L('Frequently Asked Questions', 'الأسئلة الشائعة'),
    description: L(
      'Find clear answers about onboarding, operations setup, integrations, billing flows, and governance best practices.',
      'اعثر على إجابات واضحة حول الإعداد والتشغيل والتكاملات وآليات الفوترة وأفضل ممارسات الحوكمة.',
    ),
  },
  documentationSection: {
    title: L('Documentation', 'التوثيق'),
    description: L(
      'Detailed technical and operational documentation for implementation teams, transport admins, and integration stakeholders.',
      'توثيق تقني وتشغيلي تفصيلي لفرق التنفيذ ومديري النقل وأصحاب المصلحة في التكامل.',
    ),
  },
  careersSection: {
    title: L('Careers', 'الوظائف'),
    description: L(
      'Join a team building modern employee transportation ERP solutions for operators and enterprises.',
      'انضم إلى فريق يطوّر حلول ERP حديثة لنقل الموظفين للمشغّلين والشركات.',
    ),
  },
  seo: seo(
    'Employee Transportation Resources Hub | Tranzkit',
    'مركز موارد نقل الموظفين | ترانزكيت',
    'Browse Tranzkit resources covering employee transportation operations, route planning, dispatch control, billing, and enterprise mobility governance.',
    'تصفح موارد ترانزكيت حول تشغيل نقل الموظفين وتخطيط المسارات والتحكم التشغيلي والفوترة وحوكمة التنقل المؤسسي.',
    [
      'employee transportation resources',
      'corporate commute insights',
      'transport operations guides',
      'employee mobility best practices',
      'transport ERP knowledge base',
    ],
    [
      'موارد نقل الموظفين',
      'رؤى النقل المؤسسي',
      'أدلة تشغيل النقل',
      'أفضل ممارسات تنقل الموظفين',
      'قاعدة معرفة ERP النقل',
    ],
    'https://tranzkit.com/resources',
  ),
}

export const blogPageDoc = {
  _id: 'blogPage',
  _type: 'blogPage',
  hero: {
    title: L('Employee Transport Blog', 'مدونة نقل الموظفين'),
    subtitle: L('Practical guidance for operators and enterprise teams', 'إرشاد عملي للمشغّلين وفرق الشركات'),
    description: L(
      'Read practical content on fixed-route planning, demand batching, dispatch quality, safety controls, and transport finance workflows.',
      'اقرأ محتوى عمليًا حول التخطيط للخطوط الثابتة وتجميع الطلبات وجودة التوزيع وضوابط السلامة ومسارات مالية النقل.',
    ),
  },
  seo: seo(
    'Employee Transportation Blog | Tranzkit',
    'مدونة نقل الموظفين | ترانزكيت',
    'Explore Tranzkit blog articles on employee transportation management, dispatch operations, route optimization, and transport billing.',
    'استكشف مقالات مدونة ترانزكيت حول إدارة نقل الموظفين والتشغيل الميداني وتحسين المسارات وفوترة النقل.',
    [
      'employee transportation blog',
      'corporate shuttle articles',
      'dispatch operations content',
      'transport management insights',
      'route optimization blog',
    ],
    [
      'مدونة نقل الموظفين',
      'مقالات النقل المؤسسي',
      'محتوى التشغيل والتوزيع',
      'رؤى إدارة النقل',
      'مدونة تحسين المسارات',
    ],
    'https://tranzkit.com/resources/blog',
  ),
}

export const caseStudiesPageDoc = {
  _id: 'caseStudiesPage',
  _type: 'caseStudiesPage',
  hero: {
    title: L('Customer Case Studies', 'دراسات حالة العملاء'),
    subtitle: L('Real operating and financial outcomes', 'نتائج تشغيلية ومالية واقعية'),
    description: L(
      'See how organizations use Tranzkit to improve service reliability, trip visibility, supplier accountability, and transport cost control.',
      'شاهد كيف تستخدم الجهات ترانزكيت لتحسين موثوقية الخدمة ورؤية الرحلات ومساءلة المورّدين والتحكم في تكلفة النقل.',
    ),
  },
  seo: seo(
    'Employee Transportation Case Studies | Tranzkit',
    'دراسات حالة نقل الموظفين | ترانزكيت',
    'Review Tranzkit case studies to learn how operators and enterprises improve transport performance, SLA compliance, and billing accuracy.',
    'اطلع على دراسات حالة ترانزكيت لتتعرف كيف يحسّن المشغّلون والشركات أداء النقل والالتزام باتفاقيات الخدمة ودقة الفوترة.',
    [
      'employee transport case study',
      'corporate mobility success stories',
      'transport SLA improvement',
      'fleet vendor performance cases',
      'transport billing outcomes',
    ],
    [
      'دراسة حالة نقل الموظفين',
      'قصص نجاح النقل المؤسسي',
      'تحسين اتفاقيات مستوى الخدمة',
      'حالات أداء المورّدين',
      'نتائج فوترة النقل',
    ],
    'https://tranzkit.com/resources/case-studies',
  ),
}

export const faqPageDoc = {
  _id: 'faqPage',
  _type: 'faqPage',
  hero: {
    title: L('Frequently Asked Questions', 'الأسئلة الشائعة'),
    subtitle: L('Clear answers for implementation and operations', 'إجابات واضحة للتنفيذ والتشغيل'),
    description: L(
      'Get answers about setup, transport workflows, role permissions, integrations, billing logic, and employee commute governance.',
      'احصل على إجابات حول الإعداد ومسارات تشغيل النقل وصلاحيات الأدوار والتكاملات ومنطق الفوترة وحوكمة تنقل الموظفين.',
    ),
  },
  seo: seo(
    'Employee Transportation FAQ | Tranzkit',
    'الأسئلة الشائعة لنقل الموظفين | ترانزكيت',
    'Find answers to common questions about Tranzkit employee transportation ERP workflows, dispatch setup, integrations, and billing.',
    'اعثر على إجابات للأسئلة الأكثر شيوعًا حول مسارات ERP نقل الموظفين في ترانزكيت وإعداد التوزيع والتكاملات والفوترة.',
    [
      'employee transport faq',
      'corporate commute software faq',
      'transport ERP questions',
      'dispatch setup help',
      'transport billing faq',
    ],
    [
      'الأسئلة الشائعة لنقل الموظفين',
      'أسئلة برنامج النقل المؤسسي',
      'أسئلة ERP النقل',
      'دليل إعداد التوزيع',
      'أسئلة فوترة النقل',
    ],
    'https://tranzkit.com/resources/faq',
  ),
}

export const documentationPageDoc = {
  _id: 'documentationPage',
  _type: 'documentationPage',
  htmlContent: {
    en: `<section><h1>Tranzkit Documentation</h1><p>Technical and operational documentation for implementing Tranzkit Employee Transportation ERP. This section covers architecture, onboarding workflows, dispatch and route planning setup, role permissions, and finance operations including billing and settlement.</p><h2>What You Will Find</h2><ul><li>Platform architecture and environment setup</li><li>Data structure and import guidelines</li><li>Operations configuration for routes, schedules, and assignments</li><li>Live operations monitoring and exception handling</li><li>Billing, invoice validation, and settlement process flows</li><li>Integration guidance for enterprise systems</li></ul></section>`,
    ar: `<section><h1>توثيق ترانزكيت</h1><p>توثيق تقني وتشغيلي لتنفيذ نظام ERP نقل الموظفين من ترانزكيت. يغطي هذا القسم المعمارية التقنية وإجراءات الإعداد وتهيئة التوزيع وتخطيط المسارات والصلاحيات والعمليات المالية بما في ذلك الفوترة والتسوية.</p><h2>ماذا ستجد هنا</h2><ul><li>معمارية المنصة وإعداد البيئات</li><li>هيكلة البيانات وإرشادات الاستيراد</li><li>تهيئة التشغيل للمسارات والجداول والتخصيصات</li><li>متابعة التشغيل المباشر وإدارة الاستثناءات</li><li>مسارات الفوترة والتحقق من الفواتير والتسويات</li><li>إرشادات التكامل مع أنظمة الشركات</li></ul></section>`,
  },
  seo: seo(
    'Tranzkit Documentation | Employee Transportation ERP',
    'توثيق ترانزكيت | ERP نقل الموظفين',
    'Access Tranzkit documentation for implementation, operations setup, transport workflows, and billing and settlement controls.',
    'ادخل إلى توثيق ترانزكيت للتنفيذ وإعداد التشغيل ومسارات النقل وضوابط الفوترة والتسوية.',
    [
      'tranzkit documentation',
      'employee transportation ERP docs',
      'transport operations documentation',
      'dispatch workflow documentation',
      'transport billing documentation',
    ],
    [
      'توثيق ترانزكيت',
      'توثيق ERP نقل الموظفين',
      'توثيق تشغيل النقل',
      'توثيق مسارات التوزيع',
      'توثيق فوترة النقل',
    ],
    'https://tranzkit.com/resources/documentation',
  ),
}

export const authorDocs = [
  {
    _id: 'author-tranzkit-editorial-team',
    _type: 'author',
    name: L('Tranzkit Editorial Team', 'فريق التحرير في ترانزكيت'),
    slug: { _type: 'slug', current: 'tranzkit-editorial-team' },
    bio: L(
      'Editorial team focused on employee transportation operations, transport ERP workflows, and enterprise mobility governance.',
      'فريق تحريري متخصص في تشغيل نقل الموظفين ومسارات ERP النقل وحوكمة التنقل المؤسسي.',
    ),
    role: L('Product Marketing & Domain Content Team', 'فريق تسويق المنتج والمحتوى التخصصي'),
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/codefy-hub',
      website: 'https://tranzkit.com',
    },
  },
]

export const blogCategoryDocs = [
  {
    _id: 'blog-category-operations-dispatch',
    _type: 'blogCategory',
    name: L('Operations & Dispatch', 'التشغيل والتوزيع'),
    slug: { _type: 'slug', current: 'operations-dispatch' },
    description: L('Articles on dispatch execution, route operations, and daily service governance.', 'مقالات حول تنفيذ التوزيع وتشغيل المسارات وحوكمة الخدمة اليومية.'),
    color: '#0EA5E9',
  },
  {
    _id: 'blog-category-transport-finance',
    _type: 'blogCategory',
    name: L('Transport Finance & Settlement', 'مالية النقل والتسويات'),
    slug: { _type: 'slug', current: 'transport-finance-settlement' },
    description: L('Content about invoicing, reconciliation, supplier settlement, and margin visibility.', 'محتوى حول الفوترة والمطابقة وتسويات المورّدين ورؤية الهامش.'),
    color: '#14B8A6',
  },
  {
    _id: 'blog-category-enterprise-mobility',
    _type: 'blogCategory',
    name: L('Enterprise Mobility Governance', 'حوكمة التنقل المؤسسي'),
    slug: { _type: 'slug', current: 'enterprise-mobility-governance' },
    description: L('Guidance for HR, facilities, and operations stakeholders managing employee commute programs.', 'إرشادات لفرق الموارد البشرية والمرافق والتشغيل لإدارة برامج تنقل الموظفين.'),
    color: '#6366F1',
  },
  {
    _id: 'blog-category-safety-compliance',
    _type: 'blogCategory',
    name: L('Safety & Compliance', 'السلامة والامتثال'),
    slug: { _type: 'slug', current: 'safety-compliance' },
    description: L('Best practices for incident controls, service quality, and operational compliance workflows.', 'أفضل الممارسات لضبط الحوادث وجودة الخدمة ومسارات الامتثال التشغيلي.'),
    color: '#F97316',
  },
]

export const caseStudyCategoryDocs = [
  {
    _id: 'case-study-category-operator-transformation',
    _type: 'caseStudyCategory',
    name: L('Operator Transformation', 'تحول المشغّل'),
    slug: { _type: 'slug', current: 'operator-transformation' },
    description: L('Outcomes from transport operators modernizing planning, dispatch, and execution.', 'نتائج مشغّلي النقل بعد تحديث التخطيط والتوزيع والتنفيذ.'),
    color: '#3B82F6',
  },
  {
    _id: 'case-study-category-enterprise-governance',
    _type: 'caseStudyCategory',
    name: L('Enterprise Governance', 'الحوكمة المؤسسية'),
    slug: { _type: 'slug', current: 'enterprise-governance' },
    description: L('Stories on service validation, SLA visibility, and commute governance for enterprise buyers.', 'قصص حول التحقق من الخدمة ورؤية اتفاقيات المستوى وحوكمة التنقل للجهات المشترية.'),
    color: '#8B5CF6',
  },
  {
    _id: 'case-study-category-finance-control',
    _type: 'caseStudyCategory',
    name: L('Finance & Cost Control', 'المالية وضبط التكلفة'),
    slug: { _type: 'slug', current: 'finance-cost-control' },
    description: L('Examples focused on invoice quality, settlement control, and cost transparency.', 'أمثلة تركّز على جودة الفواتير وضبط التسويات وشفافية التكلفة.'),
    color: '#10B981',
  },
]

export const faqCategoryDocs = [
  {
    _id: 'faq-category-getting-started',
    _type: 'faqCategory',
    name: L('Getting Started', 'البدء والإعداد'),
    slug: { _type: 'slug', current: 'getting-started' },
    description: L('Onboarding scope, implementation steps, and launch expectations.', 'نطاق الإعداد وخطوات التنفيذ وتوقعات الإطلاق.'),
    color: '#06B6D4',
  },
  {
    _id: 'faq-category-operations-workflows',
    _type: 'faqCategory',
    name: L('Operations Workflows', 'مسارات التشغيل'),
    slug: { _type: 'slug', current: 'operations-workflows' },
    description: L('Routes, schedules, dispatch, monitoring, and exception handling.', 'المسارات والجداول والتوزيع والمتابعة وإدارة الاستثناءات.'),
    color: '#3B82F6',
  },
  {
    _id: 'faq-category-finance-billing',
    _type: 'faqCategory',
    name: L('Finance & Billing', 'المالية والفوترة'),
    slug: { _type: 'slug', current: 'finance-billing' },
    description: L('Invoicing, reconciliation, payables, and settlement governance.', 'الفوترة والمطابقة والمستحقات وحوكمة التسويات.'),
    color: '#22C55E',
  },
  {
    _id: 'faq-category-security-access',
    _type: 'faqCategory',
    name: L('Security & Access', 'الأمان والصلاحيات'),
    slug: { _type: 'slug', current: 'security-access' },
    description: L('Roles, permissions, account controls, and access governance.', 'الأدوار والصلاحيات وضوابط الحسابات وحوكمة الوصول.'),
    color: '#F59E0B',
  },
]

export const resourcesTaxonomyPack = {
  pages: [
    resourcesHubPageDoc,
    blogPageDoc,
    caseStudiesPageDoc,
    faqPageDoc,
    documentationPageDoc,
  ],
  authors: authorDocs,
  blogCategories: blogCategoryDocs,
  caseStudyCategories: caseStudyCategoryDocs,
  faqCategories: faqCategoryDocs,
}
