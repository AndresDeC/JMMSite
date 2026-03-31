// sanity.config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

export default defineConfig({
  name: 'default',
  title: 'JM Monterrey Admin',
  projectId: 'tu_id_real',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: [
      /* Aquí irán tus tipos de contenido como 'post' o 'evento' */
    ],
  },
});