# IEEE RVCE — Frontend Redesign (Design Exploration)

A single-page design exploration for the IEEE RVCE website redesign, built as a
real Next.js App Router application and suitable for Vercel review. This is a
**frontend-only** exploration to lock the visual system and page structure — no
backend, CMS, or auth is part of this pass.

The visual system source of truth is `DESIGN.md` (shared separately); this app
implements it.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** with semantic design tokens in `src/app/globals.css`
- **shadcn/ui** (radix-nova) — primitives owned as source and remapped onto the
  IEEE token system (see `--primary`/`--ring`/`--border` in `globals.css`)
- **Motion for React** (`motion`) — one orchestrated hero entrance, the Society
  Explorer shared-layout interaction, and one scroll-linked relationship
- **IBM Plex Sans / Mono** via `next/font` (mono is reserved for functional
  identifiers only — branch code, dates)
- **Lucide** icons, **next/image** for media

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## Architecture

```
src/
  app/            layout.tsx (fonts, metadata), page.tsx, globals.css (tokens)
  components/
    sections/     SiteHeader, HeroSection, SocietyExplorer, ConferenceFeature,
                  AboutSection, EventsSection, ContactCTA, SiteFooter
    ui/           shadcn primitives + MediaFrame, SectionShell, Wordmark,
                  ActionLink, Reveal
  content/        site.ts — single source of truth for all real facts
  lib/            utils.ts (cn), motion.ts (motion presets)
public/media/     real IEEE brand assets + SOURCES.md
```

Each page section is an independently editable component. All colours, spacing,
radius, and type come from CSS variables — no raw hex in TSX.

## Content & media

- All facts (founded 2017, 200+ members, `STB11651`, the five societies, CSITSS
  Nov 20–22 2026) live in `src/content/site.ts`. Nothing is invented to fill space.
- Identity uses the **real IEEE master-brand logo** (`public/media/logos`).
- Photographic slots use an honest, clearly-labelled `MediaFrame` placeholder;
  real event photography drops into the `src` prop later with no layout change.
  See `public/media/SOURCES.md`.

## Accessibility & motion

- The Society Explorer is a real `tablist` with arrow-key roving focus.
- Visible focus rings (IEEE cyan), semantic headings, meaningful alt text.
- All motion respects `prefers-reduced-motion` (global CSS + `useReducedMotion`
  guards); no information depends on animation.

## Deployment

Vercel-ready (static export of `/`). Deploy is intentionally deferred to a later
session.
