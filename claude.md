# Seán Cahill Portfolio

Personal portfolio for seancahill.xyz. Not an agency. Not a sales page.

## Stack

Vanilla HTML, CSS, and JS only. No React, bundlers, npm, or Tailwind. Domain in `CNAME`.

Files: `index.html`, `style.css`, `script.js`, `fonts/`, `sean-portrait.jpg`.

## Positioning

Seán Cahill translates business work into bounded, measurable, governed AI capabilities. Currently at SumUp in Berlin.

Hero: "Work first. Then the model."

Work is stated as capabilities, not case studies. Pitched at a general audience, so Work stays abstract: no client names, vendor or tool names, or metrics in that section. Exciting but mysterious. The detail belongs in the conversation, not on the page. The About stack pills are the one place tool names still belong.

Do not reintroduce: AI operating systems for businesses, booking assistants, competitor intel, intro calls, WhatsApp, or Google Calendar booking.

## Visual system (Hyperstudio)

Dark editorial-tech. Type and hairlines on obsidian. Explicit override of the July 2026 light-sage revert.

| Token | Value | Use |
|---|---|---|
| Obsidian | `#101010` | Page canvas |
| Carbon | `#080808` | Portrait well |
| Chalk | `#f3f3f3` | Headings, primary text |
| Smoke | `#9c9c9c` | Body, captions |
| Graphite | `#212121` | 1px rules |
| Compass Gold | `#6f6759` | Icon strokes only |
| Signal White | `#ffffff` | Primary pill buttons |
| Pulse Green | `#98ff38` | Live status dot only |

Rules:

- Headings stay weight 400. Hierarchy is size and tracking, never bold.
- Display ~63px, letter-spacing -0.69px, line-height 1.05.
- Sections separated by 1px Graphite. No color bands, no shadows, no glass, no sage.
- Card radius 8px max. Only filled primary buttons are fully pill-shaped.
- Content column 1200px.
- Icons: 1.5px stroke, Compass Gold or Chalk. No other icon colors.

**Type:** General Sans 400 (`fonts/general-sans-400.woff2`, Fontshare) and IBM Plex Mono 400 (`fonts/ibm-plex-mono-400.woff2`). Self-hosted. CSP `font-src 'self'`. Do not load Google Fonts. Do not use Plus Jakarta Sans, Inter, or Aeonik.

## Page architecture

Single page: Hero, Work, Approach, About, Write.

- **Work:** four capability cards in the 2x2 frame. Automations, AI chatbots, Websites, Enablement. One mono meta word, one title, one short body each. No `cell__outcome`, no metrics, no named systems, no stack names. Do not expand these back into case studies.
- **Approach:** Start with the work; permissions outside the model; cost per successful task; pilot, evaluate, scale or stop. Then the manifesto line.
- **About:** SumUp path, translator role, stack pills (SQL, Snowflake, dbt, Python, Tableau, Langdock, Cursor, Git). Portrait in About only. No hobby copy.
- **Write:** `seanrcahill@gmail.com` and LinkedIn. No WhatsApp. No calendar.

Nav: Work, Approach, About, Write. Wordmark is type, not the old node-face SVG.

## Motion

Restrained. Quiet scroll reveal on sections. Native smooth anchors. Mobile menu. Respect `prefers-reduced-motion`.

Do not bring back: aurora/particle canvas, noise, vignette, custom cursor, magnetic buttons, marquees, loader curtains, card tilt, contact glow.

## Copy

No em dashes. No "we". No ROI-deck tone. Operator voice. Keep the key lines: work first; the model reasons, the system decides; do we even need AI; launch is not the finish line.

## Portrait

`sean-portrait.jpg`. About only, hairline frame, no overlay gimmicks. Apply EXIF orientation if recropping camera originals.

## Contact

- Email: seanrcahill@gmail.com
- LinkedIn: https://www.linkedin.com/in/seancahill94/

## [Resolved issues / learnings]

- Agency Services / Process / Scenarios plus booking CTAs made the site read as a freelancer template. Capabilities are fine. Multi-step funnels and booking widgets are not.
- Named case studies with tool names and hard metrics (Snowflake, dbt, LangFuse, hours saved) went too deep for a general audience and gave away more than the page needs to. September 2026: replaced by four abstract capability cards. Approach carries the thinking instead.
- Light sage and an earlier dark-gold pass both missed the brief. Live system is Hyperstudio obsidian.
- Stacked Awwwards motion (cursor, aurora, marquee, loader) fought the hairline-on-obsidian language. Strip it.
- n8n / Notion / OpenAI / HTML as identity pills read freelancer. Keep the data and enablement stack.
- Google Fonts are gone. Self-host WOFF2 so CSP can stay `font-src 'self'`.
