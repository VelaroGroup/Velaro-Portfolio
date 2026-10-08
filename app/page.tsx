import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Layers3, MessageCircle, Workflow } from 'lucide-react';
import { Cta } from '@/components/cta';
import { PlatformPreview } from '@/components/platform-preview';
import { ProcessSteps, SectionHeading } from '@/components/section-heading';
import { WorkflowExplorer } from '@/components/workflow-explorer';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export default function Home() {
  return (
    <main id="main">
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dash" /> Custom platforms & automation</span>
            <h1>Less busywork.<br /><span>More possibility.</span></h1>
            <p>We find the repetitive work holding your business back, then build custom platforms and automations that move it forward.</p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-primary">Let’s simplify your work <ArrowRight size={19} /></Link>
              <Link href="#how-it-works" className="text-link">See how it works <ArrowUpRight size={17} /></Link>
            </div>
            <div className="hero-assurance"><span><Check size={14} /> Built around your process</span><span><Check size={14} /> Connected to your tools</span></div>
          </div>
          <div className="hero-preview-wrap"><PlatformPreview variant="inbox" /><div className="hero-preview-note"><span className="hero-note-icon"><Workflow size={19} /></span><div><strong>One message. A connected next step.</strong><span>Reply → customer record → task → follow-up</span></div></div></div>
        </div>
        <div className="shell hero-footnote"><span>Your business has its own way of working.<strong> Your software should too.</strong></span><a href="#possibilities" aria-label="Explore what we can automate">EXPLORE WHAT’S POSSIBLE <ArrowRight size={14} /></a></div>
      </section>

      <section className="channel-strip" aria-label="Channels and tools we can connect"><div className="shell"><span>Connect the conversations.<br /><strong>Keep the work moving.</strong></span><div className="channel-names"><span><b className="channel-icon whatsapp">W</b>WhatsApp Business</span><span><b className="channel-icon instagram">I</b>Instagram</span><span><b className="channel-icon facebook">f</b>Messenger</span><span><b className="channel-icon tiktok">♪</b>TikTok</span><span className="other-tools">+ your everyday tools</span></div></div></section>

      <section id="possibilities" className="section">
        <div className="shell">
          <SectionHeading eyebrow="Start with what slows you down" title="There’s a better way to do the everyday." description="You know where the friction is. We turn it into a clear process, useful software and fewer manual steps." />
          <WorkflowExplorer />
        </div>
      </section>

      <section className="section dark-section platform-section">
        <div className="shell platform-section-grid">
          <div><span className="eyebrow">Your process. Your platform.</span><h2>Everything working<br />better, together.</h2><p>Your customer conversations, operations and team deserve a shared home. We build a platform around your business, with the workflows that make it work.</p><ul className="plain-checks"><li><Check />One place for your team and information</li><li><Check />Automations shaped around your rules</li><li><Check />Clear roles, approvals and human handoffs</li></ul><Link href="/services/custom-software" className="button button-accent">Explore custom platforms <ArrowRight size={18} /></Link></div>
          <PlatformPreview variant="platform" />
        </div>
      </section>

      <section className="section" id="services">
        <div className="shell">
          <SectionHeading eyebrow="What we can build for you" title="The right tools. One connected business." description="A custom platform at the centre. Automations, websites and online stores that work with it." />
          <div className="service-list">{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} className="service-row"><span className="service-number">{service.number}</span><div><h3>{service.name}</h3><p>{service.description}</p></div><span className="service-row-tag">{service.slug === 'custom-software' ? 'Built around you' : service.slug === 'automation' ? 'Less manual work' : service.slug === 'web' ? 'A better first impression' : 'From shop to operations'}</span><span className="service-arrow"><ArrowUpRight size={22} /></span></Link>)}</div>
        </div>
      </section>

      <section className="section soft-section messaging-section">
        <div className="shell two-col">
          <div><span className="eyebrow">From a message to meaningful action</span><h2>More than<br />an automatic reply.</h2><p className="intro-text">Answer common questions, capture a lead, check an order, arrange a booking or bring in your team. Each conversation becomes part of a workflow designed for your business.</p><Link href="/services/automation" className="text-link">Explore messaging automation <ArrowRight size={18} /></Link></div>
          <div className="messaging-features">
            {[{ Icon: MessageCircle, title: 'Replies with a purpose', text: 'Helpful answers based on your information and the way you want to communicate.' }, { Icon: Workflow, title: 'The next step, connected', text: 'Move from an inquiry to a customer record, appointment, task or order update.' }, { Icon: Layers3, title: 'Your team stays in control', text: 'Route complex conversations to the right person, with the context they need.' }].map(({ Icon, title, text }) => <div key={title}><span className="feature-icon"><Icon size={23} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}
            <p className="integration-note">{site.messagingNote}</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="shell"><SectionHeading eyebrow="How we work" title="First, understand. Then, make it work." description="We start with your actual day-to-day work, and stay close from the first conversation to the next improvement." /><ProcessSteps /></div>
      </section>

      <section className="section work-teaser-section">
        <div className="shell"><SectionHeading eyebrow="A little of what’s possible" title="Thoughtful on the outside. Connected underneath." />
          <div className="home-work-grid">
            <Link href="/work/preview-software-project" className="home-work-card"><PlatformPreview variant="platform" compact /><div className="home-work-title"><div><span className="concept-label">Illustrative concept</span><h3>A shared home for the work.</h3><p>A custom workspace for people, projects and approvals.</p></div><ArrowUpRight size={24} /></div></Link>
            <Link href="/work/preview-ecommerce-project" className="home-work-card"><PlatformPreview variant="commerce" compact /><div className="home-work-title"><div><span className="concept-label">Illustrative concept</span><h3>A store that works behind the scenes.</h3><p>From a thoughtful shopping experience to connected operations.</p></div><ArrowUpRight size={24} /></div></Link>
          </div><Link href="/work" className="text-link work-all-link">Explore all concepts <ArrowRight size={17} /></Link>
        </div>
      </section>
      <Cta />
    </main>
  );
}
