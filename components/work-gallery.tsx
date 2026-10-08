'use client';

import Link from 'next/link';
import { useRef, type KeyboardEvent, type ReactNode } from 'react';

type GalleryFilter = { label: string; shortLabel: string; href: string; count: number };

export function WorkGallery({ filters, selected, selectedLabel, description, resultLabel, children }: {
  filters: GalleryFilter[];
  selected: string;
  selectedLabel: string;
  description: string;
  resultLabel: string;
  children: ReactNode;
}) {
  const navRef = useRef<HTMLElement>(null);

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
      <p style={{ flexBasis: '100%', maxWidth: '680px', lineHeight: 1.7 }}>{description}</p>
    </div>
    <div id="work-results" className="project-results" aria-labelledby="work-results-title">
      {children}
    </div>
  </div>;
}
