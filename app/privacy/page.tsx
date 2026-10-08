import type { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return pageMetadata({
    title: 'Privacy Policy',
    description: 'Read how Velaro collects, uses, and protects information when you visit our website or contact us about a project.',
    path: '/privacy',
  }, parent);
}

// Policy wording preserved from https://www.velaro.group/privacy on 2026-10-08,
// with the studio introduction updated to reflect the current service offering.
// The separate form note describes the current website's email handoff.
const sections = [
  {
    title: '1. Who we are',
    content: <p>Velaro is a digital studio building custom platforms, business automations, websites and online stores. This Privacy Policy explains how we handle information when you visit our website or contact us about a project.</p>,
  },
  {
    title: '2. Information you share with us',
    content: <p>The main information we collect is what you choose to share with us, for example when you complete the contact form or send us an email. This can include your name, contact details, business information, and a description of your project or website.</p>,
  },
  {
    title: '3. How we use this information',
    content: <>
      <p>We use the information you provide to:</p>
      <ul style={{ listStyle: 'disc', paddingLeft: '1.4em', margin: 0, display: 'grid', gap: '8px' }}>
        <li>Reply to your enquiry and understand your needs</li>
        <li>Prepare proposals, timelines, and project recommendations</li>
        <li>Communicate with you about active or potential work</li>
      </ul>
      <p>We do not sell your data or use it for unrelated marketing.</p>
    </>,
  },
  {
    title: '4. Website usage and analytics',
    content: <p>Like most websites, we may use basic analytics tools to understand which pages are visited and how the site is performing. This helps us improve the experience but does not aim to identify individual visitors.</p>,
  },
  {
    title: '5. How we store information',
    content: <p>Client information is stored securely in the tools we use to manage email, proposals, and project work. We keep data for as long as it is reasonably needed for ongoing projects, potential future collaboration, or to meet legal and administrative requirements.</p>,
  },
  {
    title: '6. Sharing information',
    content: <p>Information may be processed by trusted service providers (such as hosting, email, and analytics platforms) solely to operate and improve our website and services. We do not give your details to third parties so they can market their own services to you.</p>,
  },
  {
    title: '7. Your choices',
    content: <p>If you would like to review, update, or delete information you have shared with us, you can contact us at <a href={`mailto:${site.email}`} style={{ textDecoration: 'underline', textUnderlineOffset: '3px', color: 'var(--navy)' }}>{site.email}</a>. We will do our best to respond within a reasonable time.</p>,
  },
  {
    title: '8. Updates to this policy',
    content: <p>We may update this page from time to time if our practices change. When we do, we will adjust the text here so you can see the latest version.</p>,
  },
];

export default function PrivacyPage() {
  return <main id="main" className="secondary-page">
    <section className="page-hero">
      <div className="shell" style={{ maxWidth: '800px' }}>
        <span className="eyebrow">INFORMATION</span>
        <h1>Our Privacy Policy</h1>
        <p>How Velaro collects, uses, and protects information you share with us.</p>
      </div>
    </section>
    <div className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <article className="shell" aria-label="Privacy policy" style={{ maxWidth: '800px', display: 'grid', gap: '36px' }}>
        <aside className="soft-section" style={{ padding: '22px', borderLeft: '3px solid var(--cyan)', color: 'var(--ink-muted)' }}>
          <p><strong style={{ color: 'var(--navy)' }}>About the current contact form.</strong> The form prepares an email in your email app. It does not send or submit your details from this website; you review and send the message in your email app.</p>
        </aside>
        {sections.map(({ title, content }, index) => <section key={title} aria-labelledby={`privacy-section-${index + 1}`}>
          <h2 id={`privacy-section-${index + 1}`} style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.65rem)', lineHeight: 1.3, letterSpacing: '-.025em', marginBottom: '14px' }}>{title}</h2>
          <div style={{ color: 'var(--ink-muted)', lineHeight: 1.8, display: 'grid', gap: '14px' }}>{content}</div>
        </section>)}
        <nav aria-label="Related pages" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px', borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
          <Link href="/terms" className="text-link">Terms of service</Link>
          <Link href="/contact" className="text-link">Contact Velaro</Link>
        </nav>
      </article>
    </div>
  </main>;
}
