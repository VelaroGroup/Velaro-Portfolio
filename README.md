# Velaro website

Velaro's public marketing website, built with Next.js 16.3.8, React 19, and TypeScript. The primary offer is custom automated platforms: understand the repetitive work, connect the process, and build useful software around the business. Supporting services cover messaging and workflow automation, websites, and connected e-commerce.

The website is live at **[www.velaro.group](https://www.velaro.group)** on Cloudflare Workers. [velaro.group](https://velaro.group) redirects to www, preserving paths and queries. Both domains are declared in `wrangler.jsonc`; the [workers.dev address](https://velaro-portfolio.weathered-mud-0703.workers.dev) remains available for deployment verification.

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

The workflow in `.github/workflows/website.yml` uses pinned official actions and the frozen lockfile. [GitHub Actions run 37801008410](https://github.com/VelaroGroup/Velaro-Portfolio/actions/runs/37801008410) passed all 17 steps, followed by 680 live-domain checks covering 20 pages, 51 internal destinations and four legacy redirects. The validation report records release evidence and remaining review limits.

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

The design follows Velaro's established blue/cyan logo and Inter typography, with navy `#0a1628`, blue `#1e3a8a`, action blue `#2f6cf4`, cyan `#22d3ee`, white and cool canvas `#f5f7fb`. Shared tokens live in `app/design-system.css`. The **VELARO** wordmark has no trailing punctuation. The supplied square `public/velaro-mark.png` is displayed unchanged in the brand, About page, browser icons and sharing image; the original padded `velaro-logo.png` remains available. Inter headings and body text load locally through `next/font/local`; fonts require no runtime external request. Keep the supplied font licences with those assets.

The About page preserves Velaro's original studio identity, Lebanon/Middle East positioning, name origin and **Velocity, Vision, Value** principles, alongside the current custom platform and automation offer. Company history and results must stay grounded in verified material.

The homepage introduces all four core services before highlighting custom business platforms, automation and white-label delivery as the studio's specialty. About Us is directly available in desktop and compact navigation, with a homepage introduction and a permanent `/about-us` redirect. Work categories share one page frame and use scroll-preserving Next navigation, visible result counts and keyboard focus controls. The challenge explorer keeps a stable natural height across its four examples and respects reduced-motion preferences.

The website includes metadata, JSON-LD, canonical URLs, robots rules and a 20-URL sitemap for the bundled public collection and preserved policy pages. Sitemap modification dates are omitted until a content source provides real dates. The 1200×630 Open Graph image is generated from static, trusted content. Update the domain and contact details in `lib/site.ts` when appropriate.

## Project content and Sanity

The local source of truth is `public/projects/*/project.json`. The generator in `scripts/generate-local-projects.mjs` writes `lib/generated-projects.ts`. Do not edit the generated file or add records to `lib/content.ts`. See [the project guide](public/projects/README.md) for fields and examples.

`lib/projects.ts` validates both generated local records and CMS responses with Zod. Local content errors fail with a content-validation message. Remote errors or invalid CMS payloads safely fall back to validated local projects without logging response bodies or credentials.

If `SANITY_PROJECT_ID` is configured, published Sanity projects are fetched from `SANITY_DATASET` (default `production`) with a five-minute revalidation interval and a five-second request timeout. React's request cache avoids loading the same collection separately for metadata and page content within one render. Valid CMS records merge with the local collection by slug: a CMS record overrides a matching local slug, while unmatched local concepts remain available. This preserves the concept links used by the homepage. Featured records sort first, with CMS ordering retained among equally featured records. Duplicate slugs within either source are rejected.

Known project detail pages are generated during the production build and use 300-second revalidation. New valid CMS slugs can be generated on demand when requested. Revalidation is request-driven, so publication is not an immediate push to every visitor or server instance. Read the deployment guide before introducing multiple self-hosted replicas.

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
- Configure any required domain redirects and submit the sitemap after deployment.

The validation report records dated dependency audit results and adapter checks. Do not expose development tooling as the public website. The inherited Vite/Sites source remains for reference and is not invoked by the Cloudflare deployment scripts.
