'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="main" className="shell not-found">
      <title>Page unavailable | Velaro</title>
      <span className="eyebrow">Let’s try that again</span>
      <h1>This page couldn’t load.</h1>
      <p>Please try again, or reach us at <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <div className="hero-actions">
        <button type="button" className="button button-primary" onClick={() => retry()}>Try again</button>
        <Link href="/" className="text-link">Back to the homepage</Link>
      </div>
    </main>
  );
}
