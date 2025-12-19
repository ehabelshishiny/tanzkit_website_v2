import { defineType } from 'sanity';

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
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or identifier',
    },
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

