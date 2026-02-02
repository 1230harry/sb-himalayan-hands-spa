import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import previewAction from './plugins/previewAction'

export default defineConfig({
  name: 'default',
  title: 'sb-spa-demo',

  projectId: 'mhhq6nvb',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), previewAction],

  schema: {
    types: schemaTypes,
  },
})
