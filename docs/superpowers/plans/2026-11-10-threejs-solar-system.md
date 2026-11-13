# Three.js Solar System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home hero’s 2D orbital renderer with a responsive, accessible Three.js solar system and a layered 3D TSA centerpiece.

**Architecture:** `ProjectField` remains the client boundary and dynamically imports a focused scene module after mount. The scene module owns Three.js setup, the one-to-one body/orbit model, responsive camera composition, animation, reduced-motion rendering, and cleanup.

**Tech Stack:** Next.js 16, React 19, TypeScript, Three.js, Playwright

**Spec:** `docs/superpowers/specs/2026-11-10-threejs-solar-system-design.md`

## Global Constraints

- Exactly six rendered bodies and six visible orbit paths.
- The TSA logo must have layered 3D depth and a white silhouette glow.
- Three.js must load dynamically and renderer pixel ratio must not exceed `1.5`.
- The HTML headline, supporting sentence, CTA, responsive behavior, accessibility, and reduced-motion support must remain intact.

## Review Focus

- WebGL unavailable: HTML hero remains usable and no uncaught page error occurs.
- Small phone: the system fits below the CTA without horizontal overflow.
- Reduced motion: scene renders once instead of running an animation loop.
- Resize and navigation: renderer resizes and fully disposes on unmount.
- Orbit integrity: no body position is calculated separately from its visible orbit curve.

---

### Task 1: Lock the Three.js scene contract

**Files:**
- Modify: `tests/site.spec.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: browser assertions for one Three.js canvas, six orbits, six bodies, and layered logo depth.

- [x] Write the failing hero test and verify it fails against the 2D canvas.
- [x] Add `three` and its TypeScript declarations.
- [x] Confirm the existing project still typechecks before the renderer replacement.

### Task 2: Build the solar system scene

**Files:**
- Create: `src/components/home/solar-system-scene.ts`
- Modify: `src/components/home/project-field.tsx`
- Modify: `src/app/site.css`

**Interfaces:**
- Consumes: `{ canvas, container, reducedMotion }` from `ProjectField`.
- Produces: `mountSolarSystem(options): Promise<() => void>` cleanup callback and scene readiness metadata.

- [x] Dynamically import the scene module and Three.js only after mount.
- [x] Create the shared scene, camera, renderer, lights, stars, six line paths, six planets, labels, and layered TSA extrusion.
- [x] Derive every body position from the same orbit function used to generate its visible line.
- [x] Add responsive composition, pointer tilt, planet hover freeze/lift/spin, fixed logo hover without a rotating gradient, one-frame reduced motion, WebGL failure fallback, and complete disposal.
- [x] Run the focused hero and reduced-motion tests until green.

### Task 3: Verify visual and performance behavior

**Files:**
- Modify: `tests/site.spec.ts`
- Update: `README.md`

**Interfaces:**
- Consumes: finished Three.js hero.
- Produces: responsive screenshots and recorded initial/lazy JavaScript measurements.

- [x] Inspect desktop and phone screenshots for crop, hierarchy, orbit count, logo depth, and CTA overlap.
- [x] Measure initial page script gzip size and lazy scene chunk size against the spec budgets.
- [x] Run lint, typecheck, production build, and all Playwright tests.
- [ ] Commit and publish the verified static export to the existing private Site.
