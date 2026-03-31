import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(), 
    sanity({
      projectId: '7451e60s', // <--- Solo pega el ID que sacaste de la web
      dataset: 'production',
      useCdn: true,
      studioAt: '/admin', // <--- Esto es clave: El CMS vivirá en tuweb.com/admin
    })
  ]
});