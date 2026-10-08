import { ArrowUpRight } from 'lucide-react';

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}

const steps = [
  ['Discover', 'We learn your goals, your customers and the way your business works.'],
  ['Design', 'We turn your priorities into clear journeys, purposeful design and a practical plan.'],
  ['Build & connect', 'We develop, connect and test your solution with real scenarios.'],
  ['Refine', 'We support launch and handover, then plan improvements around how your solution is used.'],
] as const;

export function ProcessSteps() {
  return <div className="process-steps">{steps.map(([title, description], index) => <div className="process-step" key={title}><div className="process-step-top"><span>0{index + 1}</span>{index < steps.length - 1 && <ArrowUpRight size={21} aria-hidden="true" />}</div><h3>{title}</h3><p>{description}</p></div>)}</div>;
}
