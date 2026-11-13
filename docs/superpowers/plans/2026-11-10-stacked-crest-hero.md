# Stacked Crest Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the home hero around a centered, widely spaced solar system with a procedural 3D crest sculpture.

**Architecture:** Move the existing WebGL field into the hero’s document flow between the heading and action group. Keep the scene dynamically imported, but replace the bitmap face with procedural Three.js geometry and shader materials while retaining the existing interaction and disposal lifecycle.

**Tech Stack:** Next.js, React, TypeScript, Three.js, CSS, Playwright

**Spec:** `docs/superpowers/specs/2026-11-10-stacked-crest-hero-design.md`

## Global Constraints

- Keep exactly six planets and six used orbit paths.
- Adjacent orbital radii must differ by at least `1.0` Three.js unit.
- Do not render the source logo artwork on the center sculpture.
- Preserve the one dashboard CTA, reduced-motion behavior, responsive navigation, and dynamically loaded Three.js chunk.
- Initial scripts must stay at or below `200,000` gzip bytes and total scripts at or below `375,000` gzip bytes.

## Review Focus

- A 320px-wide phone must not horizontally overflow or crop the heading, summary, or CTA.
- A 900px-high desktop viewport must keep the scene between the heading and action group.
- The canvas must remain interactive after becoming a flow layout element.
- The procedural crest must expose gradient and sculpture metadata only after scene initialization succeeds.
- Reduced-motion mode must render a still, complete composition.

---

### Task 1: Lock the stacked layout and sculpture contract

**Files:**

- Modify: `tests/site.spec.ts`
- Test: `tests/site.spec.ts`

**Interfaces:**

- Consumes: `.home-title`, `.project-field`, `.home-action`
- Produces: browser assertions for vertical order and scene metadata

- [x] Add a failing home test that asserts heading → canvas → action vertical order at 1440×950.
- [x] Add failing assertions for `data-centerpiece-mode="procedural-crest"`, `data-centerpiece-gradient="white-ice-cobalt"`, and `data-minimum-orbit-gap="1"`.
- [x] Run the focused test and confirm it fails on the old right-weighted layout.

### Task 2: Build the centered hero composition

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/app/site.css`

**Interfaces:**

- Produces: `.home-title`, flow-positioned `.project-field`, and `.home-action`

- [x] Move the scene between the heading and action group in semantic document order.
- [x] Replace the split desktop/mobile positioning rules with a responsive three-row grid.
- [x] Run the focused layout test and confirm the vertical-order assertions pass.

### Task 3: Build the procedural crest and expanded orbit system

**Files:**

- Modify: `src/components/home/solar-system-scene.ts`
- Modify: `src/components/home/project-field.tsx`
- Test: `tests/site.spec.ts`

**Interfaces:**

- Produces: `centerpieceMode`, `centerpieceGradient`, and `minimumOrbitGap` on `SolarSystemHandle`

- [x] Expand all radii so the computed minimum adjacent gap is `1.0` or greater.
- [x] Remove the bitmap face plane and replace it with a white/ice/cobalt procedural shader plus inset relief geometry.
- [x] Center the solar-system group at every desktop and mobile breakpoint.
- [x] Expose computed scene metadata and run the focused test until it passes.

### Task 4: Visual and release verification

**Files:**

- Modify: `README.md`

**Interfaces:**

- Consumes: the completed static export
- Produces: verified screenshots and a deployable Sites archive

- [x] Run formatting, lint, typecheck, build, and the complete Playwright suite.
- [x] Inspect real screenshots at 1440, 390, and 320 pixels and correct hierarchy, clipping, or spacing issues.
- [x] Measure initial and lazy gzip script totals against both budgets.
- [x] Update the README, package the exact tested commit, and publish it to the existing private Site.

### Task 5: Flatten the orbits and restore an accurate crest relief

**Files:**

- Modify: `src/components/home/solar-system-scene.ts`
- Modify: `src/components/home/project-field.tsx`
- Modify: `tests/site.spec.ts`

**Interfaces:**

- Produces: `orbitModel`, `orbitDepthRange`, `centerpieceMode`, and `centerpieceSurface` on `SolarSystemHandle`

- [x] Assert that the rendered scene reports one coplanar orbit plane and a depth range of `0`.
- [x] Assert that the centerpiece reports an artwork-driven displaced bas-relief surface.
- [x] Replace inclined circle transforms with concentric elliptical positions at `z = 0`.
- [x] Replace the abstract shader face and relief bars with a subdivided logo-textured displacement mesh.
- [x] Verify desktop/mobile screenshots, the complete suite, performance budgets, and publish the exact tested commit.

### Task 6: Move the orbital plane into scene depth

**Files:**

- Modify: `src/components/home/solar-system-scene.ts`
- Modify: `src/components/home/project-field.tsx`
- Modify: `tests/site.spec.ts`

**Interfaces:**

- Produces: low-angle camera, XZ-plane orbit metadata, larger planet metrics, and ambient-halo lighting metadata

- [x] Assert an XZ orbital plane with a `23`-unit depth range and low-angle presentation.
- [x] Assert a minimum orbit radius of `4`, a minimum orbit gap of `1.5`, and a minimum planet radius of `0.58`.
- [x] Assert ambient-halo centerpiece lighting.
- [x] Move orbit positions to XZ, lower the camera angle, enlarge planets, and spread all paths outside the crest.
- [x] Reduce direct center light and tune the halo until the artwork remains legible.
- [x] Verify screenshots, interaction, accessibility, performance budgets, and package the exact tested source for publication.
