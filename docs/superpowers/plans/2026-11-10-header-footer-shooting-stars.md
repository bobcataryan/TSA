# Header, Footer, and Shooting Stars Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a solid-black hero with balanced headline type and multi-direction shooting stars, a larger single-line chapter brand, and a reference-led footer.

**Architecture:** Extend the existing Three.js comet definitions with explicit start/end vectors and expose their directional count through the current scene metadata boundary. Keep the header and footer as shared React components, using the existing navigation/link data and responsive CSS.

**Tech Stack:** Next.js, React, TypeScript, Three.js, CSS, Playwright

**Spec:** `docs/superpowers/specs/2026-11-10-header-footer-shooting-stars-design.md`

## Global Constraints

- Solid ink hero background with no CSS gradient.
- Three shooting stars on three distinct trajectories.
- One-line “Elkins High School TSA” header brand.
- Footer Navigate and Elsewhere groups, oversized “ELKINS TSA,” rule, and bottom credit.
- Preserve existing routes, CTA behavior, reduced motion, accessibility, and performance budgets.

## Review Focus

- Long header brand must not collide with the page navigation between 600 and 900 pixels.
- Equal-size hero phrases must not overflow at 320 or 390 pixels.
- Opposing shooting-star paths must stay behind the solar system and not affect planet hover picking.
- Large footer wordmark must wrap predictably and never create horizontal overflow.
- Placeholder Instagram and official TSA links must remain valid external links with safe new-tab behavior.

---

### Task 1: Lock the revised shared identity and hero behavior

**Files:**

- Modify: `tests/site.spec.ts`
- Modify: `src/components/layout/navbar.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/data/links.ts`
- Modify: `src/components/home/solar-system-scene.ts`
- Modify: `src/components/home/project-field.tsx`
- Modify: `src/app/site.css`

**Interfaces:**

- Produces: `cometDirectionCount` and `cometMotion` on `SolarSystemHandle`

- [x] Add failing browser assertions for a solid hero, balanced headline sizes, a one-line header brand, distinct shooting-star directions, and the complete footer structure.
- [x] Run the focused tests and confirm they fail against the current site.
- [x] Replace parallel comet travel with three explicit start/end vectors and expose the scene metadata.
- [x] Update the hero and header typography and sizing.
- [x] Rebuild the footer component and responsive styles from the approved reference hierarchy.
- [x] Re-run the focused tests and confirm they pass.
- [x] Capture and inspect the home page plus an interior page at 1440, 834, 390, and 320 pixels.
- [x] Run lint, typecheck, build, the full browser suite, accessibility checks, and JavaScript budgets.
- [x] Prepare the exact verified source for publication.
