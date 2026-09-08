import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '') : '';
const assetPrefix = process.env.NEXT_PUBLIC_SITE_URL ?? basePath;

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: 'export', trailingSlash: true, assetPrefix } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
