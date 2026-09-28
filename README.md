# Elkins High School TSA · 2026–2027

A static, responsive chapter website built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, locally hosted Geist, and lightweight Framer Motion effects. Radix Dialog provides accessible navigation/search dialogs. No authentication, database, API keys, or backend is needed.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. After `npm run build`, `npm start` serves the static production build on port 3000 (stop the development server first). The development server and production build index uploaded assets before starting.

## Update content

| Content                                                       | Edit                        |
| ------------------------------------------------------------- | --------------------------- |
| Announcements, pinned status, publication dates, attachments  | `src/data/announcements.ts` |
| Deadline dates, exact times, labels, and actions              | `src/data/deadlines.ts`     |
| Official links, officer application URL, optional BAND link   | `src/data/links.ts`         |
| Event categories, formats, rules, resources, and status       | `src/data/events.ts`        |
| Resource titles/descriptions/categories                       | `src/data/resources.ts`     |
| Officer names, positions, grades, photos; verified statistics | `src/data/officers.ts`      |
| Chapter branding and school year                              | `src/data/site.ts`          |

Announcement dates may be `null` when the publication date is not known. Update historic announcement text deliberately when deadlines change. Event records marked `Example` are visibly labeled as unconfirmed and must be replaced with chapter-approved information before being treated as official offerings. Only categories represented by entries appear in the filters. Empty officer/statistics arrays stay hidden.

### Add the logo and PDFs

1. Put the TSA logo in `public/images/` with `tsa` or `logo` in the filename (PNG, JPG, WebP, or SVG).
2. Put public chapter PDFs in `public/documents/`. Original filenames, including spaces and `+`, are supported and URL-encoded automatically.
3. Run `npm run assets:sync` while the dev server is running, or restart `npm run dev`. Builds always sync automatically.

The asset index discovers documents recursively within `public/`, identifies the parent agreement, groups meeting and leadership files, and connects the parent letter to the checklist and resource page. The temporary TSA lettering is replaced automatically when a logo is present. The generated `src/data/assets.generated.json` is not meant for manual editing.

For precise titles, descriptions, dates, or meeting status, copy the generated resource entry into the `curated` array in `src/data/resources.ts`, keeping its ID and setting your preferred fields. Curated entries override generated ones. `latest: true` labels a meeting as latest. `parentAgreement: true` connects a resource to the membership checklist. To attach a resource to an announcement, copy its ID to the announcement’s `resourceIds`. Check the contents of newly uploaded PDFs before describing specific event rules; indexing reads filenames only.

Only put files intended for public access in `public/`. The site does not copy or scrape the sign-up spreadsheet. Be especially careful with any sign-up PDFs containing student details.

### Officer application

Set `links.officerApplication` to the real application URL, or add an officer application PDF in `public/documents/`. Until either exists, the application action stays unavailable. Officer records and statistics are intentionally empty.

### Google Sheets

The supplied Google Sheets URL is the source of truth. By default students open the actual spreadsheet, respecting its existing permissions. The site does not fetch student data. If an authorized officer later publishes a safe embed, set `signupsConfig.embedUrl` to that verified public embed URL. A fallback link remains visible. `publicCsvUrl` is an optional future configuration point, deliberately unused until an explicit implementation is wanted. The agreement-upload form may require Google sign-in.

### Deadlines and time zones

Exact deadlines use ISO timestamps with explicit offsets (`2026-09-30T23:59:00-05:00`). The countdown uses the browser clock but compares the same absolute instant in every time zone. Display labels identify Central Time. Date-only deadlines use `YYYY-MM-DD` and become passed only after that calendar day in `America/Chicago`; the interface never invents a cutoff time. The membership strip, hero, and checklist automatically switch to closed messaging. Announcement text remains a historical record.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright expects the dev server on `http://127.0.0.1:3000` and locally installed Google Chrome. Tests cover all six routes at desktop, tablet, and two phone widths; navigation; search; filters; keyboard accessibility; reduced motion; links; and exact deadline/time-zone transitions. Screenshots and reports stay in ignored `test-results/`. To use Playwright Chromium instead, remove `channel: 'chrome'` from the test config and run `npx playwright install chromium`.

## Deploy to Vercel

Import the repository into Vercel with the **Next.js** framework preset. Use `npm run build`; there are no environment variables to configure. `next.config.ts` produces a fully static `out/` directory with trailing-slash routes. Next/Image is configured for static export; keep uploaded logo/photos appropriately sized. Fonts are served locally and require no external download at build time.

A separate private Sites preview may be configured in `.openai/hosting.json`; it does not change or prevent the Vercel deployment flow.
