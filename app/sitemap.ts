import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { getProjects, projectCategories } from '@/lib/projects';
import { siteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    '', '/about', '/contact', '/work', '/privacy', '/terms',
    ...services.map(({ slug }) => `/services/${slug}`),
    ...projectCategories.map(({ slug }) => `/work/category/${slug}`),
    ...(await getProjects()).map(({ slug }) => `/work/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path ? 'monthly' : 'weekly',
    priority: path ? 0.7 : 1,
  }));
}
