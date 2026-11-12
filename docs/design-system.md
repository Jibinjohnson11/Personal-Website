# jibinjohnson.in — Design System & SEO Strategy

**Plain HTML · CSS · JS · English only**

---

# PART 1 — Brand and design system

The look is **an editorial, cinematic dark site: a high-contrast serif against near-black, with one burgundy thread that runs through every section.** That thread is the signature idea, and it is what makes the site feel continuous instead of a stack of templates.

Feel: **minimal, bold, premium, refined, immersive, unconventional.**

- **Refined:** premium typography, clean layouts, intentional spacing
- **Immersive:** cinematic scroll animation and seamless section transitions
- **Unconventional:** layouts that avoid the typical portfolio template

## 1. Colour tokens (contrast-checked)

Two rules come from the WCAG contrast check:

- **Burgundy is never used for text on dark backgrounds.** At 1.5:1, it's unreadable.
- **Stone #6B6B6B is never used for body text on black.** At 3.6:1, it fails.

| Token | Hex | Use | Contrast note |
| --- | --- | --- | --- |
| `--ink` | #0E0E0E (Charcoal) | Main page background (60%) | Softer than pure #000 on OLED screens |
| `--ink-2` | #1A1A1A (Graphite) | Cards, raised surfaces | |
| `--line` | #2D2D2D (Slate) | Borders, dividers | Decorative only |
| `--paper` | #F5F5F5 (Ivory) | Light sections; main text on dark | 17.7:1 on Charcoal |
| `--white` | #FFFFFF | Headlines on dark | 19.3:1 on Charcoal |
| `--mute` | #A1A1A1 | Secondary text on dark | ~7.4:1 (replaces Stone for text) |
| `--silver` | #D9D9D9 | Light-section surfaces | |
| `--wine` | #6D001A (Burgundy) | Accent fills, buttons, the thread, text on light sections | White on it 12.6:1; on Ivory 11.6:1 |
| `--wine-2` | #8F1D33 (Deep Rose) | Hover state of wine | |
| `--rose` | #B76A79 (Rose Ash) | Small accent text and links on dark, focus ring | 4.9:1 on Charcoal (passes AA) |

**Usage ratio, 60 / 30 / 10:**

- 60% ink: most sections are dark
- 30% paper/silver: 2–3 Ivory sections (e.g. Selected work) so the page breathes
- 10% wine: buttons, the thread, the final CTA section and small highlights

The background crossfades between ink and paper as you scroll from one section to the next.

## 2. Typography

| Role | Font | Source | Why |
| --- | --- | --- | --- |
| Display: hero, H1, H2, big numbers | **Boska** (Medium, Medium Italic, Bold) | Fontshare (Indian Type Foundry), free for commercial use | High-contrast Didone with calligraphic touches; premium and editorial at large sizes. The italic is the accent voice ("built to *rank*"). |
| Body, UI, labels, buttons | **Switzer** variable (300–700) | Fontshare, free for commercial use | Swiss neo-grotesque; very clean and readable; rarely seen on AI-generated sites |

**Loading rules:**

- Self-host `.woff2` files in `/assets/fonts/`.
- Preload only the two files used above the fold: `Boska-Medium.woff2` and `Switzer-Variable.woff2`.
- `font-display: swap`, plus metric-matched fallback faces (`size-adjust`, `ascent-override`) so the swap causes no layout shift.

### Type scale (fluid, 360px → 1440px)

| Token | Size | Font / weight | Line height / tracking | Use |
| --- | --- | --- | --- | --- |
| `--fs-hero` | clamp(3.5rem, 12vw, 11rem) | Boska 500 | 0.9 / -0.03em | Hero name |
| `--fs-h1` | clamp(2.75rem, 7vw, 6rem) | Boska 500 | 0.95 / -0.02em | Page H1s |
| `--fs-h2` | clamp(2rem, 4.5vw, 4rem) | Boska 500 | 1.0 / -0.015em | Section titles |
| `--fs-h3` | clamp(1.375rem, 2vw, 1.75rem) | Switzer 500 | 1.2 | Card titles |
| `--fs-lead` | clamp(1.125rem, 1.6vw, 1.5rem) | Switzer 300 | 1.45 | Intro paragraphs |
| `--fs-body` | 1.0625rem (17px) | Switzer 400 | 1.65, max 68ch | Body copy |
| `--fs-label` | 0.75rem | Switzer 500, uppercase | 0.18em tracking | Eyebrows, tags, meta |

## 3. Space, grid and breathing room

