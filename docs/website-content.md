# jibinjohnson.in — Website Content

**Version 1 · English only · Prepared for the plain HTML build**

---

## How to use this file

- Every page has: **URL**, **primary keyword**, **title tag**, **meta description**, **H1**, then the body copy in order, with H2/H3 headings exactly as they should appear in the HTML.
- Text in `[square brackets]` is a fact only you can fill in (numbers, links). Never publish a page with brackets left in.
- **No prices anywhere on the site.** No figures, ranges or "starts from" amounts in copy, FAQs or schema (no `priceRange`). Cost questions explain what the price depends on and point to a free call or audit for a fixed quote.
- Don't invent results. If you don't have a number yet, keep the sentence without it.
- Each primary keyword belongs to **one page only**. Don't copy keyword-heavy paragraphs from one page to another.
- Image file names: lowercase, hyphenated, descriptive (e.g. `jibin-johnson-web-developer-trivandrum.webp`).
- Client names (verified): **Serene Derma** (never "Seren Derma"), **AQ Air** with a space (never "Air AQ" or "AQAir" in text) and **BlackBox Learning** (capital B in Box). Get permission to name clients before publishing.

---

## Global elements (on every page)

### Navigation

- Wordmark: **Jibin Johnson** → `/`
- Links: **Work** `/work/` · **Services** `/services/` · **About** `/about/` · **Contact** `/contact/`
- Blog link hidden until the first post is published (then: **Blog** `/blog/` between About and Contact; mobile menu numbers 01–05). See "Launching the blog" in docs/new-post-checklist.md.
- Button: **Start a project** → `/contact/`

### Footer

- Big line: **Let's talk** → `/contact/`
- Small text: "Have a website to build or a ranking to fix? Send me a message. I usually reply within a day."
- Email: jibinjohnsoninfo@gmail.com
- WhatsApp: +91 77362 08172
- Social: LinkedIn · GitHub · Instagram
- Column "Services": Website development services in Kerala → `/services/web-development/` · SEO services in Kerala → `/services/seo/` · Web developer in Trivandrum → `/web-developer-trivandrum/` · SEO expert in Trivandrum → `/seo-expert-trivandrum/`
- Column "More": Work · About · Resume · Privacy (Blog goes back between About and Resume when the first post is published)
- Bottom line: "Based in Thiruvananthapuram, Kerala — working with clients worldwide." · "© [year] Jibin Johnson"

### Floating WhatsApp button

- aria-label: "Chat with Jibin on WhatsApp"
- Link: `https://wa.me/917736208172?text=Hi%20Jibin%2C%20I%20found%20your%20website%20and%20I%27d%20like%20to%20talk%20about%20a%20project.`
- Prefilled message: "Hi Jibin, I found your website and I'd like to talk about a project."

### Standard CTA block (end of service, location and niche pages)

> **H2: Ready to start?**
> Tell me what you're building or what isn't working. I'll reply with honest advice and a clear next step, even if that step isn't hiring me.
> Buttons: **Start a project** → `/contact/` · **WhatsApp me** → WhatsApp link with the prefilled message
> (No booking link: calls happen by phone/WhatsApp after first contact.)

---

# PAGE: Home

- **URL:** `/`
- **Primary keyword:** web developer in Kerala / SEO expert in Kerala (H1 + hero H2; + brand: Jibin Johnson)
- **Title:** Jibin Johnson | Web Developer & SEO Expert in Kerala
- **Meta description:** Freelance web developer in Kerala and SEO expert in Kerala, based in Trivandrum. Fast, premium websites with technical SEO built in, so customers find you.
- **Schema:** WebSite, Person, ProfessionalService, FAQPage

### Section 01 — Hero

Fully typographic and full-width: no portrait, no giant name. The H1 is the LCP element.

Label: `JIBIN JOHNSON · TRIVANDRUM, KERALA` (one line on desktop; the name lives here and in the lead, not as display text)

**H1:** Web Developer in Kerala
(Giant hero size, two lines: "Web Developer" upright Boska, then "*in Kerala*" italic Boska stepped right. One H1, read as one phrase.)

