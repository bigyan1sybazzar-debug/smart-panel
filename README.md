# SY Panel Nepal Limited — Website (prefabpanelnepal.com)

A full Next.js 14 (App Router) website with a built-in admin panel, built for
SY Panel Nepal Limited. Content is stored in a simple JSON file database
(`data/db.json`) — no external database or paid services are required to run
it.

## What's included

**Public site**
- Home
- About Us → Chairperson's Message, Our Mission & Vision, Board of Directors,
  Management Committee
- Services → Earthquake Resistant Structure, EPS Sandwich Panel, Korean
  Design House, Prefab House, Sandwich PUF Panel, Wall & Roof Solutions
- Products, Dealership (with application form), Gallery, Catalogue,
  Investor Relations, Notice, Newsletter (signup), Contact (with form)

**Admin panel** — `/admin`
- Password-protected (single admin password, cookie session)
- Dashboard with content counts
- Site Settings (contact info, socials, homepage hero text)
- About Content (chairperson message, mission/vision, board & management
  members)
- Services Content (edit summary/description of each service)
- Products, Gallery, Notices, Investor Relations docs, Catalogue files —
  full add / edit / delete with image or PDF upload
- Contact Messages, Newsletter Subscribers, Dealership Leads — view & delete

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 for the site and http://localhost:3000/admin
for the admin panel.

**Default admin password:** `admin123`

Change it by creating a `.env.local` file in the project root:

```
ADMIN_PASSWORD=your-new-password
```

## Building for production

```bash
npm run build
npm run start
```

## How content storage works

All editable content (site settings, about page content, services text,
products, gallery, notices, investor documents, catalogue files, and form
submissions) lives in `data/db.json`. The admin panel reads and writes to
this file through API routes in `app/api/admin/*`. Uploaded images and PDFs
are saved under `public/uploads/<type>/`.

This is intentionally simple so the site can run anywhere Node.js runs,
without setting up a separate database. If you later want a real database
(Postgres, MySQL, etc.) or cloud file storage (S3, Cloudinary), the
`lib/db.js` helper and the upload route are the two places to swap out.

## Deploying

This project deploys like any standard Next.js app (Vercel, a VPS with
Node.js, Docker, etc.). Two things to keep in mind for production:

1. `data/db.json` and `public/uploads/` need to be on **persistent,
   writable storage**. On platforms with an ephemeral/read-only filesystem
   (e.g. Vercel serverless functions), writes to `data/db.json` will not
   persist between deployments — in that case, move the storage layer to a
   real database and object storage before going live.
2. Set `ADMIN_PASSWORD` as an environment variable in your hosting
   provider's dashboard rather than relying on the default.

## Project structure

```
app/                 Pages and API routes (App Router)
  admin/             Admin panel pages (login + protected dashboard)
  api/               API routes (public forms + admin CRUD)
  about-us/          About Us section pages
  services/          Services overview + dynamic [slug] detail page
  ...                One folder per top-level nav page
components/          Shared UI (Header, Footer, forms, icons, admin widgets)
data/db.json         Content "database" (JSON file)
lib/                 db.js (read/write helpers), auth.js (session helper)
middleware.js        Protects /admin and /api/admin routes
public/uploads/      Uploaded images & documents (created by the app)
```
