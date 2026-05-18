import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-10',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const L = (en: string, ar: string) => ({ en, ar })
const key = (p: string, i: number) => `${p}-${i + 1}`

const cta = (headingEn: string, headingAr: string, subEn: string, subAr: string, pEn: string, pAr: string, sEn: string, sAr: string) => ({
  heading: L(headingEn, headingAr),
  subtitle: L(subEn, subAr),
  primaryCta: { text: L(pEn, pAr), href: '/contact', openInNewTab: false },
  secondaryCta: { text: L(sEn, sAr), href: '/contact', openInNewTab: false },
  backgroundStyle: 'gradient',
})

const seo = (metaTitleEn: string, metaTitleAr: string, metaDescEn: string, metaDescAr: string, kwEnCsv: string, kwArCsv: string) => ({
  metaTitle: L(metaTitleEn, metaTitleAr),
  metaDescription: L(metaDescEn, metaDescAr),
  keywords: {
    en: kwEnCsv.split(',').map((s) => s.trim()).filter(Boolean),
    ar: kwArCsv.split(',').map((s) => s.trim()).filter(Boolean),
  },
})

async function fetchDoc<T = any>(id: string): Promise<T | null> {
  return client.fetch(`*[_id == $id || _id == $draftId][0]`, { id, draftId: `drafts.${id}` })
}

async function upsertPublished(doc: any) {
  await client.createOrReplace(doc)
  try {
    await client.delete(`drafts.${doc._id}`)
  } catch {
    // ignore
  }
}

async function upsertApps() {
  const apps = [
    {
      _id: 'app-operations-control-center',
      name: L('Operations Control Center', 'مركز التحكم التشغيلي'),
      slug: { _type: 'slug', current: 'operations-control-center' },
      tagline: L('Command daily transport execution with live operational and financial context.', 'قيادة التنفيذ اليومي للنقل بسياق تشغيلي ومالي مباشر.'),
      description: L('A web workspace for route planning, schedule control, assignment management, live trips, approvals, and supplier-linked payables tracking.', 'مساحة عمل ويب للتخطيط والتحكم في الجداول وإدارة التخصيصات والرحلات المباشرة والموافقات ومتابعة المستحقات المرتبطة بالمورّدين.'),
      category: 'operators',
      layoutType: 'landscape',
      benefits: [
        L('One control layer for planning and execution', 'طبقة تحكم موحدة للتخطيط والتنفيذ'),
        L('Faster response to service exceptions', 'استجابة أسرع لاستثناءات الخدمة'),
        L('Clear supplier and payable visibility', 'رؤية واضحة للمورّدين والمستحقات'),
        L('Approval and audit-ready workflows', 'مسارات جاهزة للموافقات والتدقيق'),
      ],
      steps: [
        { _key: key('step', 0), title: L('Set planning entities', 'إعداد كيانات التخطيط'), description: L('', '') },
        { _key: key('step', 1), title: L('Assign resources and validate', 'تخصيص الموارد والتحقق'), description: L('', '') },
        { _key: key('step', 2), title: L('Monitor live operations', 'متابعة التشغيل المباشر'), description: L('', '') },
        { _key: key('step', 3), title: L('Close financial cycles', 'إقفال الدورات المالية'), description: L('', '') },
      ],
      platforms: { web: true, ios: false, android: false },
      order: 1,
    },
    {
      _id: 'app-driver-app',
      name: L('Driver App', 'تطبيق السائق'),
      slug: { _type: 'slug', current: 'driver-app' },
      tagline: L('Execute assigned trips with clear route context and tracking continuity.', 'نفّذ الرحلات المخصصة بسياق واضح للمسار واستمرارية تتبع.'),
      description: L('Mobile app for drivers to view assigned trips, follow stop sequences, monitor tracking status, and complete trip actions.', 'تطبيق جوال للسائقين لعرض الرحلات المخصصة واتباع تسلسل التوقفات ومتابعة حالة التتبع وإتمام إجراءات الرحلة.'),
      category: 'operators',
      layoutType: 'portrait',
      benefits: [
        L('Clear assigned trip queue', 'قائمة واضحة للرحلات المخصصة'),
        L('Better execution consistency', 'اتساق أعلى في التنفيذ'),
        L('Tracking status awareness', 'وعي فوري بحالة التتبع'),
        L('Stronger operational traceability', 'تتبع تشغيلي أقوى'),
      ],
      steps: [
        { _key: key('step', 0), title: L('Login and sync trips', 'تسجيل الدخول ومزامنة الرحلات'), description: L('', '') },
        { _key: key('step', 1), title: L('Review route and stops', 'مراجعة المسار والتوقفات'), description: L('', '') },
        { _key: key('step', 2), title: L('Start and run trip', 'بدء الرحلة وتنفيذها'), description: L('', '') },
        { _key: key('step', 3), title: L('Complete and sync status', 'إنهاء الرحلة ومزامنة الحالة'), description: L('', '') },
      ],
      platforms: { web: false, ios: true, android: true },
      order: 2,
    },
    {
      _id: 'app-supervisor-app',
      name: L('Supervisor App', 'تطبيق المشرف'),
      slug: { _type: 'slug', current: 'supervisor-app' },
      tagline: L('Monitor field execution quality and escalate issues with speed.', 'راقب جودة التنفيذ الميداني وصعّد المشكلات بسرعة.'),
      description: L('Mobile operations app for supervisors to review service quality, track incidents, and support real-time interventions.', 'تطبيق جوال تشغيلي للمشرفين لمراجعة جودة الخدمة ومتابعة الحوادث ودعم التدخلات اللحظية.'),
      category: 'operators',
      layoutType: 'portrait',
      benefits: [
        L('Field-level operational visibility', 'رؤية تشغيلية على مستوى الميدان'),
        L('Faster incident handling', 'معالجة أسرع للحوادث'),
        L('Stronger service accountability', 'مساءلة أقوى لجودة الخدمة'),
      ],
      steps: [
        { _key: key('step', 0), title: L('Review active service windows', 'مراجعة نوافذ الخدمة النشطة'), description: L('', '') },
        { _key: key('step', 1), title: L('Inspect incident and status data', 'فحص بيانات الحوادث والحالة'), description: L('', '') },
        { _key: key('step', 2), title: L('Coordinate interventions', 'تنسيق التدخلات'), description: L('', '') },
        { _key: key('step', 3), title: L('Confirm resolution records', 'تأكيد سجلات المعالجة'), description: L('', '') },
      ],
      platforms: { web: false, ios: true, android: true },
      order: 3,
    },
    {
      _id: 'app-enterprise-mobility-portal',
      name: L('Enterprise Mobility Portal', 'بوابة التنقل المؤسسي'),
      slug: { _type: 'slug', current: 'enterprise-mobility-portal' },
      tagline: L('Validate transport delivery and performance with enterprise-grade clarity.', 'تحقق من تسليم الخدمة وأدائها بوضوح مؤسسي.'),
      description: L('Enterprise-facing portal to manage transport demand, review trip delivery, validate performance, and monitor invoice context.', 'بوابة موجهة للشركات لإدارة طلب النقل ومراجعة تسليم الرحلات والتحقق من الأداء ومتابعة سياق الفواتير.'),
      category: 'enterprise',
      layoutType: 'landscape',
      benefits: [
        L('Planned vs actual service validation', 'التحقق من الخدمة المخططة مقابل المنفذة'),
        L('Better procurement and operations alignment', 'مواءمة أفضل بين المشتريات والتشغيل'),
        L('Transparent performance visibility', 'شفافية في رؤية الأداء'),
        L('Finance-friendly invoice context', 'سياق فواتير ملائم للمالية'),
      ],
      steps: [
        { _key: key('step', 0), title: L('Define employee demand', 'تحديد طلب الموظفين'), description: L('', '') },
        { _key: key('step', 1), title: L('Monitor trip delivery', 'مراقبة تسليم الرحلات'), description: L('', '') },
        { _key: key('step', 2), title: L('Validate variance and KPIs', 'التحقق من الانحراف والمؤشرات'), description: L('', '') },
        { _key: key('step', 3), title: L('Review financial outcomes', 'مراجعة النتائج المالية'), description: L('', '') },
      ],
      platforms: { web: true, ios: false, android: false },
      order: 4,
    },
    {
      _id: 'app-employee-app',
      name: L('Employee App', 'تطبيق الموظف'),
      slug: { _type: 'slug', current: 'employee-app' },
      tagline: L('Give employees confidence in every commute.', 'امنح الموظف ثقة أكبر في كل رحلة تنقل.'),
      description: L('Mobile app for employees to view upcoming trips, review trip history, submit complaints, and share service feedback.', 'تطبيق جوال للموظفين لعرض الرحلات القادمة ومراجعة السجل وتقديم الشكاوى ومشاركة تقييم الخدمة.'),
      category: 'enterprise',
      layoutType: 'portrait',
      benefits: [
        L('Better trip visibility for employees', 'رؤية أفضل للرحلة لدى الموظف'),
        L('Clear service communication', 'تواصل أوضح حول الخدمة'),
        L('Structured issue reporting', 'إبلاغ منظم عن المشكلات'),
        L('Continuous feedback loop', 'حلقة تغذية راجعة مستمرة'),
      ],
      steps: [
        { _key: key('step', 0), title: L('Check upcoming trips', 'الاطلاع على الرحلات القادمة'), description: L('', '') },
        { _key: key('step', 1), title: L('Follow trip updates', 'متابعة تحديثات الرحلة'), description: L('', '') },
        { _key: key('step', 2), title: L('Review completed trips', 'مراجعة الرحلات المكتملة'), description: L('', '') },
        { _key: key('step', 3), title: L('Submit complaint/review', 'تقديم شكوى/تقييم'), description: L('', '') },
      ],
      platforms: { web: false, ios: true, android: true },
      order: 5,
    },
  ]

  for (const app of apps) {
    const existing = await fetchDoc<any>(app._id)
    const { _id, ...restApp } = app
    await upsertPublished({
      _id,
      _type: 'app',
      ...restApp,
      screenshots: existing?.screenshots || [],
      storeUrls: existing?.storeUrls || {},
      cta: existing?.cta || undefined,
      seo: existing?.seo || undefined,
    })
  }
}

