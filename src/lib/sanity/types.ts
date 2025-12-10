// Localized string type (for bilingual content)
export interface LocalizedString {
  en?: string
  ar?: string
}

// Localized text (for longer content - Portable Text)
export interface LocalizedText {
  en?: any[] // Portable Text blocks
  ar?: any[] // Portable Text blocks
}

// Base document type
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Sanity image type
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: LocalizedString
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

// CTA Button type
export interface CTAButton {
  _key: string
  label: LocalizedString
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: string
}

// Hero Section type
export interface HeroSection extends SanityDocument {
  _type: 'heroSection'
  title: LocalizedString
  subtitle?: LocalizedString
  description?: LocalizedText
  buttons?: CTAButton[]
  backgroundImage?: SanityImage
  backgroundVideo?: {
    asset: {
      _ref: string
    }
  }
  showStats?: boolean
  stats?: {
    _key: string
    value: string
    label: LocalizedString
  }[]
}

// Service type
export interface Service extends SanityDocument {
  _type: 'service'
  title: LocalizedString
  slug: {
    current: string
  }
  description: LocalizedText
  icon?: string
  image?: SanityImage
  features?: {
    _key: string
    title: LocalizedString
    description?: LocalizedString
  }[]
  category?: {
    _ref: string
    _type: 'reference'
  }
  order?: number
}

// Testimonial type
export interface Testimonial extends SanityDocument {
  _type: 'testimonial'
  clientName: string
  company: string
  role?: LocalizedString
  quote: LocalizedString
  rating?: number
  image?: SanityImage
  companyLogo?: SanityImage
  featured?: boolean
}

// Team Member type
export interface TeamMember extends SanityDocument {
  _type: 'teamMember'
  name: string
  role: LocalizedString
  bio?: LocalizedText
  image?: SanityImage
  email?: string
  phone?: string
  socialLinks?: {
    _key: string
    platform: string
    url: string
  }[]
  order?: number
}

// Blog Post type
export interface BlogPost extends SanityDocument {
  _type: 'blogPost'
  title: LocalizedString
  slug: {
    current: string
  }
  excerpt?: LocalizedString
  content: LocalizedText
  author?: {
    _ref: string
    _type: 'reference'
  }
  publishedAt?: string
  featuredImage?: SanityImage
  categories?: {
    _ref: string
    _type: 'reference'
  }[]
  tags?: string[]
  seo?: {
    metaTitle?: LocalizedString
    metaDescription?: LocalizedString
    keywords?: string[]
  }
}

// Site Settings type (Singleton)
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings'
  title: LocalizedString
  description: LocalizedString
  logo?: SanityImage
  favicon?: SanityImage
  contactEmail?: string
  contactPhone?: string
  address?: LocalizedString
  socialMedia?: {
    _key: string
    platform: string
    url: string
  }[]
  footerText?: LocalizedString
  copyrightText?: LocalizedString
}

// Helper type for fetching
export type SanityDocumentType =
  | HeroSection
  | Service
  | Testimonial
  | TeamMember
  | BlogPost
  | SiteSettings
