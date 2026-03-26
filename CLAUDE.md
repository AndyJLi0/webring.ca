# CLAUDE.md — webring.ca

## Project Overview

A webring for Canadian builders (developers, designers, founders). Hosted on Cloudflare Workers with Hono and KV. Domain: webring.ca.

## Architecture

- **Hono** on Cloudflare Workers — all routing, JSX server-rendering, middleware
- **Cloudflare KV** — member list, health status, ring order. No database (D1).
- **htmx** — included in layout for future interactive features, NOT used in v1
- All data access goes through `src/data.ts` — never call KV directly from routes

## Key Conventions

- All HTML is server-rendered via Hono JSX (`.tsx` files). No client-side hydration.
- CSS is inline in the Layout component. No external CSS files, no Tailwind.
- Space Grotesk + Space Mono loaded via Google Fonts. No other font families.
- Light/dark mode via `prefers-color-scheme`.
- Keep it simple. No over-engineering. This is a small community project.

## Before making changes, read:

- `docs/hono.md` — Hono reference for CF Workers, JSX, routing, middleware, bindings
- `docs/htmx.md` — htmx reference (for when we build v2 interactive features)

## Data Flow

1. `members.json` in repo root is the canonical member list
2. `scripts/seed.ts` syncs `members.json` → KV
3. Routes read from KV via `src/data.ts`
4. Health check cron writes status to KV via `src/data.ts`
5. Shuffle cron writes ring order to KV via `src/data.ts`

## KV Keys

- `members` — JSON array of Member objects
- `health:{slug}` — health status per member
- `ring-order` — shuffled array of slugs

## Do NOT

- Add D1 or any database
- Add React, Vue, Svelte, or any client-side framework
- Add Tailwind or any CSS framework
- Add htmx interactions (v2 feature — just keep the script tag in layout)
- Add admin dashboard, auth, or email notifications
- Over-engineer. If it can be done in 10 lines, do it in 10 lines.

## Design Context

### Users
Canadian builders — developers, designers, and founders with personal sites. Two equal jobs: (1) visitors discovering new Canadian creators by navigating the ring, and (2) builders evaluating whether to join. Both should feel this is a quality community worth being part of.

### Brand Personality
**Proud, modern, clean.** Canadian identity without being kitschy. Confident but not corporate. The site itself should feel like it was made by a builder — intentional, well-crafted, no filler.

### Aesthetic Direction
- Modern and clean with subtle warmth — not sterile
- Restrained use of Canadian identity (maple leaf as accent, not theme)
- Typography-driven hierarchy; let whitespace and type do the work
- No SaaS patterns: no hero sections, gradient CTAs, or sales copy
- No retro-nostalgic: no pixel art, marquees, or GeoCities callbacks
- Both light and dark mode, auto-switching via `prefers-color-scheme`, each designed intentionally

### Design Principles
1. **Substance over decoration** — Every element earns its place. No ornament for ornament's sake.
2. **Proud, not loud** — Canadian identity is present but understated. Confidence through craft, not volume.
3. **Member sites are the product** — The webring site is a frame, not the painting. Design serves discovery.
4. **Built by a builder** — The site should feel handmade and intentional, not generated or templated.
5. **Respect the visitor's time** — Fast to load, fast to understand, fast to navigate.