import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

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

// Initialize image URL builder
const builder = imageUrlBuilder(client)

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
    mobile: urlFor(source).width(640).url() || '',
    tablet: urlFor(source).width(1024).url() || '',
    desktop: urlFor(source).width(1920).url() || '',
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
