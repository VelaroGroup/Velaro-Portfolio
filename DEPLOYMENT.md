# Deploying the public Velaro website

The supported production application is the Next.js website in **`velaro-website`**. Use this folder as the repository/build root. The sibling `internal-platform` is a separate private application and must stay outside the deployment context.

The public website is live at **[www.velaro.group](https://www.velaro.group)** on the Cloudflare Worker **`velaro-portfolio`**. Both `velaro.group` and `www.velaro.group` are attached as Custom Domains and declared in `wrangler.jsonc`. The apex redirects to www, preserving paths and queries. The [workers.dev endpoint](https://velaro-portfolio.weathered-mud-0703.workers.dev) remains available for deployment verification. Domain registration remains at Squarespace.

Use the latest successful deployment run and each page's `velaro-release` metadata to identify the running release. Earlier launch commits and Worker versions are dated history in [TEST_REPORT.md](TEST_REPORT.md), not the current release. The 8 October 2026 SEO candidate passed lint, production build and 918 local production checks; consult that report for subsequent deployment evidence and review limits.

## Hosting requirements

| Setting | Value |
| --- | --- |
| Framework/runtime | Next.js through OpenNext on Cloudflare Workers, with Node compatibility |
| Build environment | Linux with a maintained Node.js 22 release, at least 22.13 |
| Package manager | pnpm 11.25.0, pinned in `package.json` |
| Install | `corepack pnpm install --frozen-lockfile` |
| Worker build | `corepack pnpm run build:cloudflare` |
| Local Worker preview | `corepack pnpm run preview:cloudflare` after building |
| Publish built Worker | `corepack pnpm run deploy:cloudflare` (normally run by GitHub Actions) |
| Public canonical address | `https://www.velaro.group` (`lib/site.ts`) |
| Health check | `GET /` must return 200 |
| Persistent writes | KV incremental cache and Durable Object revalidation queue; no application database |

Do not upload an `out/` folder to a static-only host: this implementation uses server-rendered contact parameters, project routes, optional CMS revalidation and Next image optimization. Do not run the development server in production.

## Cloudflare Workers target

The deployment target is **`velaro-portfolio`**. OpenNext **1.20.9** adapts the Next.js **16.3.8** build; Wrangler **4.148.0** packages and deploys it. This retains the standard Next compiler and runtime used by the release checks.

`wrangler.jsonc` defines these bindings:

| Binding | Resource |
| --- | --- |
| `ASSETS` | Generated `.open-next/assets` |
| `WORKER_SELF_REFERENCE` | `velaro-portfolio` |
| `NEXT_INC_CACHE_KV` | `velaro-portfolio-cache` KV namespace |
| `NEXT_CACHE_DO_QUEUE` | `DOQueueHandler`, SQLite Durable Object migration `v1` |
| `IMAGES` | Cloudflare Images transformations |

The configured KV namespace is `f82c213c844945d594ea3d98ed68f1fc`, provisioned specifically for this website. Deployment applies the Durable Object migration. No application database or tag cache is required for the current timed revalidation; adding on-demand `revalidateTag`/`revalidatePath` later requires the corresponding cache configuration. Cloudflare Images and Worker/storage usage can incur charges according to the account's enabled services.

KV supports timed ISR and build-time cache seeding, but it is eventually consistent: content changes may take additional time to reach every Cloudflare location. That suits this public portfolio's current update frequency; it is not a guarantee of immediate CMS publication. R2 is OpenNext's preferred cache store, but R2 is not enabled on this account and requires dashboard activation. Revisit R2 before increasing update frequency or adding features requiring tighter cache consistency. The deployment does not activate an additional subscription.

Build and test the Worker from this repository root:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run lint
corepack pnpm run typecheck
corepack pnpm run build:cloudflare
corepack pnpm run dry-run:cloudflare
corepack pnpm run preview:cloudflare --port 8787
```

With that local Worker running, use another terminal:

```sh
corepack pnpm run verify:production http://127.0.0.1:8787
```

`build:cloudflare` invokes the normal `build` script, including project generation, then creates `.open-next`. It uses `.next` during that process, so do not run two production builds concurrently. A Node production server using a previous `.next` artifact should be restarted after rebuilding. Linux is the preferred deployment build environment; OpenNext does not guarantee full Windows support.

The preview command seeds local cache state and runs the actual Worker runtime. It does not deploy. The dry-run only bundles and validates configuration; it does not provision resources or prove that account bindings are enabled. Use Linux for release builds and validate the Worker artifact before publishing.

`preview:cloudflare` derives the ignored `.wrangler-preview.jsonc` from the production configuration, removing domain routes only for the local process. Keeping it beside `wrangler.jsonc` preserves relative paths and uses the same bindings. This prevents Wrangler from replacing every local request's Host with the first production domain, allowing apex/www regression checks to exercise the actual incoming hostname. Production deployment continues to use `wrangler.jsonc` with both Custom Domains intact.

Publish the verified artifact with:

```sh
corepack pnpm run deploy:cloudflare
```

Use the OpenNext deployment command, not bare `wrangler deploy`, because it also populates the remote build cache. Authentication belongs in the deployment environment through `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; never commit token files or place them under `public`. Scope credentials to the website's account and required Worker/KV operations.

Preserve `workers.dev` and both exact Custom Domain entries with `custom_domain: true`. Canonical metadata points to `https://www.velaro.group`. The anchored apex redirect preserves paths and queries while excluding www, localhost and workers.dev. The Worker alias has a separate host-specific `X-Robots-Tag: noindex, follow` policy; this does not disable indexing on the public domain. Keep optional CMS settings available at both build and runtime.

For a separate non-indexable build, set `SITE_NOINDEX=1` before building. The compiled policy agrees across prerendered and request-rendered pages, sets noindex/nofollow metadata and response headers, and omits the sitemap advertisement from robots.txt while permitting crawlers to read the directives. Unset it and rebuild for public production. Noindex is not access protection.

The public repository is `VelaroGroup/Velaro-Portfolio`. Its `.github/workflows/website.yml` owns automatic deployment for successful **pushes to `master`** in that repository. It installs the frozen lockfile, runs lint and TypeScript, builds and checks the Node production server, then builds and checks the actual Workers preview. Only after those checks pass does it seed the remote cache and publish that artifact. It then verifies the workers.dev endpoint and public domain. Pull requests, `main` pushes and manually dispatched check runs do not trigger the deployment step.

`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured as encrypted GitHub repository secrets and exposed only to the deployment step. Their values are not stored in source files. Keep Cloudflare Workers Builds from independently deploying the same production Worker, so one workflow controls release order. Inspect the Actions run after each push; a post-deployment check failure does not automatically undo a deployment.

Production HTML headers remain in `next.config.ts`. Workers Static Assets bypass that handler, so `public/_headers` applies the matching security policy to assets and a one-year immutable cache policy only to hashed `/_next/static/*` files. The generated Open Graph PNG, optimized local photos and unknown-route responses need verification in the deployed Worker. Do not add a blanket HTML cache rule that removes query-string or RSC distinctions.

The legacy `vite.config.ts`, Sites scripts and `.openai/hosting.json` are retained but are not used by these deployment scripts. `build:worker` and `dev:worker` are compatibility aliases for OpenNext build and preview. Design mockups, `.dev.vars*`, `.open-next`, `.wrangler` and local tool output stay ignored and outside the production source package.

Reference: [Cloudflare OpenNext deployment](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/), [OpenNext setup](https://opennext.js.org/cloudflare/get-started), [cache configuration](https://opennext.js.org/cloudflare/caching), [image optimization](https://opennext.js.org/cloudflare/howtos/image).

## Verify a release

Run from `velaro-website`:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run lint
corepack pnpm run typecheck
corepack pnpm audit --prod
corepack pnpm run build
corepack pnpm run start
```

With that production process running, use another terminal:

```sh
corepack pnpm run verify:production http://127.0.0.1:3000
```

The verifier discovers all canonical URLs from the sitemap and adds required baseline routes. It checks those pages, incoming internal links, anchors, contact preselection, 404s, headings, metadata, structured data, security headers and optimized images. New sitemap projects therefore enter release checks automatically. `verify:production` additionally requires production framing restrictions. Checks are read-only and send no email; responsive appearance and interactions need separate browser review.

When verifying the Worker alias or a noindex build, set `VELARO_EXPECT_INDEXABLE=0` for that command. The workflow sets this only on its alias check; the public-domain check requires indexable pages. Canonical URLs remain the public www origin in both checks.

Dependency security fixes are pinned in the lockfile and `pnpm-workspace.yaml`. Keep the workspace policy file in the build context, even for this single application. Re-run the audit when preparing future releases; an earlier clean result is not a permanent security guarantee.

The standard Node commands support development and portability; they do not replace Worker runtime and post-deployment verification. [TEST_REPORT.md](TEST_REPORT.md) records individual workflow outcomes, audit evidence and the dated [Google mobile PageSpeed baseline](https://pagespeed.web.dev/analysis/https-www-velaro-group/fxnm2kxk5b?form_factor=mobile): 99 performance, 100 accessibility, 100 best practices and 100 SEO, with 2.0 s LCP and 0 CLS. This is a lab measurement; real-user data was unavailable.

## Environment and content

No secrets or CMS account are needed for the bundled public content.

| Variable | Use |
| --- | --- |
| `SANITY_PROJECT_ID` | Optional public Sanity project. Omit it to use local content. |
| `SANITY_DATASET` | Optional dataset; defaults to `production`. |
| `SITE_NOINDEX=1` | Compiled build-time indexing policy for static and dynamic pages; noindex/nofollow metadata and headers, without a robots.txt sitemap advertisement. Unset and rebuild for public production. |
| `VELARO_STANDALONE=1` | Build-time switch producing the optional minimal Node artifact described below. |
| `NEXT_DEPLOYMENT_ID` | Optional build-time release identifier. Use the same value for every instance of one release and a new value for the next release. |
| `PORT` | Runtime port for the production server, when required by the host. |

Keep host environment settings outside the repository. Do not copy credentials from the internal platform into this website. Configure optional CMS variables for both the build and the runtime because static rendering and later revalidation can each need them.

Previews should use hosting access protection as well as `SITE_NOINDEX=1` when access is restricted. A noindex directive is not authentication. To check a deliberately non-indexable preview, set `VELARO_EXPECT_INDEXABLE=0` in the terminal running `verify:site`. The checker otherwise expects indexable production pages. If the approved canonical domain changes, update `lib/site.ts` and set `VELARO_EXPECTED_SITE_URL` to that URL when running the checker.

Publish only approved project content. Local project sources are `public/projects/*/project.json`; the build regenerates `lib/generated-projects.ts`. Those files are publicly accessible, so they must contain public case-study information only. Concept examples are explicitly labeled as concepts.

Work, category pages, project details and the sitemap explicitly use 300-second request-driven revalidation. Known detail routes are prerendered; new valid CMS slugs can render on demand. The CMS request has a five-second timeout and uses `cache: 'no-store'`; only its validated collection enters `unstable_cache`, keyed by project/dataset with a 300-second interval. React's request cache shares reads within one render.

Without CMS configuration, validated local projects are used. Once the CMS is configured, network, timeout, response and validation errors throw a sanitized error instead of silently substituting the local collection. Failed regeneration can preserve successful cached content; a cold failure remains an error rather than falsely treating a CMS-only project as missing. Test successful publication and failed-refresh behavior in the actual hosting environment before relying on the optional CMS.

The [canonical sitemap](https://www.velaro.group/sitemap.xml) currently contains 20 bundled public URLs and includes additional published projects automatically. It omits invented modification dates. Search Console ownership verification and sitemap submission are separate owner actions; sitemap availability does not establish indexing. A static 1200×630 Open Graph image is generated at `/opengraph-image`; verify it after deployment.

Local optimized images are allowed under `/images/`, `/projects/`, `/_next/static/media/`, plus `/velaro-logo.png` and `/velaro-mark.png`, without source query parameters. Static imports of the original logo and concept photos produce hashed sources; OpenNext returns immutable optimized responses for these sources. Original files are unchanged. Keep new local covers under `/projects/` or `/images/`. Remote CMS covers currently use their validated HTTPS originals without optimization; add an approved responsive image loader or restricted optimizer configuration before substantial image growth.

The contact form prepares an email in the visitor's email application, with a copy fallback. It does not submit to a server or save inquiries. Confirm that `info@velaro.group` receives mail before launch. A direct form-delivery service would require a separate provider configuration and implementation.

## Optional standalone Node/container artifact

Set `VELARO_STANDALONE=1` in the build environment, then run the normal production build. Next writes the traced runtime to `.next/standalone`. Public files and compiled static assets are not included automatically; copy them into the artifact:

```sh
node -e "const fs = require('node:fs'); fs.cpSync('public', '.next/standalone/public', { recursive: true }); fs.cpSync('.next/static', '.next/standalone/.next/static', { recursive: true });"
node .next/standalone/server.js
```

Set `HOSTNAME=0.0.0.0` and the host-provided `PORT` in the runtime environment when the host needs an externally reachable container listener. Run the integration checks against this exact artifact before promoting it. Ordinary builds without the standalone switch continue to use `pnpm run start`.

For containers, install and build on the same OS/architecture as the runtime, so native image optimization dependencies match. Deploy the traced standalone artifact, public assets and static assets together. Design boards in `design-concepts/`, local review logs, `.env` files, `.git`, and the sibling private application do not belong in the runtime artifact.

## Edge, caching and scaling

Terminate HTTPS at the hosting edge or reverse proxy. Forward the original host/protocol correctly, keep the Node listener private when using a reverse proxy, and enforce host-level request/body limits and rate limits. Preserve the application's security headers. Configure HSTS at the HTTPS edge after all affected domains support HTTPS; the application deliberately does not impose an HSTS policy on unrelated subdomains.

The application sends `nosniff`, same-origin framing in production, a restrictive referrer policy and disabled unused camera/microphone/geolocation permissions. Its CSP limits base URLs, embedded objects and production framing. Development omits framing restrictions so embedded responsive review tools work. It does not claim to be a strict script allowlist: a nonce-based script policy would require a different rendering and caching strategy. Test any additional edge policy with navigation, images and contact email/copy behavior before enabling it.

Respect Next's cache headers instead of forcing one blanket HTML cache policy. Hashed static assets can be cached for the lifetime Next specifies. Forward `Accept` to the image optimizer and vary cached image responses accordingly. Do not cache all query strings as if they were the same page: contact service selection depends on the query. Preserve Next's `Vary`/RSC navigation behavior at a CDN or proxy.

For one self-hosted instance, provide a writable cache directory and let Next manage revalidation. For multiple instances or ephemeral containers, configure a supported shared cache and coordinated invalidation before expecting the same CMS update to appear on every instance at once. Deploy one built artifact to all replicas rather than rebuilding independently. Use a release identifier for version-skew protection and retain the previous release's static assets during rollout. There is no mutable customer/session state in this marketing application today; adding authenticated platform features would change these requirements.

The current CMS query reads the complete collection, including detail text. Before substantial growth, split summary, detail-by-slug and sitemap projections, add gallery pagination and measure build time and response sizes with representative content. Category routes already send only their selected cards, and client navigation imports only service names/slugs. Sitemap splitting is unnecessary for 20 URLs; introduce partitioning if the collection approaches sitemap protocol limits.

## Domains, legacy links and rollback

Both public hostnames are attached to `velaro-portfolio`, with the 17 other existing DNS records confirmed unchanged. Keep mail and verification records separate from application changes, and retain both Custom Domain mappings in the deployment configuration.

Configured permanent redirects map `/website-development-lebanon` and `/website-development-middle-east` to `/services/web`, `/shopify-store-lebanon` to `/services/ecommerce`, `/packages` to `/contact`, and `/about-us` to `/about`. Privacy and Terms retain their routes. Review additional legacy URLs against a sitemap, hosting route list or Search Console export; do not redirect every unknown URL to the homepage.

After a production push succeeds, verify the final canonical domain:

```sh
corepack pnpm run verify:production https://www.velaro.group
```

Also check apex and HTTP redirects, mailbox reception, and browser contact/navigation behavior. The HTTP verifier does not send email or establish complete browser interaction coverage.

For a source rollback, create a new commit reverting the unwanted change and push that commit to `master`. Do not reset or force-push the shared production branch. For a single ordinary commit:

```sh
git switch master
git pull --ff-only
git revert <commit-to-revert>
git push origin master
```

The same workflow rebuilds, tests and deploys the reverted source. Confirm its Actions run, expected commit metadata and final-domain verification. Keep domain routes and cache bindings intact when reverting application changes. Select a previously verified release from [TEST_REPORT.md](TEST_REPORT.md) and the deployment history; an old launch reference is not necessarily the latest healthy release. Retain the former site's saved configuration for a broader hosting rollback.
