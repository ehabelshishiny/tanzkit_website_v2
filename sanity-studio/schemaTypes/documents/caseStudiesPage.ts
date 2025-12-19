import { defineType } from 'sanity';

export const caseStudiesPage = defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Case Studies Page',
      };
    },
  },
});

