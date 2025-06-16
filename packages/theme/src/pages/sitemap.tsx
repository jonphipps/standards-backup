import React from 'react';
import { Sitemap } from '../components/Sitemap';

/**
 * Default sitemap page that can be used by sites
 * Sites can override this by creating their own src/pages/sitemap.tsx
 * or use the Sitemap component directly with custom props
 */
export default function SitemapPage() {
  return <Sitemap />;
}
