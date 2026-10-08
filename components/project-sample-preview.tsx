import Image from 'next/image';
import { ArrowRight, CalendarDays, Check, Clock3, FileCheck2, FileText, FolderOpen, MapPin, Package, ShieldCheck, ShoppingBag, Sparkles, Truck, Users } from 'lucide-react';
import architectureConcept from '@/public/images/concept-architecture.png';

export type SamplePreviewVariant = 'white-label' | 'dispatch' | 'booking' | 'documents' | 'wholesale' | 'hospitality';

const sampleTitles: Record<SamplePreviewVariant, string> = {
  'white-label': 'A portal with your identity',
  dispatch: 'The working day, connected',
  booking: 'From booking to arrival',
  documents: 'A clear path to approval',
  wholesale: 'Ordering, built for trade',
  hospitality: 'A considered guest experience',
};

function SampleHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="sample-app-header"><div><span className="sample-eyebrow">{eyebrow}</span><div className="sample-app-title">{title}</div></div>{children}</div>;
}

function PortalPreview({ compact }: { compact: boolean }) {
  return <div className="sample-portal">
    <div className="sample-portal-nav"><span className="sample-brand-symbol" aria-hidden="true"><span /><span /><span /></span><strong>Your brand</strong><span>Client portal</span><span className="sample-avatar">CL</span></div>
    <div className="sample-content">
      <SampleHeader eyebrow="YOUR SHARED WORKSPACE" title="Good morning, Clara."><span className="sample-tag">Client access</span></SampleHeader>
      <div className="sample-project-overview"><div><span className="sample-eyebrow">ACTIVE PROJECT</span><strong>Service onboarding</strong><span className="sample-muted">Everything for the next step.</span></div><span className="sample-progress-ring"><span><strong>2 / 4</strong><small>milestones</small></span></span></div>
      <div className="sample-milestones"><span className="is-complete"><Check aria-hidden="true" />Discovery</span><span className="is-complete"><Check aria-hidden="true" />Proposal</span><span className="is-current"><i />Setup</span><span><i />Launch</span></div>
      <div className="sample-portal-bottom"><div className="sample-panel"><span className="sample-section-label">LATEST REQUEST</span><strong>Review your workspace</strong><p>Your team has shared the setup for approval.</p><span className="sample-inline-link">Ready for your review <ArrowRight aria-hidden="true" /></span></div><div className="sample-panel sample-portal-files"><span className="sample-section-label">SHARED FILES</span><div className="sample-file"><FileText aria-hidden="true" /><span><strong>Project brief</strong><small>Shared by your team</small></span><Check aria-hidden="true" /></div>{!compact && <div className="sample-file"><FolderOpen aria-hidden="true" /><span><strong>Brand assets</strong><small>Available to your project team</small></span></div>}</div></div>
    </div>
  </div>;
}

function DispatchPreview({ compact }: { compact: boolean }) {
  const jobs = [{ time: '09:00', title: 'Equipment inspection', location: 'Marina district', initials: 'AK', status: 'On site', className: 'is-current' }, { time: '11:30', title: 'Scheduled maintenance', location: 'Business district', initials: 'LM', status: 'Assigned', className: '' }, { time: '14:00', title: 'Service follow-up', location: 'Creek district', initials: 'AK', status: 'Scheduled', className: '' }];
  return <div className="sample-dispatch">
    <SampleHeader eyebrow="FIELD OPERATIONS" title="Today’s dispatch"><span className="sample-dark-tag"><Truck aria-hidden="true" /> Sample day</span></SampleHeader>
    <div className="sample-dispatch-grid"><div className="sample-route"><span className="sample-section-label">THE DAY AT A GLANCE</span><div className="sample-route-canvas" aria-hidden="true"><svg viewBox="0 0 280 160" fill="none" preserveAspectRatio="xMidYMid meet"><path className="sample-map-street" d="M-10 45H290M-10 120H290M55-10V170M165-10V170M250-10V170M-10 155L290 10" /><path className="sample-map-trail" d="M55 120V45H165V120H250V45" /><circle className="sample-map-halo" cx="165" cy="45" r="23" /><circle className="sample-map-pin" cx="55" cy="120" r="14" /><circle className="sample-map-pin is-active" cx="165" cy="45" r="14" /><circle className="sample-map-pin" cx="250" cy="120" r="14" /><text x="55" y="124">1</text><text x="165" y="49">2</text><text x="250" y="124">3</text></svg></div><div className="sample-route-legend"><span><i />Assigned visit</span><span>Illustrative route</span></div><div className="sample-route-note"><MapPin aria-hidden="true" /><span>Job details travel with the team.</span></div></div>
      <div className="sample-dispatch-jobs"><div className="sample-list-heading"><strong>Team schedule</strong><span>3 visits</span></div>{jobs.slice(0, compact ? 2 : 3).map(job => <div className={`sample-job ${job.className}`} key={job.time}><span className="sample-job-time">{job.time}</span><div><strong>{job.title}</strong><small>{job.location}</small><span className="sample-job-status">{job.status}</span></div><span className="sample-avatar">{job.initials}</span></div>)}<div className="sample-quiet-note"><Check aria-hidden="true" /><span>Checklist and job notes in one place</span></div></div>
    </div>
  </div>;
}

