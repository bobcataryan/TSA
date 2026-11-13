# Stacked Crest Hero Design

## Intent

Make the solar system read as the visual center of the home page instead of a decoration beside the copy. The chapter crest should become an authored 3D sculpture inspired by the supplied logo silhouette, not a preserved bitmap floating on a flat badge.

## Composition

- Use one centered vertical sequence: “Build what matters.” at the top, the Three.js solar system in the middle, then “Everything you need in one place.” and the dashboard CTA below.
- Keep the solar system in normal document flow so the heading, scene, and action never overlap.
- The hero remains a single-screen composition on common desktop displays and may grow vertically on phones.
- Center the solar system at `x = 0`, `y = 0`, `z = 0` within its canvas.

## Solar system

- Keep exactly six planets and six used orbit paths.
- Expand the orbital radii to create at least `1.0` Three.js unit between adjacent paths.
- Keep all orbit paths in one horizontal XZ plane: left-to-right across the page and forward/back through scene depth, never rising vertically around the crest.
- Present that plane from a low camera angle so the near arcs pass in front of the crest and the far arcs recede behind it.
- Start the first orbit at radius `4.0`, end the outer orbit at radius `11.5`, and keep `1.5` Three.js units between paths so every ring clearly surrounds the crest.
- Keep the varied stone, amber, ocean, sand, moss, and ice planet materials, atmospheres, and one ringed planet; increase every planet radius so the smallest is at least `0.58` Three.js units.

## Centerpiece

- Trace the supplied crest to derive its outer silhouette and extrude that silhouette into a beveled body with an icy side material.
- Use the supplied artwork on a subdivided front mesh so the horse, TSA lettering, red banner, yellow circuit details, and exact proportions remain recognizable.
- Derive a grayscale height map from the artwork and use it to displace the front mesh into a shallow bas-relief rather than a flat textured card.
- Keep a restrained white-to-ice ambient halo behind the sculpture without a strong point light washing out the logo artwork.
- Keep the object at orbital depth `0`; animate only a slow vertical hover and restrained pointer tilt.

## Visual system

- **Carbon:** `#080a09`
- **Bone:** `#f4f4f0`
- **Ice:** `#dff7ff`
- **Sky:** `#8bd8ff`
- **Cobalt:** `#2f66e8`
- **Orbit:** `#768593` at low opacity

Keep the existing sans/serif type pairing and chapter navigation. The scene is the memorable element; do not add labels, metrics, status copy, cards, or decorative interface chrome.

## Responsive and motion

- Desktop: wide centered scene between the headline and action group.
- Tablet and phone: scale the solar system down as one unit while retaining the full center object and at least the first five orbit paths in view.
- Respect `prefers-reduced-motion`; render a still scene and preserve all text and navigation.

## Performance

- Keep Three.js dynamically loaded.
- Initial scripts remain at or below `200,000` gzip bytes; total initial plus lazy scene scripts remain at or below `375,000` gzip bytes.
