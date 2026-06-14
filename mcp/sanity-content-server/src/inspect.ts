import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { QUERY_INSPECTION_MAP, type SupportedPageKey } from './definitions.js'
import { getWorkspaceRoot } from './env.js'

export async function inspectWebsiteCmsQueries(pageKey?: SupportedPageKey) {
  const workspaceRoot = getWorkspaceRoot()
  const queryFilePath = path.join(workspaceRoot, 'src/lib/sanity/queries.ts')
  const querySource = await readFile(queryFilePath, 'utf8')
  const selectedEntries = Object.values(QUERY_INSPECTION_MAP).filter((definition) =>
    pageKey ? definition.pageKey === pageKey : true,
  )

  return {
    sourceFile: 'src/lib/sanity/queries.ts',
    pageKeys: selectedEntries.map((entry) => entry.pageKey),
    definitions: selectedEntries.map((entry) => ({
      ...entry,
      querySourceSnippet: extractQuerySnippet(querySource, entry.queryName),
    })),
  }
}

function extractQuerySnippet(source: string, queryName: string) {
  const marker = `export const ${queryName}`
  const start = source.indexOf(marker)

  if (start === -1) {
    return null
  }

  const nextExport = source.indexOf('\nexport const ', start + marker.length)
  const nextFunction = source.indexOf('\nexport async function ', start + marker.length)
  const endCandidates = [nextExport, nextFunction].filter((value) => value !== -1)
  const end = endCandidates.length > 0 ? Math.min(...endCandidates) : source.length

  return source.slice(start, end).trim()
}
