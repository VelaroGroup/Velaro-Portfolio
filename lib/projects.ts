import { generatedLocalProjects } from './generated-projects';
import { cache } from 'react';
import { z } from 'zod';

export type ProjectVisual = 'inbox' | 'workflow' | 'platform' | 'website' | 'commerce';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  service: string;
  year?: string;
  client?: string;
  featured?: boolean;
  challenge: string;
  approach: string;
  outcome?: string;
  image?: string;
  imageAlt?: string;
  kind?: 'concept' | 'case-study';
  visual?: ProjectVisual;
};

export const projectCategories = [
  { slug: 'automation', label: 'Automation', shortLabel: 'Automation' },
  { slug: 'custom-software', label: 'Custom software & platforms', shortLabel: 'Custom platforms' },
  { slug: 'web-development', label: 'Web development', shortLabel: 'Websites' },
  { slug: 'ecommerce', label: 'E-commerce', shortLabel: 'E-commerce' },
] as const;

export function projectCategoryLabel(service: string): string {
  return projectCategories.find((category) => category.label === service)?.shortLabel || service;
}

const optionalText = z.preprocess(
  (value) => value === null || value === '' ? undefined : value,
  z.string().trim().min(1).optional(),
);

const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  service: z.enum(['Automation', 'Web development', 'E-commerce', 'Custom software & platforms']),
  year: optionalText,
  client: optionalText,
  featured: z.boolean().nullish().transform((value) => value ?? false),
  challenge: z.string().trim().min(1),
  approach: z.string().trim().min(1),
  outcome: optionalText,
  image: optionalText.refine((value) => {
    if (!value) return true;
    if (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\')) return true;
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  }),
  imageAlt: optionalText,
  kind: z.enum(['concept', 'case-study']).nullish().transform((value) => value ?? undefined),
  visual: z.enum(['inbox', 'workflow', 'platform', 'website', 'commerce']).nullish().transform((value) => value ?? undefined),
});

const projectCollectionSchema = z.array(projectSchema).refine(
  (projects) => new Set(projects.map(({ slug }) => slug)).size === projects.length,
  'Project slugs must be unique.',
);
const cmsPayloadSchema = z.object({ result: projectCollectionSchema });

const localResult = projectCollectionSchema.safeParse(generatedLocalProjects);
if (!localResult.success) {
  throw new Error('Invalid local project content. Check public/projects/*/project.json and run the project generator.');
}
export const localProjects: Project[] = localResult.data;

export const getProjects = cache(async (): Promise<Project[]> => {
  const id = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || 'production';
  if (!id) return localProjects;

  const query = encodeURIComponent('*[_type == "project" && defined(slug.current)] | order(featured desc, _createdAt desc){"slug":slug.current,title,summary,service,year,client,featured,challenge,approach,outcome,kind,visual,"image":cover.asset->url,"imageAlt":cover.alt}');

  try {
    const response = await fetch(`https://${id}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${query}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data: unknown = await response.json();
    const parsed = cmsPayloadSchema.safeParse(data);
    if (!parsed.success) throw new Error('Invalid project response');

    // Published records take precedence, while local concept URLs remain available.
    const merged = new Map<string, Project>(parsed.data.result.map((project) => [project.slug, project]));
    for (const project of localProjects) {
      if (!merged.has(project.slug)) merged.set(project.slug, project);
    }
    return [...merged.values()].sort((a, b) => Number(b.featured) - Number(a.featured));
  } catch {
    console.warn('Project content unavailable; using local projects.');
    return localProjects;
  }
});
