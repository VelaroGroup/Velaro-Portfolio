# Velaro website validation report

Reviewed on 8 October 2026 in the Windows workspace. This report covers the public `velaro-website` repository; the sibling private platform was not modified.

## Release scope

- Rebuilt the public website around custom automated platforms, discovery of repetitive work, connected operations and messaging workflows.
- Applied the ivory/navy/cyan design, locally loaded Manrope/Inter fonts and exact VELARO wordmark without trailing punctuation.
- Used typed service data and shared layouts across the homepage, four services, Work, four categories, six concept details, About and Contact.
- Kept illustrative inbox/channel and business-challenge interactions, with concepts clearly distinguished from client case studies and live integrations.
- Improved narrow layouts, preview readability, navigation resize/blur behavior, form validation and shared error recovery.
- Added a static 1200×630 Open Graph image and an 18-URL sitemap, without fabricated modification timestamps.
- Added production response headers, restricted image optimization, optional standalone output, preview noindex support and deployment documentation.
- Updated Next.js and its ESLint configuration to 16.3.8, with compatible transitive security fixes in the lockfile and pnpm workspace policy.

## Automated evidence

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

The final integrated production run includes project-detail prerendering, shorter contact labels, About spacing, route-specific sharing metadata and the generated sharing image. The image returned a valid 1200×630 PNG and was visually reviewed. The project-detail response also confirmed `s-maxage=300` caching. The compiled candidate is running locally at http://127.0.0.1:3001/; development remains on port 3000.

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

The Windows OpenNext attempt passed the Next.js compilation, TypeScript stage and generation of the then-current 23 build routes. Adapter packaging subsequently stopped with `EPERM` while creating a directory symlink under `.open-next`. No workaround was applied to framework code or machine permissions. Therefore this attempt does **not** establish a successful Worker build, dry-run or runtime verification; the Linux GitHub workflow must pass those checks before deployment. Existing Node production verification remains evidence for the Next artifact only.

The Cloudflare adapter introduced an older `brace-expansion` transitive version; the workspace now pins its compatible 5.0.12 security patch. Exact-version release-age exceptions cover only the explicitly reviewed Cloudflare toolchain releases, retaining the normal seven-day rule elsewhere. Dependency audit results below describe the earlier launch pass; the deployment workflow must use the final lockfile, and new audit results supersede those dated counts.

KV was selected because the deployment account has KV available while R2 requires separate dashboard activation. Timed ISR and deployment cache seeding remain supported, with KV's eventual-consistency limitation documented in the deployment guide. No immediate cross-region publication guarantee is made. R2 remains the recommended future option if update volume or consistency needs increase.

The production dependency audit is clean after the compatible patches. The full development/alternate-worker audit still reports **48 advisories: 25 high, 17 moderate and 6 low**, including inherited tool chains and an unpatched `braces` advisory. That result is separate from the clean production dependency set. No blind major-version replacements were made to suppress it. Keep development tools private and review the alternate-worker dependencies before choosing that deployment target.

The standard Next production target was built and checked locally. Optional standalone output was checked at configuration level; a packaged standalone artifact needs its own runtime validation. The Cloudflare/Vinext adapter and a live Sanity Studio publishing workflow were not exercised in this launch pass.

The CI workflow in `.github/workflows/website.yml` pins official action revisions and runs locked installation, lint, type checking, build and production HTTP verification. The corresponding commands were validated locally; no successful remote GitHub Actions run is claimed.

No hosting account, domain certificate, DNS record or old deployment was changed. Hosting credentials/target, the old URL inventory and redirect map, mailbox reception and final-domain HTTPS checks remain release requirements. The old live domain could not be resolved during the local fetch, so its complete route inventory was not verified.

## Product behavior and remaining manual checks

- Contact prepares an email draft and offers copy/manual fallback. It does not send or store submissions on the server. No real email was sent during testing; confirm the mailbox and email/copy behavior on supported desktop and mobile clients.
- Social messaging and platform interfaces are illustrative. No live social account was connected and no customer messages were automated. Production integrations require approved channel/account access and a separately implemented backend.
- Confirm all public business details, any genuine case studies, the final canonical domain and hosting configuration before promotion.
- Complete menu, keyboard, form and demonstration interaction checks in supported browsers before promotion; the automation tool could not dispatch all of these reliably.
- After domain attachment, run production verification against the HTTPS domain, review redirects and social sharing metadata, and submit the sitemap. Preserve the old release for rollback.

## Asset and policy references

Supporting photographs in `public/images/concept-architecture.png` and `public/images/concept-ceramics.png` were generated with built-in ImageGen. Exact prompts and provenance are saved in [implementation image notes](design-concepts/implementation-image-notes.json). Font source notes and licenses are in `public/fonts/`.

Channel planning should recheck the official documentation because account, region and feature eligibility vary:

- [WhatsApp Business policy](https://whatsappbusiness.com/policy/)
- [Meta Instagram API](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api)
- [Meta Messenger Send API](https://www.postman.com/meta/messenger-platform-api/folder/vilwbh4/send-api)
- [TikTok automated business messages](https://ads.tiktok.com/resources/help/article/navigate-auto-message-business-accounts?lang=en)
- [TikTok Business Messaging API](https://business-api.tiktok.com/portal/bm-api/education-hub)

Security patch rationale was checked against the maintainers’ [Next.js image-generation advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j), [Next.js self-hosted cache advisory](https://github.com/vercel/next.js/security/advisories/GHSA-4jqv-mc3x-m676) and [Sharp advisory](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w). Audit results are a dated dependency check, not an exhaustive security assessment.
