import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server', 
  adapter: vercel({
    webAnalytics: { enabled: true },
    // Eliminamos edgeMiddleware para evitar conflictos de resolución
  }),
  integrations: [
    react(),
    sanity({
      projectId: '7451e60s',
      dataset: 'production',
      useCdn: true,
      studioAt: '/admin' // <--- IMPORTANTE: Agregamos esto aquí
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Agregamos esto para evitar que Vite rompa el entrypoint del servidor
    optimizeDeps: {
      exclude: ['@astrojs/vercel']
    },
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