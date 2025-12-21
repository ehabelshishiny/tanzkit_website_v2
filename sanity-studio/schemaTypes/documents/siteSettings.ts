import { defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

/**
 * Site Settings (Singleton)
 * Global site configuration and metadata
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'localizedString',
      description: 'Main site title (appears in browser tab)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'localizedText',
      description: 'Default meta description for the site',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main site logo (SVG or PNG)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (32x32px recommended)',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    },
    {
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'seo',
      description: 'Default SEO settings for pages without custom SEO',
    },
    {
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Announcement Bar',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'text',
          title: 'Announcement Text',
          type: 'localizedString',
        },
        {
          name: 'link',
          title: 'Link URL',
          type: 'string',
        },
        {
          name: 'variant',
          title: 'Variant',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Success', value: 'success' },
              { title: 'Warning', value: 'warning' },
            ],
          },
          initialValue: 'info',
        },
      ],
    },
    {
      name: 'jobApplicationForm',
      title: 'Job Application Form Labels',
      type: 'object',
      description: 'Labels and messages for the job application form',
      fields: [
        {
          name: 'name',
          title: 'Name Label',
          type: 'localizedString',
        },
        {
          name: 'email',
          title: 'Email Label',
          type: 'localizedString',
        },
        {
          name: 'phone',
          title: 'Phone Label',
          type: 'localizedString',
        },
        {
          name: 'resume',
          title: 'Resume Label',
          type: 'localizedString',
        },
        {
          name: 'coverLetter',
          title: 'Cover Letter Label',
          type: 'localizedString',
        },
        {
          name: 'linkedinUrl',
          title: 'LinkedIn URL Label',
          type: 'localizedString',
        },
        {
          name: 'portfolioUrl',
          title: 'Portfolio URL Label',
          type: 'localizedString',
        },
        {
          name: 'submit',
          title: 'Submit Button Text',
          type: 'localizedString',
        },
        {
          name: 'submitting',
          title: 'Submitting Button Text',
          type: 'localizedString',
        },
        {
          name: 'captcha',
          title: 'CAPTCHA Text',
          type: 'localizedString',
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'localizedString',
        },
        {
          name: 'errorMessage',
          title: 'Error Message',
          type: 'localizedString',
        },
        {
          name: 'fileTooBig',
          title: 'File Too Big Error',
          type: 'localizedString',
        },
        {
          name: 'invalidFileType',
          title: 'Invalid File Type Error',
          type: 'localizedString',
        },
        {
          name: 'placeholderName',
          title: 'Name Placeholder',
          type: 'localizedString',
        },
        {
          name: 'placeholderEmail',
          title: 'Email Placeholder',
          type: 'localizedString',
        },
        {
          name: 'placeholderPhone',
          title: 'Phone Placeholder',
          type: 'localizedString',
        },
        {
          name: 'placeholderCoverLetter',
          title: 'Cover Letter Placeholder',
          type: 'localizedString',
        },
        {
          name: 'placeholderLinkedinUrl',
          title: 'LinkedIn URL Placeholder',
          type: 'localizedString',
        },
        {
          name: 'placeholderPortfolioUrl',
          title: 'Portfolio URL Placeholder',
          type: 'localizedString',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'siteTitle.en',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Site Settings',
        media,
      };
    },
  },
});

