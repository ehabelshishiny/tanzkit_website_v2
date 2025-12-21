import { defineType } from 'sanity';
import { iconField } from '../fields/iconField';

export const workflowStep = defineType({
  name: 'workflowStep',
  title: 'Workflow Step',
  type: 'object',
  fields: [
    {
      name: 'step',
      title: 'Step Number',
      type: 'number',
      description: 'Step number in the workflow',
      validation: (Rule) => Rule.required().min(1),
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
      description: 'Select an icon for this workflow step',
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
      subtitle: 'step',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `Step ${subtitle}: ${title}`,
        media,
      };
    },
  },
});

