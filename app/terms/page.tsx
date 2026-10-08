import type { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return pageMetadata({
    title: 'Terms of Service',
    description: 'Read the terms for working with Velaro on custom platforms, business automation, websites and online stores.',
    path: '/terms',
  }, parent);
}

// Policy wording preserved from https://www.velaro.group/terms on 2026-10-08.
// The separate form note describes the current website's email handoff.
const sections = [
  {
    title: '1. Use of this website',
    content: <p>The Velaro website provides information about our services and ways to contact us. The content is for general information only and may be updated or changed at any time without notice.</p>,
  },
  {
    title: '2. Enquiries and proposals',
    content: <p>Sending an enquiry through the contact form or by email does not create a formal engagement. After we understand your needs, we may provide a proposal or outline of work. A project only begins once both parties have agreed in writing to the scope, timelines, and investment.</p>,
  },
  {
    title: '3. No guarantees until agreement',
    content: <p>Any timelines, ideas, or suggestions shared before a formal agreement are indicative only. Commitments around delivery dates, responsibilities, and outcomes apply only after a written agreement or statement of work is in place.</p>,
  },
  {
    title: '4. Intellectual property',
    content: <>
      <p>The content, design, and structure of this website are owned by Velaro unless otherwise stated. You may not copy, reuse, or redistribute this material for commercial purposes without prior written permission.</p>
      <p>For client projects, ownership of deliverables is defined in the specific project agreement.</p>
    </>,
  },
  {
    title: '5. Limitation of liability',
    content: <p>We aim to provide accurate, helpful information on this site, but we do not accept liability for decisions made solely on the basis of its content. For project work, responsibilities and limitations are set out in the relevant agreement.</p>,
  },
  {
    title: '6. Contact',
    content: <p>If you have any questions about these terms, please contact us at <a href={`mailto:${site.email}`} style={{ textDecoration: 'underline', textUnderlineOffset: '3px', color: 'var(--navy)' }}>{site.email}</a>.</p>,
  },
];

export default function TermsPage() {
  return <main id="main" className="secondary-page">
    <section className="page-hero">
      <div className="shell" style={{ maxWidth: '800px' }}>
        <span className="eyebrow">INFORMATION</span>
        <h1>Our Terms of Service</h1>
        <p>The key principles that govern how we work with our clients.</p>
      </div>
    </section>
    <div className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <article className="shell" aria-label="Terms of service" style={{ maxWidth: '800px', display: 'grid', gap: '36px' }}>
        <aside className="soft-section" style={{ padding: '22px', borderLeft: '3px solid var(--cyan)', color: 'var(--ink-muted)' }}>
          <p><strong style={{ color: 'var(--navy)' }}>About the current contact form.</strong> The form prepares an email in your email app. It does not send or submit your details from this website; you review and send the message in your email app.</p>
        </aside>
        {sections.map(({ title, content }, index) => <section key={title} aria-labelledby={`terms-section-${index + 1}`}>
          <h2 id={`terms-section-${index + 1}`} style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.65rem)', lineHeight: 1.3, letterSpacing: '-.025em', marginBottom: '14px' }}>{title}</h2>
          <div style={{ color: 'var(--ink-muted)', lineHeight: 1.8, display: 'grid', gap: '14px' }}>{content}</div>
        </section>)}
        <nav aria-label="Related pages" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
          <Link href="/privacy" className="text-link">Privacy policy</Link>
          <Link href="/contact" className="text-link">Contact Velaro</Link>
        </nav>
      </article>
    </div>
  </main>;
}
