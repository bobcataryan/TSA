# Optical Glass Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver premium optical glass on the dashboard and tighten the home hero's typography, navigation, spacing, and orbit contrast.

**Architecture:** Keep the existing React and Three.js structure. Implement the visual system in `site.css`, with one restrained orbit-material adjustment in the Three.js scene and regression assertions in Playwright.

**Tech Stack:** Next.js 16, React 19, CSS, Three.js, Playwright

**Spec:** `docs/superpowers/specs/2026-11-12-optical-glass-dashboard-design.md`

## Global Constraints

- Preserve existing content, interactions, routes, accessibility, and responsive behavior.
- Use clear layered glass; avoid opaque fills, excessive glow, or heavy gradients.

## Review Focus

- Glass must remain legible over the bright horizon on desktop and mobile.
- Calendar chips must remain distinguishable without harsh red/blue blocks.
- Hero title must not clip at 320px width or 200% zoom.
- Navigation must remain keyboard-visible and horizontally usable on mobile.
- Orbit lines must be visible without competing with the planets or crest.

---

### Task 1: Optical dashboard glass

**Files:**
- Modify: `src/app/site.css`
- Test: `tests/site.spec.ts`

- [x] Add regression assertions for layered clear glass and refined event colors.
- [x] Replace flat panel fills with translucent layered optical surfaces, rim highlights, and soft depth.
- [x] Restyle calendar controls, cells, event chips, and to-do rows to match.
- [x] Run focused dashboard tests.

### Task 2: Home hero refinement

**Files:**
- Modify: `src/app/site.css`
- Modify: `src/components/home/solar-system-scene.ts`
- Test: `tests/site.spec.ts`

- [x] Add assertions for the tighter hero and lighter neutral orbit material.
- [x] Rebalance the title lockup and vertical rhythm.
- [x] Replace boxed navigation with a rounded inset rail and active lens.
- [x] Increase orbit-line contrast to a restrained blue-gray.
- [x] Run home and responsive tests.

### Task 3: Visual and release verification

**Files:**
- Verify: home and dashboard at 1440px, 834px, 390px, and 320px.

- [x] Run lint, build, and the full Playwright suite.
- [x] Capture and inspect stable desktop/mobile screenshots.
- [ ] Correct any visual regressions and republish the verified source state.

