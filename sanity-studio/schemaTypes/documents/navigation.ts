import { defineType } from 'sanity';
import { MenuIcon } from '@sanity/icons';

/**
 * Navigation (Singleton)
 * Site navigation structure including header and footer
 */
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Path (e.g., /solutions) or external URL',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'submenu',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'localizedString',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'localizedString',
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      description: 'Lucide icon name (optional)',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label.en',
                      subtitle: 'href',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'href',
              hasSubmenu: 'submenu',
            },
            prepare({ title, subtitle, hasSubmenu }) {
              return {
                title: title || 'Untitled',
                subtitle: hasSubmenu ? `${subtitle} (has submenu)` : subtitle,
              };
            },
          },
        },
      ],
    },
    {
      name: 'footerNavColumns',
      title: 'Footer Navigation Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Column Heading',
              type: 'localizedString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'localizedString',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label.en',
                      subtitle: 'href',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'heading.en',
              count: 'links.length',
            },
            prepare({ title, count }) {
              return {
                title: title || 'Untitled Column',
                subtitle: `${count || 0} links`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'localizedString',
      description: 'Use {year} as placeholder for current year',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Settings',
      };
    },
  },
});

