import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Layers3, MessageCircle, Plus, Workflow } from 'lucide-react';
import { Cta } from '@/components/cta';
import { JsonLd } from '@/components/json-ld';
import { PlatformPreview } from '@/components/platform-preview';
import { ProcessSteps, SectionHeading } from '@/components/section-heading';
import { siteUrl } from '@/lib/site';
import { services } from '@/lib/services';
import { pageMetadata } from '@/lib/metadata';
import { organizationId } from '@/lib/structured-data';

type ServicePageProps = { params: Promise<{ slug: string }> };

const serviceSearchTitles: Record<string, string> = {
  automation: 'Business Process Automation',
  web: 'Web Design & Development',
  ecommerce: 'E-commerce Design & Development',
  'custom-software': 'Custom Software & White-label Platforms',
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return pageMetadata({
    title: serviceSearchTitles[slug] ?? service.name,
    description: service.description,
    path: `/services/${slug}`,
  }, parent);
}

const benefitIcons = [Layers3, Workflow, Check];
const channels = ['WhatsApp Business', 'Instagram', 'Facebook Messenger', 'TikTok'];

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const includesMessaging = slug === 'custom-software' || slug === 'automation';
  const related = services.filter((item) => item.slug !== slug).slice(0, 2);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/services/${slug}#service`,
    name: service.name,
    description: service.description,
    provider: { '@id': organizationId },
    url: `${siteUrl}/services/${slug}`,
  };

  return (
    <main id="main" className={`service-page service-page-${slug}`}>
      <section className="page-hero svc-hero">
        <div className="shell svc-hero-grid">
          <div className="svc-hero-copy">
            <Link href="/#services" className="back-link"><ArrowLeft size={14} aria-hidden="true" /> All services</Link>
            <p className="eyebrow svc-kicker">{service.number} / {service.name}</p>
            <h1>{service.headline}</h1>
            <p className="intro-text svc-hero-description">{service.description}</p>
            <div className="svc-actions">
              <Link className="button button-primary" href={`/contact?service=${slug}`}>
                {service.cta}<ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a className="text-link" href="#possibilities">Explore what’s possible <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="svc-hero-preview">
            <PlatformPreview variant={service.preview} />
          </div>
        </div>
      </section>

      <section className="section svc-introduction">
        <div className="shell">
          <div className="svc-intro-grid">
            <SectionHeading eyebrow="WHY IT MATTERS" title={service.intro} />
            <p className="svc-intro-text">{service.introduction}</p>
          </div>
          <div className="svc-benefits">
            {service.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <article className="svc-benefit" key={benefit.title}>
                  <div className="svc-benefit-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></div>
                  <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section svc-connected">
        <div className="shell svc-connected-grid">
          <div className="svc-connected-copy">
            <p className="eyebrow">{service.band.eyebrow}</p>
            <h2>{service.band.title}</h2>
            <p>{service.band.text}</p>
            <ul className="svc-outcomes">
              {service.outcomes.map((outcome) => <li key={outcome}><Check size={16} aria-hidden="true" /><span>{outcome}</span></li>)}
            </ul>
            <Link className="button button-accent" href={`/contact?service=${slug}`}>Let’s map your process <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="svc-connected-preview">
            <PlatformPreview variant={service.band.preview} compact />
          </div>
        </div>
      </section>

      <section className="section svc-capabilities" id="possibilities">
        <div className="shell">
          <SectionHeading eyebrow="WHAT WE CAN BUILD" title="Shaped around what you need." description="A useful starting point, tailored to your team, tools and priorities." />
          <div className="svc-capability-list">
            {service.capabilities.map((capability, index) => (
              <article className="svc-capability" key={capability.title}>
                <span className="svc-number" aria-hidden="true">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <ArrowUpRight className="svc-capability-arrow" size={21} strokeWidth={1.5} aria-hidden="true" />
              </article>
            ))}
          </div>
          {includesMessaging && (
            <aside className="svc-channels" aria-label="Business messaging integrations">
              <div className="svc-channel-heading"><MessageCircle size={18} aria-hidden="true" /><span>Conversations connected to your business</span></div>
              <div className="svc-channel-list">{channels.map((channel) => <span key={channel}>{channel}</span>)}</div>
              <p>Available channels and features depend on your accounts, region and each platform’s approved access. Your team can step in when needed.</p>
            </aside>
          )}
          <div className="svc-delivery">
            <p className="eyebrow">A PROJECT CAN INCLUDE</p>
            <ul>{service.deliverables.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section soft-section svc-process" id="process">
        <div className="shell">
          <SectionHeading eyebrow="A CLEAR, PRACTICAL PROCESS" title="Start with the right problem." description="Understand the work. Design the solution. Build, test and improve it together." />
          <ProcessSteps />
        </div>
      </section>

      <section className="section svc-faq">
        <div className="shell two-col">
          <SectionHeading eyebrow="COMMON QUESTIONS" title="A little more clarity." description="Every project begins with a conversation about your business." />
          <div className="faq-list">
            {service.questions.map(({ q, a }) => (
              <details key={q}>
                <summary>{q}<Plus size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-related">
        <div className="shell">
          <h2 className="eyebrow">PART OF A CONNECTED BUSINESS</h2>
          <div className="svc-related-grid">
            {related.map((item) => (
              <Link className="svc-related-link" href={`/services/${item.slug}`} key={item.slug}>
                <span className="svc-related-number">{item.number} / SERVICE</span>
                <h3>{item.name}<ArrowUpRight size={24} aria-hidden="true" /></h3>
                <p>{item.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Cta title={service.closing} text="Tell us where the work gets complicated. We’ll help you find a useful way forward." />
      <JsonLd data={schema} />
    </main>
  );
}
