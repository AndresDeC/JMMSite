import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Mantenemos el SSR para que los datos de Sanity carguen rápido
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
      // DESACTIVAMOS el Studio local. 
      // Esto elimina el 100% de los errores de "createApp" y alias.
      studioAt: false 
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Adiós a los alias, resolve, manualChunks y hacks. 
    // Queremos que el build sea ligero como una pluma.
  }
});