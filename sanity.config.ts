// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'JM Monterrey Admin',
  projectId: '7451e60s',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      /* Aquí irán tus tipos de contenido como 'post' o 'evento' */
    ],
  },
});