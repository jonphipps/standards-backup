// scripts/genScripts.ts
import {writeFileSync} from 'fs';
import {SITES} from '../packages/theme/src/config/sites';

const scripts: Record<string,string> = {
  start: 'node scripts/start.js',
  build: 'node scripts/build.js',
};

writeFileSync('scripts.json', JSON.stringify(scripts, null, 2));
