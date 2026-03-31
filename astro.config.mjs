// @ts-check
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(), 
    sanity({
      // Usamos import.meta.env para que Astro lo jale en el build
      projectId: '65f6y8u9', 
      dataset: 'production',
      useCdn: true,
    })
  ]
});