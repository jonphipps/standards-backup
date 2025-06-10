// packages/theme/src/config/envLoader.ts
import dotenv from 'dotenv';
import { findUpSync } from 'find-up';

// Determine the directory of the file that imports this (e.g., a docusaurus.config.ts)
// This is a bit tricky because import.meta.url refers to *this* file (envLoader.ts).
// For find-up to work correctly starting from the *consuming* docusaurus.config.ts,
// we rely on process.cwd() being the directory of the specific site being built/served.
// Docusaurus typically sets process.cwd() to the site's root directory.
const sitePackagePath = process.cwd();

// Determine which env file to load based on NODE_ENV
const envFileName = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
const envPath = findUpSync(envFileName, { cwd: sitePackagePath });

if (envPath) {
  dotenv.config({ path: envPath });
  // console.log(`Loaded environment variables from: ${envPath}`); // Optional: for debugging
} else {
  console.warn(
    `Root ${envFileName} file not found when searching upwards from ${sitePackagePath}. ` +
    `Falling back to default dotenv behavior (loading .env from CWD or process.env).`
  );
  dotenv.config(); // Default behavior
}
