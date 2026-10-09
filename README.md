# Whitigol Software Documentation

Documentation and changelogs for Whitigol Software projects, built with TanStack Start and Fumadocs.

## Development

Node.js 22 or newer is required.

```bash
npm install
npm run dev
```

The local site is available at <http://localhost:3000>. Documentation lives under `/docs`; the standalone changelog lives at `/changelog`.

## Content

- Add documentation pages to `content/docs` and order them with `meta.json` files.
- Add dated changelog entries to `content/changelog`.
- Every documentation page requires `title`, `description`, and `icon` frontmatter.

## Verification

```bash
npm run types:check
npm run build
```

The app is configured for its own deployment at `docs.whitigol.me`.
