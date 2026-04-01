// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '7451e60s', // El que ya tienes en el config de Astro
    dataset: 'production',
  },
  deployment: {
    appId: 'eskyui9wssh9x9g06388z8qg',
  }
});