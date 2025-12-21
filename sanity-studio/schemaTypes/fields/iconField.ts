import { defineField } from 'sanity';
import { IconPicker } from '../../components/IconPicker';

/**
 * Reusable Icon Field Definition
 * Provides autocomplete, preview, and validation for Lucide icons
 */
export const iconField = (options?: {
  name?: string;
  title?: string;
  description?: string;
  required?: boolean;
}) => {
  return defineField({
    name: options?.name || 'icon',
    title: options?.title || 'Icon',
    type: 'string',
    description: options?.description || 'Select a Lucide icon from the dropdown or search for one',
    components: {
      input: IconPicker,
    },
    validation: options?.required
      ? (Rule) => Rule.required().error('Icon is required')
      : undefined,
  });
};

