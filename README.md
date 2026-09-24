# Our Wedding Website

A Kannada Smartha Brahmin wedding website built with [Astro](https://astro.build) and hosted on GitHub Pages at
**https://jackdesometrades.github.io/weddingwebsite/**.

## Editing content

Every tab is a Markdown file in [`src/content/pages/`](src/content/pages/):

| File | Tab |
|---|---|
| `home.md` | Home (text below the hero) |
| `our-story.md` | Our Story |
| `events.md` | Events & schedule |
| `rituals.md` | Rituals Guide |
| `travel.md` | Travel & Stay |
| `rsvp.md` | RSVP (placeholder for now) |
| `faq.md` | FAQ |
| `gallery.md` | Gallery (photos come from `src/assets/gallery/`) |
| `registry.md` | Registry |

Names, date, city, hashtag and the Kannada invocation shown in the hero and footer live in
[`src/data/site.json`](src/data/site.json).

### Adding a new tab

Create `src/content/pages/<name>.md`. It appears in the navigation automatically at `/<name>/`:

```md
---
title: Mehendi Night          # shown in the nav and page heading
titleKn: ಮೆಹಂದಿ               # optional Kannada subtitle
order: 4                      # position in the nav (lower = further left)
showInNav: true               # set false to hide from the nav (page still exists)
background: floral            # floral | plain (more can be added in theme.css)
widget: countdown             # optional: countdown | gallery
---

Your content here…
```

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
- **Divider:** replace the SVG in `src/components/KolamDivider.astro`.

## Running locally

```sh
npm install
npm run dev       # http://localhost:4321/weddingwebsite/
npm run build     # production build into dist/
```

## Deploying

Pushing to `main` builds and deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
