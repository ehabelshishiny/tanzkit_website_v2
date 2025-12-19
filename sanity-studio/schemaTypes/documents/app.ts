import { defineType } from 'sanity';
import { MobileDeviceIcon } from '@sanity/icons';

/**
 * App (Collection)
 * Individual app pages (Rider, Driver, Supervisor, etc.)
 */
export const app = defineType({
  name: 'app',
  title: 'Apps',
  type: 'document',
  icon: MobileDeviceIcon,
  fields: [
    {
      name: 'name',
      title: 'App Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (e.g., rider, driver, supervisor)',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'localizedString',
      description: 'Short description for the app',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: '📂 Which segment does this app belong to?',
      options: {
        list: [
          { title: 'Operators', value: 'operators' },
          { title: 'Enterprise', value: 'enterprise' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'layoutType',
      title: 'Layout Type',
      type: 'string',
      description: '📱 Display orientation for the app',
      options: {
        list: [
          { title: 'Portrait (Mobile)', value: 'portrait' },
          { title: 'Landscape (Desktop)', value: 'landscape' },
        ],
      },
      initialValue: 'portrait',
    },
    {
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      description: '✨ Short benefit points displayed on the apps showcase page',
      of: [{ type: 'localizedString' }],
      validation: (Rule) => Rule.required().min(3).max(5),
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      description: '📸 App screenshots for the carousel section. Recommended dimensions:\n' +
        '• Portrait (Mobile Apps): 1080 × 1920 px (9:16 ratio)\n' +
        '• Landscape (Dashboard Apps): 1920 × 1080 px (16:9 ratio)\n' +
        'Upload at least 4-6 screenshots showing key features.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      description: '⭐ Main features of the app (optional)',
      of: [{ type: 'featureItem' }],
    },
    {
      name: 'steps',
      title: 'Getting Started Steps',
      type: 'array',
      description: '🚀 Step-by-step guide showing users how to get started with the app',
      of: [{ type: 'workflowStep' }],
      validation: (Rule) => Rule.min(3).max(6),
    },
    {
      name: 'platforms',
      title: 'Available Platforms',
      type: 'object',
      description: '📱 Which platforms is this app available on?',
      fields: [
        {
          name: 'ios',
          title: 'iOS',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'android',
          title: 'Android',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'web',
          title: 'Web',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'storeUrls',
      title: 'Store URLs',
      type: 'object',
      fields: [
        {
          name: 'appStore',
          title: 'App Store URL',
          type: 'url',
        },
        {
          name: 'playStore',
          title: 'Play Store URL',
          type: 'url',
        },
        {
          name: 'webApp',
          title: 'Web App URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'cta',
      title: 'Call-to-Action Section',
      type: 'ctaSection',
      description: '📣 Bottom CTA section encouraging users to download or try the app',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: '🔢 Order in which this app appears on the Apps page (lower numbers first)',
      initialValue: 0,
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name.en', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'tagline.en',
      media: 'screenshots.0',
    },
  },
});

