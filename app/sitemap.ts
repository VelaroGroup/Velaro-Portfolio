import type { MetadataRoute } from 'next';
import { services, getProjects, siteUrl } from '@/lib/content';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const paths=['','/about','/contact','/work',...services.map(s=>`/services/${s.slug}`),...(await getProjects()).map(p=>`/work/${p.slug}`)];return paths.map(path=>({url:`${siteUrl}${path}`,lastModified:new Date(),changeFrequency:path?'monthly':'weekly',priority:path?0.7:1}))}
