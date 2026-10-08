import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Cta } from '@/components/cta';
import { ProjectGrid } from '@/components/project-grid';
import { getProjects, projectCategories } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

const descriptions: Record<string, string> = {
  automation: 'Customer conversations, follow-ups, data entry, and handoffs. Explore how the repetitive work can move forward with less manual effort.',
  'custom-software': 'One workspace shaped around your team, your information, and your way of working.',
  'web-development': 'Thoughtful websites that turn a clear first impression into a connected next step.',
  ecommerce: 'A better shopping experience, supported by more organised operations behind the scenes.',
};

export function generateStaticParams() {
  return projectCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { category } = await params;
  const item = projectCategories.find(({ slug }) => slug === category);
  return item ? pageMetadata({ title: `${item.shortLabel} concepts & work`, description: descriptions[category], path: `/work/category/${category}` }, parent) : {};
}

export default async function WorkCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = projectCategories.find(({ slug }) => slug === category);
  if (!item) notFound();
  const projects = await getProjects();

  return <main id="main" className="secondary-page">
    <section className="page-hero work-category-hero"><div className="shell">
      <Link href="/work" className="back-link"><span aria-hidden="true">←</span> All work & possibilities</Link>
      <div className="eyebrow">EXPLORE THE POSSIBILITIES</div>
      <h1>{item.shortLabel}</h1>
      <p className="intro-text">{descriptions[category]}</p>
      <p className="work-context">Concepts are clearly marked and demonstrate possible solutions.</p>
    </div></section>
    <section className="section work-category-content"><div className="shell"><ProjectGrid projects={projects} activeCategory={item.label} /></div></section>
    <Cta title="Your business. Your way of working." text="Tell us where things get repetitive or complicated. We’ll help you map a clearer path." />
  </main>;
}