- **Spacing scale (8px base):** 4, 8, 16, 24, 32, 48, 64, 96, 128, 192
- **Section padding:** `clamp(96px, 14vw, 192px)` top and bottom. Generous emptiness is what makes it feel premium.
- **Grid:** 12 columns, max width 1440px, side gutters `clamp(20px, 5vw, 80px)`, column gap `clamp(16px, 2vw, 32px)`
- **Break the grid on purpose:** headlines start at column 1, body text sits in columns 7–12, images bleed off one edge, numbers hang in the margin.
- **Section rhythm (the consistency):** every section opens the same way: a small label (`02 — Selected work`), then a large serif H2, then content. The layouts in between are what make the site unconventional.
- **Breakpoints:** 360 (small phone) · 768 (tablet) · 1024 (laptop: pinned/horizontal effects start here) · 1440 (desktop)

## 4. Components

| Component | Style |
| --- | --- |
| Primary button | Wine pill, white text, Switzer 500, padding 16px 28px; hover: wine-2 + slight magnetic pull |
| Ghost button | 1px paper border, transparent; hover: fills paper with ink text |
| Text link | Paper text; underline draws left to right on hover (transform scaleX) |
| Card | ink-2 background, 1px line border, no heavy shadows; image zooms 1.04 on hover |
| Tag | Label style, 1px line border, pill shape |
| FAQ | `<details>`/`<summary>`, serif question, + rotates to × when open |
| Section label | `01 — Approach`: label style in mute, a thin wine line before it |
| Form fields | Bottom border only, label above, rose focus line, clear error text |

## 5. Motion system

| Moment | Treatment |
| --- | --- |
| **Signature** | **The burgundy thread**: one thin SVG line that draws itself (stroke-dashoffset scrubbed by ScrollTrigger) down the full page, linking each section to the next |
| Hero | Name reveals line by line from a mask (≈0.9s total, ease `expo.out`, must be readable within 0.6s); then the thread starts |
| Manifesto | Large paragraph whose words brighten from `--mute` to `--paper` as you scroll |
| Services | Pinned stacked cards that slide over each other (desktop) |
| Work | Pinned horizontal gallery on desktop; normal vertical list on mobile |
| Section joins | Background crossfades ink ↔ ivory, scrubbed over the end of a section |
| Micro | Magnetic CTA buttons; custom cursor that grows over links and shows "View" over work cards (mouse only); underline draw on links |
| Page change | CSS cross-document View Transitions: a short burgundy fade between pages (Chrome, Edge, Safari 18.2+; other browsers simply load normally) |

**Libraries:** GSAP + ScrollTrigger + SplitText, and Lenis, all self-hosted in `/assets/vendor/`.

**Easing tokens:** `--ease-out: cubic-bezier(.16,1,.3,1)` (expo-like) · `--ease-in-out: cubic-bezier(.65,0,.35,1)` · durations 0.3s (micro), 0.6s (reveal), 0.9s (hero)

### Motion rules that protect SEO and Core Web Vitals

- All text exists in the HTML at load. JavaScript only animates it, never injects it.
- Hidden-before-reveal styles apply only under `html.js`, so with no JavaScript everything is visible.
- The hero H1 is the LCP element: it must be visible within about 0.6s. There's no preloader.
- Animate only `transform` and `opacity` (never width, height, top or margin), so there's no layout shift.
- `prefers-reduced-motion: reduce`: Lenis, pinning and scrubbing are off; simple fades only.
- All scripts load with `defer`. Total JavaScript stays under 90KB gzipped.
- The custom cursor runs only on `(pointer: fine)` devices.

---

# PART 2 — SEO strategy

**Each keyword group gets exactly one page, so your own pages never compete with each other.** The two broad Kerala role keywords ("web developer in Kerala", "SEO expert in Kerala") go on the home page, the Kerala service keywords on the two service hubs, Trivandrum keywords on two location pages, and your real healthcare and education experience becomes niche landing pages.

## 6. What the competition looks like

Searches like "freelance web developer Kerala" and "freelance SEO expert Trivandrum" mostly show three kinds of result:

- **Marketplace listings:** Twine, Contra, Truelancer, IndiaMART
- **Agency pages:** e.g. IRPR Agency, Turquoic
- **A few individual freelancers:** mostly on Blogspot or older WordPress sites

**The opening:** very few individual freelancers have a fast, well-structured site with schema and real case studies. That's realistic to win on "freelance … Trivandrum" terms. "SEO services in Kerala" is dominated by agencies and will take longer: it gets a strong page now and is built up with blog posts and links over time.

**Before launch:** check each phrase's search volume in Google Keyword Planner (free with a Google Ads account) and adjust priorities.

## 7. Keyword → page map

