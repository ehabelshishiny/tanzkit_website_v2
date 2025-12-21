import { defineType } from 'sanity';

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    {
      name: 'id',
      title: 'Plan ID',
      type: 'string',
      description: 'Unique identifier (e.g., starter, professional, enterprise)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Plan Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'localizedString',
      description: 'Optional badge text (e.g., "Most Popular", "Best Value")',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'localizedString',
      description: 'Price display (e.g., "$99/mo" or "Custom")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Feature Text',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'included',
              title: 'Included',
              type: 'boolean',
              description: 'Is this feature included in the plan?',
              initialValue: true,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Link for the CTA button',
    },
    {
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      description: 'Highlight this plan (e.g., most popular)',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'price.en',
    },
  },
});

