# Elkins TSA Website Rebuild — Design

## Intent

Rebuild the existing static Elkins TSA site so students can reach chapter tasks and files quickly while the landing page is strong enough to represent the work in a design portfolio. The site must feel deliberately authored, avoid generic AI landing-page patterns, and keep one obvious action on the home page.

## Goals

- Make the dashboard the central utility destination.
- Give the home page one primary CTA: **Open dashboard**.
- Provide the requested 2026–27 calendar, four-item to-do list, three-column resources layout, and placeholder officer roster.
- Use motion and pointer response as a layer of craft without hiding navigation or content.
- Keep the whole site static, responsive, keyboard accessible, and reduced-motion friendly.
- Publish to the existing owner-private Site and preserve its URL.

## Non-goals

- Accounts, sign-ups, saved task state, personalization, databases, or admin editing.
- Invented organization links, officer biographies, metrics, testimonials, or chapter claims.
- Heavy 3D on utility pages.

## Anti-goals

- Purple mesh gradients, glass cards, pill-heavy controls, repeated feature cards, decorative filler copy, and fake links.
- A portfolio effect that makes the calendar or resources harder to use.
- Copying any reference site’s branding or exact composition.

## Approaches considered

1. **Cinematic home plus structured interiors — selected.** A minimal canvas-driven landing page carries the portfolio value. The dashboard and resources pages use a disciplined editorial grid. This best balances spectacle with findability.
2. **One editorial grid across every page.** Fast and coherent, but the landing page would have less technical and portfolio impact.
3. **Full WebGL experience across every page.** Visually ambitious, but slower, less accessible, and contrary to the student utility goal.

## Visual direction

The design combines the useful principles seen in the supplied references:

- Paligan: one dominant statement, restrained navigation, generous negative space.
- Matveyan: live pointer telemetry, technical framing, spatial motion.
- Black Highlights: near-black material, grain, display serif contrast.
- Paragon: rigid rules, oversized type, sharp blue actions, list-based composition.

The resulting system uses carbon black, warm off-white, TSA blue, and a restrained safety orange accent. Typography pairs Geist with a high-contrast system serif. Corners are mostly square. Rules, coordinates, counters, and a custom canvas field provide technical character. No purple gradients or glass treatment are used.

## Page design

### Home `/`

- Full-height near-black stage below the shared header.
- Custom canvas field draws orbiting project nodes and fine-line connections; it responds to a mouse and becomes still for reduced motion or touch.
- Heading: **Build what matters.**
- One CTA only: **Open dashboard** → `/dashboard`.
- Short supporting line explaining the chapter’s purpose, without additional buttons.
- Footer visible at the end of the stage.

### Dashboard `/dashboard`

- Page intro with “Your next move” and the current season marker.
- Primary two-column composition: calendar on the left, to-do list on the right.
- Calendar dates:
  - Nov 17, 2026 — Project building meeting
  - Nov 24, 2026 — Ideation deadline
  - Dec 1, 2026 — 25% checkpoint
  - Dec 15, 2026 — 50% checkpoint
  - Jan 19, 2027 — 75% checkpoint and in-house competition
  - Jan 26, 2027 — Project submission deadline
  - Feb 12–13, 2027 — Regional conference
  - Apr 19–22, 2027 — State conference
  - Jun 23–27, 2027 — National conference
- To-do list:
  1. Ideation workshop
  2. Check membership
  3. Pay dues
  4. Upload CTSO agreement

### Resources `/resources`

- Three equal columns separated by vertical rules on desktop; they stack with horizontal rules on narrow screens.
- Event information: National TSA competitions, National TSA guide access, Texas TSA, Texas TSA events, Gulf Coast TSA, Texas competition requirements.
- Organization quicklinks: membership spreadsheet, event entries spreadsheet, CTSO submission form, dues, ideation submission form.
- Organization files: CTSO agreement, ideation worksheets, and meeting PDFs in descending recency.
- Unknown chapter-controlled destinations are visible as **Link pending**, never as fake anchors.

### About `/about`

- Oversized officer roster inspired by the supplied list treatment.
- Placeholder entries A, B, and C with neutral “Officer” roles.
- No invented bios.

## Shared shell

- Header on every page: correct TSA crest, Elkins TSA label, Home, Dashboard, Resources, About, school year.
- Footer on every page: compact navigation, season, and **Developed by Aryan Goel** aligned bottom right.
- Existing owner-private audience and Site project ID remain unchanged.

## Motion and accessibility

- Canvas is decorative, `aria-hidden`, pointer-safe, and pauses for reduced-motion users.
- Page entrance motion uses transforms and clip reveals rather than fading text through low-contrast states.
- All controls have visible focus states and at least 44px touch targets.
- Calendar uses native buttons with full date/event accessible names.
- Mobile views retain the same information order and avoid horizontal overflow.

## Content and link policy

Use supplied chapter links and verified official public links. Keep missing spreadsheet/form URLs explicit as pending. Preserve downloadable chapter PDFs already in `public/documents`.
