import { describe, it, expect } from 'vitest';
import { getSiteUrl } from '../../config/siteConfig';
import { DocsEnv } from '../../config/siteConfigCore';

describe('getSiteUrl', () => {
  describe('path normalization', () => {
    it('should handle paths with leading slash', () => {
      const url = getSiteUrl('LRM', '/docs/intro', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3002/LRM/docs/intro');
    });

    it('should handle paths without leading slash', () => {
      const url = getSiteUrl('LRM', 'docs/intro', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3002/LRM/docs/intro');
    });

    it('should handle empty path', () => {
      const url = getSiteUrl('LRM', '', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3002/LRM/');
    });

    it('should handle root path', () => {
      const url = getSiteUrl('LRM', '/', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3002/LRM/');
    });
  });

  describe('cross-site navigation', () => {
    it('should generate correct URL for ISBDM site', () => {
      const url = getSiteUrl('ISBDM', '/docs/intro', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3001/ISBDM/docs/intro');
    });

    it('should generate correct URL for portal site', () => {
      const url = getSiteUrl('portal', '/docs/intro', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3000/portal/docs/intro');
    });

    it('should generate correct URL for ISBD site', () => {
      const url = getSiteUrl('isbd', '/docs/intro', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3004/isbd/docs/intro');
    });

    it('should generate correct URL for UNIMARC site', () => {
      const url = getSiteUrl('unimarc', '/docs/intro', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3006/unimarc/docs/intro');
    });
  });

  describe('different environments', () => {
    it('should generate correct URL for preview environment', () => {
      const url = getSiteUrl('LRM', '/docs/intro', DocsEnv.Preview);
      expect(url).toBe('https://iflastandards.github.io/standards-dev/LRM/docs/intro');
    });

    it('should generate correct URL for production environment', () => {
      const url = getSiteUrl('LRM', '/docs/intro', DocsEnv.Production);
      expect(url).toBe('https://iflastandards.info/LRM/docs/intro');
    });
  });

  describe('blog and other paths', () => {
    it('should generate correct URL for blog path', () => {
      const url = getSiteUrl('LRM', '/blog', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3002/LRM/blog');
    });

    it('should generate correct URL for manage path', () => {
      const url = getSiteUrl('ISBDM', '/manage', DocsEnv.Localhost);
      expect(url).toBe('http://localhost:3001/ISBDM/manage');
    });
  });

  describe('error handling', () => {
    it('should return error for invalid site key', () => {
      // @ts-expect-error Testing invalid input
      const url = getSiteUrl('INVALID_SITE', '/docs/intro', DocsEnv.Localhost);
      expect(url).toBe('#ERROR_SITE_CONFIG_NOT_FOUND');
    });

    it('should return error for invalid environment', () => {
      // @ts-expect-error Testing invalid input
      const url = getSiteUrl('LRM', '/docs/intro', 'INVALID_ENV');
      expect(url).toBe('#ERROR_INVALID_RESOLVED_ENV_FOR_LRM');
    });
  });
});