# Velaro website validation report

Reviewed on 8 October 2026 in the Windows workspace and the Linux deployment workflow. This report covers the public `velaro-website` repository; the sibling private platform was not modified.

## SEO and indexing audit, 8 October 2026

The live baseline (`1638bb3`) had no observed crawl/indexing blocker across its 20 sitemap pages. This audit checked every public page, canonical URL, title, description, internal destination, unknown-route response and sitemap entry, plus the application and Cloudflare configuration. The existing Google Search Console domain property was subsequently accessible through the signed-in browser, and sitemap resubmission was confirmed. Crawl eligibility and sitemap submission are not proof that every current page is indexed or ranked.

| Finding | Change / verification |
| --- | --- |
| Service titles could communicate the offer more precisely | Added descriptive search titles for business process automation, web/e-commerce development and custom software/white-label platforms; Contact uses `Contact Us`. Every page has a unique title and description. |
| Search engines needed a consistent site/business identity | Added homepage `WebSite` data and stable `Organization`/`Service` IDs, original logo and linked provider references. JSON-LD is safely serialized and matches visible business information. No invented reviews, results or addresses. |
| Demonstration headings distracted from the real page outline | Replaced simulated interface headings with styled labels; retained meaningful page/section headings. |
| New CMS content could outlive a build-only collection/sitemap | Explicit five-minute request-driven revalidation covers Work, categories, details and sitemap. Release checks discover new sitemap routes automatically and check incoming internal links. |
| Configured CMS failure could hide published projects | Validate successful collections before caching; propagate sanitized errors instead of silently substituting local concepts. No-CMS mode remains local. Failed regeneration can retain the last successful output. |
| Category pages carried hidden cards and header code carried full service copy | Filter cards on the server and use lightweight service navigation data. Category copy is shared between visible content and metadata. |
| Optimized bundled images lacked durable cache headers on the baseline Worker | Static imports create fingerprinted image sources suitable for immutable caching. Original brand/photo PNGs are unchanged. Production checks require immutable optimized responses. |
| Deployment aliases could compete with the canonical website | Host-specific `noindex` on `workers.dev`; public `www` remains indexable. `SITE_NOINDEX=1` consistently covers static and dynamic metadata/headers, with robots allowing crawlers to read that directive. |

Local validation passed full ESLint and the TypeScript production build. The normal production candidate passed **918 checks**, covering 20 pages, 51 internal destinations, five permanent legacy redirects, four unknown-route 404/noindex responses, two contact selections, three optimized images, tracking-query canonicals, crawler-user-agent responses, JSON-LD identities and sitemap discovery. A separately built `SITE_NOINDEX=1` candidate passed **916 checks**; both home and request-rendered Contact returned `noindex, nofollow` in metadata and response headers. The normal build was restored afterward. Linux Worker and exact-release public verification run in the workflow associated with this change.

CMS fixtures covered local mode, valid merge/override and sanitized rejection of invalid records, duplicates, invalid JSON, HTTP failure, network failure and timeout. Those fixtures mocked the persistent-cache wrapper; they do not establish a real Sanity publication or Cloudflare failed-refresh integration. No live CMS is configured. Production build output confirms five-minute revalidation for the collection, categories, details and sitemap.

