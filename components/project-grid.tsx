import Link from 'next/link';
import type { Project } from '@/lib/content';

const categories = [
  { label: 'All work', href: '/work' },
  { label: 'Automation', href: '/work/category/automation' },
  { label: 'Web development', href: '/work/category/web-development' },
  { label: 'E-commerce', href: '/work/category/ecommerce' },
  { label: 'Custom software & platforms', href: '/work/category/custom-software' },
] as const;

export function ProjectGrid({ projects, featuredSlug, activeCategory = 'All work' }: { projects: Project[]; featuredSlug?: string; activeCategory?: string }) {
  const visibleProjects = projects.filter((project) => activeCategory === 'All work' ? project.slug !== featuredSlug : project.service === activeCategory);

  return <>
    <nav className="project-filters" aria-label="Project categories">{categories.map((category) => <Link key={category.label} href={category.href} className={activeCategory === category.label ? 'active' : ''}>{category.label}</Link>)}</nav>
    {visibleProjects.length ? <div className="project-grid">{visibleProjects.map((project) => <Link href={`/work/${project.slug}`} className="project-card" key={project.slug}><div className="project-visual">{project.image ? <img src={project.image} alt={project.imageAlt || project.title} /> : <span>{project.title.slice(0, 1)}</span>}</div><div className="project-meta"><span>{project.service}</span><span>{project.year}</span></div><h2>{project.title} <span aria-hidden="true">↗</span></h2><p>{project.summary}</p></Link>)}</div> : <p className="project-filter-empty">No published projects in this category yet.</p>}
  </>;
}
