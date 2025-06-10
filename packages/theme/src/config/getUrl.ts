// packages/theme/src/config/getUrl.ts
import {SITES} from './sites';
export const getUrl = (target: string, path = '') => {
  const site  = SITES.find(s => s.id === target)!;
  const dev   = process.env.NODE_ENV !== 'production';
  return dev
    ? `http://localhost:${site.port}${path}`
    : `https://iflastandards.github.io${site.ghPath.replace(/\/$/, '')}${path}`;
};
