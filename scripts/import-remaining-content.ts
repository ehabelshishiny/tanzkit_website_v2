import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

config({ path: resolve(__dirname, '../.env.local') })

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!token) throw new Error('Missing SANITY_API_TOKEN')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-10',
  useCdn: false,
  token,
})

import * as pagesSettingsModule from './content-pack/pages-settings'
import * as resourcesTaxonomyModule from './content-pack/resources-taxonomy'
import * as collectionsModule from './content-pack/collections'

type AnyDoc = Record<string, any>

const pagesSettingsPack = (pagesSettingsModule as any).pagesSettingsPack || {
  siteSettings: (pagesSettingsModule as any).siteSettingsData,
  navigation: (pagesSettingsModule as any).navigationData,
  aboutPage: (pagesSettingsModule as any).aboutPageData,
  contactPage: (pagesSettingsModule as any).contactPageData,
  pricingPage: (pagesSettingsModule as any).pricingPageData,
}

const resourcesTaxonomyPack = (resourcesTaxonomyModule as any).resourcesTaxonomyPack || {
  pages: [
    (resourcesTaxonomyModule as any).resourcesHubPageDoc,
    (resourcesTaxonomyModule as any).blogPageDoc,
    (resourcesTaxonomyModule as any).caseStudiesPageDoc,
    (resourcesTaxonomyModule as any).faqPageDoc,
    (resourcesTaxonomyModule as any).documentationPageDoc,
  ],
  authors: (resourcesTaxonomyModule as any).authorDocs || [],
  blogCategories: (resourcesTaxonomyModule as any).blogCategoryDocs || [],
  caseStudyCategories: (resourcesTaxonomyModule as any).caseStudyCategoryDocs || [],
  faqCategories: (resourcesTaxonomyModule as any).faqCategoryDocs || [],
}

