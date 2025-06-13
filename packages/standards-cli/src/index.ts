#!/usr/bin/env node
import { Command } from 'commander';
import { createSite } from './commands/createSite.js';
import { addSection } from './commands/addSection.js';
import { syncSheet } from './commands/syncSheet.js';

const program = new Command();

program
  .name('standards')
  .description('IFLA standards monorepo Swiss-army knife')
  .version('0.1.0');

program.addCommand(createSite);
program.addCommand(addSection);
program.addCommand(syncSheet);

program.parse();
