# Project content

Each immediate subfolder of `public/projects/` can contain a `project.json` and cover assets. Folders whose names start with `_` are ignored. These files are public website content; do not include credentials, internal records, or material that is not approved for publication.

## Add an illustrative concept

Create a folder such as `project-07` and add `project.json`:

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

To use a cover, add it to the project folder and set `"cover": "cover.webp"` and a descriptive `"imageAlt"`. A cover beginning with `/` refers to another asset under `public/`. The generator resolves a relative cover to `/projects/<folder>/<cover>`. The cover takes precedence over `visual`.

Set `featured` to `true` for the project you want to prioritise on the Work page. Optional fields are `outcome`, `client`, `year`, `cover`, `imageAlt`, `kind`, `visual`, and `featured`. New records should always specify `kind`, even though older CMS records without it remain readable.

## Generate and validate

Run from the `velaro-website` directory:

```sh
node scripts/generate-local-projects.mjs
corepack pnpm run build
```

The generator writes `lib/generated-projects.ts`; never edit that generated file directly. It also runs before `dev` and `build`. After editing a JSON record during development, rerun the generator or restart the dev server.

`lib/projects.ts` validates the generated collection before use. Empty required values, unsupported categories or preview values, invalid slugs, and duplicate slugs are rejected. Fix the source JSON and regenerate if validation fails.

## With Sanity enabled

Published, valid CMS records are merged with this collection by slug. CMS records take precedence for matching slugs; unmatched local concepts remain available, so existing concept links keep working. Invalid or unavailable CMS responses fall back to the local collection. Sanity's optional `cover` image resolves to the website's `image` field automatically.

The Work listing, category routes, project pages, and sitemap all read through `getProjects()` in `lib/projects.ts`. See [the main README](../../README.md) for the complete architecture, local fonts, deployment isolation, and contact behavior.
