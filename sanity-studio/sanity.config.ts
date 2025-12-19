import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Tranzkit CMS',

  projectId: '1dovcqcz',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft',
        },
      },
      locate: (params, context) => {
        // Map document types to their preview URLs
        if (params.type === 'homePage') {
          return { locations: [{ title: 'Home Page', href: '/' }] }
        }
        if (params.type === 'aboutPage') {
          return { locations: [{ title: 'About Page', href: '/about' }] }
        }
        if (params.type === 'solutionsPage') {
          return { locations: [{ title: 'Solutions Page', href: '/solutions' }] }
        }
        if (params.type === 'appsPage') {
          return { locations: [{ title: 'Apps Page', href: '/apps' }] }
        }
        if (params.type === 'contactPage') {
          return { locations: [{ title: 'Contact Page', href: '/contact' }] }
        }
        if (params.type === 'pricingPage') {
          return { locations: [{ title: 'Pricing Page', href: '/pricing' }] }
        }
        if (params.type === 'solutionsEnterprisesPassengers') {
          return { locations: [{ title: 'Solutions: Enterprises & Passengers', href: '/solutions/enterprises-passengers' }] }
        }
        if (params.type === 'solutionsOperatorsDrivers') {
          return { locations: [{ title: 'Solutions: Operators & Drivers', href: '/solutions/operators-drivers' }] }
        }
        if (params.type === 'app') {
          // For apps, return a generic location to the apps page
          return { locations: [{ title: 'Apps', href: '/apps' }] }
        }
        return null
      },
    }),
    visionTool(), // GROQ query playground
  ],

  schema: {
    types: schemaTypes,
  },

  // Studio customization
  studio: {
    components: {},
  },

  // Disable update notifications (optional - suppresses the version check error)
  // Uncomment if you want to hide the "Failed to fetch version" warning
  // __internal: {
  //   skipVersionCheck: true,
  // },

  // Theme customization (Tranzkit brand colors)
  theme: {
    // You can customize colors here later
  },
})
