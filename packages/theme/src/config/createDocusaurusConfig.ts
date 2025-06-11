/**
 * Factory function to create a complete Docusaurus configuration
 * Combines base config with site-specific overrides
 */

import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { baseConfig, baseThemeConfig } from './baseConfig';
import { getSiteConfig, siteConfigs } from './siteConfigs';
import merge from 'lodash.merge';
import path from 'path';

export interface CreateConfigOptions {
  siteId?: string;
  additionalConfig?: Partial<Config>;
}

export function createDocusaurusConfig(options: CreateConfigOptions = {}): Config {
  const { additionalConfig = {} } = options;
  
  // Auto-detect siteId from current working directory if not provided
  let siteId = options.siteId;
  
  if (!siteId) {
    const cwd = process.cwd();
    
    // Try to find the site config that matches the current directory
    // Check if we're in a subdirectory of the monorepo root
    const matchingSite = siteConfigs.find(site => {
      // Check if cwd ends with the site directory
      return cwd.endsWith(site.dir) || cwd.endsWith(site.dir.replace(/\//g, path.sep));
    });
    
    if (!matchingSite) {
      // If no exact match, check if we're running from monorepo root with a specific site
      // This handles cases like "pnpm start portal" from root
      const possibleSiteFromArgs = process.argv.find(arg => 
        siteConfigs.some(site => site.id === arg)
      );
      
      if (possibleSiteFromArgs) {
        siteId = possibleSiteFromArgs;
      } else {
        throw new Error(
          `Could not auto-detect site from directory: ${cwd}\n` +
          `Available sites: ${siteConfigs.map(s => s.id).join(', ')}\n` +
          `Please run from within a site directory or provide siteId explicitly.`
        );
      }
    } else {
      siteId = matchingSite.id;
    }
  }
  
  const siteConfig = getSiteConfig(siteId);
  
  if (!siteConfig) {
    throw new Error(`No configuration found for site: ${siteId}`);
  }

  const isDev = process.env.NODE_ENV !== 'production';
  
  // Build the complete URL and baseUrl
  const url = isDev 
    ? `http://localhost:${siteConfig.port}` 
    : 'https://iflastandards.github.io';
  
  const baseUrl = isDev ? '/' : siteConfig.ghPath;

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
      
      // Theme configuration
      themeConfig: merge(
        {},
        baseThemeConfig,
        {
          navbar: {
            title: siteConfig.navbar?.title || siteConfig.title,
            items: [
              ...(siteConfig.navbar?.items || []),
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
          footer: siteConfig.footer?.links ? {
            ...baseThemeConfig.footer,
            links: [
              ...(siteConfig.footer.links || []),
              ...(baseThemeConfig.footer.links || []),
            ],
          } : baseThemeConfig.footer,
        }
      ) as Preset.ThemeConfig,
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
  return isDev
    ? `http://localhost:${siteConfig.port}${path}`
    : `https://iflastandards.github.io${siteConfig.ghPath.replace(/\/$/, '')}${path}`;
}

// Export all site IDs for convenience
export const SITE_IDS = ['portal', 'isbdm', 'lrm', 'fr', 'isbd', 'muldicat', 'unimarc'] as const;
export type SiteId = typeof SITE_IDS[number];