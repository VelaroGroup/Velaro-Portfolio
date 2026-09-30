import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Cta } from '@/components/cta';
import { services, siteUrl } from '@/lib/content';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.description, alternates: { canonical: `/services/${slug}` }, openGraph: { title: `${service.name} | Velaro`, description: service.description, url: `${siteUrl}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const serviceIndex = services.findIndex((item) => item.slug === slug);
  const related = [
    services[(serviceIndex - 1 + services.length) % services.length],
    services[(serviceIndex + 1) % services.length],
  ];
  const illustration = `/service-illustrations/${service.slug === 'web' ? 'web-development' : service.slug}.png`;
  const deliverableIllustrations = [
    '0% 0%',
    '100% 0%',
    '0% 100%',
    '100% 100%',
  ];
  const deliverableSprite = `/service-illustrations/${service.slug}-deliverables.png`;
  const heroStages: Record<string, string[]> = {
    automation: ['MAP', 'CONNECT', 'AUTOMATE'],
    web: ['PLAN', 'DESIGN', 'LAUNCH'],
    ecommerce: ['DISCOVER', 'CONVERT', 'GROW'],
    'custom-software': ['DEFINE', 'BUILD', 'EVOLVE'],
  };
  const schema = { '@context': 'https://schema.org', '@type': 'Service', name: service.name, description: service.description, provider: { '@type': 'Organization', name: 'Velaro', url: siteUrl }, url: `${siteUrl}/services/${slug}` };

  return <main id="main">
    <section className="inner-hero service-hero"><div className="shell service-hero-grid"><div><Link href="/#services" className="back-link">← All services</Link><div className="eyebrow">SERVICE / {service.number}</div><h1>{service.name}<span className="accent-text">.</span></h1><p>{service.description}</p><Link className="button button-primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link></div><div className="service-hero-art"><div className="service-hero-gridlines" /><img src={illustration} alt={`Abstract illustration for ${service.name}`} /><div className="service-hero-caption"><span>{heroStages[service.slug][0]}</span><b>→</b><span>{heroStages[service.slug][1]}</span><b>→</b><span>{heroStages[service.slug][2]}</span></div></div></div></section>
    <section className="section light-section"><div className="shell detail-grid"><div className="section-label">THE OPPORTUNITY</div><div><h2>{service.intro}</h2><p>Every business has a different starting point. We take time to understand yours and focus on the work that will make a meaningful difference.</p></div></div></section>
    <section className="section"><div className="shell two-col"><div><div className="section-label">WHAT WE FOCUS ON</div><h2>From problem to progress.</h2></div><div className="outcome-list">{service.outcomes.map((outcome, index) => <div key={outcome}><span>0{index + 1}</span><p>{outcome}</p></div>)}</div></div></section>
    <section className="section muted-section"><div className="shell"><div className="deliverables-intro"><div><div className="section-label">WHAT A PROJECT CAN INCLUDE</div><h2>Built around what you need.</h2></div><img className="service-illustration" src={illustration} alt={`Abstract illustration for ${service.name}`} /></div><div className="deliverables">{service.deliverables.map((deliverable, index) => <div key={deliverable}><span>0{index + 1}</span><span className="deliverable-illustration" aria-hidden="true" style={{ backgroundImage: `url(${deliverableSprite})`, backgroundPosition: deliverableIllustrations[index] }} /><h3>{deliverable}</h3></div>)}</div></div></section>
    <section className="section"><div className="shell two-col"><div><div className="section-label">COMMON QUESTIONS</div><h2>Good questions deserve clear answers.</h2></div><div className="faq-list">{service.questions.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>
    <section className="section related"><div className="shell"><div className="section-label">EXPLORE MORE</div><div className="related-grid">{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span>{item.number} / SERVICE</span><h3>{item.name} <span aria-hidden="true">↗</span></h3></Link>)}</div></div></section>
    <Cta title={`Let’s talk ${service.name.toLowerCase()}.`} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
