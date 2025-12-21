# Resources Hub Implementation Plan
## Tranzkit Website v2 - Comprehensive Resources Section

---

## 📋 Executive Summary

This document outlines the complete implementation plan for the Resources Hub section of the Tranzkit website. The Resources Hub will serve as a centralized content repository featuring:
- **Blogs** - Thought leadership and industry insights
- **Case Studies** - Customer success stories with measurable results
- **FAQ** - Searchable frequently asked questions with structured data
- **Documentation** - Product user guides and technical documentation
- **Careers** - Job vacancies (integrated from existing About page schema)

All content will be managed through Sanity CMS with full internationalization (English/Arabic) and comprehensive SEO optimization.

---

## 🎯 Key Findings from Codebase Analysis

### Existing Infrastructure
✅ **Resources directory exists**: `/src/app/[locale]/(main)/resources/`
✅ **Basic components exist**: `animated-header.tsx`, `filter-tabs.tsx`, `card-list.tsx`
✅ **Blog queries exist**: `blogPostsQuery` and `blogPostBySlugQuery` in `queries.ts`
✅ **Career schema exists**: `careerItem.ts` with full job posting fields
✅ **SEO schema exists**: Comprehensive `seo.ts` with localized meta tags
✅ **Rich text support**: `localizedRichText.ts` for formatted content
✅ **Navigation structure**: Resources submenu already defined in `header.tsx`

### Missing Components (To Be Created)
❌ **Blog schema**: Referenced in queries but not in schema registry
❌ **Case study schema**: Not implemented
❌ **FAQ schema**: Inline FAQ exists in solutions pages, but no standalone schema
❌ **Documentation schema**: Not implemented
❌ **Author schema**: Referenced in blog queries but not defined
❌ **Category schemas**: For blogs and case studies
❌ **Resources hub page**: Needs Sanity CMS integration
❌ **Individual resource pages**: Blog posts, case studies need dynamic routing
❌ **Search functionality**: Client-side search for FAQ

---

## 📁 Complete File Structure

### 1. Sanity Schemas (New Files)

```
sanity-studio/schemaTypes/
├── documents/
│   ├── blogPost.ts                    # NEW - Blog post document
│   ├── blogCategory.ts                # NEW - Blog category taxonomy
│   ├── caseStudy.ts                   # NEW - Case study document
│   ├── caseStudyCategory.ts           # NEW - Case study category
│   ├── faqItem.ts                     # NEW - FAQ document
│   ├── faqCategory.ts                 # NEW - FAQ category
│   ├── documentation.ts               # NEW - Documentation/user guide
│   ├── author.ts                      # NEW - Author profile
│   ├── resourcesHubPage.ts            # NEW - Resources hub landing page
│   └── career.ts                      # NEW - Standalone career document (migrated from careerItem object)
├── objects/
│   ├── careerItem.ts                  # EXISTING - Keep for backward compatibility
│   ├── richTextBlock.ts               # NEW - Enhanced rich text with images/embeds
│   └── metricItem.ts                  # NEW - For case study results/metrics
└── index.ts                           # MODIFIED - Register all new schemas
```

### 2. Frontend Pages (New & Modified)

```
src/app/[locale]/(main)/resources/
├── page.tsx                           # MODIFIED - Resources hub landing with Sanity data
├── blogs/
│   ├── page.tsx                       # NEW - Blog listing with filtering/pagination
│   └── [slug]/
│       └── page.tsx                   # NEW - Individual blog post
├── case-studies/
│   ├── page.tsx                       # NEW - Case studies listing
│   └── [slug]/
│       └── page.tsx                   # NEW - Individual case study
├── faq/
│   └── page.tsx                       # MODIFIED - Add Sanity integration + search
├── documentation/
│   └── page.tsx                       # NEW - Documentation/user guide
└── careers/
    ├── page.tsx                       # NEW - Careers listing
    └── [slug]/
        └── page.tsx                   # NEW - Individual job posting
```

### 3. Components (New & Modified)

