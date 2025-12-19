import { defineType } from 'sanity';

export const solutionsPage = defineType({
  name: 'solutionsPage',
  title: 'Solutions Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Solutions Page',
      readOnly: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'object',
          fields: [
            {
              name: 'smart',
              title: 'Smart',
              type: 'localizedString',
            },
            {
              name: 'mobility',
              title: 'Mobility',
              type: 'localizedString',
            },
            {
              name: 'practicalResults',
              title: 'Practical Results',
              type: 'localizedString',
            },
          ],
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'cta',
          title: 'CTA Text',
          type: 'localizedString',
        },
        {
          name: 'nodes',
          title: 'Network Nodes',
          type: 'object',
          fields: [
            {
              name: 'operator',
              title: 'Operator',
              type: 'localizedString',
            },
            {
              name: 'enterprise',
              title: 'Enterprise',
              type: 'localizedString',
            },
            {
              name: 'supervisor',
              title: 'Supervisor',
              type: 'localizedString',
            },
            {
              name: 'driver',
              title: 'Driver',
              type: 'localizedString',
            },
            {
              name: 'rider',
              title: 'Rider',
              type: 'localizedString',
            },
          ],
        },
      ],
    },
    {
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'localizedText',
        },
        {
          name: 'howWeHelp',
          title: 'How We Help',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            },
            {
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
          ],
        },
      ],
    },
    {
      name: 'audienceCards',
      title: 'Audience Cards Section',
      type: 'object',
      fields: [
        {
          name: 'operators',
          title: 'Operators Card',
          type: 'object',
          fields: [
            {
              name: 'headline',
              title: 'Headline',
              type: 'localizedString',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localizedText',
            },
            {
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
            {
              name: 'cta',
              title: 'CTA Text',
              type: 'localizedString',
            },
          ],
        },
        {
          name: 'enterprises',
          title: 'Enterprises Card',
          type: 'object',
          fields: [
            {
              name: 'headline',
              title: 'Headline',
              type: 'localizedString',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'localizedText',
            },
            {
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
            {
              name: 'cta',
              title: 'CTA Text',
              type: 'localizedString',
            },
          ],
        },
      ],
    },
    {
      name: 'technology',
      title: 'Technology Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          of: [{ type: 'localizedString' }],
        },
      ],
    },
    {
      name: 'whyTranzkit',
      title: 'Why Tranzkit Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'reasons',
          title: 'Reasons',
          type: 'array',
          of: [{ type: 'localizedString' }],
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Solutions Page',
      };
    },
  },
});

