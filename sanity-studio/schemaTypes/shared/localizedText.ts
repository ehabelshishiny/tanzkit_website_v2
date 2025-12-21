import { defineType } from 'sanity';

/**
 * Localized Text Field
 * Used for longer text content that needs English and Arabic translations
 * Examples: paragraphs, descriptions, subtitles
 */
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ar',
      title: 'Arabic (العربية)',
      type: 'text',
      rows: 4,
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