```
src/components/sections/resources/
├── animated-header.tsx                # EXISTING
├── filter-tabs.tsx                    # EXISTING
├── card-list.tsx                      # EXISTING
├── blog-card.tsx                      # NEW - Blog post card
├── blog-hero.tsx                      # NEW - Blog post hero section
├── blog-content.tsx                   # NEW - Rich text renderer for blog
├── blog-sidebar.tsx                   # NEW - Author info, related posts
├── case-study-card.tsx                # NEW - Case study card
├── case-study-hero.tsx                # NEW - Case study hero
├── case-study-metrics.tsx             # NEW - Results/metrics display
├── case-study-content.tsx             # NEW - Case study content sections
├── faq-search.tsx                     # NEW - Client-side FAQ search
├── faq-accordion.tsx                  # NEW - FAQ accordion with categories
├── documentation-nav.tsx              # NEW - Documentation table of contents
├── documentation-content.tsx          # NEW - Documentation renderer
├── career-card.tsx                    # NEW - Job posting card
├── career-detail.tsx                  # NEW - Job posting detail view
├── career-application-form.tsx        # NEW - Job application form
├── resource-filters.tsx               # NEW - Unified filtering component
├── resource-pagination.tsx            # NEW - Pagination component
└── share-buttons.tsx                  # NEW - Social sharing buttons
```




### 4. Utilities & Helpers

```
src/lib/
├── sanity/
│   ├── queries.ts                     # MODIFIED - Add new resource queries
│   ├── image.ts                       # EXISTING
│   └── portableText.ts                # NEW - Portable text serializers
├── seo/
│   ├── metadata.ts                    # NEW - SEO metadata generators
│   ├── structuredData.ts              # NEW - JSON-LD schema generators
│   └── sitemap.ts                     # NEW - Dynamic sitemap generation
└── utils/
    ├── search.ts                      # NEW - Client-side search utilities
    └── pagination.ts                  # NEW - Pagination helpers
```

---

## 🗄️ Detailed Sanity Schema Designs

### 1. Blog Post Schema (`blogPost.ts`)

```typescript
{
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Brief summary (150-160 characters)',
      validation: (Rule) => Rule.max(160)
    },
    {
      name: 'content',
      title: 'Content',
      type: 'localizedRichText',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localizedString',
          validation: (Rule) => Rule.required()
        }
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Tags',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' }
        },
        {
          name: 'ar',
          title: 'Arabic Tags',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' }
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime'
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes'
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show on homepage/featured sections',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name.en',
      media: 'featuredImage'
    },
    prepare({ title, author, media }) {
      return {
        title: title,
        subtitle: `By ${author}`,
        media: media
      }
    }
  }
}
```

### 2. Author Schema (`author.ts`)

```typescript
{
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'localizedText',
      description: 'Short biography (200 characters max)',
      validation: (Rule) => Rule.max(200)
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'localizedString',
      description: 'e.g., Content Writer, Marketing Manager'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'website', title: 'Website', type: 'url' }
      ]
    }
  ]
}
```

### 3. Case Study Schema (`caseStudy.ts`)

```typescript
{
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Brief summary (150-160 characters)',
      validation: (Rule) => Rule.max(160)
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'localizedString',
      description: 'e.g., Transportation, Logistics, Healthcare'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      description: 'Client location/region'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localizedString',
          validation: (Rule) => Rule.required()
        }
      ]
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'localizedRichText',
      description: 'What problem did the client face?',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'localizedRichText',
      description: 'How did Tranzkit solve it?',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'results',
      title: 'Results',
      type: 'localizedRichText',
      description: 'What were the outcomes?',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      description: 'Measurable results (e.g., 50% cost reduction)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'localizedString',
              description: 'e.g., "50%", "2x", "$1M"'
            },
            {
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              description: 'e.g., "Cost Reduction", "Revenue Growth"'
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name (optional)'
            }
          ]
        }
      ]
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'localizedText'
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'localizedString'
        },
        {
          name: 'role',
          title: 'Author Role',
          type: 'localizedString'
        },
        {
          name: 'avatar',
          title: 'Author Avatar',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudyCategory' }] }]
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'clientName.en',
      media: 'featuredImage'
    }
  }
}
```

### 4. FAQ Item Schema (`faqItem.ts`)

```typescript
{
  name: 'faqItem',
  title: 'FAQ Items',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'localizedRichText',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'object',
      description: 'Keywords for search',
      fields: [
        {
          name: 'en',
          title: 'English Tags',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' }
        },
        {
          name: 'ar',
          title: 'Arabic Tags',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' }
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this FAQ on the website',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'question.en',
      subtitle: 'category.name.en'
    }
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
```


### 5. Documentation Schema (`documentation.ts`)

**Recommendation: Use Portable Text (Rich Text) instead of HTML**

Sanity CMS supports rich text content through Portable Text, which is more flexible and secure than raw HTML. However, if you absolutely need HTML support, we can create a custom HTML field type.

