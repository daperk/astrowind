import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel/serverless';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

// Build a slug -> lastmod map from post frontmatter so the sitemap carries an
// accurate per-URL <lastmod> (freshness signal for search engines).
const postDates: Record<string, string> = {};
try {
  const postDir = path.resolve(__dirname, './src/data/post');
  for (const file of fs.readdirSync(postDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const slug = file.replace(/\.(md|mdx)$/, '');
    const head = fs.readFileSync(path.join(postDir, file), 'utf-8').slice(0, 800);
    const upd = head.match(/^updateDate:\s*(.+)$/m);
    const pub = head.match(/^publishDate:\s*(.+)$/m);
    const raw = (upd?.[1] ?? pub?.[1] ?? '').trim().replace(/^["']|["']$/g, '');
    if (raw) {
      const d = new Date(raw);
      if (!isNaN(d.getTime())) postDates[slug] = d.toISOString();
    }
  }
} catch {
  // ignore; sitemap simply omits lastmod
}

export default defineConfig({
  output: 'static',
  adapter: vercel({}),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      serialize(item) {
        try {
          const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
          if (postDates[slug]) item.lastmod = postDates[slug];
        } catch {
          // leave item unchanged
        }
        return item;
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
