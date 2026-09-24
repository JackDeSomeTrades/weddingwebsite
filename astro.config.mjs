// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeBaseLinks from './src/lib/rehype-base-links.mjs';

// GitHub Pages serves this repo at https://jackdesometrades.github.io/weddingwebsite/
// If you later add a custom domain, set `site` to it and `base` to '/'.
const site = 'https://jackdesometrades.github.io';
const base = '/weddingwebsite';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  markdown: {
    // Lets Markdown links like [RSVP](/rsvp) work under the /weddingwebsite base path.
    processor: unified({ rehypePlugins: [[rehypeBaseLinks, { base }]] }),
  },
});
