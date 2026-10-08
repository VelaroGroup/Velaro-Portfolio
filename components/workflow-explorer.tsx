'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { ArrowRight, Copy, Layers3, MessageCircle, Timer } from 'lucide-react';

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

  return <div className="workflow-explorer">
    <div className="pain-options" role="group" aria-label="Choose a business challenge">
      <span className="eyebrow workflow-menu-label">Choose a challenge</span>
      {examples.map(({ title, Icon }, index) => <button
        type="button"
        key={title}
        id={`${panelId}-option-${index}`}
        aria-pressed={selected === index}
        aria-controls={panelId}
        onClick={() => setSelected(index)}
      >
        <span className="workflow-option-icon"><Icon size={20} aria-hidden="true" /></span>
        <span>{title}</span>
        <ArrowRight size={17} aria-hidden="true" />
      </button>)}
    </div>
    <div className="workflow-answer" id={panelId} role="region" aria-labelledby={`${panelId}-option-${selected}`}>
      <div className="workflow-scenes">
        {examples.map((item, index) => {
          const active = index === selected;
          return <div
            key={`${index}-${active ? 'selected' : 'resting'}`}
            className={`workflow-scene${active ? ' is-active' : ''}`}
            aria-hidden={!active}
            inert={!active}
          >
            <div className="workflow-situation">
              <span className="eyebrow">The everyday challenge</span>
              <p className="pain-description">{item.before}</p>
            </div>
            <div className="workflow-after">
              <span className="eyebrow">A possible workflow</span>
              <h3>{item.after}</h3>
              <ol className="workflow-step-list" aria-label="Illustrative workflow steps">
                {item.steps.map((step, stepIndex) => <li key={step}>
                  <span className="workflow-step-number" aria-hidden="true">0{stepIndex + 1}</span>
                  <span className="workflow-step-label">{step}</span>
                </li>)}
              </ol>
            </div>
            <div className="workflow-action">
              <p className="workflow-example-note">An illustrative sequence, tailored to your process.</p>
              <Link className="text-link" href={`/contact?service=${item.service}`}>Explore your workflow <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>;
        })}
      </div>
      <span className="workflow-announcement" role="status" aria-live="polite" aria-atomic="true">{example.title}: {example.after}</span>
    </div>
  </div>;
}
