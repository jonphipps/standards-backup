import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'IFLA ISBDM',
  tagline: 'International Standard Bibliographic Description (Manifestation)',
  favicon: 'img/favicon.ico',

  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/ISBDM/',

  organizationName: 'iflastandards',
  projectName: 'ISBDM',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    vocabularyDefaults: {
      prefix: "isbdm",
      startCounter: 1000,
      uriStyle: "numeric",
      caseStyle: "kebab-case",
      showFilter: true,
      filterPlaceholder: "Filter vocabulary terms...",
      showTitle: false,
      RDF: {
        "rdf:type": ["skos:ConceptScheme"]
      }
    }
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/iflastandards/ISBDM/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/iflastandards/ISBDM/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Add redirects as needed
        ],
      },
    ],
  ],
  
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    navbar: {
      title: 'ISBDM',
      logo: {
        alt: 'IFLA Logo',
        src: 'img/logo-ifla_black.png',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Instructions',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'intro/index',
              label: 'Introduction',
            },
            {
              type: 'doc',
              docId: 'assess/index',
              label: 'Assessment',
            },
             {
              type: 'doc',
              docId: 'glossary/index',
              label: 'Glossary',
            },
            {
              type: 'doc',
              docId: 'fullex/index',
              label: 'Examples',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Elements',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'statements/index',
              label: 'Statements',
            },
            {
              type: 'doc',
              docId: 'notes/index',
              label: 'Notes',
            },
            {
              type: 'doc',
              docId: 'attributes/index',
              label: 'Attributes',
            },
            {
              type: 'doc',
              docId: 'relationships/index',
              label: 'Relationships',
            },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: 'Values',
          items: [
            {
              type: 'doc',
              docId: 'ves/index',
              label: 'Value Vocabularies',
            },
            {
              type: 'doc',
              docId: 'ses/index',
              label: 'String Encodings Schemes',
            },
          ]
        },
        {
          type: 'dropdown',
          label: 'About',
          position: 'right',
          items: [
            {
              type: 'doc',
              docId: 'about/index',
              label: 'About ISBDM',
            },
            {
              type: 'doc',
              docId: 'about/docusaurus-for-ifla',
              label: 'Modern Documentation Platform',
            },
          ],
        },
        {
          label: 'Resources',
          position: 'right',
          type: 'dropdown',
          items: [
            {
              label: 'RDF Downloads',
              href: '/rdf/',
            },
            {
              label: 'Vocabulary Server',
              href: 'https://iflastandards.info/',
            },
            {
              label: 'IFLA Website',
              href: 'https://www.ifla.org/',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/iflastandards/standards-dev',
              'aria-label': 'GitHub repository',
            },
            {
              label: 'Portal',
              href: '/portal/',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Elements',
              to: '/docs/statements',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'IFLA',
              href: 'https://www.ifla.org/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/iflastandards/standards-dev',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Vocabulary Server',
              href: 'https://iflastandards.info/',
            },
            {
              label: 'Portal',
              href: '/portal/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} IFLA. Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
