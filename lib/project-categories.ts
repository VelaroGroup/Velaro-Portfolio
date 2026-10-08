// Shared by category metadata, gallery introductions and navigation.
export const projectCategories = [
  {
    slug: 'automation', label: 'Automation', shortLabel: 'Automation',
    description: 'Customer conversations, follow-ups, data entry, and handoffs. Explore how repetitive work can move forward with less manual effort.',
  },
  {
    slug: 'custom-software', label: 'Custom software & platforms', shortLabel: 'Custom platforms',
    description: 'One workspace shaped around your team, your information, and your way of working. Explore custom platforms that connect everyday operations.',
  },
  {
    slug: 'web-development', label: 'Web development', shortLabel: 'Websites',
    description: 'Thoughtful websites that turn a clear first impression into a connected next step. Explore experiences built around useful customer journeys.',
  },
  {
    slug: 'ecommerce', label: 'E-commerce', shortLabel: 'E-commerce',
    description: 'A better shopping experience, supported by more organised operations behind the scenes. Explore connected stores, orders and customer support.',
  },
] as const;

export function projectCategoryLabel(service: string): string {
  return projectCategories.find((category) => category.label === service)?.shortLabel || service;
}
