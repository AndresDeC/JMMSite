import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'; // <--- Asegúrate de que apunte a la carpeta

export default defineConfig({
  name: 'default',
  title: 'JM Monterrey Admin',

  projectId: '7451e60s',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes, // <--- Esto es lo que le dice al panel qué mostrar
  },
})