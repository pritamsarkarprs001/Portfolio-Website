# AGENTS.md

## Project architecture

- React + TypeScript + Vite single-page portfolio with React Router.
- Content is separated into typed modules in `src/data/`.
- Shared UI and interaction primitives live in `src/components/`.
- Route-level views live in `src/pages/` and are lazy-loaded from `src/App.tsx`.
- Global visual system and responsive/print/reduced-motion rules live in `src/styles/index.css`.
- Static assets live in `public/`; profile/CV replacement locations are documented in `public/assets/README.md`.
- The supplied LaTeX CV is stored as plain text in `src/data/cvSource.ts`; it is never executed or evaluated.

## Development commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run preview
npm run format:check
```

`npm run test` uses Vitest and jsdom. Playwright is not required for the default implementation; the manual QA checklist is in `SHOWCASE.md`.

## Coding conventions

- Use strict TypeScript and prefer typed data over component literals.
- Keep content updates in `src/data/`; do not duplicate CV facts in presentation components.
- Use semantic HTML, visible focus states, and accessible names for icon-only controls.
- Prefer CSS transforms/opacity for motion and clean up every observer/listener.
- Respect `prefers-reduced-motion` through the `ReducedMotionProvider`.
- Do not add unsupported metrics, achievements, employers, dates, or technologies.
- Treat LaTeX source as untrusted plain text.
- Use `rel="noopener noreferrer"` for external links opened in a new tab.

## Content update instructions

1. Update the relevant file in `src/data/` after verifying the supplied CV source.
2. Keep the original wording when it is useful; do not silently strengthen claims.
3. Update `src/data/cvSource.ts` when the raw LaTeX revision changes.
4. Add a real profile image to `public/assets/profile/pritam-sarkar.jpg` (or update `profile.photo.src`) and set `profile.photo.available` to `true`.
5. If adding an optional PDF, place it at `public/assets/Pritam-Sarkar-CV.pdf` and set `profile.cvPdfAvailable` to `true`. Otherwise the UI shows an explicit placeholder toast and the print-friendly `/cv` page remains available.
6. Do not expose date of birth or phone number in metadata or prominent public sections unless deliberately enabled.

## Accessibility requirements

- Preserve heading hierarchy and landmarks.
- Keep all filters, cards, dialogs, lightbox, menu, and form controls keyboard reachable.
- Dialogs must have an accessible name, close action, Escape behavior, and appropriate focus handling.
- Validate form fields with associated labels and `aria-describedby` error messages.
- Keep color paired with text or icons; do not rely on color alone.
- Maintain a visible focus ring and readable contrast in both themes.

## Deployment instructions

- Production build output is `dist`.
- Vite uses `VITE_BASE_PATH` for repository-hosted sites; the included GitHub Pages workflow auto-detects project-site paths.
- Configure SPA fallback to `index.html` on Vercel, Netlify, and Cloudflare Pages.
- Set `VITE_SITE_URL` to the real canonical URL before deployment; do not claim the placeholder domain is live.
- See `DEPLOYMENT.md` for platform-specific instructions and GitHub Pages workflow details.
