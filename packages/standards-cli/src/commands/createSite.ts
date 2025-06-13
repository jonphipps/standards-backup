import { Command } from 'commander';

export const createSite = new Command('create-site')
  .description('Create a new IFLA standard documentation site.')
  .action(() => {
    console.log('Not implemented yet.');
  });
