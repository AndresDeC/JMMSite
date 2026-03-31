import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // <--- IMPORTA ESTO
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'hybrid', // <--- CAMBIA ESTO (Permite el Studio de Sanity)
  adapter: vercel(), // <--- AGREGA ESTO
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(), 
    sanity({
      projectId: '7451e60s',
      dataset: 'production',
      useCdn: true,
      studioAt: '/admin', 
    })
  ]
});