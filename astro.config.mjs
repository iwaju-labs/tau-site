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
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
        }
        // Blog index — updated when posts are added
        if (item.url === 'https://trytau.app/blog/') {
          return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
        }
        // Individual blog posts — rarely change after publish
        if (item.url.startsWith('https://trytau.app/blog/')) {
          return { ...item, changefreq: 'monthly', priority: 0.7 };
        }
        // Changelog
        if (item.url === 'https://trytau.app/changelog/') {
          return { ...item, changefreq: 'weekly', priority: 0.6, lastmod: new Date().toISOString() };
        }
        // Legal / low-value pages
        if (item.url.includes('/privacy') || item.url.includes('/terms') || item.url.includes('/thank-you')) {
          return { ...item, changefreq: 'yearly', priority: 0.3 };
        }
        return item;
      },
    }),
  ],

  adapter: vercel()
});
