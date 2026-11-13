# Comet Gradient and Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich the home hero with a midnight gradient, three restrained Three.js comets, larger orbital labels, and a corrected type hierarchy.

**Architecture:** Keep the existing page composition and extend the dynamically imported Three.js scene with reusable comet groups and shared label-size constants. Apply the gradient and type hierarchy in the existing home styles, then expose scene metrics through the established `ProjectField` metadata boundary for browser verification.

**Tech Stack:** Next.js, React, TypeScript, Three.js, CSS, Playwright

**Spec:** `docs/superpowers/specs/2026-11-10-comet-gradient-typography-design.md`

## Global Constraints

- Preserve exactly six planets, six used orbit paths, and one dashboard CTA.
- Render exactly three background comets.
- Use one computed sans family across both headline phrases and Georgia italic for the summary.
- Keep the current responsive, accessibility, reduced-motion, and JavaScript performance budgets.

## Review Focus

- At 320 pixels, larger labels must remain inside the hero without introducing horizontal overflow.
- At 1440 pixels, comet trails must stay subordinate to the crest and headline.
- Reduced-motion mode must render a stable scene rather than scheduling moving comet passes.
- Planet hover selection must remain accurate after labels and comet objects are added.
- The new gradient must retain readable contrast for the headline, summary, and CTA.

---

### Task 1: Verify the new hero hierarchy

**Files:**

- Modify: `tests/site.spec.ts`
- Modify: `src/app/site.css`
- Modify: `src/components/home/solar-system-scene.ts`
- Modify: `src/components/home/project-field.tsx`

**Interfaces:**

- Produces: `cometCount`, `planetLabelFontSize`, and `planetLabelWidth` on `SolarSystemHandle`

- [x] Add failing browser assertions for the layered hero gradient, shared headline font family, serif italic summary, three comets, and enlarged label metrics.
- [x] Run the focused browser test and confirm the assertions fail against the current hero.
- [x] Update the home gradient and typography in `site.css`.
- [x] Add three depth-aware comet groups and shared orbital-label sizing constants to `solar-system-scene.ts`.
- [x] Forward the new scene metrics through `project-field.tsx`.
- [x] Re-run the focused test and confirm it passes.
- [x] Capture and inspect the home page at 1440, 390, and 320 pixels; tune only the highest-impact mismatch.
- [x] Run lint, typecheck, build, the full browser suite, accessibility checks, and JavaScript budgets.
- [x] Prepare the exact verified source for packaging and publication.
