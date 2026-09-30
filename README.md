# Velaro website

A responsive Next.js 16 and TypeScript website for Velaro's four services. Includes service pages, portfolio pages, contact flow, metadata, JSON-LD, sitemap, and robots rules.

## Run locally

Use Node.js 22 or newer. Run `corepack pnpm install` then `corepack pnpm run dev` and open the local URL shown. For a standard Next.js or Vercel deployment, use `corepack pnpm run build` and `corepack pnpm run start`. Run `corepack pnpm run lint` and `corepack pnpm exec tsc --noEmit` before deployment. Optional `dev:worker` and `build:worker` scripts use the included Cloudflare/Vinext adapter.

## Add a project

The site has no invented client examples. For an immediate code-based entry, add a record to `localProjects` in `lib/content.ts` following the `Project` type, then rebuild. Use a unique lowercase `slug` such as `customer-portal`, a short summary, service, challenge, approach, and only verified outcomes. Put an image in `public/projects/` and set `image` to `/projects/filename.webp`, with descriptive `imageAlt`.

For a no-code editor, use the included `studio/` Sanity project. Follow `studio/README.md`, then copy `.env.example` to `.env.local` in this root and fill in the same project ID. Published projects automatically appear at `/work` and get their own pages and sitemap URLs. The Studio is not active until you create a Sanity account and project; no credentials are embedded here.

## Contact

The form prepares a message in the visitor's email app. It does not store or send submissions from the server. Replace this with a verified mail service if you need browser-based submission and delivery tracking.

## Launch checklist

- Confirm service claims, contact address, and regional positioning with Velaro.
- Add approved case studies and project images; confirm rights to publish them.
- Add real Sanity credentials if using the editor and verify a published project.
- Verify canonical domain and redirects for old URLs before pointing `velaro.group` to the new site.
- Connect hosting, test the production domain, and submit the sitemap in Google Search Console.

The source logo asset was obtained from the existing velaro.group website. SEO foundations make pages crawlable and descriptive; search ranking and AI mentions depend on indexing, content, external reputation, and the live deployment.
