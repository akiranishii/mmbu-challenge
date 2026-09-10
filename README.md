# MMBU Challenge

The website is in `site/`. It preserves the content of the [original MMBU Challenge website](https://alejandro-lozano-dev.github.io/MMBU.Challenge/) with a responsive design and a full-width image behind the hero text.

## Run locally

```sh
cd site
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3005
```

Open the local URL printed in the terminal (normally http://127.0.0.1:3005). Keep the terminal running while using the website. If the port is occupied, the development server chooses the next available port.

## Build

```sh
cd site
npm run build
```

## GitHub Pages deployment

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) installs the locked dependencies, checks TypeScript, exports the static site, validates its asset paths, and deploys it to GitHub Pages on each push to `main`. It can also be run manually from the repository's Actions tab.

The workflow reads the live Pages URL and base path from `actions/configure-pages`. Enable **GitHub Actions** as the repository's Pages publishing source. No custom deployment secret is required.

The published site is at https://akiranishii.github.io/mmbu-challenge/.

To reproduce the GitHub Pages export locally from `site/`:

```sh
NEXT_PUBLIC_SITE_URL=https://akiranishii.github.io/mmbu-challenge \
NEXT_PUBLIC_BASE_PATH=/mmbu-challenge npm run build:pages

NEXT_PUBLIC_SITE_URL=https://akiranishii.github.io/mmbu-challenge \
NEXT_PUBLIC_BASE_PATH=/mmbu-challenge node scripts/verify-pages.mjs
```

The deployable static output is `site/dist/client/`; server build files are not published. Local development continues to use URLs rooted at `/`.

## Content and assets

- `site/lib/content.json`: original overview, tracks, sponsors, and FAQ wording.
- `site/lib/original-source.html`: snapshot of the supplied MMBU website, retrieved September 8, 2026.
- `site/public/Challenge.pdf`: original challenge brief.
- `site/public/assets/figure-2.jpg`: original task figure.
- `site/public/assets/no_logo.png`: supplied `no_logo.png`, unchanged.
- `site/public/assets/sponsors/`: all six supplied sponsor logos, including Biohub, unchanged. Their display frames omit empty image margins with CSS.

The hero displays the 2380 × 2380 `no_logo.png` across the entire banner behind the title and application buttons. CSS `object-fit: cover` preserves the image's proportions while cropping its edges to fill the banner. A gradual green overlay fades the artwork behind the text and along the bottom, with a stronger overlay on mobile for readability.

The original application email, paper, MARVL, contact, and brief links are preserved.
