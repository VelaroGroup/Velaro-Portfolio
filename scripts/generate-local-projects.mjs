import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const projectsDirectory = join(root, 'public', 'projects');
const output = join(root, 'lib', 'generated-projects.ts');

if (!existsSync(projectsDirectory)) mkdirSync(projectsDirectory, { recursive: true });

const projects = readdirSync(projectsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .map((entry) => {
    const projectFile = join(projectsDirectory, entry.name, 'project.json');
    if (!existsSync(projectFile)) return null;
    const project = JSON.parse(readFileSync(projectFile, 'utf8'));
    const image = project.cover
      ? project.cover.startsWith('/')
        ? project.cover
        : `/projects/${entry.name}/${project.cover}`
      : undefined;
    return { slug: project.slug || entry.name, title: project.title, summary: project.summary, service: project.service, year: project.year, client: project.client, featured: Boolean(project.featured), challenge: project.challenge, approach: project.approach, outcome: project.outcome, kind: project.kind, visual: project.visual, image, imageAlt: project.imageAlt || project.title };
  })
  .filter(Boolean)
  .sort((a, b) => Number(b.featured) - Number(a.featured));

writeFileSync(output, `// Generated from public/projects/*/project.json. Do not edit manually.\nexport const generatedLocalProjects = ${JSON.stringify(projects, null, 2)};\n`);
console.log(`Generated ${projects.length} local project record(s).`);
