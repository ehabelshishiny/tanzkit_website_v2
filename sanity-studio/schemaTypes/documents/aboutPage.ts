import { defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Page',
      readOnly: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'object',
          fields: [
            {
              name: 'enterprises',
              title: 'Enterprises',
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Value',
                  type: 'localizedString',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'localizedString',
                },
              ],
            },
            {
              name: 'drivers',
              title: 'Drivers',
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Value',
                  type: 'localizedString',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'localizedString',
                },
              ],
            },
            {
              name: 'trips',
              title: 'Trips',
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Value',
                  type: 'localizedString',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'localizedString',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'story',
      title: 'Story Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
        {
          name: 'mission',
          title: 'Mission',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'localizedText',
            },
          ],
        },
        {
          name: 'vision',
          title: 'Vision',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'localizedText',
            },
          ],
        },
        {
          name: 'values',
          title: 'Values',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            },
            {
              name: 'innovation',
              title: 'Innovation',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                },
              ],
            },
            {
              name: 'reliability',
              title: 'Reliability',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                },
              ],
            },
            {
              name: 'sustainability',
              title: 'Sustainability',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'timeline',
      title: 'Timeline Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
        {
          name: 'milestones',
          title: 'Milestones',
          type: 'array',
          of: [{ type: 'timelineItem' }],
        },
      ],
    },
    {
      name: 'team',
      title: 'Team Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
        {
          name: 'members',
          title: 'Team Members',
          type: 'array',
          of: [{ type: 'teamMember' }],
        },
      ],
    },
    {
      name: 'careers',
      title: 'Careers Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
        {
          name: 'openings',
          title: 'Job Openings',
          type: 'array',
          of: [{ type: 'careerItem' }],
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'ctaSection',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      };
    },
  },
});

