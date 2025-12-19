import { defineType } from 'sanity';

/**
 * Hero Section Object
 * Reusable hero section with title, subtitle, and CTAs
 */
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  description: '🎯 Main hero section at the top of the page',
  fields: [
    {
      name: 'title',
      title: 'Title (First Part)',
      type: 'localizedString',
      description: '📝 First part of the title in regular text (e.g., "The Enterprise OS For"). This will appear before the highlighted text.',
      validation: (Rule) => Rule.required().error('Title is required for both English and Arabic'),
    },
    {
      name: 'titleHighlight',
      title: 'Title Highlight (Second Part)',
      type: 'localizedString',
      description: '✨ Second part of the title with gradient effect (e.g., "Workforce Mobility"). This will be displayed with an emerald-to-blue gradient.',
      validation: (Rule) => Rule.required().error('Highlighted title is required for both English and Arabic'),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedText',
      description: '💬 Supporting text below the title. Keep it concise and compelling (2-3 sentences max).',
    },
    {
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'ctaButton',
      description: '🔘 Main call-to-action button (e.g., "Get Started", "Request Demo")',
    },
    {
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'ctaButton',
      description: '🔘 Optional secondary button (e.g., "Learn More", "Watch Video")',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      titleHighlight: 'titleHighlight.en',
      subtitle: 'subtitle.en',
    },
    prepare({ title, titleHighlight, subtitle }) {
      return {
        title: `${title || ''} ${titleHighlight || ''}`,
        subtitle: subtitle,
      };
    },
  },
});

