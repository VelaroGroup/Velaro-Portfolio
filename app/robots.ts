import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // Even a noindex preview must be crawlable for its noindex directive to be read.
    rules: { userAgent: '*', allow: '/' },
    ...(process.env.SITE_NOINDEX === '1' ? {} : { sitemap: `${siteUrl}/sitemap.xml` }),
  };
}
