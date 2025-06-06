#!/usr/bin/env tsx
/**
 * Copy a global DCTAP profile into a standard so editors can tweak it.
 * Usage: pnpm profile-copy isbdm elementset
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const [stdCode, profileName] = process.argv.slice(2);
if (!stdCode || !profileName) {
  console.error('Usage: pnpm profile-copy <standard> <profile>');
  process.exit(1);
}

const destDir = path.join('standards', stdCode, '.config', 'dctap');
await fs.mkdir(destDir, { recursive: true });

const src = path.join('packages', 'tap-profiles', `${profileName}.csv`);
const dest = path.join(destDir, `${profileName}.csv`);
await fs.copyFile(src, dest);
console.log(`✅ Copied ${src} → ${dest}.  Edit and commit when ready.`);
