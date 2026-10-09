# Repository Guide

This repository contains the standalone Whitigol Software documentation site for `docs.whitigol.me`. It is a TanStack Start application using Fumadocs MDX, React, TypeScript, Tailwind CSS, and Bun.

## Project Structure

- `content/docs/`: documentation pages. The directory structure defines URLs below `/docs`.
- `content/changelog/`: product-specific changelog entries rendered below `/changelog`.
- `public/`: static brand and product assets.
- `src/components/`: shared React and MDX components.
- `src/lib/`: content collections, product metadata, navigation, and shared utilities.
- `src/routes/`: TanStack Start routes and API handlers.
- `src/routeTree.gen.ts`: generated TanStack Router output; do not edit it manually.
- `.source/`: generated Fumadocs output when present; do not edit it manually.

## Content Conventions

- Every documentation page must define `title`, `description`, and `icon` frontmatter.
- Use `meta.json` to order documentation pages and folders.
- Keep documentation under the default `/docs` route.
- Store changelogs in the folder matching their product ID: `wlauncher`, `devmate`, `create-fivem`, or `fivem-compiler`.
- Changelog frontmatter must match the schema in `src/lib/changelog.ts`. Use ISO `YYYY-MM-DD` dates.
- Prefer filenames in the form `YYYY-MM-DD-vVERSION.mdx` for new changelog entries.
- Put images beside the MDX content that owns them and use relative paths. Markdown images are zoomable through the shared MDX configuration.
- Reuse the registered MDX components from `src/components/mdx.tsx` instead of adding page-specific component wiring.

## Application Conventions

- Keep the site in forced dark mode and do not add a light-mode toggle.
- Keep documentation and changelogs as separate top-level experiences.
- Define shared product labels, descriptions, routes, and icons in `src/lib/products.ts` rather than duplicating them in routes.
- Preserve the product grouping used by the changelog index: Software, FiveM Scripts, and NPM Packages.
- Use product SVG assets for wLauncher and DevMate, and generic package icons for the npm products.
- Do not mix this app into a marketing or product application; it is deployed independently.

## Development

Bun 1.3.13 or newer and Node.js 22 or newer are required. Use the checked-in Bun lockfile.

```bash
bun install
bun run dev
```

The development server runs at `http://localhost:3000`.

## Verification

Run both checks after code or content changes:

```bash
bun run types:check
bun run build
```

For navigation, layout, or interactive changes, also verify the affected pages in a browser. Confirm that `/docs` and `/changelog` render without duplicated layouts or broken client-side links.
