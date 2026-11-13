# Elkins TSA

A static chapter hub for the 2026–27 Elkins High School TSA season. The site pairs a cinematic Three.js landing page with a practical dashboard, a three-column resource index, and a minimal officer roster.

## Pages

- `/` — single-action landing page linking to the dashboard
- `/dashboard/` — season calendar and the four current chapter actions
- `/resources/` — event information, organization quicklinks, and chapter files
- `/about/` — officer roster placeholders ready for final names and roles

The header and footer are shared across every page. No account, database, or environment variables are required.

The home scene loads Three.js only after mount. It renders six labeled physical planets on six widely spaced paths in one horizontal depth plane around a displaced 3D bas-relief of the chapter’s TSA crest. A low camera angle lets the near arcs pass in front and the far arcs recede behind the ambient-lit centerpiece, while three shooting stars cross the solid ink field on different trajectories. Hovering a planet pauses its orbit, brings it forward, enlarges it, and increases its spin; reduced-motion mode renders a still scene. The shared footer pairs chapter and external navigation with an oversized Elkins TSA wordmark.

## Run locally

```sh
npm ci
npm run dev
```

`npm run build` creates the static export in `out/`. `npm start` previews that export on port 3000.

## Edit chapter content

- **Season dates:** `src/data/calendar.ts`. Multi-day events use `endDate`; the calendar marks every day in each range.
- **Navigation and official links:** `src/data/links.ts`.
- **Resource columns:** `src/data/resource-groups.ts`. Leave `href` out and add a concise `note` when a chapter-owned link is not ready; the interface will show it as unavailable instead of creating a dead link.
- **Dashboard actions:** `src/components/dashboard/todo-list.tsx`.
- **Officer placeholders:** `src/app/about/page.tsx`.

### Files and meeting PDFs

Put the TSA logo in `public/images/` with `tsa` or `logo` in its filename. Put chapter files in `public/documents/` and meeting files in `public/documents/meetings/`. Original filenames are preserved and URL-encoded.

Run `npm run assets:sync` after adding files, or run a production build; builds refresh the generated asset index automatically. Add the new file to `src/data/resource-groups.ts` when it should appear on the Resources page.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The browser suite exercises all four pages at desktop, tablet, and small-phone widths; checks calendar ranges and links; verifies removed routes; tests 200% text sizing and reduced motion; and runs automated WCAG accessibility checks.
