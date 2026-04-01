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
      studioAt: false 
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});