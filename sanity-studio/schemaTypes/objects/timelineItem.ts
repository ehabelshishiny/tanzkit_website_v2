import { defineType } from 'sanity';
import { iconField } from '../fields/iconField';

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
    iconField({
      description: 'Select an icon for this timeline item',
    }),
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'title.en',
    },
  },
});

