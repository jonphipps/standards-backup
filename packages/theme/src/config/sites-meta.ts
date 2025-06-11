// packages/theme/config/sites-meta.ts
export const sites = {
  portal:   { path: '',         port: 3000 },
  isbdm:    { path: 'isbdm',    port: 3001 },
  lrm:      { path: 'lrm',      port: 3002 },
  fr:       { path: 'fr',       port: 3003 },
  isbd:     { path: 'isbd',     port: 3004 },
  muldicat: { path: 'muldicat', port: 3005 },
  unimarc:  { path: 'unimarc',  port: 3006 },
} as const;

export type SiteId = keyof typeof sites;
