# Header, Footer, and Shooting Stars Design

## Intent

Correct the home hero hierarchy, make the chapter identity more prominent, and rebuild the footer around the supplied Paligan reference without copying its removed promotional content.

## Approved direction

- Return the home hero to a solid ink background; retain only the subtle grain texture.
- Keep three shooting stars, but give each a distinct direction and path so they do not read as parallel comets. Paths remain deterministic for stable rendering and accessibility.
- Set “Build” and “what matters.” at the same display size and family. Distinguish them with weight, case, and tone instead of a large size mismatch.
- Increase the header crest to `58px` on desktop and present “Elkins High School TSA” as one `1rem` single-line label.
- Recompose the footer with two compact link groups at the upper-right, a full-width “ELKINS TSA” wordmark, a horizontal rule, and “Developed by Aryan Goel” beneath it.
- The Navigate group contains Home, Dashboard, Resources, and About. The Elsewhere group contains Instagram, Texas TSA, and National TSA. Instagram uses `https://www.instagram.com/` as a temporary placeholder.
- Do not include the reference’s Paligan logo, “We move in silence,” email address, or client portal.

## Visual system

- Color: solid ink `#0a0c0b`, paper `#faf8f1`, muted text `#a3a69f`, rule `#343733`, and existing TSA blue only inside the artwork and CTA.
- Type: Geist Variable throughout the header, hero headline, footer navigation, and wordmark; Georgia italic remains reserved for the one-line hero summary.
- Layout: header identity at left and existing page navigation at right; footer link groups at the top-right, followed by the oversized wordmark spanning the page.
- Principle: the crest/orbital system remains the only complex visual. The header and footer are large, typographic, and quiet.

## Alternatives considered

1. Randomize trajectories on every page load: rejected because screenshots and reduced-motion states would shift unpredictably.
2. Use three fixed but clearly different vectors: selected because the stars look varied while remaining stable and testable.
3. Preserve the existing compact footer and only enlarge its wordmark: rejected because it would not match the reference’s hierarchy or provide the requested external links.

## Quality constraints

- No hero background gradient.
- Exactly three shooting stars with three distinct trajectories.
- Header brand remains one line at 320 pixels without horizontal overflow.
- Footer links remain keyboard accessible and external links open safely.
- Preserve the single dashboard CTA, reduced-motion behavior, accessibility checks, and current JavaScript budgets.
