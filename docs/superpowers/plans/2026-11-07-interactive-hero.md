# Interactive Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a concise, pointer-reactive Elkins TSA hero with a depth carousel using real chapter artwork.

**Architecture:** A client `HeroExperience` component owns carousel and pointer state, while `page.tsx` keeps the dashboard composition. Hero-specific CSS lives in a new stylesheet imported after the existing overrides so the redesign stays traceable and can be tuned through ten visual passes.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS transforms/custom properties, Playwright, axe.

**Spec:** `docs/superpowers/specs/2026-11-07-interactive-hero-design.md`

## Global Constraints

- Use the existing correct crest and three meeting preview images.
- Preserve every route, dashboard feature, and owner-private Site audience.
- Respect keyboard access and `prefers-reduced-motion`.
- No new runtime dependency, WebGL, video, or invented chapter data.
- Complete ten numbered desktop/mobile screenshot passes before publication.

## Review Focus

- Pointer events on touch devices must not leave the stage tilted or block scrolling.
- Reduced-motion visitors must get a stable carousel with no automatic advance.
- Carousel controls must remain reachable and clear at 320px width.
- Images must not overflow or become illegible while cards recede in perspective.
- Existing member search, event filters, calendar, and document links must remain unchanged.

---

### Task 1: Interactive hero behavior

**Files:**
- Create: `src/components/home/hero-experience.tsx`
- Modify: `src/app/page.tsx`
- Modify: `tests/site.spec.ts`

**Interfaces:**
- Consumes: `site.logo` and the three `/images/resource-previews/meeting-0N.png` assets.
- Produces: `HeroExperience`, carousel buttons named Previous/Next, selector buttons, and CSS variables `--hero-x`, `--hero-y`, `--hero-rx`, `--hero-ry`.

- [x] Add Playwright tests for carousel navigation, active caption, pointer-driven custom properties, and reduced-motion stability.
- [x] Run the focused tests and confirm they fail because the new hero behavior does not exist.
- [x] Implement `HeroExperience` and replace the existing hero markup.
- [x] Run the focused tests and confirm they pass.

### Task 2: Visual system and responsive motion

**Files:**
- Create: `src/app/hero.css`
- Modify: `src/app/layout.tsx`
- Modify: `tests/site.spec.ts`

**Interfaces:**
- Consumes: the semantic classes and CSS variables from Task 1.
- Produces: desktop/mobile carousel depth, pointer light, entrance sequence, focus states, and reduced-motion overrides.

- [x] Add layout assertions for the new hero at 1440, 834, 390, and 320 pixels.
- [x] Run the focused layout tests and confirm they fail against the unstyled component.
- [x] Implement the hero stylesheet and import it after `refined.css`.
- [x] Run layout and accessibility tests and confirm they pass.

### Task 3: Ten-pass visual regression loop

**Files:**
- Modify: `src/app/hero.css`
- Create: `outputs/tsa-hero-iteration-01-desktop.png` through `outputs/tsa-hero-iteration-10-desktop.png` outside the source checkout.
- Create: matching mobile screenshots.

**Interfaces:**
- Consumes: built static site and the approved visual criteria in the spec.
- Produces: ten traceable critique passes and a final responsive composition.

- [x] Render pass 1 at 1440×900 and 390×844; identify the highest-impact issue.
- [x] Repeat render, critique, and one focused correction through pass 10.
- [x] Run lint, typecheck, build, the full Playwright suite, and axe checks.
- [ ] Package, push, and publish the verified source to the existing private Site.
