# Interactive Hero Design

## Intent

Turn the Elkins TSA home page opening into an experience that feels authored for a technology chapter: concise, kinetic, and tactile. The hero should reward pointer movement, show real chapter artwork, and create depth without delaying access to the member list.

## Goals

- Replace the text-heavy poster hero with one short headline and two direct actions.
- Use the three real meeting artworks as a perspective carousel that visually recedes into the page.
- Add a pointer-following light field and subtle 3D response on capable devices.
- Keep the correct Elkins TSA crest visible as a brand mark.
- Preserve keyboard access, reduced-motion behavior, mobile layout, navigation, and every existing dashboard feature.
- Complete ten screenshot-led critique passes at 1440×900 and 390×844.

## Non-goals

- No WebGL, video, new backend, invented chapter claims, or unrelated page rebuild.
- No decorative copy, generic stat strip, or extra controls that compete with the primary actions.

## Anti-goals

- A generic dark hero with a single neon blob.
- Constant motion that makes reading or navigation harder.
- Fake photographs or AI-generated chapter imagery.
- A carousel that disappears from the accessibility tree or requires a mouse.

## Constraints

- Next.js 16, React 19, static export, existing Geist variable font.
- Reuse `/images/TSA_Logo-transparent.png` and the three meeting preview images.
- Preserve the existing owner-private Sites project and publishing audience.
- Keep performance appropriate for a school site and respect `prefers-reduced-motion`.

## Approaches considered

1. **Idea orbit (selected):** A short headline sits beside a three-layer perspective carousel. Pointer movement drives a local light field and a restrained tilt. Real meeting artwork provides color and texture. This has the strongest connection to Elkins TSA and works without a heavy graphics runtime.
2. **WebGL object field:** Floating 3D parts and particles would feel more cinematic, but it adds bundle weight, motion risk, and weakens the connection to real chapter content.
3. **Scroll-driven filmstrip:** Full-screen panels could transition on scroll, but the member-list task would be pushed too far down the page and the hero would feel longer rather than sharper.

## Visual system

- **Night circuit** `#08071a`: main stage.
- **Deep indigo** `#17133b`: depth and panels.
- **Electric violet** `#7157ff`: interactive light.
- **Sky cyan** `#58d6ff`: secondary light and focus.
- **Soft white** `#f7f5ff`: type and controls.
- **Signal pink** `#ff6bd6`: small active state drawn from the meeting artwork.

Geist remains the only family. The display treatment uses its heavy weight with tight spacing; labels use ordinary sentence case. The carousel becomes the memorable element, so the surrounding navigation and copy stay quiet.

## Layout

```text
desktop
┌────────────────────────────────────────────────────────────┐
│ crest  Elkins TSA                       navigation          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Make what’s next.          ╱ card 3                       │
│  [Explore events]           ╱  card 2                      │
│  [Find your name]        [ active chapter artwork ]        │
│                              controls + caption             │
│                                                            │
└────────────────────────────────────────────────────────────┘

mobile
┌───────────────────────────┐
│ short headline + actions  │
│                           │
│  [ stacked artwork ]      │
│  controls + caption       │
└───────────────────────────┘
```

The desktop composition is asymmetrical and left aligned. Mobile keeps the headline first and uses a compact horizontal card stack. The pointer light follows the visitor but never changes layout.

## Interaction

- Pointer movement updates normalized CSS variables within the hero; the gradient and carousel tilt interpolate with CSS.
- Previous/next buttons and three slide selectors update the active artwork and caption.
- The carousel advances gently when idle, pauses on hover or focus, and stops entirely for reduced motion.
- Entrance motion is one orchestrated reveal: copy settles, then the card stack fans into depth.
- Keyboard focus remains visible; controls expose accessible names and active state.

## Verification

- Playwright proves carousel controls, pointer response, reduced-motion behavior, layout, and existing member/calendar journeys.
- Axe checks the public routes.
- Ten numbered screenshot passes at desktop and mobile record the visual loop.
- Lint, typecheck, build, and the full browser suite run before publication.