async function upsertAppsPage() {
  const operatorRefs = ['app-operations-control-center', 'app-driver-app', 'app-supervisor-app']
  const enterpriseRefs = ['app-enterprise-mobility-portal', 'app-employee-app']

  const existing = await fetchDoc<any>('appsPage')
  await upsertPublished({
    _id: 'appsPage',
    _type: 'appsPage',
    title: 'Apps Page',
    seo: seo(
      'Employee Transport Apps for Operators and Enterprises | Tranzkit',
      'تطبيقات نقل الموظفين للمشغّلين والشركات | ترانزكيت',
      'Explore Tranzkit apps for operators, drivers, and enterprises with role-specific dashboards, tracking, assignment, and finance visibility.',
      'استكشف تطبيقات ترانزكيت للمشغّلين والسائقين والشركات مع لوحات مخصصة حسب الدور للتتبع والتخصيص والرؤية المالية.',
      'employee commute app, driver transport app, transport operations dashboard, enterprise transport portal, corporate mobility app',
      'تطبيق نقل الموظفين, تطبيق السائق لنقل الموظفين, لوحة تشغيل النقل, بوابة نقل الشركات, منصة تنقل مؤسسي',
    ),
    hero: {
      titlePart1: L('Intelligent', 'منظومة'),
      titlePart2: L('Transport', 'تطبيقات'),
      titlePart3: L('Applications', 'ذكية للنقل'),
      subtitle: L('Role-specific web and mobile applications connecting dispatch control, driver execution, and enterprise oversight.', 'تطبيقات ويب وجوال مخصصة للأدوار تربط التحكم التشغيلي وتنفيذ السائقين وإشراف الجهات المؤسسية.'),
    },
    showcase: {
      title: L('Purpose-Built Apps for Every Transport Stakeholder', 'تطبيقات مصممة لكل طرف في منظومة النقل'),
      subtitle: L('Select your role to see how Tranzkit supports daily transport execution and governance.', 'اختر دورك لتتعرف كيف يدعم ترانزكيت التنفيذ اليومي للنقل وحوكمة الخدمة.'),
      operatorsSegment: {
        title: L('Operators and Dispatch Teams', 'المشغّلون وفرق التشغيل'),
        description: L('Manage planning, assignments, live trips, suppliers, and financial controls from a connected operations layer.', 'أدر التخطيط والتخصيصات والرحلات المباشرة والمورّدين والضبط المالي عبر طبقة تشغيل مترابطة.'),
        tabLabel: L('Operators', 'المشغّلون'),
      },
      enterpriseSegment: {
        title: L('Enterprise Buyers and Admin Teams', 'الجهات المشترية وفرق الإدارة'),
        description: L('Define employee demand, monitor trip delivery, and validate service outcomes with visibility and accountability.', 'حدّد طلب الموظفين، وراقب تنفيذ الرحلات، وتحقق من نتائج الخدمة برؤية واضحة ومساءلة أدق.'),
        tabLabel: L('Enterprise', 'الشركات'),
      },
      operatorApps: operatorRefs.map((id, i) => ({ _key: key('opapp', i), _type: 'reference', _ref: id })),
      enterpriseApps: enterpriseRefs.map((id, i) => ({ _key: key('entapp', i), _type: 'reference', _ref: id })),
    },
    cta: cta(
      'Want the Right App Mix for Your Team?',
      'هل تريدون التشكيلة المناسبة من التطبيقات لفريقكم؟',
      'We help you configure operator and enterprise app experiences around your real transport model.',
      'نساعدكم على تهيئة تجربة تطبيقات المشغّل والجهة المؤسسية وفق نموذج النقل الفعلي لديكم.',
      'Request App Walkthrough',
      'اطلب جولة تطبيقية',
      'Contact Sales',
      'تواصل مع المبيعات',
    ),
    // preserve media-ish fields if any custom additions
    ...(existing?.hero?.backgroundImage ? { hero: { ...existing.hero, titlePart1: L('Intelligent', 'منظومة'), titlePart2: L('Transport', 'تطبيقات'), titlePart3: L('Applications', 'ذكية للنقل'), subtitle: L('Role-specific web and mobile applications connecting dispatch control, driver execution, and enterprise oversight.', 'تطبيقات ويب وجوال مخصصة للأدوار تربط التحكم التشغيلي وتنفيذ السائقين وإشراف الجهات المؤسسية.') } } : {}),
  })
}

