import test from 'node:test'
import assert from 'node:assert/strict'

const loadContentOps = async () => {
  try {
    return await import('../src/content-ops.js')
  } catch {
    return null
  }
}

test('validateContentMap flags missing localized SEO and CTA fields', async () => {
  const mod = await loadContentOps()

  assert.ok(mod, 'expected content-ops module to exist')
  assert.equal(typeof mod.validateContentMap, 'function', 'expected validateContentMap export')

  const result = mod.validateContentMap({
    pageKey: 'homepage',
    action: 'draft',
    hero: {
      title: { en: 'Transport operations platform', ar: 'منصة تشغيل النقل' },
      titleHighlight: { en: 'for enterprises', ar: 'للمؤسسات' },
      subtitle: { en: 'Plan, assign, track, and optimize.', ar: '' },
      primaryCta: { text: { en: '', ar: 'ابدأ الآن' }, href: '/trial' },
      secondaryCta: { text: { en: 'Explore solutions', ar: 'استكشف الحلول' }, href: '/solutions' }
    },
    overview: {
      heading: { en: 'One operating layer', ar: 'طبقة تشغيل موحدة' },
      subtitle: { en: 'Visibility across fleets and operators.', ar: 'رؤية عبر الأساطيل والمشغلين.' },
      features: []
    },
    featureTabs: {
      heading: { en: 'Built for real transport operations', ar: 'مصمم لتشغيل النقل الفعلي' },
      subtitle: { en: 'Coordinate finance, dispatch, and performance.', ar: 'نسق التمويل والتشغيل والأداء.' },
      tabs: []
    },
    screenshotCarousel: {
      heading: { en: 'Product views', ar: 'واجهات المنتج' },
      subtitle: { en: 'Show the full platform.', ar: 'اعرض المنصة كاملة.' },
      notes: ['Keep this as planning-only guidance for editors.'],
      items: []
    },
    cta: {
      heading: { en: 'Launch Tranzkit', ar: 'ابدأ ترانزكيت' },
      subtitle: { en: 'Move from fragmented transport tools to one system.', ar: 'انتقل من أدوات نقل مجزأة إلى نظام واحد.' },
      primaryCta: { text: { en: '', ar: 'احجز عرضاً' }, href: '/trial' },
      secondaryCta: { text: { en: 'Talk to sales', ar: '' }, href: '/contact' }
    },
    seo: {
      metaTitle: { en: '', ar: 'ترانزكيت | منصة تشغيل النقل' },
      metaDescription: { en: 'Plan employee transport, track fleets, and manage operators.', ar: '' }
    }
  })

  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /hero\.subtitle\.ar/)
  assert.match(result.errors.join('\n'), /hero\.primaryCta\.text\.en/)
  assert.match(result.errors.join('\n'), /cta\.primaryCta\.text\.en/)
  assert.match(result.errors.join('\n'), /cta\.secondaryCta\.text\.ar/)
  assert.match(result.errors.join('\n'), /seo\.metaTitle\.en/)
  assert.match(result.errors.join('\n'), /seo\.metaDescription\.ar/)
})

