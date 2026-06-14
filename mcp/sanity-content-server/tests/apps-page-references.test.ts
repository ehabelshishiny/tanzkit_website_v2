import test from 'node:test'
import assert from 'node:assert/strict'

import { buildDraftPlan } from '../src/content-ops.js'
import {
  resolveAppsPageReferenceSlugs,
  validateContentMapWithSanity,
} from '../src/sanity.js'

const appsPageContentMap = {
  pageKey: 'apps',
  action: 'draft',
  hero: {
    titlePart1: { en: 'Connected', ar: 'تطبيقات نقل' },
    titlePart2: { en: 'transport apps', ar: 'مترابطة' },
    titlePart3: { en: 'for every role', ar: 'لكل دور' },
    subtitle: {
      en: 'Give enterprises, operators, supervisors, drivers, and riders the right workflow for planning, assignments, daily execution, live service visibility, and trip experience in one bilingual platform.',
      ar: 'امنح الشركات والمشغلين والمشرفين والسائقين والركاب سير العمل المناسب للتخطيط، والتخصيص، والتشغيل اليومي، ومتابعة الخدمة، وتجربة الرحلة داخل منصة واحدة بالإنجليزية والعربية.',
    },
  },
  showcase: {
    title: {
      en: 'Apps connected around one transport operation',
      ar: 'تطبيقات مترابطة داخل عملية نقل واحدة',
    },
    subtitle: {
      en: 'Choose the side of the operation you manage to see the dashboards and mobile workflows that keep planning, execution, and service visibility aligned.',
      ar: 'اختر جانب التشغيل الذي تديره لتتعرف على اللوحات والتطبيقات الميدانية التي تربط التخطيط بالتنفيذ ومتابعة مستوى الخدمة.',
    },
    operatorsSegment: {
      title: {
        en: 'Operator control and field execution',
        ar: 'تحكم المشغل والتنفيذ الميداني',
      },
      description: {
        en: 'Run routes, schedules, assignments, drivers, vehicles, supervisors, and trip status from connected web and mobile workflows.',
        ar: 'أدر الخطوط والجداول والتخصيصات والسائقين والمركبات والمشرفين وحالة الرحلات من خلال لوحات وتطبيقات مترابطة.',
      },
      tabLabel: {
        en: 'Operators',
        ar: 'المشغلون',
      },
    },
    enterpriseSegment: {
      title: {
        en: 'Enterprise planning and rider experience',
        ar: 'تخطيط الشركة وتجربة الراكب',
      },
      description: {
        en: 'Plan employee transportation demand, review service delivery, and give riders clear trip visibility through one connected service model.',
        ar: 'خطط طلب نقل الموظفين، وراجع تنفيذ الخدمة، وامنح الركاب وضوحًا أفضل حول رحلاتهم ضمن نموذج خدمة مترابط.',
      },
      tabLabel: {
        en: 'Enterprise',
        ar: 'الشركات',
      },
    },
    operatorAppSlugs: ['operator-dashboard', 'supervisor', 'driver'],
    enterpriseAppSlugs: ['enterprise-dashboard', 'rider'],
  },
  cta: {
    heading: {
      en: 'See which Tranzkit apps fit your transport operation',
      ar: 'اكتشف تطبيقات ترانزكيت المناسبة لعملية النقل لديك',
    },
    subtitle: {
      en: 'We help you connect enterprise control, operator execution, supervisor oversight, driver workflows, and rider experience in one rollout.',
      ar: 'نساعدك على ربط تحكم الشركة، وتشغيل المشغلين، وإشراف الميدان، وسير عمل السائقين، وتجربة الركاب ضمن إطلاق واحد مترابط.',
    },
    primaryCta: {
      text: { en: 'Book an apps walkthrough', ar: 'احجز جولة على التطبيقات' },
      href: '/contact',
      openInNewTab: false,
    },
    secondaryCta: {
      text: { en: 'Talk to the team', ar: 'تحدث مع الفريق' },
      href: '/contact',
      openInNewTab: false,
    },
  },
  seo: {
    metaTitle: {
      en: 'Employee transport app ecosystem for enterprises and operators | Tranzkit',
      ar: 'منظومة تطبيقات نقل الموظفين للشركات والمشغلين | ترانزكيت',
    },
    metaDescription: {
      en: 'Explore the connected Tranzkit app ecosystem for enterprise control, operator execution, supervisor oversight, driver workflows, and rider trip visibility.',
      ar: 'استكشف منظومة تطبيقات ترانزكيت المترابطة لتحكم الشركات، وتشغيل المشغلين، وإشراف الميدان، وسير عمل السائقين، ورؤية الركاب في نقل الموظفين.',
    },
    keywords: [
      'employee transport apps',
      'transport app ecosystem',
      'operator dashboard',
      'enterprise transport dashboard',
      'driver app',
      'supervisor app',
      'rider app',
      'Tranzkit',
    ],
  },
}

