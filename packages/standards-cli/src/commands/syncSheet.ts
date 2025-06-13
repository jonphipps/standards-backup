import { Command } from 'commander';

export const syncSheet = new Command('sync-sheet')
  .description('Sync a Google Sheet to MDX files.')
  .action(() => {
    console.log('Not implemented yet.');
  });
