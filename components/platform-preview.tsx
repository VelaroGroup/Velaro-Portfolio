'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { ArrowRight, Check, CheckCheck, CircleCheck, ClipboardList, Database, LayoutDashboard, MessageCircle, MoreHorizontal, Search, Send, Settings2, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Users, Workflow } from 'lucide-react';
import { Brand } from './brand';

export type PreviewVariant = 'inbox' | 'workflow' | 'platform' | 'website' | 'commerce';

const channels = [
  { name: 'WhatsApp', initial: 'W', className: 'whatsapp', customer: 'Lina Haddad', message: 'Hi! Can I book a consultation for next week?', reply: 'Of course, Lina. What day works best for you?', task: 'Consultation request' },
  { name: 'Instagram', initial: 'I', className: 'instagram', customer: 'Omar Khalil', message: 'Hello, is the stone collection still available?', reply: 'Hi Omar! I can help you check the collection. Which piece are you looking for?', task: 'Product inquiry' },
  { name: 'Facebook', initial: 'f', className: 'facebook', customer: 'Sara Mansour', message: 'Can you help me find an update on my order?', reply: 'Hi Sara. Please share your order number so we can look it up for you.', task: 'Order support' },
  { name: 'TikTok', initial: '♪', className: 'tiktok', customer: 'Rami Nader', message: 'I saw your video. How can I learn more?', reply: 'Thanks for reaching out, Rami! What would you like to know about our services?', task: 'New customer inquiry' },
] as const;

function Sidebar() {
  return <div className="preview-sidebar" aria-hidden="true"><Brand compact /><div className="preview-side-icons"><LayoutDashboard /><MessageCircle className="selected" /><Users /><Workflow /><ClipboardList /></div><Settings2 className="preview-settings" /></div>;
}

function InboxPreview() {
  const [selected, setSelected] = useState(0);
  const conversationId = useId();
  const channel = channels[selected];
  return <>
    <div className="preview-app">
      <Sidebar />
      <div className="inbox-content">
        <div className="preview-app-top"><div><span className="preview-overline">YOUR WORKSPACE</span><h3>Conversations</h3></div><div className="preview-top-tools"><Search size={16} /><span className="mini-avatar">VM</span></div></div>
        <div className="channel-tabs" role="group" aria-label="Preview a messaging channel">{channels.map((item, index) => <button type="button" key={item.name} aria-pressed={index === selected} aria-controls={conversationId} aria-label={`Preview ${item.name} conversation`} onClick={() => setSelected(index)}><span className={`channel-icon ${item.className}`} aria-hidden="true">{item.initial}</span>{item.name}</button>)}</div>
        <div className="inbox-grid">
          <div className="conversation-list" role="group" aria-label="Sample conversations">{channels.map((item, index) => <button className={index === selected ? 'conversation is-selected' : 'conversation'} type="button" onClick={() => setSelected(index)} key={item.name} aria-pressed={index === selected} aria-controls={conversationId} aria-label={`Preview ${item.customer}'s ${item.name} conversation`}><span className="conversation-avatar" aria-hidden="true">{item.customer.split(' ').map(part => part[0]).join('')}</span><span><strong>{item.customer}</strong><small>{item.message}</small></span><span className={`channel-dot ${item.className}`} aria-hidden="true" /></button>)}<div className="inbox-team-note"><CircleCheck size={15} aria-hidden="true" /><span>Everything in one place.</span></div></div>
          <div className="conversation-detail" id={conversationId} aria-live="polite" aria-atomic="true">
            <div className="conversation-heading"><div><strong>{channel.customer}</strong><small><span className={`channel-dot ${channel.className}`} />{channel.name}{selected === 3 ? ' · Eligible business account' : ' · Business inbox'}</small></div><MoreHorizontal size={17} /></div>
            <div className="conversation-messages"><span className="conversation-date">SAMPLE CONVERSATION</span><p className="message-in">{channel.message}</p><span className="message-time">10:24 AM</span><p className="message-out">{channel.reply}<CheckCheck size={14} /></p><span className="reply-note"><Sparkles size={12} />Automated reply · Your business rules</span></div>
            <div className="team-handoff"><Users size={15} /><span>Your team can take over, anytime.</span></div>
          </div>
        </div>
        <div className="automation-receipt"><span className="receipt-icon"><Check size={16} aria-hidden="true" /></span><div><strong>{channel.task}</strong><span>Example: create a record and assign your team</span></div><span className="status-pill">Sample flow</span></div>
      </div>
    </div>
  </>;
}

