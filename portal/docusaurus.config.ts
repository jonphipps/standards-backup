import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'IFLA Standards Portal',
  tagline: 'Collaborative workspace for IFLA bibliographic standards',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://portal.ifla.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ifla', // Usually your GitHub org/user name.
  projectName: 'standards-portal', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'IFLA Standards Portal',
      logo: {
        alt: 'IFLA Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Standards',
          position: 'left',
          items: [
            {
              label: 'ISBDM',
              href: '/isbdm/',
            },
            {
              label: 'ISBD',
              href: '/isbd/',
            },
            {
              label: 'LRM',
              href: '/lrm/',
            },
            {
              label: 'FR',
              href: '/fr/',
            },
            {
              label: 'MULDICAT',
              href: '/muldicat/',
            },
            {
              label: 'UNIMARC',
              href: '/unimarc/',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Manage',
          position: 'left',
          items: [
            {
              label: 'Pull Sheet',
              to: '/sheets/pull',
            },
            {
              label: 'New Page',
              to: '/docs/new',
            },
            {
              label: 'Draft Release',
              to: '/releases/draft',
            },
            {
              label: 'Vocabulary Editor',
              to: '/editor',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ifla/standards-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Standards',
          items: [
            {
              label: 'ISBDM',
              href: '/isbdm/',
            },
            {
              label: 'ISBD',
              href: '/isbd/',
            },
            {
              label: 'LRM',
              href: '/lrm/',
            },
            {
              label: 'UNIMARC',
              href: '/unimarc/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Documentation',
              to: '/docs/',
            },
            {
              label: 'RDF Vocabularies',
              href: 'https://vocab.staging.ifla.org',
            },
            {
              label: 'Contributor Guidelines',
              to: '/docs/contribute',
            },
          ],
        },
        {
          title: 'IFLA',
          items: [
            {
              label: 'IFLA Website',
              href: 'https://www.ifla.org',
            },
            {
              label: 'Standards & Best Practices',
              href: 'https://www.ifla.org/references/best-practice-for-national-bibliographic-agencies-in-a-digital-age/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ifla/standards-dev',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} International Federation of Library Associations and Institutions (IFLA). All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
