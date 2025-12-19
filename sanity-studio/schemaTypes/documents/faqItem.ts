import { defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Items',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'localizedRichText',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Keywords for search functionality',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this FAQ on the website',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'question.en',
      subtitle: 'category.name.en',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title,
        subtitle: `${subtitle} ${!isActive ? '(Inactive)' : ''}`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

