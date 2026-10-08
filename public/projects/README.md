# Project content

Each immediate subfolder of `public/projects/` can contain a `project.json` and cover assets. Folders whose names start with `_` are ignored. These files are public website content; do not include credentials, internal records, or material that is not approved for publication.

The bundled collection contains 12 illustrative concepts. Their detail pages are included in the site's 26 bundled public sitemap URLs, alongside the core pages and category routes. Valid published CMS projects can add more URLs.

## Add an illustrative concept

Create a new folder such as `project-13` and add `project.json`:

```json
{
  "title": "One place for customer requests",
  "slug": "customer-request-platform",
  "service": "Custom software & platforms",
  "summary": "An illustrative workspace for requests, responsibilities, and the next action.",
  "challenge": "A team needs to keep requests and responsibilities together.",
  "approach": "Explore a shared workspace with clear ownership and connected follow-up tasks.",
  "outcome": "The concept shows a possible way to organise the work. No live client results are claimed.",
  "kind": "concept",
  "visual": "platform",
  "featured": false
}
```

Use `kind: "concept"` for design examples. The website labels them as illustrative and treats their outcome as an intended benefit. Use `kind: "case-study"` only for approved project information and verified claims. Optional case-study fields include `client` and `year`; do not invent either for a concept.

## Fields and previews

Required fields are `title`, `slug`, `service`, `summary`, `challenge`, and `approach`. Use a unique lowercase slug made of letters, numbers, and single hyphens. Keep published slugs stable because the homepage, sitemap, and external links can reference them.

Supported service labels, used by category filters:

- `Automation`
- `Custom software & platforms`
- `Web development`
- `E-commerce`

The optional `visual` field chooses a built-in illustrative interface when no cover image exists:

| Value | Preview |
| --- | --- |
| `inbox` | Customer messaging and handoff |
| `workflow` | A connected process |
| `platform` | Team workspace |
| `website` | Business website |
| `commerce` | Online store |
| `white-label` | Branded client portal with requests and milestones |
| `dispatch` | Field-service jobs and technician scheduling |
| `booking` | Appointment availability and confirmations |
| `documents` | Supplier documents and review status |
| `wholesale` | Account-based B2B ordering |
| `hospitality` | Hospitality website and accommodation discovery |

To use a cover, add it to the project folder and set `"cover": "cover.webp"` and a descriptive `"imageAlt"`. A cover beginning with `/` refers to another asset under `public/`. The generator resolves a relative cover to `/projects/<folder>/<cover>`. The cover takes precedence over `visual`.

Set `featured` to `true` for the project you want to prioritise on the Work page; the bundled white-label client platform is currently featured. Homepage selections are curated separately through `selectedConceptSlugs` in `app/page.tsx`: the white-label platform, appointment booking, and B2B ordering. The homepage displays up to three concepts and fills missing selections from other available concepts.

Optional fields are `outcome`, `client`, `year`, `cover`, `imageAlt`, `kind`, `visual`, `workflowSteps`, and `featured`. New records should always specify `kind`, even though older CMS records without it remain readable.

## Tailor the process

Add `workflowSteps` to show the concept's own process on its detail page. Use 2–6 objects, each with a nonempty `title` and `description`. Keep titles short and descriptions to one concise sentence. For example:

```json
{
  "workflowSteps": [
    { "title": "Submit a request", "description": "The client shares the brief and supporting files through their portal." },
    { "title": "Agree the scope", "description": "The team confirms requirements, assigns an owner, and sets milestones." },
    { "title": "Follow the delivery", "description": "Progress updates and shared files stay connected to the request." },
    { "title": "Review and approve", "description": "The client records feedback or approval in one place." }
  ]
}
```

These steps describe an illustrative process, so avoid implying a live integration or a delivered client result. A concept without `workflowSteps` uses the general workflow preview. This field is available in both local records and the CMS collection.

## Generate and validate

Run from the `velaro-website` directory:

```sh
node scripts/generate-local-projects.mjs
corepack pnpm run build
```

The generator writes `lib/generated-projects.ts`; never edit that generated file directly. It also runs before `dev` and `build`. After editing a JSON record during development, rerun the generator or restart the dev server.

`lib/projects.ts` validates the generated collection before use. Empty required values, unsupported categories or preview values, invalid slugs, duplicate slugs, and malformed or out-of-range workflow steps are rejected. Fix the source JSON and regenerate if validation fails.

## With Sanity enabled

Without `SANITY_PROJECT_ID`, the website uses validated local records. With the CMS configured, published, valid records are merged with this collection by slug. CMS records take precedence for matching slugs; unmatched local concepts remain available, so existing concept links keep working. Sanity's optional `cover` image resolves to the website's `image` field automatically.

The CMS collection is authoritative when configured. Network, timeout, response, and validation failures throw a sanitized error instead of silently falling back to local examples. Only the validated collection is cached, for 300 seconds. Failed regeneration can retain successful cached output; a cold request without valid cached content can fail rather than return a false 404 for a CMS-only project. Verify publication and failed-refresh behavior in the actual hosting environment before relying on the optional CMS.

The Work listing, category routes, project pages, and sitemap all read through `getProjects()` in `lib/projects.ts`. See [the main README](../../README.md) for the complete architecture, local fonts, deployment isolation, and contact behavior.