async function upsertHomePage() {
  const existing = await fetchDoc<any>('homePage')
  const oldItems = existing?.screenshotCarousel?.items || []

  const itemsText = [
    ['Route and Schedule Control','التحكم في المسارات والجداول','Manage route structures, stop definitions, and schedule readiness from one screen.','أدر هيكل المسارات وتعريف نقاط التوقف وجاهزية الجداول من شاشة واحدة.','Planning','التخطيط'],
    ['Live Trips Command View','لوحة قيادة الرحلات المباشرة','Track active trips, delays, incidents, and operational interventions in real time.','تابع الرحلات النشطة والتأخيرات والحوادث والتدخلات التشغيلية لحظيًا.','Operations','العمليات'],
    ['Buyer Validation Workspace','مساحة تحقق الجهة المشترية','Compare planned vs actual trip delivery across projects and service days.','قارن التسليم الفعلي مقابل المخطط عبر المشاريع وأيام الخدمة.','Enterprise','الشركات'],
    ['Driver and Vehicle Assignments','تخصيص السائقين والمركبات','Deploy resources with overlap checks and pattern-based scheduling.','وزّع الموارد مع فحص التداخلات وجدولة مبنية على أنماط العمل.','Fleet Management','إدارة الأسطول'],
    ['Supplier Payables and Cycles','مستحقات المورّدين ودوراتها','Track supplier liabilities, cycle timing, and payment status transparently.','تابع التزامات المورّدين وتوقيت الدورات وحالة السداد بشفافية.','Finance','المالية'],
    ['Contract and Settlement Governance','حوكمة العقود والتسويات','Review contractual terms against realized performance and posted settlements.','راجع شروط التعاقد مقابل الأداء الفعلي والتسويات المرحلة.','Financial Control','الضبط المالي'],
  ]

  await upsertPublished({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      title: L('Move Employee Transport From Spreadsheets to Control', 'انقل إدارة نقل الموظفين من الجداول اليدوية إلى التحكم الكامل'),
      titleHighlight: L('With One Operational Platform', 'عبر منصة تشغيل موحدة'),
      subtitle: L('Plan routes, run daily operations, track live trips, and manage billing and settlement in one object-centric workspace for operators and enterprises.', 'خطط المسارات، وشغّل العمليات اليومية، وتابع الرحلات لحظيًا، وأدر الفوترة والتسويات من مساحة عمل واحدة مرتكزة على الكيانات للمشغّلين والشركات.'),
      primaryCta: { text: L('Book a Demo', 'احجز عرضًا تجريبيًا'), href: '/contact', openInNewTab: false },
      secondaryCta: { text: L('Explore Solutions', 'استكشف الحلول'), href: '/solutions', openInNewTab: false },
    },
    overview: {
      heading: L('Why Transport Teams Choose Tranzkit', 'لماذا تختار فرق النقل ترانزكيت'),
      subtitle: L('Built for fixed-route and shift-based employee transport with operational discipline, financial clarity, and buyer-operator collaboration.', 'مصمم للنقل الثابت ونقل الورديات للموظفين مع انضباط تشغيلي ووضوح مالي وتعاون فعلي بين الجهة المشترية والمشغّل.'),
      features: [
        { _key: key('ovf',0), icon: 'Route', title: L('Structured Route Planning','تخطيط مسارات منظّم'), description: L('Define routes, schedules, and stops with clear assignment rules and capacity visibility.','عرّف المسارات والجداول ونقاط التوقف مع قواعد تخصيص واضحة ورؤية مباشرة للسعة.') },
        { _key: key('ovf',1), icon: 'Activity', title: L('Live Operations Visibility','رؤية تشغيلية مباشرة'), description: L('Monitor trip execution, status changes, and incidents in real time from a unified control view.','راقب تنفيذ الرحلات وتغيرات الحالة والحوادث لحظيًا من لوحة تحكم موحدة.') },
        { _key: key('ovf',2), icon: 'Users', title: L('Buyer-Operator Collaboration','تعاون الجهة المشترية والمشغّل'), description: L('Share the right transport data with enterprise buyers while preserving role-based control.','شارك بيانات النقل المناسبة مع الجهات المشترية من الشركات مع الحفاظ على صلاحيات دقيقة حسب الدور.') },
        { _key: key('ovf',3), icon: 'Calculator', title: L('Billing and Settlement Control','ضبط الفوترة والتسويات'), description: L('Connect project billing, supplier payables, and settlement workflows to reduce disputes.','اربط فوترة المشاريع ومستحقات المورّدين ومسارات التسوية لتقليل النزاعات.') },
      ],
    },
    featureTabs: {
      heading: L('Built for Daily Transport Reality', 'مصمم لواقع تشغيل النقل اليومي'),
      subtitle: L('Core modules that handle planning, execution, compliance visibility, and finance handoff.', 'وحدات أساسية تغطي التخطيط والتنفيذ والامتثال التشغيلي والربط المالي.'),
      tabs: [
        ['Planning','التخطيط','Plan Demand, Routes, and Shift Coverage','خطط الطلب والمسارات وتغطية الورديات','Convert employee demand into structured routes and schedules with stop-level clarity.','حوّل طلب الموظفين إلى مسارات وجداول منظّمة مع وضوح على مستوى نقاط التوقف.',[
          ['Employee demand setup by location and shift','إعداد طلب الموظفين حسب الموقع والوردية'],
          ['Routes, schedules, and stop management','إدارة المسارات والجداول ونقاط التوقف'],
          ['Seat assignment for fixed transport services','تخصيص المقاعد لخدمات النقل الثابت'],
          ['Validation checks before operations launch','فحوصات تحقق قبل بدء التشغيل'],
        ]],
        ['Operations','العمليات','Run Trips with Live Control','شغّل الرحلات بتحكم مباشر','Generate trips, monitor live status, and resolve exceptions quickly.','أنشئ الرحلات، وراقب الحالة المباشرة، وتعامل سريعًا مع الاستثناءات.',[
          ['Automated and manual trip generation','إنشاء رحلات تلقائي ويدوي'],['Live trip tracking and incident reporting','تتبع الرحلات المباشر والإبلاغ عن الحوادث'],['Planned vs actual performance view','عرض مقارنة المخطط مقابل المنفذ'],['Approval workflow for critical changes','مسار موافقات للتغييرات الحرجة']
        ]],
        ['Fleet & Suppliers','الأسطول والمورّدون','Coordinate Drivers, Vehicles, and Supplier Capacity','نسّق السائقين والمركبات وسعة المورّدين','Assign resources with conflict checks and supplier-linked execution controls.','خصص الموارد مع كشف التعارضات وضوابط تنفيذ مرتبطة بالمورّدين.',[
          ['Driver and vehicle assignment rules','قواعد تخصيص السائقين والمركبات'],['Pattern-based working day management','إدارة أيام العمل بنمط تشغيلي'],['Overlap/conflict detection','كشف التداخلات والتعارضات'],['Supplier billing schedule management','إدارة جداول فوترة المورّدين']
        ]],
        ['Finance','المالية','Link Operations to Billing and Settlement','اربط التشغيل بالفوترة والتسويات','Keep receivables, payables, and settlement batches aligned with executed transport services.','حافظ على اتساق المقبوضات والمستحقات ودفعات التسوية مع خدمات النقل المنفذة.',[
          ['Project billing configuration','إعداد فوترة المشاريع'],['Receivable/payable invoice workflows','مسارات فواتير القبض والدفع'],['Supplier balance and payable tracking','متابعة أرصدة ومستحقات المورّدين'],['AP/AR aging and reconciliation views','تقارير أعمار الديون المدينة والدائنة والمطابقة']
        ]],
      ].map((t, i) => ({
        _key: key('tab', i),
        label: L(t[0] as string, t[1] as string),
        title: L(t[2] as string, t[3] as string),
        description: L(t[4] as string, t[5] as string),
        image: existing?.featureTabs?.tabs?.[i]?.image,
        features: (t[6] as string[][]).map((b, bi) => ({ _key: key(`tab${i}b`, bi), text: L(b[0], b[1]) })),
      })),
    },
    screenshotCarousel: {
      heading: L('See Tranzkit in Action','شاهد ترانزكيت أثناء العمل'),
      subtitle: L('Interfaces built for transport desks, finance teams, and enterprise stakeholders.','واجهات مصممة لمكاتب النقل وفرق المالية وأصحاب المصلحة في الشركات.'),
      items: itemsText.map((it, i) => ({
        _key: oldItems[i]?._key || key('shot', i),
        title: L(it[0], it[1]),
        description: L(it[2], it[3]),
        category: L(it[4], it[5]),
        image: oldItems[i]?.image,
      })),
    },
    logoBar: {
      heading: L('Trusted by Transport and Enterprise Teams','موثوق من فرق النقل وفرق الشركات'),
      subtitle: L('Used across multi-entity employee transportation operations.','مستخدم عبر عمليات نقل موظفين متعددة الجهات.'),
      logos: existing?.logoBar?.logos || [],
    },
    testimonials: {
      heading: L('What Teams Improve with Tranzkit','ماذا تحقق الفرق مع ترانزكيت'),
      subtitle: L('Operational and finance outcomes reported by transportation stakeholders.','نتائج تشغيلية ومالية يذكرها أصحاب المصلحة في النقل.'),
      items: [
        { _key: key('ht',0), quote: L('We replaced fragmented sheets with one operating view for routes, trips, and supplier coordination. Escalations dropped within weeks.','استبدلنا الجداول المتفرقة برؤية تشغيل واحدة للمسارات والرحلات وتنسيق المورّدين. انخفضت التصعيدات خلال أسابيع.'), author: L('Operations Manager','مدير العمليات'), role: L('Employee Transport Operator','مشغّل نقل موظفين'), company: L('Regional Logistics Group','مجموعة لوجستية إقليمية'), rating: 5 },
        { _key: key('ht',1), quote: L('The buyer validation view gave our HR and facilities teams objective visibility into planned vs delivered service.','منحنا عرض التحقق للجهة المشترية رؤية موضوعية لفرق الموارد البشرية والمرافق حول الخدمة المخططة والمنفذة.'), author: L('Head of Facilities','مدير المرافق'), role: L('Enterprise Mobility Lead','قائد تنقل الموظفين'), company: L('Industrial Enterprise','شركة صناعية'), rating: 5 },
        { _key: key('ht',2), quote: L('Supplier payables and billing cycles are now controlled and auditable. Payment disputes are faster to resolve.','أصبحت مستحقات المورّدين ودورات الفوترة أكثر انضباطًا وقابلة للتدقيق. وتسارعت معالجة نزاعات السداد.'), author: L('Finance Controller','مراقب مالي'), role: L('Transport Finance Team','فريق مالية النقل'), company: L('Corporate Mobility Provider','مزوّد تنقل مؤسسي'), rating: 5 },
        { _key: key('ht',3), quote: L('Our dispatch teams gained real-time control without losing governance over approvals and commercial impact.','حصلت فرق التشغيل لدينا على تحكم لحظي دون فقدان الحوكمة على الموافقات والأثر التجاري.'), author: L('Dispatch Director','مدير التشغيل'), role: L('Fleet Operations','عمليات الأسطول'), company: L('Managed Shuttle Services','خدمات نقل مُدارة'), rating: 5 },
      ],
    },
    cta: cta(
      'Ready to Modernize Employee Transportation?',
      'هل أنتم مستعدون لتحديث نقل الموظفين؟',
      'Talk to our team to map your routes, operations, and finance workflows into Tranzkit.',
      'تواصل مع فريقنا لتحويل مساراتكم وعملياتكم وتدفقاتكم المالية إلى نموذج تشغيل على ترانزكيت.',
      'Book Strategy Demo',
      'احجز عرضًا استراتيجيًا',
      'Talk to Solution Architect',
      'تحدث مع مهندس حلول',
    ),
    seo: seo(
      'Employee Transportation Management System | Tranzkit',
      'نظام إدارة نقل الموظفين للشركات | ترانزكيت',
      'Tranzkit is an employee transportation management system for fixed routes, shift transport, live trip visibility, supplier control, and billing workflows.',
      'ترانزكيت هو نظام إدارة نقل الموظفين للشركات يغطي المسارات الثابتة ونقل الورديات ومتابعة الرحلات وإدارة المورّدين ودورات الفوترة.',
      'employee transportation management system, corporate shuttle software, fixed route employee transport, transport operations platform, supplier settlement software',
      'نظام إدارة نقل الموظفين, برنامج إدارة حافلات الموظفين, إدارة النقل المؤسسي, تحسين مسارات نقل الموظفين, تسوية مستحقات موردي النقل',
    ),
  })
}

