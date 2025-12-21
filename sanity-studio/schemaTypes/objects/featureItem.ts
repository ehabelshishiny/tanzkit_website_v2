import { defineType } from 'sanity';
import { iconField } from '../fields/iconField';

/**
 * Feature Item Object
 * Individual feature with icon, title, and description
 */
export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    iconField({
      description: 'Select an icon for this feature (e.g., Zap, Shield, Users)',
    }),
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
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'description.en',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: title || 'Untitled Feature',
        subtitle: subtitle || '',
        media: undefined, // Could add icon preview here
      };
    },
  },
});

