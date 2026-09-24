import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every .md file in src/content/pages becomes a tab on the site.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    titleKn: z.string().optional(),
    description: z.string().optional(),
    order: z.number().default(100),
    showInNav: z.boolean().default(true),
    // Key of a background defined in src/styles/theme.css (e.g. "floral", "plain").
    background: z.string().default('floral'),
    // Optional built-in block rendered below the Markdown content.
    widget: z.enum(['countdown', 'gallery']).optional(),
  }),
});

export const collections = { pages };
