import type { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Compass, Layers3, MousePointer2 } from 'lucide-react';
import { Cta } from '@/components/cta';
import { ProcessSteps, SectionHeading } from '@/components/section-heading';
import { pageMetadata } from '@/lib/metadata';

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return pageMetadata({
    title: 'About Velaro',
    description: 'Velaro designs custom automated platforms, connected workflows, websites, and stores around the way your business works.',
    path: '/about',
  }, parent);
}

const principles = [
  { number: '01', title: 'Understand before building.', description: 'We ask where time goes, where work stalls, and what people keep doing by hand. A useful solution begins with that picture.', Icon: Compass },
  { number: '02', title: 'Make the everyday easier.', description: 'Clear screens, sensible automation, and a next step people can understand. The technology should make the work feel simpler.', Icon: MousePointer2 },
  { number: '03', title: 'Build for what comes next.', description: 'Start with a focused, useful system. Give it the connections, visibility, and maintainable foundations it needs to grow.', Icon: Layers3 },
];

export default function About() {
  return <main id="main" className="secondary-page">
    <section className="page-hero about-hero"><div className="shell about-hero-grid">
      <div><div className="eyebrow">ABOUT VELARO</div><h1>Thoughtful design.<br />Practical engineering.</h1><p className="intro-text">We turn complicated, repetitive work into clear digital experiences and custom platforms that help a business move forward.</p><Link href="/contact" className="button button-primary">Let’s talk about your business <ArrowUpRight aria-hidden="true" /></Link></div>
      <div className="about-process-art" role="img" aria-label="Our approach: understand the business, connect the process, and make the everyday easier">
        <span className="about-art-kicker">A BETTER WAY TO WORK</span>
        <div className="about-art-inputs"><span>Conversations</span><span>People</span><span>Processes</span><span>Information</span></div>
        <ArrowDown aria-hidden="true" />
        <div className="about-art-core"><span className="about-art-spark" aria-hidden="true"><Layers3 size={22} /></span><strong>One considered system.</strong><span>Shaped around your business</span></div>
        <ArrowDown aria-hidden="true" />
        <div className="about-art-outcome"><span aria-hidden="true" /> More focus. Less repetition.</div>
      </div>
    </div></section>
    <section className="section about-perspective"><div className="shell about-perspective-grid">
      <span className="eyebrow">OUR POINT OF VIEW</span>
      <div><h2>The best place to start?<br />The thing your team keeps working around.</h2><p>Another spreadsheet. The same reply, typed again. A request that needs three reminders. These are signals that the way work moves could be better.</p><p>We look at the whole process, then design what fits: an automated workflow, a custom operations platform, a customer portal, or a website connected to the work behind it.</p><p>From WhatsApp and Instagram inquiries to approvals, orders, and reporting, the aim is the same: make the useful work easier to do.</p></div>
    </div></section>
    <section className="section soft-section"><div className="shell">
      <SectionHeading eyebrow="WHAT GUIDES US" title="Clear thinking. Useful outcomes." />
      <div className="about-principles">{principles.map(({ number, title, description, Icon }) => <article key={number}><div className="about-principle-top"><span>{number}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div></section>
    <section className="section dark-section"><div className="shell about-capabilities">
      <div><span className="eyebrow">CONNECTED BY DESIGN</span><h2>The customer experience.<br />And everything behind it.</h2><p>Good design and dependable engineering belong in the same conversation. We bring them together across your public website, daily operations, and customer touchpoints.</p></div>
      <div className="about-service-links"><Link href="/services/custom-software"><span>Custom automated platforms</span><ArrowUpRight aria-hidden="true" /></Link><Link href="/services/automation"><span>Workflows & messaging automation</span><ArrowUpRight aria-hidden="true" /></Link><Link href="/services/web"><span>Websites & digital experiences</span><ArrowUpRight aria-hidden="true" /></Link><Link href="/services/ecommerce"><span>Stores & connected commerce</span><ArrowUpRight aria-hidden="true" /></Link></div>
    </div></section>
    <section className="section"><div className="shell"><SectionHeading eyebrow="WORKING TOGETHER" title="A clear path, from problem to platform." description="We keep the conversation practical and the next step visible." /><ProcessSteps /></div></section>
    <Cta title="Tell us what takes too much time." text="You don’t need a finished brief. A real business problem is a useful place to begin." />
  </main>;
}
