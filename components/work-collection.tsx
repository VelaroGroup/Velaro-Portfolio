import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Cta } from '@/components/cta';
import { ProjectGrid, ProjectVisual } from '@/components/project-grid';
import { SectionHeading } from '@/components/section-heading';
import { projectCategoryLabel, type Project } from '@/lib/projects';

// All category routes share this frame so filtering never changes the content above it.
export function WorkCollection({ projects, activeCategory = 'All work' }: { projects: Project[]; activeCategory?: string }) {
  const featured = projects.find((project) => project.featured) || projects[0];
  const onlyConcepts = projects.length > 0 && projects.every((project) => project.kind === 'concept');

  return <main id="main" className="secondary-page">
    <section className="page-hero work-intro"><div className="shell">
      <div className="eyebrow">WORK & POSSIBILITIES</div>
      <h1>See what better{' '}<br />could look like.</h1>
      <p className="intro-text">From a branded client portal to a booking flow that takes care of the follow-up. Explore custom platforms, automation, websites, and commerce built around a business.</p>
      <p className="work-context">{onlyConcepts ? 'Our current collection is a set of illustrative concepts, showing the problems we can help you solve.' : 'Explore the collection. Illustrative concepts are clearly marked throughout.'}</p>
    </div></section>
    {featured && <section className="work-featured-section"><div className="shell">
      <article className="work-featured">
        <div className="work-featured-visual"><span className="project-kind">{featured.kind === 'concept' ? 'Featured concept' : 'Featured project'}</span><ProjectVisual project={featured} /></div>
        <Link href={`/work/${featured.slug}`} className="work-featured-copy"><div><span className="eyebrow">{projectCategoryLabel(featured.service)}</span><h2>{featured.title}</h2><p>{featured.summary}</p></div><span className="work-featured-arrow"><ArrowUpRight aria-hidden="true" /></span></Link>
      </article>
    </div></section>}
    <section className="section work-gallery-section"><div className="shell">
      <SectionHeading eyebrow="A CLOSER LOOK" title="Different challenges. Useful possibilities." description="Every business has its own friction. The right solution starts there." />
      <ProjectGrid projects={projects} activeCategory={activeCategory} />
    </div></section>
    <section className="section dark-section"><div className="shell work-belief">
      <div><span className="eyebrow">THE THINKING BEHIND THE WORK</span><h2>Good design makes<br />the whole thing work.</h2></div>
      <div className="work-belief-points"><p><span>01</span><strong>Understand the real problem</strong></p><p><span>02</span><strong>Connect the customer and the team</strong></p><p><span>03</span><strong>Make the next step feel simple</strong></p></div>
    </div></section>
    <Cta title="What could we make work better?" text="Bring the repetitive task, disconnected tools, or idea. We’ll help you find a useful starting point." />
  </main>;
}
