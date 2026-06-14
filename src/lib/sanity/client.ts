import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'
import { sanityConfig } from './config'

// Base client configuration
const clientConfig = {
  ...sanityConfig,
  useCdn: false,
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

export { sanityConfig }
