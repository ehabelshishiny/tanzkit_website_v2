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
  pageKey: 'solutionsOperatorsDrivers',
  action: 'draft',
  hero: {
    title: { en: 'Run employee transport operations with tighter control from assignment to settlement', ar: 'شغّل نقل الموظفين بتحكم أدق من التخصيص حتى التسوية' },
    subtitle: { en: 'Manage routes, schedules, driver and vehicle assignments, live service, field execution, and supplier-linked finance through one connected operating platform.', ar: 'أدر الخطوط والجداول وتوزيع السائقين والمركبات والخدمة المباشرة والتنفيذ الميداني والمستحقات المرتبطة بالموردين من خلال منصة تشغيل مترابطة واحدة.' },
    cta: { en: 'Start an operator control walkthrough', ar: 'ابدأ جولة على تحكم المشغل' },
  },
  overview: {
    text: { en: 'Overview', ar: 'نظرة عامة' },
  },
  roleSwitcher: {
    tabs: {
      operator: { en: 'Operators', ar: 'المشغلون' },
      driver: { en: 'Drivers', ar: 'السائقون' },
    },
    operator: {
      title: { en: 'Operator title', ar: 'عنوان المشغل' },
      description: { en: 'Operator description', ar: 'وصف المشغل' },
      features: [],
    },
    driver: {
      title: { en: 'Driver title', ar: 'عنوان السائق' },
      description: { en: 'Driver description', ar: 'وصف السائق' },
      features: [],
    },
  },
  timeline: {
    title: { en: 'Timeline', ar: 'الجدول' },
    subtitle: { en: 'Timeline subtitle', ar: 'وصف الجدول' },
    items: [],
  },
  dashboards: {
    title: { en: 'Dashboards', ar: 'اللوحات' },
    subtitle: { en: 'Dashboards subtitle', ar: 'وصف اللوحات' },
    screenshots: [],
  },
  mobileApps: {
    title: { en: 'Mobile apps', ar: 'تطبيقات الجوال' },
    subtitle: { en: 'Mobile subtitle', ar: 'وصف الجوال' },
    features: [],
  },
  features: {
    overview: { en: 'Features overview', ar: 'نظرة على الميزات' },
    title: { en: 'Features title', ar: 'عنوان الميزات' },
    items: [],
  },
  aiImpact: {
    title: { en: 'AI title', ar: 'عنوان الذكاء' },
    subtitle: { en: 'AI subtitle', ar: 'وصف الذكاء' },
    impactTitle: { en: 'Impact title', ar: 'عنوان الأثر' },
    metrics: [],
  },
  faq: {
    title: { en: 'FAQ', ar: 'الأسئلة' },
    subtitle: { en: 'FAQ subtitle', ar: 'وصف الأسئلة' },
    items: [],
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

test('validateContentMap accepts solutionsOperatorsDrivers content maps', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const result = mod.validateContentMap(contentMap)
  assert.equal(result.valid, true)
  assert.equal(result.pageKey, 'solutionsOperatorsDrivers')
})

test('buildDraftPlan targets drafts.solutionsOperatorsDriversPage for solutionsOperatorsDrivers', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const result = mod.buildDraftPlan({
    pageKey: 'solutionsOperatorsDrivers',
    action: 'draft',
    document: {
      _id: 'solutionsOperatorsDriversPage',
      _type: 'solutionsOperatorsDriversPage',
    },
    contentMap,
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.equal(result.documentId, 'drafts.solutionsOperatorsDriversPage')
    assert.equal(result.documentType, 'solutionsOperatorsDriversPage')
    assert.equal(result.operations[0].type, 'createIfNotExists')
    assert.equal(result.operations[1].type, 'patch')
    assert.deepEqual(result.patch.hero.title, contentMap.hero.title)
    assert.deepEqual(result.patch.seo.metaTitle, contentMap.seo.metaTitle)
  }
})

