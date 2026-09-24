# Showcase QA guide

## Start the preview

```bash
npm install
npm run dev
```

Open `http://localhost:5173/showcase`.

In development, the showcase toolbar is visible automatically. In a production build it is hidden unless `VITE_SHOWCASE_MODE=true` is set before `npm run build`.

## Device checks

The preview is rendered in a same-origin iframe, so the device controls exercise the actual responsive breakpoint rather than only changing a container width.

Use the toolbar controls to inspect:

- Desktop / wide monitor
- Laptop
- Tablet
- Mobile

For each size, check the hero, photo card, navigation, filters, timelines, contact form, and footer for horizontal overflow.

## Feature checklist

- [ ] Hero role rotation and network/photo effects
- [ ] Initials fallback before adding a portrait
- [ ] Profile picture loading and failure fallback
- [ ] Profile card pointer tilt on desktop
- [ ] Touch device and reduced-motion fallback
- [ ] Profile lightbox open, close button, click-outside, Escape, and focus trap
- [ ] Standard / Researcher / Technical profile modes
- [ ] Dark/light mode and persisted preference
- [ ] Reduced-motion preference
- [ ] Mobile menu and keyboard focus
- [ ] `Ctrl+K` / `Cmd+K` command palette
- [ ] Command search, arrow keys, Enter, Escape, and empty state
- [ ] `/` and `?` keyboard shortcuts
- [ ] Scroll progress and active section highlighting
- [ ] Project search, category filter, technology filter, reset, empty state
- [ ] Project detail routes, previous/next, copy stack, share
- [ ] Publication search, area/year/type filters, list/timeline views
- [ ] Citation and BibTeX copy
- [ ] Conference certificate links
- [ ] Contact validation and mailto fallback
- [ ] `/cv` rendered preview, source search, line numbers, copy/download, print
- [ ] `/404` route
- [ ] Print stylesheet
- [ ] External links open in a new tab safely

## Screenshot-friendly settings

For clean captures:

1. Choose the target device width.
2. Turn off **Grid** if the technical background is distracting.
3. Turn off **Motion FX** for a still frame.
4. Use **Dark** or **Light** theme deliberately.
5. Keep **Photo FX** enabled to inspect the portrait treatment, or disable it to audit fallback behavior.
6. Use the section jump menu to capture individual sections.
7. Use `window.print()` or the `/cv` print action for a CV capture.

## Known input-dependent checks

The repository contains the supplied portrait, but the initials fallback remains available if the file is removed or fails to load. The PDF remains optional; verify the placeholder state until a real PDF is added. The raw LaTeX source route intentionally contains a personal-information warning and is not part of the default public navigation path.
