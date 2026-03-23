/**
 * Patches dist/server/wrangler.json after astro build.
 * Removes fields that are invalid for Cloudflare Pages git-integration deployment.
 */
import { readFileSync, writeFileSync } from 'fs';

const path = 'dist/server/wrangler.json';
const cfg = JSON.parse(readFileSync(path, 'utf8'));

// Only keep fields valid for Cloudflare Pages
// Pages does NOT support: main, rules, no_bundle (those are Workers-only)
const patched = {
  name: cfg.name,
  compatibility_date: cfg.compatibility_date,
  compatibility_flags: cfg.compatibility_flags,
  pages_build_output_dir: cfg.pages_build_output_dir,
  vars: cfg.vars ?? {},
  // Bindings we actually use (none for now)
  kv_namespaces: [],
  r2_buckets: [],
  d1_databases: [],
  durable_objects: { bindings: [] },
  services: [],
};

writeFileSync(path, JSON.stringify(patched, null, 2));
console.log('✓ wrangler.json patched for Cloudflare Pages');
