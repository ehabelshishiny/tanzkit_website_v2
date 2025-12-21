import { defineType } from 'sanity';

/**
 * Localized String Field
 * Used for short text content that needs English and Arabic translations
 * Examples: titles, headings, button labels, short descriptions
 */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ar',
      title: 'Arabic (العربية)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      en: 'en',
      ar: 'ar',
    },
    prepare({ en, ar }) {
      return {
        title: en || ar || 'Untitled',
        subtitle: ar || en || '',
      };
    },
  },
});

