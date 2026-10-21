// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://www.dillzbites.com',
  base: '/',
  output: 'static',
  build: {
    assets: '_astro'
  }
});
