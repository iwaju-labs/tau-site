// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { rehypeInternalLinks } from './src/plugins/rehypeInternalLinks.ts';
import { internalLinks } from './src/data/internalLinks.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://trytau.app',

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    rehypePlugins: [
      [rehypeInternalLinks, internalLinks],
    ],
  },

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [react(), sitemap()],

  adapter: vercel()
});