async function upsertSolutionsMain() {
  await upsertPublished({
    _id: 'solutionsPage',
    _type: 'solutionsPage',
    title: 'Solutions Page',
    seo: seo(
      'Employee Transport Solutions for Operators and Enterprises | Tranzkit',
      'حلول نقل الموظفين للمشغّلين والشركات | ترانزكيت',
      'Tranzkit delivers planning, execution, validation, and financial control solutions for enterprise employee transportation.',
      'يقدم ترانزكيت حلول التخطيط والتنفيذ والتحقق والضبط المالي لنقل الموظفين في الشركات.',
      'employee transport solutions, corporate shuttle operations, transport desk automation, fleet vendor management, transport billing and settlement',
      'حلول نقل الموظفين, تشغيل النقل المؤسسي, أتمتة مكتب النقل, إدارة موردي النقل, فوترة وتسويات النقل',
    ),
    hero: {
      title: {
        smart: L('Smart', 'نقل'),
        mobility: L('Transport', 'ذكي'),
        practicalResults: L('Practical Results', 'بنتائج عملية'),
      },
      subtitle: L('Solutions for fixed-route and contracted on-demand employee transportation across operator and enterprise workflows.', 'حلول للنقل الثابت والنقل التعاقدي عند الطلب للموظفين عبر تدفقات عمل المشغّل والجهة المؤسسية.'),
      cta: L('Explore Your Use Case', 'استكشف حالة الاستخدام'),
      nodes: {
        operator: L('Operator', 'المشغّل'),
        enterprise: L('Enterprise', 'الجهة المؤسسية'),
        supervisor: L('Supervisor', 'المشرف'),
        driver: L('Driver', 'السائق'),
        rider: L('Employee', 'الموظف'),
      },
    },
    intro: {
      text: L('Tranzkit helps transportation teams convert demand into executable services with operational control and financial accountability.', 'يساعد ترانزكيت فرق النقل على تحويل الطلب إلى خدمات قابلة للتنفيذ مع تحكم تشغيلي ومساءلة مالية.'),
      howWeHelp: {
        title: L('How We Help', 'كيف نساعدكم'),
        benefits: [
          L('Turn workforce demand into route-ready plans', 'تحويل طلب القوى العاملة إلى خطط مسارات جاهزة'),
          L('Run daily operations with live visibility', 'تشغيل العمليات اليومية برؤية مباشرة'),
          L('Align billing and settlement with execution', 'مواءمة الفوترة والتسويات مع التنفيذ الفعلي'),
          L('Enable buyer-operator collaboration with governance', 'تمكين تعاون الجهة المشترية والمشغّل ضمن حوكمة واضحة'),
        ],
      },
    },
    audienceCards: {
      operators: {
        headline: L('For Transport Operators', 'للمشغّلين'),
        description: L('Build a reliable transport operating model with assignment discipline, supplier controls, and trip-level visibility.', 'ابنِ نموذج تشغيل نقل موثوقًا بانضباط في التخصيصات وضوابط للمورّدين ورؤية على مستوى الرحلة.'),
        benefits: [L('Route and trip operations control', 'تحكم كامل في عمليات المسارات والرحلات'), L('Driver/vehicle/supplier orchestration', 'تنسيق السائقين والمركبات والمورّدين'), L('Payable and settlement governance', 'حوكمة المستحقات والتسويات')],
        cta: L('See Operator Solutions', 'شاهد حلول المشغّل'),
      },
      enterprises: {
        headline: L('For Enterprise Buyers', 'للجهات المشترية من الشركات'),
        description: L('Gain measurable oversight on transport service delivery, cost, and compliance outcomes.', 'احصل على إشراف قابل للقياس على تسليم الخدمة وتكاليف النقل ونتائج الالتزام.'),
        benefits: [L('Demand and employee transport control', 'التحكم في الطلب ونقل الموظفين'), L('Planned vs actual service validation', 'التحقق من الخدمة المخططة مقابل المنفذة'), L('Buyer-side invoice and performance visibility', 'رؤية فواتير الأداء من جهة المشتري')],
        cta: L('See Enterprise Solutions', 'شاهد حلول الشركات'),
      },
    },
    technology: {
      title: L('Technology Designed for Transport Operations', 'تقنية مصممة لعمليات النقل'),
      highlights: [
        { _key: key('tech',0), icon: 'Brain', text: L('Object-centric transport workflow engine', 'محرك تدفقات عمل نقل مرتكز على الكيانات') },
        { _key: key('tech',1), icon: 'Radar', text: L('Live operational status and event visibility', 'رؤية لحظية لحالة التشغيل والأحداث') },
        { _key: key('tech',2), icon: 'Shield', text: L('Approval and audit-friendly control layers', 'طبقات تحكم مناسبة للموافقات والتدقيق') },
        { _key: key('tech',3), icon: 'Wallet', text: L('Integrated billing, payables, and settlement flows', 'تكامل الفوترة والمستحقات ومسارات التسوية') },
      ],
    },
    whyTranzkit: {
      title: L('Why Tranzkit', 'لماذا ترانزكيت'),
      reasons: [
        L('Built for enterprise employee transportation realities', 'مبني على واقع تشغيل نقل الموظفين المؤسسي'),
        L('Supports fixed-route, shift-based, and contract on-demand models', 'يدعم النماذج الثابتة ونقل الورديات والنقل التعاقدي عند الطلب'),
        L('Keeps operations and finance in one control loop', 'يربط التشغيل والمالية ضمن دورة تحكم واحدة'),
        L('Enables multi-entity collaboration without losing governance', 'يتيح التعاون بين جهات متعددة دون فقدان الحوكمة'),
      ],
    },
    cta: {
      title: L('Let’s Design Your Transport Operating Model', 'دعنا نصمم نموذج تشغيل النقل لديكم'),
      subtitle: L('Share your current setup and we will map the right Tranzkit solution architecture.', 'شاركونا وضعكم الحالي وسنرسم لكم هيكل الحل المناسب على ترانزكيت.'),
    },
  })
}

