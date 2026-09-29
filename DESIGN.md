# Design System — Al Shukr Dairy

<!-- impeccable:design-schema 1 -->
<!-- Ground truth from the shipped homepage, not aspiration. -->

## World

Black-and-gold luxury shell holding cream, human farm content. Dark sections are cinematic (ink + film grain + gold hairlines). Light sections are pure cream with soft shadows. Signature motif: organic milk-splash SVG blobs as dividers, decor, and image masks.

## Palette

| Token | Hex / value | Role |
|---|---|---|
| `--ink` | `#0A0A0A` | Primary dark ground |
| `--ink-2` | `#141210` | Raised dark cards |
| `--gold` | `#C9A24B` | Accent, eyebrows, borders |
| `--gold-light` | `#E8C877` | Highlights |
| `--gold-deep` | `#9A7B2F` | Deep gold |
| `--gold-gradient` | `135deg #9A7B2F → #E8C877 → #C9A24B → #F3DC9B` | Primary CTA fill; occasional display emphasis |
| `--cream` | `#F6F1E7` | Light section ground |
| `--cream-2` | `#EDE5D3` | Secondary light / splash |
| `--milk` | `#FFFFFF` | Light text on dark |
| `--silver` | `#C0C0C0` | Secondary text on dark |
| `--text-dark` | `#1B1712` | Body on cream |

## Typography

- **Display:** Fraunces 600–800, tracking `-0.02em`. Occasional single italic gold-gradient word for emphasis.
- **Body:** DM Sans 400–500, ~17px, line-height 1.7.
- **Eyebrow:** 12px uppercase, tracking `0.25em`, gold, with 32px gold hairline before the label.
- **Scale (desktop / mobile):** H1 ~88–96 / 44, H2 64 / 34, H3 28 / 22 (fluid clamp on H1).

## Shape & chrome

- Cards `24px`, image frames `32px`, buttons/chips `999px`, contact shell `40px`.
- Dark cards: 1px gold at ~30% opacity. Cream cards: soft warm shadow.
- Film grain overlay at 3% on `.film-grain` dark sections.
- Container max-width `1280px`; padding 64 / 24; section Y 120 / 72.

## Components

- **Primary button:** gold gradient, ink text, pill, magnetic hover (desktop), arrow slides right, soft gold glow.
- **Secondary:** transparent + gold border; fills gold on hover.
- **Navbar:** 84px transparent → 68px blurred ink after 80px scroll + gold hairline; mobile full-screen overlay menu.
- **Product cards:** ink-2, tilt-toward-cursor image, lift on hover.
- **Audience cards:** full-bleed photo + gradient; gold circular arrow rotates 45° on hover.
- **Floating:** WhatsApp FAB (pulse), top scroll-progress bar, custom gold cursor (fine pointer only).

## Motion

- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`. Reveals 0.6–1.0s; hovers ~0.25s.
- Section enter: opacity + 40px rise. Hero lines: mask slide-up.
- Process: GSAP ScrollTrigger pin (~4 viewports) desktop only; stacked steps on mobile.
- Honor `prefers-reduced-motion`.

## Content authority

All copy, prices, contact, and image URLs live in `src/data/content.ts`. Commercial numbers are placeholders until confirmed.

## Surfaces

- Homepage (`/`): Persuade — primary action is Free Sample / WhatsApp.
