// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://www.dillzbites.com',
  base: '/',
  output: 'server',
  build: {
    assets: '_astro'
  }
});