**Option A: Portable Text (Recommended)**
```typescript
{
  name: 'documentation',
  title: 'Documentation',
  type: 'document',
  icon: BookIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'localizedRichText',
      description: 'Main documentation content with formatting',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'sections',
      title: 'Table of Contents Sections',
      type: 'array',
      description: 'Auto-generated from H2 headings in content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'localizedString'
            },
            {
              name: 'anchor',
              title: 'Anchor ID',
              type: 'string',
              description: 'URL anchor (e.g., #getting-started)'
            }
          ]
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'getting-started' },
          { title: 'User Guide', value: 'user-guide' },
          { title: 'API Reference', value: 'api-reference' },
          { title: 'Troubleshooting', value: 'troubleshooting' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ]
}
```

**Option B: HTML Content (If Required)**
```typescript
// Create custom HTML field type
{
  name: 'htmlContent',
  title: 'HTML Content',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English HTML',
      type: 'text',
      rows: 20,
      description: 'Raw HTML content (use with caution)'
    },
    {
      name: 'ar',
      title: 'Arabic HTML',
      type: 'text',
      rows: 20,
      description: 'Raw HTML content (use with caution)'
    }
  ]
}

// Then use in documentation schema
{
  name: 'content',
  title: 'Content',
  type: 'htmlContent',
  validation: (Rule) => Rule.required()
}
```

**Recommendation**: Use Option A (Portable Text) for better security, flexibility, and Sanity Studio editing experience. HTML can be rendered on the frontend using custom serializers if needed.

### 6. Category Schemas

**Blog Category (`blogCategory.ts`)**
```typescript
{
  name: 'blogCategory',
  title: 'Blog Categories',
  type: 'document',
  icon: TagIcon,
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText'
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for category badge (e.g., #3B82F6)'
    }
  ]
}
```

**Case Study Category (`caseStudyCategory.ts`)** - Same structure as blogCategory

**FAQ Category (`faqCategory.ts`)** - Same structure as blogCategory

### 7. Career Document Schema (`career.ts`)

**Note**: Migrate from `careerItem` object to standalone `career` document for individual pages.

```typescript
{
  name: 'career',
  title: 'Careers',
  type: 'document',
  icon: BriefcaseIcon,
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'type',
      title: 'Employment Type',
      type: 'localizedString',
      description: 'e.g., Full-time, Part-time, Contract',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'localizedText',
      description: 'Brief summary shown in the careers list'
    },
    {
      name: 'fullDescription',
      title: 'Full Job Description',
      type: 'localizedRichText',
      description: 'Detailed job description with responsibilities, requirements, benefits, etc.',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'applyUrl',
      title: 'External Apply URL (Optional)',
      type: 'url',
      description: 'If you use an external application system, add the URL here'
    },
    {
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string',
      validation: (Rule) => Rule.email()
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this job posting on the careers page',
      initialValue: true
    },
    {
      name: 'postedDate',
      title: 'Posted Date',
      type: 'date',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'closingDate',
      title: 'Closing Date',
      type: 'date',
      description: 'Application deadline (optional)'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo'
    }
  ]
}
```

---

## 🔍 GROQ Queries

### Blog Queries
```typescript
// All published blog posts
export const blogPostsQuery = (locale: string = 'en') => groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    featuredImage {
      asset->{_id, url},
      ${localizedField('alt', locale)}
    },
    author->{
      ${localizedField('name', locale)},
      ${localizedField('role', locale)},
      avatar {asset->{_id, url}}
    },
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    publishedAt,
    readingTime,
    featured
  }
`

