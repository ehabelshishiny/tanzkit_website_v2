import { defineType } from 'sanity';
import { iconField } from '../fields/iconField';

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
      description: '🔧 Technology highlights with icons (4 items recommended)',
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
          description: '➕ Add technology highlights with icons (e.g., Brain, BarChart3, Shield, Globe)',
          validation: (Rule) => Rule.min(3).max(6).warning('Recommended: 4 highlights for optimal display'),
          of: [
            {
              type: 'object',
              fields: [
                iconField({
                  description: 'Select an icon for this highlight (e.g., Brain, BarChart3, Shield, Globe)',
                  required: true,
                }),
                {
                  name: 'text',
                  title: 'Text',
                  type: 'localizedString',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  text: 'text.en',
                  icon: 'icon',
                },
                prepare({ text, icon }) {
                  return {
                    title: text || 'Untitled Highlight',
                    subtitle: icon ? `Icon: ${icon}` : 'No icon selected',
                  };
                },
              },
            },
          ],
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

