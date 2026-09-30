# Velaro project editor

1. Create a Sanity project at sanity.io/manage and a public `production` dataset.
2. Copy `.env.example` to `.env`, fill in the project ID and dataset.
3. Run `npm install` and `npm run dev` in this folder. Sign in to Sanity when prompted.
4. In Sanity project settings, add your local Studio origin to CORS with credentials enabled. Add the deployed Studio origin if you deploy it.
5. Add a Project, upload a cover image, and fill in the challenge and approach. Publish it. The public website reads published projects automatically, with up to a five minute cache.
6. To host the editor, run `npm run deploy` and choose a Studio hostname. Control editor access through Sanity project membership.

Do not add private client details or unsupported outcome claims without permission. The website uses a public dataset API; unpublished drafts are not shown.
