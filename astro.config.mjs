// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { rehypeInternalLinks } from './src/plugins/rehypeInternalLinks.ts';
import { internalLinks } from './src/data/internalLinks.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://trytau.app',
  trailingSlash: 'never',

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

  integrations: [
    react(),
    sitemap({
      serialize(item) {
        // Homepage — highest priority, checked frequently
        if (item.url === 'https://trytau.app/') {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 1, lastmod: new Date().toISOString() };
        }
        // Blog index — updated when posts are added
        if (item.url === 'https://trytau.app/blog') {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.8, lastmod: new Date().toISOString() };
        }
        // Individual blog posts — rarely change after publish
        if (item.url.startsWith('https://trytau.app/blog/')) {
          return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.7 };
        }
        // Features index
        if (item.url === 'https://trytau.app/features') {
          return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.75, lastmod: new Date().toISOString() };
        }
        // Individual feature pages — high-intent, keyword-rich
        if (item.url.startsWith('https://trytau.app/features/')) {
          return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 };
        }
        // Free tools — high-intent landing pages
        if (item.url.startsWith('https://trytau.app/tools/')) {
          return { ...item, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.75 };
        }
        // Changelog
        if (item.url === 'https://trytau.app/changelog') {
          return { ...item, changefreq: ChangeFreqEnum.WEEKLY, priority: 0.6, lastmod: new Date().toISOString() };
        }
        // Legal / low-value pages
        if (item.url.includes('/privacy') || item.url.includes('/terms') || item.url.includes('/thank-you')) {
          return { ...item, changefreq: ChangeFreqEnum.YEARLY, priority: 0.3 };
        }
        return item;
      },
    }),
  ],

  adapter: vercel()
});
