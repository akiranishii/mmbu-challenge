import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const directory = resolve('dist/client');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost').origin;
const html = await readFile(resolve(directory, 'index.html'), 'utf8');
const paths = new Set();

assert(html.includes('id="hero-title"'), 'The export must contain the rendered MMBU page.');
assert(html.includes('class="hero-art"'), 'The export must include the hero background image.');

const assetUrls = [...html.matchAll(/(?:src|href|poster)="([^"]+)"/g)].map(([, value]) => value);
for (const [, sourceSet] of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/gi)) {
  assetUrls.push(...sourceSet.split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
}

for (const value of assetUrls) {
  if (value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('data:')) continue;
  const parsed = new URL(value, origin);
  if (parsed.origin !== origin) continue;
  const url = parsed.pathname;
  assert(url.startsWith(`${basePath}/`), `Asset is missing the Pages base path: ${url}`);
  const path = decodeURIComponent(url.slice(basePath.length).split(/[?#]/)[0]);
  const file = resolve(directory, `.${path}`);
  assert(file.startsWith(`${directory}/`), `Asset is outside the export: ${url}`);
  assert((await stat(file)).isFile(), `Exported asset is missing: ${url}`);
  paths.add(path);
}

for (const path of [
  '/MMBU_challenge.pdf', '/favicon.svg',
  '/assets/hero-960.webp', '/assets/hero-1600.webp', '/assets/hero-2380.webp',
  '/assets/figure-2-800.webp', '/assets/figure-2-1600.webp', '/assets/figure-2-2400.webp',
  '/assets/figure-2.png', '/assets/sponsors/gxl.svg', '/assets/sponsors/anthropic.png',
  '/assets/sponsors/stanford-ai-lab.png', '/assets/sponsors/highlanders.png',
  '/assets/sponsors/biohub_logo.png',
]) assert(paths.has(path), `The exported page is missing a required asset: ${path}`);

console.log(`Verified static HTML and ${paths.size} asset paths under ${basePath || '/'}.`);
