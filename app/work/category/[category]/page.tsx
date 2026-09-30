import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cta } from '@/components/cta';
import { ProjectGrid } from '@/components/project-grid';
import { getProjects } from '@/lib/content';

const categories = {
  automation: 'Automation',
  'web-development': 'Web development',
  ecommerce: 'E-commerce',
  'custom-software': 'Custom software & platforms',
} as const;

export function generateStaticParams() { return Object.keys(categories).map((category) => ({ category })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const name = categories[category as keyof typeof categories];
  return name ? { title: `${name} projects`, description: `Explore Velaro's ${name.toLowerCase()} projects.`, alternates: { canonical: `/work/category/${category}` } } : {};
}

export default async function WorkCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = categories[category as keyof typeof categories];
  if (!name) notFound();
  const projects = await getProjects();
  return <main id="main"><section className="inner-hero"><div className="shell"><div className="eyebrow">SELECTED WORK</div><h1>{name}<span className="accent-text">.</span></h1><p>Projects shaped around real business needs in {name.toLowerCase()}.</p></div></section><section className="section"><div className="shell"><div className="work-grid-heading"><div><div className="section-label">CASE STUDIES</div><h2>Explore {name.toLowerCase()}.</h2></div></div><ProjectGrid projects={projects} activeCategory={name} /></div></section><Cta /></main>;
}
