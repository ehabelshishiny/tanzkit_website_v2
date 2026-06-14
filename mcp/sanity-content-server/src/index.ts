#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import * as z from 'zod/v4'
import {
  buildDraftPlan,
  normalizeContentMap,
  validateContentMap,
  type ContentMap,
} from './content-ops.js'
import {
  PHASE_ONE_PUBLISH_BLOCK_MESSAGE,
  isSupportedPageKey,
  type SupportedPageKey,
} from './definitions.js'
import { getSanityConfigSummary } from './env.js'
import { inspectWebsiteCmsQueries } from './inspect.js'
import {
  applyDraftOperations,
  readCurrentPageContent,
  resolveTargetDocument,
  validateContentMapWithSanity,
} from './sanity.js'

const server = new McpServer(
  {
    name: 'tranzkit-sanity-content-server',
    version: '0.1.0',
  },
  {
    instructions:
      'Use this server for Tranzkit Sanity content planning, inspection, validation, and draft-only seeding. Publishing is disabled in phase one. Validate content maps before draft writes.',
  },
)

const contentMapSchema = z.record(z.string(), z.unknown())

function toToolResult(payload: Record<string, unknown>) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(payload, null, 2),
      },
    ],
    structuredContent: payload,
  }
}

server.registerTool(
  'getSanityConfig',
  {
    description:
      'Return the local Sanity MCP runtime configuration without exposing tokens.',
    outputSchema: {
      projectId: z.string().nullable(),
      dataset: z.string().nullable(),
      apiVersion: z.string().nullable(),
      studioUrl: z.string().nullable(),
      hasReadToken: z.boolean(),
      hasWriteToken: z.boolean(),
      missingEnvVars: z.array(z.string()),
    },
  },
  async () => toToolResult(getSanityConfigSummary()),
)

server.registerTool(
  'inspectWebsiteCmsQueries',
  {
    description:
      'Inspect the current Sanity query map used by homepage, solutions, apps, app detail, SEO, and navigation content.',
    inputSchema: {
      pageKey: z
        .enum([
          'homepage',
          'solutions',
          'solutionsEnterprisesPassengers',
          'solutionsOperatorsDrivers',
          'apps',
          'appDetail',
          'about',
          'contact',
          'caseStudies',
          'caseStudy',
          'navigation',
        ])
        .optional(),
    },
  },
  async ({ pageKey }) => {
    const inspection = await inspectWebsiteCmsQueries(pageKey as SupportedPageKey | undefined)
    return toToolResult(inspection)
  },
)

server.registerTool(
  'readCurrentPageContent',
  {
    description:
      'Read the current Sanity document content for a supported page key. Supports draft-first reads when includeDraft is true.',
    inputSchema: {
      pageKey: z.enum([
        'homepage',
        'solutions',
        'solutionsEnterprisesPassengers',
        'solutionsOperatorsDrivers',
        'apps',
        'appDetail',
        'about',
        'contact',
        'caseStudies',
        'caseStudy',
        'navigation',
      ]),
      slug: z.string().optional(),
      includeDraft: z.boolean().optional(),
    },
  },
  async ({ pageKey, slug, includeDraft }) => {
    const content = await readCurrentPageContent({
      pageKey: pageKey as SupportedPageKey,
      slug,
      includeDraft,
    })
    return toToolResult({
      pageKey,
      slug: slug ?? null,
      includeDraft: Boolean(includeDraft),
      content: content ?? null,
    })
  },
)

server.registerTool(
  'validateContentMap',
  {
    description:
      'Validate a bilingual Tranzkit content map against supported page keys and phase-one draft safety rules.',
    inputSchema: {
      contentMap: contentMapSchema,
    },
  },
  async ({ contentMap }) => {
    const result = await validateContentMapWithSanity(
      normalizeContentMap(contentMap as ContentMap),
    )
    return toToolResult({
      ...result,
    })
  },
)

server.registerTool(
  'previewSanityMutation',
  {
    description:
      'Generate the draft-only Sanity mutation plan for a supported page without writing anything.',
    inputSchema: {
      contentMap: contentMapSchema,
    },
  },
  async ({ contentMap }) => {
    const map = normalizeContentMap(contentMap as ContentMap)

    const validation = await validateContentMapWithSanity(map)
    if (!validation.valid || !isSupportedPageKey(map.pageKey)) {
      return toToolResult({ ...validation })
    }

    const target = await resolveTargetDocument({
      pageKey: map.pageKey,
      slug: typeof map.slug === 'string' ? map.slug : undefined,
    })
    const existingDocumentContent = await readCurrentPageContent({
      pageKey: map.pageKey,
      slug: typeof map.slug === 'string' ? map.slug : undefined,
      includeDraft: true,
    })
    const plan = buildDraftPlan({
      pageKey: map.pageKey,
      action: map.action,
      document: {
        _id: target.publishedDocumentId ?? target.documentId.replace(/^drafts\./, ''),
        _type: target.documentType,
      },
      contentMap: map,
      resolvedAppsPageReferences: validation.resolvedAppsPageReferences,
      resolvedCaseStudyCategoryReferences: validation.resolvedCaseStudyCategoryReferences,
      existingDocumentContent,
    })

    return toToolResult({
      dryRun: true,
      target,
      plan,
    })
  },
)

server.registerTool(
  'draftPageContent',
  {
    description:
      'Create or update draft documents only. Uses createIfNotExists plus patch, never writes published documents directly.',
    inputSchema: {
      contentMap: contentMapSchema,
      dryRun: z.boolean().optional(),
    },
  },
  async ({ contentMap, dryRun }) => {
    const map = normalizeContentMap(contentMap as ContentMap)

    const validation = await validateContentMapWithSanity(map)
    if (!validation.valid || !isSupportedPageKey(map.pageKey)) {
      return toToolResult({ ...validation })
    }

    const target = await resolveTargetDocument({
      pageKey: map.pageKey,
      slug: typeof map.slug === 'string' ? map.slug : undefined,
    })
    const existingDocumentContent = await readCurrentPageContent({
      pageKey: map.pageKey,
      slug: typeof map.slug === 'string' ? map.slug : undefined,
      includeDraft: true,
    })
    const plan = buildDraftPlan({
      pageKey: map.pageKey,
      action: map.action,
      document: {
        _id: target.publishedDocumentId ?? target.documentId.replace(/^drafts\./, ''),
        _type: target.documentType,
      },
      contentMap: map,
      resolvedAppsPageReferences: validation.resolvedAppsPageReferences,
      resolvedCaseStudyCategoryReferences: validation.resolvedCaseStudyCategoryReferences,
      existingDocumentContent,
    })

    if (!plan.ok) {
      return toToolResult(plan)
    }

    if (dryRun ?? true) {
      return toToolResult({
        dryRun: true,
        target,
        plan,
      })
    }

    const commitResult = await applyDraftOperations(
      plan.documentId,
      plan.documentType,
      plan.patch,
    )

    return toToolResult({
      dryRun: false,
      target,
      plan,
      commitResult,
    })
  },
)

server.registerTool(
  'publishSanityDraft',
  {
    description: 'Publishing is disabled in phase one. Create drafts only.',
    inputSchema: {
      pageKey: z.string(),
    },
  },
  async () =>
    toToolResult({
      ok: false,
      message: PHASE_ONE_PUBLISH_BLOCK_MESSAGE,
    }),
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
