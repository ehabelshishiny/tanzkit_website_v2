import { defineType } from 'sanity';

/**
 * CTA Button Object
 * Reusable call-to-action button with localized text and link
 */
export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'href',
      title: 'Link URL',
      type: 'string',
      description: 'Internal path (e.g., /trial) or external URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      text: 'text.en',
      href: 'href',
    },
    prepare({ text, href }) {
      return {
        title: text || 'Untitled Button',
        subtitle: href,
      };
    },
  },
});

