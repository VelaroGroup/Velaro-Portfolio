import type { ResolvingMetadata } from 'next';
import { WorkCollection } from '@/components/work-collection';
import { getProjects } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return pageMetadata({
    title: 'Work & possibilities',
    description: 'Explore how custom platforms, messaging automation, websites, and connected stores can solve everyday business problems.',
    path: '/work',
  }, parent);
}

export default async function Work() {
  return <WorkCollection projects={await getProjects()} />;
}
