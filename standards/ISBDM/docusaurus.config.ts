import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const baseConfig = createIFLAConfig({
  title: 'IFLA ISBDM',
  tagline: 'International Standard Bibliographic Description (Manifestation)',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/ISBDM/',
  organizationName: 'iflastandards',
  projectName: 'ISBDM',
  githubUrl: 'https://github.com/iflastandards/ISBDM',
  vocabularyDefaults: VOCABULARY_DEFAULTS.ISBDM,
});

// Customize the base config for ISBDM-specific needs
const config = {
  ...baseConfig,
  
  // Override the navbar with ISBDM-specific navigation
  themeConfig: {
    ...baseConfig.themeConfig,
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
        {
          href: 'https://github.com/iflastandards/ISBDM',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
  },
};

export default config;
