import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PlatformPreview } from '@/components/platform-preview';
import { ProjectSamplePreview } from '@/components/project-sample-preview';
import { WorkGallery } from '@/components/work-gallery';
import { projectCategories, projectCategoryLabel, type Project } from '@/lib/projects';

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.image) {
    return <div className="project-cover"><Image src={project.image} alt={project.imageAlt || project.title} fill sizes={compact ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, 85vw'} unoptimized={project.image.startsWith('http')} /></div>;
  }
  switch (project.visual) {
    case 'white-label':
    case 'dispatch':
    case 'booking':
    case 'documents':
    case 'wholesale':
    case 'hospitality':
      return <ProjectSamplePreview variant={project.visual} compact={compact} />;
    default:
      return <PlatformPreview variant={project.visual || 'platform'} compact={compact} />;
  }
}

export function ProjectGrid({ projects, activeCategory = 'All work' }: { projects: Project[]; activeCategory?: string }) {
  const category = projectCategories.find((item) => item.label === activeCategory);
  const visibleProjects = category ? projects.filter((project) => project.service === category.label) : projects;
  const conceptCount = visibleProjects.filter((project) => project.kind === 'concept').length;
  const resultLabel = conceptCount === visibleProjects.length && conceptCount > 0
    ? `${conceptCount} illustrative ${conceptCount === 1 ? 'concept' : 'concepts'}`
    : `${visibleProjects.length} ${visibleProjects.length === 1 ? 'example' : 'examples'}`;
  const filters = [
    { label: 'All work', shortLabel: 'All work', href: '/work', count: projects.length },
    ...projectCategories.map((item) => ({ label: item.label, shortLabel: item.shortLabel, href: `/work/category/${item.slug}`, count: projects.filter((project) => project.service === item.label).length })),
  ];

  // Category routes ship only their visible cards. Navigation and counts stay small.
  return <WorkGallery filters={filters} selected={activeCategory} selectedLabel={category?.shortLabel || 'All work'}
    description={category?.description || 'Explore the full collection of business challenges and possible solutions.'} resultLabel={resultLabel}>
    {visibleProjects.length ? <div className="project-grid">{visibleProjects.map((project) => <div className="project-grid-item" key={project.slug}>
      <article className="project-card">
        <div className={`project-visual project-visual--${project.visual || 'platform'}`}>
          <span className="project-kind">{project.kind === 'concept' ? 'Illustrative concept' : 'Project'}</span>
          <ProjectVisual project={project} compact />
        </div>
        <div className="project-meta"><span>{projectCategoryLabel(project.service)}</span>{project.kind !== 'concept' && project.year && <span>{project.year}</span>}</div>
        <h3><Link href={`/work/${project.slug}`}>{project.title}<ArrowUpRight aria-hidden="true" /></Link></h3>
        <p>{project.summary}</p>
        <Link href={`/work/${project.slug}`} className="project-card-link">{project.kind === 'concept' ? 'Explore concept' : 'View project'} <span aria-hidden="true">↗</span></Link>
      </article>
    </div>)}</div> : <div className="project-filter-empty"><h3>More possibilities to explore.</h3><p>Have a challenge in this area? We can talk through what a useful solution would look like.</p><Link href="/contact" className="text-link">Tell us about it <span aria-hidden="true">↗</span></Link></div>}
  </WorkGallery>;
}
