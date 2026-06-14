import test from 'node:test'
import assert from 'node:assert/strict'

const loadContentOps = async () => {
  try {
    return await import('../src/content-ops.js')
  } catch {
    return null
  }
}

const contentMap = {
  pageKey: 'solutionsEnterprisesPassengers',
  action: 'draft',
  hero: {
    title: { en: 'Hero', ar: 'عنوان' },
    subtitle: { en: 'Subtitle', ar: 'وصف' },
    cta: { en: 'CTA', ar: 'زر' },
  },
  audienceSwitcher: {
    tabs: {
      enterprise: { en: 'Enterprise', ar: 'الشركة' },
      passenger: { en: 'Passenger', ar: 'الراكب' },
    },
    enterprise: {
      title: { en: 'Enterprise title', ar: 'عنوان الشركة' },
      description: { en: 'Enterprise description', ar: 'وصف الشركة' },
      features: [],
    },
    passenger: {
      title: { en: 'Passenger title', ar: 'عنوان الراكب' },
      description: { en: 'Passenger description', ar: 'وصف الراكب' },
      features: [],
    },
  },
  overview: {
    text: { en: 'Overview', ar: 'نظرة عامة' },
  },
  featureShowcase: {
    title: { en: 'Feature showcase', ar: 'القدرات' },
    subtitle: { en: 'Feature subtitle', ar: 'وصف القدرات' },
    features: [],
  },
  workflow: {
    enterprise: {
      title: { en: 'Enterprise workflow', ar: 'مسار الشركة' },
      subtitle: { en: 'Enterprise workflow subtitle', ar: 'وصف مسار الشركة' },
      steps: [],
    },
    passenger: {
      title: { en: 'Passenger workflow', ar: 'مسار الراكب' },
      subtitle: { en: 'Passenger workflow subtitle', ar: 'وصف مسار الراكب' },
      steps: [],
    },
  },
  appScreens: {
    title: { en: 'App screens', ar: 'الشاشات' },
    subtitle: { en: 'App screens subtitle', ar: 'وصف الشاشات' },
    screenshots: [],
  },
  features: {
    overview: { en: 'Features overview', ar: 'نظرة الميزات' },
    title: { en: 'Features title', ar: 'عنوان الميزات' },
    items: [],
  },
  testimonials: {
    title: { en: 'Testimonials', ar: 'النتائج' },
    subtitle: { en: 'Testimonials subtitle', ar: 'وصف النتائج' },
    items: [],
  },
  aiImpact: {
    title: { en: 'AI title', ar: 'عنوان الذكاء' },
    subtitle: { en: 'AI subtitle', ar: 'وصف الذكاء' },
    impactTitle: { en: 'Impact title', ar: 'عنوان الأثر' },
    metrics: [],
  },
  cta: {
    heading: { en: 'CTA heading', ar: 'عنوان الدعوة' },
    subtitle: { en: 'CTA subtitle', ar: 'وصف الدعوة' },
    primaryCta: { text: { en: 'Primary', ar: 'أساسي' }, href: '/contact', openInNewTab: false },
    secondaryCta: { text: { en: 'Secondary', ar: 'ثانوي' }, href: '/contact', openInNewTab: false },
  },
  seo: {
    metaTitle: { en: 'SEO title', ar: 'عنوان السيو' },
    metaDescription: { en: 'SEO description', ar: 'وصف السيو' },
    keywords: ['one', 'two'],
  },
}

test('validateContentMap accepts solutionsEnterprisesPassengers content maps', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const result = mod.validateContentMap(contentMap)
  assert.equal(result.valid, true)
  assert.equal(result.pageKey, 'solutionsEnterprisesPassengers')
})

test('buildDraftPlan targets drafts.solutionsEnterprisesPassengersPage', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const result = mod.buildDraftPlan({
    pageKey: 'solutionsEnterprisesPassengers',
    action: 'draft',
    document: {
      _id: 'solutionsEnterprisesPassengersPage',
      _type: 'solutionsEnterprisesPassengersPage',
    },
    contentMap,
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.equal(result.documentId, 'drafts.solutionsEnterprisesPassengersPage')
    assert.equal(result.documentType, 'solutionsEnterprisesPassengersPage')
    assert.equal(result.operations[0].type, 'createIfNotExists')
    assert.equal(result.operations[1].type, 'patch')
    assert.deepEqual(result.patch.hero.title, contentMap.hero.title)
    assert.deepEqual(result.patch.seo.metaTitle, contentMap.seo.metaTitle)
  }
})
