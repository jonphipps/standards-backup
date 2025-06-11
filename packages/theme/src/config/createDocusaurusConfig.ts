/**
 * Factory function to create a complete Docusaurus configuration
 * Combines base config with site-specific overrides
 */

import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { baseConfig, baseThemeConfig } from './baseConfig';
import { getSiteConfig, siteConfigs } from './siteConfigs';
import merge from 'lodash.merge';

export interface CreateConfigOptions {
  siteId: string;
  additionalConfig?: Partial<Config>;
}

export function createDocusaurusConfig(options: CreateConfigOptions): Config {
  const { siteId, additionalConfig = {} } = options;
  
  const siteConfig = getSiteConfig(siteId);
  
  if (!siteConfig) {
    throw new Error(`No configuration found for site: ${siteId}`);
  }

  const isDev = process.env.NODE_ENV !== 'production';
  
  // Build the complete URL and baseUrl
  const url = isDev 
    ? `http://localhost:${siteConfig.port}` 
    : 'https://iflastandards.github.io';
  
  // Build baseUrl: portal uses '/' in production, standards use their paths
  let baseUrl: string;
  if (isDev) {
    // In development, extract the site path from ghPath (e.g., '/standards-dev/LRM/' -> '/LRM/')
    baseUrl = siteConfig.ghPath.replace('/standards-dev', '');
  } else {
    // In production, portal is at root, standards keep their full paths
    baseUrl = siteConfig.id === 'portal' ? '/' : siteConfig.ghPath;
  }

  // Build the complete configuration
  const config: Config = merge(
    {},
    baseConfig,
    {
      title: siteConfig.title,
      tagline: siteConfig.tagline,
      url,
      baseUrl,
      customFields: siteConfig.customFields || {},
      staticDirectories: siteConfig.staticDirectories,
      
      // Add client redirects plugin if site has element redirects
      plugins: siteConfig.id === 'isbdm' ? [
        ...baseConfig.plugins || [],
        [
          '@docusaurus/plugin-client-redirects',
          {
            redirects: [],
            createRedirects(existingPath: string) {
              const elementMatch = existingPath.match(/^\/docs\/(attributes|statements|notes|relationships)\/(\d+)$/);
              if (elementMatch) {
                const elementId = elementMatch[2];
                return [`/docs/elements/${elementId}`];
              }
              return undefined;
            },
          },
        ],
      ] : baseConfig.plugins,
      
      // Update preset with site-specific edit URL
      presets: baseConfig.presets?.map(preset => {
        if (Array.isArray(preset) && preset[0] === 'classic') {
          const [name, options] = preset;
          return [
            name,
            merge({}, options, {
              docs: {
                editUrl: siteConfig.editUrl,
              },
              blog: {
                editUrl: siteConfig.editUrl,
              },
            }),
          ];
        }
        return preset;
      }),
      
      // Theme configuration - explicitly construct to avoid merge issues
      themeConfig: {
        ...baseThemeConfig,
        navbar: {
          ...baseThemeConfig.navbar,
          title: siteConfig.navbar?.title || siteConfig.title,
          items: [
            // Process navbar items and replace dynamic URLs
            ...(siteConfig.navbar?.items?.map(item => {
              if (typeof item === 'object' && 'items' in item && Array.isArray(item.items)) {
                // Handle dropdown items
                return {
                  ...item,
                  items: item.items.map((subItem: any) => {
                    if (typeof subItem === 'object' && 'href' in subItem && typeof subItem.href === 'string') {
                      // Replace dynamic URL placeholders using reusable function
                      const urlMap: Record<string, string> = {
                        '__DYNAMIC_ISBDM_URL__': getStandardUrl('isbdm'),
                        '__DYNAMIC_LRM_URL__': getStandardUrl('lrm'),
                        '__DYNAMIC_FR_URL__': getStandardUrl('fr'),
                        '__DYNAMIC_ISBD_URL__': getStandardUrl('isbd'),
                        '__DYNAMIC_MULDICAT_URL__': getStandardUrl('muldicat'),
                        '__DYNAMIC_UNIMARC_URL__': getStandardUrl('unimarc'),
                      };
                      const newHref = urlMap[subItem.href] || subItem.href;
                      return { ...subItem, href: newHref };
                    }
                    return subItem;
                  })
                };
              }
              return item;
            }) || []),
            // Add GitHub link if not already present and editUrl is defined
            ...(siteConfig.editUrl && !siteConfig.navbar?.items?.some(item => 
              typeof item === 'object' && 'href' in item && item.href?.includes('github')
            ) ? [{
              href: 'https://github.com/iflastandards/standards-dev',
              position: 'right' as const,
              className: 'header-github-link',
              'aria-label': 'GitHub repository',
            }] : []),
          ],
        },
        // Use site-specific footer if provided, otherwise use base footer
        footer: siteConfig.footer || baseThemeConfig.footer,
      } as Preset.ThemeConfig,
    },
    additionalConfig
  );

  return config;
}

// Helper function to get URL for a specific site
export function getSiteUrl(siteId: string, path: string = '/'): string {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) {
    throw new Error(`No configuration found for site: ${siteId}`);
  }
  
  const isDev = process.env.NODE_ENV !== 'production';
  
  if (isDev) {
    // In development, extract the site path from ghPath (e.g., '/standards-dev/LRM/' -> '/LRM/')
    const devPath = siteConfig.ghPath.replace('/standards-dev', '');
    return `http://localhost:${siteConfig.port}${devPath.replace(/\/$/, '')}${path}`;
  } else {
    return `https://iflastandards.github.io${siteConfig.ghPath.replace(/\/$/, '')}${path}`;
  }
}

// Helper function to get the root URL for a standard site (for cross-site navigation)
export function getStandardUrl(siteId: string): string {
  return getSiteUrl(siteId, '/');
}

// Export all site IDs for convenience
export const SITE_IDS = ['portal', 'isbdm', 'lrm', 'fr', 'isbd', 'muldicat', 'unimarc'] as const;
export type SiteId = typeof SITE_IDS[number];