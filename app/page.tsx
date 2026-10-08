import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Globe2, Layers3, ShoppingBag, Workflow } from 'lucide-react';
import { Cta } from '@/components/cta';
import { JsonLd } from '@/components/json-ld';
import { PlatformPreview } from '@/components/platform-preview';
import { ProcessSteps, SectionHeading } from '@/components/section-heading';
import { WorkflowExplorer } from '@/components/workflow-explorer';
import { site } from '@/lib/site';
import { websiteSchema } from '@/lib/structured-data';
import velaroMark from '@/public/velaro-mark.png';

const offerings = [
  { slug: 'custom-software', number: '01', name: 'Custom platforms', line: 'Your business. Your own system.', description: 'Business software, team workspaces and customer portals, shaped around your operations and available under your brand.', details: 'Business systems · Portals · White-label', Icon: Layers3 },
  { slug: 'automation', number: '02', name: 'Business automation', line: 'Less repetition. More progress.', description: 'Connect the tools you use, automate repeated tasks and bring customer conversations into a useful workflow.', details: 'Workflows · Messaging · Integrations', Icon: Workflow },
  { slug: 'web', number: '03', name: 'Websites', line: 'A stronger first impression.', description: 'Thoughtful design, clear content and responsive development that help people understand your business and take the next step.', details: 'Strategy · Design · Development', Icon: Globe2 },
  { slug: 'ecommerce', number: '04', name: 'E-commerce', line: 'Beautiful to shop. Practical to run.', description: 'Online stores built around your products and customers, from discovery and checkout to the work behind each order.', details: 'Storefronts · Checkout · Operations', Icon: ShoppingBag },
] as const;

function ServiceOverview() {
  return <div className="service-overview" aria-label="Explore Velaro’s four core services">
    <div className="overview-top"><span>DESIGN + TECHNOLOGY</span><span className="overview-studio">VELARO</span></div>
    <div className="overview-title"><span className="overview-label">ONE STUDIO. YOUR NEXT CHAPTER.</span><p>Everything starts<br />with your business.</p></div>
    <div className="overview-services">{offerings.map(({ slug, number, name, Icon }) => <Link key={slug} href={'/services/' + slug} className="overview-service"><span className="overview-service-top"><Icon size={23} aria-hidden="true" /><span>{number}</span></span><strong>{name}</strong><ArrowUpRight className="overview-arrow" size={17} aria-hidden="true" /></Link>)}</div>
    <div className="overview-note"><span />Built individually. Connected where it matters.</div>
  </div>;
}

