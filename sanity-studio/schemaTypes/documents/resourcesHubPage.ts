import { defineType } from 'sanity';

export const resourcesHubPage = defineType({
  name: 'resourcesHubPage',
  title: 'Resources Hub Page',
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
      name: 'blogSection',
      title: 'Blog Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'localizedText',
        },
      ],
    },
    {
      name: 'caseStudiesSection',
      title: 'Case Studies Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'localizedText',
        },
      ],
    },
    {
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'localizedText',
        },
      ],
    },
    {
      name: 'documentationSection',
      title: 'Documentation Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'localizedText',
        },
      ],
    },
    {
      name: 'careersSection',
      title: 'Careers Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
        },
        {
          name: 'description',
          title: 'Section Description',
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
        title: 'Resources Hub Page',
      };
    },
  },
});

