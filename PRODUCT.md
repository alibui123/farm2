# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js (App Router) + Tailwind CSS + Framer Motion / GSAP — inferred from the design brief requiring `next/image`, Framer Motion AnimatePresence, and pinned scroll sections.

## Users

Primary: households seeking daily farm-fresh milk delivered to their door (subscription). Secondary: distributors / gawalay / shops needing bulk supply. Tertiary: prospects requesting a free sample.

## Product Purpose

Al Shukr Dairy sells and delivers pure farm milk (cow and buffalo) with a "Purity Promised" guarantee — farm-direct, no additives, hygienic process, daily doorstep delivery. Success: visitors request a free sample or subscribe via WhatsApp / contact form.

## Positioning

Farm-to-doorstep purity with heritage trust: milk that is simple, fresh, honest, and exactly what nature intended — not a generic farm marketplace.

## Brand Commitments

- Name: Al Shukr Dairy
- Tagline / seal: "Purity Promised"
- Visual language (brief-pinned): black-and-gold luxury shell holding cream/fresh content; organic milk-splash motif; Fraunces display + Inter/DM Sans body
- Primary CTA: Free Sample / WhatsApp
- Tone: luxury, clean, warm, trustworthy — premium heritage dairy

## Evidence & Claims

Numbers and commercial claims in the UI are placeholders (litres/day, households, delivery areas, prices, year founded) until the business supplies real figures. Label as synthetic in code comments.

## Accessibility & Constraints

Honor `prefers-reduced-motion`. Disable heavy pinning on small screens when performance suffers. Tap targets ≥48px. Keyboard focus visible.

## Open Decisions

- Real photography, logo mark asset, WhatsApp number, delivery areas, pricing, founding year — to be swapped via `/data/content.ts`
- Hero motion background: motionsites.ai asset slot (placeholder until provided)
