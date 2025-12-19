import { defineType } from 'sanity';

/**
 * Feature Section Object
 * Section containing multiple features
 */
export const featureSection = defineType({
  name: 'featureSection',
  title: 'Feature Section',
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
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'featureItem' }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      heading: 'heading.en',
      count: 'features.length',
    },
    prepare({ heading, count }) {
      return {
        title: heading || 'Feature Section',
        subtitle: `${count || 0} features`,
      };
    },
  },
});

