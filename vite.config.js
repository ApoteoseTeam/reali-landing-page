import { defineConfig } from 'vite';
import { institution } from './js/content.js';

function getCanonical(value) {
  if (!value) return null;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash || url.username || url.password) {
    throw new Error(
      'CANONICAL_URL deve ser a URL pública da landing page, sem credenciais, parâmetros ou fragmento.',
    );
  }
  return url;
}

export default defineConfig(() => {
  const canonical = getCanonical(institution.CANONICAL_URL);
  const base = canonical ? new URL('.', canonical).pathname : './';

  return {
    base,
    plugins: [
      {
        name: 'reali-seo',
        transformIndexHtml: {
          order: 'post',
          handler(html) {
            if (!canonical) return html;
            return {
              html,
              tags: [
                { tag: 'link', attrs: { rel: 'canonical', href: canonical.href } },
                { tag: 'meta', attrs: { property: 'og:url', content: canonical.href } },
              ],
            };
          },
        },
        generateBundle: {
          order: 'post',
          handler(_, bundle) {
            if (canonical) {
              const page = bundle['index.html'];
              page.source = String(page.source).replace(
                /(property="og:image"\s+content=")([^"]+)/,
                (_, prefix, asset) => prefix + new URL(asset, canonical).href,
              );
            }
            const sitemap = canonical
              ? `  <url><loc>${canonical.href.replaceAll('&', '&amp;')}</loc></url>\n`
              : '';
            const robots = canonical
              ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', canonical).href}\n`
              : 'User-agent: *\nDisallow: /\n';
            this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}</urlset>\n`,
            });
          },
        },
      },
    ],
  };
});
