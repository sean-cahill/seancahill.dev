# Sean Cahill Portfolio - Project Guidelines

## Project Overview
A premium, Awwwards-tier portfolio website for Sean Cahill, an Agentic Engineer. 

## Technology Stack
- **Vanilla HTML/CSS/JS only**. 
- No React, no Vue, no bundlers, no npm, no Tailwind. Keep it raw and dependency-free.
- Everything lives in `index.html`, `style.css`, and `script.js`.

## Aesthetic & Design Rules
- **Typography:** JetBrains Mono (for code/technical feel) and Plus Jakarta Sans (display). No Arial, Roboto, or Inter.
- **Vibe:** "Outside the box", "computer-y", interactive, addictive, and subtly psychedelic without losing premium elegance. 
- **Colors:** Dark theme with gold/tan accents (`#d3b994`), noise overlays, dark gradients. No generic "AI slop" blue/purple neon gradients.
- **Interactivity:** Deeply interactive. Custom geometric cursors, 3D tilt tracking on cards, magnetic buttons, particle network backgrounds. "Make it feel like a game while they're on the website."
- **Strict Constraints:**
  - DO NOT use emojis.
  - Adhere strictly to the Web Interface Guidelines (use curly quotes, `aria-hidden="true"` on decorative icons, `text-wrap: balance` on headings, `:focus-visible` for accessibility, etc.).

## Content Details
- **Role:** Practical AI Systems Builder / Agentic Engineer
- **Services:** Reporting systems, ops automation, internal copilots, workflow design, and lightweight AI tools for small teams.
- **Location Base:** Berlin, Germany (originally from Dublin).
- **Hobbies:** Plays drums in "Whirlpool", produces electronic music in Ableton as "Glan Suas", hiking, cooking, permaculture, balcony veg growing, building projects.
- **Contact:** seanrcahill@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/seancahill94/
- **Portrait:** Taken at Snowdonia Summit.

## Current "Next Level" Goal
To make the site feel unmistakably premium and memorable through restraint: sharp copy, confident hierarchy, and subtle interaction that feels designed rather than flashy.

---

# Living Memory & Self-Learning Protocol

**CRITICAL INSTRUCTION FOR ALL AGENTS:** 
At the end of every significant task, feature implementation, or bug fix, you MUST update this `claude.md` file. Do not repeat past mistakes. Maintain a continuous loop of learning.

## [Active Context]
- **Current Phase:** Finalizing the portfolio site polish and preparing for the business launch.
- **Key Focus:** Moving away from generic "AI" aesthetics towards a high-end, editorial, "matte over glass" design system.

## [Design System Rules]
- **Borders & Backgrounds:** Use thin, sharp borders (`rgba(255, 255, 255, 0.08)`) and flat matte backgrounds (`#0a0a0a` or `rgba(20, 20, 20, 0.4)`) instead of heavy glassmorphism or bright glows.
- **Typography:** Prevent clipping on reveal animations by adding slight padding/negative margins (e.g., `padding-bottom: 0.15em; margin-bottom: -0.15em;`).
- **Logos/Icons:** Use crisp, `currentColor` inline SVGs rather than text-based logos or generic emojis.

## [Resolved Issues / Learnings]
- **Issue:** The 'g' in the hero title was being cut off by `overflow: hidden`.
  - **Fix:** Added `padding-bottom` and negative `margin-bottom` to `.title-line`.
- **Issue:** The custom cursor dot felt weird when it disappeared.
  - **Fix:** Removed `cursor: none` to keep the system cursor visible, and retained only the smooth, trailing gold ring for a premium interactive enhancement.
- **Issue:** The custom cursor ring initialized at `0,0` (top-left) and flew in awkwardly.
  - **Fix:** Set initial opacity to 0 and instantly snap coordinates on the first `mousemove` event before fading in.
- **Issue:** The site copy sounded too broad and AI-generated.
  - **Fix:** Reframe the messaging around practical AI systems for small teams, with concrete language about reporting, ops, internal questions, and manual work.
- **Issue:** Too many simultaneous motion treatments made the page feel more like a demo than a premium portfolio.
  - **Fix:** Keep one elegant highlight at a time, reduce blur and hover intensity, and prefer quieter motion over stacked looping effects.

## [Security (static site, Apr 2026)]
- **Skill:** Installed ecosystem skill `security-review` from [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) at `.agents/skills/security-review/` (use find-skills / `npx skills add` for updates). Reviewed checklist items that apply to this repo (no backend, no auth, no user input endpoints).
- **Secrets:** No API keys, tokens, or `.env` in tracked HTML/CSS/JS; keep it that way on a public GitHub repo.
- **XSS / DOM:** Footer year updated via `textContent` instead of `innerHTML` to avoid HTML sinks; only trusted literals in DOM.
- **Third parties:** Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`); tradeoff is Google as a dependency (privacy). Optional future hardening: self-host WOFF2 and tighten CSP further.
- **External tabs:** All `target="_blank"` links use `rel="noopener noreferrer"`.
- **Meta hardening:** `Content-Security-Policy` (allows self, Google font CSS/static, inline `style` attributes used in markup), `Referrer-Policy` via `meta name="referrer"`, `Permissions-Policy` for sensitive APIs, `upgrade-insecure-requests`.
- **Hosting:** GitHub Pages serves HTTPS but does not let you set custom security headers (e.g. `Strict-Transport-Security`, `X-Content-Type-Options`) in-repo. For full header control (HSTS, `X-Frame-Options` / `frame-ancestors`, report-uri), use a host or edge that supports header config (Netlify `_headers`, Cloudflare, Vercel `vercel.json`, etc.) or a reverse proxy.
- **Exposure:** Public `mailto:` and WhatsApp links are intentional; expect crawlers and spam risk like any public contact.
- **Private working files:** `Business Docs/` and `LAUNCH_TODO.md` stay local via `.gitignore`. History was scrubbed with `git filter-repo --invert-paths` (install: `brew install git-filter-repo`). The tool removes the `origin` remote and re-checks out HEAD, which can delete paths no longer in history from the working tree; restore from `git show origin/<branch>:path` before `git push --force` if needed. Force-pushed branches rewrite GitHub; forks and old clones may still hold pre-rewrite objects until recloned.