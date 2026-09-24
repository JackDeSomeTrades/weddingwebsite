/** Builds a link that works under the site's base path, e.g. url('rsvp') -> '/weddingwebsite/rsvp/'. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${base}/${clean}/` : `${base}/`;
}

/** Path to a file in public/, e.g. asset('/images/a.jpg') -> '/weddingwebsite/images/a.jpg'. */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

/** Turns a Markdown-style link ("/rsvp", "https://…") into a real href. */
export function link(href: string): string {
  return /^(https?:|mailto:|tel:|#)/.test(href) ? href : url(href);
}