function BookingPreview({ compact }: { compact: boolean }) {
  return <div className="sample-booking sample-content">
    <SampleHeader eyebrow="BOOKINGS & FOLLOW-UPS" title="Make room for your customers."><span className="sample-header-icon"><CalendarDays aria-hidden="true" /></span></SampleHeader>
    <div className="sample-booking-grid"><div className="sample-calendar"><div className="sample-calendar-top"><span>Sample week</span><strong>October</strong></div><div className="sample-week">{[['Mon', '19'], ['Tue', '20'], ['Wed', '21'], ['Thu', '22'], ['Fri', '23']].map(([day, date]) => <div className={day === 'Wed' ? 'is-selected' : ''} key={day}><span>{day}</span><strong>{date}</strong><i /></div>)}</div><div className="sample-time-label">Wednesday availability</div><div className="sample-time-slots"><span>09:00</span><span className="is-booked">10:30 <Check aria-hidden="true" /></span><span>14:00</span><span>15:30</span></div><div className="sample-calendar-note"><Clock3 aria-hidden="true" />Times shown in your local timezone</div></div>
      <div className="sample-appointment"><span className="sample-section-label">NEXT APPOINTMENT</span><div className="sample-appointment-time">10:30<span>AM</span></div><strong>Discovery consultation</strong><span className="sample-muted">Clara M. · 30 minutes</span><div className="sample-appointment-steps"><span><Check aria-hidden="true" />Booking confirmed</span><span><Check aria-hidden="true" />Calendar updated</span>{!compact && <span><Clock3 aria-hidden="true" />Reminder scheduled</span>}</div></div></div>
    <div className="sample-automation-note"><Sparkles aria-hidden="true" /><div><strong>A thoughtful reminder, at the right time.</strong><span>Confirmation → reminder → team follow-up</span></div></div>
  </div>;
}

function DocumentsPreview({ compact }: { compact: boolean }) {
  const documents = [{ name: 'Business registration', detail: 'Document received', status: 'Received', approved: true }, { name: 'Insurance certificate', detail: 'Expiry date flagged', status: 'Review', approved: false }, { name: 'Supplier agreement', detail: 'Signed copy received', status: 'Received', approved: true }];
  return <div className="sample-documents sample-content">
    <SampleHeader eyebrow="SUPPLIER ONBOARDING" title="Every document accounted for."><span className="sample-tag">Sample record</span></SampleHeader>
    <div className="sample-document-progress"><span className="is-complete"><Check aria-hidden="true" />Collect</span><i /><span className="is-current">02 <strong>Review</strong></span><i /><span>03 <strong>Approve</strong></span></div>
    <div className="sample-document-grid"><div className="sample-document-list"><div className="sample-list-heading"><strong>Required documents</strong><FolderOpen aria-hidden="true" /></div>{documents.map(document => <div className="sample-document" key={document.name}><span className={`sample-document-icon${document.approved ? '' : ' needs-review'}`}><FileText aria-hidden="true" /></span><div><strong>{document.name}</strong><small>{document.detail}</small></div><span className={`sample-document-status${document.approved ? '' : ' needs-review'}`}>{document.approved ? <Check aria-hidden="true" /> : <Clock3 aria-hidden="true" />}{document.status}</span></div>)}</div><div className="sample-review-card"><ShieldCheck aria-hidden="true" /><span className="sample-section-label">HUMAN APPROVAL</span><strong>One item needs a closer look.</strong><p>The insurance expiry is flagged for your operations team.</p>{!compact && <span className="sample-review-assignee"><span className="sample-avatar">OP</span>Assigned to operations</span>}<span className="sample-review-state">Awaiting review</span></div></div>
    <div className="sample-quiet-note"><FileCheck2 aria-hidden="true" /><span>Every upload and decision stays in the record.</span></div>
  </div>;
}

