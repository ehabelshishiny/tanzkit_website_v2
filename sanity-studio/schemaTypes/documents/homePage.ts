import { defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';
import { iconField } from '../fields/iconField';

/**
 * Home Page (Singleton)
 * Content for the homepage
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'overview',
      title: 'Why Choose Tranzkit',
      type: 'object',
      description: '✨ Features section with icons highlighting key benefits (4 features recommended)',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'localizedString',
          description: 'Main heading (e.g., "Why Choose Tranzkit")',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
          description: 'Supporting text below the heading',
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          description: '➕ Add 4 features with icons. Each feature needs an icon, title, and description',
          validation: (Rule) => Rule.min(3).max(6).warning('Recommended: 4 features for optimal display'),
          of: [
            {
              type: 'object',
              fields: [
                iconField({
                  description: 'Select an icon for this feature (e.g., Zap, Shield, Users, BarChart)',
                  required: true,
                }),
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                  description: 'Feature title (e.g., "Lightning Fast")',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                  description: 'Brief description of the feature',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'title.en',
                  icon: 'icon',
                },
                prepare({ title, icon }) {
                  return {
                    title: title || 'Untitled Feature',
                    subtitle: icon ? `Icon: ${icon}` : 'No icon selected',
                  };
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'featureTabs',
      title: 'Feature Tabs',
      type: 'object',
      description: '📑 Interactive tabs showcasing different features with images',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
        },
        {
          name: 'tabs',
          title: 'Tabs',
          type: 'array',
          description: '➕ Add 3-5 tabs. Each tab needs an image (recommended: 1200x800px or similar aspect ratio)',
          validation: (Rule) => Rule.min(3).max(5).warning('Recommended: 3-5 tabs for optimal display'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Tab Label',
                  type: 'localizedString',
                  description: 'Short label for the tab button (e.g., "Fleet Management")',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                  description: 'Main title shown when tab is active',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                  description: 'Detailed description of the feature',
                },
                {
                  name: 'features',
                  title: 'Features List',
                  description: '✅ Bullet points highlighting key benefits (3-5 items recommended)',
                  type: 'array',
                  validation: (Rule) => Rule.max(6).warning('Keep it concise: 3-5 features work best'),
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'text',
                          title: 'Feature Text',
                          type: 'localizedString',
                          validation: (Rule) => Rule.required(),
                        },
                      ],
                      preview: {
                        select: {
                          title: 'text.en',
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'image',
                  title: 'Tab Image',
                  type: 'image',
                  description: '🖼️ Feature screenshot or illustration (recommended: 1200x800px, landscape orientation)',
                  validation: (Rule) => Rule.required().error('Each tab must have an image'),
                  options: {
                    hotspot: true,
                  },
                },
              ],
              preview: {
                select: {
                  title: 'label.en',
                  media: 'image',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'screenshotCarousel',
      title: 'Screenshot Carousel',
      type: 'object',
      description: '📸 "See in Action" carousel showcasing app screenshots',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
        },
        {
          name: 'items',
          title: 'Screenshot Items',
          type: 'array',
          description: '➕ Add 5-8 screenshots. Each needs an image (recommended: 1200x800px or app screenshot dimensions)',
          validation: (Rule) => Rule.min(5).max(10).warning('Recommended: 5-8 screenshots for best carousel experience'),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                  description: 'Name of the feature or screen shown',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                  description: 'Brief description of what this screenshot shows',
                },
                {
                  name: 'category',
                  title: 'Category',
                  type: 'localizedString',
                  description: 'Optional category tag (e.g., "Mobile App", "Dashboard", "Reports")',
                },
                {
                  name: 'image',
                  title: 'Screenshot Image',
                  type: 'image',
                  description: '📱 App screenshot or interface preview (recommended: actual app screenshots at 1200px width)',
                  validation: (Rule) => Rule.required().error('Each screenshot item must have an image'),
                  options: {
                    hotspot: true,
                  },
                },
              ],
              preview: {
                select: {
                  title: 'title.en',
                  media: 'image',
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'logoBar',
      title: 'Logo Bar Section',
      type: 'object',
      description: '🏢 Scrolling logo bar showing partner/client companies',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'localizedString',
          description: 'Section heading (e.g., "Trusted by Industry Leaders")',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          description: 'Optional subtitle text',
        },
        {
          name: 'logos',
          title: 'Partner Logos',
          type: 'array',
          description: '🎨 Add 6-10 company logos. Use PNG/SVG with transparent backgrounds (recommended: 200-300px width)',
          validation: (Rule) => Rule.min(6).max(12).warning('Recommended: 6-10 logos for smooth scrolling animation'),
          of: [
            {
              type: 'image',
              description: 'Company logo (PNG/SVG, transparent background, ~200-300px width)',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
        },
        {
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [{ type: 'testimonial' }],
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'ctaSection',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      };
    },
  },
});

