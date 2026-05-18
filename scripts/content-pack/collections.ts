export type LocalizedString = { en: string; ar: string }
export type LocalizedText = { en: string; ar: string }

export type PortableTextSpan = {
  _key: string
  _type: 'span'
  text: string
  marks: string[]
}

export type PortableTextBlock = {
  _key: string
  _type: 'block'
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote'
  markDefs: Array<{ _key: string; _type: 'link'; href: string }>
  children: PortableTextSpan[]
  listItem?: 'bullet' | 'number'
  level?: number
}

export type LocalizedRichText = {
  en: PortableTextBlock[]
  ar: PortableTextBlock[]
}

export type SeedSEO = {
  metaTitle: LocalizedString
  metaDescription: LocalizedText
  keywords: {
    en: string[]
    ar: string[]
  }
  noIndex: boolean
  noFollow: boolean
}

export type BlogPostSeed = {
  _id: string
  _type: 'blogPost'
  title: LocalizedString
  slug: { _type: 'slug'; current: string }
  excerpt: LocalizedText
  content: LocalizedRichText
  authorSlug: string
  categorySlugs: string[]
  tags: string[]
  publishedAt: string
  updatedAt: string
  readingTime: number
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  seo: SeedSEO
}

export type CaseStudyMetric = {
  _key: string
  value: LocalizedString
  label: LocalizedString
  icon?: string
}

export type CaseStudySeed = {
  _id: string
  _type: 'caseStudy'
  title: LocalizedString
  slug: { _type: 'slug'; current: string }
  excerpt: LocalizedText
  clientName: LocalizedString
  industry: LocalizedString
  location: LocalizedString
  challenge: LocalizedRichText
  solution: LocalizedRichText
  results: LocalizedRichText
  metrics: CaseStudyMetric[]
  testimonial: {
    quote: LocalizedText
    author: LocalizedString
    role: LocalizedString
  }
  categorySlugs: string[]
  publishedAt: string
  featured: boolean
  seo: SeedSEO
}

export type FAQItemSeed = {
  _id: string
  _type: 'faqItem'
  question: LocalizedString
  answer: LocalizedRichText
  categorySlug: string
  tags: string[]
  order: number
  isActive: boolean
}

const L = (en: string, ar: string): LocalizedString => ({ en, ar })
const T = (en: string, ar: string): LocalizedText => ({ en, ar })

let keyCounter = 0
const k = (prefix: string) => `${prefix}-${++keyCounter}`

const block = (
  en: string,
  ar: string,
  opts?: { style?: PortableTextBlock['style']; listItem?: 'bullet' | 'number'; level?: number },
): { en: PortableTextBlock; ar: PortableTextBlock } => ({
  en: {
    _key: k('en'),
    _type: 'block',
    style: opts?.style || 'normal',
    markDefs: [],
    children: [{ _key: k('ens'), _type: 'span', text: en, marks: [] }],
    ...(opts?.listItem ? { listItem: opts.listItem, level: opts.level || 1 } : {}),
  },
  ar: {
    _key: k('ar'),
    _type: 'block',
    style: opts?.style || 'normal',
    markDefs: [],
    children: [{ _key: k('ars'), _type: 'span', text: ar, marks: [] }],
    ...(opts?.listItem ? { listItem: opts.listItem, level: opts.level || 1 } : {}),
  },
})

const rich = (...pairs: Array<{ en: PortableTextBlock; ar: PortableTextBlock }>): LocalizedRichText => ({
  en: pairs.map((p) => p.en),
  ar: pairs.map((p) => p.ar),
})

const seo = (
  titleEn: string,
  titleAr: string,
  descEn: string,
  descAr: string,
  keywordsEn: string[],
  keywordsAr: string[],
): SeedSEO => ({
  metaTitle: L(titleEn, titleAr),
  metaDescription: T(descEn, descAr),
  keywords: { en: keywordsEn, ar: keywordsAr },
  noIndex: false,
  noFollow: false,
})

const authorSlug = 'team-codefy-hub'

