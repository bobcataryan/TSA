# Elkins TSA

A searchable final member list, membership links, competitive events directory, deadline detail pages, resources, and a blank photo gallery.

## Run

```sh
npm ci
npm run dev
```

`npm run build` exports the site to `out/`. `npm start` previews that export. Deploy with Vercel’s Next.js preset; no environment variables or database are required.

## Edit content

- **Final member list:** `src/data/members.ts` contains the 163 supplied names. The home page sorts them alphabetically and filters as visitors type, without sending searches to a server.
- **Calendar dates:** `src/data/calendar.ts`. Add entries with a title, `YYYY-MM-DD` date in Central Time, category, and optional time, description, and link. The calendar opens to the current month and supports month navigation and day selection.
- **Membership links:** `src/data/membership.ts` contains dues and Parent-Student Agreement actions.
- **Deadline pages:** `src/data/deadlines.ts` contains instructions and related links, keyed by calendar event ID. Deadline dates and titles come from `src/data/calendar.ts`; link each calendar entry to `/deadlines/<event-id>/`. Add the confirmed change/drop process here when available.
- **Competitive events:** `src/data/events.ts` contains the 42 supplied event names and people-per-team limits. Cards show exact sizes or ranges; the team-size filter includes any event whose range allows the selected number of people.
- **External links:** `src/data/links.ts` contains dues, agreement, and official TSA links.
- **Resources:** `/resources/` lists past meeting presentations, other files, and existing chapter links. `src/data/resources.ts` supports curated file/link entries and overrides for auto-indexed documents. The agreement PDF is linked from the membership checklist and deadline page; the Events page links to its presentation. PDF, PowerPoint, and Word files in `public/documents/` are indexed automatically; include `meeting` in meeting presentation filenames or set their category to `Meetings` in curated entries.
- **Photo Gallery:** `/photogallery/` is intentionally blank apart from its heading until photos are provided.

## Add uploads

Put the TSA logo in `public/images/` with `tsa` or `logo` in its filename, and PDFs in `public/documents/`. Run `npm run assets:sync` or restart the development server. Production builds also index assets. Original filenames are preserved and URL-encoded. The parent agreement is recognized from its filename and listed under chapter files. Verify and customize document titles/descriptions in `src/data/resources.ts` when needed.

### Meeting files

Drop past meeting files into **`public/documents/meetings/`**. Subfolders are supported. Every supported file in that folder is listed under **Past meeting presentations** on Resources, regardless of its filename, with an open link and a **Download** button. Supported types: PDF, PowerPoint (`.ppt`, `.pptx`, `.pps`, `.ppsx`), Word, Excel, CSV, TXT, and ZIP. Use descriptive filenames for readable titles.

Run `npm run assets:sync` to refresh the local index, or `npm run build` to index and export the site together. Publish the new build to make uploads available on the hosted site; copying a file locally does not update the live site by itself. This is a local upload folder, not an in-browser uploader. The Parent-Student Agreement PDF is served directly from `public/documents/`, and the original Google Drive folder and turn-in form remain linked on Resources.

## Verify

```sh
npm run lint
npm run build
npm run test:e2e
```

Browser tests use local Google Chrome and the development server on port 3000. They cover the member search, membership links, calendar, Events filters, removed routes, responsive layout, and accessibility.

The earlier long homepage, announcement/about/sign-up pages, global search, and footer have been removed. Source history preserves the previous version.
