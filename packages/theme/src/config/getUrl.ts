// packages/theme/src/config/getUrl.ts
import {SITES} from '@ifla/theme/config/sites';

export const getUrl = (id: string, path = '/') => {
  const s   = SITES.find(x => x.id === id)!;
  return process.env.NODE_ENV !== 'production'
    ? `http://localhost:${s.port}${path}`
    : `https://iflastandards.github.io${s.ghPath.replace(/\/$/, '')}${path}`;
};
