# Three.js Solar System Hero Design

## Intent

Replace the current 2D orbital drawing with one coherent Three.js solar system while preserving the quiet headline, sentence, and dashboard CTA. The 3D scene is the single expressive element: it should feel spatial and authored, not like an effects demo.

## Scene contract

- Render every orbital graphic in one transparent WebGL canvas.
- Use exactly six bodies and exactly six visible orbit paths; each body must travel on the path drawn for it. No unused or decorative orbit rings. Give all six paths distinct 3D inclinations so depth testing makes crossings and occlusion physically legible.
- Render each body as a lit 3D sphere with its existing label: CAD, VIDEO, CODE, BUILD, DESIGN, and DATA. Use six distinct procedural materials inspired by stone, amber, ocean, sand, moss, and ice; add subtle atmospheres and one ringed planet.
- Build the TSA centerpiece as an actual extruded geometry derived from the logo alpha silhouette, with the original artwork on its front face, a dimensional side material, a white logo-shaped glow, pointer-responsive tilt, and slow vertical hover. Keep its center at depth `0` in the orbital system.
- Add a restrained star field and real scene lighting. Do not add interface labels, status text, extra copy, or additional controls.
- Keep the headline, “Everything you need in one place.”, and “Open dashboard” as accessible HTML above the canvas.

## Visual direction

- **Palette:** carbon `#0a0c0b`, white light `#f7fbff`, TSA cobalt `#2454d6`, plus mineral gray, amber, ocean teal, sand, moss, and ice blue.
- **Material:** dark space, thin low-contrast orbit paths, six individually textured physical planet materials, restrained atmospheres, one planetary ring, and a white center light.
- **Motion:** constant slow orbital motion and a gentle logo hover. Pointer movement tilts the system as one unit; hovering a planet pauses that body, lifts and enlarges it, and accelerates its own spin. The logo has no rotating color gradient. Reduced-motion mode renders one still frame.
- **Composition:** solar system remains right-weighted on desktop and moves below the copy on phones.

## Performance and resilience

- Load `three` dynamically after mount so it is excluded from the initial page script set.
- Cap renderer pixel ratio at `1.5`; use shared sphere geometry and dispose every geometry, texture, material, observer, and listener.
- Baseline home scripts are 185,162 gzip bytes. Initial scripts must remain at or below 200,000 gzip bytes; the lazy Three.js scene chunk may bring total loaded JavaScript to 375,000 gzip bytes.
- If WebGL initialization fails, leave the dark hero and HTML content usable without erroring.
