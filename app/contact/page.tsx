import type { ResolvingMetadata } from 'next';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return pageMetadata({
    title: 'Let’s talk',
    description: 'Tell Velaro where work gets repetitive. Start a conversation about custom platforms, messaging automation, workflows, websites, or e-commerce.',
    path: '/contact',
  }, parent);
}

const nextSteps = [
  { title: 'Understand the challenge', description: 'We talk through the task, the people involved, and what a better day would look like.' },
  { title: 'Map the right approach', description: 'We identify useful connections, automation opportunities, and the scope of a first version.' },
  { title: 'Make a clear plan', description: 'You get a proposed scope, delivery approach, and next steps before building begins.' },
];

export default async function Contact({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const params = await searchParams;
  const initialService = typeof params.service === 'string' ? params.service : '';

  return <main id="main" className="secondary-page">
    <section className="page-hero contact-page-hero"><div className="shell">
      <div className="eyebrow">LET’S TALK</div><h1>Let’s make things<br />work better.</h1><p className="intro-text">The repeated task. The disconnected tools. The idea that needs a platform. Tell us what’s on your mind.</p>
    </div></section>
    <section className="contact-main-section"><div className="shell contact-layout">
      <aside className="contact-aside"><span className="eyebrow">START WITH THE PROBLEM</span><h2>No perfect brief required.</h2><p>Tell us what your team does today, what takes too much time, and what you’d like to change. We’ll help work out the rest.</p><div className="contact-direct"><span>EMAIL US DIRECTLY</span><a href={`mailto:${site.email}`}><span>{site.email}</span><ArrowUpRight aria-hidden="true" /></a></div><div className="contact-thought"><ArrowDown aria-hidden="true" /><p>“We copy the same information into three different tools.”</p><span>That’s a good place to start.</span></div></aside>
      <ContactForm key={initialService} initialService={initialService} />
    </div></section>
    <section className="section soft-section"><div className="shell"><div className="contact-next-heading"><span className="eyebrow">WHAT HAPPENS NEXT</span><h2>A conversation.<br />Then a clear direction.</h2></div><div className="contact-next-steps">{nextSteps.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
    <section className="section"><div className="shell contact-questions"><div><span className="eyebrow">BEFORE WE TALK</span><h2>A few useful answers.</h2></div><div className="faq-list"><details><summary>Can we start with just one process?</summary><p>Yes. A focused first version can connect one complete workflow, prove it is useful to the team, and give you a foundation to extend.</p></details><details><summary>Can you work with the tools we already use?</summary><p>We start by reviewing your tools, available integrations, and access. Often the useful next step is connecting what already works.</p></details><details><summary>Can messaging be part of a bigger platform?</summary><p>Yes. Supported customer conversations can feed into customer records, tasks, orders, and follow-ups. The available actions depend on each channel and your account access.</p></details></div></div></section>
  </main>;
}
