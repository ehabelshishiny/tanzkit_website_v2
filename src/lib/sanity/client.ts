import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'

// Validate environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-10'

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Check your .env.local file.'
  )
}

// Client for reading data (public, no token needed)
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads in production
  perspective: 'published', // Only return published documents
})

// Client for writing/mutations (requires API token)
export const writeClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_API_TOKEN, // Only available server-side
  perspective: 'published',
})

// Client for preview mode (includes drafts)
export const previewClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts', // Include draft documents
})

// Export config for reuse
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
}
