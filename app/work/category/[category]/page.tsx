import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkCollection } from '@/components/work-collection';
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

  return <WorkCollection projects={projects} activeCategory={item.label} />;
}
