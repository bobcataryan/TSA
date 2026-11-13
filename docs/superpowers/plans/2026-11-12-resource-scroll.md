# Resource Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add searchable, scroll-responsive resource panels with colorful three-dimensional depth and more padding.

**Architecture:** Keep resource data server-owned and pass it to a focused client component. The client component filters items and updates panel CSS variables from a requestAnimationFrame-throttled scroll measurement; CSS owns perspective and presentation.

**Tech Stack:** Next.js, React, TypeScript, CSS, Playwright

**Spec:** `docs/superpowers/specs/2026-11-12-resource-scroll-design.md`

## Global Constraints

- Preserve resource order, destinations, downloads, and keyboard accessibility.
- Respect `prefers-reduced-motion` and avoid custom cursor behavior.
- Keep mobile content fully visible without horizontal overflow.

## Review Focus

- Empty search shows a clear no-results state.
- Search is case-insensitive and updates the result count.
- Scroll effects do not intercept pointer or keyboard interaction.
- Reduced-motion users receive static panels.
- All existing resources remain available in their original order.

---

### Task 1: Searchable scroll panels

**Files:**

- Modify: `src/app/resources/page.tsx`
- Modify: `src/components/resources/resource-stage.tsx`
- Modify: `src/app/site.css`
- Test: `tests/site.spec.ts`

**Interfaces:**

- Consumes: `ResourceGroup[]` from `src/data/resource-groups.ts`
- Produces: `ResourceStage({ groups }: { groups: ResourceGroup[] })`

- [ ] Add browser assertions for search filtering, no custom cursor, stacked panels, and scroll-depth variables.
- [ ] Implement filtered rendering and accessible result feedback.
- [ ] Implement requestAnimationFrame-throttled perspective measurements and reduced-motion behavior.
- [ ] Add stacked panel, search, padding, and colored depth styling.
- [ ] Run lint, typecheck, build, targeted browser tests, and responsive screenshots.
