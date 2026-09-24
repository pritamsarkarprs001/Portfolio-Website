# Pritam Sarkar — AI Researcher Portfolio

A production-ready, dark-first interactive portfolio for **Pritam Sarkar**, Computer Science Graduate, Machine Learning Engineer, AI Researcher, and Data Scientist based in Dhaka, Bangladesh.

The site is built from the supplied CV LaTeX source and typed content modules. It uses a small local data layer, CSS/SVG technical visualizations, the supplied local portraits, and a safe initials fallback if an image is unavailable.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS 3 with a focused custom CSS design system
- Framer Motion
- React Router
- Lucide React
- Vitest + jsdom
- ESLint 9 + Prettier
- CSS/SVG visualizations (no paid APIs, analytics, or backend required)

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

```bash
npm run lint       # ESLint, zero warnings allowed
npm run test       # Vitest unit tests
npm run build      # tsc + Vite production build
npm run preview    # serve dist locally
```

## Routes

- `/` — complete single-page portfolio
- `/about` — biography, timeline, interests
- `/projects` — searchable/filterable project index
- `/projects/:slug` — project case study with SVG architecture visual
- `/research` — searchable/filterable publication index and timeline
- `/research/:slug` — publication record, citation tools, and links
- `/contact` — contact form and public channels
- `/cv` — structured CV preview and plain-text LaTeX source showcase
- `/showcase` — QA/presentation mode with device and effect toggles
- `*` — custom 404 view

## Content source and maintenance

The supplied profile assets and their editable configuration are documented in the Profile image section below.

The supplied LaTeX source is stored as plain text in `src/data/cvSource.ts` and displayed only as text. The extracted, typed content is in:

```text
src/data/profile.ts
src/data/socials.ts
src/data/projects.ts
src/data/publications.ts
src/data/experience.ts
src/data/education.ts
src/data/certifications.ts
src/data/conferences.ts
src/data/skills.ts
src/data/languages.ts
```

When a new CV revision arrives, update the typed data and replace `cvSource` with the exact new source. Do not invent abstracts, metrics, project results, employers, dates, or skills. The UI explicitly labels missing abstracts and unavailable assets.

## Profile image

The supplied portraits are included at:

```text
public/assets/profile/pritam-sarkar.jpg
public/assets/profile/pritam-sarkar-formal.jpg
```

The primary portrait uses top-aligned object positioning so the hair and head are not cropped. The formal portrait is available from the **Formal portrait** mode in the hero profile card and lightbox. The app still includes a safe `PS` fallback if a file is removed or fails to load.

1. Save the approved primary image as `public/assets/profile/pritam-sarkar.jpg` and the alternate image as `public/assets/profile/pritam-sarkar-formal.jpg` (JPG, JPEG, PNG, WebP, and AVIF are supported by browsers).
2. Update `profile.photo.src` or `profile.secondaryPhoto.src` if using another filename or location.
3. Set the relevant `available` flag to `true` in `src/data/profile.ts`.

`ProfileImage` provides explicit dimensions, lazy/eager loading, `decoding="async"`, alt text, and an error fallback. The hero card includes keyboard-safe 3D tilt, touch/reduced-motion safeguards, a pointer-following highlight, presentation modes, and an Escape/focus-trap lightbox.

## CV PDF

The approved CV PDF is included at `public/assets/Pritam-Sarkar-CV.pdf`, and Download CV actions are enabled. The `/cv` route remains available as a print-friendly fallback and the LaTeX source view is always available.

To replace it with a newer approved PDF, replace that file and keep `profile.cvPdfAvailable` set to `true` in `src/data/profile.ts`.

## Contact form

The default form validates locally and opens a prepared `mailto:` draft, so no data is sent anywhere by default. To use a free public endpoint later, set:

```bash
VITE_CONTACT_FORM_ENDPOINT=https://your-free-endpoint.example
```

This can point to Formspree, Web3Forms, Netlify Forms, or a compatible public service. Do not put private API keys in `VITE_*` variables; client-side variables are public. See `ContactPage` for the fallback explanation.

## Showcase and QA

Start the dev server and open `/showcase`. Development mode exposes controls for device widths, theme, reduced motion, grid visibility, photo effects, advanced animation, labels, section jumps, and direct links to project/CV detail routes. The toolbar is hidden in production unless `VITE_SHOWCASE_MODE=true` is set.

See `SHOWCASE.md` for the full manual checklist.

## Static hosting and SPA routes

The production output directory is `dist`. The build generates a base-aware `robots.txt` and `sitemap.xml` from `VITE_SITE_URL` and `VITE_BASE_PATH`. Client-side routes need an `index.html` fallback:

- Netlify: `public/_redirects` is included.
- Vercel: `vercel.json` is included.
- Cloudflare Pages: add a rewrite to `/index.html` for all routes.
- GitHub Pages: use `.github/workflows/deploy-pages.yml`; set `VITE_BASE_PATH=/<repository-name>/` for a project site and update the router base through Vite.

Set `VITE_SITE_URL` to the real canonical domain before deployment. The checked-in `https://your-domain.example` value is intentionally only a configuration placeholder.

## Privacy and security

- No analytics or tracking are included.
- External links use `noopener noreferrer`.
- The contact form has a honeypot and does not transmit data without a configured endpoint/user action.
- The LaTeX source is rendered as text and never executed.
- Date of birth and phone number are not shown in prominent public sections; the raw CV source route is an explicit, warned inspection view.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for Vercel, Netlify, GitHub Pages, and Cloudflare Pages instructions.

## Quality checks

The project includes unit tests for project filtering, citation creation, and the CV source safety contract. Run all checks before publishing:

```bash
npm run lint
npm run test
npm run build
```