const collectionsPack = (collectionsModule as any).collectionsPack || (collectionsModule as any).collectionSeeds || {
  blogPostSeeds: (collectionsModule as any).blogPostSeeds || [],
  caseStudySeeds: (collectionsModule as any).caseStudySeeds || [],
  faqItemSeeds: (collectionsModule as any).faqItemSeeds || [],
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function upsertPublished(doc: any) {
  await client.createOrReplace(doc)
  try { await client.delete(`drafts.${doc._id}`) } catch {}
}

async function upsertSingletons() {
  const pageByType = new Map<string, AnyDoc>((resourcesTaxonomyPack.pages || []).map((p: AnyDoc) => [p._type, p]))
  const singletonMap: Array<[string, string, AnyDoc]> = [
    ['siteSettings', 'siteSettings', pagesSettingsPack.siteSettings],
    ['navigation', 'navigation', pagesSettingsPack.navigation],
    ['aboutPage', 'aboutPage', pagesSettingsPack.aboutPage],
    ['contactPage', 'contactPage', pagesSettingsPack.contactPage],
    ['pricingPage', 'pricingPage', pagesSettingsPack.pricingPage],
    ['resourcesHubPage', 'resourcesHubPage', pageByType.get('resourcesHubPage') as AnyDoc],
    ['blogPage', 'blogPage', pageByType.get('blogPage') as AnyDoc],
    ['caseStudiesPage', 'caseStudiesPage', pageByType.get('caseStudiesPage') as AnyDoc],
    ['faqPage', 'faqPage', pageByType.get('faqPage') as AnyDoc],
    ['documentationPage', 'documentationPage', pageByType.get('documentationPage') as AnyDoc],
  ]

  for (const [id, type, data] of singletonMap) {
    await upsertPublished({ _id: id, _type: type, ...data })
  }
}

async function upsertTaxonomies() {
  const authorBySlug = new Map<string, string>()
  const blogCatBySlug = new Map<string, string>()
  const caseCatBySlug = new Map<string, string>()
  const faqCatBySlug = new Map<string, string>()

  for (const a of resourcesTaxonomyPack.authors) {
    const slug = a.slug?.current || slugify(a.name.en)
    const _id = a._id || `author-${slug}`
    await upsertPublished({ _id, _type: 'author', ...a, slug: { _type: 'slug', current: slug } })
    authorBySlug.set(slug, _id)
  }

  for (const c of resourcesTaxonomyPack.blogCategories) {
    const slug = c.slug?.current || slugify(c.name.en)
    const _id = c._id || `blog-category-${slug}`
    await upsertPublished({ _id, _type: 'blogCategory', ...c, slug: { _type: 'slug', current: slug } })
    blogCatBySlug.set(slug, _id)
  }

  for (const c of resourcesTaxonomyPack.caseStudyCategories) {
    const slug = c.slug?.current || slugify(c.name.en)
    const _id = c._id || `case-category-${slug}`
    await upsertPublished({ _id, _type: 'caseStudyCategory', ...c, slug: { _type: 'slug', current: slug } })
    caseCatBySlug.set(slug, _id)
  }

  for (const c of resourcesTaxonomyPack.faqCategories) {
    const slug = c.slug?.current || slugify(c.name.en)
    const _id = c._id || `faq-category-${slug}`
    await upsertPublished({ _id, _type: 'faqCategory', ...c, slug: { _type: 'slug', current: slug } })
    faqCatBySlug.set(slug, _id)
  }

  // Ensure every referenced author/category slug from seeded collections exists
  const seededBlogs = (collectionsPack.blogPostSeeds || []) as AnyDoc[]
  const seededCases = (collectionsPack.caseStudySeeds || []) as AnyDoc[]
  const seededFaqs = (collectionsPack.faqItemSeeds || []) as AnyDoc[]

  for (const post of seededBlogs) {
    const slug = post.authorSlug
    if (slug && !authorBySlug.has(slug)) {
      const _id = `author-${slug}`
      await upsertPublished({
        _id,
        _type: 'author',
        name: { en: 'Codefy Hub Editorial Team', ar: 'فريق التحرير في Codefy Hub' },
        slug: { _type: 'slug', current: slug },
        bio: {
          en: 'Editorial team covering employee transportation ERP, operations, and mobility governance.',
          ar: 'فريق تحريري يغطي ERP نقل الموظفين والتشغيل وحوكمة التنقل.',
        },
        role: { en: 'Editorial Team', ar: 'فريق التحرير' },
      })
      authorBySlug.set(slug, _id)
    }
  }

  for (const post of seededBlogs) {
    for (const slug of post.categorySlugs || []) {
      if (!blogCatBySlug.has(slug)) {
        const _id = `blog-category-${slug}`
        await upsertPublished({
          _id,
          _type: 'blogCategory',
          name: { en: slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()), ar: `تصنيف ${slug}` },
          slug: { _type: 'slug', current: slug },
          description: { en: 'Employee transportation insights.', ar: 'رؤى حول نقل الموظفين.' },
          color: '#3B82F6',
        })
        blogCatBySlug.set(slug, _id)
      }
    }
  }

  for (const cs of seededCases) {
    for (const slug of cs.categorySlugs || []) {
      if (!caseCatBySlug.has(slug)) {
        const _id = `case-category-${slug}`
        await upsertPublished({
          _id,
          _type: 'caseStudyCategory',
          name: { en: slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()), ar: `تصنيف ${slug}` },
          slug: { _type: 'slug', current: slug },
          description: { en: 'Case studies for employee transport operations.', ar: 'دراسات حالة لعمليات نقل الموظفين.' },
          color: '#10B981',
        })
        caseCatBySlug.set(slug, _id)
      }
    }
  }

  for (const f of seededFaqs) {
    const slug = f.categorySlug
    if (slug && !faqCatBySlug.has(slug)) {
      const _id = `faq-category-${slug}`
      await upsertPublished({
        _id,
        _type: 'faqCategory',
        name: { en: slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()), ar: `تصنيف ${slug}` },
        slug: { _type: 'slug', current: slug },
        description: { en: 'FAQ category for employee transportation.', ar: 'فئة أسئلة شائعة لنقل الموظفين.' },
        color: '#F59E0B',
      })
      faqCatBySlug.set(slug, _id)
    }
  }

  return { authorBySlug, blogCatBySlug, caseCatBySlug, faqCatBySlug }
}

