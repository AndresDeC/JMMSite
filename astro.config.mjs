import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server', 
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    react(),
    sanity({
      projectId: '7451e60s',
      dataset: 'production',
      useCdn: true,
      // Al ponerlo en false, Astro deja de pelear con las rutas de Sanity
      studioAt: false 
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Cero alias, cero hacks. 
  }
});