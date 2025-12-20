import { defineType } from 'sanity';
import { iconField } from '../fields/iconField';

export const technologyItem = defineType({
  name: 'technologyItem',
  title: 'Technology Item',
  type: 'object',
  fields: [
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
      description: 'Select an icon for this technology',
    }),
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
  },
});