async function upsertCollections(maps: { authorBySlug: Map<string, string>, blogCatBySlug: Map<string, string>, caseCatBySlug: Map<string, string>, faqCatBySlug: Map<string, string> }) {
  for (const p of collectionsPack.blogPostSeeds || []) {
    const slug = p.slug?.current || slugify(p.title.en)
    const _id = `blog-post-${slug}`
    const authorRef = maps.authorBySlug.get(p.authorSlug)
    const categoryRefs = (p.categorySlugs || []).map((s: string) => maps.blogCatBySlug.get(s)).filter(Boolean)

    await upsertPublished({
      _id,
      _type: 'blogPost',
      ...p,
      slug: { _type: 'slug', current: slug },
      author: authorRef ? { _type: 'reference', _ref: authorRef } : undefined,
      categories: categoryRefs.map((id: string) => ({ _type: 'reference', _ref: id })),
      status: 'published',
    })
  }

  for (const c of collectionsPack.caseStudySeeds || []) {
    const slug = c.slug?.current || slugify(c.title.en)
    const _id = `case-study-${slug}`
    const categoryRefs = (c.categorySlugs || []).map((s: string) => maps.caseCatBySlug.get(s)).filter(Boolean)

    await upsertPublished({
      _id,
      _type: 'caseStudy',
      ...c,
      slug: { _type: 'slug', current: slug },
      categories: categoryRefs.map((id: string) => ({ _type: 'reference', _ref: id })),
    })
  }

  for (let i = 0; i < (collectionsPack.faqItemSeeds || []).length; i++) {
    const f = collectionsPack.faqItemSeeds[i]
    const idStem = f.slug || slugify(f.question.en).slice(0, 72)
    const _id = `faq-item-${idStem}-${i + 1}`
    const categoryRef = maps.faqCatBySlug.get(f.categorySlug)

    await upsertPublished({
      _id,
      _type: 'faqItem',
      question: f.question,
      answer: f.answer,
      category: categoryRef ? { _type: 'reference', _ref: categoryRef } : undefined,
      tags: f.tags || [],
      order: f.order ?? i,
      isActive: true,
    })
  }
}

async function main() {
  console.log('Import remaining content started...')
  await upsertSingletons()
  const maps = await upsertTaxonomies()
  await upsertCollections(maps)

  const summary = await client.fetch(`{
    "singletons": {
      "siteSettings": defined(*[_id=="siteSettings"][0]._id),
      "navigation": defined(*[_id=="navigation"][0]._id),
      "aboutPage": defined(*[_id=="aboutPage"][0]._id),
      "contactPage": defined(*[_id=="contactPage"][0]._id),
      "pricingPage": defined(*[_id=="pricingPage"][0]._id),
      "resourcesHubPage": defined(*[_id=="resourcesHubPage"][0]._id),
      "blogPage": defined(*[_id=="blogPage"][0]._id),
      "caseStudiesPage": defined(*[_id=="caseStudiesPage"][0]._id),
      "faqPage": defined(*[_id=="faqPage"][0]._id),
      "documentationPage": defined(*[_id=="documentationPage"][0]._id)
    },
    "counts": {
      "authors": count(*[_type=="author"]),
      "blogCategories": count(*[_type=="blogCategory"]),
      "caseStudyCategories": count(*[_type=="caseStudyCategory"]),
      "faqCategories": count(*[_type=="faqCategory"]),
      "blogPosts": count(*[_type=="blogPost" && status=="published"]),
      "caseStudies": count(*[_type=="caseStudy"]),
      "faqItems": count(*[_type=="faqItem" && isActive==true])
    }
  }`)

  console.log(JSON.stringify(summary, null, 2))
  console.log('Import remaining content done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
