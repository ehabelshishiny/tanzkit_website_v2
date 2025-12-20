import { defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons';
import { IconPicker } from '../../components/IconPicker';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: CaseIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      description: 'Short summary of the case study (shown in listings, max 300 characters)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'localizedString',
      description: 'e.g., Transportation, Logistics, Public Transit',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      description: 'City, Country',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localizedString',
          description: 'Alternative text for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'localizedRichText',
      description: 'What problem did the client face?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'localizedRichText',
      description: 'How did Tranzkit solve the problem?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'results',
      title: 'Results',
      type: 'localizedRichText',
      description: 'What were the outcomes?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      description: 'Quantifiable results (e.g., 50% increase in efficiency)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'localizedString',
              description: 'e.g., 50%, 2x, $1M',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              description: 'e.g., Increase in Efficiency, Cost Savings',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Select an icon for this metric (e.g., TrendingUp, DollarSign)',
              components: {
                input: IconPicker,
              },
            },
          ],
          preview: {
            select: {
              value: 'value.en',
              label: 'label.en',
            },
            prepare({ value, label }) {
              return {
                title: value,
                subtitle: label,
              };
            },
          },
        },
      ],
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'localizedText',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Author Role',
          type: 'localizedString',
          description: 'e.g., CEO, Operations Manager',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'avatar',
          title: 'Author Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudyCategory' }] }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Show this case study in featured sections',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'clientName.en',
      media: 'featuredImage.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Client: ${subtitle}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});