test('buildDraftPlan blocks publish and only targets draft ids', async () => {
  const mod = await loadContentOps()

  assert.ok(mod, 'expected content-ops module to exist')
  assert.equal(typeof mod.buildDraftPlan, 'function', 'expected buildDraftPlan export')

  const publishBlocked = mod.buildDraftPlan({
    pageKey: 'homepage',
    action: 'publish',
    document: {
      _id: 'homePageSingleton',
      _type: 'homePage'
    },
    contentMap: {
      pageKey: 'homepage',
      action: 'publish',
      hero: {
        title: { en: 'x', ar: 'x' },
        titleHighlight: { en: 'y', ar: 'y' },
        subtitle: { en: 'z', ar: 'z' },
        primaryCta: { text: { en: 'Try it', ar: 'جربه' }, href: '/trial' },
        secondaryCta: { text: { en: 'Learn more', ar: 'اعرف المزيد' }, href: '/solutions' }
      },
      overview: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, features: [] },
      featureTabs: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, tabs: [] },
      screenshotCarousel: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, items: [] },
      cta: {
        heading: { en: 'h', ar: 'h' },
        subtitle: { en: 's', ar: 's' },
        primaryCta: { text: { en: 'Talk to us', ar: 'تحدث معنا' }, href: '/contact' },
        secondaryCta: { text: { en: 'Start trial', ar: 'ابدأ التجربة' }, href: '/trial' }
      },
      seo: {
        metaTitle: { en: 'Title', ar: 'عنوان' },
        metaDescription: { en: 'Description', ar: 'وصف' }
      }
    }
  })

  assert.equal(publishBlocked.ok, false)
  assert.match(publishBlocked.message, /Publishing is disabled in phase one/)

  const draftOnly = mod.buildDraftPlan({
    pageKey: 'homepage',
    action: 'draft',
    document: {
      _id: 'homePageSingleton',
      _type: 'homePage'
    },
    contentMap: {
      pageKey: 'homepage',
      action: 'draft',
      hero: {
        title: { en: 'x', ar: 'x' },
        titleHighlight: { en: 'y', ar: 'y' },
        subtitle: { en: 'z', ar: 'z' },
        primaryCta: { text: { en: 'Try it', ar: 'جربه' }, href: '/trial' },
        secondaryCta: { text: { en: 'Learn more', ar: 'اعرف المزيد' }, href: '/solutions' }
      },
      overview: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, features: [] },
      featureTabs: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, tabs: [] },
      screenshotCarousel: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, items: [] },
      cta: {
        heading: { en: 'h', ar: 'h' },
        subtitle: { en: 's', ar: 's' },
        primaryCta: { text: { en: 'Talk to us', ar: 'تحدث معنا' }, href: '/contact' },
        secondaryCta: { text: { en: 'Start trial', ar: 'ابدأ التجربة' }, href: '/trial' }
      },
      seo: {
        metaTitle: { en: 'Title', ar: 'عنوان' },
        metaDescription: { en: 'Description', ar: 'وصف' }
      }
    }
  })

  assert.equal(draftOnly.ok, true)
  assert.equal(draftOnly.documentId, 'drafts.homePageSingleton')
  assert.equal(draftOnly.operations[0].type, 'createIfNotExists')
  assert.equal(draftOnly.operations[0].document._id, 'drafts.homePageSingleton')
  assert.equal(draftOnly.operations[1].type, 'patch')
  assert.equal(draftOnly.operations[1].id, 'drafts.homePageSingleton')
})

test('buildDraftPlan reports planning-only screenshot notes warning once', async () => {
  const mod = await loadContentOps()

  assert.ok(mod, 'expected content-ops module to exist')
  assert.equal(typeof mod.buildDraftPlan, 'function', 'expected buildDraftPlan export')

  const result = mod.buildDraftPlan({
    pageKey: 'homepage',
    action: 'draft',
    document: {
      _id: 'homePage',
      _type: 'homePage'
    },
    contentMap: {
      pageKey: 'homepage',
      action: 'draft',
      hero: {
        title: { en: 'x', ar: 'x' },
        titleHighlight: { en: 'y', ar: 'y' },
        subtitle: { en: 'z', ar: 'z' },
        primaryCta: { text: { en: 'Try it', ar: 'جربه' }, href: '/trial' },
        secondaryCta: { text: { en: 'Learn more', ar: 'اعرف المزيد' }, href: '/solutions' }
      },
      overview: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, features: [] },
      featureTabs: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, tabs: [] },
      screenshotCarousel: {
        heading: { en: 'h', ar: 'h' },
        subtitle: { en: 's', ar: 's' },
        notes: ['planning only'],
        items: []
      },
      cta: {
        heading: { en: 'h', ar: 'h' },
        subtitle: { en: 's', ar: 's' },
        primaryCta: { text: { en: 'Talk to us', ar: 'تحدث معنا' }, href: '/contact' },
        secondaryCta: { text: { en: 'Start trial', ar: 'ابدأ التجربة' }, href: '/trial' }
      },
      seo: {
        metaTitle: { en: 'Title', ar: 'عنوان' },
        metaDescription: { en: 'Description', ar: 'وصف' }
      }
    }
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.warnings, [
      'screenshotCarousel.notes is planning-only and will not be written to Sanity.'
    ])
  }
})

