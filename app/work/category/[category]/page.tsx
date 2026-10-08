import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkCollection } from '@/components/work-collection';
import { getProjects, projectCategories } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

export const revalidate = 300;

export function generateStaticParams() {
  return projectCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const { category } = await params;
  const item = projectCategories.find(({ slug }) => slug === category);
  return item ? pageMetadata({ title: `${item.shortLabel} concepts & work`, description: item.description, path: `/work/category/${category}` }, parent) : {};
}

export default async function WorkCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = projectCategories.find(({ slug }) => slug === category);
  if (!item) notFound();
  const projects = await getProjects();

  return <WorkCollection projects={projects} activeCategory={item.label} />;
}
