import test from 'node:test'
import assert from 'node:assert/strict'

import { buildDraftPlan, normalizeContentMap, validateContentMap } from '../src/content-ops.js'
import {
  resolveCaseStudyCategorySlugs,
  validateContentMapWithSanity,
} from '../src/sanity.js'

const richTextBlock = (text: string, key: string) => [
  {
    _key: `${key}-block`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `${key}-span`,
        _type: 'span',
        text,
        marks: [],
      },
    ],
  },
]

test('normalizeContentMap infers page keys from documentType for singleton docs', () => {
  const about = normalizeContentMap({
    documentType: 'aboutPage',
    action: 'draft',
  } as any)
  const contact = normalizeContentMap({
    documentType: 'contactPage',
    action: 'draft',
  } as any)
  const caseStudies = normalizeContentMap({
    documentType: 'caseStudiesPage',
    action: 'draft',
  } as any)

  assert.equal(about.pageKey, 'about')
  assert.equal(contact.pageKey, 'contact')
  assert.equal(caseStudies.pageKey, 'caseStudies')
})

test('validateContentMap accepts about page maps inferred from documentType', () => {
  const result = validateContentMap(
    normalizeContentMap({
      documentType: 'aboutPage',
      action: 'draft',
      _id: 'aboutPage',
      hero: {
        title: { en: 'About', ar: 'عن' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        stats: {
          enterprises: {
            value: { en: '20+', ar: '20+' },
            label: { en: 'Depth', ar: 'عمق' },
          },
          drivers: {
            value: { en: 'Bilingual', ar: 'ثنائي اللغة' },
            label: { en: 'Ops', ar: 'تشغيل' },
          },
          trips: {
            value: { en: 'ERP', ar: 'ERP' },
            label: { en: 'Governance', ar: 'حوكمة' },
          },
        },
      },
      story: {
        heading: { en: 'Why', ar: 'لماذا' },
        subtitle: { en: 'Story', ar: 'قصة' },
        mission: {
          title: { en: 'Mission', ar: 'المهمة' },
          text: { en: 'Mission text', ar: 'نص المهمة' },
        },
        vision: {
          title: { en: 'Vision', ar: 'الرؤية' },
          text: { en: 'Vision text', ar: 'نص الرؤية' },
        },
        values: {
          title: { en: 'Values', ar: 'القيم' },
          innovation: {
            title: { en: 'Innovation', ar: 'الابتكار' },
            description: { en: 'Desc', ar: 'وصف' },
          },
          reliability: {
            title: { en: 'Reliability', ar: 'الموثوقية' },
            description: { en: 'Desc', ar: 'وصف' },
          },
          sustainability: {
            title: { en: 'Sustainability', ar: 'الاستدامة' },
            description: { en: 'Desc', ar: 'وصف' },
          },
        },
      },
      timeline: {
        heading: { en: 'Timeline', ar: 'المحطات' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        milestones: [],
      },
      team: {
        heading: { en: 'Team', ar: 'الفريق' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        members: [],
      },
      careers: {
        heading: { en: 'Careers', ar: 'الوظائف' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        openings: [],
      },
      cta: {
        heading: { en: 'CTA', ar: 'الدعوة' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        primaryCta: { text: { en: 'Book', ar: 'احجز' }, href: '/contact' },
        secondaryCta: { text: { en: 'Talk', ar: 'تحدث' }, href: '/contact' },
      },
      seo: {
        metaTitle: { en: 'Title', ar: 'عنوان' },
        metaDescription: { en: 'Description', ar: 'وصف' },
      },
    } as any),
  )

  assert.equal(result.valid, true)
  assert.equal(result.pageKey, 'about')
})

test('validateContentMap accepts contact page maps inferred from documentType', () => {
  const result = validateContentMap(
    normalizeContentMap({
      documentType: 'contactPage',
      action: 'draft',
      hero: {
        title: { en: 'Contact', ar: 'تواصل' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        emailLabel: { en: 'Email', ar: 'البريد' },
        phoneLabel: { en: 'Phone', ar: 'الهاتف' },
        locationLabel: { en: 'Location', ar: 'الموقع' },
        email: 'sales@example.com',
        phone: '+20',
        location: { en: 'Cairo', ar: 'القاهرة' },
      },
      form: {
        title: { en: 'Title', ar: 'عنوان' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
        name: { en: 'Name', ar: 'الاسم' },
        namePlaceholder: { en: 'Your name', ar: 'اسمك' },
        email: { en: 'Email', ar: 'البريد' },
        emailPlaceholder: { en: 'you@company.com', ar: 'you@company.com' },
        company: { en: 'Company', ar: 'الشركة' },
        companyPlaceholder: { en: 'Company', ar: 'الشركة' },
        phone: { en: 'Phone', ar: 'الهاتف' },
        phonePlaceholder: { en: 'Phone', ar: 'الهاتف' },
        userType: { en: 'Type', ar: 'الدور' },
        userTypePlaceholder: { en: 'Select', ar: 'اختر' },
        userTypeEnterprise: { en: 'Enterprise', ar: 'شركة' },
        userTypeOperator: { en: 'Operator', ar: 'مشغل' },
        message: { en: 'Message', ar: 'الرسالة' },
        messagePlaceholder: { en: 'Tell us', ar: 'أخبرنا' },
        notRobot: { en: 'Not robot', ar: 'لست روبوتًا' },
        submit: { en: 'Submit', ar: 'إرسال' },
        submitting: { en: 'Sending', ar: 'إرسال' },
        successTitle: { en: 'Done', ar: 'تم' },
        successMessage: { en: 'Thanks', ar: 'شكرًا' },
        successButton: { en: 'Again', ar: 'مرة أخرى' },
      },
      socialLinks: {
        heading: { en: 'Follow', ar: 'تابع' },
        subtitle: { en: 'Subtitle', ar: 'وصف' },
      },
      seo: {
        metaTitle: { en: 'Title', ar: 'عنوان' },
        metaDescription: { en: 'Description', ar: 'وصف' },
      },
    } as any),
  )

  assert.equal(result.valid, true)
  assert.equal(result.pageKey, 'contact')
})

test('validateContentMapWithSanity resolves case study category slugs', async () => {
  const contentMap = normalizeContentMap({
    documentType: 'caseStudy',
    action: 'draft',
    _id: 'case-multi-client-operations-standardization',
    slug: { _type: 'slug', current: 'standardizing-multi-client-employee-transport-operations' },
    title: { en: 'Title', ar: 'عنوان' },
    excerpt: { en: 'Excerpt', ar: 'مقتطف' },
    clientName: { en: 'Client', ar: 'العميل' },
    industry: { en: 'Industry', ar: 'الصناعة' },
    location: { en: 'Cairo', ar: 'القاهرة' },
    challenge: { en: richTextBlock('Challenge', 'challenge-en'), ar: richTextBlock('التحدي', 'challenge-ar') },
    solution: { en: richTextBlock('Solution', 'solution-en'), ar: richTextBlock('الحل', 'solution-ar') },
    results: { en: richTextBlock('Results', 'results-en'), ar: richTextBlock('النتائج', 'results-ar') },
    metrics: [],
    testimonial: {
      quote: { en: 'Quote', ar: 'اقتباس' },
      author: { en: 'Author', ar: 'الكاتب' },
      role: { en: 'Role', ar: 'الدور' },
    },
    categorySlugs: ['operations-transformation', 'finance-control'],
    publishedAt: '2026-05-01T09:00:00.000Z',
    featured: true,
    seo: {
      metaTitle: { en: 'Title', ar: 'عنوان' },
      metaDescription: { en: 'Description', ar: 'وصف' },
    },
  } as any)

  const result = await validateContentMapWithSanity(contentMap)

  assert.equal(result.valid, true)
  assert.deepEqual(
    result.resolvedCaseStudyCategoryReferences?.map((item) => ({
      slug: item.slug,
      id: item._id,
      type: item._type,
    })),
    [
      {
        slug: 'operations-transformation',
        id: 'case-category-operations-transformation',
        type: 'caseStudyCategory',
      },
      {
        slug: 'finance-control',
        id: 'case-category-finance-control',
        type: 'caseStudyCategory',
      },
    ],
  )
})

test('buildDraftPlan maps case study categories to references and targets draft ids', async () => {
  const contentMap = normalizeContentMap({
    documentType: 'caseStudy',
    action: 'draft',
    _id: 'case-multi-client-operations-standardization',
    slug: { _type: 'slug', current: 'standardizing-multi-client-employee-transport-operations' },
    title: { en: 'Title', ar: 'عنوان' },
    excerpt: { en: 'Excerpt', ar: 'مقتطف' },
    clientName: { en: 'Client', ar: 'العميل' },
    industry: { en: 'Industry', ar: 'الصناعة' },
    location: { en: 'Cairo', ar: 'القاهرة' },
    challenge: { en: richTextBlock('Challenge', 'challenge-en-2'), ar: richTextBlock('التحدي', 'challenge-ar-2') },
    solution: { en: richTextBlock('Solution', 'solution-en-2'), ar: richTextBlock('الحل', 'solution-ar-2') },
    results: { en: richTextBlock('Results', 'results-en-2'), ar: richTextBlock('النتائج', 'results-ar-2') },
    metrics: [],
    testimonial: {
      quote: { en: 'Quote', ar: 'اقتباس' },
      author: { en: 'Author', ar: 'الكاتب' },
      role: { en: 'Role', ar: 'الدور' },
    },
    categorySlugs: ['operations-transformation', 'finance-control'],
    publishedAt: '2026-05-01T09:00:00.000Z',
    featured: true,
    seo: {
      metaTitle: { en: 'Title', ar: 'عنوان' },
      metaDescription: { en: 'Description', ar: 'وصف' },
    },
  } as any)

  const resolvedCaseStudyCategoryReferences = await resolveCaseStudyCategorySlugs(contentMap)
  const result = buildDraftPlan({
    pageKey: 'caseStudy',
    action: 'draft',
    document: {
      _id: 'case-multi-client-operations-standardization',
      _type: 'caseStudy',
    },
    contentMap,
    resolvedCaseStudyCategoryReferences,
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.equal(result.documentId, 'drafts.case-multi-client-operations-standardization')
    assert.deepEqual(result.patch.categories, [
      {
        _key: 'case-category-operations-transformation',
        _type: 'reference',
        _ref: 'case-category-operations-transformation',
      },
      {
        _key: 'case-category-finance-control',
        _type: 'reference',
        _ref: 'case-category-finance-control',
      },
    ])
  }
})
