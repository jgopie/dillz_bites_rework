// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dillzbites.com',
  base: '/',
  output: 'static',
  build: {
    assets: '_astro'
  }
});
