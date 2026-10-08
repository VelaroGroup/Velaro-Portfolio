import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Cta({ title = 'What would make your work easier?', text = 'Tell us where the work gets stuck. We’ll help you see what a better system could look like.' }: { title?: string; text?: string }) {
  return (
    <section className="cta-band">
      <div className="shell cta-inner">
        <div><span className="eyebrow">Let’s build something useful</span><h2>{title}</h2><p>{text}</p></div>
        <Link href="/contact" className="button button-accent">Let’s talk about it <ArrowRight size={19} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
