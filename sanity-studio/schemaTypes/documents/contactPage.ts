import { defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Page',
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
          name: 'emailLabel',
          title: 'Email Label',
          type: 'localizedString',
        },
        {
          name: 'phoneLabel',
          title: 'Phone Label',
          type: 'localizedString',
        },
        {
          name: 'locationLabel',
          title: 'Location Label',
          type: 'localizedString',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'localizedString',
        },
      ],
    },
    {
      name: 'form',
      title: 'Contact Form Labels',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Form Title',
          type: 'localizedString',
        },
        {
          name: 'subtitle',
          title: 'Form Subtitle',
          type: 'localizedString',
        },
        {
          name: 'name',
          title: 'Name Label',
          type: 'localizedString',
        },
        {
          name: 'namePlaceholder',
          title: 'Name Placeholder',
          type: 'localizedString',
        },
        {
          name: 'email',
          title: 'Email Label',
          type: 'localizedString',
        },
        {
          name: 'emailPlaceholder',
          title: 'Email Placeholder',
          type: 'localizedString',
        },
        {
          name: 'company',
          title: 'Company Label',
          type: 'localizedString',
        },
        {
          name: 'companyPlaceholder',
          title: 'Company Placeholder',
          type: 'localizedString',
        },
        {
          name: 'phone',
          title: 'Phone Label',
          type: 'localizedString',
        },
        {
          name: 'phonePlaceholder',
          title: 'Phone Placeholder',
          type: 'localizedString',
        },
        {
          name: 'userType',
          title: 'User Type Label',
          type: 'localizedString',
        },
        {
          name: 'userTypePlaceholder',
          title: 'User Type Placeholder',
          type: 'localizedString',
        },
        {
          name: 'userTypeEnterprise',
          title: 'User Type: Enterprise',
          type: 'localizedString',
        },
        {
          name: 'userTypeOperator',
          title: 'User Type: Operator',
          type: 'localizedString',
        },
        {
          name: 'message',
          title: 'Message Label',
          type: 'localizedString',
        },
        {
          name: 'messagePlaceholder',
          title: 'Message Placeholder',
          type: 'localizedString',
        },
        {
          name: 'notRobot',
          title: 'Not Robot Label',
          type: 'localizedString',
        },
        {
          name: 'submit',
          title: 'Submit Button',
          type: 'localizedString',
        },
        {
          name: 'submitting',
          title: 'Submitting Text',
          type: 'localizedString',
        },
        {
          name: 'successTitle',
          title: 'Success Title',
          type: 'localizedString',
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'localizedString',
        },
        {
          name: 'successButton',
          title: 'Success Button',
          type: 'localizedString',
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Links Section',
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
      ],
      description: 'Social media links will be pulled from Site Settings',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
      };
    },
  },
});

