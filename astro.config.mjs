import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // <--- IMPORTA ESTO
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 2000, // Sube el límite de aviso a 2MB
      rollupOptions: {
        output: {
          // Esto ayuda a que Sanity no sea un solo bloque gigante
          manualChunks(id) {
            if (id.includes('node_modules/sanity')) {
              return 'sanity';
            }
          }
        }
      }
    }
  },
  integrations: [
    react(), 
    sanity({
      projectId: '7451e60s',
      dataset: 'production',
      useCdn: true,
    })
  ]
});