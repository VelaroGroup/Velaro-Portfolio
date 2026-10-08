import { site, siteUrl } from './site';

export const organizationId = `${siteUrl}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/velaro-mark.png`,
  email: site.email,
  description: site.description,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: site.name,
  url: siteUrl,
  publisher: { '@id': organizationId },
};
