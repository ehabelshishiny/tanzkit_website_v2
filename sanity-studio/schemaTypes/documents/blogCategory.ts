import { defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Categories',
  type: 'document',
  icon: TagIcon,
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for category badge (e.g., #3B82F6)',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }).error('Please enter a valid hex color (e.g., #3B82F6)'),
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'description.en',
    },
  },
});