// Single blog post
export const blogPostBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "blogPost" && slug.current == "${slug}" && status == "published"][0] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('content', locale)},
    featuredImage {
      asset->{_id, url},
      ${localizedField('alt', locale)}
    },
    author->{
      ${localizedField('name', locale)},
      ${localizedField('bio', locale)},
      ${localizedField('role', locale)},
      avatar {asset->{_id, url}},
      socialLinks
    },
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    tags,
    publishedAt,
    updatedAt,
    readingTime,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {
        ${locale} {asset->{_id, url}}
      }
    },
    "relatedPosts": *[_type == "blogPost" && slug.current != "${slug}" && status == "published" && count((categories[]._ref)[@ in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      ${localizedField('title', locale)},
      slug,
      ${localizedField('excerpt', locale)},
      featuredImage {asset->{_id, url}},
      publishedAt
    }
  }
`
```

### Case Study Queries
```typescript
// All case studies
export const caseStudiesQuery = (locale: string = 'en') => groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('clientName', locale)},
    ${localizedField('industry', locale)},
    featuredImage {
      asset->{_id, url},
      ${localizedField('alt', locale)}
    },
    clientLogo {asset->{_id, url}},
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    metrics[] {
      ${localizedField('value', locale)},
      ${localizedField('label', locale)},
      icon
    },
    publishedAt,
    featured
  }
`

// Single case study
export const caseStudyBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "caseStudy" && slug.current == "${slug}"][0] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('excerpt', locale)},
    ${localizedField('clientName', locale)},
    ${localizedField('industry', locale)},
    ${localizedField('location', locale)},
    featuredImage {
      asset->{_id, url},
      ${localizedField('alt', locale)}
    },
    clientLogo {asset->{_id, url}},
    ${localizedField('challenge', locale)},
    ${localizedField('solution', locale)},
    ${localizedField('results', locale)},
    metrics[] {
      ${localizedField('value', locale)},
      ${localizedField('label', locale)},
      icon
    },
    testimonial {
      ${localizedField('quote', locale)},
      ${localizedField('author', locale)},
      ${localizedField('role', locale)},
      avatar {asset->{_id, url}}
    },
    categories[]->{
      ${localizedField('name', locale)},
      slug,
      color
    },
    publishedAt,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords,
      ogImage {${locale} {asset->{_id, url}}}
    }
  }
`
```

### FAQ Queries
```typescript
// All active FAQs grouped by category
export const faqsQuery = (locale: string = 'en') => groq`
  *[_type == "faqCategory"] | order(name.en asc) {
    _id,
    ${localizedField('name', locale)},
    slug,
    ${localizedField('description', locale)},
    "items": *[_type == "faqItem" && category._ref == ^._id && isActive == true] | order(order asc) {
      _id,
      ${localizedField('question', locale)},
      ${localizedField('answer', locale)},
      tags,
      order
    }
  }
`

// All FAQs (flat list for search)
export const allFaqsQuery = (locale: string = 'en') => groq`
  *[_type == "faqItem" && isActive == true] | order(order asc) {
    _id,
    ${localizedField('question', locale)},
    ${localizedField('answer', locale)},
    category->{
      ${localizedField('name', locale)},
      slug
    },
    tags
  }
`
```

### Career Queries
```typescript
// All active careers
export const careersQuery = (locale: string = 'en') => groq`
  *[_type == "career" && isActive == true] | order(postedDate desc) {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('department', locale)},
    ${localizedField('location', locale)},
    ${localizedField('type', locale)},
    ${localizedField('description', locale)},
    postedDate,
    closingDate
  }
`

// Single career
export const careerBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "career" && slug.current == "${slug}" && isActive == true][0] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('department', locale)},
    ${localizedField('location', locale)},
    ${localizedField('type', locale)},
    ${localizedField('description', locale)},
    ${localizedField('fullDescription', locale)},
    applyUrl,
    applicationEmail,
    postedDate,
    closingDate,
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords
    }
  }
`
```

### Documentation Queries
```typescript
// All documentation pages
export const documentationQuery = (locale: string = 'en') => groq`
  *[_type == "documentation"] | order(order asc) {
    _id,
    ${localizedField('title', locale)},
    slug,
    category,
    sections[] {
      ${localizedField('title', locale)},
      anchor
    },
    order
  }
`

