# Deployment

## Platform

- GitHub Pages, repository `jgopie/dillz_bites_rework`, custom domain `www.dillzbites.com`.
- Workflow: `.github/workflows/deploy.yml` runs on every push to `main` (and manually via "Run workflow").
  1. `npm ci` and `npm test` on Node 22.
  2. `withastro/action` builds the site and uploads `dist/`.
  3. `actions/deploy-pages` publishes it.
- Repo settings: Settings > Pages > Source must be "GitHub Actions".
- `public/CNAME` keeps the custom domain attached across deploys.

## DNS

- `www.dillzbites.com` is a CNAME to `jgopie.github.io`.
- The apex `dillzbites.com` can point to GitHub Pages with A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, so it redirects to `www`.

## Production verification checklist

1. The "Deploy to GitHub Pages" run is green in the Actions tab.
2. Homepage loads over HTTPS with the current design.
3. Hero CTA opens WhatsApp in a new tab with the greeting message.
4. `/order` CTA opens WhatsApp with the full order template.
5. Contact section shows phone, email and hours.
