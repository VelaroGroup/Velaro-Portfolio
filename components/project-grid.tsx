import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PlatformPreview } from '@/components/platform-preview';
import { WorkGallery } from '@/components/work-gallery';
import { projectCategories, projectCategoryLabel, type Project } from '@/lib/projects';

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.image) {
    return <div className="project-cover"><Image src={project.image} alt={project.imageAlt || project.title} fill sizes={compact ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, 85vw'} unoptimized={project.image.startsWith('http')} /></div>;
  }
  return <PlatformPreview variant={project.visual || 'platform'} compact={compact} />;
}

export function ProjectGrid({ projects, activeCategory = 'All work' }: { projects: Project[]; activeCategory?: string }) {
  return <WorkGallery categories={projectCategories} initialCategory={activeCategory} items={projects.map((project) => ({
    slug: project.slug,
    category: project.service,
    concept: project.kind === 'concept',
    card: <article className="project-card" key={project.slug}>
        <div className={`project-visual project-visual--${project.visual || 'platform'}`}>
          <span className="project-kind">{project.kind === 'concept' ? 'Illustrative concept' : 'Project'}</span>
          <ProjectVisual project={project} compact />
        </div>
        <div className="project-meta"><span>{projectCategoryLabel(project.service)}</span>{project.kind !== 'concept' && project.year && <span>{project.year}</span>}</div>
        <h3><Link href={`/work/${project.slug}`}>{project.title}<ArrowUpRight aria-hidden="true" /></Link></h3>
        <p>{project.summary}</p>
        <Link href={`/work/${project.slug}`} className="project-card-link">{project.kind === 'concept' ? 'Explore concept' : 'View project'} <span aria-hidden="true">↗</span></Link>
      </article>,
  }))} />;
}
