# Dillz Bites Website

Dillz Bites is a marketing and ordering website for a sole proprietor baker specializing in bespoke cakes.
The site is built with Astro and includes a server-rendered order API that validates requests and sends two emails:
1. Internal notification to the bakery inbox.
2. Customer confirmation email with request reference ID.

## Tech stack

- Astro 5
- Astro Node adapter (`@astrojs/node`) for server output
- Astro React integration (`@astrojs/react`) for interactive islands
- Embla carousel (`embla-carousel-react`)
- Radix Themes (`@radix-ui/themes`)
- SMTP email delivery via Nodemailer
- Zod for request validation
- Vitest for unit and endpoint tests

## Quick links

- Run locally: [`docs/quickstart.md`](docs/quickstart.md)
- Environment/config: [`docs/configuration.md`](docs/configuration.md)
- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Design spec: [`docs/design-spec.md`](docs/design-spec.md)
- UI system: [`docs/ui-system.md`](docs/ui-system.md)
- Order API + flow: [`docs/order-flow.md`](docs/order-flow.md)
- Render deployment: [`docs/deployment-render.md`](docs/deployment-render.md)
- Content updates: [`docs/content-updates.md`](docs/content-updates.md)
- Troubleshooting: [`docs/troubleshooting.md`](docs/troubleshooting.md)
- Security notes: [`docs/security.md`](docs/security.md)

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production output
- `npm run preview` - Preview the built app
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## Docs update tag

Docs last updated: `docs-2026-02-07`

Docs audited through commit: `a900a63`

This tag marks the last commit where `README.md` + `docs/` were audited/updated.

- View changes since docs were last updated: `git log docs-2026-02-07..HEAD --oneline`
- Diff docs vs current: `git diff docs-2026-02-07..HEAD -- README.md docs/`

Update procedure:
1. Pick a new tag name like `docs-YYYY-MM-DD`.
2. Before making docs changes, set `Docs audited through commit` to the current code commit with `git rev-parse --short HEAD`.
3. Update the `Docs last updated` line in the same commit as your docs changes.
4. Commit with `docs: sync docs (docs-YYYY-MM-DD)`.
5. Create the annotated tag: `git tag -a docs-YYYY-MM-DD -m "docs: sync docs"`.
6. Push the tag: `git push origin docs-YYYY-MM-DD`.
