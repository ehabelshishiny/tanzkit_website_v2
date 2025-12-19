import { defineType } from 'sanity';

/**
 * SEO Object
 * Contains all SEO-related fields for pages and documents
 * Supports localized meta titles, descriptions, and OG images
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: (Rule) =>
        Rule.custom((value: any) => {
          if (!value?.en || !value?.ar) return true;
          const enLength = value.en.length;
          const arLength = value.ar.length;
          if (enLength > 60 || arLength > 60) {
            return 'Meta title should be 60 characters or less';
          }
          return true;
        }),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedText',
      description: 'Description for search engines (150-160 characters recommended)',
      validation: (Rule) =>
        Rule.custom((value: any) => {
          if (!value?.en || !value?.ar) return true;
          const enLength = value.en.length;
          const arLength = value.ar.length;
          if (enLength > 160 || arLength > 160) {
            return 'Meta description should be 160 characters or less';
          }
          return true;
        }),
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'object',
      description: 'Image for social media sharing (1200x630px recommended)',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ar',
          title: 'Arabic (العربية)',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'object',
      description: 'Keywords for SEO (comma-separated)',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'ar',
          title: 'Arabic (العربية)',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical URL for this page (optional)',
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    },
    {
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'Prevent search engines from following links on this page',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'metaTitle.en',
      subtitle: 'metaDescription.en',
    },
  },
});