async function upsertOperatorsPage() {
  const existing = await fetchDoc<any>('solutionsOperatorsDriversPage')
  const oldDash = existing?.dashboards?.screenshots || []
  await upsertPublished({
    _id: 'solutionsOperatorsDriversPage',
    _type: 'solutionsOperatorsDriversPage',
    title: 'Solutions: Operators & Drivers',
    seo: seo(
      'Fleet Operations and Driver Solutions | Tranzkit',
      'حلول تشغيل الأسطول والسائقين | ترانزكيت',
      'Optimize fleet operations with route control, trip visibility, driver app workflows, and supplier payment governance.',
      'حسّن عمليات الأسطول عبر التحكم بالمسارات ورؤية الرحلات وتدفقات تطبيق السائق وحوكمة مستحقات المورّدين.',
      'fleet operations software, driver assignment platform, trip dispatch dashboard, employee transport driver app, supplier payable schedule',
      'برنامج تشغيل الأسطول, منصة تخصيص السائقين, لوحة تشغيل الرحلات, تطبيق السائق لنقل الموظفين, جداول مستحقات المورّدين',
    ),
    hero: {
      title: L('Scale Fleet Operations with Control and Predictability', 'وسّع عمليات الأسطول بتحكم وتوقع أعلى'),
      subtitle: L('Give operations teams and drivers a connected execution model from assignment to settlement.', 'امنح فرق التشغيل والسائقين نموذج تنفيذ مترابطًا من التخصيص حتى التسوية.'),
      cta: L('Start Operator Demo', 'ابدأ عرض المشغّل'),
    },
    overview: { text: L('Tranzkit helps operators standardize route planning, driver/vehicle deployment, live trip control, and supplier-linked financial workflows.', 'يساعد ترانزكيت المشغّلين على توحيد تخطيط المسارات وتوزيع السائقين والمركبات والتحكم المباشر بالرحلات وربط ذلك بالتدفقات المالية الخاصة بالمورّدين.') },
    roleSwitcher: {
      tabs: { operator: L('Operators', 'المشغّلون'), driver: L('Drivers', 'السائقون') },
      operator: {
        title: L('Control the Full Operations Layer', 'تحكم في طبقة التشغيل بالكامل'),
        description: L('Plan, assign, monitor, and govern transport execution with fewer blind spots.', 'خطط وخصّص وراقب واحكم تنفيذ النقل مع تقليل النقاط غير المرئية.'),
        features: [
          { _key: key('rof',0), title: L('Unified Planning Workspace','مساحة تخطيط موحدة'), description: L('Manage employees, routes, schedules, and stops in one planning model.','أدر الموظفين والمسارات والجداول ونقاط التوقف ضمن نموذج تخطيط موحد.') },
          { _key: key('rof',1), title: L('Assignment Discipline','انضباط التخصيصات'), description: L('Apply driver and vehicle assignments with overlap checks and date controls.','طبّق تخصيصات السائقين والمركبات مع فحوصات التعارض والتحكم الزمني.') },
          { _key: key('rof',2), title: L('Live Trip Command','قيادة الرحلات المباشرة'), description: L('Track status updates, incidents, and intervention points during service windows.','تابع تغيّر الحالة والحوادث ونقاط التدخل أثناء نوافذ الخدمة.') },
          { _key: key('rof',3), title: L('Commercial Governance','حوكمة تجارية'), description: L('Route approvals, price changes, and supplier payables through controlled workflows.','مرّر الموافقات وتغييرات الأسعار ومستحقات المورّدين عبر مسارات مضبوطة.') },
        ],
      },
      driver: {
        title: L('Equip Drivers for Reliable Service Execution', 'مكّن السائقين لتنفيذ خدمة موثوق'),
        description: L('Give drivers clear trip context, route stops, and tracking continuity from one app.', 'امنح السائقين سياق رحلة واضحًا ونقاط مسار محددة واستمرارية تتبع عبر تطبيق واحد.'),
        features: [
          { _key: key('rdf',0), title: L('Daily Trip Queue','قائمة رحلات يومية'), description: L('Drivers view assigned trips with schedule, route, and stop details.','يرى السائق الرحلات المخصصة مع تفاصيل الجدول والمسار ونقاط التوقف.') },
          { _key: key('rdf',1), title: L('Tracking Status Feedback','حالة التتبع المباشرة'), description: L('App signals tracking state including active, offline, and GPS-disabled modes.','يعرض التطبيق حالة التتبع مثل نشط أو دون اتصال أو تعطيل GPS.') },
          { _key: key('rdf',2), title: L('Trip Start/End Controls','ضوابط بدء/إنهاء الرحلة'), description: L('Controlled start and completion actions improve execution traceability.','إجراءات بدء وإنهاء مضبوطة تعزز قابلية تتبع التنفيذ.') },
          { _key: key('rdf',3), title: L('Stop-Level Navigation','تنقل على مستوى التوقف'), description: L('Follow destination and intermediate stops with clearer execution guidance.','اتبع الوجهة ونقاط التوقف الوسيطة بإرشاد أوضح للتنفيذ.') },
        ],
      },
    },
    timeline: {
      title: L('24/7 Operations Rhythm', 'إيقاع تشغيل على مدار الساعة'),
      subtitle: L('Typical control points transport teams monitor during daily service cycles.', 'نقاط التحكم النموذجية التي تتابعها فرق النقل خلال دورة الخدمة اليومية.'),
      items: [
        { _key: key('time',0), time: '05:30', title: L('Shift Readiness Check','فحص جاهزية الورديات'), description: L('Validate assignments, vehicle availability, and route launch readiness.','التحقق من التخصيصات وجاهزية المركبات واستعداد إطلاق المسارات.'), icon: 'CheckCircle2' },
        { _key: key('time',1), time: '07:00', title: L('Morning Dispatch Window','نافذة تشغيل الصباح'), description: L('Monitor departures, delays, and first-mile execution exceptions.','متابعة الانطلاقات والتأخيرات واستثناءات التنفيذ الأولى.'), icon: 'CheckCircle2' },
        { _key: key('time',2), time: '12:00', title: L('Midday Performance Review','مراجعة أداء منتصف اليوم'), description: L('Track service adherence, occupancy trends, and incident flags.','متابعة الالتزام بالخدمة واتجاهات الإشغال ومؤشرات الحوادث.'), icon: 'CheckCircle2' },
        { _key: key('time',3), time: '17:00', title: L('Return Shift Control','تحكم وردية العودة'), description: L('Coordinate return trips, updates, and allocation changes.','تنسيق رحلات العودة والتحديثات وتغييرات التوزيع.'), icon: 'CheckCircle2' },
        { _key: key('time',4), time: '21:00', title: L('Financial and Exception Wrap-Up','إغلاق مالي وتشغيلي'), description: L('Prepare payable inputs, approval requests, and end-of-day records.','تجهيز مدخلات المستحقات وطلبات الموافقة وسجلات نهاية اليوم.'), icon: 'CheckCircle2' },
      ],
    },
    dashboards: {
      title: L('Operator Dashboards That Drive Action','لوحات تشغيلية تدفع لاتخاذ القرار'),
      subtitle: L('Prioritize execution, compliance, and financial follow-up from one control layer.','أعطِ الأولوية للتنفيذ والامتثال والمتابعة المالية من طبقة تحكم واحدة.'),
      screenshots: [
        ['Live Trips Monitor','مراقبة الرحلات المباشرة','Real-time status and incident view for active service windows.','عرض لحظي للحالة والحوادث خلال نوافذ الخدمة النشطة.'],
        ['Schedule Calendar','تقويم الجداول','Planned vs actual service view by day, route, and supplier.','عرض المخطط مقابل المنفذ حسب اليوم والمسار والمورّد.'],
        ['Assignment Control Board','لوحة التحكم بالتخصيصات','Driver and vehicle deployment with overlap visibility.','توزيع السائقين والمركبات مع رؤية للتداخلات.'],
        ['Supplier Payables View','عرض مستحقات المورّدين','Supplier-level liabilities, cycle status, and payment planning.','التزامات المورّدين وحالة الدورات وتخطيط السداد.'],
        ['Approval Requests Center','مركز طلبات الموافقات','Handle backup assignments and price change requests with audit context.','إدارة تخصيصات البديل وطلبات تغيير الأسعار مع سياق تدقيقي.'],
        ['Settlement Batch Workflow','سير عمل دفعات التسوية','Validate, approve, and post settlement batches with financial checks.','التحقق والموافقة وترحيل دفعات التسوية مع فحوصات مالية.'],
      ].map((x, i) => ({ _key: oldDash[i]?._key || key('dash', i), title: L(x[0], x[1]), description: L(x[2], x[3]), image: oldDash[i]?.image })),
    },
    mobileApps: {
      title: L('Driver App Features','مزايا تطبيق السائق'),
      subtitle: L('Practical mobile workflows that support reliable shift execution.','تدفقات جوال عملية تدعم تنفيذًا موثوقًا للورديات.'),
      features: [
        { _key: key('maf',0), title: L('Assigned Trip Overview','عرض الرحلات المخصصة'), description: L('One view for trip details, route context, and stop sequence.','عرض موحد لتفاصيل الرحلة وسياق المسار وتسلسل التوقف.'), badge: L('Core','أساسي') },
        { _key: key('maf',1), title: L('Tracking and Connectivity Status','حالة التتبع والاتصال'), description: L('Driver sees clear state for GPS, internet, and tracking continuity.','يرى السائق حالة واضحة للـGPS والاتصال واستمرارية التتبع.'), badge: L('Reliability','موثوقية') },
        { _key: key('maf',2), title: L('Start/End Trip Actions','إجراءات بدء/إنهاء الرحلة'), description: L('Controlled execution actions with confirmation and audit trail support.','إجراءات تنفيذ مضبوطة مع تأكيد ودعم للأثر التدقيقي.'), badge: L('Control','ضبط') },
        { _key: key('maf',3), title: L('Stop-Level Guidance','إرشاد على مستوى التوقف'), description: L('Better navigation context for destination and intermediate stops.','سياق تنقل أفضل للوجهة ونقاط التوقف الوسيطة.'), badge: L('Navigation','ملاحة') },
      ],
    },
    features: {
      overview: L('Beyond visibility, operators need controlled execution and financial closure.', 'بجانب الرؤية، يحتاج المشغّل إلى تنفيذ مضبوط وإقفال مالي دقيق.'),
      title: L('Operator Performance Framework','إطار أداء المشغّل'),
      items: [
        { _key: key('opf',0), title: L('Execution Control','ضبط التنفيذ'), description: L('Keep service delivery aligned with planned operational design.','حافظ على توافق تسليم الخدمة مع التصميم التشغيلي المخطط.'), points: [L('Schedule-driven trip generation','توليد رحلات مبني على الجداول'),L('Live status and exception handling','حالة مباشرة ومعالجة الاستثناءات'),L('Shift-focused service continuity','استمرارية خدمة متمركزة حول الورديات')] },
        { _key: key('opf',1), title: L('Resource Governance','حوكمة الموارد'), description: L('Deploy drivers and vehicles with lower conflict risk.','وزّع السائقين والمركبات مع مخاطر أقل للتعارض.'), points: [L('Pattern-based assignment logic','منطق تخصيص قائم على الأنماط'),L('Date range and overlap checks','فحوصات نطاق التاريخ والتداخل'),L('Supplier-linked deployment','توزيع مرتبط بالمورّد')] },
        { _key: key('opf',2), title: L('Financial Accountability','المساءلة المالية'), description: L('Connect operating activities to payable and settlement decisions.','اربط الأنشطة التشغيلية بقرارات المستحقات والتسوية.'), points: [L('Supplier billing schedule controls','ضوابط جداول فوترة المورّدين'),L('Payable status transparency','شفافية حالة المستحقات'),L('Settlement lifecycle tracking','متابعة دورة حياة التسوية')] },
        { _key: key('opf',3), title: L('Governance and Audit','الحوكمة والتدقيق'), description: L('Approvals and audit trails reduce operational and commercial ambiguity.','الموافقات وآثار التدقيق تقلل الغموض التشغيلي والتجاري.'), points: [L('Approval workflow coverage','تغطية مسارات الموافقة'),L('Context-rich decision records','سجلات قرار غنية بالسياق'),L('Better cross-team accountability','مساءلة أفضل بين الفرق')] },
      ],
    },
    aiImpact: {
      title: L('AI-Enabled Operational Intelligence','ذكاء تشغيلي مدعوم بالذكاء الاصطناعي'),
      subtitle: L('Use historical patterns and operational context to improve resource decisions and reduce avoidable waste.','استفد من الأنماط التاريخية والسياق التشغيلي لتحسين قرارات الموارد وتقليل الهدر القابل للتجنب.'),
      impactTitle: L('Expected Operational Impact','الأثر التشغيلي المتوقع'),
      metrics: [
        { _key: key('aim',0), value: L('20-35%','٢٠-٣٥٪'), label: L('Faster Dispatch Decisions','قرارات تشغيل أسرع'), description: L('Better context and structured workflows reduce dispatch delays.','السياق الأفضل والتدفقات المنظمة يقللان تأخر قرارات التشغيل.') },
        { _key: key('aim',1), value: L('10-25%','١٠-٢٥٪'), label: L('Lower Assignment Conflicts','تعارضات أقل في التخصيصات'), description: L('Conflict checks reduce operational rework before service launch.','فحوصات التعارض تقلل إعادة العمل قبل بدء الخدمة.') },
        { _key: key('aim',2), value: L('15-30%','١٥-٣٠٪'), label: L('Better Supplier Payment Clarity','وضوح أعلى في سداد المورّدين'), description: L('Structured payable cycles improve payment planning visibility.','دورات المستحقات المنظمة تحسن وضوح تخطيط السداد.') },
        { _key: key('aim',3), value: L('25-40%','٢٥-٤٠٪'), label: L('Stronger Exception Response','استجابة أقوى للاستثناءات'), description: L('Live monitoring improves response speed for service disruptions.','المتابعة المباشرة تحسن سرعة الاستجابة لتعطل الخدمة.') },
      ],
    },
    faq: {
      title: L('Frequently Asked Questions','الأسئلة الشائعة'),
      subtitle: L('Common operator and driver questions answered clearly.','إجابات واضحة لأسئلة المشغّلين والسائقين المتكررة.'),
      items: [
        ['Does Tranzkit support fixed routes and shift-based operations?','هل يدعم ترانزكيت المسارات الثابتة وتشغيل الورديات؟','Yes. Tranzkit is built for fixed-route employee transport, shift coverage, and contract on-demand operations.','نعم. ترانزكيت مبني للنقل الثابت للموظفين وتغطية الورديات والتشغيل التعاقدي عند الطلب.'],
        ['Can we manage driver and vehicle assignments with conflict checks?','هل يمكن إدارة تخصيص السائقين والمركبات مع فحص التعارضات؟','Yes. Assignment workflows include overlap checks, date controls, and schedule-linked deployment logic.','نعم. تتضمن مسارات التخصيص فحص التداخل والتحكم الزمني ومنطق توزيع مرتبط بالجدول.'],
        ['Is live trip monitoring included?','هل تتضمن المنصة متابعة الرحلات المباشرة؟','Yes. Operations teams can monitor active trips, status changes, and incidents from live dashboards.','نعم. يمكن لفرق التشغيل متابعة الرحلات النشطة وتغيرات الحالة والحوادث من لوحات مباشرة.'],
        ['How are supplier payables handled?','كيف تُدار مستحقات المورّدين؟','Through supplier billing schedules, payable tracking, and settlement workflows with controlled approvals.','عبر جداول فوترة المورّدين وتتبع المستحقات ومسارات تسوية بموافقات مضبوطة.'],
        ['Does the driver app support daily execution workflows?','هل يدعم تطبيق السائق تدفقات التنفيذ اليومية؟','Yes. Drivers can access assigned trips, stop details, tracking status, and controlled trip actions.','نعم. يمكن للسائق الوصول للرحلات المخصصة وتفاصيل التوقف وحالة التتبع وإجراءات الرحلة المضبوطة.'],
        ['Is Tranzkit a public ride-hailing platform?','هل ترانزكيت منصة نقل عام شبيهة بتطبيقات طلب السيارات؟','No. Tranzkit is focused on enterprise employee transportation and contracted service operations.','لا. ترانزكيت مخصص لنقل موظفي الشركات وعمليات الخدمة التعاقدية.'],
      ].map((f, i) => ({ _key: key('faq', i), question: L(f[0], f[1]), answer: L(f[2], f[3]) })),
    },
    cta: cta(
      'Build a Stronger Transport Operations Engine','ابنوا محرك تشغيل نقل أقوى',
      'Let’s map your current operational model and deploy the right control architecture.','دعونا نرسم نموذجكم التشغيلي الحالي وننشر هيكل التحكم المناسب.',
      'Book Operator Workshop','احجز ورشة للمشغّل',
      'Speak with Product Specialist','تحدث مع مختص المنتج'
    ),
  })
}

