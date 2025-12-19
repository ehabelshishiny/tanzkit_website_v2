import { defineType } from 'sanity';

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'object',
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Year or time period (e.g., "2020", "Q1 2021")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or identifier',
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'title.en',
    },
  },
});

