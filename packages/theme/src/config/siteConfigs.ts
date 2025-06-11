/**
 * Site-specific configurations for each IFLA standard
 * These override the base configuration with site-specific values
 */

import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { vocabularyDefaults } from './baseConfig';

export interface SiteConfig {
  id: string;
  title: string;
  tagline: string;
  dir: string;
  port: number;
  ghPath: string;
  vocabularyPrefix: string;
  numberPrefix: string;
  editUrl?: string;
  customFields?: Record<string, any>;
  staticDirectories?: string[];
  navbar?: {
    title?: string;
    items?: any[];
  };
  footer?: {
    links?: any[];
  };
}

export const siteConfigs: SiteConfig[] = [
  {
    id: 'portal',
    title: 'IFLA Standards Portal',
    tagline: 'International Federation of Library Associations and Institutions',
    dir: 'portal',
    port: 3000,
    ghPath: '/standards-dev/',
    vocabularyPrefix: 'ifla',
    numberPrefix: 'T',
    staticDirectories: ['../packages/theme/static', 'static'],
    navbar: {
      items: [
        {
          label: 'Standards',
          position: 'left',
          type: 'dropdown',
          items: [
            { label: 'ISBDM', href: '__DYNAMIC_ISBDM_URL__' },
            { label: 'LRM', href: '__DYNAMIC_LRM_URL__' },
            { label: 'FR', href: '__DYNAMIC_FR_URL__' },
            { label: 'ISBD', href: '__DYNAMIC_ISBD_URL__' },
            { label: 'MulDiCat', href: '__DYNAMIC_MULDICAT_URL__' },
            { label: 'UNIMARC', href: '__DYNAMIC_UNIMARC_URL__' },
          ],
        },
        { type: 'doc', docId: 'index', label: 'Documentation', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/manage', label: 'Management', position: 'left', className: 'navbar__item--management' },
        { href: 'https://github.com/iflastandards/standards-dev', label: 'GitHub', position: 'right' },
      ],
    },
    // No custom footer - use base footer
    // footer: undefined,
  },
  {
    id: 'isbdm',
    title: 'ISBD for Manifestation',
    tagline: 'International Standard Bibliographic Description for Manifestation',
    dir: 'standards/ISBDM',
    port: 3001,
    ghPath: '/standards-dev/ISBDM/',
    vocabularyPrefix: 'isbdm',
    numberPrefix: 'T',
    editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/',
    customFields: {
      vocabularyDefaults: {
        ...vocabularyDefaults,
        prefix: "isbdm",
        profile: "isbdm-values-profile-revised.csv",
        elementDefaults: {
          ...vocabularyDefaults.elementDefaults,
          uri: "https://www.iflastandards.info/ISBDM/elements",
          profile: "isbdm-elements-profile.csv",
        }
      }
    },
    navbar: {
      title: 'ISBDM',
      items: [
        {
          type: 'dropdown',
          label: 'Instructions',
          position: 'left',
          items: [
            { type: 'doc', docId: 'intro/index', label: 'Introduction' },
            { type: 'doc', docId: 'assess/index', label: 'Assessment' },
            { type: 'doc', docId: 'glossary/index', label: 'Glossary' },
            { type: 'doc', docId: 'fullex/index', label: 'Examples' },
          ],
        },
        {
          type: 'dropdown',
          label: 'Elements',
          position: 'left',
          items: [
            { type: 'doc', docId: 'statements/index', label: 'Statements' },
            { type: 'doc', docId: 'notes/index', label: 'Notes' },
            { type: 'doc', docId: 'attributes/index', label: 'Attributes' },
            { type: 'doc', docId: 'relationships/index', label: 'Relationships' },
          ],
        },
        {
          type: 'dropdown',
          position: 'left',
          label: 'Values',
          items: [
            { type: 'doc', docId: 'ves/index', label: 'Value Vocabularies' },
            { type: 'doc', docId: 'ses/index', label: 'String Encodings Schemes' },
          ]
        },
        {
          type: 'dropdown',
          label: 'About',
          position: 'right',
          items: [
            { type: 'doc', docId: 'about/index', label: 'About ISBDM' },
            { type: 'doc', docId: 'about/docusaurus-for-ifla', label: 'Modern Documentation Platform' },
          ],
        },
        {
          label: 'Resources',
          position: 'right',
          type: 'dropdown',
          items: [
            { label: 'RDF Downloads', href: './rdf/' },
            { label: 'Vocabulary Server', href: 'https://iflastandards.info/' },
            { label: 'IFLA Website', href: 'https://www.ifla.org/' },
            { label: 'GitHub Repository', href: 'https://github.com/iflastandards/standards-dev' },
            { label: 'Portal', href: process.env.NODE_ENV === 'production' ? '../portal/' : '/portal/' },
          ],
        },
        { to: '/blog', label: 'Blog', position: 'right' },
        { type: 'docsVersionDropdown', position: 'right' },
        { type: 'localeDropdown', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Elements', to: '/docs/statements' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'IFLA', href: 'https://www.ifla.org/' },
            { label: 'GitHub', href: 'https://github.com/iflastandards/standards-dev' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Vocabulary Server', href: 'https://iflastandards.info/' },
            { label: 'Portal', href: process.env.NODE_ENV === 'production' ? '../portal/' : '/portal/' },
          ],
        },
      ],
      copyright: `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
            <img src="img/cc0_by.png" alt="Badge for Creative Commons Attribution 4.0 International license" style="height: 20px;" />
          </a>
          <span>Copyright © ${new Date().getFullYear()} International Federation of Library Associations and Institutions (IFLA).</span>
        </div>
      `,
    },
  },
  {
    id: 'lrm',
    title: 'Library Reference Model',
    tagline: 'IFLA Library Reference Model',
    dir: 'standards/LRM',
    port: 3002,
    ghPath: '/standards-dev/LRM/',
    vocabularyPrefix: 'lrm',
    numberPrefix: 'E',
    editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/',
    customFields: {
      vocabularyDefaults: {
        ...vocabularyDefaults,
        prefix: "lrm",
        numberPrefix: "E",
        profile: "lrm-values-profile.csv",
        elementDefaults: {
          ...vocabularyDefaults.elementDefaults,
          uri: "https://www.iflastandards.info/LRM/elements",
          profile: "lrm-elements-profile.csv",
        }
      }
    },
    navbar: {
      title: 'LRM',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Introduction' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
  },
  {
    id: 'fr',
    title: 'Functional Requirements',
    tagline: 'IFLA Functional Requirements',
    dir: 'standards/fr',
    port: 3003,
    ghPath: '/standards-dev/fr/',
    vocabularyPrefix: 'fr',
    numberPrefix: 'T',
    editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/',
    navbar: {
      title: 'FR',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Introduction' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
  },
  {
    id: 'isbd',
    title: 'ISBD',
    tagline: 'International Standard Bibliographic Description',
    dir: 'standards/isbd',
    port: 3004,
    ghPath: '/standards-dev/isbd/',
    vocabularyPrefix: 'isbd',
    numberPrefix: 'T',
    editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/',
    customFields: {
      vocabularyDefaults: {
        ...vocabularyDefaults,
        prefix: "isbd",
        profile: "isbd-values-profile.csv",
        elementDefaults: {
          ...vocabularyDefaults.elementDefaults,
          uri: "https://www.iflastandards.info/ISBD/elements",
          profile: "isbd-elements-profile.csv",
        }
      }
    },
    navbar: {
      title: 'ISBD',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Introduction' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
  },
  {
    id: 'muldicat',
    title: 'MulDiCat',
    tagline: 'Multilingual Dictionary of Cataloguing Terms and Concepts',
    dir: 'standards/muldicat',
    port: 3005,
    ghPath: '/standards-dev/muldicat/',
    vocabularyPrefix: 'muldicat',
    numberPrefix: 'T',
    editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/',
    navbar: {
      title: 'MulDiCat',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Introduction' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
  },
  {
    id: 'unimarc',
    title: 'UNIMARC',
    tagline: 'Universal Machine-Readable Cataloging',
    dir: 'standards/unimarc',
    port: 3006,
    ghPath: '/standards-dev/unimarc/',
    vocabularyPrefix: 'unimarc',
    numberPrefix: 'T',
    editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/',
    navbar: {
      title: 'UNIMARC',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Introduction' },
        { to: '/blog', label: 'Blog', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
  },
];

export function getSiteConfig(siteId: string): SiteConfig | undefined {
  return siteConfigs.find(site => site.id === siteId);
}
