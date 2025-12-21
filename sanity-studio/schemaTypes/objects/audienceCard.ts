import { defineType } from 'sanity';
import { iconField } from '../fields/iconField';

export const audienceCard = defineType({
  name: 'audienceCard',
  title: 'Audience Card',
  type: 'object',
  fields: [
    {
      name: 'id',
      title: 'Card ID',
      type: 'string',
      description: 'Unique identifier (e.g., enterprises, operators)',
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
      description: 'Select an icon for this audience card',
    }),
    {
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Link to the audience-specific page',
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
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'id',
    },
  },
});

