import { createClient, type SanityClient } from '@sanity/client'
import {
  normalizeContentMap,
  type ResolvedCaseStudyCategoryReference,
  validateContentMap,
  type ContentMap,
  type ResolvedAppsPageReferences,
  type ValidationResult,
} from './content-ops.js'
import {
  QUERY_INSPECTION_MAP,
  getDefaultDocumentId,
  type SupportedPageKey,
} from './definitions.js'
import { assertCoreSanityEnv, getSanityEnv } from './env.js'

type ResolveDocumentArgs = {
  pageKey: SupportedPageKey
  slug?: string
}

type ResolvedDocument = {
  documentId: string
  draftId: string
  documentType: string
  publishedDocumentId: string | null
  hasDraft: boolean
}

type ReadPageArgs = {
  pageKey: SupportedPageKey
  slug?: string
  includeDraft?: boolean
}

function createBaseClient(
  token?: string,
  perspective: 'published' | 'raw' = 'published',
) {
  const env = assertCoreSanityEnv()

  return createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: false,
    token,
    perspective,
  })
}

export function createReadClient(includeDraft = false) {
  const env = getSanityEnv()
  return createBaseClient(env.readToken, includeDraft ? 'raw' : 'published')
}

export function createWriteClient() {
  const env = getSanityEnv()

  if (!env.writeToken) {
    throw new Error('SANITY_API_WRITE_TOKEN is required for draft writes.')
  }

  return createBaseClient(env.writeToken)
}

function singletonQuery(documentType: string, includeDraft: boolean) {
  if (includeDraft) {
    return `coalesce(*[_id == $draftId][0], *[_type == $documentType && !(_id in path("drafts.**"))][0])`
  }

  return `*[_type == $documentType && !(_id in path("drafts.**"))][0]`
}

function appDetailQuery(includeDraft: boolean) {
  if (includeDraft) {
    return `coalesce(*[_id == $draftId][0], *[_type == "app" && slug.current == $slug && !(_id in path("drafts.**"))][0])`
  }

  return `*[_type == "app" && slug.current == $slug && !(_id in path("drafts.**"))][0]`
}

function slugDocumentQuery(documentType: string, includeDraft: boolean) {
  if (includeDraft) {
    return `coalesce(*[_id == $draftId][0], *[_type == $documentType && slug.current == $slug && !(_id in path("drafts.**"))][0])`
  }

  return `*[_type == $documentType && slug.current == $slug && !(_id in path("drafts.**"))][0]`
}

export async function resolveTargetDocument({
  pageKey,
  slug,
}: ResolveDocumentArgs): Promise<ResolvedDocument> {
  const client = createReadClient()
  const definition = QUERY_INSPECTION_MAP[pageKey]
  const documentType = definition.documentType

  if ((pageKey === 'appDetail' || pageKey === 'caseStudy') && slug) {
    const doc = await client.fetch<{ _id: string; _type: string } | null>(
      `*[_type == $documentType && slug.current == $slug && !(_id in path("drafts.**"))][0]{_id,_type}`,
      { slug, documentType },
    )
    const publishedDocumentId = doc?._id ?? null
    const baseId = publishedDocumentId ?? getDefaultDocumentId(pageKey, slug)
    const draftId = `drafts.${baseId}`
    const draft = await client.fetch<{ _id: string } | null>(
      `*[_id == $draftId][0]{_id}`,
      { draftId },
    )

    return {
      documentId: draftId,
      draftId,
      documentType,
      publishedDocumentId,
      hasDraft: Boolean(draft),
    }
  }

  const published = await client.fetch<{ _id: string; _type: string } | null>(
    `*[_type == $documentType && !(_id in path("drafts.**"))][0]{_id,_type}`,
    { documentType },
  )
  const publishedDocumentId = published?._id ?? null
  const baseId = publishedDocumentId ?? definition.defaultDocumentId
  const draftId = `drafts.${baseId}`
  const draft = await client.fetch<{ _id: string } | null>(
    `*[_id == $draftId][0]{_id}`,
    { draftId },
  )

  return {
    documentId: draftId,
    draftId,
    documentType,
    publishedDocumentId,
    hasDraft: Boolean(draft),
  }
}

