import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

// Validate environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-10'

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Check your .env.local file.'
  )
}

// Base client configuration
const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
}

// Main client - stega will be enabled conditionally via getClient()
export const client = createClient(clientConfig)

// Helper function to get client with appropriate configuration
export async function getClient() {
  const isDraftMode = (await draftMode()).isEnabled

  if (isDraftMode) {
    // Return client with stega enabled for visual editing
    return createClient({
      ...clientConfig,
      useCdn: false,
      perspective: 'drafts',
      stega: {
        enabled: true,
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3000/studio',
      },
    })
  }

  // Return regular client for published content
  return client
}

// Export config for reuse
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
}
