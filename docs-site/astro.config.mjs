import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeBaseLinks from './plugins/base-links.mjs';

// Static output only: `astro build` emits a plain `dist/` folder that GitHub
// Pages (or any web server) can serve. Full-text search is Pagefind — a
// static index generated at build time under /_pagefind/. No database, no
// server runtime.
//
// llms.txt is generated after the build by scripts/generate-llms-txt.mjs
// (`npm run build` chains it) — a plain index of every page for AI assistants.
export default defineConfig({
  site: 'https://websummoner.github.io',
  base: '/ggr/',

  // Hand-written root-relative links in Markdown are not base-aware on their
  // own; this rewrites them so the base stays a single setting.
  markdown: {
    rehypePlugins: [[rehypeBaseLinks, { base: '/ggr/' }]],
  },

  integrations: [
    starlight({
      title: 'Ggr',
      description:
        'A lightweight active load balancer used to create scalable and highly-available Selenium clusters. Developed and maintained by RIADVICE.',
      favicon: '/img/favicon.png',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://websummoner.github.io/ggr/img/og-image.jpg' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://websummoner.github.io/ggr/img/og-image.jpg' } },
      ],
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'Source code',
          href: 'https://github.com/WebSummoner/ggr',
        },
        {
          icon: 'seti:docker',
          label: 'Docker image',
          href: 'https://hub.docker.com/r/websummoner/ggr',
        },
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { slug: 'quick-start' },
            { slug: 'configuration-file-locations' },
          ],
        },
        {
          label: 'Guides',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
        {
          label: 'Project',
          items: [{ slug: 'contributing' }],
        },
      ],
    }),
  ],
});
