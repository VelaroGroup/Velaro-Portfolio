import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, MousePointer2, Layers3 } from 'lucide-react';
import { Cta } from '@/components/cta';

export const metadata: Metadata = { title: 'About', description: 'Meet Velaro, a digital engineering studio building automation, websites, e-commerce experiences, and custom software.', alternates: { canonical: '/about' } };

const principles = [
  { number: '01', title: 'Clarity first', description: 'Make the goal, users, and tradeoffs visible before building.', Icon: Compass },
  { number: '02', title: 'Useful by design', description: 'Design experiences that solve real tasks with less friction.', Icon: MousePointer2 },
  { number: '03', title: 'Built to evolve', description: 'Choose foundations your team can maintain and extend.', Icon: Layers3 },
];

export default function About() {
  return <main id="main"><section className="inner-hero"><div className="shell"><div className="eyebrow">ABOUT VELARO</div><h1>Built for what’s next<span className="accent-text">.</span></h1><p>We help businesses make technology useful—through clear strategy, thoughtful design, and dependable development.</p></div></section><section className="section light-section"><div className="shell detail-grid"><div className="section-label">OUR POINT OF VIEW</div><div><h2>The right solution starts with understanding the real problem.</h2><p>Velaro works across automation, web, e-commerce, and custom software. That range lets us look beyond a single tool and shape digital systems around the people who use them.</p><p>We believe in clear communication, focused decisions, and work that keeps delivering value after launch.</p></div></div></section><section className="section"><div className="shell"><div className="section-label">HOW WE THINK</div><div className="principles">{principles.map(({ number, title, description, Icon }) => <div key={number}><div className="principle-top"><span>{number}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p></div>)}</div><Link href="/contact" className="text-link">Work with us ↗</Link></div></section><Cta /></main>;
}