**H2:** *SEO Expert in Kerala*
(Smaller italic role line under the H1. A decorative "&" — `aria-hidden`, outside the H2 — sits before it so it reads "& SEO Expert in Kerala". The H2 text is exactly "SEO Expert in Kerala". Heading order: hero H1 → hero H2 → section H2s.)
(The Services card links use the hub keywords — "Website development services in Kerala" and "SEO services in Kerala" — so the home page and the hubs don't compete.)

Lead:
I'm Jibin Johnson. I design and build fast, cinematic websites, and make sure the right people find them on Google. Based in Trivandrum, working with clients across Kerala and around the world.

Buttons: **Start a project** → `/contact/` · **WhatsApp me**

Status line: Available for freelance projects (small pulsing rose dot before it)

Scroll cue (label style, links to the story, arrow bobs gently; no bob with reduced motion):
Scroll to see how ↓

### Section 01b — Story (directly after the hero, no label)

Pinned on desktop (≥1024px), simple stacked steps on phones / reduced motion / no JS. Three beats linked by the burgundy thread; each is a Boska italic caption + a small HTML/SVG illustration (aria-hidden).

Section name (aria-label): From sketch to found

1. It starts as a sketch. *(a wireframe drawing itself)*
2. Then it becomes a fast, beautiful website. *(the wireframe filled into a finished page — ink, paper, wine; illustration heading "Your business")*
3. Then it gets found. *(a generic search-result card: URL "yourbusiness.in", blue-ish title bars, grey snippet bars, rose tag "Found ✓")*

Visually hidden summary (screen readers):
Illustration: a wireframe sketch turns into a finished website, which then appears as a result in a Google search.

### Section 01c — Bridge quote (no label)

Beautiful and *findable*.
("findable" italic rose; huge Boska, two lines, second stepped right)

Credit (label style): — Jibin

### Section 02 — About (after the bridge quote)

Label: `01 — About`

Eyebrow: Trivandrum, Kerala · SEO team lead at Prception Medialab

**H2: Jibin Johnson, web developer in Kerala**

I'm a web developer and SEO expert based in Thiruvananthapuram, Kerala. I build websites that look refined, feel smooth to use, and are set up to be found on Google from day one.

Most businesses hire a designer for the look, a developer for the build, and an agency for SEO, and something always gets lost between them. I bring the three together.

(Both paragraphs from the About page copy.)

Facts (short Boska italic phrases, rose dot before each):
- Based in Trivandrum
- SEO team lead
- Design + code + SEO

Buttons: **Explore my resume** → `/jibin-johnson-resume.pdf` · **More about me →** → `/about/`

Portrait alt text: "Jibin Johnson, web developer and SEO expert in Trivandrum, Kerala" (portrait bleeds off the left edge, gentle parallax, lazy-loaded)

### Section 03 — Manifesto

Label: `02 — Approach`

Most websites are either beautiful or findable. I build ones that are both. Design, interaction and technical SEO are planned together from the first line of code, not bolted on at the end.

### Section 04 — Services

Label: `03 — What I do`

**H2: Web development and SEO, under one roof**

Line under the H2 (links use the Trivandrum pages' keywords as anchor text):
In Trivandrum? Meet your [web developer in Trivandrum](/web-developer-trivandrum/) or [SEO expert in Trivandrum](/seo-expert-trivandrum/) in person.

**H3: Web development**
Custom websites and landing pages built with clean, semantic code. Responsive, accessible, and fast enough to pass Core Web Vitals on a phone.
Link: Website development services in Kerala → `/services/web-development/`

**H3: Search engine optimisation**
Technical audits, keyword research, on-page optimisation, local SEO and link building. Reported in plain language through Search Console and Google Analytics.
Link: SEO services in Kerala → `/services/seo/`

**H3: UI/UX and interaction**
Scroll-driven storytelling, motion and layouts that make a brand feel premium, without slowing the site down.
Link: Explore website development services in Kerala → `/services/web-development/`

**H3: Audits and performance**
Already have a website? I find what's slowing it down or holding its rankings back, and fix it.
Link: Explore SEO services in Kerala → `/services/seo/`

### Section 05 — Selected work

Label: `04 — Selected work`

**H2: Recent projects**

**AQ Air** — Website development
A scroll-driven product story for an AI-powered indoor air-quality monitor.
Tags: Frontend · JavaScript · Lenis → `/work/aq-air/`

**Serene Derma** — Healthcare SEO
Led the SEO team that ranked a dermatology clinic for its target treatment keywords.
Tags: SEO · Healthcare → `/work/serene-derma-seo/`

**BlackBox Learning** — Education SEO
Grew organic visibility for a training institute's course keywords.
Tags: SEO · Education → `/work/blackbox-learning-seo/`

**SEO Dashboard** — Personal product
A Django tool I'm building to manage rankings, backlinks and reports in one place.
Tags: Python · Django · In progress → `/work/seo-dashboard/`

Link: See all work → `/work/`

### Section 06 — Process

Label: `05 — Process`

**H2: How a project runs**

1. **Discover.** We talk about goals and customers. I study your competitors and the searches your customers actually make.
2. **Design.** Page structure, wireframes and a visual system in Figma, approved before any code is written.
3. **Build.** Clean, fast code with SEO built into every page: headings, metadata, schema, images and internal links.
4. **Launch and grow.** Search Console and analytics set up on day one, then monthly reports and improvements.

### Section 07 — Why work with me

Label: `06 — Why me`

**H2: One person from design to ranking**

- **Nothing gets lost in hand-offs.** No gap between a designer, a developer and an SEO agency. The person who designs your site also makes sure it ranks.
- **Speed is built in.** I aim for 95+ on Google Lighthouse, because a fast site ranks better and sells better.
- **Real SEO experience.** I've led SEO campaigns for healthcare and education brands and ranked their target keywords.
- **Plain-language reporting.** You'll always know what was done, why, and what changed.

### Section 08 — Clients

Label: `07 — Worked with`

Serene Derma · BlackBox Learning · [add others with permission]

### Section 09 — FAQ

Label: `08 — Questions`

**H2: Questions people ask**

**How much does a website cost in Kerala?**
Every project is different — the price depends on the number of pages, design, features and content. After a free call, you get a clear fixed quote with no hidden costs.

**How long does it take to build a website?**
Usually 3–6 weeks from approved design to launch. A single landing page can be ready in 1–2 weeks.

**How long does SEO take to show results?**
Local searches, such as those in Trivandrum, often start moving within a few months. Competitive, state-wide keywords take longer. I report every month, so you can see the progress instead of waiting in the dark.

**Do you work with clients outside Kerala?**
Yes. I work remotely with clients across India and abroad. Calls, shared files and progress links keep everything clear wherever you are.

**Can I update the website myself?**
Yes. I'll show you how to edit text and add blog posts, and I'm available for changes when you need them.

### Section 10 — Blog (hidden until the first post is published)

Commented out in site/index.html. When re-enabled, it takes label `09 — Writing` and the Final CTA label becomes `10 — Next step`.

Label: `09 — Writing`

**H2: Notes on building and ranking websites**

[3 latest post cards] · Link: Read the blog → `/blog/`

### Section 11 — Final CTA

Label: `09 — Next step` (`10 — Next step` once the Blog section is back)

**H2: Have a project in mind?**

Tell me about it. I'll reply within a day with honest advice and a clear next step.

Buttons: **Start a project** → `/contact/` · **WhatsApp me** · **Email me**
Small link: Download my resume (PDF)

---

# PAGE: About

- **URL:** `/about/`
- **Primary keyword:** Jibin Johnson (brand) / about web developer Trivandrum
- **Title:** About Jibin Johnson | Web Developer & SEO Expert
- **Meta description:** I'm Jibin Johnson, a web developer and SEO expert from Thiruvananthapuram, Kerala, combining frontend craft, UI/UX and search strategy.
- **Schema:** ProfilePage (mainEntity: Person), BreadcrumbList

Label: `About`

**H1: Design, code and search, handled by one person**

Lead:
I'm Jibin Johnson, a web developer and SEO expert based in Thiruvananthapuram, Kerala. I build websites that look refined, feel smooth to use, and are set up to be found on Google from day one.

Portrait alt text: "Portrait of Jibin Johnson in Thiruvananthapuram"

**H2: How I got here**

I started with a Bachelor of Computer Applications at the University of Madras and went on to a postgraduate programme in Artificial Intelligence at Edure, Thiruvananthapuram. Along the way I found the work I enjoy most: the point where good design, clean code and search strategy meet.

Today I'm a Web Developer and SEO Specialist and team lead at Prception Medialab in Thiruvananthapuram. I build responsive websites for clients in healthcare, education, hospitality and maritime real estate, and I lead SEO campaigns from keyword research to reporting.

**H2: What makes my work different**

Most businesses hire a designer for the look, a developer for the build, and an agency for SEO, and something always gets lost between them. I bring the three together. Every layout decision considers how it loads, how it reads to Google, and how it guides a visitor to get in touch.

I care about purposeful design, smooth interaction and measurable results more than following trends.

**H2: What I work with**

- **SEO:** technical SEO, on-page and off-page SEO, keyword research, competitor analysis, content optimisation, link building, local and international SEO, schema markup, Core Web Vitals, reporting
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Astro, responsive design, UI/UX, GSAP, Lenis, scroll-based animation, accessibility (WCAG)
- **Tools:** VS Code, Git and GitHub, Figma, Chrome DevTools, Node.js, Netlify, Google Search Console, Google Analytics 4, PageSpeed Insights
- **Also building with:** Python, Django, PostgreSQL and generative AI

**H2: How I work**

- **Clear scope, fixed quotes.** You know what you're getting and what it costs before anything starts.
- **Progress you can see.** You get preview links during the build, not a surprise at the end.
- **Honest advice.** If something won't help your business, I'll say so.
- **Support after launch.** I don't disappear when the site goes live.

**H2: Let's work together**

Whether you need a new website, better rankings, or both, I'd like to hear about it.
Buttons: **Start a project** · **Download resume**


**Added during build (labels, links, share image)**
- Section labels: `01 — The path` (How I got here) · `02 — The difference` · `03 — Toolkit` (What I work with) · `04 — Principles` (How I work) · `05 — Next step` (Let's work together)
- "How I got here" timeline: the two paragraphs above are split into three steps, word for word. Step labels: `2023–2026 · Study` · `Along the way` · `2026 · Today`. Under step 1, a small line: "Bachelor of Computer Applications — University of Madras Institute of Distance Education · 2023–2026 · Final results awaited"
- Skills shown as tags, one per item in the lists above
- CTA: "Download resume" → `/jibin-johnson-resume.pdf`; extra link: **See my work →** `/work/`
- Share image (og/about.jpg): label "About" · title "Design, code and search" · subtitle "Handled by one person" · alt "About Jibin Johnson: design, code and search, handled by one person"

---

# PAGE: Services overview

- **URL:** `/services/`
- **Primary keyword:** web development and SEO services
- **Title:** Web Development & SEO Services | Jibin Johnson
- **Meta description:** Website development and SEO services for businesses in Kerala and worldwide. Fast, premium websites and search strategy, from one specialist.
- **Schema:** BreadcrumbList, ItemList of the two Service pages

Label: `Services`

**H1: Web development and SEO services**

Lead:
Two services that work best together: a website built to impress visitors, and a search strategy that brings those visitors in.

**H2: Web development**

Custom websites, landing pages and redesigns built with clean, fast code. Every site is responsive, accessible and has SEO foundations built into every page.
- Business and portfolio websites
- Landing pages for campaigns and launches
- Redesigns of slow or outdated sites
- Scroll animation and interactive storytelling
Link: Website development services in Kerala → `/services/web-development/`

**H2: Search engine optimisation**

SEO that starts with research and ends with reports you can understand. I fix technical problems, optimise your pages and build the authority Google needs to rank you.
- Technical SEO audits
- Keyword research and content strategy
- On-page optimisation
- Local SEO and Google Business Profile
- Link building
Link: SEO services in Kerala → `/services/seo/`

**H2: Services in Trivandrum**

Based in the city? We can meet in person.
- Web developer in Trivandrum → `/web-developer-trivandrum/`
- SEO expert in Trivandrum → `/seo-expert-trivandrum/`

**H2: Industry focus**

- SEO for clinics and healthcare → `/seo-for-healthcare-clinics/`
- SEO for training institutes → `/seo-for-education-institutes/`
- Websites for startups → `/web-design-for-startups/`

[Standard CTA block]

# PAGE: Web development (Kerala hub)

- **URL:** `/services/web-development/`
- **Primary keyword:** website development services in Kerala
- **Secondary:** web development in Kerala, freelance website developer Kerala
- **Title:** Website Development Services in Kerala | Jibin Johnson
- **Meta description:** Website development services in Kerala: custom, fast, SEO-ready websites built with Astro, GSAP and clean code. Get a free quote from Jibin Johnson.
- **Schema:** Service (serviceType: Website development, areaServed: Kerala, India), FAQPage, BreadcrumbList

Breadcrumb: Home › Services › Web development

Label: `Web development`

**H1: Website development services in Kerala, built to look premium and load fast**

Lead:
I'm a freelance web developer offering website development services in Kerala: custom websites for businesses, startups and professionals. Each one is designed to impress, built to load in under two seconds, and set up for Google from the first page.

Buttons: **Get a free quote** · **See my work**

**H2: Why most business websites don't work**

Many websites in Kerala are built from the same few templates. They look like their competitors, load slowly on mobile data, and were never set up for search. The result is a website that exists but doesn't bring in enquiries.

The problem usually isn't the business. It's that design, development and SEO were handled separately, or not at all. A beautiful site that Google can't read gets no visitors. A fast site that looks generic doesn't convert the visitors it does get.

I build websites where all three are planned together.

**H2: What you get**

**H3: Custom design, not a template**
A layout and visual style made for your brand, designed in Figma and approved before development starts.

**H3: Fast on every device**
Optimised images, lean code and modern formats, so pages load quickly even on mobile data. I aim for 95+ on Google Lighthouse.

**H3: SEO built in**
Proper headings, metadata, schema markup, clean URLs, a sitemap and internal links on every page from launch day, not added later as an extra.

**H3: Smooth, purposeful motion**
Scroll animation and interaction with GSAP where it helps tell your story, never so much that it slows the page or distracts.

**H3: Accessible and responsive**
Readable text, good contrast, keyboard navigation and layouts tested on phones, tablets and desktops.

**H3: Contact that converts**
Clear calls to action, enquiry forms that reach your inbox, and a WhatsApp button, because that's how most people in Kerala prefer to get in touch.

**H2: Websites I build**

- **Business websites** for clinics, institutes, shops, consultants and service companies
- **Landing pages** for a product launch, an ad campaign or a single service
- **Portfolio and personal brand sites** for professionals and creatives
- **Redesigns** of existing sites that are slow, outdated or not bringing enquiries
- **Interactive product stories** with scroll-driven animation, like the AQ Air project

**H2: How I work with you**

1. **Discovery call.** We talk about your business, your customers and what the site needs to achieve. You get a fixed quote.
2. **Structure and design.** I plan the pages around what your customers search for, then design the look in Figma for your approval.
3. **Development.** I build the site with clean, semantic code and share preview links so you can see progress.
4. **Launch.** I connect your domain, set up Google Search Console and analytics, submit the sitemap and check everything works.
5. **After launch.** I show you how to update content, and I'm available for changes and ongoing SEO.

**H2: Built with modern, reliable tools**

I write semantic HTML, modern CSS and JavaScript, and use Astro for larger content sites. GSAP and Lenis handle animation and smooth scrolling. Sites are hosted on fast global networks like Netlify, with free SSL and automatic backups through Git. No heavy page builders and no plugins slowing your site down.

**H2: Recent web development work**

- **AQ Air:** a responsive, animation-rich website for an AI-powered indoor air-quality monitor, with scroll-driven storytelling and smooth scrolling. → `/work/aq-air/`
- **Startup websites:** see how I approach launch-ready sites → `/web-design-for-startups/`

**H2: Working with businesses across Kerala**

I'm based in Thiruvananthapuram and work with clients throughout Kerala, including Kochi, Kollam, Kozhikode and Thrissur, as well as across India and abroad. Most projects run smoothly online with calls and shared previews. If you're in the capital, see my page for a **web developer in Trivandrum** → `/web-developer-trivandrum/`.

A great website also needs people to find it. If you want rankings as well as a new site, take a look at my **SEO services in Kerala** → `/services/seo/`.

**H2: Frequently asked questions**

**How much does website development cost in Kerala?**
Every project is different — the price depends on the number of pages, design complexity, animation and content. After our first call, you get a clear fixed quote with no hidden costs.

**Do you use WordPress?**
For most business sites I build with clean, hand-written code or Astro, which is faster and more secure than a typical WordPress setup. If you specifically need WordPress, we can discuss it.

**Will my website work well on mobile?**
Yes. Every site is designed mobile-first and tested on real phone sizes. Most of your visitors will arrive on a phone, so that's where it has to be best.

**Do you write the content too?**
I can write or improve your website copy so it's clear and optimised for search. You provide the facts about your business; I shape them into pages that read well and rank.

**What do I need to get started?**
Just an idea of what you want the site to do. A logo, photos and examples of sites you like help, but we can work out the rest together.

**Do you offer maintenance after launch?**
Yes. I offer ongoing updates and monthly SEO care, or you can manage simple edits yourself after a short walkthrough.

[Standard CTA block]

---

# PAGE: SEO (Kerala hub)

- **URL:** `/services/seo/`
- **Primary keyword:** SEO services in Kerala
- **Secondary:** freelance SEO Kerala, SEO audit Kerala
- **Title:** SEO Services in Kerala | Freelance SEO Expert
- **Meta description:** SEO services in Kerala: technical SEO, on-page, local SEO and link building that moves rankings, from a freelance SEO expert. Get a free SEO audit.
- **Schema:** Service (serviceType: Search engine optimization, areaServed: Kerala, India), FAQPage, BreadcrumbList

Breadcrumb: Home › Services › SEO

Label: `SEO services`

**H1: SEO services in Kerala that bring real enquiries**

Lead:
I'm a freelance SEO expert helping businesses in Kerala rank for the searches their customers actually make. Technical fixes, better pages and real authority, explained in plain language every month.

Buttons: **Get a free SEO audit** · **See case studies**

**H2: Ranking isn't the goal. Enquiries are.**

Plenty of SEO reports show rising numbers that never turn into phone calls. Ranking for a keyword nobody searches, or one that brings the wrong visitors, doesn't help your business.

I start with the searches that lead to customers: "dermatologist near me", "web design course in Trivandrum", "best clinic for hair loss in Kochi". Then I make sure your website deserves to rank for them, technically and in its content.

**H2: What my SEO service includes**

**H3: Technical SEO audit**
I crawl your website and fix what stops Google from reading it properly: slow pages, broken links, duplicate content, indexing problems, missing schema and Core Web Vitals issues.

**H3: Keyword research and strategy**
I find the terms your customers use, check how hard each one is to rank for, and match every important keyword to one page on your site, so your pages never compete with each other.

**H3: On-page optimisation**
Titles, meta descriptions, headings, content, internal links and images, all rewritten so each page clearly answers the search it targets.

**H3: Local SEO**
Google Business Profile setup and optimisation, consistent business listings, and location pages that help you appear in the map results for searches in your city.

**H3: Content strategy**
Blog posts, service pages and FAQs planned around real questions, which bring in visitors who are already looking for what you offer.

**H3: Link building**
Relevant, quality backlinks from directories, partners, local media and industry sites. No spam networks, no shortcuts that put your site at risk.

**H3: Monthly reporting**
A clear report from Google Search Console and Analytics: what was done, which keywords moved, how much traffic and how many enquiries came in, and what's next.

**H2: How an SEO project runs**

1. **Free audit.** I review your site and competitors and show you the biggest opportunities.
2. **Strategy.** We agree on target keywords, priorities and a monthly plan.
3. **Fix the foundations.** Technical issues and on-page optimisation come first, because they give the fastest results.
4. **Build authority.** Content and links grow your site's trust month by month.
5. **Measure and adjust.** Monthly reporting, and more effort on what's working.

**H2: Results from real campaigns**

I've led SEO teams on campaigns in healthcare and education, ranking multiple target keywords into top positions through technical, on-page and off-page work.

- **Serene Derma (healthcare):** keyword strategy around treatments and locations, on-page and content optimisation, with rankings achieved for multiple target keywords. → `/work/serene-derma-seo/`
- **BlackBox Learning (education):** course-focused keyword research, page optimisation and link building that improved organic visibility. → `/work/blackbox-learning-seo/`

[Add specific numbers when available, e.g. "from position 28 to 3 for '…' in 4 months".]

**H2: SEO that understands the code**

Because I'm also a web developer, I don't just send you a list of problems and leave your developer to guess. I can fix the code myself: page speed, schema markup, rendering issues, site structure. Technical SEO gets done properly and quickly.

**H2: SEO for businesses across Kerala**

I work with clinics, training institutes, local service businesses and startups throughout Kerala, and with clients across India and overseas. If your business is in the capital, see my **SEO expert in Trivandrum** page for local SEO → `/seo-expert-trivandrum/`.

I also specialise in **SEO for clinics and healthcare** → `/seo-for-healthcare-clinics/` and **SEO for training institutes** → `/seo-for-education-institutes/`.

If your current website is holding you back, I can rebuild it with SEO built in. See **website development services in Kerala** → `/services/web-development/`.

**H2: Frequently asked questions**

**How much do SEO services cost in Kerala?**
It depends on your website, your competition and your goals. After a free audit, I'll recommend a plan and give you a clear monthly quote before anything starts.

**How long does SEO take?**
Technical and on-page fixes can show movement within weeks. Local keywords usually improve within a few months. Competitive, state-wide keywords take longer and need consistent content and links.

**Can you guarantee first position on Google?**
No honest SEO expert can, because Google decides rankings. What I guarantee is clear work, transparent reporting, and only white-hat methods that won't put your site at risk.

**Do I need SEO if I run Google Ads?**
Ads stop the moment you stop paying. SEO builds traffic that keeps coming. Many businesses use both: ads for quick leads, SEO for long-term growth at a lower cost per lead.

**What is local SEO?**
Local SEO helps you appear when people search for a service near them, including in the Google Maps results. It's the most valuable kind of SEO for clinics, shops and service businesses.

**Do you work on websites built by someone else?**
Yes. I can work on WordPress, Shopify, custom-coded and most other websites.

[Standard CTA block — heading: "Get a free SEO audit"]

---

# PAGE: Web developer in Trivandrum (location)

- **URL:** `/web-developer-trivandrum/`
- **Primary keyword:** web developer in Trivandrum
- **Secondary:** freelance web developer Trivandrum, freelance website developer Trivandrum, website development services Trivandrum, web developer Thiruvananthapuram
- **Title:** Web Developer in Trivandrum | Freelance Website Developer
- **Meta description:** Freelance web developer in Trivandrum (Thiruvananthapuram). Premium, fast websites for local businesses and startups. Meet in person or online.
- **Schema:** ProfessionalService (areaServed: Thiruvananthapuram), Service, FAQPage, BreadcrumbList
- **Share image:** label "Thiruvananthapuram" · title "Web developer in Trivandrum" · subtitle "Meet in person or online" · alt "Jibin Johnson, web developer in Trivandrum: meet in person or online"

Breadcrumb: Home › Web developer in Trivandrum

Label: `Thiruvananthapuram`

**H1: Freelance web developer in Trivandrum**

Lead:
I'm Jibin Johnson, a web developer based in Thiruvananthapuram. I build fast, premium websites for local businesses, clinics, institutes and startups, and I'm happy to meet you in person to plan yours.

Buttons: **Meet for a coffee** → `/contact/` · **WhatsApp me**

Label: `01 — Close by`

**H2: A local developer, not a faraway agency**

When your web developer is in the same city, things move faster. We can sit together, look at your competitors, and sketch the site in one meeting. You can see progress on your own phone and call me when something needs to change, instead of waiting days for an email.

I'm based in Trivandrum and know how local customers search: in English, often on mobile, often with "near me" or the area name, and usually wanting to WhatsApp before they call. Your website should be built for exactly that.

Label: `02 — Services`

**H2: Website development services in Trivandrum**

- **New business websites:** clinics, coaching centres, restaurants, real estate, shops and professional services
- **Landing pages** for ads, admissions season, offers and launches
- **Website redesigns** for slow, outdated or hard-to-update sites
- **Startup websites** for teams at Technopark and beyond
- **SEO-ready builds** so your site can rank for searches in Thiruvananthapuram from launch

Label: `03 — Included`

**H2: What's included in every website**

- Custom design that matches your brand, not a recycled template
- Mobile-first layouts that load fast on 4G
- On-page SEO, schema markup and a sitemap from day one
- A WhatsApp button, a contact form and click-to-call
- Google Search Console and Analytics setup
- Training so you can update content yourself

Label: `04 — Where I work`

**H2: Areas I serve in Thiruvananthapuram**

I work with businesses across the city and district, including Technopark and Kazhakoottam, Pattom, Kowdiar, Vazhuthacaud, Vellayambalam, Sasthamangalam, Kesavadasapuram, Ulloor, Medical College, Thampanoor, East Fort, Kovalam, Neyyattinkara and Attingal. If you're nearby, we can meet at your office or a café.

Large area list (the page's distinctive moment, in this order; list label for screen readers: "Areas in Thiruvananthapuram"):
Technopark · Kazhakoottam · Pattom · Kowdiar · Vazhuthacaud · Vellayambalam · Sasthamangalam · Kesavadasapuram · Ulloor · Medical College · Thampanoor · East Fort · Kovalam · Neyyattinkara · Attingal

Label: `05 — Local search`

**H2: Built for how Trivandrum searches**

A local website needs local signals. I make sure your site clearly shows your location, service areas, opening hours and contact details, connects to your Google Business Profile, and uses the words your customers type, such as "Trivandrum" and "Thiruvananthapuram". That's how you start appearing in local results instead of only for your business name.

Want to rank higher in local search too? See my **SEO expert in Trivandrum** service → `/seo-expert-trivandrum/`.

Label: `06 — Selected work`

**H2: Recent work**

**AQ Air** — Website development · 2026
A scroll-driven, responsive product website.
Tags: Frontend · JavaScript · GSAP → `/work/aq-air/`

**Serene Derma** — Healthcare SEO · 2026
Healthcare SEO campaign.
Cover: SEO case study · Healthcare (alt: "Serene Derma — healthcare SEO project cover")
Tags: SEO · Healthcare → `/work/serene-derma-seo/`

For clients elsewhere in the state, see **website development services in Kerala** → `/services/web-development/`.

Label: `07 — Questions`

**H2: Questions from Trivandrum businesses**

**Can we meet in person?**
Yes. I'm based in Thiruvananthapuram and happy to meet at your office or a café for the first meeting and key reviews.

**How much does a website cost in Trivandrum?**
Every business is different — the price depends on the pages, design and features you need. After our first conversation, you get a clear fixed quote with no hidden costs.

**How quickly can you deliver?**
A landing page can be ready in 1–2 weeks, and a full business website in 3–6 weeks, depending on content and approvals.

**Do you work with Technopark startups?**
Yes. I build launch websites, product pages and landing pages that look credible to investors and customers. See **websites for startups** → `/web-design-for-startups/`.

**Can you help with my Google Business Profile?**
Yes. I set up or optimise it and connect it to your website. It's one of the biggest factors in appearing on Google Maps.

[Standard CTA block — label `08 — Next step`, heading: "Let's meet and plan your website"]

---

# PAGE: SEO expert in Trivandrum (location)

- **URL:** `/seo-expert-trivandrum/`
- **Primary keyword:** SEO expert in Trivandrum
- **Secondary:** SEO services in Trivandrum, freelance SEO expert Trivandrum, SEO expert in Thiruvananthapuram, SEO Thiruvananthapuram
- **Title:** SEO Expert in Trivandrum | Local SEO Services
- **Meta description:** Local SEO expert in Trivandrum. Rank on Google Maps and search for the keywords your customers use. Free SEO audit for Trivandrum businesses.
- **Schema:** ProfessionalService (areaServed: Thiruvananthapuram), Service, FAQPage, BreadcrumbList
- **Share image:** label "Local SEO · Thiruvananthapuram" · title "SEO expert in Trivandrum" · subtitle "Rank on Google Maps and local search" · alt "Jibin Johnson, SEO expert in Trivandrum: rank on Google Maps and local search"

Breadcrumb: Home › SEO expert in Trivandrum

Label: `Local SEO · Thiruvananthapuram`

**H1: SEO expert in Trivandrum for local businesses**

Lead:
When someone in Thiruvananthapuram searches for what you offer, your business should be one of the first they see, on Google Maps and in the results below it. I'm a local SEO expert who makes that happen.

Buttons: **Get a free local SEO audit** · **WhatsApp me**

Label: `01 — Google Maps`

**H2: The top three map results get most of the calls**

For searches like "skin clinic in Trivandrum" or "PSC coaching near me", Google shows a map with three businesses before any website. Those three get most of the calls, direction requests and visits. If you're not there, most customers never scroll far enough to find you.

Getting into those results depends on your Google Business Profile, your website, your reviews, and how consistently your business appears across the web. I work on all of them.

Label: `02 — Services`

**H2: Local SEO services in Trivandrum**

**H3: Google Business Profile optimisation**
The right categories, services, description, photos, posts and Q&A, set up so Google understands exactly what you do and where.

**H3: Local keyword research**
The exact phrases people in Trivandrum use, including area names, "near me" searches, and both "Trivandrum" and "Thiruvananthapuram".

**H3: Location-optimised website pages**
Pages that clearly match local searches, with your address, service areas, local schema markup and a map.

**H3: Citations and listings**
Consistent name, address and phone number on Justdial, Sulekha, Bing Places, Apple Maps and relevant directories.

**H3: Review strategy**
A simple system to ask happy customers for Google reviews, and guidance on replying to every review professionally.

**H3: Technical and on-page SEO**
Speed, mobile usability, indexing and content fixes, so your website supports your map ranking instead of holding it back.

Label: `03 — Who I help`

**H2: Who I help in Trivandrum**

- **Clinics and healthcare:** dermatology, dental, physiotherapy, Ayurveda → `/seo-for-healthcare-clinics/`
- **Coaching centres and training institutes** → `/seo-for-education-institutes/`
- **Local services:** interiors, real estate, travel, events, repairs
- **Restaurants, cafés and shops** around Pattom, Kowdiar, Vazhuthacaud, Kazhakoottam and the city centre
- **IT companies and startups** at Technopark that want to be found for their services

Label: `04 — Why local`

**H2: Why a Trivandrum-based SEO expert**

I know the city's areas, landmarks and how local customers search. I can visit your business to take proper photos for your profile, and meet you to review results. Your SEO is handled by someone who understands your market, not an anonymous team in another state.

Large area list (the page's distinctive moment, in this order; list label for screen readers: "Areas of Thiruvananthapuram"):
Technopark · Kazhakoottam · Pattom · Kowdiar · Vazhuthacaud · Sasthamangalam · Thampanoor · East Fort · Kovalam
Next to Vazhuthacaud, a small link: **Serene Derma's main clinic** → `/work/serene-derma-seo/`

Label: `05 — Proof`

**H2: Proven SEO experience**

I've led SEO campaigns for healthcare and education brands, focused on location-based, high-intent keywords, and ranked multiple target keywords into top positions. See the **Serene Derma** case study → `/work/serene-derma-seo/` and **BlackBox Learning** → `/work/blackbox-learning-seo/`.

Serene Derma's main clinic is in Vazhuthacaud, right here in Thiruvananthapuram, so its campaign was built around the same kind of treatment-and-area searches your customers make.

**Serene Derma** — Healthcare SEO · Vazhuthacaud, Thiruvananthapuram
A dermatology clinic with locations in Thiruvananthapuram and Kollam: keyword strategy around treatments and locations, prioritising high-intent local searches.
Cover: SEO case study · Healthcare (alt: "Serene Derma — healthcare SEO project cover")
Tags: Local SEO · Healthcare · Team lead → `/work/serene-derma-seo/`

**BlackBox Learning** — Education SEO · Thiruvananthapuram
A Thiruvananthapuram training institute: course keyword research, including location-based queries, and course page optimisation.
Cover: SEO case study · Education (alt: "BlackBox Learning — education SEO project cover")
Tags: SEO · Education → `/work/blackbox-learning-seo/`

Serving clients across the state? See **SEO services in Kerala** → `/services/seo/`. Need a faster, better website to support your rankings? See **web developer in Trivandrum** → `/web-developer-trivandrum/`.

Label: `06 — Questions`

**H2: Local SEO questions**

**How much does local SEO cost in Trivandrum?**
It depends on your business, your area and how competitive your local searches are. After a free local SEO audit, I'll recommend a plan and give you a clear monthly quote before anything starts.

**How long until I appear on Google Maps?**
A well-optimised profile can start gaining visibility within weeks. Reaching the top three for competitive searches usually takes a few months of consistent work and reviews.

**Do I need a website for local SEO?**
You can rank on Maps with only a Google Business Profile, but a good website makes it much stronger and turns searchers into customers.

**Do you need to visit my business?**
Not necessarily, but if you're in Trivandrum, a visit for photos and a quick review of your setup often helps.

**Can you remove bad reviews?**
Genuine reviews can't be removed. Fake or policy-breaking reviews can be reported to Google. The best answer to a bad review is a calm, professional reply and more good reviews from real customers.

[Standard CTA block — label `07 — Next step`, heading: "Get a free local SEO audit"]

---

# PAGE: SEO for healthcare clinics (niche landing page)

- **URL:** `/seo-for-healthcare-clinics/`
- **Primary keyword:** SEO for clinics in Kerala
- **Secondary:** healthcare SEO Kerala, dermatology clinic SEO, medical SEO
- **Title:** SEO for Clinics in Kerala | Healthcare SEO
- **Meta description:** SEO for clinics in Kerala, including dermatology centres. Rank for treatment and location searches and turn visitors into appointments.
- **Schema:** Service (serviceType: Healthcare SEO, areaServed: Kerala), FAQPage, BreadcrumbList

Breadcrumb: Home › Services › SEO for clinics

Label: `Healthcare SEO`

**H1: SEO for clinics in Kerala that patients can trust**

Lead:
Patients search before they book. I help clinics in Kerala appear for the treatments and locations patients search for, with content that builds trust and follows medical advertising standards.

Buttons: **Get a free clinic SEO audit** → `/contact/` · **See the Serene Derma case study** → `/work/serene-derma-seo/`

Share image: label "Healthcare SEO" · title "SEO for clinics in Kerala" · subtitle "Rank for the treatments patients search" (alt: "Jibin Johnson, SEO for clinics in Kerala: rank for the treatments patients search")

Label: `01 — The patient journey`

**H2: How patients choose a clinic now**

Someone with a skin problem in Kochi or Trivandrum doesn't open a directory. They search "acne scar treatment in Kochi" or "best dermatologist near me", compare the top few clinics, read reviews, and book. If your clinic isn't in those results, the patient books elsewhere, however good your doctors are.

Patient journey (the page's distinctive moment: four large steps that light up as the thread passes; list label for screen readers: "How a patient finds and books a clinic"):
1. **Search** — a treatment and a place
2. **Compare** — the top few clinics
3. **Read reviews** — trust comes first
4. **Book** — with you, or elsewhere

Label: `02 — Included`

**H2: What healthcare SEO includes**

**H3: Treatment-focused keyword research**
Every treatment you offer, matched to how patients actually describe it, including symptoms, treatment names and location searches.

**H3: Treatment pages that answer patient questions**
One clear page per key treatment: what it is, who it's for, the process, recovery and FAQs. Written to be accurate and easy to understand, and reviewed by your doctors.

**H3: Doctor profiles and trust signals**
Qualifications, experience and registration details shown clearly, with schema markup for your doctors and clinic. Google pays close attention to trust on health topics.

**H3: Local SEO for every branch**
Optimised Google Business Profiles, location pages and consistent listings for each clinic location.

**H3: Responsible content**
Healthcare content has to be accurate and careful. No exaggerated claims or guaranteed outcomes, which is right for patients and safer for your clinic's reputation.

**H3: Appointment-focused design**
Clear booking buttons, WhatsApp enquiries and click-to-call on every treatment page, and tracking so you know which pages bring patients.

Label: `03 — Case study`

**H2: Case study: Serene Derma**

Card: **Serene Derma** — Healthcare SEO · 2026
Treatment and location keyword strategy for a dermatology clinic in Trivandrum and Kollam.
Cover: SEO case study · Healthcare (alt: "Serene Derma — healthcare SEO project cover")
Tags: SEO · Healthcare · Team lead → `/work/serene-derma-seo/`

I led the SEO team for Serene Derma, a dermatology clinic. We planned keyword strategy around treatments and locations, optimised on-page content and ran a structured content workflow through to client approval. The campaign achieved rankings for multiple target keywords. [Add specific keyword movements or traffic growth.]
Link: Read the full case study → `/work/serene-derma-seo/`
Link: See all work → `/work/`

Label: `04 — Who I help`

**H2: Clinics I can help**

Dermatology and skin clinics, dental clinics, hair transplant centres, physiotherapy and rehabilitation, Ayurveda centres, diagnostic labs, eye clinics, and multi-speciality hospitals across Kerala.

For general SEO see **SEO services in Kerala** → `/services/seo/`. For clinics in the capital, see **SEO expert in Trivandrum** → `/seo-expert-trivandrum/`.

Label: `05 — Questions`

**H2: Questions from clinics**

**Is SEO allowed for doctors and clinics?**
Yes. Providing accurate information about your clinic and treatments is fine. What you must avoid are misleading claims, guaranteed results and fake testimonials. I keep content factual and ask your team to review medical details.

**Which pages matter most for a clinic?**
Individual treatment pages, doctor profiles, location pages and your Google Business Profile usually bring the most appointments.

**How soon will we get more appointments?**
Local improvements can show within a few months. Competitive treatment keywords in big cities take longer and need regular content.

**Can you work with our existing website?**
Yes, or I can rebuild it if speed and structure are holding it back.

[Standard CTA block — label `06 — Next step`, heading: "Get a free clinic SEO audit"]

---

# PAGE: SEO for education institutes (niche landing page)

- **URL:** `/seo-for-education-institutes/`
- **Primary keyword:** SEO for training institutes in Kerala
- **Secondary:** education SEO, course website SEO, coaching centre SEO
- **Title:** SEO for Training Institutes in Kerala | Jibin Johnson
- **Meta description:** SEO for training institutes in Kerala and other course providers. Rank for the course searches students make and fill more seats from organic traffic.
- **Schema:** Service (serviceType: Education SEO, areaServed: Kerala), FAQPage, BreadcrumbList

Breadcrumb: Home › Services › SEO for institutes

Label: `Education SEO`

**H1: SEO for training institutes in Kerala**

Lead:
Students compare courses on Google before they ever call. I help training institutes, coaching centres and academies in Kerala rank for the course searches that turn into admissions.

Buttons: **Get a free institute SEO audit** → `/contact/` · **See the BlackBox Learning case study** → `/work/blackbox-learning-seo/`

Share image: label "Education SEO" · title "SEO for training institutes in Kerala" · subtitle "Rank for the course searches students make" (alt: "Jibin Johnson, SEO for training institutes in Kerala: rank for the course searches students make")

Label: `01 — Course searches`

**H2: Admissions start with a search**

"Digital marketing course in Trivandrum." "Python training with placement in Kochi." "Best IELTS coaching near me." Students and parents search, compare three or four institutes, and enquire with the ones that look credible. Ads get expensive during admission season. Organic rankings keep bringing enquiries all year.

Course searches (the page's distinctive moment: a large serif list that lights up row by row as the thread passes; the words around the course are set in italic; list label for screen readers: "Examples of course searches students make"; each row's tags are labelled "What this search tells you"):
- digital marketing course *in Trivandrum* — Tags: Course · Location
- python training *with placement in Kochi* — Tags: Course · Placement · Location
- *best* IELTS coaching *near me* — Tags: Comparing · Course · Near me
- full stack course *fees and duration* — Tags: Course · Fees · Duration
- machine learning course *online* — Tags: Course · Online

Label: `02 — Included`

**H2: What education SEO includes**

**H3: Course keyword research**
Every course mapped to the searches students make: course name, "with placement", fees, duration, online or offline, and location.

**H3: Course pages that convert**
A strong page for each course with the syllabus, duration, fees, certification, batch timings, trainer details and FAQs, plus a clear enquiry button.

**H3: Course and organisation schema**
Structured data so Google understands your courses and institute, which helps your listings stand out.

**H3: Local SEO for every centre**
Google Business Profile optimisation and location pages for each branch.

**H3: Content that attracts students**
Career guides, salary insights and "how to become" articles that bring in students early in their decision.

**H3: Authority and links**
Listings on education portals, partnerships and local media, building the trust that competitive course keywords require.

Label: `03 — Case study`

**H2: Case study: BlackBox Learning**

Card: **BlackBox Learning** — Education SEO · 2026
Course keyword research, page optimisation and link building for a training institute in Thiruvananthapuram.
Cover: SEO case study · Education (alt: "BlackBox Learning — education SEO project cover")
Tags: SEO · Education · Link building → `/work/blackbox-learning-seo/`

For BlackBox Learning, a training platform, I ran keyword research and competitor analysis, optimised course pages and SEO content, and built backlinks for education keywords. The work improved organic visibility and achieved rankings for multiple targeted keywords. [Add specific numbers when available.]
Link: Read the full case study → `/work/blackbox-learning-seo/`
Link: See all work → `/work/`

Label: `04 — Who I help`

**H2: Who this is for**

IT and software training institutes, digital marketing academies, coaching centres for competitive exams, language and IELTS centres, design schools, and online course creators across Kerala.

See also **SEO services in Kerala** → `/services/seo/` and, if your site needs rebuilding, **web development** → `/services/web-development/`.

Label: `05 — Questions`

**H2: Questions from institutes**

**When should we start SEO before admissions?**
Ideally three to six months before your main admission season, so rankings are in place when students start searching.

**Should we show course fees on the website?**
Usually yes. Students search for fees, and pages that answer the question honestly tend to get more qualified enquiries.

**Can you help with online courses as well?**
Yes. Online courses can target students across India, so the keyword strategy is broader than for a local centre.

**Do you also handle Google Business Profile for branches?**
Yes, for every branch you have.

[Standard CTA block — label `06 — Next step`, heading: "Get a free institute SEO audit"]

---

# PAGE: Websites for startups (niche landing page)

- **URL:** `/web-design-for-startups/`
- **Primary keyword:** website development for startups in Kerala
- **Secondary:** startup website development, landing page development, Technopark startup website
- **Title:** Website Development for Startups in Kerala | Jibin Johnson
- **Meta description:** Website development for startups in Kerala: launch-ready sites and landing pages with premium design, smooth animation and SEO foundations.
- **Schema:** Service (serviceType: Startup website development, areaServed: Kerala, India), FAQPage, BreadcrumbList

Breadcrumb: Home › Services › Websites for startups

Label: `For startups`

**H1: Website development for startups in Kerala: sites that look serious from day one**

Lead:
Your website is often the first thing investors, early customers and new hires see. I build launch-ready startup websites that look premium, explain your product clearly, and are ready to grow with search.

Buttons: **Plan my launch site** → `/contact/` · **See AQ Air** → `/work/aq-air/`

Share image: label "For startups" · title "Website development for startups in Kerala" · subtitle "Launch-ready, premium, built to grow" (alt: "Jibin Johnson, website development for startups in Kerala: launch-ready, premium, built to grow")

Label: `01 — What matters`

**H2: What startups need from a website**

- **Clarity in five seconds:** what you do, who it's for, and why it matters
- **Credibility:** design that looks as good as a funded company's
- **Speed to launch:** weeks, not months
- **Room to grow:** easy to add pages, a blog, case studies and landing pages as you learn
- **Search foundations:** so organic traffic starts building from day one

Label: `02 — Launch timeline`

**H2: From first call to launch**

(The page's distinctive moment: four stops along a burgundy line drawn on scroll. Timings match the FAQ below.)

1. **First call — Message and plan.** We shape your message from your pitch deck and product notes, and plan the pages you need.
2. **Weeks 1–2 — Landing page.** A focused page for a waitlist, a campaign or your launch, if you need to go live first.
3. **Weeks 3–5 — Launch website.** Home, product, about, pricing and contact: everything you need to go live and look credible.
4. **After launch — Room to grow.** A blog, case studies and new landing pages, added as you learn.

Note under the timeline: "Typical timings. The exact plan depends on how ready your content is."

Label: `03 — What I build`

**H2: What I build for startups**

**H3: Launch websites**
Home, product, about, pricing and contact pages: everything you need to go live and look credible.

**H3: Product storytelling pages**
Scroll-driven pages that walk visitors through your product step by step, like the AQ Air product site.

**H3: Landing pages**
Focused pages for waitlists, campaigns, ads and investor decks, built to test ideas quickly.

**H3: SEO foundations**
Keyword research for your category, clean structure, schema and a blog setup, so content marketing can start whenever you're ready.

Label: `04 — Case study`

**H2: Case study: AQ Air**

Card: **AQ Air** — Website development · 2026
A scroll-driven product story for an AI-powered air-quality monitor.
Image alt: "AQ Air website hero: an AI-powered indoor air-quality monitor with scroll-driven product story"
Tags: Frontend · JavaScript · Lenis · Responsive → `/work/aq-air/`

AQ Air is an AI-powered indoor air-quality monitor. I built a responsive, animation-rich product website using scroll-driven storytelling, smooth scrolling with Lenis, reveal animations, a draggable carousel and an animated live air-quality panel, with dedicated breakpoints and reduced-motion support.
Link: Read the AQ Air case study → `/work/aq-air/`
Link: See all work → `/work/`

Label: `05 — How I build`

**H2: Fast, modern and yours**

I build with Astro or hand-written HTML, CSS and JavaScript, so there's no page builder lock-in and no monthly plugin bills. Your site is fast and secure, and you can host it free or cheaply on modern platforms. Startups at Technopark can meet me in person; others work with me remotely.

See also **website development services in Kerala** → `/services/web-development/` and **web developer in Trivandrum** → `/web-developer-trivandrum/`.

Label: `06 — Questions`

**H2: Questions from founders**

**How fast can you launch our website?**
A landing page in about 1–2 weeks; a full launch website in 3–5 weeks, depending on content readiness.

**We don't have final copy yet. Can you help?**
Yes. I can help shape your messaging and write clear, search-friendly copy from your pitch deck and product notes.

**Can we edit the website ourselves?**
Yes. I set up simple editing for pages and blog posts and show your team how it works.

**Do you sign NDAs?**
Yes, happily, before you share product details.

[Standard CTA block — label `07 — Next step`, heading: "Let's plan your launch site"]

---

# PAGE: Work (index)

- **URL:** `/work/`
- **Primary keyword:** web development and SEO case studies
- **Title:** Work & Case Studies | Jibin Johnson
- **Meta description:** Selected web development and SEO case studies: AQ Air, Serene Derma, BlackBox Learning and more. See the problem, the approach and the results.
- **Schema:** CollectionPage, BreadcrumbList

Label: `Work`

**H1: Selected work**

Lead:
Websites I've built and SEO campaigns I've led, with the problem, the approach and the result for each.

Cards (image, title, category, one line, tags):

1. **AQ Air** · Website development · 2026
   "A scroll-driven product story for an AI-powered air-quality monitor."
   Frontend · JavaScript · Lenis · Responsive
2. **Serene Derma** · Healthcare SEO · 2026
   "Led the SEO team that ranked a dermatology clinic for its target treatment keywords."
   SEO · Healthcare · Team lead
3. **BlackBox Learning** · Education SEO · 2026
   "Improved organic visibility for a training institute's course keywords."
   SEO · Education · Link building
4. **SEO Dashboard** · Personal product · In progress
   "A Django platform to manage SEO data, rankings, backlinks and reports in one place."
   Python · Django · Data

Closing line: "Have a project like these? → Start a project"


---

# PAGE: Case study — AQ Air

- **URL:** `/work/aq-air/`
- **Primary keyword:** AQ Air website case study
- **Title:** AQ Air Website — Frontend Case Study | Jibin Johnson
- **Meta description:** How I built a responsive, animation-rich product website for AQ Air, an AI indoor air-quality monitor, with vanilla JavaScript and Lenis.
- **Schema:** Article (author: Person), BreadcrumbList · datePublished / dateModified: 2026-11-11

Breadcrumb: Home › Work › AQ Air

**H1: AQ Air: a scroll-driven product story**

Meta strip: Client: AQ Air · Industry: Smart home / IoT · Role: Frontend developer · Year: 2026 · Live site: https://aqairmonitor.github.io/AQ/

**H2: Overview**
AQ Air is a connected indoor air monitor that reads five sensors (CO₂, PM2.5, VOCs, gas/smoke and temperature/humidity), uses AI to explain air conditions in plain language, and sends alerts to your phone. The website needed to explain a technical product simply and make it feel premium.

**H2: The challenge**
Air-quality data is invisible and technical. The site had to make it tangible and easy to understand, keep visitors scrolling through the story, and still load fast and work well on every device.

**H2: What I did**
- Built a scroll-driven storytelling experience in vanilla JavaScript using IntersectionObserver and requestAnimationFrame, without a front-end framework
- Built page sections for the product overview, use cases (home, vehicles, remote monitoring), “Why AQ Air” benefits, the four-step “How it works” flow (Sense, Analyze, Understand, Act) and the contact form
- Implemented Lenis smooth scrolling for a seamless browsing experience
- Created a custom preloader, reveal-on-scroll animations and a draggable carousel
- Built an animated live air-quality panel that shows how the device reports readings
- Designed a fully responsive layout with dedicated breakpoints for desktop, tablet and mobile
- Added reduced-motion handling for accessibility

**H2: Tools**
HTML5 · CSS3 · Vanilla JavaScript · IntersectionObserver · requestAnimationFrame · Lenis · Responsive design

**H2: Outcome**
A smooth, responsive product website that turns technical sensor data into a clear, engaging story — scoring a perfect 100 for accessibility, best practices and SEO on Google PageSpeed Insights.

Stats (three .stat items): **100** Accessibility · **100** Best Practices · **100** SEO
Caption: "Google PageSpeed Insights (mobile), November 2026"
(Verified on mobile, 11 Nov 2026. Do not mention the performance score.)

Image alt examples: "AQ Air website hero section on desktop", "Animated live air-quality panel on the AQ Air website", "AQ Air website on mobile"

Related: **Websites for startups** → `/web-design-for-startups/` · **Website development services in Kerala** → `/services/web-development/`
Next project: Serene Derma →

---

# PAGE: Case study — Serene Derma

- **URL:** `/work/serene-derma-seo/`
- **Primary keyword:** dermatology clinic SEO case study
- **Title:** Serene Derma — Healthcare SEO Case Study | Jibin Johnson
- **Meta description:** How I led the SEO team for Serene Derma, a dermatology clinic, using keyword strategy, on-page and content optimisation to rank target keywords.
- **Schema:** Article, BreadcrumbList · datePublished / dateModified: 2026-11-11

Breadcrumb: Home › Work › Serene Derma

**H1: Serene Derma: SEO for a dermatology clinic**

Meta strip: Client: Serene Derma (Serene Skin & Laser Centre) · Industry: Dermatology / healthcare · Role: SEO team lead · Year: 2026 · Website: https://serenederma.com/ · Locations: Vazhuthacaud, Thiruvananthapuram and Kilikolloor, Kollam · Services: keyword research, on-page SEO, technical SEO, content optimisation, competitor analysis

**H2: Overview**
Serene Derma (Serene Skin & Laser Centre) is a dermatology clinic offering skin, hair and laser care — including laser treatments, skin tightening, injectables, hair transplant and hair-loss therapy, and medi-facials — across two locations in Kerala. It wanted more patients to find it through Google for its treatments and locations.

**H2: The challenge**
Healthcare search is competitive and trust-sensitive. Patients search by treatment and location, and Google holds health content to higher quality standards. The clinic needed to appear for high-intent treatment searches with content that was accurate and trustworthy. Two locations meant the strategy had to target treatment searches in both Trivandrum and Kollam.

**H2: What I did**
- Led the SEO team and coordinated optimisation work
- Planned keyword strategy around treatments and locations, prioritising high-intent local searches
- Implemented on-page and content optimisation across key pages
- Ran a structured content workflow, from drafting through client review and approval to publication
- Supported link building and competitor analysis
- Tracked performance in Google Search Console and Google Analytics

**H2: Outcome**
Rankings achieved for multiple target keywords through team-led, collaborative SEO. [Add a table: keyword · position before · position after · time, or a Search Console clicks chart.]

Related: **SEO for clinics** → `/seo-for-healthcare-clinics/` · **SEO services in Kerala** → `/services/seo/`
Next project: BlackBox Learning →

---

# PAGE: Case study — BlackBox Learning

- **URL:** `/work/blackbox-learning-seo/`
- **Primary keyword:** education SEO case study
- **Title:** BlackBox Learning — Education SEO Case Study | Jibin Johnson
- **Meta description:** How keyword research, course page optimisation and link building improved organic visibility for BlackBox Learning, a training platform.
- **Schema:** Article, BreadcrumbList · datePublished / dateModified: 2026-11-11

Breadcrumb: Home › Work › BlackBox Learning

**H1: BlackBox Learning: SEO for a training platform**

Meta strip: Client: BlackBox Learning · Industry: Education / tech training · Location: Thiruvananthapuram · Role: SEO lead · Credit: Website by Prception Medialab, where I work · Year: 2026 · Website: https://blackboxlearning.in/ · Services: keyword research, on-page and off-page SEO, content optimisation, link building, competitor analysis

**H2: Overview**
BlackBox Learning is a Thiruvananthapuram training institute offering courses in AI (Generative AI, Agentic AI, Machine Learning), programming and web development (Python, Full Stack, MERN, React), automation, and digital marketing (SEO, Google Ads, Meta Ads). It wanted more students to find its courses through organic search.

**H2: The challenge**
Course keywords are competitive, with large ed-tech platforms and many local institutes in the results. The institute's many course pages were competing with large national ed-tech platforms for the same course keywords. Students compare several options before enquiring.

**H2: What I did**
- Conducted keyword research and competitor analysis for course-related searches
- Optimised course pages and SEO content
- Planned keyword targeting around education and training terms, including location-based queries
- Built backlinks and ran off-page SEO
- Managed the content workflow and reported performance through Search Console and Analytics

**H2: Outcome**
Improved organic visibility and rankings for multiple target keywords in the education and training niche. [Add numbers.]

Related: **SEO for training institutes** → `/seo-for-education-institutes/` · **SEO services in Kerala** → `/services/seo/`
Next project: SEO Dashboard →

---

# PAGE: Case study — SEO Dashboard

- **URL:** `/work/seo-dashboard/`
- **Primary keyword:** SEO dashboard Django project
- **Title:** SEO Dashboard — Django Project | Jibin Johnson
- **Meta description:** A custom SEO management dashboard I'm building in Python and Django to centralise rankings, backlinks, campaigns, approvals and reporting.
- **Schema:** Article (or SoftwareApplication once launched), BreadcrumbList · datePublished / dateModified: 2026-11-11

Breadcrumb: Home › Work › SEO Dashboard

**H1: SEO Dashboard: one place for every SEO project**

Meta strip: Type: Personal product · Stack: Python, Django, PostgreSQL · Year: 2026 · Status: In development

**H2: Why I'm building it**
Managing SEO for several clients means juggling spreadsheets, Search Console tabs, backlink lists and approval emails. I'm building a single platform that brings it all together, reduces manual work, and makes decisions data-driven.

**H2: What it will do**
- Central storage for SEO project data across clients
- Keyword ranking and performance analysis
- Backlink tracking and management
- Campaign monitoring and content approval workflows
- Data visualisation and reporting
- A scalable structure for many projects at once

**H2: Tech stack**
Python · Django · PostgreSQL · Pandas · Matplotlib / charting · [add others]

**H2: Status**
In development. [Add screenshots and progress updates as it grows. Consider a blog post series about building it.]

Related: **SEO services** → `/services/seo/` · **About me** → `/about/`
Next project: AQ Air →

---

# PAGE: Resume

- **URL:** `/resume/`
- **Title:** Resume | Jibin Johnson, Web Developer & SEO Expert
- **Meta description:** Experience, skills and education of Jibin Johnson, web developer and SEO expert in Thiruvananthapuram. View online or download the PDF.
- **Schema:** ProfilePage, BreadcrumbList

**H1: Resume**

Button: **Download PDF** → `/jibin-johnson-resume.pdf`

**H2: Summary**
Web Developer and SEO Specialist building responsive, search-optimised websites and managing SEO campaigns for clients in healthcare, education, hospitality and maritime real estate. Ranked multiple target keywords into top positions through technical, on-page and off-page optimisation. Currently building a full-stack SEO management dashboard in Python and Django.

**H2: Experience**
**Web Developer & SEO Specialist (Team Lead)** — Prception Medialab, Thiruvananthapuram · Jan 2026 – Present
- Developed responsive, mobile-friendly websites for clients across healthcare, education, hospitality and maritime real estate
- Contributed to planning, UI/UX design and front-end development for an international maritime real estate and hospitality company
- Led the SEO team for Serene Derma (healthcare) and BlackBox Learning (education), ranking multiple target keywords into top positions
- Managed keyword research, link building and content workflows from drafting through client approval; reported performance with Google Search Console and Google Analytics

**H2: Projects**
- **AQ Air:** responsive, animation-rich product website (HTML, CSS, JavaScript, Lenis) → `/work/aq-air/`
- **Healthcare and education SEO campaigns:** Serene Derma and BlackBox Learning → `/work/`
- **SEO Dashboard:** Python and Django platform, in development → `/work/seo-dashboard/`

**H2: Education**
- **PG in Artificial Intelligence:** Edure, Thiruvananthapuram · 2024–2025 (certificate Nov 2025)
- **Bachelor of Computer Applications — University of Madras Institute of Distance Education · 2023–2026 · Final results awaited**

**H2: Skills**
- **SEO:** technical, on-page and off-page SEO, keyword research, competitor analysis, content optimisation, link building, local and international SEO, schema markup, Core Web Vitals, reporting
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Astro, responsive design, UI/UX, GSAP, Lenis, accessibility
- **Also:** Python, Django, PostgreSQL, generative AI, NumPy, Pandas
- **Tools:** Git, GitHub, Figma, VS Code, Chrome DevTools, Netlify, Google Search Console, GA4, PageSpeed Insights
- **Soft skills:** team coordination, performance reporting, content workflow management


**Added during build (labels, contact line, share image)**
- Intro label: `Jibin Johnson` (above H1 "Resume")
- Line under the H1: "Web Developer & SEO Specialist · Thiruvananthapuram, Kerala"
- Contact row: jibinjohnsoninfo@gmail.com · +91 77362 08172 · jibinjohnson.in · linkedin.com/in/jibinjohnson · github.com/Jibinjohnson11
- Section labels: `01 — Profile` · `02 — Work history` · `03 — Highlights` · `04 — Study` · `05 — Toolkit`
- Closing buttons (not printed): **Download PDF** · **Start a project** → `/contact/`
- Share image (og/resume.jpg): label "Resume" · title "Jibin Johnson" · subtitle "Web Developer & SEO Expert" · alt "Resume of Jibin Johnson, web developer and SEO expert in Thiruvananthapuram"

---

# PAGE: Contact

- **URL:** `/contact/`
- **Title:** Contact Jibin Johnson | Web Development & SEO Enquiries
- **Meta description:** Start a project or message me on WhatsApp. Web development and SEO for businesses in Trivandrum, Kerala and worldwide.
- **Schema:** ContactPage, BreadcrumbList

Label: `Contact`

**H1: Let's build something worth finding**

Lead:
Tell me about your website, your rankings or your idea. I reply within one working day.

**Form fields**
- Your name *
- Email *
- Phone / WhatsApp
- What do you need? (select): New website · Website redesign · SEO · Website + SEO · Landing page · Something else
- Project timeline (select): As soon as possible · Within 1 month · 1–3 months · Just exploring
- Tell me about your project *
- Button: **Send message**
- Below the button: "No spam, ever. Your details are only used to reply to you."

**Beside the form**
- **Prefer WhatsApp?** Message me directly → WhatsApp button
- **Email:** jibinjohnsoninfo@gmail.com
- **Location:** Thiruvananthapuram, Kerala, India. Available for in-person meetings in Trivandrum and remote work worldwide.


**Added during build (form text, share image)**
- Empty option in both selects: "Choose one"
- Required fields: "*" after the label (screen readers hear "required")
- Error messages: name "Please enter your name." · email empty "Please enter your email address." · email invalid "Please enter a valid email address, like name@example.com." · project "Please tell me a little about your project."
- WhatsApp button text beside the form: **WhatsApp me**
- Share image (og/contact.jpg): label "Contact" · title "Let's build something worth finding" · subtitle "I reply within one working day" · alt "Contact Jibin Johnson: let's build something worth finding"

---

# PAGE: Thank you

- **URL:** `/thank-you/` · **noindex**
- **Title:** Thank You | Jibin Johnson

**H1: Thanks. Your message is on its way.**
I'll reply within one working day. If it's urgent, message me on WhatsApp.
Links: Back to home · See my work · See my services


**Added during build**
- Meta description: Thanks for getting in touch. Your message is on its way, and I'll reply within one working day.
- Label: `Message sent`
- "message me on WhatsApp" is a link to the WhatsApp chat
- Links: Back to home · See my work · See my services → `/services/` (while the blog is hidden; switch back to "Read the blog" → `/blog/` when the first post is published)

---

# PAGE: Blog (index)

- **URL:** `/blog/`
- **Title:** Blog: Web Development & SEO Insights | Jibin Johnson
- **Meta description:** Practical articles on SEO, web performance and website development for businesses in Kerala, written from real client projects.

Label: `Blog`

**H1: Notes on building and ranking websites**

Lead:
Practical guides on SEO, web performance and website development, written from real projects, without the jargon.

Filters: All · SEO · Web development · Local SEO · Case notes

### First post (draft, noindex until finished)

- **URL:** `/blog/website-cost-in-kerala/`
- **Primary keyword:** website cost in Kerala
- **Title:** How Much Does a Website Cost in Kerala in 2026?
- **Meta description:** What decides the cost of a website in Kerala in 2026: the main cost factors, hidden costs to watch for, and how to get a fair, fixed quote.

**H1: How much does a website cost in Kerala in 2026?**

Outline:
1. Quick answer: why there's no single price, and how the type of site (landing page · small business site · business site with blog · e-commerce) changes the scope. No price figures or ranges.
2. **H2: What affects the price:** number of pages, custom design vs template, animation, content writing, SEO setup, integrations
3. **H2: Freelancer vs agency vs DIY builders:** honest pros and cons of each
4. **H2: Costs people forget:** domain, hosting, email, maintenance, content updates, SEO
5. **H2: Cheap websites that cost more later:** slow speed, no SEO, hard to edit, rebuild costs
6. **H2: How to get an accurate quote:** what to prepare before contacting a developer
7. **H2: FAQ:** 4–5 questions
8. CTA → `/services/web-development/`

**Added during build (blog index)**
- **noindex** until the first post is published; switch to index in the same step.
- Featured card (first post): meta "Web development · 12 November 2026 · 8 min read" · summary "What really decides the price of a website, the costs people forget, and how to get a fair, fixed quote."
- Post covers: `.cover--type`, label "Blog", theme word = the category (e.g. "Web development")
- Filter empty state: "No posts in this topic yet. More are on the way."
- Note under the posts (delete once there are more posts): "More articles are on the way: local SEO for Trivandrum businesses, Core Web Vitals in plain language, and choosing between WordPress and a hand-coded site."
- Closing line: "Have a question these posts don't answer? **Ask me →**" `/contact/`
- Share image (og/blog.jpg): label "Blog" · title "Notes on building and ranking websites" · subtitle "Practical guides from real projects" · cover word "Writing" · alt "Blog by Jibin Johnson: notes on building and ranking websites"

**Added during build (every post, from templates/post.html)**
- Meta line: "By Jibin Johnson · Published [date] · Updated [date] · [n] min read" (words ÷ 200, rounded up)
- Table of contents heading: "On this page"
- Author box: label "Written by" · "Jibin Johnson" · "I'm a web developer and SEO expert in Thiruvananthapuram, Kerala. I build fast, hand-coded websites with SEO built in, and I write here about what I learn from real projects." · link "More about me →" `/about/`
- Closing CTA: label "Next step" · buttons **Start a project** → `/contact/` · **WhatsApp me** (prefilled message)

**Added during build (first post: website cost in Kerala)**
- Status: written and built, **noindex** for review. 1,505 words, 8 min read. Full text lives in `site/blog/website-cost-in-kerala/index.html`.
- H2s: The quick answer · What affects the price · Freelancer vs agency vs DIY builders · Costs people forget · Cheap websites that cost more later · How to get an accurate quote · FAQ
- FAQ questions: Why don't you list website prices on your site? · How long does it take to build a business website? · Is WordPress cheaper than a hand-coded website? · Will I have to pay again every year? · Should I choose a fixed quote or an hourly rate?
- Internal links: "web developer in Trivandrum" → `/web-developer-trivandrum/` · "website development services in Kerala" → `/services/web-development/` (in "here's how my … work") · CTA "website development services in Kerala" → `/services/web-development/`
- CTA: **H2: Want a clear quote for your website?** "Tell me what you're building. I'll reply within a day with honest advice and a fixed quote that lists exactly what's included. Or read about my website development services first."
- Share image (og/website-cost-in-kerala.jpg): label "Blog · Web development" · title "How much does a website cost in Kerala?" · subtitle "What decides the price in 2026" · alt "How much does a website cost in Kerala in 2026? A blog post by Jibin Johnson"

---

# PAGE: Privacy policy

- **URL:** `/privacy/`
- **Title:** Privacy Policy | Jibin Johnson
- **Meta description:** How jibinjohnson.in collects, uses and protects your information when you use the contact form or browse the site.

**H1: Privacy policy**

Last updated: [date]

**H2: What I collect**
When you use the contact form, I receive the details you enter: your name, email, phone number and message. The website also uses Google Analytics 4 to understand how visitors use the site, which collects anonymous usage data such as pages visited, device type and approximate location.

**H2: How I use it**
Your contact details are used only to reply to your enquiry and discuss your project. I don't sell or share them with anyone else.

**H2: Where it's stored**
Form submissions are processed by Netlify, the website host, and delivered to my email. Analytics data is processed by Google.

**H2: Cookies**
Google Analytics uses cookies to measure visits. You can block cookies in your browser settings at any time.

**H2: Your rights**
You can ask me to show, correct or delete any personal information I hold about you by emailing jibinjohnsoninfo@gmail.com.

**H2: Contact**
Questions about this policy? Email jibinjohnsoninfo@gmail.com.

[Have a professional review this if you start collecting more data or work with clients outside India.]


**Added during build**
- Label: `Privacy` · Last updated: 12 November 2026

---

# PAGE: 404

- **File:** `/404.html` · **noindex**
- **Title:** Page Not Found | Jibin Johnson

**H1: This page took a wrong turn**
The page you're looking for doesn't exist or has moved.
Links: **Home** · **Services** · **Work** · **Contact**


**Added during build**
- Meta description: This page doesn't exist or has moved. Find your way back to Jibin Johnson's work, services or contact page.
- Label: `Page not found` · a large outlined "404" sits behind the heading (decorative)

---

# PAGE: Style guide (internal)

- **URL:** `/styleguide/` · **noindex, nofollow** · not in the sitemap
- **Title:** Style guide | Jibin Johnson

**Added during build**
- Meta description: Internal style guide for jibinjohnson.in: colours, type, spacing and components.

---

## Final pre-publish checklist

- [ ] All `[brackets]` filled or removed
- [ ] Client names spelled correctly, with permission to use them
- [ ] No prices, price ranges or ₹ figures on any page, FAQ or schema
- [ ] Every title ≤ 60 characters, every description ≤ 155
- [ ] Each primary keyword used on one page only
- [ ] Every page links to at least two other relevant pages
- [ ] FAQ schema text matches the visible FAQ text exactly