test('resolveAppsPageReferenceSlugs resolves supported app slugs to existing app documents', async () => {
  const result = await resolveAppsPageReferenceSlugs(appsPageContentMap)

  assert.deepEqual(
    result.operatorApps.map((app) => ({ slug: app.slug, id: app._id, type: app._type })),
    [
      { slug: 'operator-dashboard', id: 'app-operator-dashboard', type: 'app' },
      { slug: 'supervisor', id: 'app-supervisor', type: 'app' },
      { slug: 'driver', id: 'app-driver', type: 'app' },
    ],
  )
  assert.deepEqual(
    result.enterpriseApps.map((app) => ({ slug: app.slug, id: app._id, type: app._type })),
    [
      { slug: 'enterprise-dashboard', id: 'app-enterprise-dashboard', type: 'app' },
      { slug: 'rider', id: 'app-rider', type: 'app' },
    ],
  )
})

test('validateContentMapWithSanity fails when an apps page slug does not resolve', async () => {
  const result = await validateContentMapWithSanity({
    ...appsPageContentMap,
    showcase: {
      ...appsPageContentMap.showcase,
      operatorAppSlugs: ['operator-dashboard', 'missing-app'],
    },
  })

  assert.equal(result.valid, false)
  assert.match(result.errors.join('\n'), /missing-app/)
})

test('buildDraftPlan maps operatorApps reference array from resolved slugs', async () => {
  const resolvedAppsPageReferences = await resolveAppsPageReferenceSlugs(appsPageContentMap)
  const result = buildDraftPlan({
    pageKey: 'apps',
    action: 'draft',
    document: {
      _id: 'appsPage',
      _type: 'appsPage',
    },
    contentMap: appsPageContentMap,
    resolvedAppsPageReferences,
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.showcase.operatorApps, [
      { _key: 'operator-app-operator-dashboard', _type: 'reference', _ref: 'app-operator-dashboard' },
      { _key: 'operator-app-supervisor', _type: 'reference', _ref: 'app-supervisor' },
      { _key: 'operator-app-driver', _type: 'reference', _ref: 'app-driver' },
    ])
  }
})

test('buildDraftPlan maps enterpriseApps reference array from resolved slugs', async () => {
  const resolvedAppsPageReferences = await resolveAppsPageReferenceSlugs(appsPageContentMap)
  const result = buildDraftPlan({
    pageKey: 'apps',
    action: 'draft',
    document: {
      _id: 'appsPage',
      _type: 'appsPage',
    },
    contentMap: appsPageContentMap,
    resolvedAppsPageReferences,
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.deepEqual(result.patch.showcase.enterpriseApps, [
      {
        _key: 'enterprise-app-enterprise-dashboard',
        _type: 'reference',
        _ref: 'app-enterprise-dashboard',
      },
      { _key: 'enterprise-app-rider', _type: 'reference', _ref: 'app-rider' },
    ])
  }
})
