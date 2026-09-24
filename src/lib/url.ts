/** Builds a link that works under the site's base path, e.g. url('rsvp') -> '/weddingwebsite/rsvp/'. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${base}/${clean}/` : `${base}/`;
}
