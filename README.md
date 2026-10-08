# Velaro website

Velaro's public marketing website, built with Next.js 16.3.8, React 19, and TypeScript. The primary offer is custom automated platforms: understand the repetitive work, connect the process, and build useful software around the business. Supporting services cover messaging and workflow automation, websites, and connected e-commerce.

The website is live at **[www.velaro.group](https://www.velaro.group)** on Cloudflare Workers. [velaro.group](https://velaro.group) redirects to www, preserving paths and queries. Both domains are declared in `wrangler.jsonc`. The [workers.dev address](https://velaro-portfolio.weathered-mud-0703.workers.dev) remains available for deployment verification, with a host-specific `noindex` response header; the public domain remains indexable.

Pushes to **`master`** automatically run the GitHub checks, build and verify the Next and Workers runtimes, deploy to Cloudflare, and verify the deployed website. Pull requests and `main` pushes run checks without deploying. See [deployment instructions](DEPLOYMENT.md) for configuration, release checks and rollback by reverting a source change and pushing. [The validation report](TEST_REPORT.md) records the earlier design review and its limits.

Deployment verification checks the public commit identity in every page's metadata. It retries briefly during Cloudflare rollout, then fails if the expected release or any content check remains incorrect. A response from the previous version cannot satisfy a new release check.

## Run locally

Use Node.js 22.13 or newer and the pnpm version in `package.json`.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run dev
```

Open the local URL printed by the development server. The `predev` and `prebuild` scripts regenerate project content automatically.

```sh
corepack pnpm run lint
corepack pnpm run typecheck
corepack pnpm audit --prod
corepack pnpm run verify:site
corepack pnpm run build
corepack pnpm run start
```

Run `verify:site` while the local development website is running on port 3000, or pass another URL: `corepack pnpm run verify:site http://127.0.0.1:3001`. After building and starting the production server, run `corepack pnpm run verify:production http://127.0.0.1:3000`. It additionally requires production framing protection. Both commands check routes, page structure, internal links, contact preselection, 404 handling, metadata, structured data, sitemap coverage, response security headers and optimized images.

The workflow in `.github/workflows/website.yml` uses pinned official actions and the frozen lockfile. Verification discovers and checks every canonical sitemap URL in addition to required routes, so newly published projects enter release checks automatically. The 8 October 2026 SEO candidate passed lint, production build and **918 local production checks**. [TEST_REPORT.md](TEST_REPORT.md) records dated deployment evidence and review limits.

A dated [Google mobile PageSpeed baseline](https://pagespeed.web.dev/analysis/https-www-velaro-group/fxnm2kxk5b?form_factor=mobile) scored **99 performance / 100 accessibility / 100 best practices / 100 SEO**, with **2.0 s LCP** and **0 CLS**. This is a lab result for the measured release; real-user data was unavailable and results can change.

The Cloudflare target uses OpenNext to adapt the same Next.js build to Workers, with KV caching, a Durable Object revalidation queue and Cloudflare Images. On Linux, run `pnpm run build:cloudflare`, then `pnpm run preview:cloudflare` to test that artifact locally. `pnpm run deploy:cloudflare` publishes the already-built artifact and populates its KV cache; GitHub Actions normally handles this. The `build:worker` and `dev:worker` aliases use OpenNext. Inherited Sites/Vinext files are outside the deployment path.

## Page and component architecture

| Area | Source |
| --- | --- |
| Homepage and primary platform positioning | `app/page.tsx` |
| Four service pages | `app/services/[slug]/page.tsx`, `lib/services.ts` |
| Work collection, category filters, and project details | `app/work/`, `lib/projects.ts` |
| About and contact pages | `app/about/`, `app/contact/` |
| Site settings and public content exports | `lib/site.ts`, `lib/content.ts` |
| Shared navigation, footer, brand, CTA, and section components | `components/` |
| Illustrative interfaces and workflow explorer | `components/platform-preview.tsx`, `components/workflow-explorer.tsx` |
| Base design, interface previews, service and secondary page styles | `app/design-system.css`, `app/previews.css`, `app/services.css`, `app/secondary.css` |
| Shared error recovery and social link image | `app/error.tsx`, `app/opengraph-image.tsx` |
| Production configuration and HTTP checks | `next.config.ts`, `scripts/verify-site.mjs` |

The design follows Velaro's established blue/cyan logo and Inter typography, with navy `#0a1628`, blue `#1e3a8a`, action blue `#2f6cf4`, cyan `#22d3ee`, white and cool canvas `#f5f7fb`. Shared tokens live in `app/design-system.css`. The **VELARO** wordmark has no trailing punctuation. Original logo and concept image files remain unchanged. Their page components use static imports, producing hashed image sources and immutable optimized responses on Workers. Inter loads locally through `next/font/local`; keep the supplied font licences with those assets.

The About page preserves Velaro's original studio identity, Lebanon/Middle East positioning, name origin and **Velocity, Vision, Value** principles, alongside the current custom platform and automation offer. Company history and results must stay grounded in verified material.

The homepage introduces all four core services before highlighting custom business platforms, automation and white-label delivery as the studio's specialty. About Us is directly available in navigation, with a homepage introduction and a permanent `/about-us` redirect. Work categories share one frame and use scroll-preserving Next navigation, result counts and keyboard controls. Each category has a visible introduction shared with its metadata and receives only its selected cards. The interactive header imports lightweight service links, keeping full service content out of its client bundle.

The website includes metadata, JSON-LD, canonical URLs, robots rules and a [canonical sitemap](https://www.velaro.group/sitemap.xml), currently containing 20 bundled public URLs and expanding with published projects. Sitemap modification dates are omitted until real dates are available. The 1200×630 Open Graph image uses trusted static content. Search Console ownership verification and sitemap submission are separate owner actions; a valid sitemap does not guarantee indexing.

For a separate preview build, `SITE_NOINDEX=1` compiles consistent noindex/nofollow metadata and headers for static and dynamic pages. Unset it and rebuild for public production. This is independent of the Worker alias's host-specific noindex policy; see the deployment guide for verification settings.

## Project content and Sanity

The local source of truth is `public/projects/*/project.json`. The generator in `scripts/generate-local-projects.mjs` writes `lib/generated-projects.ts`. Do not edit the generated file or add records to `lib/content.ts`. See [the project guide](public/projects/README.md) for fields and examples.

`lib/projects.ts` validates local records and CMS responses with Zod. Without `SANITY_PROJECT_ID`, it uses validated local content. With a configured CMS, the published collection is authoritative: errors throw a sanitized message rather than silently replacing published projects with local examples. Failed regeneration can retain previously successful cached output; a cold request without valid cached content can fail instead of returning a false 404.

The CMS fetch uses `SANITY_DATASET` (default `production`) and a five-second timeout. Its raw response is not cached: Next's `unstable_cache` stores only the validated collection for 300 seconds, keyed by project and dataset. React's request cache shares reads between metadata and page rendering. CMS records override matching local slugs; unmatched local concepts remain available. Featured records sort first, and duplicate slugs within either source are rejected.

Work, category pages, project details and the sitemap explicitly revalidate after 300 seconds. Known details are generated during the build; new valid CMS slugs can render on demand. Revalidation is request-driven and Cloudflare KV is eventually consistent, so publication is not immediate everywhere. Supply CMS settings at both build and runtime and verify a real publishing workflow before relying on it.

Before substantially expanding the collection, introduce separate summary, detail-by-slug and sitemap queries, paginate the gallery, and optimize remote cover images. The current six-concept collection does not require those larger changes; its present full-collection query is not a scale guarantee.

Follow [the Studio guide](studio/README.md) to configure the separate Sanity editor. Copy `.env.example` to `.env.local` for local settings and supply deployment settings through your host. The Studio schema exposes `kind` (`concept` or `case-study`) and an optional `visual` selection. Use approved, verifiable information for case studies; the bundled examples are explicitly labeled illustrative concepts.

## Contact behavior

The contact form validates required fields, including trimmed name/message content, and prepares a `mailto:` message to `info@velaro.group`. Visitors review and send it in their own email application. It offers clipboard copying and a selectable message fallback if the email application or clipboard is unavailable.

The form does **not** send, store, or track submissions on the website server. It never displays a sent confirmation. Links such as `/contact?service=automation` preselect a service; supported values are `custom-software`, `automation`, `web`, and `ecommerce`. A future server-side email integration needs its own configured provider, validation, abuse controls, and delivery handling.

## Demonstrations and operational scope

The inbox, workflow, and platform interfaces contain sample information. Their interactions demonstrate the intended product experience. This repository has no live WhatsApp, Instagram, Messenger, Facebook, or TikTok messaging backend and does not send automated replies. Actual channel integrations belong to a separately scoped implementation, using each platform's approved access and applicable account permissions.

## Website and internal platform isolation

This repository lives in `VelaroPlatform/velaro-website`. The sibling `VelaroPlatform/internal-platform` is the separate private application with its own source, repository, dependencies, environment, and runtime.

Deploy only the `velaro-website` project for the public website. Do not include the parent workspace, internal-platform files, internal credentials, or private operational data in its build context. The marketing previews are self-contained and do not read from or authenticate against the internal platform. Design mockups under `design-concepts/` are review artifacts, not production routes.

## Before publishing future changes

- Retain `pnpm-workspace.yaml` with the pinned lockfile; it contains compatible security overrides. Validate the OpenNext Worker artifact when deploying to Cloudflare.
- Confirm the service descriptions, contact address, regional positioning, and canonical domain.
- Review concept labels and obtain approval for any real case studies and project imagery.
- If using Sanity, publish and verify a record, including its detail URL and category.
- Verify the contact email preparation and fallback on desktop and mobile.
- Run the lint, TypeScript, and production build checks, then test navigation and responsive layouts on the deployed domain.
- Configure required domain redirects. Complete Search Console ownership verification and sitemap submission separately when authorized.

The validation report records dated dependency audit results and adapter checks. Do not expose development tooling as the public website. The inherited Vite/Sites source remains for reference and is not invoked by the Cloudflare deployment scripts.
