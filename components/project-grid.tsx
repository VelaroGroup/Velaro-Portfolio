import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PlatformPreview } from '@/components/platform-preview';
import { projectCategories, projectCategoryLabel, type Project } from '@/lib/projects';

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.image) {
    return <div className="project-cover"><Image src={project.image} alt={project.imageAlt || project.title} fill sizes={compact ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, 85vw'} unoptimized={project.image.startsWith('http')} /></div>;
  }
  return <PlatformPreview variant={project.visual || 'platform'} compact={compact} />;
}

export function ProjectGrid({ projects, featuredSlug, activeCategory = 'All work' }: { projects: Project[]; featuredSlug?: string; activeCategory?: string }) {
  const visibleProjects = projects.filter((project) => activeCategory === 'All work' ? project.slug !== featuredSlug : project.service === activeCategory);

  return <>
    <nav className="project-filters" aria-label="Project categories">
      <Link href="/work" className={activeCategory === 'All work' ? 'active' : ''} aria-current={activeCategory === 'All work' ? 'page' : undefined}>All work</Link>
      {projectCategories.map((category) => <Link key={category.slug} href={`/work/category/${category.slug}`} className={activeCategory === category.label ? 'active' : ''} aria-current={activeCategory === category.label ? 'page' : undefined}>{category.shortLabel}</Link>)}
    </nav>
    {visibleProjects.length ? <div className="project-grid">
      {visibleProjects.map((project) => <article className="project-card" key={project.slug}>
        <div className={`project-visual project-visual--${project.visual || 'platform'}`}>
          <span className="project-kind">{project.kind === 'concept' ? 'Illustrative concept' : 'Project'}</span>
          <ProjectVisual project={project} compact />
        </div>
        <div className="project-meta"><span>{projectCategoryLabel(project.service)}</span>{project.kind !== 'concept' && project.year && <span>{project.year}</span>}</div>
        <h2><Link href={`/work/${project.slug}`}>{project.title}<ArrowUpRight aria-hidden="true" /></Link></h2>
        <p>{project.summary}</p>
        <Link href={`/work/${project.slug}`} className="project-card-link">{project.kind === 'concept' ? 'Explore concept' : 'View project'} <span aria-hidden="true">↗</span></Link>
      </article>)}
    </div> : <div className="project-filter-empty"><h2>More possibilities to explore.</h2><p>Have a challenge in this area? We can talk through what a useful solution would look like.</p><Link href="/contact" className="text-link">Tell us about it <span aria-hidden="true">↗</span></Link></div>}
  </>;
}