export const blogPostSeeds: BlogPostSeed[] = [
  {
    _id: 'blog-employee-transport-erp-system-guide',
    _type: 'blogPost',
    title: L('What Is an Employee Transportation ERP System?', 'ما هو نظام ERP لنقل الموظفين؟'),
    slug: { _type: 'slug', current: 'employee-transportation-erp-system-guide' },
    excerpt: T(
      'A practical guide to the operating, financial, and governance layers that define a modern employee transportation ERP platform.',
      'دليل عملي لطبقات التشغيل والمالية والحوكمة التي تُعرّف منصة ERP حديثة لنقل الموظفين.',
    ),
    content: rich(
      block('The shift from spreadsheet-based dispatch to an ERP model starts by structuring transport objects, not just trip records.', 'يبدأ التحول من التشغيل عبر الجداول إلى نموذج ERP عبر هيكلة كيانات النقل وليس سجلات الرحلات فقط.', { style: 'h2' }),
      block('Tranzkit organizes routes, schedules, stops, vehicles, drivers, suppliers, and contract terms as connected entities with clear ownership.', 'ينظّم ترانزكيت المسارات والجداول ونقاط التوقف والمركبات والسائقين والموردين وشروط التعاقد ككيانات مترابطة بملكية واضحة.'),
      block('Why this matters:', 'لماذا هذا مهم:', { style: 'h3' }),
      block('Fewer assignment conflicts and better dispatch readiness.', 'تقليل تعارضات التخصيص ورفع جاهزية التشغيل.', { listItem: 'bullet' }),
      block('Planned versus actual visibility for enterprise buyers.', 'رؤية واضحة للمخطط مقابل المنفذ للجهات المشترية.', { listItem: 'bullet' }),
      block('Cleaner invoice validation and supplier settlement cycles.', 'تحسين التحقق من الفواتير ودورات تسوية الموردين.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['employee-transport-erp', 'operations-control'],
    tags: ['employee transportation management system', 'transport ERP', 'corporate commute platform'],
    publishedAt: '2026-05-10T09:00:00.000Z',
    updatedAt: '2026-05-10T09:00:00.000Z',
    readingTime: 6,
    featured: true,
    status: 'published',
    seo: seo(
      'Employee Transportation ERP System Guide | Tranzkit',
      'دليل نظام ERP لنقل الموظفين | ترانزكيت',
      'Learn how employee transportation ERP systems connect planning, dispatch, and billing into one control model.',
      'تعرّف كيف تربط أنظمة ERP لنقل الموظفين بين التخطيط والتشغيل والفوترة ضمن نموذج تحكم موحد.',
      ['employee transportation management system', 'employee transport ERP', 'transport desk automation'],
      ['نظام إدارة نقل الموظفين', 'نظام ERP للنقل', 'أتمتة مكتب النقل'],
    ),
  },
  {
    _id: 'blog-fixed-route-vs-demand-transport',
    _type: 'blogPost',
    title: L('Fixed Routes vs Demand-Based Employee Transport', 'النقل الثابت مقابل النقل حسب الطلب للموظفين'),
    slug: { _type: 'slug', current: 'fixed-routes-vs-demand-based-employee-transport' },
    excerpt: T('Compare operating fit, SLA risk, and cost behavior across fixed-route and contracted demand-based transport models.', 'مقارنة ملاءمة التشغيل ومخاطر SLA وسلوك التكلفة بين نموذج المسارات الثابتة والنقل التعاقدي حسب الطلب.'),
    content: rich(
      block('Most enterprises run a hybrid model, not one model.', 'معظم الشركات تشغّل نموذجًا هجينًا وليس نموذجًا واحدًا.', { style: 'h2' }),
      block('Fixed routes perform best where demand is stable and shift windows are predictable.', 'تعمل المسارات الثابتة بكفاءة أعلى عندما يكون الطلب مستقرًا ونوافذ الورديات قابلة للتوقع.'),
      block('Demand-based transport is better for variable shifts and low-density zones.', 'النقل حسب الطلب أنسب للورديات المتغيرة والمناطق منخفضة الكثافة.'),
      block('Decision criteria', 'معايير اتخاذ القرار', { style: 'h3' }),
      block('Demand volatility by site and shift.', 'تذبذب الطلب حسب الموقع والوردية.', { listItem: 'bullet' }),
      block('Trip pooling potential and occupancy targets.', 'إمكانات تجميع الرحلات وأهداف الإشغال.', { listItem: 'bullet' }),
      block('Supplier response reliability and cutoff discipline.', 'موثوقية استجابة الموردين والانضباط في مواعيد الإغلاق.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['route-optimization', 'enterprise-mobility'],
    tags: ['fixed route shuttle management', 'demand-based employee transport', 'corporate mobility platform'],
    publishedAt: '2026-05-11T09:00:00.000Z',
    updatedAt: '2026-05-11T09:00:00.000Z',
    readingTime: 7,
    featured: false,
    status: 'published',
    seo: seo('Fixed Route vs Demand-Based Employee Transport | Tranzkit', 'المسارات الثابتة مقابل النقل حسب الطلب للموظفين | ترانزكيت', 'Choose the right transport model using demand patterns, SLA constraints, and cost control logic.', 'اختر نموذج النقل الأنسب باستخدام أنماط الطلب وقيود SLA ومنطق ضبط التكلفة.', ['fixed route shuttle management', 'demand-based commute system', 'employee transport software'], ['برنامج إدارة حافلات الموظفين', 'النقل حسب الطلب للموظفين', 'برنامج إدارة مواصلات الموظفين']),
  },
  {
    _id: 'blog-reduce-billing-disputes-enterprise-operator',
    _type: 'blogPost',
    title: L('How to Reduce Billing Disputes Between Buyers and Operators', 'كيف تقلل نزاعات الفوترة بين الجهة المشترية والمشغّل'),
    slug: { _type: 'slug', current: 'reduce-billing-disputes-between-buyers-and-operators' },
    excerpt: T('A control framework for reconciling planned service, actual execution, and invoice lines before settlement cycles close.', 'إطار حوكمة لمطابقة الخدمة المخططة والتنفيذ الفعلي وبنود الفاتورة قبل إقفال دورات التسوية.'),
    content: rich(
      block('Disputes usually come from mismatched data ownership.', 'تنشأ النزاعات غالبًا من تضارب ملكية البيانات.', { style: 'h2' }),
      block('When route plans, trip events, and billing rules are fragmented, reconciliation slows and trust drops.', 'عندما تتشتت خطط المسارات وأحداث الرحلات وقواعد الفوترة، تتباطأ المطابقة وتنخفض الثقة.'),
      block('A better approach includes:', 'نهج أفضل يشمل:', { style: 'h3' }),
      block('Shared planned versus actual views per service day.', 'عرضًا مشتركًا للمخطط مقابل المنفذ لكل يوم خدمة.', { listItem: 'bullet' }),
      block('Clear handling for no-shows, partials, and replacement trips.', 'معالجة واضحة لعدم الحضور والتنفيذ الجزئي ورحلات الاستبدال.', { listItem: 'bullet' }),
      block('Approval logs tied to financial impact.', 'سجلات موافقات مرتبطة بالأثر المالي.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['billing-settlement', 'operations-control'],
    tags: ['employee transport billing software', 'transport invoice reconciliation', 'supplier settlement'],
    publishedAt: '2026-05-12T09:00:00.000Z',
    updatedAt: '2026-05-12T09:00:00.000Z',
    readingTime: 6,
    featured: true,
    status: 'published',
    seo: seo('Reduce Employee Transport Billing Disputes | Tranzkit', 'تقليل نزاعات فوترة نقل الموظفين | ترانزكيت', 'Use planned-vs-actual controls and settlement governance to reduce invoice disputes and approval delays.', 'استخدم ضوابط المخطط مقابل المنفذ وحوكمة التسويات لتقليل نزاعات الفواتير وتأخير الموافقات.', ['employee transport billing software', 'invoice dispute management', 'supplier settlement workflow'], ['نظام فوترة نقل الموظفين', 'إدارة نزاعات الفواتير', 'تسوية الموردين']),
  },
  {
    _id: 'blog-kpis-for-corporate-commute-operations',
    _type: 'blogPost',
    title: L('KPI Framework for Corporate Commute Operations', 'إطار مؤشرات الأداء لعمليات تنقل الشركات'),
    slug: { _type: 'slug', current: 'kpi-framework-corporate-commute-operations' },
    excerpt: T('Track SLA, occupancy, on-time performance, and cost-per-employee with one structured KPI stack.', 'تتبّع SLA ونسب الإشغال والالتزام الزمني وتكلفة الموظف عبر هيكل مؤشرات موحد.'),
    content: rich(
      block('KPI design should map to operations and finance together.', 'يجب أن يرتبط تصميم المؤشرات بالتشغيل والمالية معًا.', { style: 'h2' }),
      block('Avoid vanity metrics. Focus on indicators that trigger operational action and financial accountability.', 'تجنّب المؤشرات الشكلية. ركّز على المؤشرات التي تحفّز الإجراء التشغيلي والمساءلة المالية.'),
      block('Core KPI stack', 'هيكل المؤشرات الأساسي', { style: 'h3' }),
      block('On-time pickup/drop performance by shift.', 'الالتزام بوقت الالتقاط/الإنزال حسب الوردية.', { listItem: 'bullet' }),
      block('Occupancy and empty-seat cost trends.', 'اتجاهات الإشغال وتكلفة المقاعد الفارغة.', { listItem: 'bullet' }),
      block('SLA breaches by route, supplier, and contract.', 'اختراقات SLA حسب المسار والمورد والعقد.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['analytics-kpis', 'enterprise-mobility'],
    tags: ['corporate commute KPI', 'SLA transport tracking', 'employee transport analytics'],
    publishedAt: '2026-05-13T09:00:00.000Z',
    updatedAt: '2026-05-13T09:00:00.000Z',
    readingTime: 5,
    featured: false,
    status: 'published',
    seo: seo('Corporate Commute KPI Framework | Tranzkit', 'إطار مؤشرات أداء تنقل الشركات | ترانزكيت', 'Build a transport KPI framework that improves service quality and financial control.', 'ابنِ إطار مؤشرات نقل يرفع جودة الخدمة ويعزز التحكم المالي.', ['employee transport KPI', 'transport SLA reporting', 'corporate commute analytics'], ['مؤشرات نقل الموظفين', 'تقارير SLA للنقل', 'تحليلات تنقل الشركات']),
  },
  {
    _id: 'blog-driver-assignment-governance',
    _type: 'blogPost',
    title: L('Driver Assignment Governance That Scales', 'حوكمة تخصيص السائقين القابلة للتوسع'),
    slug: { _type: 'slug', current: 'driver-assignment-governance-that-scales' },
    excerpt: T('Design assignment logic with conflict detection, shift rules, and exception approvals before execution starts.', 'صمّم منطق التخصيص مع كشف التعارضات وقواعد الورديات وموافقات الاستثناءات قبل بدء التنفيذ.'),
    content: rich(
      block('Assignment quality determines execution quality.', 'جودة التخصيص تحدد جودة التنفيذ.', { style: 'h2' }),
      block('When dispatch teams rely on ad-hoc rework, service consistency collapses under scale.', 'عندما تعتمد فرق التشغيل على المعالجة الارتجالية، تتدهور اتساق الخدمة مع التوسع.'),
      block('Governance controls', 'ضوابط الحوكمة', { style: 'h3' }),
      block('Driver availability with legal and operational limits.', 'توفر السائقين ضمن الحدود التشغيلية والتنظيمية.', { listItem: 'bullet' }),
      block('Vehicle readiness with compliance validity windows.', 'جاهزية المركبة مع صلاحية وثائق الامتثال.', { listItem: 'bullet' }),
      block('Approval gates for late changes with audit trail.', 'بوابات موافقة للتغييرات المتأخرة مع أثر تدقيقي.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['fleet-vendor-management', 'operations-control'],
    tags: ['driver assignment', 'dispatch board', 'fleet governance'],
    publishedAt: '2026-05-14T09:00:00.000Z',
    updatedAt: '2026-05-14T09:00:00.000Z',
    readingTime: 5,
    featured: false,
    status: 'published',
    seo: seo('Driver Assignment Governance for Transport Ops | Tranzkit', 'حوكمة تخصيص السائقين لعمليات النقل | ترانزكيت', 'Improve dispatch consistency with assignment rules, conflict checks, and approval trails.', 'حسّن اتساق التشغيل عبر قواعد التخصيص وفحوصات التعارض ومسارات الموافقة.', ['driver assignment software', 'transport dispatch governance', 'fleet operations control'], ['تخصيص السائقين', 'حوكمة التشغيل', 'التحكم في عمليات الأسطول']),
  },
  {
    _id: 'blog-supplier-settlement-cycles',
    _type: 'blogPost',
    title: L('Designing Supplier Settlement Cycles in Employee Transport', 'تصميم دورات تسوية الموردين في نقل الموظفين'),
    slug: { _type: 'slug', current: 'designing-supplier-settlement-cycles-employee-transport' },
    excerpt: T('Structure payable cycles, approvals, and deduction logic to protect margin and reduce payout friction.', 'هيكل دورات المستحقات والموافقات ومنطق الخصومات لحماية الهامش وتقليل احتكاك السداد.'),
    content: rich(
      block('Settlement design is a business control function, not only accounting output.', 'تصميم التسويات وظيفة حوكمة أعمال وليس مجرد مخرجات محاسبية.', { style: 'h2' }),
      block('Each cycle should map to executed service, approved adjustments, and contract terms.', 'يجب أن ترتبط كل دورة بالخدمة المنفذة والتعديلات المعتمدة وشروط التعاقد.'),
      block('Minimum controls', 'الضوابط الدنيا', { style: 'h3' }),
      block('Cycle cutoff dates and approval deadlines.', 'تواريخ إغلاق الدورة ومواعيد الموافقات.', { listItem: 'bullet' }),
      block('Deduction taxonomy for SLA or compliance events.', 'تصنيف الخصومات لحالات SLA أو الامتثال.', { listItem: 'bullet' }),
      block('Supplier-level dispute and resubmission workflow.', 'مسار نزاع وإعادة تقديم على مستوى المورد.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['billing-settlement', 'fleet-vendor-management'],
    tags: ['supplier settlement', 'accounts payable transport', 'employee transport finance'],
    publishedAt: '2026-05-15T09:00:00.000Z',
    updatedAt: '2026-05-15T09:00:00.000Z',
    readingTime: 7,
    featured: false,
    status: 'published',
    seo: seo('Supplier Settlement Cycles for Employee Transport | Tranzkit', 'دورات تسوية الموردين لنقل الموظفين | ترانزكيت', 'Create robust supplier settlement workflows with cycle governance and dispute controls.', 'أنشئ مسارات قوية لتسوية الموردين مع حوكمة الدورات وضوابط النزاعات.', ['supplier settlement transport', 'employee transport AP', 'transport payable workflow'], ['تسوية الموردين', 'مستحقات نقل الموظفين', 'مسار الدفع للنقل']),
  },
  {
    _id: 'blog-hr-facilities-transport-alignment',
    _type: 'blogPost',
    title: L('Aligning HR, Facilities, and Transport Operations', 'مواءمة الموارد البشرية والمرافق وعمليات النقل'),
    slug: { _type: 'slug', current: 'aligning-hr-facilities-and-transport-operations' },
    excerpt: T('A governance playbook for cross-functional commute operations across policy, demand, and service delivery.', 'دليل حوكمة للتشغيل العابر للوظائف في تنقل الموظفين عبر السياسات والطلب وتسليم الخدمة.'),
    content: rich(
      block('Cross-functional misalignment is a hidden cost driver.', 'عدم المواءمة بين الفرق سبب خفي لارتفاع التكلفة.', { style: 'h2' }),
      block('HR owns policy outcomes, facilities owns service continuity, and transport ops owns execution reliability.', 'تملك الموارد البشرية نتائج السياسة، وتملك المرافق استمرارية الخدمة، وتملك عمليات النقل موثوقية التنفيذ.'),
      block('Operating model principles', 'مبادئ نموذج التشغيل', { style: 'h3' }),
      block('One demand model with role-based approvals.', 'نموذج طلب موحد مع موافقات حسب الدور.', { listItem: 'bullet' }),
      block('Shared exceptions board and escalation matrix.', 'لوحة استثناءات مشتركة ومصفوفة تصعيد.', { listItem: 'bullet' }),
      block('Monthly governance review with KPI and cost trends.', 'مراجعة حوكمة شهرية مع اتجاهات المؤشرات والتكلفة.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['enterprise-mobility', 'operations-control'],
    tags: ['HR transport policy', 'facilities commute management', 'enterprise mobility governance'],
    publishedAt: '2026-05-16T09:00:00.000Z',
    updatedAt: '2026-05-16T09:00:00.000Z',
    readingTime: 6,
    featured: false,
    status: 'published',
    seo: seo('HR and Facilities Alignment for Commute Ops | Tranzkit', 'مواءمة الموارد البشرية والمرافق في تشغيل التنقل | ترانزكيت', 'Coordinate HR, facilities, and operations with one governance model for employee transport.', 'نسّق الموارد البشرية والمرافق والتشغيل عبر نموذج حوكمة موحد لنقل الموظفين.', ['corporate mobility governance', 'HR commute operations', 'facilities transport software'], ['حوكمة التنقل المؤسسي', 'تشغيل تنقل الموظفين', 'برنامج إدارة النقل المؤسسي']),
  },
  {
    _id: 'blog-closing-ops-finance-loop',
    _type: 'blogPost',
    title: L('Closing the Operations-Finance Loop in Transport', 'إغلاق حلقة التشغيل والمالية في النقل'),
    slug: { _type: 'slug', current: 'closing-operations-finance-loop-transport' },
    excerpt: T('How to connect dispatch events, approvals, invoicing, and settlement outcomes in one auditable model.', 'كيفية ربط أحداث التشغيل والموافقات والفوترة ونتائج التسوية ضمن نموذج تدقيقي موحد.'),
    content: rich(
      block('Transport profitability leaks where operations and finance disconnect.', 'يتسرّب ربح النقل عند انقطاع الربط بين التشغيل والمالية.', { style: 'h2' }),
      block('Execution events must feed billing logic, and billing outcomes must feed operational decisions.', 'يجب أن تغذي أحداث التنفيذ منطق الفوترة، وأن تغذي نتائج الفوترة القرارات التشغيلية.'),
      block('Loop closure checklist', 'قائمة إغلاق الحلقة', { style: 'h3' }),
      block('Trip status events with financial relevance flags.', 'أحداث حالة الرحلة مع إشارات الأهمية المالية.', { listItem: 'bullet' }),
      block('Approval chain before posting invoices.', 'سلسلة موافقات قبل ترحيل الفواتير.', { listItem: 'bullet' }),
      block('Variance analysis by route and supplier.', 'تحليل الانحراف حسب المسار والمورد.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['billing-settlement', 'analytics-kpis'],
    tags: ['transport finance integration', 'dispatch to billing', 'margin control'],
    publishedAt: '2026-05-17T09:00:00.000Z',
    updatedAt: '2026-05-17T09:00:00.000Z',
    readingTime: 6,
    featured: false,
    status: 'published',
    seo: seo('Operations to Finance Loop in Employee Transport | Tranzkit', 'حلقة التشغيل إلى المالية في نقل الموظفين | ترانزكيت', 'Connect dispatch execution and finance controls to improve margin and audit readiness.', 'اربط تنفيذ التشغيل بضوابط المالية لتحسين الهامش والجاهزية التدقيقية.', ['transport finance workflow', 'dispatch billing integration', 'employee transport margin'], ['تكامل التشغيل والمالية', 'ربط التشغيل بالفوترة', 'هامش نقل الموظفين']),
  },
  {
    _id: 'blog-employee-commute-confidence',
    _type: 'blogPost',
    title: L('Building Employee Commute Confidence at Scale', 'بناء ثقة الموظف في التنقل على نطاق واسع'),
    slug: { _type: 'slug', current: 'building-employee-commute-confidence-at-scale' },
    excerpt: T('Improve rider trust through trip visibility, incident handling, and transparent service communication.', 'ارفع ثقة المستخدم عبر وضوح الرحلة وإدارة الحوادث والتواصل الشفاف حول الخدمة.'),
    content: rich(
      block('Employee trust is a service outcome, not a communication slogan.', 'ثقة الموظف نتيجة خدمة وليست شعارًا تواصليًا.', { style: 'h2' }),
      block('Confidence grows when trips are predictable, delays are transparent, and issues are resolved with traceability.', 'تزداد الثقة عندما تكون الرحلات متوقعة، والتأخير واضحًا، والمشكلات تُحلّ مع قابلية التتبع.'),
      block('Confidence levers', 'روافع الثقة', { style: 'h3' }),
      block('Live ETA and service status communication.', 'التواصل اللحظي حول وقت الوصول وحالة الخدمة.', { listItem: 'bullet' }),
      block('Structured complaints with response SLA.', 'شكاوى منظمة مع SLA للاستجابة.', { listItem: 'bullet' }),
      block('Post-trip feedback loops into operations review.', 'إدخال تقييمات ما بعد الرحلة في مراجعات التشغيل.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['enterprise-mobility', 'safety-compliance'],
    tags: ['employee commute app', 'trip visibility', 'service feedback'],
    publishedAt: '2026-05-18T09:00:00.000Z',
    updatedAt: '2026-05-18T09:00:00.000Z',
    readingTime: 5,
    featured: false,
    status: 'published',
    seo: seo('Employee Commute Confidence Guide | Tranzkit', 'دليل ثقة الموظف في التنقل | ترانزكيت', 'Raise employee commute confidence with visibility, communication, and incident workflows.', 'ارفع ثقة الموظف في التنقل عبر الرؤية الواضحة والتواصل ومسارات معالجة الحوادث.', ['employee commute app', 'transport service communication', 'commute experience'], ['تطبيق تنقل الموظفين', 'التواصل في خدمة النقل', 'تجربة تنقل الموظف']),
  },
  {
    _id: 'blog-tranzkit-codefy-hub-experience',
    _type: 'blogPost',
    title: L('How Tranzkit Was Shaped by 20+ Years of Transport and ERP Delivery', 'كيف تشكّل ترانزكيت بخبرة تتجاوز 20 عامًا في النقل وERP'),
    slug: { _type: 'slug', current: 'tranzkit-shaped-by-20-years-transport-erp-delivery' },
    excerpt: T('Why Tranzkit, a product by Codefy Hub, is designed around real operating and financial transport workflows.', 'لماذا تم تصميم ترانزكيت، كمنتج من Codefy Hub، حول مسارات تشغيل ومالية حقيقية في النقل.'),
    content: rich(
      block('Tranzkit is a product by Codefy Hub, built from practical delivery experience across logistics, mobility, transportation, IT, and ERP systems.', 'ترانزكيت منتج من Codefy Hub، مبني على خبرة تنفيذ عملية في اللوجستيات والتنقل والنقل وتقنية المعلومات وأنظمة ERP.', { style: 'h2' }),
      block('The product architecture reflects field realities: shift cutoffs, assignment conflicts, SLA pressure, and billing disputes.', 'تعكس بنية المنتج واقع الميدان: مواعيد الإغلاق للورديات، تعارضات التخصيص، ضغط SLA، ونزاعات الفوترة.'),
      block('Design principles', 'مبادئ التصميم', { style: 'h3' }),
      block('Object-centric data model for operational clarity.', 'نموذج بيانات مرتكز على الكيانات لوضوح تشغيلي أعلى.', { listItem: 'bullet' }),
      block('Buyer-operator alignment without data ambiguity.', 'مواءمة بين الجهة المشترية والمشغّل دون غموض بيانات.', { listItem: 'bullet' }),
      block('Finance-aware workflows from day one.', 'مسارات واعية بالمالية منذ اليوم الأول.', { listItem: 'bullet' }),
    ),
    authorSlug,
    categorySlugs: ['employee-transport-erp', 'enterprise-mobility'],
    tags: ['Codefy Hub', 'transport software expertise', 'employee transportation ERP'],
    publishedAt: '2026-05-19T09:00:00.000Z',
    updatedAt: '2026-05-19T09:00:00.000Z',
    readingTime: 6,
    featured: true,
    status: 'published',
    seo: seo('Tranzkit by Codefy Hub: Transport + ERP Expertise', 'ترانزكيت من Codefy Hub: خبرة النقل وERP', 'See how over 20 years of transport and ERP implementation experience shaped Tranzkit.', 'تعرّف كيف شكّلت خبرة تنفيذ تتجاوز 20 عامًا في النقل وERP منصة ترانزكيت.', ['Codefy Hub Tranzkit', 'employee transport ERP platform', 'transport operations software'], ['Codefy Hub ترانزكيت', 'منصة ERP لنقل الموظفين', 'برنامج تشغيل النقل']),
  },
]

export const caseStudySeeds: CaseStudySeed[] = [
  {
    _id: 'case-multi-client-operations-standardization',
    _type: 'caseStudy',
    title: L('Standardizing Multi-Client Employee Transport Operations', 'توحيد عمليات نقل الموظفين متعددة العملاء'),
    slug: { _type: 'slug', current: 'standardizing-multi-client-employee-transport-operations' },
    excerpt: T('An operator unified planning, dispatch, and billing controls across 14 enterprise accounts using Tranzkit.', 'وحّد مشغّل النقل ضوابط التخطيط والتشغيل والفوترة عبر 14 حسابًا مؤسسيًا باستخدام ترانزكيت.'),
    clientName: L('Regional Corporate Mobility Operator', 'مشغّل إقليمي لتنقل الشركات'),
    industry: L('Employee Transportation Services', 'خدمات نقل الموظفين'),
    location: L('Cairo, Egypt', 'القاهرة، مصر'),
    challenge: rich(
      block('The operator managed multiple contracts with fragmented workflows, leading to inconsistent SLAs and monthly billing disputes.', 'كان المشغّل يدير عقودًا متعددة عبر مسارات متفرقة، ما تسبب في تفاوت SLA ونزاعات فوترة شهرية.', { style: 'h2' }),
      block('Dispatch teams had no unified view for exceptions across clients and shifts.', 'لم تمتلك فرق التشغيل رؤية موحدة للاستثناءات عبر العملاء والورديات.'),
    ),
    solution: rich(
      block('Tranzkit introduced one object-centric workspace for routes, schedules, suppliers, and contracts.', 'قدّم ترانزكيت مساحة عمل مرتكزة على الكيانات للمسارات والجداول والموردين والعقود.', { style: 'h2' }),
      block('Buyer-facing validation and AP/AR control views were enabled for cycle-level governance.', 'تم تفعيل شاشات تحقق للجهة المشترية وضوابط AP/AR لحوكمة دورات الفوترة.'),
    ),
    results: rich(
      block('The operator reduced monthly reconciliation effort and improved SLA visibility across all accounts.', 'خفّض المشغّل جهد المطابقة الشهري ورفع وضوح SLA عبر جميع الحسابات.', { style: 'h2' }),
      block('Exception handling became faster with clear approval ownership.', 'أصبحت معالجة الاستثناءات أسرع مع وضوح ملكية الموافقات.'),
    ),
    metrics: [
      { _key: 'm1', value: L('34%', '34%'), label: L('Faster Billing Reconciliation', 'تسريع مطابقة الفوترة'), icon: 'Calculator' },
      { _key: 'm2', value: L('22%', '22%'), label: L('SLA Variance Reduction', 'خفض انحراف SLA'), icon: 'TrendingUp' },
      { _key: 'm3', value: L('14', '14'), label: L('Enterprise Accounts Unified', 'حسابات مؤسسية موحدة'), icon: 'Building2' },
    ],
    testimonial: {
      quote: T('We finally run one operational truth across contracts instead of managing exceptions through spreadsheets.', 'أصبح لدينا مصدر تشغيلي موحّد عبر العقود بدلًا من إدارة الاستثناءات عبر الجداول.'),
      author: L('Operations Director', 'مدير العمليات'),
      role: L('Corporate Mobility Operator', 'مشغّل تنقل مؤسسي'),
    },
    categorySlugs: ['operations-transformation', 'finance-control'],
    publishedAt: '2026-05-01T09:00:00.000Z',
    featured: true,
    seo: seo('Case Study: Multi-Client Employee Transport Standardization', 'دراسة حالة: توحيد نقل الموظفين متعدد العملاء', 'See how a transport operator unified dispatch and billing controls across enterprise contracts.', 'تعرّف كيف وحّد مشغّل النقل ضوابط التشغيل والفوترة عبر عقود مؤسسية متعددة.', ['employee transport case study', 'transport operations standardization'], ['دراسة حالة نقل الموظفين', 'توحيد عمليات النقل']),
  },
  {
    _id: 'case-enterprise-service-validation',
    _type: 'caseStudy',
    title: L('Improving Enterprise Service Validation and SLA Governance', 'تحسين التحقق المؤسسي من الخدمة وحوكمة SLA'),
    slug: { _type: 'slug', current: 'improving-enterprise-service-validation-sla-governance' },
    excerpt: T('A large enterprise gained planned-vs-actual transparency across shifts, sites, and supplier-managed routes.', 'حققت شركة كبيرة شفافية المخطط مقابل المنفذ عبر الورديات والمواقع والمسارات المُدارة من الموردين.'),
    clientName: L('National Industrial Group', 'مجموعة صناعية وطنية'),
    industry: L('Manufacturing and Industrial Operations', 'التصنيع والعمليات الصناعية'),
    location: L('Giza, Egypt', 'الجيزة، مصر'),
    challenge: rich(
      block('HR, facilities, and procurement teams lacked a common validation model for transport delivery.', 'افتقدت فرق الموارد البشرية والمرافق والمشتريات نموذج تحقق موحدًا لتسليم خدمة النقل.', { style: 'h2' }),
      block('Contract penalties were difficult to apply due to weak operational evidence trails.', 'كان تطبيق الجزاءات التعاقدية صعبًا بسبب ضعف المسارات الإثباتية التشغيلية.'),
    ),
    solution: rich(
      block('Tranzkit provided enterprise visibility for service-day validation, incident traceability, and supplier variance analysis.', 'وفّر ترانزكيت رؤية مؤسسية للتحقق اليومي من الخدمة وتتبع الحوادث وتحليل انحراف الموردين.', { style: 'h2' }),
      block('Role-based access enabled each team to act without compromising governance.', 'مكّنت صلاحيات الأدوار كل فريق من العمل دون الإخلال بالحوكمة.'),
    ),
    results: rich(
      block('The enterprise improved SLA control and accelerated supplier-performance reviews.', 'حسّنت الشركة التحكم في SLA وسرّعت مراجعات أداء الموردين.', { style: 'h2' }),
      block('Cross-functional disputes on service evidence dropped substantially.', 'انخفضت بشكل ملحوظ الخلافات بين الفرق حول أدلة تنفيذ الخدمة.'),
    ),
    metrics: [
      { _key: 'm1', value: L('27%', '27%'), label: L('Faster SLA Review Cycles', 'تسريع دورات مراجعة SLA'), icon: 'Clock3' },
      { _key: 'm2', value: L('41%', '41%'), label: L('Lower Validation Disputes', 'خفض نزاعات التحقق'), icon: 'ShieldCheck' },
      { _key: 'm3', value: L('9', '9'), label: L('Sites Under Unified Governance', 'مواقع تحت حوكمة موحدة'), icon: 'MapPinned' },
    ],
    testimonial: {
      quote: T('We now validate transport performance with objective data instead of fragmented reports.', 'أصبحنا نتحقق من أداء النقل ببيانات موضوعية بدل التقارير المتفرقة.'),
      author: L('Head of Facilities', 'مدير المرافق'),
      role: L('Enterprise Mobility Owner', 'مسؤول تنقل الموظفين'),
    },
    categorySlugs: ['enterprise-governance', 'sla-performance'],
    publishedAt: '2026-05-03T09:00:00.000Z',
    featured: true,
    seo: seo('Case Study: Enterprise SLA Governance with Tranzkit', 'دراسة حالة: حوكمة SLA المؤسسية مع ترانزكيت', 'How an enterprise improved transport SLA validation across sites and suppliers.', 'كيف حسّنت شركة مؤسسية التحقق من SLA للنقل عبر المواقع والموردين.', ['enterprise mobility case study', 'transport SLA governance'], ['دراسة حالة التنقل المؤسسي', 'حوكمة SLA للنقل']),
  },
  {
    _id: 'case-supplier-settlement-discipline',
    _type: 'caseStudy',
    title: L('Building Supplier Settlement Discipline Across Branches', 'بناء انضباط تسوية الموردين عبر الفروع'),
    slug: { _type: 'slug', current: 'building-supplier-settlement-discipline-across-branches' },
    excerpt: T('A transport provider synchronized payable cycles and deduction policies across branch-level operations.', 'زامن مزوّد نقل دورات المستحقات وسياسات الخصومات عبر عمليات الفروع.'),
    clientName: L('Managed Shuttle Provider', 'مزوّد خدمات نقل مُدارة'),
    industry: L('Mobility Services', 'خدمات التنقل'),
    location: L('Alexandria, Egypt', 'الإسكندرية، مصر'),
    challenge: rich(
      block('Branch teams used inconsistent cycle rules, creating delayed settlements and recurring disputes.', 'استخدمت فرق الفروع قواعد دورات غير متسقة، ما أدى إلى تأخر التسويات وتكرار النزاعات.', { style: 'h2' }),
      block('Deduction reasons were not standardized across contracts.', 'لم تكن أسباب الخصومات موحّدة عبر العقود.'),
    ),
    solution: rich(
      block('Tranzkit standardized cycle calendars, deduction taxonomy, and approval checkpoints by contract type.', 'وحّد ترانزكيت تقاويم الدورات وتصنيف الخصومات ونقاط الموافقة حسب نوع العقد.', { style: 'h2' }),
      block('Finance teams gained a branch-level payable view with escalation traceability.', 'اكتسبت فرق المالية عرضًا لمستحقات الفروع مع قابلية تتبع التصعيد.'),
    ),
    results: rich(
      block('Settlement reliability improved and disputes were resolved with clearer evidence.', 'تحسنت موثوقية التسويات وأصبحت النزاعات تُحسم بأدلة أوضح.', { style: 'h2' }),
      block('Branch-level payment forecasting became more predictable.', 'أصبحت توقعات السداد على مستوى الفروع أكثر قابلية للتنبؤ.'),
    ),
    metrics: [
      { _key: 'm1', value: L('31%', '31%'), label: L('Reduction in Settlement Delays', 'خفض تأخر التسويات'), icon: 'Timer' },
      { _key: 'm2', value: L('38%', '38%'), label: L('Fewer Supplier Disputes', 'تقليل نزاعات الموردين'), icon: 'FileCheck2' },
      { _key: 'm3', value: L('6', '6'), label: L('Branches Standardized', 'فروع تم توحيدها'), icon: 'GitBranch' },
    ],
    testimonial: {
      quote: T('Our payable cycles are now predictable and auditable across every branch.', 'أصبحت دورات المستحقات لدينا متوقعة وقابلة للتدقيق في كل فرع.'),
      author: L('Finance Controller', 'مراقب مالي'),
      role: L('Transport Provider', 'مزوّد خدمة نقل'),
    },
    categorySlugs: ['finance-control', 'supplier-management'],
    publishedAt: '2026-05-05T09:00:00.000Z',
    featured: false,
    seo: seo('Case Study: Supplier Settlement Discipline in Transport', 'دراسة حالة: انضباط تسوية الموردين في النقل', 'Explore how a mobility provider improved settlement reliability across branches.', 'استكشف كيف حسّن مزوّد تنقل موثوقية التسويات عبر الفروع.', ['supplier settlement case study', 'transport finance controls'], ['دراسة حالة تسوية الموردين', 'ضوابط مالية للنقل']),
  },
  {
    _id: 'case-shift-transport-visibility',
    _type: 'caseStudy',
    title: L('Shift-Based Transport Visibility for Workforce Reliability', 'رؤية نقل الورديات لرفع موثوقية القوى العاملة'),
    slug: { _type: 'slug', current: 'shift-based-transport-visibility-workforce-reliability' },
    excerpt: T('A services enterprise connected shift demand, dispatch execution, and employee feedback in one operating model.', 'ربطت شركة خدمات بين طلب الورديات والتنفيذ التشغيلي وتغذية الموظفين الراجعة ضمن نموذج تشغيل موحد.'),
    clientName: L('Enterprise Services Network', 'شبكة خدمات مؤسسية'),
    industry: L('Business Services', 'خدمات الأعمال'),
    location: L('Riyadh, Saudi Arabia', 'الرياض، السعودية'),
    challenge: rich(
      block('The company struggled with late arrivals and low trust in transport service quality.', 'عانت الشركة من تأخر الوصول وانخفاض الثقة في جودة خدمة النقل.', { style: 'h2' }),
      block('Trip communication and incident follow-up were inconsistent across shift windows.', 'كان التواصل حول الرحلات ومتابعة الحوادث غير متسقين عبر نوافذ الورديات.'),
    ),
    solution: rich(
      block('Tranzkit enabled shift-level planning, live trip monitoring, and structured employee complaint workflows.', 'فعّل ترانزكيت التخطيط على مستوى الوردية والمراقبة المباشرة للرحلات ومسارات شكاوى الموظفين المنظمة.', { style: 'h2' }),
      block('Operations and HR teams used the same service-day evidence for reviews.', 'استخدمت فرق التشغيل والموارد البشرية نفس أدلة يوم الخدمة في المراجعات.'),
    ),
    results: rich(
      block('Service predictability improved and employee-reported confidence increased.', 'تحسنت قابلية التنبؤ بالخدمة وارتفعت الثقة المبلغ عنها من الموظفين.', { style: 'h2' }),
      block('Incident closure time dropped with better ownership.', 'انخفض زمن إغلاق الحوادث مع تحسّن تحديد المسؤولية.'),
    ),
    metrics: [
      { _key: 'm1', value: L('24%', '24%'), label: L('Improved On-Time Shift Arrivals', 'تحسن وصول الورديات في الوقت'), icon: 'AlarmClockCheck' },
      { _key: 'm2', value: L('33%', '33%'), label: L('Faster Incident Closure', 'تسريع إغلاق الحوادث'), icon: 'Gauge' },
      { _key: 'm3', value: L('18%', '18%'), label: L('Higher Employee Service Confidence', 'ارتفاع ثقة الموظفين في الخدمة'), icon: 'HeartHandshake' },
    ],
    testimonial: {
      quote: T('We can now prove service quality and respond faster when things go wrong.', 'أصبح بإمكاننا إثبات جودة الخدمة والاستجابة أسرع عند حدوث المشكلات.'),
      author: L('Mobility Program Manager', 'مدير برنامج التنقل'),
      role: L('Enterprise Services', 'الخدمات المؤسسية'),
    },
    categorySlugs: ['workforce-reliability', 'operations-transformation'],
    publishedAt: '2026-05-07T09:00:00.000Z',
    featured: false,
    seo: seo('Case Study: Shift Transport Visibility with Tranzkit', 'دراسة حالة: رؤية نقل الورديات مع ترانزكيت', 'See how shift-based transport visibility improved workforce reliability and incident response.', 'اكتشف كيف حسّنت رؤية نقل الورديات موثوقية القوى العاملة والاستجابة للحوادث.', ['shift transport case study', 'employee commute reliability'], ['دراسة حالة نقل الورديات', 'موثوقية تنقل الموظفين']),
  },
]

const faqBase: Array<{ qEn: string; qAr: string; aEn: string; aAr: string; categorySlug: string; tags: string[] }> = [
  { qEn: 'What is Tranzkit?', qAr: 'ما هو ترانزكيت؟', aEn: 'Tranzkit is an employee transportation ERP system for planning, dispatch, tracking, and billing workflows in one platform.', aAr: 'ترانزكيت هو نظام ERP لنقل الموظفين يجمع التخطيط والتشغيل والتتبع والفوترة في منصة واحدة.', categorySlug: 'platform-overview', tags: ['employee transportation management system', 'ERP'] },
  { qEn: 'Who is Tranzkit for?', qAr: 'لمن صُمم ترانزكيت؟', aEn: 'It is built for transport operators, enterprise buyers, HR/facilities teams, and finance teams managing employee commute programs.', aAr: 'صُمم للمشغلين والجهات المشترية المؤسسية وفرق الموارد البشرية/المرافق والفرق المالية التي تدير برامج تنقل الموظفين.', categorySlug: 'platform-overview', tags: ['corporate mobility platform'] },
  { qEn: 'Is Tranzkit suitable for fixed-route operations?', qAr: 'هل يناسب ترانزكيت التشغيل بالمسارات الثابتة؟', aEn: 'Yes. Tranzkit supports route templates, stop plans, schedule windows, and seat assignment governance for fixed services.', aAr: 'نعم. يدعم ترانزكيت قوالب المسارات وخطط التوقف ونوافذ الجداول وحوكمة تخصيص المقاعد للخدمات الثابتة.', categorySlug: 'operations-dispatch', tags: ['fixed route shuttle management'] },
  { qEn: 'Can we run demand-based employee transport?', qAr: 'هل يمكن تشغيل نقل الموظفين حسب الطلب؟', aEn: 'Yes, with booking cutoffs, batching logic, and dispatch controls that fit contracted demand-responsive models.', aAr: 'نعم، عبر مواعيد إغلاق للحجز ومنطق تجميع الطلب وضوابط تشغيل تلائم النماذج التعاقدية حسب الطلب.', categorySlug: 'operations-dispatch', tags: ['demand-based employee transport'] },
  { qEn: 'Does Tranzkit support multi-client transport operators?', qAr: 'هل يدعم ترانزكيت المشغلين متعددي العملاء؟', aEn: 'Yes. You can manage multiple contracts, projects, and service structures with role-based separation and reporting.', aAr: 'نعم. يمكنك إدارة عقود ومشاريع وهياكل خدمة متعددة مع فصل بالصلاحيات والتقارير.', categorySlug: 'operations-dispatch', tags: ['multi-client operations'] },
  { qEn: 'How does live trip tracking work?', qAr: 'كيف يعمل تتبع الرحلات المباشر؟', aEn: 'Trips are monitored through GPS-linked status updates, timeline events, and operational exception handling tools.', aAr: 'تُراقب الرحلات عبر تحديثات حالة مرتبطة بـGPS وأحداث زمنية وأدوات لمعالجة الاستثناءات التشغيلية.', categorySlug: 'operations-dispatch', tags: ['trip tracking', 'GPS'] },
  { qEn: 'Can we track planned vs actual performance?', qAr: 'هل يمكن تتبع المخطط مقابل المنفذ؟', aEn: 'Yes. Tranzkit provides service-day validation views to compare plans, execution outcomes, and variance causes.', aAr: 'نعم. يوفّر ترانزكيت شاشات تحقق يوم الخدمة لمقارنة الخطط ونتائج التنفيذ وأسباب الانحراف.', categorySlug: 'analytics-reporting', tags: ['planned vs actual', 'SLA'] },
  { qEn: 'Does Tranzkit help with SLA monitoring?', qAr: 'هل يساعد ترانزكيت في مراقبة SLA؟', aEn: 'Yes. You can measure compliance by route, shift, supplier, and contract while tracking escalation records.', aAr: 'نعم. يمكنك قياس الالتزام حسب المسار والوردية والمورد والعقد مع تتبع سجلات التصعيد.', categorySlug: 'analytics-reporting', tags: ['SLA compliance'] },
  { qEn: 'Can we manage drivers and vehicles in one place?', qAr: 'هل يمكن إدارة السائقين والمركبات من مكان واحد؟', aEn: 'Yes. Driver and vehicle assignment logic includes readiness checks, overlap controls, and roster context.', aAr: 'نعم. يتضمن منطق تخصيص السائقين والمركبات فحوصات الجاهزية وضوابط التداخل وسياق الجداول.', categorySlug: 'fleet-suppliers', tags: ['driver management', 'vehicle management'] },
  { qEn: 'How are supplier operations handled?', qAr: 'كيف تتم إدارة عمليات الموردين؟', aEn: 'Suppliers can be linked to service structures, assignments, billing cycles, and performance tracking.', aAr: 'يمكن ربط الموردين بهياكل الخدمة والتخصيصات ودورات الفوترة وتتبع الأداء.', categorySlug: 'fleet-suppliers', tags: ['supplier management'] },
  { qEn: 'Does Tranzkit include invoicing?', qAr: 'هل يتضمن ترانزكيت الفوترة؟', aEn: 'Yes. It supports receivable and payable invoices, recurring billing structures, and validation flows.', aAr: 'نعم. يدعم فواتير القبض والدفع وهياكل الفوترة الدورية ومسارات التحقق.', categorySlug: 'finance-billing', tags: ['invoicing', 'AR/AP'] },
  { qEn: 'Can we run supplier settlement cycles?', qAr: 'هل يمكن تشغيل دورات تسوية الموردين؟', aEn: 'Yes. You can define cycle cutoffs, apply deductions, and finalize settlement batches with approvals.', aAr: 'نعم. يمكنك تحديد مواعيد إغلاق الدورات وتطبيق الخصومات واعتماد دفعات التسوية.', categorySlug: 'finance-billing', tags: ['supplier settlement'] },
  { qEn: 'How does Tranzkit reduce billing disputes?', qAr: 'كيف يقلل ترانزكيت نزاعات الفوترة؟', aEn: 'By linking service evidence, planned-vs-actual validation, and approval logs directly to invoice workflows.', aAr: 'عبر ربط أدلة الخدمة والتحقق من المخطط مقابل المنفذ وسجلات الموافقات مباشرة بمسارات الفاتورة.', categorySlug: 'finance-billing', tags: ['billing disputes'] },
  { qEn: 'Are analytics and KPI dashboards included?', qAr: 'هل تشمل المنصة لوحات تحليلات ومؤشرات؟', aEn: 'Yes. Dashboards cover occupancy, SLA, route performance, cost behavior, and supplier outcomes.', aAr: 'نعم. تغطي اللوحات نسب الإشغال وSLA وأداء المسارات وسلوك التكلفة ونتائج الموردين.', categorySlug: 'analytics-reporting', tags: ['KPI dashboards'] },
  { qEn: 'Can enterprise buyers access transport visibility?', qAr: 'هل يمكن للجهات المشترية المؤسسية الوصول لرؤية النقل؟', aEn: 'Yes. Role-based access gives enterprise teams validation views without exposing unrelated operator data.', aAr: 'نعم. تمنح صلاحيات الأدوار فرق الشركات شاشات تحقق دون كشف بيانات تشغيلية غير مرتبطة.', categorySlug: 'enterprise-workflows', tags: ['enterprise portal'] },
  { qEn: 'Does Tranzkit support multilingual usage?', qAr: 'هل يدعم ترانزكيت الاستخدام متعدد اللغات؟', aEn: 'Yes. Arabic and English interfaces are supported across core workflows and reporting surfaces.', aAr: 'نعم. يدعم الواجهات العربية والإنجليزية عبر المسارات الأساسية وشاشات التقارير.', categorySlug: 'platform-overview', tags: ['Arabic English UI'] },
  { qEn: 'Can we manage multiple branches and entities?', qAr: 'هل يمكن إدارة فروع وكيانات متعددة؟', aEn: 'Yes. Tranzkit supports multi-branch operating contexts with controlled access and segmented reporting.', aAr: 'نعم. يدعم ترانزكيت سياقات تشغيل متعددة الفروع مع صلاحيات محكومة وتقارير مجزأة.', categorySlug: 'enterprise-workflows', tags: ['multi-branch'] },
  { qEn: 'Is there an employee mobile app?', qAr: 'هل يتوفر تطبيق جوال للموظف؟', aEn: 'Yes. Employees can view trips, follow updates, and submit feedback or complaints from mobile.', aAr: 'نعم. يمكن للموظفين عرض الرحلات ومتابعة التحديثات وتقديم الملاحظات أو الشكاوى من الجوال.', categorySlug: 'mobile-apps', tags: ['employee commute app'] },
  { qEn: 'Is there a driver mobile app?', qAr: 'هل يتوفر تطبيق جوال للسائق؟', aEn: 'Yes. Drivers can review assigned trips, execute stop sequences, and update trip statuses.', aAr: 'نعم. يمكن للسائقين مراجعة الرحلات المخصصة وتنفيذ تسلسل التوقفات وتحديث حالات الرحلة.', categorySlug: 'mobile-apps', tags: ['driver app'] },
  { qEn: 'Can supervisors monitor field operations?', qAr: 'هل يمكن للمشرفين متابعة العمليات الميدانية؟', aEn: 'Yes. Supervisors get mobile visibility into incidents, service quality, and execution exceptions.', aAr: 'نعم. يحصل المشرفون على رؤية جوال للحوادث وجودة الخدمة واستثناءات التنفيذ.', categorySlug: 'mobile-apps', tags: ['supervisor app'] },
  { qEn: 'How is access control managed?', qAr: 'كيف تتم إدارة صلاحيات الوصول؟', aEn: 'Role-based access control helps separate duties across dispatch, HR, procurement, and finance users.', aAr: 'تساعد صلاحيات الوصول حسب الدور في فصل المهام بين التشغيل والموارد البشرية والمشتريات والمالية.', categorySlug: 'security-compliance', tags: ['RBAC'] },
  { qEn: 'Can we keep audit trails for approvals?', qAr: 'هل يمكن حفظ مسارات تدقيق للموافقات؟', aEn: 'Yes. Critical operational and financial actions can be tracked with timestamped approval context.', aAr: 'نعم. يمكن تتبع الإجراءات التشغيلية والمالية الحرجة بسياق موافقات مؤرخ زمنيًا.', categorySlug: 'security-compliance', tags: ['audit trail'] },
  { qEn: 'Does Tranzkit handle incident logging?', qAr: 'هل يتعامل ترانزكيت مع تسجيل الحوادث؟', aEn: 'Yes. Incident records can be logged, categorized, escalated, and reviewed against SLA impacts.', aAr: 'نعم. يمكن تسجيل الحوادث وتصنيفها وتصعيدها ومراجعتها مقابل تأثيرات SLA.', categorySlug: 'security-compliance', tags: ['incident management'] },
  { qEn: 'Can we customize workflows for our contracts?', qAr: 'هل يمكن تخصيص المسارات حسب عقودنا؟', aEn: 'Yes. Tranzkit supports configurable structures for service models, billing logic, and governance checkpoints.', aAr: 'نعم. يدعم ترانزكيت هياكل قابلة للتهيئة لنماذج الخدمة ومنطق الفوترة ونقاط الحوكمة.', categorySlug: 'enterprise-workflows', tags: ['workflow customization'] },
  { qEn: 'Is Tranzkit only for transport companies?', qAr: 'هل ترانزكيت مخصص لشركات النقل فقط؟', aEn: 'No. It also serves enterprise organizations that buy and govern employee transportation services.', aAr: 'لا. يخدم أيضًا الجهات المؤسسية التي تشتري خدمات نقل الموظفين وتدير حوكمتها.', categorySlug: 'platform-overview', tags: ['enterprise buyers'] },
  { qEn: 'Can Tranzkit support white-label deployments?', qAr: 'هل يدعم ترانزكيت نشرًا بعلامة بيضاء؟', aEn: 'Yes, premium plans can include white-labeled web and mobile surfaces based on scope.', aAr: 'نعم، يمكن أن تشمل الخطط المتقدمة واجهات ويب وجوال بعلامة بيضاء حسب النطاق.', categorySlug: 'commercial-pricing', tags: ['white label'] },
  { qEn: 'What pricing model is used?', qAr: 'ما نموذج التسعير المستخدم؟', aEn: 'Pricing follows role-based subscriptions (system users, employees, drivers, dependents) with tier-specific options.', aAr: 'يتبع التسعير اشتراكات حسب الدور (مستخدمو النظام، الموظفون، السائقون، التابعون) مع خيارات حسب الفئة.', categorySlug: 'commercial-pricing', tags: ['pricing model'] },
  { qEn: 'Can we start small and scale later?', qAr: 'هل يمكن البدء بشكل محدود ثم التوسع لاحقًا؟', aEn: 'Yes. Teams often start with core dispatch and visibility modules, then expand to finance and analytics.', aAr: 'نعم. تبدأ الفرق غالبًا بوحدات التشغيل والرؤية الأساسية ثم تتوسع إلى المالية والتحليلات.', categorySlug: 'commercial-pricing', tags: ['implementation phases'] },
  { qEn: 'Do you provide implementation guidance?', qAr: 'هل تقدمون إرشادًا للتنفيذ؟', aEn: 'Yes. Implementation guidance can include setup, workflow mapping, and operational adoption planning.', aAr: 'نعم. قد يشمل الإرشاد إعداد النظام وتخطيط المسارات التشغيلية وخطة تبني الاستخدام.', categorySlug: 'commercial-pricing', tags: ['implementation support'] },
  { qEn: 'Who built Tranzkit?', qAr: 'من الجهة التي طورت ترانزكيت؟', aEn: 'Tranzkit is a product by Codefy Hub, informed by over 20 years of logistics, mobility, transportation, IT, and ERP delivery experience.', aAr: 'ترانزكيت منتج من Codefy Hub، ومستند إلى خبرة تتجاوز 20 عامًا في اللوجستيات والتنقل والنقل وتقنية المعلومات وتنفيذ أنظمة ERP.', categorySlug: 'platform-overview', tags: ['Codefy Hub', 'domain expertise'] },
]

export const faqItemSeeds: FAQItemSeed[] = faqBase.map((item, idx) => ({
  _id: `faq-${String(idx + 1).padStart(2, '0')}`,
  _type: 'faqItem',
  question: L(item.qEn, item.qAr),
  answer: rich(
    block(item.aEn, item.aAr),
  ),
  categorySlug: item.categorySlug,
  tags: item.tags,
  order: idx + 1,
  isActive: true,
}))

export const collectionSeeds = {
  blogPostSeeds,
  caseStudySeeds,
  faqItemSeeds,
}
