import { defineType } from 'sanity';

/**
 * Testimonial Object
 * Customer testimonial with quote, author, and role
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
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
      title: 'Author Role/Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'localizedString',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    },
  ],
  preview: {
    select: {
      author: 'author.en',
      role: 'role.en',
    },
    prepare({ author, role }) {
      return {
        title: author || 'Unnamed Author',
        subtitle: role || '',
      };
    },
  },
});

