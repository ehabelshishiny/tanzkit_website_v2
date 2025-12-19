import { defineType } from 'sanity';

/**
 * Solutions: Enterprises & Passengers Page
 * Based on solutions.enterprisesPassengers in translation JSON
 */
export const solutionsEnterprisesPassengersPage = defineType({
  name: 'solutionsEnterprisesPassengersPage',
  title: 'Solutions: Enterprises & Passengers',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Solutions: Enterprises & Passengers',
      readOnly: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
        {
          name: 'cta',
          title: 'CTA Button Text',
          type: 'localizedString',
        },
      ],
    },
    // Audience Switcher (Tabs)
    {
      name: 'audienceSwitcher',
      title: 'Audience Switcher',
      type: 'object',
      fields: [
        {
          name: 'tabs',
          title: 'Tab Labels',
          type: 'object',
          fields: [
            {
              name: 'enterprise',
              title: 'Enterprise Tab',
              type: 'localizedString',
            },
            {
              name: 'passenger',
              title: 'Passenger Tab',
              type: 'localizedString',
            },
          ],
        },
        {
          name: 'enterprise',
          title: 'Enterprise Content',
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
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'featureItem' }],
            },
          ],
        },
        {
          name: 'passenger',
          title: 'Passenger Content',
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
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'featureItem' }],
            },
          ],
        },
      ],
    },
    // Overview Section
    {
      name: 'overview',
      title: 'Overview Section',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Overview Text',
          type: 'localizedText',
        },
      ],
    },
    // Feature Showcase
    {
      name: 'featureShowcase',
      title: 'Feature Showcase',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
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
                  name: 'title',
                  title: 'Feature Title',
                  type: 'localizedString',
                },
                {
                  name: 'description',
                  title: 'Feature Description',
                  type: 'localizedText',
                },
              ],
            },
          ],
        },
      ],
    },
    // Workflow Section
    {
      name: 'workflow',
      title: 'Workflow Section',
      type: 'object',
      fields: [
        {
          name: 'passenger',
          title: 'Passenger Workflow',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'localizedText',
            },
            {
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [{ type: 'workflowStep' }],
            },
          ],
        },
        {
          name: 'enterprise',
          title: 'Enterprise Workflow',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'localizedText',
            },
            {
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [{ type: 'workflowStep' }],
            },
          ],
        },
      ],
    },
    // App Screens Carousel
    {
      name: 'appScreens',
      title: '📱 App Screens Carousel',
      type: 'object',
      description: 'Showcase different app screens with screenshots',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'localizedString',
          description: 'e.g., "Powerful App Features"',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'localizedText',
          description: 'Brief description of the app features',
        },
        {
          name: 'screenshots',
          title: 'App Screenshots',
          type: 'array',
          description: 'Upload screenshots of different app screens',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Screen Name',
                  type: 'localizedString',
                  description: 'e.g., "Booking Interface", "Trip Tracking"',
                },
                {
                  name: 'description',
                  title: 'Screen Description',
                  type: 'localizedText',
                  description: 'Brief description of what this screen shows',
                },
                {
                  name: 'image',
                  title: 'Screenshot',
                  type: 'image',
                  description: 'App screenshot (recommended: 1200x800px)',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    // Features Section
    {
      name: 'features',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Overview Text',
          type: 'localizedText',
          description: 'Introductory text displayed above the features',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'items',
          title: 'Feature Items',
          type: 'array',
          of: [
            {
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
                {
                  name: 'points',
                  title: 'Feature Points',
                  type: 'array',
                  of: [{ type: 'localizedString' }],
                },
              ],
            },
          ],
        },
      ],
    },
    // Testimonials
    {
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
        },
        {
          name: 'items',
          title: 'Testimonial Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                },
                {
                  name: 'role',
                  title: 'Role',
                  type: 'localizedString',
                },
                {
                  name: 'company',
                  title: 'Company',
                  type: 'string',
                },
                {
                  name: 'content',
                  title: 'Testimonial Content',
                  type: 'localizedText',
                },
                {
                  name: 'initials',
                  title: 'Initials',
                  type: 'string',
                  description: 'Two-letter initials for avatar',
                },
                {
                  name: 'rating',
                  title: 'Rating',
                  type: 'number',
                  validation: (Rule) => Rule.min(1).max(5),
                  initialValue: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    // AI Impact Section
    {
      name: 'aiImpact',
      title: 'AI Impact Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'AI Advantage Title',
          type: 'localizedString',
          description: 'Title for the AI advantage section',
        },
        {
          name: 'subtitle',
          title: 'AI Advantage Subtitle',
          type: 'localizedText',
          description: 'Description for the AI advantage section',
        },
        {
          name: 'impactTitle',
          title: 'Impact Metrics Title',
          type: 'localizedString',
          description: 'Title for the impact metrics section (e.g., "Real Impact, Real Results")',
        },
        {
          name: 'metrics',
          title: 'Impact Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Metric Value',
                  type: 'localizedString',
                  description: 'e.g., "40%", "2.5x"',
                },
                {
                  name: 'label',
                  title: 'Metric Label',
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
    // CTA Section
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'ctaSection',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Solutions: Enterprises & Passengers',
      };
    },
  },
});

