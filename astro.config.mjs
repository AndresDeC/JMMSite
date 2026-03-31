import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // Asegúrate que el import sea así
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Forzamos el modo servidor para que el admin funcione
  output: 'server', 
  adapter: vercel({
    webAnalytics: { enabled: true },
    edgeMiddleware: true // <--- Cambiamos a arquitectura Edge
  }),
  integrations: [
    react(),
    sanity({
      projectId: '7451e60s',
      dataset: 'production',
      useCdn: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/sanity')) {
              return 'sanity';
            }
          }
        }
      }
    }
  }
});