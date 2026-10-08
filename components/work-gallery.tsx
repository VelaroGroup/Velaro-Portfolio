'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, type KeyboardEvent, type ReactNode } from 'react';

type GalleryCategory = { slug: string; label: string; shortLabel: string };
type GalleryItem = { slug: string; category: string; concept: boolean; card: ReactNode };

export function WorkGallery({ categories, items, initialCategory }: {
  categories: readonly GalleryCategory[];
  items: GalleryItem[];
  initialCategory: string;
}) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const selected = pathname === '/work' ? 'All work'
    : categories.find((category) => pathname === `/work/category/${category.slug}`)?.label || initialCategory;
  const selectedLabel = categories.find((category) => category.label === selected)?.shortLabel || 'All work';
  const visibleItems = selected === 'All work' ? items : items.filter((item) => item.category === selected);
  const conceptCount = visibleItems.filter((item) => item.concept).length;
  const resultLabel = conceptCount === visibleItems.length && conceptCount > 0
    ? `${conceptCount} illustrative ${conceptCount === 1 ? 'concept' : 'concepts'}`
    : `${visibleItems.length} ${visibleItems.length === 1 ? 'example' : 'examples'}`;
  const filters = [
    { label: 'All work', shortLabel: 'All work', href: '/work', count: items.length },
    ...categories.map((category) => ({ ...category, href: `/work/category/${category.slug}`, count: items.filter((item) => item.category === category.label).length })),
  ];

  function moveFilterFocus(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const links = Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>('a') || []);
    const current = links.indexOf(event.target as HTMLAnchorElement);
    if (current < 0) return;
    let next: number;
    if (event.key === 'ArrowRight') next = (current + 1) % links.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + links.length) % links.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = links.length - 1;
    else return;
    event.preventDefault();
    links[next]?.focus({ preventScroll: true });
  }

  return <div className="work-gallery" id="work-gallery">
    <div className="project-filter-bar">
      <span className="project-filter-label">Explore by service</span>
      <nav ref={navRef} className="project-filters" aria-label="Project categories" onKeyDown={moveFilterFocus}>
        {filters.map((filter) => <Link
          key={filter.href}
          href={`${filter.href}#work-gallery`}
          scroll={false}
          className={selected === filter.label ? 'active' : undefined}
          aria-current={selected === filter.label ? 'page' : undefined}
          aria-label={`${filter.shortLabel}, ${filter.count} ${filter.count === 1 ? 'example' : 'examples'}`}
          aria-controls="work-results"
        ><span>{filter.shortLabel}</span><span className="project-filter-count" aria-hidden="true">{filter.count}</span></Link>)}
      </nav>
    </div>
    <div className="project-results-heading">
      <h2 id="work-results-title">{selectedLabel === 'All work' ? 'The collection' : selectedLabel}</h2>
      <p role="status" aria-live="polite" aria-atomic="true"><span className="sr-only">{selectedLabel}: </span>{resultLabel}</p>
    </div>
    <div id="work-results" className="project-results" aria-labelledby="work-results-title">
      {visibleItems.length ? <div className="project-grid">{visibleItems.map((item) => <div className="project-grid-item" key={item.slug}>{item.card}</div>)}</div>
        : <div className="project-filter-empty"><h3>More possibilities to explore.</h3><p>Have a challenge in this area? We can talk through what a useful solution would look like.</p><Link href="/contact" className="text-link">Tell us about it <span aria-hidden="true">↗</span></Link></div>}
    </div>
  </div>;
}
