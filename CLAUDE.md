# jibinjohnson.in — project rules

## Who
Jibin Johnson — Web Developer & SEO Expert, Thiruvananthapuram (Trivandrum), Kerala, India.
Positioning keyword is "SEO expert"; the real job title "Web Developer & SEO Specialist (Team Lead)" stays only on /resume/ and the About career story.
Goals: freelance clients + personal brand. Audience: founders, local businesses, agencies, recruiters.
Contact: WhatsApp +91 7736208172 · jibinjohnsoninfo@gmail.com
Profiles: linkedin.com/in/jibinjohnson · github.com/Jibinjohnson11 · instagram.com/jibineyyyy
Website language: English only (lang="en-IN").

## Source documents (always follow)
- docs/website-content.md — ALL page copy, titles, descriptions, H1s, headings, FAQs, links. Use it exactly.
- docs/design-system.md — colours, fonts, type scale, spacing, motion, SEO strategy.

## Stack (do not change)
Plain HTML5, CSS3, vanilla JavaScript. NO frameworks, NO Tailwind, NO bundler, NO jQuery.
Libraries self-hosted in site/assets/vendor: GSAP + ScrollTrigger + SplitText, Lenis.
Deployed folder: site/ (Netlify, no build command). Dev-only Node scripts in tools/.
Clean URLs: every page is folder/index.html; all internal links end with a slash (/about/).
I want to understand the code: simple, readable, well-commented, no clever tricks.

## Shared HTML
Header, footer, WhatsApp button and script tags live in partials/ and are copied into pages
between <!-- PARTIAL:name --> and <!-- /PARTIAL:name --> markers by tools/sync-partials.mjs.
Never edit inside those markers in a page; edit the partial and run `npm run sync`.
NEVER inject header/footer/nav/content with JavaScript.
New pages are always copied from templates/ (never from another live page).

## Design tokens (site/assets/css/tokens.css)
--ink #0E0E0E (main bg) · --ink-2 #1A1A1A · --line #2D2D2D · --paper #F5F5F5 · --white #FFFFFF
--mute #A1A1A1 (secondary text on dark) · --silver #D9D9D9 · --wine #6D001A (accent) · --wine-2 #8F1D33 (hover)
--rose #B76A79 (small accent text on dark)
Rules: 60/30/10 ink/paper/wine. NEVER wine text on dark backgrounds. NEVER #6B6B6B for text.
Fonts: Boska (display serif) + Switzer (body/UI, variable), self-hosted woff2.
Labels = Switzer 500 uppercase, letter-spacing 0.18em.
Always use tokens, never raw values. Section padding clamp(96px,14vw,192px).
12-col grid, max 1440px, gutters clamp(20px,5vw,80px).
Every section: small label ("02 — Selected work") → serif H2 → content.
Feel: minimal, bold, premium, refined, immersive, unconventional. Avoid template-looking layouts.

## Motion
Signature: a thin burgundy SVG "thread" drawn on scroll that links sections.
Animate transform/opacity only. All text must exist in HTML; JS only animates.
Hidden starting states only under html.js (set by a tiny inline script in <head>).
Hero H1 visible within ~0.6s, no preloader. prefers-reduced-motion: no Lenis, pins or scrubs.
Custom cursor only on (pointer: fine). Scripts loaded with defer. JS total < 90KB gzip.
Page transitions: CSS @view-transition { navigation: auto; } (progressive enhancement).

## SEO (non-negotiable on every page)
- Unique <title> ≤ 60 chars, meta description ≤ 155, self canonical (absolute https://jibinjohnson.in/...
  with trailing slash), robots, OG + Twitter tags, theme-color, JSON-LD. Copy the <head> from templates/.
- One H1, logical H2/H3, semantic landmarks, descriptive alt, width/height on every image,
  <picture> with AVIF + WebP, loading="lazy" except the LCP image (fetchpriority="high").
- Never lazy-load images visible in the first viewport; preload the hero image.
- Person entity @id https://jibinjohnson.in/#person in all schema. No fake reviews or ratings.
- FAQ JSON-LD must match the visible FAQ text exactly.
- One primary keyword per page (listed in docs/website-content.md); never target it on another page.
  Keyword map: Home = "web developer in Kerala" (H1) + "SEO expert in Kerala" (H2) ·
  /services/web-development/ = "website development services in Kerala" · /services/seo/ = "SEO services in Kerala" ·
  /web-developer-trivandrum/ = "web developer in Trivandrum" · /seo-expert-trivandrum/ = "SEO expert in Trivandrum" ·
  /seo-for-healthcare-clinics/ = "SEO for clinics in Kerala" · /seo-for-education-institutes/ = "SEO for training institutes in Kerala" ·
  /web-design-for-startups/ = "website development for startups in Kerala". Each is used exactly in that page's title and H1.
- After adding/removing pages: run `npm run prepare-deploy`.
- Targets: Lighthouse ≥ 95 mobile in all categories, LCP < 2.5s (Core Web Vitals 'good');
  hero content must paint on the first frame without JS, CLS < 0.05, INP < 200ms, WCAG AA.

## Code style
Mobile-first CSS. BEM-like class names (.work-card__title). Comment each section of CSS/JS.
Test at 360, 768, 1024, 1440px.
After each task, give me a short summary: files changed, how to check it, anything I must do by hand.
