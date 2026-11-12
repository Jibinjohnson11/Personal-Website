# New blog post checklist

Follow these steps in order for every new post. `<slug>` is the short URL name, lowercase and hyphenated (e.g. `local-seo-trivandrum`).

## 1. Plan

- [ ] Pick **one primary keyword** (a long-tail question). Check it isn't the primary keyword of any other page (see the keyword map in `docs/design-system.md` and `docs/website-content.md`).
- [ ] Pick the category: SEO · Web development · Local SEO · Case notes.
- [ ] Pick the **one service page** the post will link to (keyword as anchor text where it reads naturally).
- [ ] Add the post's title, description, H1 and outline to `docs/website-content.md` under "PAGE: Blog (index)".

## 2. Copy the template

```bash
mkdir -p site/blog/<slug>
cp templates/post.html site/blog/<slug>/index.html
```

Never copy another live post.

## 3. Fill in the `<head>`

Search the file for `TODO` and fill in every one:

- [ ] `<title>`: ≤ 60 characters, keyword first
- [ ] meta description: ≤ 155 characters
- [ ] canonical, `og:url`: `https://jibinjohnson.in/blog/<slug>/` (trailing slash)
- [ ] `og:title` / `twitter:title` = the title; `og:description` / `twitter:description` = the description
- [ ] `og:image` / `twitter:image`: `https://jibinjohnson.in/assets/img/og/<slug>.jpg`, plus the image alt in both places
- [ ] `article:published_time` and `article:modified_time` (YYYY-MM-DD)
- [ ] Leave robots as `noindex, follow` while drafting
- [ ] JSON-LD **BlogPosting**: headline (= H1), description, image, both dates, `articleSection` (category), `wordCount`, URLs
- [ ] JSON-LD **BreadcrumbList**: position 3 name + URL (same as the visible breadcrumb)
- [ ] JSON-LD **FAQPage**: every question and answer copied **word for word** from the visible FAQ. Delete the block if the post has no FAQ.

## 4. Write the post

- [ ] Breadcrumb: last item = short post title + `/blog/<slug>/`
- [ ] Label `Blog · <Category>`, the H1, the meta line (dates with `<time datetime>`), the lead (keyword in the first ~100 words)
- [ ] Cover: `.cover--type`, label "Blog", theme word = the category. Alternate `cover--wine` / `cover--ink` between posts. (Or a real image: see the comment in the template.)
- [ ] Body: H2s with ids, H3s under them, short paragraphs. No prices, no invented numbers, no `[brackets]` left.
- [ ] Table of contents: one link per H2, same wording, `href="#<id>"`
- [ ] One link to the service page; a second internal link if it's natural
- [ ] Images inside the post: `<picture>` with AVIF + WebP (`npm run images`), width/height, alt, `loading="lazy"`
- [ ] Reading time: words in the article ÷ 200, rounded up. Use the same number in the meta line, the blog card and `wordCount`.
- [ ] CTA at the end: H2 + one line with a link to the related service, buttons Start a project + WhatsApp me

## 5. Add the card to /blog/

In `site/blog/index.html`:

- [ ] The new post becomes the **featured** card (`post-card--featured`, `<h2>` title).
- [ ] Move the previous featured post into the `<ul class="post-grid">` as a normal card (the commented example in the file shows the markup). If the grid doesn't exist yet, uncomment it.
- [ ] Set `data-tags` (space-separated: `seo`, `web-development`, `local-seo`, `case-notes`), the meta line, title, link and one-sentence summary.
- [ ] Add the post to the **CollectionPage** `itemListElement` (newest first, renumber positions).
- [ ] Delete the "More articles are on the way" note once the grid has posts.

## 6. Share image

- [ ] Add an entry to `tools/og-pages.json`:

```json
{
  "file": "og/<slug>.jpg",
  "label": "Blog · <Category>",
  "title": "<Short title>",
  "subtitle": "<Short subtitle>",
  "photo": false,
  "cover": { "label": "Blog", "word": "<Category>", "tone": "wine" },
  "alt": "<Same alt as in the page head>"
}
```

- [ ] Run `npm run og` and look at `site/assets/img/og/<slug>.jpg`.

## 7. Review, then publish

- [ ] Run `npm run sync`, open the page locally, check at 390px and 1440px.
- [ ] Read it once more out loud. Check every link.
- [ ] Set the **real publish date** in: the meta line `<time>`, `article:published_time`, `article:modified_time`, BlogPosting `datePublished` / `dateModified`, and the blog card.
- [ ] Change robots to `index, follow, max-image-preview:large`.
- [ ] **First post only:** do everything in [Launching the blog](#launching-the-blog) below, in the same deploy.
- [ ] Later posts: update the home page Blog section to show the 3 latest posts.

## 8. Deploy

- [ ] `npm run prepare-deploy` (sync + sitemap + checks): 0 errors.
- [ ] Commit and push.
- [ ] In Google Search Console: inspect the post URL and request indexing.

## When you update an old post

- [ ] Change the "Updated" `<time>`, `article:modified_time` and `dateModified` to today.
- [ ] If the FAQ changed, update the FAQPage JSON-LD to match exactly.


## Launching the blog

The blog is hidden until the first post is published: `/blog/` and the draft post exist but are `noindex`, nothing indexable links to them, and they are not in the sitemap or `llms.txt`. Do ALL of this in the same deploy as the first post (search the project for `BLOG` to find every spot).

- [ ] **Header, desktop nav** (`partials/header.html`): replace the `<!-- BLOG: re-add when the first post is published -->` comment with
  `<li><a class="site-header__link" href="/blog/">Blog</a></li>` (between About and Contact).
- [ ] **Header, mobile menu** (same file): replace the comment above Contact with a Blog item, then renumber:
  - Blog: `style="--i: 3"`, number `04`
  - Contact: `style="--i: 4"`, number `05`
  - the `menu__footer` block: `style="--i: 5"`
  - the comment above the menu: "The 01–05 numbers…"
- [ ] **Footer** (`partials/footer.html`, column "More"): replace the comment with
  `<li><a class="site-footer__link" href="/blog/">Blog</a></li>` (between About and Resume).
- [ ] **Home page Blog section** (`site/index.html`): delete the `BLOG START` and `BLOG END` comment lines, point the cards at real published posts only (delete the rest), label it `08 — Writing` and change the Final CTA label to `09 — Next step`.
- [ ] **Thank-you page** (`site/thank-you/index.html`): change the third link from "See my services" → `/services/` back to "Read the blog" → `/blog/`.
- [ ] **index/noindex:** set robots to `index, follow, max-image-preview:large` on `site/blog/index.html` and on the post itself (draft posts stay `noindex`).
- [ ] **Sitemap and RSS:** nothing to edit. `npm run sitemap` (part of prepare-deploy) adds every page that is no longer `noindex`; RSS lists published posts.
- [ ] **llms.txt** (`site/llms.txt`, written by hand): add a `## Blog` section with the blog index and each published post, e.g.
  `- [Blog](https://jibinjohnson.in/blog/): notes on building and ranking websites`
- [ ] **Content doc** (`docs/website-content.md`): put Blog back in Navigation and the Footer "More" column, and the thank-you link back to "Read the blog".
- [ ] `npm run prepare-deploy`: 0 errors, and check the Blog link in the header, mobile menu and footer on one page.