export async function readCurrentPageContent({
  pageKey,
  slug,
  includeDraft = false,
}: ReadPageArgs) {
  const client = createReadClient(includeDraft)
  const definition = QUERY_INSPECTION_MAP[pageKey]
  const target = await resolveTargetDocument({ pageKey, slug })
  const draftId = target.draftId

  if (pageKey === 'appDetail') {
    return client.fetch<Record<string, unknown> | null>(appDetailQuery(includeDraft), {
      slug,
      draftId,
    })
  }

  if (pageKey === 'caseStudy') {
    return client.fetch<Record<string, unknown> | null>(
      slugDocumentQuery(definition.documentType, includeDraft),
      {
        slug,
        draftId,
        documentType: definition.documentType,
      },
    )
  }

  return client.fetch<Record<string, unknown> | null>(
    singletonQuery(definition.documentType, includeDraft),
    {
      documentType: definition.documentType,
      draftId,
    },
  )
}

export async function applyDraftOperations(
  documentId: string,
  documentType: string,
  patch: Record<string, unknown>,
) {
  const client = createWriteClient()
  const transaction = client
    .transaction()
    .createIfNotExists({
      _id: documentId,
      _type: documentType,
    })
    .patch(documentId, (draftPatch) => draftPatch.set(patch))

  return transaction.commit({
    visibility: 'async',
  })
}

export async function readDocumentById(client: SanityClient, id: string) {
  return client.fetch<Record<string, unknown> | null>(`*[_id == $id][0]`, { id })
}

type ResolvedAppDocument = ResolvedAppsPageReferences['operatorApps'][number]
type AppsPageReferenceSlugMap = {
  operatorAppSlugs?: unknown
  enterpriseAppSlugs?: unknown
}

function getAppsPageReferenceSlugs(contentMap: ContentMap) {
  const showcase =
    typeof contentMap.showcase === 'object' &&
    contentMap.showcase !== null &&
    !Array.isArray(contentMap.showcase)
      ? (contentMap.showcase as AppsPageReferenceSlugMap)
      : {}

  const operatorAppSlugs = Array.isArray(showcase.operatorAppSlugs)
    ? showcase.operatorAppSlugs.filter(
        (value: unknown): value is string => typeof value === 'string',
      )
    : []
  const enterpriseAppSlugs = Array.isArray(showcase.enterpriseAppSlugs)
    ? showcase.enterpriseAppSlugs.filter(
        (value: unknown): value is string => typeof value === 'string',
      )
    : []

  return {
    operatorAppSlugs,
    enterpriseAppSlugs,
  }
}

function formatMissingAppSlugErrors(
  requestedSlugs: string[],
  resolvedAppsBySlug: Map<string, ResolvedAppDocument>,
) {
  return requestedSlugs
    .filter((slug) => !resolvedAppsBySlug.has(slug))
    .map((slug) => `Requested app slug "${slug}" did not resolve to an existing Sanity app document.`)
}

function formatMissingCaseStudyCategorySlugErrors(
  requestedSlugs: string[],
  resolvedCategoriesBySlug: Map<string, ResolvedCaseStudyCategoryReference>,
) {
  return requestedSlugs
    .filter((slug) => !resolvedCategoriesBySlug.has(slug))
    .map(
      (slug) =>
        `Requested case study category slug "${slug}" did not resolve to an existing Sanity caseStudyCategory document.`,
    )
}