export default function Home() {
  return <main id="main" className="home-page">
    <section className="home-hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dash" /> YOUR DIGITAL GROWTH STUDIO</span>
          <h1>Digital solutions.<br /><span>Built around you.</span></h1>
          <p>Custom platforms, business automation, websites and online stores. We bring design and technology together around your business, your customers and your next step.</p>
          <div className="hero-actions"><Link href="/contact" className="button button-primary">Let’s build your next chapter <ArrowRight size={19} aria-hidden="true" /></Link><Link href="#services" className="text-link">Explore our services <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <div className="hero-assurance"><span><Check size={14} aria-hidden="true" /> Shaped around your business</span><span><Check size={14} aria-hidden="true" /> Designed for your brand</span></div>
        </div>
        <ServiceOverview />
      </div>
      <div className="shell hero-footnote"><span>Based in Lebanon.<strong> Working across the Middle East and beyond.</strong></span><Link href="/about">MEET VELARO <ArrowRight size={14} aria-hidden="true" /></Link></div>
    </section>

    <section className="section home-services" id="services"><div className="shell">
      <SectionHeading eyebrow="FOUR CORE SERVICES" title="The right solution for your next step." description="Choose one service or bring them together. Every project starts with what your business needs." />
      <div className="home-service-grid">{offerings.map(({ slug, number, name, line, description, details, Icon }) => <Link key={slug} href={'/services/' + slug} className="home-service-card"><div className="home-service-card-top"><span>{number}</span><Icon size={27} aria-hidden="true" /></div><h3>{name}</h3><p className="home-service-line">{line}</p><p>{description}</p><div className="home-service-card-bottom"><span>{details}</span><ArrowUpRight size={21} aria-hidden="true" /></div></Link>)}</div>
    </div></section>

    <section className="section dark-section platform-section"><div className="shell platform-section-grid">
      <div><span className="eyebrow">OUR SPECIALTY · CUSTOM BUSINESS PLATFORMS</span><h2>Your business logic.<br />Your brand.<br />Your platform.</h2><p>A system should fit the way your business works. We map your operations, find the repeated work and build an automated platform around your team, customers and business rules.</p><ul className="plain-checks"><li><Check aria-hidden="true" />Workflows built around your actual process</li><li><Check aria-hidden="true" />Connected information, tools and permissions</li><li><Check aria-hidden="true" />White-label delivery with your brand and identity</li></ul><Link href="/services/custom-software" className="button button-accent">Explore custom platforms <ArrowRight size={18} aria-hidden="true" /></Link></div>
      <div className="platform-specialty-visual"><PlatformPreview variant="platform" /><p className="platform-brand-note">Your name, colours and experience. Designed for your business.</p></div>
    </div></section>

    <section className="section home-presence"><div className="shell">
      <SectionHeading eyebrow="WEBSITES & E-COMMERCE" title="Make the first impression count." description="A website that tells your story. A store that makes shopping feel effortless. Each deserves a considered experience of its own." />
      <div className="home-work-grid">
        <Link href="/services/web" className="home-work-card"><PlatformPreview variant="website" compact /><div className="home-work-title"><div><span className="concept-label">WEBSITE DESIGN & DEVELOPMENT</span><h3>A clear story. A confident next step.</h3><p>Turn your expertise into a website people can understand, explore and act on.</p></div><ArrowUpRight size={24} aria-hidden="true" /></div></Link>
        <Link href="/services/ecommerce" className="home-work-card"><PlatformPreview variant="commerce" compact /><div className="home-work-title"><div><span className="concept-label">ONLINE STORES & COMMERCE</span><h3>A better journey, from browse to buy.</h3><p>Bring your products, brand and shopping experience together in a store built to grow.</p></div><ArrowUpRight size={24} aria-hidden="true" /></div></Link>
      </div><Link href="/work" className="text-link work-all-link">Explore our work & concepts <ArrowRight size={17} aria-hidden="true" /></Link>
    </div></section>

    <section id="possibilities" className="section home-automation"><div className="shell">
      <SectionHeading eyebrow="BUSINESS AUTOMATION" title="Give repetitive work a better process." description="From messages and follow-ups to data entry and approvals. Explore a few starting points for a workflow built around you." />
      <WorkflowExplorer />
      <div className="home-automation-footer"><p>Messaging can include WhatsApp Business, Instagram, Facebook Messenger and TikTok. {site.messagingNote}</p><Link href="/services/automation" className="text-link">Explore automation <ArrowRight size={17} aria-hidden="true" /></Link></div>
    </div></section>

    <section className="section home-about"><div className="shell home-about-grid">
      <div className="home-about-identity"><Image src={velaroMark} alt="" width={100} height={100} sizes="100px" /><span className="eyebrow">ABOUT US</span><h2>Thoughtful people.<br />Practical thinking.</h2></div>
      <div className="home-about-copy"><p className="intro-text">Velaro is a digital growth studio based in Lebanon, working with businesses across the Middle East and beyond.</p><p>Our name comes from velocity: steady, confident progress. We bring that approach to everything we build, from your public presence to the systems behind it.</p><div className="home-about-pillars"><span>Velocity</span><span>Vision</span><span>Value</span></div><Link href="/about" className="text-link">Get to know Velaro <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </div></section>

    <section id="how-it-works" className="section home-process"><div className="shell"><SectionHeading eyebrow="HOW WE WORK" title="A clear path, from idea to everyday use." description="One collaborative approach, whether we’re building your website, store, automation or custom platform." /><ProcessSteps /></div></section>
    <Cta title="What’s next for your business?" text="A new presence, a better process or a platform of your own. Tell us what you have in mind, and we’ll help shape the right solution." />
    <JsonLd data={websiteSchema} />
  </main>;
}
