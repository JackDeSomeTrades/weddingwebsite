// Prefixes root-relative links/images in Markdown (e.g. "/rsvp") with the site base path.
export default function rehypeBaseLinks({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  const fix = (value) => {
    if (typeof value !== 'string' || !prefix) return value;
    if (!value.startsWith('/') || value.startsWith('//')) return value;
    if (value === prefix || value.startsWith(prefix + '/')) return value;
    return prefix + value;
  };
  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      if ('href' in node.properties) node.properties.href = fix(node.properties.href);
      if ('src' in node.properties) node.properties.src = fix(node.properties.src);
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}
