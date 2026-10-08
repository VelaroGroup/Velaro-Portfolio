'use client';

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { site } from '@/lib/site';

const topics = [
  { value: 'custom-software', label: 'Custom platform' },
  { value: 'automation', label: 'Business automation' },
  { value: 'web', label: 'Web development' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'not-sure', label: 'Help me decide' },
];

type EmailDraft = { subject: string; body: string; href: string };
type FieldName = 'name' | 'email' | 'company' | 'topic' | 'message';
type FormErrors = Partial<Record<FieldName, string>>;

// Keep the email action disabled until its client-side preparation is available.
const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function resolveTopic(value: string): string {
  return topics.find((topic) => topic.value === value || topic.label === value)?.value || '';
}

function FieldError({ field, message }: { field: FieldName; message?: string }) {
  return message ? <p id={`contact-${field}-error`} className="form-field-error">{message}</p> : null;
}

export function ContactForm({ initialService = '' }: { initialService?: string }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [copyStatus, setCopyStatus] = useState('');
  const draftRef = useRef<HTMLTextAreaElement>(null);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const message = String(data.get('message') || '').trim();
    const topic = topics.find((item) => item.value === data.get('topic'));
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const nextErrors: FormErrors = {};

    if (!name) nextErrors.name = 'Please enter your name.';
    else if (name.length > 100) nextErrors.name = 'Please use 100 characters or fewer.';
    if (!email || emailInput.validity.typeMismatch) nextErrors.email = 'Please enter a valid email address.';
    else if (email.length > 200) nextErrors.email = 'Please use an email address under 200 characters.';
    if (company.length > 150) nextErrors.company = 'Please use 150 characters or fewer.';
    if (!topic) nextErrors.topic = 'Please choose a starting point.';
    if (message.length < 10) nextErrors.message = 'Please share at least 10 characters about what you would like to improve.';
    else if (message.length > 5000) nextErrors.message = 'Please keep the project description within 5,000 characters.';

    setErrors(nextErrors);
    setCopyStatus('');
    if (Object.keys(nextErrors).length || !topic) {
      setDraft(null);
      const firstField = Object.keys(nextErrors)[0];
      const invalidInput = form.elements.namedItem(firstField) as HTMLElement | null;
      invalidInput?.focus();
      return;
    }

    const subject = `Velaro project inquiry — ${topic.label}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Interested in: ${topic.label}`,
      `Budget: ${data.get('budget') || 'To be discussed'}`,
      '',
      'What we would like to improve:',
      message,
    ].join('\n');
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft({ subject, body, href });
    // Opening a mail app is only a handoff. The message is never sent by this form.
    window.location.href = href;
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    if (draft) setDraft(null);
    if (copyStatus) setCopyStatus('');
    const field = (event.target as HTMLInputElement).name as FieldName;
    if (errors[field]) setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopyStatus(`Message copied. Paste it into an email to ${site.email}.`);
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopyStatus('Select and copy the prepared message below, then paste it into your email.');
    }
  }

  return <form className="contact-form" method="post" noValidate onSubmit={prepareEmail} onChange={handleChange} aria-labelledby="contact-form-title">
    <div className="contact-form-heading"><h2 id="contact-form-title">A little about your project.</h2><p>Fields marked * are required.</p></div>
    <noscript><p className="form-no-script">To prepare a message here, enable JavaScript. You can also <a href={`mailto:${site.email}`}>email us directly</a>.</p></noscript>
    <p className="form-error-summary" role="alert">{Object.keys(errors).length > 0 ? 'Please check the highlighted fields below.' : ''}</p>
    <div className="form-pair">
      <div className="form-field"><label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'contact-name-error' : undefined} /><FieldError field="name" message={errors.name} /></div>
      <div className="form-field"><label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="you@company.com" required maxLength={200} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'contact-email-error' : undefined} /><FieldError field="email" message={errors.email} /></div>
    </div>
    <div className="form-field"><label htmlFor="contact-company">Company <span className="form-optional">(optional)</span></label><input id="contact-company" name="company" autoComplete="organization" placeholder="Your business or team" maxLength={150} aria-invalid={errors.company ? true : undefined} aria-describedby={errors.company ? 'contact-company-error' : undefined} /><FieldError field="company" message={errors.company} /></div>
    <div className="form-field"><label htmlFor="contact-topic">What can we help with? <span aria-hidden="true">*</span></label><select id="contact-topic" name="topic" defaultValue={resolveTopic(initialService)} required aria-invalid={errors.topic ? true : undefined} aria-describedby={errors.topic ? 'contact-topic-error' : undefined}><option value="" disabled>Select a starting point</option>{topics.map((topic) => <option key={topic.value} value={topic.value}>{topic.label}</option>)}</select><FieldError field="topic" message={errors.topic} /></div>
    <div className="form-field"><label htmlFor="contact-message">What would you like to improve? <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" placeholder="What happens today? What feels repetitive or slows your team down? Tell us about the process, tools, or idea." rows={5} required minLength={10} maxLength={5000} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? 'message-help contact-message-error' : 'message-help'} /><p className="form-help" id="message-help">A few sentences is enough to get started.</p><FieldError field="message" message={errors.message} /></div>
    <div className="form-field"><label htmlFor="contact-budget">Budget range <span className="form-optional">(optional)</span></label><select id="contact-budget" name="budget" defaultValue=""><option value="">Let’s discuss the budget</option><option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$30,000</option><option>$30,000+</option></select></div>
    <div className="form-submit-row"><button type="submit" className="button button-primary" disabled={!hydrated}>Prepare email <ArrowUpRight aria-hidden="true" /></button><p className="form-note">Opens your email app.<br />You review and send the message there.</p></div>
    <p className="form-prepare-status" role="status">{draft ? 'Your message is prepared. Review and send it in your email app, or use the copy option below. Nothing has been sent yet.' : ''}</p>
    {draft && <div className="contact-draft"><div className="contact-draft-heading"><Mail aria-hidden="true" /><h3>Your message is ready to send.</h3></div><p>If your email app didn’t open, copy the message below and email it to <a href={`mailto:${site.email}`}>{site.email}</a>.</p><div className="contact-draft-actions"><a href={draft.href} className="text-link">Open email app <ArrowUpRight aria-hidden="true" /></a><button type="button" onClick={copyDraft} className="text-link">{copyStatus.startsWith('Message copied') ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} Copy message</button></div><label htmlFor="prepared-message">Prepared message</label><textarea ref={draftRef} id="prepared-message" readOnly rows={8} value={`To: ${site.email}\nSubject: ${draft.subject}\n\n${draft.body}`} /><p className="form-copy-status" role="status">{copyStatus}</p></div>}
  </form>;
}
