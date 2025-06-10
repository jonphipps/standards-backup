// packages/theme/src/config/envLoader.ts
import dotenv from 'dotenv';
import { findUpSync } from 'find-up';

// Determine the directory of the file that imports this (e.g., a docusaurus.config.ts)
// This is a bit tricky because import.meta.url refers to *this* file (envLoader.ts).
// For find-up to work correctly starting from the *consuming* docusaurus.config.ts,
// we rely on process.cwd() being the directory of the specific site being built/served.
// Docusaurus typically sets process.cwd() to the site's root directory.
const sitePackagePath = process.cwd();

const envLocalPath = findUpSync('.env.local', { cwd: sitePackagePath });

if (envLocalPath) {
  dotenv.config({ path: envLocalPath });
  // console.log(`Loaded environment variables from: ${envLocalPath}`); // Optional: for debugging
} else {
  console.warn(
    `Root .env.local file not found when searching upwards from ${sitePackagePath}. ` +
    `Falling back to default dotenv behavior (loading .env from CWD or process.env).`
  );
  dotenv.config(); // Default behavior
}
