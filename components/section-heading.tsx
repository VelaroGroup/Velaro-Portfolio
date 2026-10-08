import { ArrowUpRight } from 'lucide-react';

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}

const steps = [
  ['Discover', 'We listen to your team and find the friction, repeated work and missed handoffs.'],
  ['Design', 'We map the process and shape a platform around the way your business works.'],
  ['Build & connect', 'We build, integrate and test your workflows with real scenarios.'],
  ['Refine', 'We help your team get comfortable, then improve the system as you grow.'],
] as const;

export function ProcessSteps() {
  return <div className="process-steps">{steps.map(([title, description], index) => <div className="process-step" key={title}><div className="process-step-top"><span>0{index + 1}</span>{index < steps.length - 1 && <ArrowUpRight size={21} aria-hidden="true" />}</div><h3>{title}</h3><p>{description}</p></div>)}</div>;
}
