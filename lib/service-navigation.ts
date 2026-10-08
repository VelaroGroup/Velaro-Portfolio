import type { ServiceSlug } from './services';

// Only the link labels and slugs belong in the interactive header's client bundle.
export const serviceNavigation = [
  { slug: 'custom-software', name: 'Custom software & platforms' },
  { slug: 'automation', name: 'Automation' },
  { slug: 'web', name: 'Web development' },
  { slug: 'ecommerce', name: 'E-commerce' },
] as const satisfies ReadonlyArray<{ slug: ServiceSlug; name: string }>;