test('buildDraftPlan preserves existing dashboards screenshot image refs by _key', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const result = mod.buildDraftPlan({
    pageKey: 'solutionsOperatorsDrivers',
    action: 'draft',
    document: {
      _id: 'solutionsOperatorsDriversPage',
      _type: 'solutionsOperatorsDriversPage',
    },
    existingDocumentContent: {
      dashboards: {
        screenshots: [
          {
            _key: 'screen-1',
            title: { en: 'Existing', ar: 'حالي' },
            image: {
              _type: 'image',
              asset: { _ref: 'image-5e38be3163da8fe7d5459ec23cdb31adbc773cb9-2337x1452-png' },
            },
          },
        ],
      },
    },
    contentMap: {
      ...contentMap,
      dashboards: {
        title: { en: 'Dashboards', ar: 'اللوحات' },
        subtitle: { en: 'Dashboards subtitle', ar: 'وصف اللوحات' },
        screenshots: [
          {
            _key: 'screen-1',
            title: { en: 'Updated screenshot', ar: 'شاشة محدثة' },
            description: { en: 'Updated description', ar: 'وصف محدث' },
          },
        ],
      },
    },
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.dashboards.screenshots[0].image, {
      _type: 'image',
      asset: { _ref: 'image-5e38be3163da8fe7d5459ec23cdb31adbc773cb9-2337x1452-png' },
    })
  }
})

test('buildDraftPlan does not preserve screenshot image when content map provides a replacement', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const replacementImage = {
    _type: 'image',
    asset: { _ref: 'image-replacement' },
  }

  const result = mod.buildDraftPlan({
    pageKey: 'solutionsOperatorsDrivers',
    action: 'draft',
    document: {
      _id: 'solutionsOperatorsDriversPage',
      _type: 'solutionsOperatorsDriversPage',
    },
    existingDocumentContent: {
      dashboards: {
        screenshots: [
          {
            _key: 'screen-1',
            image: {
              _type: 'image',
              asset: { _ref: 'image-existing' },
            },
          },
        ],
      },
    },
    contentMap: {
      ...contentMap,
      dashboards: {
        title: { en: 'Dashboards', ar: 'اللوحات' },
        subtitle: { en: 'Dashboards subtitle', ar: 'وصف اللوحات' },
        screenshots: [
          {
            _key: 'screen-1',
            title: { en: 'Updated screenshot', ar: 'شاشة محدثة' },
            description: { en: 'Updated description', ar: 'وصف محدث' },
            image: replacementImage,
          },
        ],
      },
    },
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.dashboards.screenshots[0].image, replacementImage)
  }
})

test('buildDraftPlan preserves existing screenshot image refs by array position when legacy keys differ', async () => {
  const mod = await loadContentOps()
  assert.ok(mod)

  const result = mod.buildDraftPlan({
    pageKey: 'solutionsOperatorsDrivers',
    action: 'draft',
    document: {
      _id: 'solutionsOperatorsDriversPage',
      _type: 'solutionsOperatorsDriversPage',
    },
    existingDocumentContent: {
      dashboards: {
        screenshots: [
          {
            _key: 'legacy-screen-1',
            image: {
              _type: 'image',
              asset: { _ref: 'image-existing-legacy' },
            },
          },
        ],
      },
    },
    contentMap: {
      ...contentMap,
      dashboards: {
        title: { en: 'Dashboards', ar: 'اللوحات' },
        subtitle: { en: 'Dashboards subtitle', ar: 'وصف اللوحات' },
        screenshots: [
          {
            _key: 'screen-1',
            title: { en: 'Updated screenshot', ar: 'شاشة محدثة' },
            description: { en: 'Updated description', ar: 'وصف محدث' },
          },
        ],
      },
    },
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.dashboards.screenshots[0].image, {
      _type: 'image',
      asset: { _ref: 'image-existing-legacy' },
    })
  }
})
