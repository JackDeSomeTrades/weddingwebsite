# Our Wedding Website

A Kannada Smartha Brahmin wedding website built with [Astro](https://astro.build) and hosted on GitHub Pages at
**https://jackdesometrades.github.io/weddingwebsite/**.

## Editing content

Every tab is a Markdown file in [`src/content/pages/`](src/content/pages/):

| File | Tab |
|---|---|
| `home.md` | Home (nav entry only; see "Home page" below) |
| `our-story.md` | Our Story (timeline) |
| `events.md` | Events (cards) |
| `rituals.md` | Rituals Guide (timeline) |
| `travel.md` | Travel & Stay |
| `rsvp.md` | RSVP (placeholder for now) |
| `faq.md` | FAQ |
| `gallery.md` | Gallery (photos come from `src/assets/gallery/`) |
| `registry.md` | Registry |

Names, date, city, hashtag and the Kannada invocation shown in the hero and footer live in
[`src/data/site.json`](src/data/site.json).

### Home page

The home page is the hero (names, date, countdown from `site.json`) followed by scrolling bands.
Each band is a file in [`src/content/home/`](src/content/home/), shown in `order`:

```md
---
order: 2
band: color            # color | white | photo
title: Our Story
titleKn: ನಮ್ಮ ಕಥೆ
button: { label: Read more, href: /our-story }
# image: /images/home/engagement.jpg   (for band: photo)
---
Short summary text…
```

Photos dropped into `src/assets/hero/` turn the hero into a cross-fading slideshow.

### Event cards and timelines

`events.md` lists each event in its front-matter (`day`, `time`, `title`, `titleKn`, `venue`, `place`,
`address`, `description`, `dress`, `mapUrl`, `image`). Events with the same `day` are grouped.

`rituals.md` and `our-story.md` use `layout: timeline`, with a `timeline:` list of `label`, `title`, `titleKn`,
`text` and `image`. Any page can use either layout.

Images go in `public/images/…` and are referenced like `/images/events/muhurtha.jpg`. Without an image, a
watercolour placeholder with the Kannada name is shown.

Tip: if a value contains a colon, wrap it in quotes, e.g. `dress: "Traditional: silk sarees"`.

### Adding a new tab

Create `src/content/pages/<name>.md`. It appears in the navigation automatically at `/<name>/`:

```md
---
title: Mehendi Night          # shown in the nav and page heading
titleKn: ಮೆಹಂದಿ               # optional Kannada subtitle
order: 4                      # position in the nav (lower = further left)
showInNav: true               # set false to hide from the nav (page still exists)
background: floral            # floral | plain (more can be added in theme.css)
layout: prose                 # prose | events | timeline
widget: countdown             # optional: countdown | gallery
---

Your content here…
```

### Hiding or removing a tab

| Want to… | Do this |
|---|---|
| Switch a tab off completely (no page, no menu link, and its home band disappears) | add `hidden: true` to its front-matter |
| Keep the page reachable by link, but not in the menu | add `showInNav: false` |
| Park a file without it being used at all | rename it with a leading underscore, e.g. `_registry.md` |
| Remove it for good | delete the file |

Home bands work the same way: `hidden: true` or a leading `_` in `src/content/home/`.
To comment out a single line inside a page, wrap it in `<!-- … -->`.

### Writing Kannada

Wrap Kannada text so it uses the Kannada font:

```md
### Saptapadi · <span lang="kn">ಸಪ್ತಪದಿ</span>
```

### Links

Link to other tabs with a leading slash, e.g. `[RSVP](/rsvp)`. The site's base path is added automatically.

## Design, fonts & backgrounds

All colours, fonts and background images are tokens in [`src/styles/theme.css`](src/styles/theme.css).
The current look is a placeholder (modern minimal + watercolour floral) until the artist's designs are ready.

- **Fonts:** three roles, `--font-en` (English), `--font-kn` (Kannada) and `--font-script` (calligraphy). Update the
  variables in `theme.css` and the Google Fonts `<link>` in `src/layouts/BaseLayout.astro`.
- **Backgrounds:** put images in `public/images/` and set `--bg-floral-image` / `--bg-hero-image`.
- **Divider & florals:** replace the SVGs in `src/components/KolamDivider.astro` and `src/components/FloralCluster.astro`.
- **Home bands:** `--color-band`, `--color-band-text`, `--color-band-accent`.

## Animation

All motion lives in [`src/scripts/motion.ts`](src/scripts/motion.ts) and [`src/styles/motion.css`](src/styles/motion.css):
scroll reveals (`data-reveal`, `data-reveal="left|right|zoom|draw"`), parallax (`data-parallax="0.2"`), falling petals,
kolam line drawing, hero slideshow, and the shrinking nav. Everything is turned off for visitors whose device
is set to reduce motion.

## Running locally

```sh
npm install
npm run dev       # http://localhost:4321/weddingwebsite/
npm run build     # production build into dist/
```

## Deploying

Pushing to `main` builds and deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
