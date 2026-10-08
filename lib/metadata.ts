import type { Metadata, ResolvingMetadata } from 'next';
import { site, siteUrl } from './site';

export async function pageMetadata({ title, description, path }: { title: string; description: string; path: `/${string}` }, parent: ResolvingMetadata): Promise<Metadata> {
  const inherited = await parent;
  const url = new URL(path, siteUrl).href;
  const shareTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: shareTitle,
      description,
      url,
      images: inherited.openGraph?.images,
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: inherited.twitter?.images ?? inherited.openGraph?.images },
    // Retain the generated image URL and dimensions from Next's file metadata.
  };
}