test('buildDraftPlan preserves keyed array item images and seo ogImage when omitted from content map', async () => {
  const mod = await loadContentOps()

  assert.ok(mod, 'expected content-ops module to exist')
  assert.equal(typeof mod.buildDraftPlan, 'function', 'expected buildDraftPlan export')

  const result = mod.buildDraftPlan({
    pageKey: 'homepage',
    action: 'draft',
    document: {
      _id: 'homePage',
      _type: 'homePage'
    },
    existingDocumentContent: {
      featureTabs: {
        tabs: [
          {
            _key: 'tab-1',
            label: { en: 'Existing', ar: 'حالي' },
            image: {
              _type: 'image',
              asset: { _ref: 'image-existing-tab-1' }
            }
          }
        ]
      },
      seo: {
        ogImage: {
          _type: 'image',
          asset: { _ref: 'image-existing-og' }
        }
      }
    },
    contentMap: {
      pageKey: 'homepage',
      action: 'draft',
      hero: {
        title: { en: 'x', ar: 'x' },
        titleHighlight: { en: 'y', ar: 'y' },
        subtitle: { en: 'z', ar: 'z' },
        primaryCta: { text: { en: 'Try it', ar: 'جربه' }, href: '/trial' },
        secondaryCta: { text: { en: 'Learn more', ar: 'اعرف المزيد' }, href: '/solutions' }
      },
      overview: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, features: [] },
      featureTabs: {
        heading: { en: 'h', ar: 'h' },
        subtitle: { en: 's', ar: 's' },
        tabs: [
          {
            _key: 'tab-1',
            label: { en: 'Updated', ar: 'محدث' },
            title: { en: 'Tab', ar: 'علامة' },
            description: { en: 'Desc', ar: 'وصف' },
            features: []
          }
        ]
      },
      screenshotCarousel: { heading: { en: 'h', ar: 'h' }, subtitle: { en: 's', ar: 's' }, items: [] },
      cta: {
        heading: { en: 'h', ar: 'h' },
        subtitle: { en: 's', ar: 's' },
        primaryCta: { text: { en: 'Talk to us', ar: 'تحدث معنا' }, href: '/contact' },
        secondaryCta: { text: { en: 'Start trial', ar: 'ابدأ التجربة' }, href: '/trial' }
      },
      seo: {
        metaTitle: { en: 'Title', ar: 'عنوان' },
        metaDescription: { en: 'Description', ar: 'وصف' }
      }
    }
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.featureTabs.tabs[0].image, {
      _type: 'image',
      asset: { _ref: 'image-existing-tab-1' }
    })
    assert.deepEqual(result.patch.seo.ogImage, {
      _type: 'image',
      asset: { _ref: 'image-existing-og' }
    })
  }
})

test('buildDraftPlan preserves existing app screenshots when omitted and maps app platforms as an object', async () => {
  const mod = await loadContentOps()

  assert.ok(mod, 'expected content-ops module to exist')
  assert.equal(typeof mod.buildDraftPlan, 'function', 'expected buildDraftPlan export')

  const result = mod.buildDraftPlan({
    pageKey: 'appDetail',
    action: 'draft',
    document: {
      _id: 'app-driver',
      _type: 'app'
    },
    existingDocumentContent: {
      screenshots: [
        {
          _key: 'driver-screen-1',
          _type: 'image',
          asset: { _ref: 'image-existing-driver-1', _type: 'reference' }
        }
      ],
      platforms: {
        ios: true,
        android: true,
        web: false
      }
    },
    contentMap: {
      pageKey: 'appDetail',
      action: 'draft',
      slug: 'driver',
      name: { en: 'Driver App', ar: 'تطبيق السائق' },
      tagline: { en: 'Run trips with clarity', ar: 'نفذ الرحلات بوضوح' },
      description: { en: 'Manage assigned trips.', ar: 'أدر الرحلات المخصصة.' },
      category: 'operators',
      layoutType: 'portrait',
      benefits: [
        { en: 'Assigned trips', ar: 'رحلات مخصصة' },
        { en: 'Live updates', ar: 'تحديثات مباشرة' }
      ],
      platforms: {
        ios: true,
        android: true,
        web: false
      },
      cta: {
        heading: { en: 'See the driver workflow', ar: 'اكتشف سير عمل السائق' },
        subtitle: { en: 'Follow routes and actions.', ar: 'تابع الخطوط والإجراءات.' },
        primaryCta: { text: { en: 'Book a demo', ar: 'احجز عرضاً' }, href: '/contact' },
        secondaryCta: { text: { en: 'Talk to the team', ar: 'تحدث مع الفريق' }, href: '/contact' }
      },
      seo: {
        metaTitle: { en: 'Driver app | Tranzkit', ar: 'تطبيق السائق | ترانزكيت' },
        metaDescription: { en: 'Manage assigned trips.', ar: 'أدر الرحلات المخصصة.' }
      }
    }
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.platforms, {
      ios: true,
      android: true,
      web: false
    })
    assert.deepEqual(result.patch.screenshots, [
      {
        _key: 'driver-screen-1',
        _type: 'image',
        asset: { _ref: 'image-existing-driver-1', _type: 'reference' }
      }
    ])
  }
})
