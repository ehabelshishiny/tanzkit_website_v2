import { defineType } from 'sanity';
import { BookIcon } from '@sanity/icons';

export const documentationPage = defineType({
  name: 'documentationPage',
  title: 'Documentation Page',
  type: 'document',
  icon: BookIcon,
  description: 'Full-width HTML documentation page (no hero section, just HTML content)',
  fields: [
    {
      name: 'htmlContent',
      title: 'HTML Content',
      type: 'object',
      description: '📝 Add your complete HTML documentation here. The content will be displayed full-width with navbar and footer only.',
      fields: [
        {
          name: 'en',
          title: 'English HTML',
          type: 'text',
          rows: 25,
          description: 'Complete HTML content for the documentation page (English). Can include styles, scripts, and any HTML elements.',
        },
        {
          name: 'ar',
          title: 'Arabic HTML',
          type: 'text',
          rows: 25,
          description: 'Complete HTML content for the documentation page (Arabic). Can include styles, scripts, and any HTML elements.',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description: 'Configure meta title, description, and other SEO settings',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Documentation Page',
        subtitle: 'Full-width HTML content page',
      };
    },
  },
});

