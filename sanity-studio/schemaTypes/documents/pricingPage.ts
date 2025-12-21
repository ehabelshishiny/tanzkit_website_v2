import { defineType } from 'sanity';

export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Pricing Page',
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
          name: 'highlightNoSetupFees',
          title: 'Highlight: No Setup Fees',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'highlightCancelAnytime',
          title: 'Highlight: Cancel Anytime',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'highlightFreeTrial',
          title: 'Highlight: Free Trial',
          type: 'localizedString',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'pricingCards',
      title: 'Pricing Cards Section',
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
          name: 'period',
          title: 'Period Text',
          type: 'localizedString',
          description: 'Text for pricing period (e.g., "/month")',
        },
        {
          name: 'contactSales',
          title: 'Contact Sales Button Text',
          type: 'localizedString',
          description: 'Text for enterprise contact sales button',
        },
        {
          name: 'plans',
          title: 'Pricing Plans',
          type: 'array',
          of: [{ type: 'pricingPlan' }],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: 'comparisonTable',
      title: 'Comparison Table Section',
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
          name: 'tableHeaderFeature',
          title: 'Table Header: Feature',
          type: 'localizedString',
        },
        {
          name: 'tableHeaderStarter',
          title: 'Table Header: Starter',
          type: 'localizedString',
        },
        {
          name: 'tableHeaderProfessional',
          title: 'Table Header: Professional',
          type: 'localizedString',
        },
        {
          name: 'tableHeaderEnterprise',
          title: 'Table Header: Enterprise',
          type: 'localizedString',
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
                  name: 'feature',
                  title: 'Feature Name',
                  type: 'localizedString',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'starter',
                  title: 'Starter Plan',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'professional',
                  title: 'Professional Plan',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'enterprise',
                  title: 'Enterprise Plan',
                  type: 'boolean',
                  initialValue: true,
                },
              ],
            },
          ],
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
        title: 'Pricing Page',
      };
    },
  },
});

