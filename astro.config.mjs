import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        'astro/app/entrypoint': path.resolve(__dirname, './node_modules/astro/dist/core/app/index.js')
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