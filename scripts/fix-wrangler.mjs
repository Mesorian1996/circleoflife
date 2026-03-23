/**
 * Post-build script for Cloudflare Pages deployment.
 *
 * @astrojs/cloudflare outputs:
 *   dist/server/entry.mjs  → the Worker
 *   dist/server/chunks/    → Worker dependencies
 *   dist/client/           → static assets (pages_build_output_dir)
 *
 * Cloudflare Pages Advanced Mode needs _worker.js inside pages_build_output_dir.
 * This script copies the Worker + chunks into dist/client/ and patches wrangler.json.
 */
import { readFileSync, writeFileSync, cpSync, copyFileSync } from 'fs';

// 1. Copy Worker entry → _worker.js
copyFileSync('dist/server/entry.mjs', 'dist/client/_worker.js');

// 2. Copy all Worker chunks
cpSync('dist/server/chunks', 'dist/client/chunks', { recursive: true });

// 3. Copy middleware helper if present
try {
  copyFileSync('dist/server/virtual_astro_middleware.mjs', 'dist/client/virtual_astro_middleware.mjs');
} catch {}

// 4. Patch wrangler.json: keep only Pages-compatible fields, no "main"
const cfg = JSON.parse(readFileSync('dist/server/wrangler.json', 'utf8'));
const patched = {
  name: cfg.name,
  compatibility_date: cfg.compatibility_date,
  compatibility_flags: cfg.compatibility_flags,
  pages_build_output_dir: cfg.pages_build_output_dir,
  vars: cfg.vars ?? {},
  kv_namespaces: [],
  r2_buckets: [],
  d1_databases: [],
  durable_objects: { bindings: [] },
  services: [],
};
writeFileSync('dist/server/wrangler.json', JSON.stringify(patched, null, 2));

console.log('✓ Worker copied to dist/client/_worker.js');
console.log('✓ wrangler.json patched for Cloudflare Pages');
