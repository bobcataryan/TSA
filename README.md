# Elkins TSA

A chapter dashboard, competitive events directory, deadline detail pages, resources, and a blank photo gallery.

## Run

```sh
npm ci
npm run dev
```

`npm run build` exports the site to `out/`. `npm start` previews that export. Deploy with Vercel’s Next.js preset; no environment variables or database are required.

## Edit content

- **Calendar dates:** `src/data/calendar.ts`. Add entries with a title, `YYYY-MM-DD` date in Central Time, category, and optional time, description, and link. The calendar opens to the current month and supports month navigation and day selection. The parent information meeting, membership deadline, and officer form sign-up deadline are prefilled.
- **Membership checklist:** `src/data/membership.ts` contains the four steps and due date. No individual completion status is recorded or implied.
- **Deadline pages:** `src/data/deadlines.ts` contains instructions and related links, keyed by calendar event ID. Deadline dates and titles come from `src/data/calendar.ts`; link each calendar entry to `/deadlines/<event-id>/`. Add the officer form link and confirmed change/drop process here when available.
- **Competitive events:** `src/data/events.ts`. Existing examples remain labeled until chapter offerings are confirmed.
- **Forms and Google Sheet:** `src/data/links.ts`. The Events page embeds the provided sheet’s `/preview` URL and always offers a direct Google Sheets link. It does not scrape, copy, or store spreadsheet data, and the embed respects Google’s sharing permissions.
- **Resources:** `/resources/` lists past meeting presentations, other files, and existing chapter links. `src/data/resources.ts` supports curated file/link entries and overrides for auto-indexed documents. Parent agreements also attach to the checklist; meeting files also attach to the Events information guide. PDF, PowerPoint, and Word files in `public/documents/` are indexed automatically; include `meeting` in meeting presentation filenames or set their category to `Meetings` in curated entries.
- **Photo Gallery:** `/photogallery/` is intentionally blank apart from its heading until photos are provided.

## Add uploads

Put the TSA logo in `public/images/` with `tsa` or `logo` in its filename, and PDFs in `public/documents/`. Run `npm run assets:sync` or restart the development server. Production builds also index assets. Original filenames are preserved and URL-encoded. The parent letter is recognized from its filename and connected automatically. Verify and customize document titles/descriptions in `src/data/resources.ts` when needed.

## Verify

```sh
npm run lint
npm run build
npm run test:e2e
```

Browser tests use local Google Chrome and the development server on port 3000. They cover the calendar, checklist links, Events filters, embed URL, removed routes, responsive layout, and accessibility. The Google Sheet itself is a third-party document; its permissions remain controlled by its owner.

The earlier long homepage, announcement/about/sign-up pages, global search, and footer have been removed. Source history preserves the previous version.