async function upsertEnterprisesPage() {
  const existing = await fetchDoc<any>('solutionsEnterprisesPassengersPage')
  const oldScreens = existing?.appScreens?.screenshots || []
  await upsertPublished({
    _id: 'solutionsEnterprisesPassengersPage',
    _type: 'solutionsEnterprisesPassengersPage',
    title: 'Solutions: Enterprises & Passengers',
    seo: seo(
      'Enterprise Employee Transport and Passenger Experience | Tranzkit',
      'حلول الجهة المؤسسية وتجربة الموظف الراكب | ترانزكيت',
      'Manage employee transport demand, validate service delivery, and improve passenger experience with enterprise-grade visibility.',
      'أدر طلب نقل الموظفين وتحقق من تسليم الخدمة وطور تجربة الراكب برؤية مؤسسية متقدمة.',
      'enterprise transport portal, employee commute management, planned vs actual transport validation, employee trip tracking, corporate passenger app',
      'بوابة نقل مؤسسية, إدارة تنقل الموظفين, التحقق من المخطط مقابل المنفذ, تتبع رحلات الموظفين, تطبيق ركاب الشركات',
    ),
    hero: {
      title: L('Give Enterprises and Employees a Better Transport Experience','امنحوا الشركات والموظفين تجربة نقل أفضل'),
      subtitle: L('Connect demand planning, service validation, and rider experience in one enterprise-ready platform.','اربطوا تخطيط الطلب والتحقق من الخدمة وتجربة الراكب في منصة واحدة جاهزة للشركات.'),
      cta: L('Start Enterprise Demo','ابدأ عرض الشركات'),
    },
    audienceSwitcher: {
      tabs: { enterprise: L('Enterprise','الجهة المؤسسية'), passenger: L('Passenger','الراكب') },
      enterprise: {
        title: L('Visibility and Control for Enterprise Mobility Teams','رؤية وتحكم لفرق تنقل الموظفين'),
        description: L('Track transport performance, validate outcomes, and align stakeholders around service quality.','تابع أداء النقل، وتحقق من النتائج، ووحّد أصحاب المصلحة حول جودة الخدمة.'),
        features: [
          { _key: key('ef',0), title: L('Demand Definition','تعريف الطلب'), description: L('Configure employee transport needs by location, shift, and eligibility.','اضبط احتياجات نقل الموظفين حسب الموقع والوردية والأهلية.') },
          { _key: key('ef',1), title: L('Service Validation','التحقق من الخدمة'), description: L('Compare planned and actual trip execution by project and period.','قارن تنفيذ الرحلات المخطط مقابل الفعلي حسب المشروع والفترة.') },
          { _key: key('ef',2), title: L('Financial Visibility','رؤية مالية'), description: L('Review invoice and payable perspectives with clearer accountability.','راجع منظور الفواتير والمستحقات بمساءلة أوضح.') },
          { _key: key('ef',3), title: L('Controlled Collaboration','تعاون مضبوط'), description: L('Work with operators through role-based, tenant-aware access patterns.','تعاون مع المشغّلين عبر صلاحيات دقيقة ونمط وصول واعٍ ببنية الجهات.') },
        ],
      },
      passenger: {
        title: L('Reliable Daily Commute for Employees','رحلة يومية موثوقة للموظفين'),
        description: L('Keep passengers informed with trip context, status updates, and feedback channels.','حافظ على اطلاع الموظف بسياق الرحلة وتحديثات الحالة وقنوات الملاحظات.'),
        features: [
          { _key: key('pf',0), title: L('Upcoming Trips View','عرض الرحلات القادمة'), description: L('Employees can see upcoming services with timing and route context.','يمكن للموظف رؤية الرحلات القادمة مع التوقيت وسياق المسار.') },
          { _key: key('pf',1), title: L('Trip History Access','الوصول لسجل الرحلات'), description: L('Review completed trips with searchable and filterable history.','راجع الرحلات المكتملة عبر سجل قابل للبحث والتصفية.') },
          { _key: key('pf',2), title: L('Complaint Submission','تقديم الشكاوى'), description: L('Capture service issues with structured incident forms.','توثيق مشكلات الخدمة عبر نماذج حوادث منظمة.') },
          { _key: key('pf',3), title: L('Service Reviews','تقييم الخدمة'), description: L('Collect rider feedback on driver and vehicle experience.','جمع تقييمات الراكب لتجربة السائق والمركبة.') },
        ],
      },
    },
    overview: { text: L('Enterprise employee transportation succeeds when demand, execution, and validation stay connected. Tranzkit keeps all three aligned.', 'ينجح نقل موظفي الشركات عندما يبقى الطلب والتنفيذ والتحقق مترابطين. ترانزكيت يحافظ على اتساق هذه العناصر الثلاثة.') },
    featureShowcase: {
      title: L('Enterprise Mobility Capabilities in One Platform','قدرات تنقل الموظفين في منصة واحدة'),
      subtitle: L('A practical capabilities stack for transport governance and employee experience.','حزمة قدرات عملية لحوكمة النقل وتجربة الموظف.'),
      features: [
        { _key: key('fs',0), title: L('Buyer Portal Visibility','رؤية عبر بوابة المشتري'), description: L('View projects, trips, and invoices in buyer-relevant context.','عرض المشاريع والرحلات والفواتير بسياق مناسب للجهة المشترية.') },
        { _key: key('fs',1), title: L('Planned vs Actual Analytics','تحليلات المخطط مقابل المنفذ'), description: L('Measure delivery reliability with variance-focused service metrics.','قياس موثوقية التسليم عبر مؤشرات انحراف الخدمة.') },
        { _key: key('fs',2), title: L('Tier-Based Collaboration Controls','ضوابط تعاون حسب الباقة'), description: L('Enable growth while controlling project and invitation capabilities.','دعم التوسع مع ضبط صلاحيات المشاريع والدعوات.') },
        { _key: key('fs',3), title: L('Employee Demand Management','إدارة طلب الموظفين'), description: L('Maintain transport eligibility and shift requirements in one system.','الحفاظ على أهلية النقل ومتطلبات الورديات ضمن نظام واحد.') },
        { _key: key('fs',4), title: L('Service Transparency','شفافية الخدمة'), description: L('Improve stakeholder trust with clear trip and status visibility.','تعزيز الثقة بين أصحاب المصلحة عبر وضوح الرحلات والحالات.') },
        { _key: key('fs',5), title: L('Finance-Linked Operations','تشغيل مرتبط بالمالية'), description: L('Align transport delivery records with buyer and operator finance views.','مواءمة سجلات التسليم التشغيلي مع رؤى المالية للمشتري والمشغّل.') },
      ],
    },
    workflow: {
      passenger: {
        title: L('Passenger Workflow','مسار الراكب'),
        subtitle: L('From visibility to feedback in everyday commute operations.','من الرؤية إلى الملاحظات ضمن تشغيل التنقل اليومي.'),
        steps: [
          { _key: key('pw',0), title: L('View Upcoming Trips','عرض الرحلات القادمة'), description: L('Check trip timing, route, and assignment context.','التحقق من توقيت الرحلة والمسار وسياق التخصيص.') },
          { _key: key('pw',1), title: L('Follow Trip Status','متابعة حالة الرحلة'), description: L('Stay informed through real-time service updates.','البقاء على اطلاع عبر تحديثات الخدمة المباشرة.') },
          { _key: key('pw',2), title: L('Review History','مراجعة السجل'), description: L('Access completed trip history for reference.','الوصول إلى سجل الرحلات المكتملة للرجوع إليه.') },
          { _key: key('pw',3), title: L('Submit Feedback','إرسال الملاحظات'), description: L('Report issues or review service quality.','الإبلاغ عن المشكلات أو تقييم جودة الخدمة.') },
        ],
      },
      enterprise: {
        title: L('Enterprise Workflow','المسار المؤسسي'),
        subtitle: L('From demand planning to accountability and improvement.','من تخطيط الطلب إلى المساءلة والتحسين.'),
        steps: [
          { _key: key('ew',0), title: L('Define Demand','تعريف الطلب'), description: L('Set employee transport requirements by teams and shifts.','تحديد متطلبات النقل حسب الفرق والورديات.') },
          { _key: key('ew',1), title: L('Coordinate Service Scope','تنسيق نطاق الخدمة'), description: L('Align scope with operator service model.','مواءمة نطاق الخدمة مع نموذج المشغّل.') },
          { _key: key('ew',2), title: L('Monitor Delivery','متابعة التسليم'), description: L('Track trip execution and exception patterns.','متابعة تنفيذ الرحلات وأنماط الاستثناءات.') },
          { _key: key('ew',3), title: L('Validate Planned vs Actual','التحقق من المخطط مقابل المنفذ'), description: L('Review variance and service reliability KPIs.','مراجعة الانحرافات ومؤشرات موثوقية الخدمة.') },
          { _key: key('ew',4), title: L('Improve and Govern','التحسين والحوكمة'), description: L('Apply operational and commercial improvements with evidence.','تطبيق تحسينات تشغيلية وتجارية مبنية على الأدلة.') },
        ],
      },
    },
    appScreens: {
      title: L('Employee and Enterprise App Experiences','تجارب تطبيق الموظف والجهة المؤسسية'),
      subtitle: L('Interfaces that reduce uncertainty and improve service confidence.','واجهات تقلل الغموض وتعزز الثقة في الخدمة.'),
      screenshots: [
        ['Upcoming Trips Panel','لوحة الرحلات القادمة','Employees quickly see today’s and upcoming commute services.','يرى الموظفون بسرعة خدمات التنقل الحالية والقادمة.'],
        ['Trip History Filters','فلاتر سجل الرحلات','Search and filter completed trips by key attributes.','البحث وتصفية الرحلات المكتملة حسب أهم المعايير.'],
        ['Complaint Form','نموذج الشكوى','Structured incident capture for transport service issues.','توثيق منظم لحوادث ومشكلات خدمة النقل.'],
        ['Service Review Screen','شاشة تقييم الخدمة','Collect passenger sentiment on driver and vehicle quality.','جمع انطباعات الركاب عن جودة السائق والمركبة.'],
        ['Buyer Trips Dashboard','لوحة رحلات الجهة المشترية','Enterprise-side visibility into trips and status progress.','رؤية من جهة الشركة لحركة الرحلات وتقدم الحالات.'],
        ['Validation Performance View','عرض أداء التحقق','Planned vs actual metrics by project and service period.','مؤشرات المخطط مقابل المنفذ حسب المشروع وفترة الخدمة.'],
      ].map((s, i) => ({ _key: oldScreens[i]?._key || key('as', i), title: L(s[0], s[1]), description: L(s[2], s[3]), image: oldScreens[i]?.image })),
    },
    features: {
      overview: L('Enterprises need measurable control and employees need commute confidence.', 'تحتاج الشركات إلى تحكم قابل للقياس ويحتاج الموظفون إلى ثقة في رحلة التنقل.'),
      title: L('Enterprise and Passenger Value Framework', 'إطار قيمة الجهة المؤسسية والراكب'),
      items: [
        { _key: key('epf',0), title: L('Demand Governance','حوكمة الطلب'), description: L('Build a cleaner demand baseline before operations start.','بناء أساس طلب أوضح قبل انطلاق التشغيل.'), points: [L('Shift and eligibility management','إدارة الورديات والأهلية'),L('Better planning inputs','مدخلات تخطيط أفضل'),L('Reduced manual coordination','تنسيق يدوي أقل')] },
        { _key: key('epf',1), title: L('Service Transparency','شفافية الخدمة'), description: L('Give enterprise teams objective visibility into delivery quality.','منح فرق الشركة رؤية موضوعية حول جودة التسليم.'), points: [L('Live trip status context','سياق لحظي لحالة الرحلة'),L('Planned vs actual evidence','أدلة المخطط مقابل المنفذ'),L('Exception trend visibility','رؤية اتجاهات الاستثناءات')] },
        { _key: key('epf',2), title: L('Passenger Confidence','ثقة الراكب'), description: L('Improve employee communication and feedback loops.','تحسين التواصل مع الموظف ومسارات الملاحظات.'), points: [L('Clear trip visibility','وضوح الرحلة'),L('Structured complaints','شكاوى منظمة'),L('Service review mechanisms','آليات تقييم الخدمة')] },
        { _key: key('epf',3), title: L('Buyer-Operator Alignment','مواءمة المشتري والمشغّل'), description: L('Align stakeholders around shared service and financial facts.','مواءمة الأطراف حول حقائق تشغيلية ومالية مشتركة.'), points: [L('Shared KPI language','لغة موحدة للمؤشرات'),L('Better invoice context','سياق أفضل للفواتير'),L('Stronger accountability loop','دورة مساءلة أقوى')] },
      ],
    },
    testimonials: {
      title: L('Enterprise and Passenger Outcomes','نتائج الشركات وتجربة الركاب'),
      subtitle: L('Transport impact expressed by enterprise stakeholders.','أثر النقل كما يعبّر عنه أصحاب المصلحة في الشركات.'),
      items: [
        { _key: key('t',0), name: 'Mona A.', role: L('HR Operations Lead','قائدة عمليات الموارد البشرية'), company: 'Regional Services Enterprise', content: L('Our teams now have one trusted view of transport performance. It improved service discussions with operators immediately.','أصبحت لدى فرقنا رؤية موثوقة واحدة لأداء النقل، وهذا حسّن مناقشات الخدمة مع المشغّلين مباشرة.'), initials: 'MA', rating: 5 },
        { _key: key('t',1), name: 'Ahmed R.', role: L('Facilities Director','مدير المرافق'), company: 'Industrial Group', content: L('Planned vs actual validation changed how we manage transport accountability across sites and shifts.','غيّر التحقق من المخطط مقابل المنفذ طريقة إدارتنا لمساءلة النقل عبر المواقع والورديات.'), initials: 'AR', rating: 5 },
        { _key: key('t',2), name: 'Sarah M.', role: L('Employee Experience Manager','مديرة تجربة الموظف'), company: 'Enterprise Shared Services', content: L('Employee visibility and feedback channels reduced daily transport uncertainty for our workforce.','قنوات الرؤية والتغذية الراجعة للموظفين قللت عدم اليقين اليومي في التنقل لدى فرقنا.'), initials: 'SM', rating: 5 },
      ],
    },
    aiImpact: {
      title: L('AI-Driven Visibility and Service Optimization','رؤية وتحسين خدمة مدعومان بالذكاء الاصطناعي'),
      subtitle: L('Transform operational data into insights that help enterprises and operators improve transport reliability.','حوّل البيانات التشغيلية إلى رؤى تساعد الشركات والمشغّلين على رفع موثوقية النقل.'),
      impactTitle: L('Expected Business Impact','الأثر التجاري المتوقع'),
      metrics: [
        { _key: key('m',0), value: L('15-30%','١٥-٣٠٪'), label: L('Better Service Adherence','التزام أعلى بالخدمة'), description: L('Stronger planned-vs-actual control improves consistency.','ضبط أقوى للمخطط مقابل المنفذ يرفع الاتساق.') },
        { _key: key('m',1), value: L('20-35%','٢٠-٣٥٪'), label: L('Faster Issue Resolution','حل أسرع للمشكلات'), description: L('Better visibility shortens response cycles for exceptions.','الرؤية الأفضل تقلل زمن الاستجابة للاستثناءات.') },
        { _key: key('m',2), value: L('10-25%','١٠-٢٥٪'), label: L('Improved Stakeholder Alignment','مواءمة أفضل للأطراف'), description: L('Shared operational metrics improve cross-team decisions.','مؤشرات تشغيل مشتركة تحسن القرارات بين الفرق.') },
        { _key: key('m',3), value: L('12-28%','١٢-٢٨٪'), label: L('Higher Employee Commute Confidence','ثقة أعلى في تنقل الموظفين'), description: L('Better rider communication reduces daily uncertainty.','تواصل أفضل مع الراكب يقلل عدم اليقين اليومي.') },
      ],
    },
    cta: cta(
      'Design a Better Employee Commute Program','صمموا برنامج تنقل موظفين أفضل',
      'We’ll help you align demand planning, service quality, and accountability in one enterprise-ready setup.','سنساعدكم على مواءمة تخطيط الطلب وجودة الخدمة والمساءلة في إعداد مؤسسي واحد.',
      'Book Enterprise Workshop','احجز ورشة للشركات',
      'Talk to Mobility Expert','تحدث مع خبير تنقل'
    ),
  })
}

