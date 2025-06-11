/**
 * Base configuration for all IFLA standards sites
 * This contains all shared defaults that apply to every site
 */

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

export const baseConfig: Partial<Config> = {
  // Basic site metadata - will be overridden per site
  favicon: 'img/favicon.ico',
  
  // Future flags for performance
  future: {
    experimental_faster: true,
    v4: true,
  },

  // GitHub pages deployment config
  organizationName: 'iflastandards',
  projectName: 'standards-dev',
  trailingSlash: true,
  
  // Error handling
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',

  // Static directories - theme static first to ensure shared assets take precedence
  staticDirectories: ['../../packages/theme/static', 'static'],

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
    },
  },

  // Standard plugins
  plugins: [
    'docusaurus-plugin-sass',
    // Custom webpack configuration to handle Node.js polyfills
    function webpackPolyfillPlugin() {
      return {
        name: 'webpack-polyfill-plugin',
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                fs: false,
                path: false,
                crypto: false,
                stream: false,
                util: false,
                child_process: false,
                os: false,
              },
              alias: {
                // Disable problematic modules
                '@node-rs/jieba': false,
                '@node-rs/jieba-wasm32-wasi': false,
                '@nodelib/fs.scandir': false,
                '@nodelib/fs.stat': false,
                '@nodelib/fs.walk': false,
              }
            },
            ignoreWarnings: [
              /Failed to parse source map/,
              /Can't resolve.*in/,
              /Module not found/,
            ],
          };
        },
      };
    },
  ],

  // Classic preset configuration
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
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
          // Filter out index.mdx files from sidebar
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);

            function filterIndexMdx(items: any[]): any[] {
              return items
                  .filter((item: any) => {
                    if (item.type === 'doc') {
                      const docId = item.id || item.docId || '';
                      if (docId === 'index' || 
                          docId.endsWith('/index') || 
                          docId.split('/').pop() === 'index') {
                        return false;
                      }
                    }
                    return true;
                  })
                  .map((item: any) => {
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

  // Search theme - temporarily disabled to avoid jieba issues
  themes: [
    // [
    //   require.resolve('@easyops-cn/docusaurus-search-local'),
    //   {
    //     hashed: true,
    //     indexBlog: false,
    //   },
    // ],
  ],
};

// Base theme configuration
export const baseThemeConfig: Preset.ThemeConfig = {
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
  image: 'img/docusaurus-social-card.jpg',
  
  // Navbar configuration
  navbar: {
    logo: {
      alt: 'IFLA Logo',
      src: 'img/logo-ifla_black.png',
    },
    items: [], // Sites will add their own items
  },

  // Footer configuration
  footer: {
    style: 'dark',
    links: [
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
            href: '../portal/',
          },
        ],
      },
    ],
    copyright: `<div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;"><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"><img src="img/cc0_by.png" alt="Badge for Creative Commons Attribution 4.0 International license" style="height: 20px;" /></a><span>Copyright © ${new Date().getFullYear()} International Federation of Library Associations and Institutions (IFLA).</span></div>`,
  },

  // Color mode configuration
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },

  // Prism configuration
  prism: {
    theme: prismThemes.github,
    darkTheme: prismThemes.dracula,
  },
};

// Default vocabulary settings
export const vocabularyDefaults = {
  prefix: "ifla",
  startCounter: 1000,
  uriStyle: "numeric" as const,
  numberPrefix: "T",
  caseStyle: "kebab-case" as const,
  showFilter: true,
  filterPlaceholder: "Filter vocabulary terms...",
  showTitle: false,
  showURIs: true,
  showCSVErrors: false,
  profile: "vocabulary-profile.csv",
  profileShapeId: "Concept",
  RDF: {
    "rdf:type": ["skos:ConceptScheme"]
  },
  elementDefaults: {
    uri: "https://www.iflastandards.info/elements",
    classPrefix: "C",
    propertyPrefix: "P",
    profile: "elements-profile.csv",
    profileShapeId: "Element",
  }
};