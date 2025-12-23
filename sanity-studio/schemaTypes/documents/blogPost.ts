import { defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    {
      name: 'title',
      title: 'Blog Post Title',
      description: '📰 The main title of your blog post\n💡 Keep it clear, engaging, and under 60 characters for best SEO\n✅ Good: "5 Ways AI is Transforming Public Transportation"\n❌ Avoid: "Blog Post 1"',
      type: 'localizedString',
      validation: (Rule) =>
        Rule.required()
          .error('⚠️ Blog post title is required'),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      description: '🔗 This creates the blog post URL (e.g., /resources/blog/your-slug-here)\n💡 Click "Generate" to auto-create from title',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('⚠️ URL slug is required'),
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'localizedText',
      description: '📝 Short summary shown on blog cards and search results\n📏 Keep it concise: 150-200 characters is ideal\n✅ This is what readers see before clicking',
      validation: (Rule) =>
        Rule.required()
          .error('⚠️ Excerpt is required'),
    },
    {
      name: 'content',
      title: 'Blog Content',
      type: 'localizedRichText',
      description: '✍️ Write your full blog post here\n💡 Use headings (H2, H3) to structure your content\n📝 Add lists, quotes, and links to make it engaging',
      validation: (Rule) => Rule.required().error('⚠️ Blog content is required'),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      description: '📸 This image appears on blog cards and as the hero image on the blog post page',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          description: '✅ RECOMMENDED SIZE: 1200 × 675 pixels (16:9 aspect ratio)\n📏 Format: JPG or WebP\n💾 Max file size: 250KB\n🎨 Keep important content centered (edges may be cropped on mobile)\n\n💡 TIP: Optimize your image before uploading using tinypng.com or squoosh.app',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) =>
            Rule.required()
              .error('⚠️ Featured image is required for all blog posts'),
        },
        {
          name: 'alt',
          title: 'Alt Text (Accessibility)',
          type: 'localizedString',
          description: '♿ Describe the image for screen readers and SEO\n📝 Be descriptive but concise\n✅ Good example: "Team collaborating on transportation software dashboard"\n❌ Bad example: "Image" or "Photo"',
          validation: (Rule) =>
            Rule.required()
              .error('⚠️ Alt text is required for accessibility'),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      description: '👤 Select the author of this blog post\n💡 Create authors in the "Author" section first',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required().error('⚠️ Author is required'),
    },
    {
      name: 'categories',
      title: 'Categories',
      description: '🏷️ Select 1-3 categories that best describe this post\n💡 Categories help readers find related content',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogCategory' }] }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(3)
          .error('⚠️ Select at least 1 category (max 3)'),
    },
    {
      name: 'tags',
      title: 'Tags',
      description: '🔖 Add relevant keywords for better searchability\n💡 Examples: "AI", "Transportation", "Mobile Apps"\n📝 Press Enter after each tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      description: '📅 When should this post be published?\n💡 Future dates will schedule the post',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('⚠️ Published date is required'),
    },
    {
      name: 'updatedAt',
      title: 'Last Updated',
      description: '🔄 Optional: Track when the post was last updated',
      type: 'datetime',
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      description: '⏱️ Estimated reading time in minutes\n💡 Average: 200-250 words per minute\n📝 Example: 1000 words ≈ 4-5 minutes',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(60)
          .error('⚠️ Reading time must be between 1-60 minutes'),
    },
    {
      name: 'featured',
      title: 'Featured Post',
      description: '⭐ Mark as featured to show on homepage and top of blog listing',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'status',
      title: 'Publication Status',
      description: '📊 Control post visibility:\n📝 Draft = Work in progress (not visible)\n✅ Published = Live on website\n📦 Archived = Hidden but kept for reference',
      type: 'string',
      options: {
        list: [
          { title: '📝 Draft', value: 'draft' },
          { title: '✅ Published', value: 'published' },
          { title: '📦 Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required().error('⚠️ Status is required'),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'author.name.en',
      media: 'featuredImage.image',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle} • ${status}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});
