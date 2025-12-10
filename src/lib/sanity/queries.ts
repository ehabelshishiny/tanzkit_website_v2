import { groq } from 'next-sanity'

// Helper to get localized field based on locale
export const localizedField = (field: string, locale: string = 'en') => {
  return `"${field}": coalesce(${field}.${locale}, ${field}.en)`
}

// Get multiple localized fields
export const localizedFields = (fields: string[], locale: string = 'en') => {
  return fields.map((field) => localizedField(field, locale)).join(',\n  ')
}

// Image projection
export const imageProjection = groq`{
  _type,
  asset->,
  "alt": coalesce(alt.en, alt.ar),
  hotspot,
  crop
}`

// Hero Section query
export const heroSectionQuery = (locale: string = 'en') => groq`
  *[_type == "heroSection"][0] {
    _id,
    _type,
    ${localizedField('title', locale)},
    ${localizedField('subtitle', locale)},
    ${localizedField('description', locale)},
    buttons[] {
      _key,
      ${localizedField('label', locale)},
      href,
      variant,
      icon
    },
    backgroundImage ${imageProjection},
    backgroundVideo,
    showStats,
    stats[] {
      _key,
      value,
      ${localizedField('label', locale)}
    }
  }
`

// All Services query
export const servicesQuery = (locale: string = 'en') => groq`
  *[_type == "service"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('description', locale)},
    icon,
    image ${imageProjection},
    features[] {
      _key,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    category->,
    order
  }
`

// Single Service query
export const serviceBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "service" && slug.current == "${slug}"][0] {
    _id,
    _type,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('description', locale)},
    icon,
    image ${imageProjection},
    features[] {
      _key,
      ${localizedField('title', locale)},
      ${localizedField('description', locale)}
    },
    category->,
    order
  }
`

// Testimonials query
export const testimonialsQuery = (locale: string = 'en') => groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    _type,
    clientName,
    company,
    ${localizedField('role', locale)},
    ${localizedField('quote', locale)},
    rating,
    image ${imageProjection},
    companyLogo ${imageProjection},
    featured
  }
`

// Featured Testimonials query
export const featuredTestimonialsQuery = (locale: string = 'en') => groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    _type,
    clientName,
    company,
    ${localizedField('role', locale)},
    ${localizedField('quote', locale)},
    rating,
    image ${imageProjection},
    companyLogo ${imageProjection}
  }
`

// Team Members query
export const teamMembersQuery = (locale: string = 'en') => groq`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    _type,
    name,
    ${localizedField('role', locale)},
    ${localizedField('bio', locale)},
    image ${imageProjection},
    email,
    phone,
    socialLinks[] {
      _key,
      platform,
      url
    },
    order
  }
`

// Blog Posts query
export const blogPostsQuery = (locale: string = 'en') => groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    _type,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    author->,
    publishedAt,
    featuredImage ${imageProjection},
    categories[]->,
    tags
  }
`

// Single Blog Post query
export const blogPostBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "blogPost" && slug.current == "${slug}"][0] {
    _id,
    _type,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('content', locale)},
    author->,
    publishedAt,
    featuredImage ${imageProjection},
    categories[]->,
    tags,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords
    }
  }
`

// Site Settings query
export const siteSettingsQuery = (locale: string = 'en') => groq`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    ${localizedField('title', locale)},
    ${localizedField('description', locale)},
    logo ${imageProjection},
    favicon ${imageProjection},
    contactEmail,
    contactPhone,
    ${localizedField('address', locale)},
    socialMedia[] {
      _key,
      platform,
      url
    },
    ${localizedField('footerText', locale)},
    ${localizedField('copyrightText', locale)}
  }
`
