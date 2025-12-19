import { defineType } from 'sanity';

export const appsPage = defineType({
  name: 'appsPage',
  title: 'Apps Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Apps Page',
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
      description: '🎯 Hero Section - Parallax hero with gradient text effects',
      fields: [
        {
          name: 'titlePart1',
          title: 'Title Part 1 (Blue Gradient)',
          type: 'localizedString',
          description: 'First word of the title (e.g., "Intelligent" / "نظام")',
          initialValue: {
            en: 'Intelligent',
            ar: 'نظام',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'titlePart2',
          title: 'Title Part 2 (Green Gradient)',
          type: 'localizedString',
          description: 'Second word of the title (e.g., "Application" / "التطبيقات")',
          initialValue: {
            en: 'Application',
            ar: 'التطبيقات',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'titlePart3',
          title: 'Title Part 3 (Default Color)',
          type: 'localizedString',
          description: 'Third word of the title (e.g., "Ecosystem" / "الذكية")',
          initialValue: {
            en: 'Ecosystem',
            ar: 'الذكية',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          description: 'Subtitle text below the main title',
          initialValue: {
            en: 'Discover our comprehensive suite of mobile and web applications designed to revolutionize workforce mobility across every role',
            ar: 'اكتشف مجموعتنا الشاملة من تطبيقات الهاتف المحمول والويب المصممة لإحداث ثورة في تنقل القوى العاملة عبر كل دور',
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'showcase',
      title: 'Apps Showcase Section',
      type: 'object',
      description: '📱 Apps Showcase - Configure the apps showcase section',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          description: 'Main title for the showcase section (e.g., "Powerful Apps for Every User")',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
          description: 'Subtitle/description for the showcase section',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'operatorsSegment',
          title: 'Operators Segment',
          type: 'object',
          description: 'Configuration for the Operators category',
          fields: [
            {
              name: 'title',
              title: 'Segment Title',
              type: 'localizedString',
              description: 'Title for operators segment (e.g., "Operators Dashboard")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Segment Description',
              type: 'localizedText',
              description: 'Description for operators segment',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'tabLabel',
              title: 'Tab Label',
              type: 'localizedString',
              description: 'Label for the tab button (e.g., "Operators")',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'enterpriseSegment',
          title: 'Enterprise Segment',
          type: 'object',
          description: 'Configuration for the Enterprise category',
          fields: [
            {
              name: 'title',
              title: 'Segment Title',
              type: 'localizedString',
              description: 'Title for enterprise segment (e.g., "Enterprise Dashboard")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Segment Description',
              type: 'localizedText',
              description: 'Description for enterprise segment',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'tabLabel',
              title: 'Tab Label',
              type: 'localizedString',
              description: 'Label for the tab button (e.g., "Enterprise")',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'operatorApps',
          title: 'Operator Apps',
          type: 'array',
          description: 'Select up to 3 apps for the Operators segment',
          of: [
            {
              type: 'reference',
              to: [{ type: 'app' }],
              options: {
                filter: 'category == "operators"',
              },
            },
          ],
          validation: (Rule) => Rule.max(3).error('Maximum 3 operator apps allowed'),
        },
        {
          name: 'enterpriseApps',
          title: 'Enterprise Apps',
          type: 'array',
          description: 'Select up to 2 apps for the Enterprise segment',
          of: [
            {
              type: 'reference',
              to: [{ type: 'app' }],
              options: {
                filter: 'category == "enterprise"',
              },
            },
          ],
          validation: (Rule) => Rule.max(2).error('Maximum 2 enterprise apps allowed'),
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'ctaSection',
      description: '📣 Call-to-Action section at the bottom of the page',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Apps Page',
      };
    },
  },
});