// Single documentation page
export const documentationBySlugQuery = (slug: string, locale: string = 'en') => groq`
  *[_type == "documentation" && slug.current == "${slug}"][0] {
    _id,
    ${localizedField('title', locale)},
    slug,
    ${localizedField('content', locale)},
    category,
    sections[] {
      ${localizedField('title', locale)},
      anchor
    },
    seo {
      ${localizedField('metaTitle', locale)},
      ${localizedField('metaDescription', locale)},
      keywords
    }
  }
`
```

---

## 🎨 SEO Implementation Plan

### 1. Metadata Generation (`src/lib/seo/metadata.ts`)

```typescript
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export async function generateMetadata(
  seoData: SEOData,
  locale: string,
  defaultTitle?: string,
  defaultDescription?: string
): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const title = seoData.metaTitle || defaultTitle || t('site.title');
  const description = seoData.metaDescription || defaultDescription || t('site.description');

  return {
    title,
    description,
    keywords: seoData.keywords?.join(', '),
    openGraph: {
      title,
      description,
      images: seoData.ogImage ? [{ url: seoData.ogImage }] : [],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seoData.ogImage ? [seoData.ogImage] : [],
    },
    alternates: {
      canonical: seoData.canonicalUrl,
      languages: {
        'en': `/en/${seoData.canonicalUrl}`,
        'ar': `/ar/${seoData.canonicalUrl}`,
      },
    },
    robots: {
      index: !seoData.noIndex,
      follow: !seoData.noFollow,
    },
  };
}
```

### 2. Structured Data / JSON-LD (`src/lib/seo/structuredData.ts`)

```typescript
// Blog Post Article Schema
export function generateBlogPostSchema(post: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.asset?.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name,
      jobTitle: post.author?.role,
      image: post.author?.avatar?.asset?.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tranzkit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tranzkit.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tranzkit.com/${locale}/resources/blogs/${post.slug.current}`,
    },
  };
}

// FAQ Page Schema
export function generateFAQSchema(faqs: any[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Job Posting Schema
export function generateJobPostingSchema(job: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.fullDescription,
    datePosted: job.postedDate,
    validThrough: job.closingDate,
    employmentType: job.type,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Tranzkit',
      sameAs: 'https://tranzkit.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        value: 0,
        unitText: 'YEAR',
      },
    },
  };
}

// Case Study Schema (as Article)
export function generateCaseStudySchema(caseStudy: any, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    image: caseStudy.featuredImage?.asset?.url,
    datePublished: caseStudy.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Tranzkit',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tranzkit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tranzkit.com/logo.png',
      },
    },
  };
}
```

### 3. Structured Data Component

```typescript
// src/components/seo/structured-data.tsx
export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

## 🔍 Search Functionality Implementation

### Client-Side FAQ Search (`src/lib/utils/search.ts`)

```typescript
export interface SearchableItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
}

export function searchFAQs(
  items: SearchableItem[],
  query: string
): SearchableItem[] {
  if (!query || query.trim() === '') {
    return items;
  }

  const searchTerm = query.toLowerCase().trim();

  return items.filter((item) => {
    // Search in question
    if (item.question.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in answer
    if (item.answer.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in tags
    if (item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))) {
      return true;
    }

    // Search in category
    if (item.category?.toLowerCase().includes(searchTerm)) {
      return true;
    }

    return false;
  });
}

