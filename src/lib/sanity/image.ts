import { createImageUrlBuilder } from '@sanity/image-url'
import { createClient } from 'next-sanity'

// Type definition for Sanity image (without problematic import)
type ImageAsset = {
  _ref: string
  _type: string
}

type SanityImageType = {
  _type?: 'image'
  asset: ImageAsset | { _ref: string }
  alt?: { en?: string; ar?: string }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Create a simple client for image URL building (no draft mode)
const imageClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
})

// Initialize image URL builder
const builder = createImageUrlBuilder(imageClient)

/**
 * Generate optimized image URL from Sanity image asset
 * @param source - Sanity image object
 * @returns Image URL builder
 * 
 * @example
 * const imageUrl = urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: SanityImageType | any) {
  if (!source) {
    return builder.image({} as any)
  }
  return builder.image(source)
}

/**
 * Get responsive image URLs for different screen sizes
 * @param source - Sanity image object
 * @returns Object with URLs for different sizes
 * 
 * @example
 * const { mobile, tablet, desktop } = getResponsiveImageUrls(image)
 */
export function getResponsiveImageUrls(source: SanityImageType | any) {
  if (!source) {
    return {
      mobile: '',
      tablet: '',
      desktop: '',
    }
  }

  return {
    mobile: urlFor(source).width(640).fit('max').url() || '',
    tablet: urlFor(source).width(1024).fit('max').url() || '',
    desktop: urlFor(source).width(1920).fit('max').url() || '',
  }
}

/**
 * Get image metadata (dimensions, format, etc.)
 * @param source - Sanity image object with asset reference
 * @returns Image metadata with width and height
 */
export function getImageDimensions(source: {
  asset?: {
    _ref?: string
  }
} | null | undefined) {
  if (!source?.asset?._ref) {
    return null
  }

  // Sanity image refs look like: image-{assetId}-{width}x{height}-{format}
  const refParts = source.asset._ref.split('-')
  if (refParts.length < 3) {
    return null
  }

  const dimensions = refParts[2]
  const dimensionParts = dimensions.split('x')
  if (dimensionParts.length !== 2) {
    return null
  }

  const width = parseInt(dimensionParts[0], 10)
  const height = parseInt(dimensionParts[1], 10)

  if (isNaN(width) || isNaN(height)) {
    return null
  }

  return { width, height }
}

// Alias for consistency with common naming conventions
export const urlForImage = urlFor
