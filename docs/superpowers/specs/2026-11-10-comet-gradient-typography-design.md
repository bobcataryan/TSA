# Comet Gradient and Typography Design

## Intent

Make the home hero feel richer and more cinematic without competing with the solar-system centerpiece or adding new copy. The orbital discipline remains the main visual idea.

## Approved direction

- Replace the flat black hero field with a restrained midnight-to-ice gradient: `#040708`, `#071019`, `#0b1d2a`, `#163346`, and a low-opacity `#9edfff` atmospheric bloom. Avoid purple and saturated multicolor washes.
- Add three sparse Three.js comet streaks behind the solar system. They cross the star field on long, staggered loops and disappear cleanly at the edges. Reduced-motion mode renders them as a still background detail.
- Increase the rendered `CAD`, `VIDEO`, `CODE`, `BUILD`, `DESIGN`, and `DATA` labels from secondary microcopy to readable orbital annotations, using a `56px` texture font and `2.0` world-unit sprite width. Keep them attached to their planets and preserve depth occlusion.
- Use the existing sans family for both “Build” and “what matters.” The first phrase stays heavy; the second uses a lighter weight rather than a different family.
- Move the existing Georgia italic treatment to “Everything you need in one place.” Keep the single dashboard CTA and all existing page content.

## Approaches considered

1. CSS-only streaks over the canvas: fastest, but they would ignore scene depth and make the hero feel layered rather than unified.
2. Three.js comet groups with a luminous head and fading trail: selected because they share the scene’s depth, reduced-motion lifecycle, and disposal path.
3. A shader-heavy meteor field: rejected because it would add visual noise and bundle complexity without improving the page’s primary task.

## Layout and motion

The headline, solar system, summary, and CTA keep their current vertical order. Comets remain behind the orbital system and use long, low-frequency passes so they read as atmosphere rather than a second animation system. The gradient concentrates light near the solar system and darkens toward the navigation and footer.

## Quality constraints

- Three comets, six planets, six used orbit paths, and one dashboard CTA.
- Orbital labels must be materially larger on desktop and mobile without colliding with their planets.
- Headline halves must resolve to the same computed font family; the summary must use the serif italic family.
- No horizontal overflow at 320, 390, 834, or 1440 pixels.
- Preserve accessibility, hover behavior, reduced motion, and current JavaScript performance budgets.