The [Google PageSpeed mobile baseline report](https://pagespeed.web.dev/analysis/https-www-velaro-group/fxnm2kxk5b?form_factor=mobile), captured at 22:06 GST on 8 October, scored **99 performance, 100 accessibility, 100 best practices and 100 SEO**. Its emulated slow-4G mobile run measured FCP **1.1s**, LCP **2.0s**, total blocking time **10ms**, CLS **0** and speed index **1.6s**. This measured the live pre-audit release, not every page or the later candidate. Google reported **no real-user data**, so field Core Web Vitals are unverified. Lighthouse's SEO score covers a subset of SEO checks and does not establish indexing; automated accessibility checks also have limited scope.

Cloudflare's inspected configuration had no public-host blocking rule, Bot Fight Mode or AI crawler block. Googlebot, Bingbot and Twitterbot user-agent requests received complete server-rendered pages; these requests do not prove access from Google's verified crawler IPs. Existing HTTPS/apex redirects preserve path/query, while canonicals remove contact/tracking variations. Unknown URLs correctly stay 404. The sitemap omits fabricated modification dates.

Responsive candidate screenshots sampled the revised Work collection at 320px, 390px and 820px; its filter, description and card layout remained readable without visible overlap in the captured area. Previous broader responsive evidence remains below. Audit artifacts are in the parent workspace's `.workspace-logs/seo-audit/`.

Before substantial portfolio growth, optimize remote CMS covers, use separate summary/detail/sitemap queries, add pagination and measure representative content. KV remains eventually consistent; instant publication needs additional coordinated cache infrastructure. These are future growth requirements, not current indexing blockers. New genuine case studies should use approved evidence; the six bundled examples remain labeled concepts.

### Published release and Google submission

Commit `59410ddf9339e87a52e3e69ab46d1a4a05904730` passed the full [GitHub/Cloudflare workflow](https://github.com/VelaroGroup/Velaro-Portfolio/actions/runs/37823801142): **938** checks in each local Next/Worker runtime, **928** on the intentionally non-indexable Worker alias, and **937** on the public domain. An independent public-domain repeat also passed all 937 checks, with normal TLS validation and the expected release on all 20 pages. All three fingerprinted optimized images returned WebP and immutable cache headers; the alias returned noindex and the public pages remained indexable.

The [post-deployment mobile report](https://pagespeed.web.dev/analysis/https-www-velaro-group/2mbyoi5xml?form_factor=mobile), captured at 22:32 GST, scored **95 performance, 100 accessibility, 100 best practices and 100 SEO**, with FCP **1.4s**, LCP **2.6s**, total blocking time **0ms**, CLS **0** and speed index **3.9s**. This supersedes the baseline as the latest measured run. Lab timing varies; neither run establishes field Core Web Vitals. The earlier efficient-cache-lifetime warning was absent after the immutable-image fix. Remaining diagnostics include approximately 15KiB unused CSS and 29KiB unused JavaScript, to revisit alongside future content growth.

In the existing `velaro.group` Search Console property, `https://www.velaro.group/sitemap.xml` was already registered. It was resubmitted after deployment and Google displayed **“Sitemap submitted successfully.”** The index-coverage report predates this release; it must be allowed to update before assessing the new 20-page collection. Private account/report observations and the submission screenshot remain in the parent workspace, outside the public repository. A fresh URL-level inspection of every page was not completed, and no claim of all-page indexing is made.

The robots sitemap declaration also supports discovery. Guidance was checked against Google's [technical requirements](https://developers.google.com/search/docs/essentials/technical), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [site-name data](https://developers.google.com/search/docs/appearance/site-names), [Organization data](https://developers.google.com/search/docs/appearance/structured-data/organization) and [OpenNext image behavior](https://opennext.js.org/cloudflare/howtos/image).

## Release scope

- Rebuilt the public website around custom automated platforms, discovery of repetitive work, connected operations and messaging workflows.
- Restored Velaro’s original blue/cyan mark, navy/blue/cyan palette and locally loaded Inter throughout; kept the exact VELARO wordmark without trailing punctuation.
- Used typed service data and shared layouts across the homepage, four services, Work, four categories, six concept details, About and Contact.
- Kept illustrative inbox/channel and business-challenge interactions, with concepts clearly distinguished from client case studies and live integrations.
- Improved narrow layouts, preview readability, navigation resize/blur behavior, form validation and shared error recovery.
- Added a static 1200×630 Open Graph image and a 20-URL sitemap, including the preserved privacy and terms pages, without fabricated modification timestamps.
- Added production response headers, restricted image optimization, optional standalone output, preview noindex support and deployment documentation.
- Updated Next.js and its ESLint configuration to 16.3.8, with compatible transitive security fixes in the lockfile and pnpm workspace policy.

## Service positioning and browsing update, 8 October 2026

- Rebalanced the homepage around all four core services, followed by a dedicated custom business platform and white-label specialty section, websites/e-commerce examples, automation, About Us and a shared project process. Updated service copy and social metadata consistently.
- Made About Us explicit in desktop and compact navigation and added the `/about-us` permanent redirect. Its page retains the original logo, story and brand pillars.
- Replaced differing Work category layouts with one shared frame, scroll-preserving framework links, active filters, counts and a result announcement. Kept server-rendered project cards and public category metadata separate from the client interaction layer.
- Rebuilt the four challenge panels with numbered steps, natural shared height, inactive inert scenes, concise announcements and reduced-motion behavior. Fixed nested preview-heading and mobile icon CSS conflicts found during review.
- Full lint, TypeScript production compilation and Next build passed. Local production verification passed **696 checks** across 20 pages, 51 internal destinations, five legacy redirects, three unknown routes and three optimized images.
- Browser keyboard interaction confirmed that Work switches from All work to Automation with the correct URL, title and result count; About Us opens from navigation; and all four challenge states expose the correct content and ordered steps.
- Fixed-clip capture subsequently recovered. Reviewed the published desktop homepage and local real-page previews at 320px, 390px and 820px for the homepage, Work filters and challenge section. No overlap was visible in the sampled areas. Corrected joined words in the mobile Work heading and strengthened the mobile challenge-icon selector after this review. Evidence is in the parent workspace's `.workspace-logs/website-brand-review/` (`home-all-services-live.png` and `responsive-*-320-390-820.png`). These samples do not establish every page section or browser; exact scroll-position measurement remained unavailable.
- The main update, commit `33335c3`, passed the full [Cloudflare workflow](https://github.com/VelaroGroup/Velaro-Portfolio/actions/runs/37811891509), with **716 exact-release checks** on the public domain. The small responsive follow-up retains the same pipeline and requires its own successful workflow.
- Publication uses the existing push-to-master Cloudflare workflow, including Worker runtime and exact-release public-domain checks. The workflow associated with this update records its final deployment result.

## Earlier brand fidelity evidence, 8 October 2026

- Matched the existing Velaro document identity: navy, royal/action blue, cyan, cool white surfaces and Inter. The supplied square mark is copied unchanged and used in the header/footer, concept previews, About, browser icons, organization metadata and sharing card.
- Rebuilt About around the original public studio story, Lebanon and Middle East positioning, velocity name origin, and Velocity/Vision/Value principles. The current custom platform and automation offer is integrated with that story.
- Full ESLint, TypeScript and Next production build passed. Local production verification passed **692 checks** across 20 pages and 52 internal destinations, including the optimized mark, square PNG browser icons and 1200×630 sharing card.
- Inspected the revised About page on desktop and at 390px, the homepage at 320px, and the custom platform service page at 900px. These observed layouts showed no text/element overlap. Existing responsive grid and reduced-motion rules remain.
- Darkened concept-card captions and contact field boundaries after contrast review. Channel/status colors and distinct illustrative client branding remain separate from Velaro’s marketing palette.
- This review used screenshots and accessible page structure. Browser automation could not dispatch interactive click/evaluate commands in this session, so it does not establish a fresh full interactive or accessibility audit.
- Cloudflare publication uses the existing GitHub workflow, including isolated Worker verification and post-deployment public-domain checks. Inspect the workflow for the commit carrying this update for its release result.

## Earlier local automated evidence

These results describe the local release candidate before Cloudflare deployment preparation. The later launch evidence below supersedes the earlier page counts and hosting status.

| Check | Recorded result |
| --- | --- |
| Frozen dependency installation | Passed, including an offline repeat using the locked packages |
| ESLint | Final full-repository check passed with no warnings or errors |
| TypeScript | Final `next typegen && tsc --noEmit` and production compilation passed |
| Next.js 16.3.8 production build | Final build passed, including all six known project details, with 23 generated routes |
| Development HTTP verification | 475 checks passed across 18 public pages and 47 internal destinations |
| Production HTTP verification | Final 602 checks passed across 18 pages, including production framing and social-image checks |
| Production dependency audit | 0 critical, high, moderate or low advisories at review time |
| Configuration checks | Production-only frame protection and optional standalone configuration passed |
| Content checks | Local/CMS merge, duplicate and malformed records, nullable fields, missing CMS configuration, preserved concept slugs and safe fallback behavior covered during integration |
| Whitespace check | Passed during integration |

The HTTP checks cover unique meaningful titles, one main landmark and h1, clean headings, exact header/footer wordmarks, English document language, responsive viewport metadata, descriptions and canonical URLs, parseable structured data, internal route/hash destinations, unknown-route 404s, contact service preselection, response security headers, robots/sitemap coverage, valid optimized photos and rejection of unapproved image-source queries. They issue read-only requests and do not send messages.

The earlier integrated production run included project-detail prerendering, shorter contact labels, About spacing, route-specific sharing metadata and the generated sharing image. The image returned a valid 1200×630 PNG and was visually reviewed. The project-detail response also confirmed `s-maxage=300` caching. At that review, the compiled candidate ran locally at http://127.0.0.1:3001/ and development used port 3000. These local responses are not evidence of live hosting behavior.

## Cloudflare launch evidence, 8 October 2026

The initial [GitHub Actions deployment run 37799387456](https://github.com/VelaroGroup/Velaro-Portfolio/actions/runs/37799387456) completed successfully. Its Linux checks covered the production build, OpenNext Worker build, local Worker runtime verification, deployment and post-deployment HTTP verification at [the Worker address](https://velaro-portfolio.weathered-mud-0703.workers.dev). This establishes a successful deployed Worker independently of the earlier Windows adapter packaging failure.

| Check | Recorded launch result |
| --- | --- |
| Manual candidate HTTP verification | 672 checks passed across 20 public pages, 51 internal destinations and four legacy redirects; this is candidate verification, separate from the live Worker check |
| Linux CI and automatic deployment | Initial run passed, including local runtime checks and live Worker HTTP verification |
| Final production dependency audit | 0 critical, high, moderate, low or informational advisories across 601 packages (460 dependencies and 141 optional dependencies) |
| Source credential-pattern scan | 0 findings in 163 text files from 180 tracked or intended untracked files; 17 binary assets excluded. The scan did not read the access-token file or print credential values |
| Preserved public policy routes | Privacy and terms retained; the sitemap contains 20 public URLs |
| Domain cutover rehearsal | Initial attachment preserved all 17 other DNS records. Custom-domain checks exposed a hostname redirect loop, so both old DNS destinations were restored while the corrected candidate is verified. |
| Corrected deployment | [GitHub Actions run 37801008410](https://github.com/VelaroGroup/Velaro-Portfolio/actions/runs/37801008410), commit `33d9c58`, passed both runtime suites, deployment, and live Worker verification. Version `99263a5d-dd1c-4f21-a9c1-3641f2f9cb48`. |
| Final-domain HTTPS and redirects | **680 checks passed** on `https://www.velaro.group` after reattachment: 20 pages, 51 internal destinations, four legacy redirects, three unknown routes, two contact selections, optimized photos, metadata, sitemap, and real HTTP/HTTPS/apex redirects preserving paths and queries. Public DNS resolvers were used because the local system resolver retained a negative www lookup; normal TLS hostname/certificate verification remained enabled. |
| DNS preservation | Both exact custom domains now route to `velaro-portfolio`. All 17 other records, including Google Workspace MX and application subdomains, match the pre-migration snapshot. Squarespace registration is unchanged. |

The live Worker check uses `https://www.velaro.group` as the expected canonical origin. The separate custom-domain suite additionally exercised HTTPS and the real apex/HTTP redirects. Dependency and credential scans are dated checks within the stated scope, not an exhaustive security assessment.

## Responsive visual review

Fresh screenshot review in the browser covered these launch-pass samples:

| Viewport width | Page / coverage |
| --- | --- |
| 320 px | Homepage and Contact visible layouts |
| 390 px | About (including a fresh screenshot after the spacing fix), Automation hero/benefits, and workflow project-detail heading/diagram/content |
| 800 px | Contact; Work intro, featured example, filters and the start of the concept grid |
| 1024 px | Custom-platform hero, workspace preview and benefits section |
| Desktop, 1536 px captured width | Final production homepage hero, navigation, inbox preview and note |

Earlier refactor review also inspected the desktop homepage and portfolio, and mobile homepage, custom-platform and contact layouts. Contact service preselection and typing into the name field were confirmed in that earlier browser session.

Fixed-clip screenshots worked after fresh navigation/reload. No visible overlap was observed in these captured areas. Some automated clicks, DOM evaluation and full-page captures still timed out in the browser-control layer, so pixel-boundary measurements and complete click-through coverage were unavailable. The sampled screenshots and source review do not establish complete coverage of every page section, viewport, browser or interaction.

Launch evidence is stored in the parent workspace at `.workspace-logs/website-launch-review/`, including `home-release-desktop.jpg`, `home-320.jpg`, `contact-320.jpg`, `contact-800.jpg`, `about-390-final.jpg`, `work-800.jpg`, `custom-platform-1024.jpg`, `automation-390.jpg`, `project-detail-390.jpg` and `social-card.png`. Earlier evidence is in `.workspace-logs/website-refactor-review/`.

## Dependency and hosting boundaries

### Cloudflare deployment preparation, 8 October 2026

The deployment path now uses pinned OpenNext 1.20.9 and Wrangler 4.148.0, with KV incremental caching, a Durable Object revalidation queue and an Images binding. It preserves the standard Next build. Four explicit old-site redirects and the apex-to-www host redirect were added. Privacy and terms routes are retained, bringing the public route collection and sitemap to 20 pages. Design review artifacts remain local and ignored.

The earlier Windows OpenNext attempt passed the Next.js compilation, TypeScript stage and generation of the then-current 23 build routes. Adapter packaging subsequently stopped with `EPERM` while creating a directory symlink under `.open-next`. No workaround was applied to framework code or machine permissions. That attempt did **not** establish a successful Worker build, dry-run or runtime verification. The subsequent successful Linux deployment and runtime checks are recorded in the Cloudflare launch section above; the earlier Node production verification remains evidence for the Next artifact only.

The Cloudflare adapter introduced an older `brace-expansion` transitive version; the workspace now pins its compatible 5.0.12 security patch. Exact-version release-age exceptions cover only the explicitly reviewed Cloudflare toolchain releases, retaining the normal seven-day rule elsewhere. Dependency audit results below describe the earlier launch pass; the deployment workflow must use the final lockfile, and new audit results supersede those dated counts.

KV was selected because the deployment account has KV available while R2 requires separate dashboard activation. Timed ISR and deployment cache seeding remain supported, with KV's eventual-consistency limitation documented in the deployment guide. No immediate cross-region publication guarantee is made. R2 remains the recommended future option if update volume or consistency needs increase.

Before Cloudflare preparation, the full development/alternate-worker audit reported **48 advisories: 25 high, 17 moderate and 6 low**, including inherited tool chains and an unpatched `braces` advisory. These are historical counts, not a current audit of the final Cloudflare lockfile. The final production dependency audit is clean, as recorded above. No blind major-version replacements were made to suppress earlier findings. Keep development tools private and review alternate-worker dependencies before choosing another deployment target.

The standard Next production target was built and checked locally. Optional standalone output was checked at configuration level; a packaged standalone artifact needs its own runtime validation. The alternate Vinext adapter and a live Sanity Studio publishing workflow were not exercised. The OpenNext Cloudflare deployment was subsequently verified through the Linux workflow above.

The CI workflow in `.github/workflows/website.yml` pins official action revisions and runs locked installation, lint, type checking, build and production HTTP verification. Its later Cloudflare stages verify the local Worker runtime, deploy on a push to `master` and check the deployed Worker. The successful initial remote run is linked above.

Before this Cloudflare release, the local refactor had not changed any hosting account, domain certificate, DNS record or old deployment. Hosting, domain attachment and the final-domain HTTPS checks subsequently passed as recorded above. Mailbox reception remains an owner check. The old sitemap was later retrieved using its verified Vercel origin, and the observed legacy routes are preserved or permanently redirected.

## Product behavior and remaining manual checks

- Contact prepares an email draft and offers copy/manual fallback. It does not send or store submissions on the server. No real email was sent during testing; confirm the mailbox and email/copy behavior on supported desktop and mobile clients.
- Social messaging and platform interfaces are illustrative. No live social account was connected and no customer messages were automated. Production integrations require approved channel/account access and a separately implemented backend.
- Confirm all public business details, any genuine case studies, the final canonical domain and hosting configuration before promotion.
- Complete menu, keyboard, form and demonstration interaction checks in supported browsers before promotion; the automation tool could not dispatch all of these reliably.
- Production HTTP verification and redirect/social metadata checks passed on the HTTPS domain. Search-console sitemap submission and mailbox reception are separate owner checks. Preserve the recorded known-good release for rollback.

## Asset and policy references

Supporting photographs in `public/images/concept-architecture.png` and `public/images/concept-ceramics.png` were generated with built-in ImageGen. Exact prompts and provenance are retained locally in `design-concepts/implementation-image-notes.json`; design review artifacts are excluded from the public repository. Font source notes and licenses are in `public/fonts/`.

Channel planning should recheck the official documentation because account, region and feature eligibility vary:

- [WhatsApp Business policy](https://whatsappbusiness.com/policy/)
- [Meta Instagram API](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api)
- [Meta Messenger Send API](https://www.postman.com/meta/messenger-platform-api/folder/vilwbh4/send-api)
- [TikTok automated business messages](https://ads.tiktok.com/resources/help/article/navigate-auto-message-business-accounts?lang=en)
- [TikTok Business Messaging API](https://business-api.tiktok.com/portal/bm-api/education-hub)

Security patch rationale was checked against the maintainers’ [Next.js image-generation advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j), [Next.js self-hosted cache advisory](https://github.com/vercel/next.js/security/advisories/GHSA-4jqv-mc3x-m676) and [Sharp advisory](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w). Audit results are a dated dependency check, not an exhaustive security assessment.

## Work collection expansion — 9 October 2026

The bundled collection now contains twelve clearly labelled illustrative concepts, with six additions: a white-label client portal, field-service operations, appointment booking automation, supplier onboarding, B2B ordering, and a hospitality website. Each new concept has its own responsive server-rendered interface preview, business scenario, and four-step proposed workflow. No delivered-client or measured-performance claims were added. The white-label platform is featured, and the homepage links to three curated concepts. The sitemap contains 26 public pages.

Validation of this candidate:

- Repository ESLint and scoped preview/homepage ESLint passed; the final Next.js production build and TypeScript compilation passed.
- Final local production verification passed **1,150 checks across 26 pages**, 63 internal destinations, five legacy redirects, four unknown routes, two contact selections and three optimized images, including metadata, canonical URLs, indexability and sitemap coverage.
- Browser review used real production pages in 320px, 390px and 820px viewport frames, plus the actual production preview HTML and CSS at 252px and 600px component widths. The browser viewport override and some scroll/capture commands were unreliable, so a temporary read-only local review helper provided fixed-width views. This is sampled visual evidence, not a claim of exhaustive browser/device coverage.
- Narrow review found a selected appointment time wrapping across lines. The final CSS keeps times together and uses two columns below 300px component width; the rebuilt narrow screenshot confirms the fix. No overlap was observed in the other inspected preview areas.
- Screenshots and temporary helper files are private, outside the public repository, under `.workspace-logs/work-expansion/` in the parent workspace. Key captures: `work-responsive.png`, `samples-narrow-top.png`, `samples-narrow-lower.png`, and `samples-desktop-top.png`.

The release workflow performs the authoritative Linux Worker build, runtime checks, deployment and public-domain verification after this candidate is pushed. Consult its run for deployment status; the local checks above do not by themselves establish a completed Cloudflare deployment.
