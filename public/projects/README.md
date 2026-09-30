# Adding a project

Create a folder such as `project-07`, add its cover image, and add a `project.json` file.

```json
{
  "title": "Project name",
  "slug": "project-name",
  "service": "Custom software & platforms",
  "year": "2026",
  "summary": "A short introduction.",
  "cover": "cover.jpg",
  "imageAlt": "Description of the cover image.",
  "challenge": "What needed to change.",
  "approach": "What Velaro did.",
  "outcome": "Verified result.",
  "featured": false
}
```

Set `featured` to `true` for one project to show it in the Work-page hero. Restart `pnpm dev` after adding a folder so the project list is refreshed.
