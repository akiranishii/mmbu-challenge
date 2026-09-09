import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const directory = resolve('dist/client');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost').origin;
const html = await readFile(resolve(directory, 'index.html'), 'utf8');
const paths = new Set();

assert(html.includes('id="hero-title"'), 'The export must contain the rendered MMBU page.');
assert(html.includes('class="hero-art"'), 'The export must include the square hero image.');

for (const [, value] of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)) {
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
  '/Challenge.pdf', '/favicon.svg', '/assets/mmbu-logo-updated.png',
  '/assets/figure-2.jpg', '/assets/sponsors/gxl.svg', '/assets/sponsors/anthropic.png',
  '/assets/sponsors/stanford-ai-lab.png', '/assets/sponsors/highlanders.png', '/assets/sponsors/aws.webp',
]) assert(paths.has(path), `The exported page is missing a required asset: ${path}`);

console.log(`Verified static HTML and ${paths.size} asset paths under ${basePath || '/'}.`);
