# Deployment

The app is a static Vite build. The production output directory is `dist`.

The production build also generates `dist/robots.txt` and `dist/sitemap.xml` from the configured site URL and base path. Set these public environment variables in the hosting dashboard or local build environment:

```bash
VITE_SITE_URL=https://your-real-domain.example
VITE_CONTACT_FORM_ENDPOINT=
VITE_SHOWCASE_MODE=false
VITE_BASE_PATH=/
```

`VITE_SITE_URL` should be the real canonical URL before publishing. Do not use the checked-in placeholder in production metadata.

Build and locally verify:

```bash
npm ci
npm run lint
npm run test
npm run build
npm run preview
```

## Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Select the **Vite** framework preset.
4. Keep build command `npm run build`.
5. Set output directory to `dist`.
6. Add `VITE_SITE_URL` and optional `VITE_CONTACT_FORM_ENDPOINT` environment variables.
7. Deploy and verify `/`, `/projects`, `/research`, `/cv`, and a detail route directly.

`vercel.json` contains the SPA rewrite to `/index.html`.

CLI alternative:

```bash
npm install -g vercel
vercel
vercel --prod
```

## Netlify

1. Connect the GitHub repository in Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Add environment variables in Site configuration.
5. Deploy and verify direct navigation to every route.

`public/_redirects` contains:

```text
/* /index.html 200
```

CLI alternative:

```bash
npm install -g netlify-cli
netlify init
netlify deploy
netlify deploy --prod
```

If using Netlify Forms, add the form markup or a compatible endpoint deliberately; the default frontend mailto flow needs no backend.

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`.

The workflow automatically detects a repository project-site base path (`/portfolio/`) and uses `/` for a `username.github.io` repository. You can still override `VITE_BASE_PATH` in repository variables when needed.

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Select **GitHub Actions** as the source.
4. The workflow builds with `VITE_BASE_PATH` and uploads `dist` as the Pages artifact.
5. Enable the environment variable in the workflow/repository settings if your repository name is not `username.github.io`.
6. Verify the deployed base path and direct routes.

The workflow uses the official Pages upload/deployment actions. `BrowserRouter` receives Vite’s `BASE_URL`, so asset URLs and route links work under a repository subpath. Configure a custom domain in the Pages settings and update `VITE_SITE_URL` to match.

## Cloudflare Pages

1. Connect the repository in Cloudflare Pages.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add the public environment variables.
6. Add a SPA fallback: rewrite all requests to `/index.html` (or use a `_redirects` rule equivalent).
7. Deploy and verify direct routes.

## Optional contact endpoint

The default `ContactForm` validates locally and prepares a `mailto:` URL. To enable a hosted free service, set `VITE_CONTACT_FORM_ENDPOINT` to a public endpoint that accepts JSON `{ name, email, subject, message }`. Formspree, Web3Forms, and compatible Netlify/custom endpoints can be used. Never place a secret API key in a Vite client environment variable.

## Post-deploy checklist

- [ ] Set the real `VITE_SITE_URL`.
- [ ] Confirm canonical, Open Graph, Twitter, and JSON-LD URLs.
- [ ] Confirm `robots.txt` and `sitemap.xml` use the real domain.
- [ ] Confirm direct navigation to `/projects/deep-research-ai` and `/research/evapotranspiration-drought-unsupervised-analysis`.
- [ ] Confirm the optional profile image fallback and real image path.
- [ ] Confirm the optional PDF state before enabling download.
- [ ] Test keyboard navigation, reduced motion, theme persistence, and command palette.
- [ ] Run `npm run lint`, `npm run test`, and `npm run build` against the final commit.