export async function resolveAppsPageReferenceSlugs(
  contentMap: ContentMap,
): Promise<ResolvedAppsPageReferences> {
  const { operatorAppSlugs, enterpriseAppSlugs } = getAppsPageReferenceSlugs(contentMap)
  const requestedSlugs = [...new Set([...operatorAppSlugs, ...enterpriseAppSlugs])]

  if (requestedSlugs.length === 0) {
    return {
      operatorApps: [],
      enterpriseApps: [],
    }
  }

  const client = createReadClient()
  const resolvedApps = await client.fetch<
    Array<{
      _id: string
      _type: string
      slug: { current?: string }
      name?: { en?: string; ar?: string }
    }>
  >(
    `*[_type == "app" && slug.current in $slugs]{
      _id,
      _type,
      slug,
      name
    }`,
    { slugs: requestedSlugs },
  )

  const resolvedAppsBySlug = new Map<string, ResolvedAppDocument>()
  for (const app of resolvedApps) {
    const slug = typeof app.slug?.current === 'string' ? app.slug.current : ''
    if (!slug) {
      continue
    }

    resolvedAppsBySlug.set(slug, {
      slug,
      _id: app._id,
      _type: app._type,
      name: app.name,
    })
  }

  const missingErrors = formatMissingAppSlugErrors(requestedSlugs, resolvedAppsBySlug)
  if (missingErrors.length > 0) {
    throw new Error(missingErrors.join('\n'))
  }

  return {
    operatorApps: operatorAppSlugs.map((slug: string) => resolvedAppsBySlug.get(slug)!),
    enterpriseApps: enterpriseAppSlugs.map((slug: string) => resolvedAppsBySlug.get(slug)!),
  }
}

export async function resolveCaseStudyCategorySlugs(
  contentMap: ContentMap,
): Promise<ResolvedCaseStudyCategoryReference[]> {
  const categorySlugs = Array.isArray(contentMap.categorySlugs)
    ? contentMap.categorySlugs.filter((value: unknown): value is string => typeof value === 'string')
    : []

  if (categorySlugs.length === 0) {
    return []
  }

  const requestedSlugs = [...new Set(categorySlugs)]
  const client = createReadClient()
  const resolvedCategories = await client.fetch<
    Array<{
      _id: string
      _type: string
      slug: { current?: string }
      name?: { en?: string; ar?: string }
    }>
  >(
    `*[_type == "caseStudyCategory" && slug.current in $slugs]{
      _id,
      _type,
      slug,
      name
    }`,
    { slugs: requestedSlugs },
  )

  const resolvedCategoriesBySlug = new Map<string, ResolvedCaseStudyCategoryReference>()
  for (const category of resolvedCategories) {
    const slug = typeof category.slug?.current === 'string' ? category.slug.current : ''
    if (!slug) {
      continue
    }

    resolvedCategoriesBySlug.set(slug, {
      slug,
      _id: category._id,
      _type: category._type,
      name: category.name,
    })
  }

  const missingErrors = formatMissingCaseStudyCategorySlugErrors(
    requestedSlugs,
    resolvedCategoriesBySlug,
  )
  if (missingErrors.length > 0) {
    throw new Error(missingErrors.join('\n'))
  }

  return categorySlugs.map((slug) => resolvedCategoriesBySlug.get(slug)!)
}

export async function validateContentMapWithSanity(
  contentMap: ContentMap,
): Promise<
  ValidationResult & {
    resolvedAppsPageReferences?: ResolvedAppsPageReferences
    resolvedCaseStudyCategoryReferences?: ResolvedCaseStudyCategoryReference[]
  }
> {
  const normalizedContentMap = normalizeContentMap(contentMap)
  const result = validateContentMap(normalizedContentMap)

  if (!result.valid || result.pageKey !== 'apps') {
    if (!result.valid || result.pageKey !== 'caseStudy') {
      return result
    }
  }

  if (result.pageKey === 'apps') {
    const { operatorAppSlugs, enterpriseAppSlugs } = getAppsPageReferenceSlugs(normalizedContentMap)
    if (operatorAppSlugs.length === 0 && enterpriseAppSlugs.length === 0) {
      return result
    }

    try {
      const resolvedAppsPageReferences = await resolveAppsPageReferenceSlugs(normalizedContentMap)
      return {
        ...result,
        resolvedAppsPageReferences,
      }
    } catch (error) {
      return {
        ...result,
        valid: false,
        errors: [
          ...result.errors,
          error instanceof Error ? error.message : 'Failed to resolve apps page references.',
        ],
      }
    }
  }

  try {
    const resolvedCaseStudyCategoryReferences = await resolveCaseStudyCategorySlugs(
      normalizedContentMap,
    )
    return {
      ...result,
      resolvedCaseStudyCategoryReferences,
    }
  } catch (error) {
    return {
      ...result,
      valid: false,
      errors: [
        ...result.errors,
        error instanceof Error
          ? error.message
          : 'Failed to resolve case study category references.',
      ],
    }
  }
}
