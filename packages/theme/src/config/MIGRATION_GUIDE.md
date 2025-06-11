# Configuration Migration Guide

## Overview

The new configuration system consolidates all IFLA site configurations into a centralized, maintainable structure. This replaces the previous scattered approach with multiple overlapping files.

## New Structure

### 1. Base Configuration (`baseConfig.ts`)
- Contains all shared defaults that apply to every site
- Includes plugins, presets, theme config, etc.
- No site-specific information

### 2. Site Configurations (`siteConfigs.ts`)
- Contains all site-specific overrides in a single place
- Each site has its own configuration object
- Easy to see differences between sites at a glance

### 3. Factory Function (`createDocusaurusConfig.ts`)
- Combines base config with site-specific config
- Handles dev/prod URL generation
- Provides type safety

## Migration Steps

### For Each Site

1. Replace the entire `docusaurus.config.ts` with:

```typescript
import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Site is auto-detected from current working directory
const config: Config = createDocusaurusConfig();

export default config;
```

2. Remove `site.config.ts` if it exists (portal only)

3. If you need site-specific overrides not in `siteConfigs.ts`, add them:

```typescript
const config: Config = createDocusaurusConfig({
  additionalConfig: {
    // Your overrides here
  }
});
```

Note: The site is automatically detected based on the current working directory. No need to specify `siteId` manually!

## Benefits

1. **Single Source of Truth**: All site configurations in one file
2. **Easy Comparison**: See differences between sites at a glance
3. **Type Safety**: Full TypeScript support
4. **Maintainability**: Update shared config in one place
5. **Flexibility**: Easy to add new sites or modify existing ones

## Example: Adding a New Site

1. Add entry to `siteConfigs.ts`:

```typescript
{
  id: 'newsite',
  title: 'New IFLA Standard',
  tagline: 'Description of the new standard',
  dir: 'standards/newsite',
  port: 3007,
  ghPath: '/standards-dev/newsite/',
  vocabularyPrefix: 'new',
  numberPrefix: 'T',
  navbar: {
    title: 'NEW',
    items: [
      // Your navbar items
    ],
  },
}
```

2. Create `docusaurus.config.ts` in the site directory:

```typescript
import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

const config: Config = createDocusaurusConfig();

export default config;
```

## Files to Remove After Migration

Once all sites are migrated, these files can be removed:
- `packages/theme/src/config/docusaurus.base.ts`
- `packages/theme/src/config/docusaurus.ts`
- `packages/theme/src/config/browser.ts`
- `packages/theme/src/config/createIFLAConfig.ts` (old one)
- `packages/theme/src/config/envLoader.ts`
- `packages/theme/src/config/siteURLs.ts`
- `packages/theme/src/config/sites.ts` (old one)
- `portal/site.config.ts`

## URL Handling

The new system automatically handles URLs based on environment:
- Development: `http://localhost:PORT`
- Production: `https://iflastandards.github.io/standards-dev/SITE_PATH/`

Use the helper function to get URLs for cross-site links:

```typescript
import { getSiteUrl } from '@ifla/theme/config';

const isbdmUrl = getSiteUrl('isbdm', '/docs/intro');
```