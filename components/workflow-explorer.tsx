'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { ArrowRight, Check, Copy, Layers3, MessageCircle, Timer } from 'lucide-react';

const examples = [
  { title: 'Messages everywhere', Icon: MessageCircle, before: 'Your team switches between inboxes, answers the same questions and loses track of the next step.', after: 'One conversation flow, connected to your business.', steps: ['Message received', 'Reply prepared', 'Lead captured', 'Team notified'], service: 'automation' },
  { title: 'Copying the same details', Icon: Copy, before: 'Someone copies every new inquiry into a spreadsheet, a customer record and a task for the team.', after: 'Capture information once. Put it where it belongs.', steps: ['Form submitted', 'Details checked', 'Record updated', 'Task created'], service: 'automation' },
  { title: 'Manual follow-ups', Icon: Timer, before: 'Approvals, reminders and customer updates depend on someone remembering to chase them.', after: 'The right next step, at the right time.', steps: ['Request logged', 'Owner assigned', 'Reminder scheduled', 'Progress tracked'], service: 'automation' },
  { title: 'Disconnected tools', Icon: Layers3, before: 'Orders, people and project information are scattered across systems that do not talk to each other.', after: 'A custom platform that brings the work together.', steps: ['Tools connected', 'Data organised', 'Roles defined', 'Work in one place'], service: 'custom-software' },
] as const;

export function WorkflowExplorer() {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const example = examples[selected];
  return <div className="workflow-explorer"><div className="pain-options" role="group" aria-label="Choose a business challenge">{examples.map(({ title, Icon }, index) => <button type="button" key={title} id={`${panelId}-option-${index}`} aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)}><Icon size={20} aria-hidden="true" /><span>{title}</span><ArrowRight size={17} aria-hidden="true" /></button>)}</div><div className="workflow-answer" id={panelId} role="region" aria-labelledby={`${panelId}-option-${selected}`}><div aria-live="polite" aria-atomic="true"><span className="eyebrow">Sound familiar?</span><p className="pain-description">{example.before}</p><div className="workflow-after"><span className="eyebrow">Example workflow</span><h3>{example.after}</h3><ol>{example.steps.map(step => <li key={step}><span><Check size={13} aria-hidden="true" /></span>{step}</li>)}</ol></div></div><Link className="text-link" href={`/contact?service=${example.service}`}>Explore your workflow <ArrowRight size={17} aria-hidden="true" /></Link></div></div>;
}
