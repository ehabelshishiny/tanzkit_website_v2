import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Tranzkit CMS',

  projectId: '1dovcqcz',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(), // GROQ query playground
  ],

  schema: {
    types: schemaTypes,
  },

  // Studio customization
  studio: {
    components: {},
  },

  // Theme customization (Tranzkit brand colors)
  theme: {
    // You can customize colors here later
  },
})