function WholesalePreview({ compact }: { compact: boolean }) {
  const products = [{ Icon: Package, name: 'Mailer boxes', detail: 'Natural kraft · Medium', amount: '120', unit: 'units', style: 'box' }, { Icon: ShoppingBag, name: 'Paper carrier bags', detail: 'Natural kraft · Large', amount: '80', unit: 'units', style: 'bag' }, { Icon: Package, name: 'Protective wraps', detail: 'Recycled paper · Roll', amount: '12', unit: 'rolls', style: 'wrap' }];
  return <div className="sample-wholesale"><div className="sample-trade-nav"><span><Package aria-hidden="true" /><strong>Trade portal</strong></span><span className="sample-tag">Business account</span></div><div className="sample-content"><SampleHeader eyebrow="YOUR REGULAR ORDER" title="Ready for the next delivery."><span className="sample-order-reference">Order #1042</span></SampleHeader><div className="sample-order-items"><div className="sample-order-labels"><span>Product</span><span>Quantity</span></div>{products.slice(0, compact ? 2 : 3).map(({ Icon, name, detail, amount, unit, style }) => <div className="sample-order-item" key={name}><span className={`sample-product-image sample-product-${style}`}><Icon aria-hidden="true" /></span><div><strong>{name}</strong><small>{detail}</small></div><span className="sample-order-quantity"><strong>{amount}</strong><small>{unit}</small></span></div>)}</div><div className="sample-order-summary"><div><Truck aria-hidden="true" /><span><strong>Delivery preferences</strong><small>Business address · Weekday receiving</small></span></div><div className="sample-order-approval"><ShieldCheck aria-hidden="true" /><span>Purchasing approval required</span></div></div></div><div className="sample-trade-footer"><span><Check aria-hidden="true" /> Saved as a draft</span><span>Review before placing <ArrowRight aria-hidden="true" /></span></div></div>;
}

function HospitalityPreview({ compact }: { compact: boolean }) {
  return <div className="sample-hospitality"><div className="sample-stay-nav"><strong>THE STAY</strong><span>Spaces · Experience · Visit</span></div><div className="sample-stay-hero"><div className="sample-stay-copy"><span className="sample-eyebrow">A BOUTIQUE STAY CONCEPT</span><div className="sample-stay-title">A slower<br />kind of stay.</div><p>Quiet spaces. Considered details. Time that feels like yours.</p><span className="sample-stay-cta">Find your room <ArrowRight aria-hidden="true" /></span></div><div className="sample-stay-image"><Image src={architectureConcept} alt="Illustrative sunlit stone courtyard with an olive tree" fill sizes="(max-width: 600px) 85vw, (max-width: 1000px) 40vw, 600px" /><span>Illustrative setting</span></div></div><div className="sample-stay-explore"><div><span className="sample-section-label">SPACES TO UNWIND</span><strong>Courtyard suite</strong><span><Users aria-hidden="true" />2 guests <span aria-hidden="true">·</span> Private terrace</span></div>{!compact && <div className="sample-stay-detail"><span className="sample-section-label">MADE PERSONAL</span><strong>Your stay, your pace.</strong><span>Share your dates and preferences.</span></div>}<span className="sample-stay-inquiry">Inquire about a stay <ArrowRight aria-hidden="true" /></span></div></div>;
}

export function ProjectSamplePreview({ variant, compact = false }: { variant: SamplePreviewVariant; compact?: boolean }) {
  return <figure className={`project-sample-preview sample-${variant}${compact ? ' sample-compact' : ''}`}>
    <div className="sample-frame"><div className="sample-chrome"><span className="sample-window-dots" aria-hidden="true"><i /><i /><i /></span><span>{sampleTitles[variant]}</span><span className="sample-chrome-label">Concept</span></div>
      {variant === 'white-label' ? <PortalPreview compact={compact} /> : variant === 'dispatch' ? <DispatchPreview compact={compact} /> : variant === 'booking' ? <BookingPreview compact={compact} /> : variant === 'documents' ? <DocumentsPreview compact={compact} /> : variant === 'wholesale' ? <WholesalePreview compact={compact} /> : <HospitalityPreview compact={compact} />}
    </div><figcaption>Illustrative concept · Sample content and data</figcaption>
  </figure>;
}
