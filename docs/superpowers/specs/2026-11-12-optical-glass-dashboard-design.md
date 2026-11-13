# Optical Glass Dashboard Design

## Intent

Make the dashboard feel like clear, premium optical glass over the approved horizon background, and bring the home hero's typography, navigation, spacing, and orbit contrast to the same level of finish.

## Direction

- Use nearly colorless layered glass: low-opacity white fill, strong blur/saturation, a restrained refracted edge, and soft depth shadows. The horizon remains the source of color.
- Use compact rounded event chips with category-specific cool colors and subtle internal highlights instead of flat red/blue blocks.
- Recompose `BUILD WHAT MATTERS.` as a tighter, balanced display lockup with equal visual weight across both lines and less dead space around the scene.
- Turn the navigation into a quiet inset rail with a rounded active lens rather than boxed cells.
- Raise orbit contrast from charcoal to a lighter neutral blue-gray without becoming white or beige.

## Constraints

- Preserve content, routes, calendar behavior, Three.js interactions, responsive layouts, accessibility, and reduced-motion behavior.
- Avoid opaque panels, excessive glow, heavy decorative gradients, or generic floating-card styling.

## Approaches considered

1. **Single frosted layer:** simplest, but reads like ordinary transparent UI.
2. **Layered optical glass (selected):** pseudo-element highlights, refracted borders, background blur, and quiet depth create the requested physical-glass feel without changing structure.
3. **Shader/canvas refraction:** potentially realistic but disproportionately complex and fragile for text-heavy calendar surfaces.