async function verify() {
  const res = await client.fetch(`{
    "home": *[_id == "homePage"][0]{hero, overview, featureTabs, screenshotCarousel, cta, seo},
    "appsPage": *[_id == "appsPage"][0]{hero, showcase, cta, seo},
    "solutions": *[_id == "solutionsPage"][0]{hero, intro, audienceCards, technology, whyTranzkit, cta, seo},
    "operators": *[_id == "solutionsOperatorsDriversPage"][0]{hero, roleSwitcher, timeline, dashboards, mobileApps, features, aiImpact, faq, cta, seo},
    "enterprises": *[_id == "solutionsEnterprisesPassengersPage"][0]{hero, audienceSwitcher, featureShowcase, workflow, appScreens, features, testimonials, aiImpact, cta, seo},
    "apps": *[_type == "app" && _id in ["app-operations-control-center","app-driver-app","app-supervisor-app","app-enterprise-mobility-portal","app-employee-app"]] | order(order asc){_id, name, slug, category, layoutType, benefits, steps}
  }`)

  console.log('Updated docs summary:')
  console.log(JSON.stringify({
    home: !!res.home,
    appsPage: !!res.appsPage,
    solutions: !!res.solutions,
    operators: !!res.operators,
    enterprises: !!res.enterprises,
    appsCount: res.apps?.length || 0,
    operatorAppsRefs: res.appsPage?.showcase?.operatorApps?.length,
    enterpriseAppsRefs: res.appsPage?.showcase?.enterpriseApps?.length,
  }, null, 2))
}

async function main() {
  console.log('Starting Tranzkit content pack import...')
  await upsertApps()
  await upsertAppsPage()
  await upsertHomePage()
  await upsertSolutionsMain()
  await upsertOperatorsPage()
  await upsertEnterprisesPage()
  await verify()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