function WorkflowPreview() {
  const flow = [{ Icon: MessageCircle, title: 'New inquiry', text: 'Customer sends a message', label: 'Trigger' }, { Icon: Database, title: 'Create record', text: 'Keep the details together', label: 'Action' }, { Icon: ShieldCheck, title: 'Check & route', text: 'Follow your business rules', label: 'Decision' }, { Icon: Send, title: 'Reply & follow up', text: 'Move the next step forward', label: 'Action' }];
  return <div className="workflow-preview"><div className="preview-app-top"><div><span className="preview-overline">WORKFLOW BUILDER</span><h3>From conversation to action</h3></div><span className="status-pill"><span /> Example flow</span></div><div className="workflow-canvas">{flow.map(({ Icon, title, text, label }, index) => <div className="workflow-node-wrap" key={title}><div className="workflow-node"><span className="node-label">{label}</span><span className="node-icon"><Icon size={23} /></span><strong>{title}</strong><p>{text}</p></div>{index !== flow.length - 1 && <ArrowRight className="node-arrow" size={19} />}</div>)}</div><div className="workflow-checks"><span><Check size={14} />Clear rules</span><span><Check size={14} />Human handoff</span><span><Check size={14} />Activity history</span></div></div>;
}

function WorkspacePreview() {
  return <div className="preview-app"><Sidebar /><div className="workspace-content"><div className="preview-app-top"><div><span className="preview-overline">YOUR BUSINESS, CONNECTED</span><h3>Team workspace</h3></div><span className="mini-avatar">VM</span></div><div className="workspace-toolbar"><span className="workspace-tab">Projects</span><span>People</span><span>Reports</span><SlidersHorizontal size={15} /></div><div className="kanban">{[
    { title: 'To do', items: [['New client inquiry', 'Sales', 'LH'], ['Prepare proposal', 'Operations', 'OM']] },
    { title: 'In progress', items: [['Website discovery', 'Projects', 'SN'], ['Review order details', 'Operations', 'LH']] },
    { title: 'Ready for review', items: [['Client onboarding', 'Projects', 'OM'], ['Monthly report', 'Finance', 'SN']] },
  ].map(column => <div className="kanban-column" key={column.title}><h4><span />{column.title}<small>2</small></h4>{column.items.map(([title, category, initials]) => <div className="kanban-card" key={title}><span>{category}</span><strong>{title}</strong><div><span className="kanban-check"><Check size={11} />Task connected</span><span className="mini-avatar">{initials}</span></div></div>)}</div>)}</div><div className="workspace-summary"><ShieldCheck size={17} /><div><strong>The right access for every person.</strong><span>Roles, approvals and a shared view of the work.</span></div></div></div></div>;
}

function WebsitePreview({ commerce = false }: { commerce?: boolean }) {
  return <div className={`website-preview${commerce ? ' commerce-preview' : ''}`}><div className="example-site-nav"><strong>{commerce ? 'NORDEN' : 'ATRIUM'}</strong><span>{commerce ? 'Shop   ·   Our story' : 'Architecture   ·   Projects'}</span>{commerce ? <ShoppingBag size={16} /> : <span className="example-nav-cta">Get in touch ↗</span>}</div><div className="example-site-body"><Image src={commerce ? '/images/concept-ceramics.png' : '/images/concept-architecture.png'} alt={commerce ? 'Illustrative ceramic homeware collection in natural light' : 'Illustrative Mediterranean architecture with a stone facade and olive trees'} fill sizes="(max-width: 760px) 92vw, 640px" className="example-site-photo" /><div className="example-site-copy"><span>{commerce ? 'THOUGHTFULLY MADE' : 'SPACES WITH PURPOSE'}</span><h3>{commerce ? <>Everyday objects.<br />Extraordinary calm.</> : <>Room for<br />a better everyday.</>}</h3><span className="example-site-button">{commerce ? 'Explore the collection' : 'Explore our spaces'} <ArrowRight size={14} /></span></div></div><div className="example-site-bottom">{commerce ? <><span>Natural materials</span><span>Considered details</span><span>Made for everyday</span></> : <><span>Architecture</span><span>Interior design</span><span>Thoughtful spaces</span></>}</div></div>;
}

const titles: Record<PreviewVariant, string> = { inbox: 'Customer conversations', workflow: 'Connected workflows', platform: 'Your custom workspace', website: 'A considered web experience', commerce: 'From discovery to checkout' };

export function PlatformPreview({ variant = 'inbox', compact = false }: { variant?: PreviewVariant; compact?: boolean }) {
  const captionId = useId();
  return <figure className={`platform-preview preview-${variant}${compact ? ' preview-compact' : ''}`} aria-describedby={captionId}><div className="preview-frame"><div className="preview-chrome"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>{titles[variant]}</span><span className="preview-chrome-tag">Concept</span></div>{variant === 'inbox' ? <InboxPreview /> : variant === 'workflow' ? <WorkflowPreview /> : variant === 'platform' ? <WorkspacePreview /> : <WebsitePreview commerce={variant === 'commerce'} />}</div><figcaption id={captionId}>{variant === 'inbox' ? 'Interactive concept · Sample data · Select a channel to explore' : 'Illustrative concept · Built around your business'}</figcaption></figure>;
}
