import { defineType } from 'sanity';

/**
 * CTA Section Object
 * Call-to-action section with heading, subtitle, and buttons
 */
export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedText',
    },
    {
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'ctaButton',
    },
    {
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'ctaButton',
    },
    {
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'Gradient', value: 'gradient' },
          { title: 'Solid', value: 'solid' },
          { title: 'Image', value: 'image' },
        ],
      },
      initialValue: 'gradient',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      hidden: ({ parent }) => parent?.backgroundStyle !== 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      heading: 'heading.en',
      subtitle: 'subtitle.en',
    },
    prepare({ heading, subtitle }) {
      return {
        title: heading || 'CTA Section',
        subtitle: subtitle || '',
      };
    },
  },
});