| Page | URL | Primary keyword | Secondary keywords |
| --- | --- | --- | --- |
| Home | `/` | web developer in Kerala (H1) + SEO expert in Kerala (H2) | Jibin Johnson (brand), freelance web developer Kerala |
| Services overview | `/services/` | web development and SEO services | — |
| Web development hub | `/services/web-development/` | website development services in Kerala | web development in Kerala, freelance website developer Kerala |
| SEO hub | `/services/seo/` | SEO services in Kerala | freelance SEO Kerala, SEO audit Kerala |
| Trivandrum web page | `/web-developer-trivandrum/` | web developer in Trivandrum | freelance web developer Trivandrum, website development services Trivandrum, Thiruvananthapuram |
| Trivandrum SEO page | `/seo-expert-trivandrum/` | SEO expert in Trivandrum | SEO services in Trivandrum, freelance SEO expert Trivandrum, SEO expert in Thiruvananthapuram |
| Healthcare niche | `/seo-for-healthcare-clinics/` | SEO for clinics in Kerala | dermatology clinic SEO, healthcare SEO Kerala |
| Education niche | `/seo-for-education-institutes/` | SEO for training institutes in Kerala | course website SEO, education SEO |
| Startups niche | `/web-design-for-startups/` | website development for startups in Kerala | landing page development, startup website development |
| Work | `/work/` + `/work/<project>/` | project names + "case study" | AQ Air website, healthcare SEO case study |
| Blog | `/blog/<slug>/` | long-tail questions | e.g. "how much does a website cost in Kerala" |

**Avoid doorway pages.** The Trivandrum pages must not be the Kerala pages with the city name swapped in. They need unique content: areas served (Technopark, Kazhakoottam, Pattom, Kowdiar, Vazhuthacaud and others), in-person meetings, local examples and a local FAQ. Use both spellings, "Trivandrum" and "Thiruvananthapuram", naturally.

### Keywords on each page: where they go

1. `<title>`: the strongest on-page signal
2. Meta description: drives clicks
3. The single `<h1>`
4. The first paragraph (within the first ~100 words)
5. At least one H2, close to the keyword
6. Image file names and alt text, used honestly
7. Anchor text of internal links **pointing to** the page

**Don'ts:**

- Don't use `<meta name="keywords">`; Google ignores it.
- Don't stuff the keyword in: the exact phrase about 2–3 times per page is enough, with natural variations after that.
- Don't hide text.
- Don't put another page's primary keyword in your title or H1.

## 8. Site structure

```
jibinjohnson.in/
├─ /                              Home
├─ /about/
├─ /services/                     Overview of both services
│  ├─ /services/web-development/  Kerala hub
│  └─ /services/seo/              Kerala hub
├─ /web-developer-trivandrum/     Location page
├─ /seo-expert-trivandrum/    Location page
├─ /seo-for-healthcare-clinics/   Niche landing page
├─ /seo-for-education-institutes/ Niche landing page
├─ /web-design-for-startups/      Niche landing page
├─ /work/
│  ├─ /work/aq-air/
│  ├─ /work/serene-derma-seo/
│  ├─ /work/blackbox-learning-seo/
│  └─ /work/seo-dashboard/
├─ /blog/  →  /blog/<slug>/
├─ /resume/                       HTML resume + PDF download
├─ /contact/
├─ /thank-you/                    noindex
├─ /privacy/
└─ /404.html                      noindex
```

**Internal linking rules:**

- Every service page links to 2 related case studies and the matching location or hub page.
- Every case study links back to its service page.
- Every blog post links to one service page, using the keyword as anchor text where it reads naturally.
- Home links to both hubs and both Trivandrum pages, using their keywords as anchor text.
- Breadcrumbs on every page below Home (visible + BreadcrumbList schema).

## 9. Schema (JSON-LD)

Use one `Person` entity with `@id: https://jibinjohnson.in/#person` and reference it everywhere, so Google and AI search tools learn one clear entity.

