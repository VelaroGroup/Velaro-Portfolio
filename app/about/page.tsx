import type { ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Compass, Gauge, Layers3 } from 'lucide-react';
import { Cta } from '@/components/cta';
import { SectionHeading } from '@/components/section-heading';
import { pageMetadata } from '@/lib/metadata';

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return pageMetadata({
    title: 'About Velaro',
    description: 'Meet Velaro, a digital growth studio based in Lebanon. We build custom platforms, business automation, websites and stores for the Middle East and beyond.',
    path: '/about',
  }, parent);
}

const principles = [
  { number: '01', title: 'Velocity', description: 'Move from an idea to something useful, with a clear scope, practical decisions and attention to detail.', Icon: Gauge },
  { number: '02', title: 'Vision', description: 'Understand the business before choosing the technology. Give every screen, connection and workflow a clear purpose.', Icon: Compass },
  { number: '03', title: 'Value', description: 'Build tools that are useful every day, easy to manage and connected to the goals of the business.', Icon: Layers3 },
];

const approach = [
  { title: 'Listen and map.', description: 'Follow a real inquiry, order or task with the people who handle it. Find the repeated steps, delays and missing information.' },
  { title: 'Build what fits.', description: 'Shape the right platform and connect the right tools. Automate the repeated work, with people involved where judgement matters.' },
  { title: 'Put it to work.', description: 'Test real scenarios, explain how things work and support the handover. Keep improving as the business evolves.' },
];

export default function About() {
  return <main id="main" className="secondary-page">
    <section className="page-hero about-hero">
      <div className="shell about-hero-grid">
        <div>
          <span className="eyebrow">ABOUT VELARO</span>
          <h1>A clearer way<br />to move forward.</h1>
          <p className="intro-text">Velaro is a digital growth studio based in Lebanon, working with businesses across the Middle East and beyond.</p>
          <p className="about-hero-detail">We connect thoughtful design with practical technology: custom platforms, automated workflows, websites and online stores.</p>
          <div className="about-hero-actions">
            <Link href="/contact" className="button button-primary">Start a conversation <ArrowUpRight aria-hidden="true" /></Link>
            <a href="#our-approach" className="text-link">How we work</a>
          </div>
        </div>
        <figure className="about-brand-art">
          <div className="about-brand-top"><span>DIGITAL GROWTH STUDIO</span><ArrowUpRight aria-hidden="true" /></div>
          <div className="about-brand-mark"><Image src="/velaro-mark.png" alt="Velaro’s original blue and cyan V logo" width={680} height={680} sizes="(max-width: 600px) 230px, 260px" /></div>
          <figcaption>
            <span className="about-brand-wordmark">VELARO</span>
            <p>Accelerating digital growth.</p>
            <div className="about-brand-pillars"><span>Velocity</span><span>Vision</span><span>Value</span></div>
          </figcaption>
        </figure>
      </div>
    </section>
    <section className="section about-perspective">
      <div className="shell about-perspective-grid">
        <div className="about-story-label"><span className="eyebrow">OUR STORY</span><p>Steady, confident<br />progress.</p></div>
        <div>
          <h2>Velocity, with purpose.</h2>
          <p>Velaro started with a simple question: how can we make the web side of a business feel organised and under control?</p>
          <p>Our name comes from <em>velocity</em>: steady, confident progress. That belief shaped our work on websites and online stores, and it guides the custom platforms and automation we build today.</p>
          <p>Growth also depends on what happens behind the screen: how an inquiry becomes a customer, how information moves, and how a team gets work done. We bring those pieces together so the digital side of your business feels easier to run.</p>
        </div>
      </div>
    </section>
    <section className="section about-values">
      <div className="shell">
        <SectionHeading eyebrow="OUR BRAND PILLARS" title="Three principles. One direction." />
        <div className="about-principles">{principles.map(({ number, title, description, Icon }) => <article key={number}>
          <div className="about-principle-top"><span>{number}</span><Icon aria-hidden="true" /></div>
          <h3>{title}</h3><p>{description}</p>
        </article>)}</div>
      </div>
    </section>
    <section id="our-approach" className="section dark-section">
      <div className="shell about-capabilities">
        <div>
          <span className="eyebrow">HOW WE WORK</span>
          <h2>First, understand the work.<br />Then, make it flow.</h2>
          <p>We begin with the people and processes already in place. Where do requests wait? Which information gets entered twice? What does the team keep answering by hand?</p>
          <p>Those everyday details give us a useful starting point for a system built around your business.</p>
          <Link href="/services/custom-software" className="text-link">Explore custom platforms <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <ol className="about-working-steps">{approach.map(({ title, description }, index) => <li key={title}>
          <span className="about-step-number" aria-hidden="true">0{index + 1}</span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </li>)}</ol>
      </div>
    </section>
    <Cta title="Let’s find your next step." text="Tell us about your business, what you want to build, or the work that keeps slowing things down." />
  </main>;
}
