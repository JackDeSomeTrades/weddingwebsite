import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Images are paths inside public/, e.g. "/images/events/muhurtha.jpg". Leave out for a placeholder.
const image = z.string().optional();

// Files whose name starts with "_" (e.g. _registry.md) are ignored entirely.
const markdown = ['**/*.md', '!**/_*'];

// Every .md file in src/content/pages becomes a tab on the site.
const pages = defineCollection({
  loader: glob({ pattern: markdown, base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    titleKn: z.string().optional(),
    description: z.string().optional(),
    order: z.number().default(100),
    // hidden: true switches the tab off completely (no page, no nav link, no home band linking to it).
    hidden: z.boolean().default(false),
    // showInNav: false keeps the page reachable by its link but leaves it out of the menu.
    showInNav: z.boolean().default(true),
    // Key of a background defined in src/styles/theme.css (e.g. "floral", "plain").
    background: z.string().default('floral'),
    // prose = plain Markdown; events = cards from `events`; timeline = zig-zag from `timeline`.
    layout: z.enum(['prose', 'events', 'timeline']).default('prose'),
    // Optional built-in block rendered below the content.
    widget: z.enum(['countdown', 'gallery']).optional(),
    events: z
      .array(
        z.object({
          day: z.string(),
          time: z.string(),
          title: z.string(),
          titleKn: z.string().optional(),
          venue: z.string().optional(),
          place: z.string().optional(),
          address: z.string().optional(),
          mapUrl: z.string().optional(),
          dress: z.string().optional(),
          description: z.string().optional(),
          image,
        }),
      )
      .optional(),
    timeline: z
      .array(
        z.object({
          label: z.string().optional(),
          title: z.string(),
          titleKn: z.string().optional(),
          text: z.string(),
          image,
        }),
      )
      .optional(),
  }),
});

// Each .md file in src/content/home is one scrolling band on the home page.
const home = defineCollection({
  loader: glob({ pattern: markdown, base: './src/content/home' }),
  schema: z.object({
    order: z.number(),
    hidden: z.boolean().default(false),
    title: z.string().optional(),
    titleKn: z.string().optional(),
    // color = coloured band, white = light band, photo = full-width photo with parallax
    band: z.enum(['color', 'white', 'photo']).default('white'),
    image,
    button: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});

export const collections = { pages, home };
