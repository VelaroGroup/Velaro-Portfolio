# Deploying the public Velaro website

The supported production application is the Next.js website in **`velaro-website`**. Use this folder as the repository/build root. The sibling `internal-platform` is a separate private application and must stay outside the deployment context.

The new-site deployment candidate is hosted by the Cloudflare Worker **`velaro-portfolio`** at the [workers.dev endpoint](https://velaro-portfolio.weathered-mud-0703.workers.dev). Its intended public canonical domain is **[www.velaro.group](https://www.velaro.group)**, with an apex-to-www redirect. The previous public domain mapping has been restored while the corrected candidate is verified. `wrangler.jsonc` deliberately omits Custom Domain routes during that validation. Registration remains at Squarespace; these application releases do not transfer the domain registration.

The first new-site release came from commit `d8e0e9b` in [successful GitHub Actions run 37799387456](https://github.com/VelaroGroup/Velaro-Portfolio/actions/runs/37799387456), producing Worker version **`55dc7df7-e917-4aec-9b76-f513fb5a8af0`**. That Linux run completed the build, both local runtime checks, deployment and post-deployment verification. An independent workers.dev check then passed **672 checks across 20 pages, 51 internal destinations and four legacy redirects**. Attaching the public domains revealed an additional redirect failure: OpenNext's hostname matcher treated the original apex value as an unanchored regular expression, matching www as well. The old DNS mapping was restored. The corrected source anchors and escapes the hostname and handles the homepage separately; the verifier now checks both hosts at `/` and `/about` before another cutover.

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

The deployment target is the existing **`velaro-portfolio`** Worker. OpenNext **1.20.9** adapts the Next.js **16.3.8** build; Wrangler **4.148.0** packages and deploys it. This retains the actual Next compiler and runtime behavior used by the standard build. Cloudflare currently recommends vinext for new applications; this existing tested application uses OpenNext to avoid combining its launch with a framework implementation migration.

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

The preview command seeds local cache state and runs the actual Worker runtime. It does not deploy. The dry-run only bundles and validates configuration; it does not provision resources or prove that account bindings are enabled. The local Windows attempt passed Next compilation and prerendering but failed when OpenNext tried to create a directory symlink. The successful Linux workflow established the Worker build and runtime checks; continue using Linux for release builds. Run this command only when publishing the verified artifact:

```sh
corepack pnpm run deploy:cloudflare
```

Use the OpenNext deployment command, not bare `wrangler deploy`, because it also populates the remote build cache. Authentication belongs in the deployment environment through `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; never commit token files or place them under `public`. Scope credentials to the website's account and required Worker/KV operations.

The configuration currently retains `workers.dev` without Custom Domain routes. After the corrected candidate passes, attach both domains and add both exact route entries with `custom_domain: true` to preserve them on future deployments. Canonical metadata is `https://www.velaro.group`. The host-specific redirect uses `^velaro\\.group$`, with separate root and nonempty-path rules, to exclude www and preserve paths and queries. Localhost and workers.dev are unaffected. Keep optional CMS settings available at both build and runtime. A separate staging deployment can use `SITE_NOINDEX=1` at build time; do not apply that setting to the public production Worker. Noindex is not access protection.

The private repository is `VelaroGroup/Velaro-Portfolio`. Its `.github/workflows/website.yml` owns automatic deployment for successful **pushes to `master`** in that repository. It installs the frozen lockfile, runs lint and TypeScript, builds and checks the Node production server, then builds and checks the actual Workers preview. Only after those checks pass does it seed the remote cache and publish that artifact. It then verifies the workers.dev endpoint. Pull requests, `main` pushes and manually dispatched check runs do not trigger the deployment step.

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

The verification script checks every main, service, category and bundled concept route, internal links and anchors, contact preselection, unknown-route 404s, headings, wordmarks, metadata, structured data, security headers, sitemap coverage and optimized images. `verify:production` also requires the production framing restrictions; `verify:site` supports the development server and its embedded responsive review. It performs read-only HTTP requests and never sends an email. Responsive appearance and browser interactions still need the separate browser review; an HTTP pass does not establish those results.

Dependency security fixes are pinned in the lockfile and `pnpm-workspace.yaml`. Keep the workspace policy file in the build context, even for this single application. Re-run the audit when preparing future releases; an earlier clean result is not a permanent security guarantee.

The pinned-action workflow has completed successfully on GitHub, including local Next and Worker runtime verification and post-deployment checks, as recorded above. The standard Node commands in this section remain useful for development and portability; they do not replace Worker verification for a Cloudflare release. Consult [the validation report](TEST_REPORT.md) for design review coverage and outstanding development-toolchain advisories.

## Environment and content

No secrets or CMS account are needed for the bundled public content.

| Variable | Use |
| --- | --- |
| `SANITY_PROJECT_ID` | Optional public Sanity project. Omit it to use local content. |
| `SANITY_DATASET` | Optional dataset; defaults to `production`. |
| `SITE_NOINDEX=1` | Build-time switch adding `X-Robots-Tag: noindex, nofollow` to preview deployments. Unset and rebuild for production. |
| `VELARO_STANDALONE=1` | Build-time switch producing the optional minimal Node artifact described below. |
| `NEXT_DEPLOYMENT_ID` | Optional build-time release identifier. Use the same value for every instance of one release and a new value for the next release. |
| `PORT` | Runtime port for the production server, when required by the host. |

Keep host environment settings outside the repository. Do not copy credentials from the internal platform into this website. Configure optional CMS variables for both the build and the runtime because static rendering and later revalidation can each need them.

Previews should use hosting access protection as well as `SITE_NOINDEX=1` when access is restricted. A noindex directive is not authentication. To check a deliberately non-indexable preview, set `VELARO_EXPECT_INDEXABLE=0` in the terminal running `verify:site`. The checker otherwise expects indexable production pages. If the approved canonical domain changes, update `lib/site.ts` and set `VELARO_EXPECTED_SITE_URL` to that URL when running the checker.

Publish only approved project content. Local project sources are `public/projects/*/project.json`; the build regenerates `lib/generated-projects.ts`. Those files are publicly accessible, so they must contain public case-study information only. Concept examples are explicitly labeled as concepts.

Known project detail routes are prerendered during the build, with request-driven revalidation after 300 seconds; newly published valid CMS slugs can render on demand. The CMS request has a five-second timeout and falls back to validated local content on failure. A request-level React cache shares the collection between metadata and page rendering. Test a real published CMS record in the chosen hosting environment before relying on that optional connection.

The sitemap contains 20 URLs: main pages, four service pages, four categories, six bundled concepts, Privacy and Terms. It omits invented modification dates. A static 1200×630 Open Graph image is generated at `/opengraph-image`; verify that image and social metadata on the public domain after deployment.

Local optimized images are allowed under `/images/`, `/projects/`, `/_next/static/media/`, plus `/velaro-logo.png`. Their source URLs must not contain query parameters. Keep new local project covers under `/projects/` or `/images/`. Remote CMS images currently use their validated HTTPS source directly and are not proxied through Next's image optimizer.

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

## Domains, legacy links and rollback

Both public hostnames will be reattached to `velaro-portfolio` after the corrected candidate passes hostname checks. The initial cutover preserved the 17 other existing DNS records; the previous website mapping was restored after the redirect issue appeared. Keep mail and verification records separate from application changes. Once the candidate is verified, preserve both Custom Domain mappings explicitly in the deployment configuration.

Configured permanent redirects map `/website-development-lebanon` and `/website-development-middle-east` to `/services/web`, `/shopify-store-lebanon` to `/services/ecommerce`, and `/packages` to `/contact`. Privacy and Terms retain their routes. Confirm any remaining old URLs against the old site's sitemap, hosting route list or search-console export; do not redirect every unknown URL to the homepage.

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

The same workflow rebuilds, tests and deploys the reverted source, making the rollback reproducible. Confirm the new Actions run and final-domain verification. Keep current domain routes and cache bindings intact when reverting application changes; reverting the deployment setup itself would remove the mechanism needed to release the rollback. Use the initial new-site commit and Worker version recorded above as release-history references, and retain the former site's saved configuration for any broader hosting rollback.
