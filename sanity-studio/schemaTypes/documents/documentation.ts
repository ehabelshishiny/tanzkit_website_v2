import { defineType } from 'sanity';
import { BookIcon } from '@sanity/icons';

export const documentationPage = defineType({
  name: 'documentationPage',
  title: 'Documentation Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedString',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'localizedText',
        },
      ],
    },
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
          description: 'Full HTML content for the documentation page (English)',
        },
        {
          name: 'ar',
          title: 'Arabic HTML',
          type: 'text',
          rows: 20,
          description: 'Full HTML content for the documentation page (Arabic)',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'hero.title.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Documentation Page',
        subtitle: 'Single landing page with HTML content',
      };
    },
  },
});

