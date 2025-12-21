import { defineType } from 'sanity';

export const careerItem = defineType({
  name: 'careerItem',
  title: 'Career Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Department',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Employment Type',
      type: 'localizedString',
      description: 'e.g., Full-time, Part-time, Contract',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'localizedText',
      description: 'Brief summary shown in the careers list',
    },
    {
      name: 'fullDescription',
      title: 'Full Job Description',
      type: 'localizedRichText',
      description: 'Detailed job description with responsibilities, requirements, benefits, etc.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the job posting',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'applyUrl',
      title: 'External Apply URL (Optional)',
      type: 'url',
      description: 'If you use an external application system, add the URL here. Leave empty to use built-in application form.',
    },
    {
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string',
      description: 'Email address where applications will be sent (defaults to site contact email if empty)',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show this job posting on the careers page',
      initialValue: true,
    },
    {
      name: 'postedDate',
      title: 'Posted Date',
      type: 'date',
      description: 'When this job was posted',
    },
    {
      name: 'closingDate',
      title: 'Closing Date',
      type: 'date',
      description: 'Application deadline (optional)',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'department.en',
    },
  },
});

