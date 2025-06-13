import { Command } from 'commander';

export const addSection = new Command('add-section')
  .description('Add a new section to an existing site.')
  .action(() => {
    console.log('Not implemented yet.');
  });
