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
      studioAt: '/admin'
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // HACK MANUAL: Engañamos a Vite para que encuentre el entrypoint 
        // redirigiéndolo a la carpeta /dist que sí existe en tu node_modules/astro
        'astro/app/entrypoint': 'astro/dist/index.js'
      }
    },
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