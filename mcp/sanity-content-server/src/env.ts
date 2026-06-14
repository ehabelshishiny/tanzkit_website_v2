import { existsSync } from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

const workspaceRoot = process.cwd()

const envFiles = [
  path.join(workspaceRoot, '.env.local'),
  path.join(workspaceRoot, '.env'),
]

for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile, override: false })
  }
}

export type SanityEnv = {
  projectId: string
  dataset: string
  apiVersion: string
  readToken?: string
  writeToken?: string
  studioUrl?: string
}

export function getWorkspaceRoot() {
  return workspaceRoot
}

export function getSanityEnv() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? ''
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? ''
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ?? ''
  const readToken = process.env.SANITY_API_READ_TOKEN?.trim() || undefined
  const writeToken = process.env.SANITY_API_WRITE_TOKEN?.trim() || undefined
  const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || undefined

  return {
    projectId,
    dataset,
    apiVersion,
    readToken,
    writeToken,
    studioUrl,
  } satisfies SanityEnv
}

export function getSanityConfigSummary() {
  const env = getSanityEnv()
  const missing = [
    !env.projectId && 'NEXT_PUBLIC_SANITY_PROJECT_ID',
    !env.dataset && 'NEXT_PUBLIC_SANITY_DATASET',
    !env.apiVersion && 'NEXT_PUBLIC_SANITY_API_VERSION',
    !env.readToken && 'SANITY_API_READ_TOKEN',
    !env.writeToken && 'SANITY_API_WRITE_TOKEN',
  ].filter(Boolean) as string[]

  return {
    projectId: env.projectId || null,
    dataset: env.dataset || null,
    apiVersion: env.apiVersion || null,
    studioUrl: env.studioUrl || null,
    hasReadToken: Boolean(env.readToken),
    hasWriteToken: Boolean(env.writeToken),
    missingEnvVars: missing,
  }
}

export function assertCoreSanityEnv() {
  const env = getSanityEnv()

  if (!env.projectId || !env.dataset || !env.apiVersion) {
    throw new Error(
      'Missing required Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION.',
    )
  }

  return env
}
