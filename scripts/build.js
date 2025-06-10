import {spawn} from 'child_process';
import concurrently from 'concurrently';
import {SITES} from '@ifla/theme/config/sites';

const cmds = SITES.map(s => ({
  command: `cross-env SITE_ID=${s.id} docusaurus build ${s.dir} --port ${s.port}`,
  name: s.id,
  prefixColor: 'auto',
}));
concurrently(cmds, {killOthers: ['failure', 'success']});
