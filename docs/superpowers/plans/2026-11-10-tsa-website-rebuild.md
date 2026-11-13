# Elkins TSA Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static Elkins TSA Site into a four-page portfolio-quality experience with one home CTA, a practical dashboard, organized resources, an officer roster, and shared navigation/footer.

**Architecture:** Keep the existing Next.js 16 static export. Use a small client canvas component only on the home page, reuse the existing calendar interaction model with new data, and render all resources from typed static data. Consolidate the visual system in a new `site.css` imported last.

**Tech Stack:** Next.js 16, React 19, TypeScript, Canvas 2D, CSS transforms, Playwright, axe.

**Spec:** `docs/superpowers/specs/2026-11-10-tsa-website-rebuild-design.md`

## Global Constraints

- Preserve the existing Sites project ID and owner-private audience.
- Static only: no account, persistence, form submission, or backend.
- Home has exactly one main CTA, labelled `Open dashboard`.
- Use the correct existing TSA crest.
- Missing organization URLs render as pending text, not clickable placeholders.
- Respect keyboard, touch, and `prefers-reduced-motion`.
- Footer appears on all four pages and says `Developed by Aryan Goel`.

## Review Focus

- At 320px, header, calendar, resource columns, and footer must not overflow.
- Date ranges crossing multiple days must appear on every included date and in the agenda.
- Pointer animation must not capture touch scrolling or continue under reduced motion.
- Pending organization links must not be focusable or misleading.
- Old Events and Photo Gallery routes must be removed from navigation and return 404.

---

### Task 1: Information architecture and content contracts

**Files:**
- Modify: `tests/site.spec.ts`
- Modify: `src/data/links.ts`
- Modify: `src/data/calendar.ts`
- Create: `src/data/resource-groups.ts`
- Modify: `src/components/layout/navbar.tsx`
- Create: `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: four-item `navigation`, `calendarEvents` with optional `endDate`, `resourceGroups`, shared `Navbar` and `Footer`.

- [ ] Write failing Playwright tests for the four routes, one home CTA, shared footer, requested calendar dates, to-do items, three resource groups, pending-link behavior, and removed routes.
- [ ] Run the focused tests and confirm failures come from the old site structure.
- [ ] Implement the static data contracts and shared shell.
- [ ] Rerun the focused tests until the shared structure passes.

### Task 2: Home landing experience

**Files:**
- Create: `src/components/home/project-field.tsx`
- Rewrite: `src/app/page.tsx`
- Create: `src/app/site.css`

**Interfaces:**
- Consumes: shared shell from Task 1.
- Produces: decorative `ProjectField`, single `Open dashboard` CTA, reduced-motion canvas state.

- [ ] Add failing tests for the single CTA, canvas semantics, pointer response, and reduced-motion state.
- [ ] Run the home tests and confirm the new experience is absent.
- [ ] Implement the home canvas, typography, and responsive layout.
- [ ] Rerun the home tests and verify desktop/mobile screenshots.

### Task 3: Dashboard, resources, and about pages

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Rewrite: `src/components/dashboard/calendar.tsx`
- Create: `src/components/dashboard/todo-list.tsx`
- Rewrite: `src/app/resources/page.tsx`
- Create: `src/app/about/page.tsx`
- Delete: `src/app/events/page.tsx`
- Delete: `src/app/photogallery/page.tsx`
- Modify: `src/app/site.css`

**Interfaces:**
- Consumes: `calendarEvents`, `resourceGroups`, and shared `ActionLink` conventions.
- Produces: complete requested utility pages.

- [ ] Implement range-aware calendar rendering and the requested dashboard to-do list.
- [ ] Implement the three-column resources page with descending meeting files.
- [ ] Implement the A/B/C officer roster and remove obsolete pages.
- [ ] Run dashboard/resource/about tests and correct functional failures.

### Task 4: Responsive, accessibility, and release

**Files:**
- Modify: `src/app/site.css`
- Modify: `tests/site.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: all pages from Tasks 1–3.
- Produces: verified static export and published Sites version.

- [ ] Render and inspect Home, Dashboard, Resources, and About at 1440, 834, 390, and 320px.
- [ ] Test keyboard order, 200% text, reduced motion, touch behavior, and axe WCAG 2.2 AA checks.
- [ ] Run lint, typecheck, production build, and the full Playwright suite.
- [ ] Package, push, and publish the exact verified commit to the existing owner-private Site.
