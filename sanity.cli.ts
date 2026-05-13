// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '7451e60s', // El que ya tienes en el config de Astro
    dataset: 'production',
  },
  deployment: {
    appId: 'oc6lwed1dfmqvxdmhmul7qi8',
    autoUpdates: true
  },
});