| Page type | Schema |
| --- | --- |
| All pages | `WebSite` + `Person` (name, jobTitle, image, url, email, address locality Thiruvananthapuram, region Kerala, country IN, `sameAs` LinkedIn/GitHub/Instagram, `knowsAbout`, `alumniOf` Edure + University of Madras) + `BreadcrumbList` |
| Home, Trivandrum pages | `ProfessionalService` (provider = #person, `areaServed`: Thiruvananthapuram, Kerala, India; `telephone`; no `priceRange`: the site shows no prices) |
| Service and niche pages | `Service` (provider = #person, `serviceType`, `areaServed`) + `FAQPage` |
| Work index | `CollectionPage` |
| Case studies | `Article` (author = #person) |
| Blog posts | `BlogPosting` (author, datePublished, dateModified, image) |
| About, Resume | `ProfilePage` with `mainEntity` = #person |
| Contact | `ContactPage` |

**Rules:**

- Never add `AggregateRating` or reviews that aren't real and visible on the page.
- FAQ schema text must match the visible FAQ exactly.
- Google now shows FAQ rich results only for a few authoritative sites, so keep FAQs for users and AI answers, not for stars in results.
- Validate with Google's Rich Results Test and validator.schema.org.

## 10. Technical SEO checklist

- [ ] HTTPS; 301 redirect `www` → non-www; one trailing-slash style (`/about/`)
- [ ] Unique `<title>` (≤ 60 characters) and meta description (≤ 155) per page; absolute self-referencing canonical
- [ ] Exactly one H1 per page; logical H2/H3 order; semantic `header` / `nav` / `main` / `article` / `footer`
- [ ] `sitemap.xml` generated by `tools/generate-sitemap.mjs` (no noindex pages) + `robots.txt` pointing to it; submitted to Google Search Console and Bing Webmaster Tools
- [ ] Open Graph + Twitter tags; a unique 1200×630 share image per main page
- [ ] Images: `<picture>` with AVIF + WebP from `tools/optimize-images.mjs`, explicit width/height, descriptive alt, `loading="lazy"` everywhere except the LCP image (`fetchpriority="high"`)
- [ ] Core Web Vitals targets: LCP < 2.0s, INP < 200ms, CLS < 0.05; Lighthouse ≥ 95 in all four categories on mobile
- [ ] Accessibility: skip link, visible focus states, 44px touch targets, `aria-label` on icon buttons, contrast as in section 1
- [ ] Header, footer and navigation in real HTML on every page (never injected with JavaScript)
- [ ] Custom 404 linking to Home, Services, Work and Contact
- [ ] Netlify `_headers`: 1-year immutable cache on everything in /assets/ (safe because `npm run prepare-deploy` adds a content hash `?v=` to every asset link), security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] Favicon set + `site.webmanifest`; theme-color #0E0E0E
- [ ] GA4 loaded after the first user interaction, so it doesn't hurt performance; conversion events: form_submit, whatsapp_click, resume_download
- [ ] `llms.txt` with a plain summary of who you are and your services, for AI search tools
- [ ] `npm run prepare-deploy` shows 0 errors before every push

## 11. Launch and off-page plan

**Launch week**

- Verify the domain in **Google Search Console** and submit `sitemap.xml`; import into **Bing Webmaster Tools**.
- Request indexing for Home, both hubs and both Trivandrum pages.
- **Google Business Profile** as a service-area business: category "Website designer", secondary "Internet marketing service", service areas Thiruvananthapuram + Kerala, address hidden.
- Use the same name, phone and website everywhere.
- Update LinkedIn (headline "Web Developer & SEO Expert in Kerala"), GitHub and Instagram with the site link.

**Months 1–3**

| Type | Where | Target |
| --- | --- | --- |
| Freelancer profiles | Contra, Twine, Clutch, GoodFirms, DesignRush, Upwork | 6 profiles linking to the site |
| Local citations | Justdial, Sulekha, IndiaMART, Bing Places, Apple Business Connect | 5 consistent listings |
| Design galleries | CSS Design Awards, Awwwards, Godly, Lapa Ninja, Siteinspire | Submit once the site is polished |
| Client credits | "Website by Jibin Johnson" footer link on client sites | With permission |
| Developer communities | Dev.to / Hashnode with canonical to your blog; helpful answers on r/SEO, r/webdev | 1 per month |
| Reviews | Real Google reviews from every client | Ongoing |
| Local network | Technopark communities, KSUM and TiE Kerala events | Referrals and links |

**First 10 blog posts (2 per month)**

1. How much does a website cost in Kerala in 2026?
2. Local SEO for Trivandrum businesses: a step-by-step guide
3. SEO for dermatology and skin clinics: what actually moved rankings
4. How training institutes can rank for course keywords
5. Hand-coded site vs WordPress for a business website in 2026
6. Core Web Vitals explained for business owners
7. Google Business Profile setup checklist for Kerala businesses
8. How I built the AQ Air scroll animation with GSAP and Lenis
9. 12-point SEO audit checklist you can run yourself
10. Building an SEO dashboard with Django: lessons learned

**Measure monthly:** Search Console (impressions, clicks, position per target keyword) · Business Profile (calls, website clicks, direction requests) · GA4 conversions (forms, WhatsApp, calls) · Core Web Vitals report · new referring domains.
