import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  future: {
    experimental_faster: false,
    v4: true,
  },
  title: 'ISBD for Manifestation',
  tagline: 'International Standard Bibliographic Description for Manifestation',
  favicon: 'img/favicon.ico',

  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/ISBDM/',

  organizationName: 'iflastandards',
  projectName: 'ISBDM',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',


  customFields: {
    vocabularyDefaults: {
      prefix: "isbdm",
      startCounter: 1000,
      uriStyle: "numeric",
      numberPrefix: "T", // Prefix for numeric URIs. Can be blank for no prefix.
      caseStyle: "kebab-case",
      showFilter: true,
      filterPlaceholder: "Filter vocabulary terms...",
      showTitle: false,
      showURIs: true, // Whether to display URIs in the table, set to false for glossaries
      showCSVErrors: false, // Whether to display CSV validation errors by default
      profile: "isbdm-values-profile-revised.csv",
      profileShapeId: "Concept",
      RDF: {
        "rdf:type": ["skos:ConceptScheme"]
      },
      // Common defaults for elements and defines the vocabulary properties
      elementDefaults: {
        uri: "https://www.iflastandards.info/ISBDM/elements",
        classPrefix: "C", // Class Prefix for numeric URIs. Can be blank for no prefix.
        propertyPrefix: "P", // Property Prefix for numeric URIs. Can be blank for no prefix.
        profile: "isbdm-elements-profile.csv",
        profileShapeId: "Element",
      }
    }
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
    },
  },
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-client-redirects',
      {
        // This will be populated at build time
        redirects: [],
        createRedirects(existingPath) {
          // Check if this is an element path that needs redirection
          const elementMatch = existingPath.match(/^\/docs\/(attributes|statements|notes|relationships)\/(\d+)$/);
          if (elementMatch) {
            const elementId = elementMatch[2];
            // Create redirect from old elements path
            return [`/docs/elements/${elementId}`];
          }
          return undefined;
        },
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/iflastandards/ISBDM/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
	  versions: {
            current: {
              label: 'Latest',
              path: '',
            },
          },
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);

            function filterIndexMdx(items) {
              return items
                  .filter(item => {
                    // Filter out any doc items that represent index files
                    if (item.type === 'doc') {
                      // Check if the id ends with 'index' or contains '/index'
                      const docId = item.id || item.docId || '';
                      if (docId === 'index' || 
                          docId.endsWith('/index') || 
                          docId.split('/').pop() === 'index') {
                        return false;
                      }
                    }
                    return true;
                  })
                  .map(item => {
                    // Recursively filter items within categories
                    if (item.type === 'category' && item.items) {
                      return {...item, items: filterIndexMdx(item.items)};
                    }
                    return item;
                  });
            }

            return filterIndexMdx(sidebarItems);
          }
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/iflastandards/ISBDM/tree/main/',
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
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        // language: ['en', 'fr', 'es', 'de'], // Optional: match your locales
        indexBlog: false, // Optional: only index docs, not blog
        // Add further options as needed
      },
    ],
  ],
    themeConfig: {
    // Configure TOC to show up to 5 heading levels
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
      versionPersistence: 'localStorage',
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
