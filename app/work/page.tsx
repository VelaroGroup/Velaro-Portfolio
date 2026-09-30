import type { Metadata } from 'next';
import Link from 'next/link';
import { Cta } from '@/components/cta';
import { ProjectGrid } from '@/components/project-grid';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = { title: 'Our work', description: 'Explore Velaro projects in automation, web development, e-commerce, and custom software.', alternates: { canonical: '/work' } };

export default async function Work() {
  const projects = await getProjects();
  const featured = projects.find((project) => project.featured) || projects[0];

  return <main id="main">
    <section className="inner-hero work-hero"><div className="shell work-hero-grid"><div><div className="eyebrow">OUR WORK</div><h1>Built with purpose<span className="accent-text">.</span></h1><p>Selected digital products and platforms designed around real business challenges.</p></div>{featured && <Link href={`/work/${featured.slug}`} className="featured-project-hero"><div className="featured-project-image">{featured.image ? <img src={featured.image} alt={featured.imageAlt || featured.title} /> : <span>{featured.title.slice(0, 1)}</span>}</div><div><span>FEATURED CASE STUDY</span><h2>{featured.title} <b>↗</b></h2><p>{featured.service}{featured.year && ` · ${featured.year}`}</p></div></Link>}</div></section>
    <section className="section"><div className="shell">{projects.length ? <><div className="work-grid-heading"><div><div className="section-label">CASE STUDIES</div><h2>Work with measurable intent.</h2></div><p>Browse selected engagements across automation, web, e-commerce, and custom software.</p></div><ProjectGrid projects={projects} featuredSlug={featured?.slug} /><div className="work-progress"><div><span>IN PROGRESS</span><h2>More work is taking shape.</h2></div><p>We only publish projects once the work is complete and sharing it has been approved.</p></div></> : <div className="work-empty"><div className="work-empty-brand" aria-hidden="true"><img className="work-empty-logo" src="/velaro-logo.png" alt="" /></div><div className="work-empty-content"><p className="work-empty-eyebrow">CASE STUDIES</p><h2>Results worth sharing are in progress.</h2><p>We’re preparing selected case studies. Have a challenge of your own? Let’s discuss it.</p><Link href="/contact" className="button button-primary">Start a project conversation <span aria-hidden="true">↗</span></Link></div></div>}</div></section>
    <Cta />
  </main>;
}
