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
| Carbon | `#080808` | Portrait well, code fragments |
| Chalk | `#f3f3f3` | Headings, primary text |
| Smoke | `#9c9c9c` | Body, captions |
| Graphite | `#212121` | 1px rules |
| Compass Gold | `#6f6759` | Icon strokes, spine draw, done nodes, code comments |
| Signal White | `#ffffff` | Primary pill buttons |
| Pulse Green | `#98ff38` | Live status: Berlin dot and the active spine node only |

Rules:

- Headings stay weight 400. Hierarchy is size and tracking, never bold.
- Display ~63px, letter-spacing -0.69px, line-height 1.05.
- Sections separated by 1px Graphite. No color bands, no shadows, no glass, no sage.
- Card radius 8px max. Only filled primary buttons are fully pill-shaped.
- Content column 1200px. Left sticky spine is 48px on desktop.
- Icons: 1.5px stroke, Compass Gold or Chalk. No other icon colors.

**Type:** General Sans 400 (`fonts/general-sans-400.woff2`, Fontshare) and IBM Plex Mono 400 (`fonts/ibm-plex-mono-400.woff2`). Self-hosted. CSP `font-src 'self'`. Do not load Google Fonts. Do not use Plus Jakarta Sans, Inter, or Aeonik.

## Page architecture

Single page: Hero, Work, Approach, About, Write. A sticky SVG spine runs the left rail from intake through Write. About is off-spine (the person, not another node).

- **Hero:** "Work first. Then the model." Split on desktop: copy left, map/bound/run/stop preview plus a generic fragment on the right. Ghost CTA is "Work", not "Selected work".
- **Work:** four sequential chapters, not a 2x2 frame. Automations, AI chatbots, Websites, Enablement. Meta, title, body, plus a fake code fragment. No metrics, no named systems, no stack names, no `cell__outcome`. Do not expand these back into case studies. Fragments stay generic (`map()`, `bound()`, `run()`). No vendors.
- **Approach:** vertical pipeline of the four principles, manifesto as the last tick, one shared fragment (`the model reasons` / `the system decides`).
- **About:** SumUp path, translator role, stack pills (SQL, Snowflake, dbt, Python, Tableau, Langdock, Cursor, Git). Portrait in About only. No hobby copy. No spine, no fragments.
- **Write:** final spine node. Mono prompt line plus `seanrcahill@gmail.com` and LinkedIn. No WhatsApp. No calendar.

Nav: Work, Approach, About, Write. Wordmark is type, not the old node-face SVG. 1px scroll progress hairline under the nav border. Not a loader curtain.

## Motion

Cinematic product-demo on Hyperstudio surfaces. Native scroll, no scroll-jacking, no extra libraries. Sticky spine path draws with scroll (`stroke-dashoffset` via SVG attributes from rAF). Active chapter fades its fragment in. 1px caret on the live fragment only. Mobile stacks chapters and draws the path in full. Respect `prefers-reduced-motion`: path complete, fragments visible, no caret, no 85vh pinning.

Do not bring back: aurora/particle canvas, noise, vignette, custom cursor, magnetic buttons, marquees, loader curtains, card tilt, contact glow.

CSP: `script-src 'self'` and `style-src 'self'`. Drive motion with classes and SVG attributes. Do not set `element.style` or inline style attributes.

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
- Stacked Awwwards motion (cursor, aurora, marquee, loader) fought the hairline-on-obsidian language. Strip it. September 2026 cinematic pass uses a sticky node spine and code fragments instead, still without those effects.
- n8n / Notion / OpenAI / HTML as identity pills read freelancer. Keep the data and enablement stack.
- Google Fonts are gone. Self-host WOFF2 so CSP can stay `font-src 'self'`.
