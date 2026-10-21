# Dillz Bites Website

Dillz Bites is a marketing website for a sole proprietor baker specializing in bespoke cakes.
It is a fully static site hosted on GitHub Pages at https://www.dillzbites.com and deployed on every push to `main`.
Ordering happens on WhatsApp: CTAs open a chat with a prefilled message (the `/order` page uses a fill-in order template), and phone, email and hours are listed as alternatives.

## Tech stack

- Astro 5 (`output: 'static'`)
- Astro React integration (`@astrojs/react`) for the gallery carousel island
- Embla carousel (`embla-carousel-react`)
- Vitest for unit tests

## Quick links

- Run locally: [`docs/quickstart.md`](docs/quickstart.md)
- Environment/config: [`docs/configuration.md`](docs/configuration.md)
- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Development workflow: [`docs/development.md`](docs/development.md)
- Deployment: [`docs/deployment.md`](docs/deployment.md)
- Design spec: [`docs/design-spec.md`](docs/design-spec.md)
- UI system: [`docs/ui-system.md`](docs/ui-system.md)
- Order channel flow: [`docs/order-flow.md`](docs/order-flow.md)
- Content updates: [`docs/content-updates.md`](docs/content-updates.md)
- Troubleshooting: [`docs/troubleshooting.md`](docs/troubleshooting.md)
- Security notes: [`docs/security.md`](docs/security.md)

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build the static site into `dist/`
- `npm run preview` - Serve `dist/` locally
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## Docs update tag

Docs last updated: `docs-2026-02-14`

Docs audited through commit: `b79f66a`

This tag marks the last commit where `README.md` + `docs/` were audited/updated.

- View changes since docs were last updated: `git log docs-2026-02-14..HEAD --oneline`
- Diff docs vs current: `git diff docs-2026-02-14..HEAD -- README.md docs/`

Update procedure:
1. Pick a new tag name like `docs-YYYY-MM-DD`.
2. Before making docs changes, set `Docs audited through commit` to the current code commit you are auditing: `git rev-parse --short HEAD`.
3. Update the `Docs last updated` line in the same commit as your docs changes.
4. Commit with: `docs: sync docs (docs-YYYY-MM-DD)`.
5. Create the annotated tag: `git tag -a docs-YYYY-MM-DD -m "docs: sync docs"`.
6. Push the tag: `git push origin docs-YYYY-MM-DD`.