// Highlight matching text
export function highlightText(text: string, query: string): string {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
```

### FAQ Search Component (`src/components/sections/resources/faq-search.tsx`)

```typescript
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FAQSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function FAQSearch({ onSearch, placeholder }: FAQSearchProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder || 'Search FAQs...'}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-12 h-14 text-lg"
      />
    </div>
  );
}
```

---

## 📊 Page Routing Structure

```
/[locale]/resources                          → Resources Hub Landing
/[locale]/resources/blogs                    → Blog Listing
/[locale]/resources/blogs/[slug]             → Individual Blog Post
/[locale]/resources/case-studies             → Case Studies Listing
/[locale]/resources/case-studies/[slug]      → Individual Case Study
/[locale]/resources/faq                      → FAQ Page (with search)
/[locale]/resources/documentation            → Documentation Landing
/[locale]/resources/documentation/[slug]     → Individual Doc Page (optional)
/[locale]/resources/careers                  → Careers Listing
/[locale]/resources/careers/[slug]           → Individual Job Posting
```

---

## 🏗️ Implementation Roadmap

### Phase 1: Sanity Schemas (Week 1)
- [ ] Create all document schemas (blogPost, author, caseStudy, faqItem, documentation, career)
- [ ] Create all category schemas (blogCategory, caseStudyCategory, faqCategory)
- [ ] Create object schemas (metricItem, richTextBlock if needed)
- [ ] Register all schemas in `index.ts`
- [ ] Test Sanity Studio loads without errors
- [ ] Create sample content for each type

### Phase 2: Queries & Data Fetching (Week 1-2)
- [ ] Add all GROQ queries to `src/lib/sanity/queries.ts`
- [ ] Create query helper functions (getBlogPosts, getCaseStudies, etc.)
- [ ] Test queries in Sanity Vision
- [ ] Implement pagination helpers
- [ ] Add error handling for queries

### Phase 3: Blog Section (Week 2)
- [ ] Create blog listing page (`/resources/blogs/page.tsx`)
- [ ] Create blog post page (`/resources/blogs/[slug]/page.tsx`)
- [ ] Create blog components (BlogCard, BlogHero, BlogContent, BlogSidebar)
- [ ] Implement rich text renderer for blog content
- [ ] Add filtering by category
- [ ] Add pagination
- [ ] Implement SEO metadata
- [ ] Add structured data (Article schema)
- [ ] Test with sample blog posts

### Phase 4: Case Studies Section (Week 2-3)
- [ ] Create case studies listing page
- [ ] Create individual case study page
- [ ] Create case study components (CaseStudyCard, CaseStudyHero, CaseStudyMetrics, CaseStudyContent)
- [ ] Implement metrics display
- [ ] Add filtering by category/industry
- [ ] Implement SEO metadata
- [ ] Add structured data
- [ ] Test with sample case studies

### Phase 5: FAQ Section (Week 3)
- [ ] Modify FAQ page to use Sanity data
- [ ] Implement client-side search functionality
- [ ] Create FAQSearch component
- [ ] Create FAQAccordion component with categories
- [ ] Add category filtering
- [ ] Implement FAQ structured data (FAQPage schema)
- [ ] Test search functionality
- [ ] Optimize for accessibility

### Phase 6: Documentation Section (Week 3-4)
- [ ] Create documentation landing page
- [ ] Create individual documentation pages (if using multiple pages)
- [ ] Create DocumentationNav component (table of contents)
- [ ] Create DocumentationContent component
- [ ] Implement rich text renderer
- [ ] Add anchor links for sections
- [ ] Implement SEO metadata
- [ ] Test with sample documentation

### Phase 7: Careers Section (Week 4)
- [ ] Create careers listing page (`/resources/careers/page.tsx`)
- [ ] Create individual job posting page (`/resources/careers/[slug]/page.tsx`)
- [ ] Create CareerCard component
- [ ] Create CareerDetail component
- [ ] Create CareerApplicationForm component
- [ ] Implement job posting structured data (JobPosting schema)
- [ ] Add filtering by department/location
- [ ] Implement SEO metadata
- [ ] Test application form submission

### Phase 8: Resources Hub Landing Page (Week 4)
- [ ] Update resources hub landing page with Sanity data
- [ ] Create ResourcesHubPage schema in Sanity
- [ ] Implement "All" filter showing all resource types
- [ ] Update FilterTabs component
- [ ] Update CardList component to handle all resource types
- [ ] Add featured content sections
- [ ] Implement proper routing

### Phase 9: SEO & Performance (Week 5)
- [ ] Implement metadata generation for all pages
- [ ] Add structured data to all resource pages
- [ ] Generate XML sitemap for all resources
- [ ] Add canonical URLs
- [ ] Implement Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Test SEO with Google Rich Results Test
- [ ] Optimize images (Next.js Image component)
- [ ] Implement proper caching strategies

### Phase 10: Testing & Polish (Week 5-6)
- [ ] Test all pages in English and Arabic
- [ ] Test RTL layout for Arabic
- [ ] Test responsive design on all screen sizes
- [ ] Test search functionality
- [ ] Test filtering and pagination
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing
- [ ] Fix any bugs or issues

---

## ✅ Success Criteria

1. **Functionality**
   - All resource types (blogs, case studies, FAQ, documentation, careers) are fully functional
   - Search works correctly for FAQ
   - Filtering and pagination work on all listing pages
   - All dynamic routes work correctly

2. **SEO**
   - All pages have proper meta tags
   - Structured data validates in Google Rich Results Test
   - XML sitemap includes all resource pages
   - Canonical URLs are correct
   - Open Graph and Twitter Cards work

3. **Internationalization**
   - All content supports English and Arabic
   - RTL layout works correctly for Arabic
   - Localized URLs work properly

4. **Performance**
   - Lighthouse score > 90 for all pages
   - Images are optimized
   - Proper caching is implemented

5. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation works
   - Screen reader friendly

---

## 📝 Notes & Recommendations

1. **Documentation HTML**: Use Portable Text (Option A) instead of raw HTML for better security and editing experience
2. **Career Migration**: Keep existing `careerItem` object for backward compatibility with About page, create new `career` document for Resources section
3. **Search**: Client-side search is sufficient for FAQ. For blogs/case studies, consider implementing server-side search if content grows large
4. **Pagination**: Start with 12 items per page, adjust based on content volume
5. **Caching**: Use Next.js ISR with 5-minute revalidation for resource pages
6. **Images**: Always use Next.js Image component with proper sizing and lazy loading
7. **Rich Text**: Create custom serializers for Portable Text to match your design system

---

## 🚀 Next Steps

1. **Review this plan** with the team
2. **Get approval** on schema designs and routing structure
3. **Set up development environment** and create feature branch
4. **Begin Phase 1** - Sanity schema creation
5. **Iterate and test** each phase before moving to the next


