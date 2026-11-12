# Voltek Solar — Next.js website

A Next.js 15 (App Router, TypeScript) build of the designs in `Voltek Solar  design/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | Design file |
| --- | --- |
| `/` | Homepage.dc.html |
| `/battery-storage` | Battery Storage.dc.html |
| `/projects` (supports `?town=canterbury`) | Projects.dc.html |
| `/areas/[town]` (10 towns, pre-rendered) | Town Page.dc.html |
| `/book-a-survey` (supports `?service=battery`, `?town=deal`) | Book a Survey.dc.html |

## Before launch — replace sample content

Everything marked **SAMPLE** is placeholder content:

- `lib/site.ts` — phone, WhatsApp, email, address, hours, company number, domain, Google rating and review count, **customer reviews**.
- `lib/projects.ts` — project list (towns, sizes, dates, photos).
- `app/page.tsx` — impact stats (systems installed, savings, CO₂, satisfaction) and hero saving figure.
- `app/battery-storage/page.tsx` — battery prices and products.
- `app/areas/[town]/page.tsx` — local install counts and sample reviews.

Reviews must be replaced with verified Google reviews before going live.

## Forms

The contact form and survey wizard currently show a success state only. Connect them to your email/CRM (e.g. a Next.js route handler or Formspree) before launch.

## Images

Photos live in `public/images/`. Credits are listed in the site footer (`CREDITS` in `lib/site.ts`):
two CC-licensed photos (Albert Bridge, CC BY-SA 2.0; 1010 Climate Action, CC BY 2.0) and the rest from Unsplash.
Swap in Voltek's own install photos by replacing files with the same names.
